const canvas = document.querySelector(".canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
console.log(ctx);


const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
        gradient.addColorStop(0,"blue");
        gradient.addColorStop(0.5,"#ff0066");
        gradient.addColorStop(1,"blue");
        ctx.fillStyle = gradient;
        ctx.strokeStyle = gradient;

ctx.lineWidth = 5;
console.log(ctx);



class Particles{
    constructor(effect,index){
        this.effect = effect;
        this.index = index;
        this.color = "red";
        this.radius = Math.random()*7 +5;
        this.x = this.radius + Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height - this.radius*2);
        this.vx = Math.random()*4 - 2;
        this.vy = Math.random()*4 - 2;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.98;
        if(this.index% 20 == 0){
            this.radius = 20;
            this.color = "white";
        }
    }
    draw(context){
            // context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x,this.y,this.radius,0,Math.PI*2);
            context.fill();
            context.stroke();
    }
    update(){
            
            
            if(this.effect.mouse.isPressed == true){
                const dx = this.x - this.effect.mouse.x;
                const dy = this.y - this.effect.mouse.y;
                const dist = Math.hypot(dx,dy);
                const force = (this.effect.mouse.radius/dist);
                if (dist<this.effect.mouse.radius){
                    
                    const angle = Math.atan2(dy,dx);
                    this.pushX += ((Math.cos(angle))*force);
                    this.pushY += ((Math.sin(angle))*force);
                }
            }
           
            this.x +=  (this.pushX ) + this.vx ;
            this.pushX*= this.friction;
            this.y +=  (this.pushY ) + this.vy ;
            this.pushY *=this.friction;

            if (this.x<this.radius){
                this.x = this.radius;
                this.vx *= -1;
                this.pushX *= -1;
            }
            else if (this.x>this.effect.width-this.radius){
                this.x = this.effect.width-this.radius;
                this.vx *= -1;
                this.pushX *= -1;
            }
            if (this.y<this.radius){
                this.y = this.radius;
                this.vy *= -1;
                this.pushY *= -1;
            }
            else if (this.y>this.effect.height-this.radius){
                this.y = this.effect.height-this.radius;
                this.vy *= -1;
                this.pushY *= -1;
            }
            
            
        // this.x = this.x + this.vx ;
        // if (this.x>this.effect.width-this.radius||this.x<this.radius){
        //     this.vx*= -1;
        // }
        // this.y = this.y + this.vy ;
        // if(this.y>this.effect.height-this.radius||this.y<this.radius){
        //     this.vy*= -1;
        // }
    }
    reset(){
        this.x = this.radius + Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height - this.radius*2);
    }
}



class Effect{
    constructor(canvas,context){
        this.canvas = canvas;
        this.context = context;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.particles = [];
        this.numberOfParticles = 400;
        this.maxLineDist = 80;
        this.angle = 0;
        this.mouse= {
            x: 0,
            y: 0,
            isPressed: false,
            radius: 130,
        }
        console.log(this.mouse.x);
        this.createParticles();

        window.addEventListener("resize",e=>{
            this.resize(e.target.window.innerWidth,e.target.window.innerHeight);
        });
        window.addEventListener("mousemove",e => {
            
            if(this.mouse.isPressed)
            {
               
                
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            }
        });
        window.addEventListener("mousedown", e => {
            
            
            this.mouse.isPressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;

        });
        window.addEventListener("mouseup",e =>{
            this.mouse.isPressed = false;
           
        })
    }
    createParticles(context){
        for(let i = 0;i<this.numberOfParticles;i++){
            this.particles.push(new Particles(this,i));
        }
    }
    handleParticles(context)
    {
        this.particles.forEach(particles => {
            particles.draw(context);
            particles.update();
        });
        this.connectParticles(context);
    }
    connectParticles(context){
        for(let i =0;i<this.numberOfParticles;i++){
        
            for(let j = i;j<this.numberOfParticles;j++){
                let dx = this.particles[i].x - this.particles[j].x;
                let dy = this.particles[i].y - this.particles[j].y;
                let dist = Math.hypot(dx,dy);
                if(dist<=this.maxLineDist){
                    context.beginPath();
                    context.moveTo(this.particles[i].x,this.particles[i].y);
                    context.lineTo(this.particles[j].x,this.particles[j].y);
                    context.lineWidth = 0.8;
                    context.stroke();   
                }
            }
        }
    }
 
    resize(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height=height;
        const gradient = this.context.createLinearGradient(0,0,width,height);
        gradient.addColorStop(0,"#ff33cc");
        gradient.addColorStop(0.5,"#ff0066");
        gradient.addColorStop(1,"#cc00ff");
        this.context.fillStyle = gradient;
        this.context.strokeStyle = gradient;
        this.context.lineWidth = 5;
        this.particles.forEach(particles => {
            particles.reset();
        });
     }

    }

const effect = new Effect(canvas,ctx);

console.log('hi');
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();