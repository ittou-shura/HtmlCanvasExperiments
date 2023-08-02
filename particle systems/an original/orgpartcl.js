const canvas = document.getElementById("MyCanvas");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
// gradient.addColorStop(0,"rgb(108, 230, 28)");
// gradient.addColorStop(1,"rgb(212, 230, 21)");
// ctx.strokeStyle = gradient;
// ctx.fillStyle = gradient;

class Particles{
    constructor(effect , x , y,index){
        this.effect = effect;
        this.radius = Math.random()*10 + 5;
        this.maxDistance = 300;
        this.index = index;
        this.homeRadius =  30;
        this.originX = x;
        this.originY = y;

        this.x = this.originX;
        this.y = this.originY;
       
        this.vx = (Math.random()*1-0.5) ;
        this.vy = (Math.random()*1-0.5) ;
        this.slowDown ;

        // if (this.index% 40 == 0){
        //     this.radius = 30;
        //     this.vx = (Math.random()*5 - 2.5)*5;
        //     this.vy = (Math.random()*5-2.5)*3;
        //     }

        this.angle = 0;
        this.kickX = 0;
        this.kickY = 0;
        
    }
    draw(context){
        const gradient = context.createLinearGradient(0,0,this.effect.width,this.effect.height);
        gradient.addColorStop(0,"#f22734");
        gradient.addColorStop(1,"#f03580");   
        context.beginPath();
        context.fillStyle = gradient;
        context.strokeStyle ="white";
        context.lineWidth = 1.5;
        context.arc(this.x,this.y,this.radius,0,Math.PI*2);
        context.fill();
        context.stroke();

        context.beginPath();
        context.fillStyle = "white";
        context.arc(this.x-this.radius/3, this.y-this.radius/3,this.radius/2,0,Math.PI*2);
        context.fill();
    }
    update(){
        // if(this.effect.mouse.isPressed){
        //     let dx = -(this.effect.mouse.x - this.x);
        //     let dy = -(this.effect.mouse.y - this.y);
        //     let dist = Math.hypot(dx ,dy);
        //     if (dist<this.effect.mouse.radius){
        //         let angle  = Math.atan2(dy,dx);
        //         this.x += Math.cos(angle)*20;
        //         this.y += Math.sin(angle)*20;
                
        //     }

        // }
        this.x += this.vx;
        // this.kickX = 0;
        this.y += this.vy
        let dx = Math.abs(this.x-this.originX);
        let dy = Math.abs(this.x - this.originY);
        // let disp = Math.hypot(this.x - this.originX , this.y - this.originY);
        if(dx >Math.abs(this.vx*10)){
            this.vx *= -1;
            
        }
        if(dy > Math.abs(this.vy*10)){
            this.vy *= -1;
        }


        // if(this.index%40 ==0){
        //     this.x += ( 5*Math.cos(this.angle)) ;
        //     this.y += ( 5*Math.sin(this.angle)) ;
        //     this.angle += 0.1;
        // }


        // this.kickY = 0;
        //  this.x += - (this.x - this.originX)*0.01;
        //  this.y += - (this.y - this.originY)*0.01;

        // let dist = Math.hypot(Math.abs(this.x - this.originX , Math.abs(this.y - this.originY))) ;
        // this.effect.renewPosn();


        // if(dist >= this.motionRadius) {
        //     this.vx*= -1;
        //     this.x += this.vx;
        //     this.vy*= -1;
        //     this.y += this.vy;
        // }
        
        
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx*= -1;
        }
        if(this.x > this.effect.width-this.radius){
            this.x = this.effect.width-this.radius;
            this.vx*= -1;
        }
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy*= -1;
        }
        if(this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius;
            this.vy*= -1;
        }
        
    }
}

class Effect{
    constructor(canvas,context){
        this.canvas = canvas;
        this.context = this.canvas.context;
        this.height = this.canvas.height;
        this.width = this.canvas.width; 
        this.maxDistance = 90;
        this.particles = [];
        this.nParticles =300;
        this.mouse = {
            x:undefined,
            y:undefined,
            isPressed:false,
            radius:120
        }
        this.init();
        
        window.addEventListener("mousemove",e =>{
            if(this.mouse.isPressed ){
                this.mouse.x = e.x;
                this.mouse.y = e.y;
                
            }
        });
    
        window.addEventListener("mousedown",e =>{
            this.mouse.isPressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
            
        });
        window.addEventListener("mouseup",e => {
            this.mouse.isPressed = false;
        });
    }
    init(){
        for (let i=0; i<this.nParticles; i++){
            let x = Math.random()*this.width;
            let y = Math.random()*this.height;
            this.particles.push(new Particles(this,x,y,i));
        }
    }   
    renderParticles(context){
        this.particles.forEach(particles => {
            particles.draw(context);
            particles.update();
        });
        this.connectParticles(context);
    }
    connectParticles(context){
        for(let i = 0; i<this.nParticles; i++){
            for (let j=i ;j<this.nParticles; j++){
                let dx = this.particles[i].x - this.particles[j].x;
                let dy = this.particles[i].y - this.particles[j].y;
                let dist = Math.hypot(dx,dy);
                if(dist <= this.maxDistance){
                    context.save();
                context.beginPath();
                const gradient = context.createLinearGradient(0,0,this.width,this.height);
                gradient.addColorStop(0,"#f03580");
                gradient.addColorStop(1,"#f22734");
                context.strokeStyle = gradient;
                context.lineWidth = "2"
                context.moveTo(this.particles[i].x, this.particles[i].y);
                context.lineTo(this.particles[j].x, this.particles[j].y);
                context.stroke();
                context.restore();
                }
                
            }
        }
    }
    renewPosn(){
        this.particles.forEach(particles =>{
            particles.x += (particles.originX - particles.x)*0.0001;
            particles.y += (particles.originY - particles.y)*0.0001;
        });
    }
}
const effect = new Effect(canvas,ctx);

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.renderParticles(ctx);
    requestAnimationFrame(animate);
}
animate();