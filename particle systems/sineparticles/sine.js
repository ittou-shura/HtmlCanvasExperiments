const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "white";
const Radius = 10;
let maxParticles = canvas.width/Radius*2;
particles = [];


class Particles{
    constructor(i,y,radius){
        
        this.y=y;
        this.radius=radius;
        this.x = i*this.radius*2+this.radius;
        this.angle = 0;
        
    }
    draw(c){
        ctx.fillStyle = "hsl("+c*0.07+",100%,50%)";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }
    update(k){
        this.y =canvas.height*0.5+  Math.sin(this.x/0.9)*k*80;
        // this.radius =Math.abs(Math.sin(this.x/0.1)*k*18) ;
        
    }
    resetParticles(){
        this.y =canvas.height*0.5+  Math.sin(this.x/0.9)*k*80;
    }
}

function particleGenerator(radius){
    for (let i=0; i<maxParticles; i++){
        particles.push(new Particles(i,canvas.height*0.5,radius));
    }
    
}
function render(c){
    particles.forEach(particle => {
        particle.draw(c);
        c+=15;
    });
}

function connectParticles(c){
    
    for (let i=1;i<particles.length;i+=2){
        if(i+1 < particles.length && i-1 != -1){
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${c+120},100%,50%)`;
            ctx.lineWidth = 2;
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[i+1].x,particles[i+1].y);
            ctx.lineTo(particles[i-1].x,particles[i-1].y)
            ctx.stroke();
        }
        
        // ctx.moveTo(particles[i].x,particles[i].y);
        // ctx.lineTo(particles[i+1].x,particles[i+1].y);
        // ctx.lineTo(particles[i-1].x,particles[i-1].y);
        // ctx.lineTo(particles[i+1].x,particles[i+1].y);
        // ctx.lineTo(particles[i+3].x,particles[i+3].y);
        
    }
}
function connectParticles2(c){
    for (let i=1;i<particles.length;i+=2){
        if(i-1!= -1 && i+1<particles.length){
            ctx.beginPath();
    
            ctx.strokeStyle = `hsl(${c+180},80%,50%)`;
            ctx.lineWidth = 2;
            ctx.moveTo(particles[i-1].x,particles[i-1].y);
            ctx.lineTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[i+2].x,particles[i+2].y);

            ctx.stroke();
        }
            
        
        // ctx.moveTo(particles[i].x,particles[i].y);
        // ctx.lineTo(particles[i-1].x,particles[i-1].y);
        // ctx.lineTo(particles[i+1].x,particles[i+1].y);
        

    }
}
let k=0;
let c=0;

window.addEventListener("resize",e =>{
    resize(e.target.window.innerWidth,e.target.window.innerHeight);
})

function resize(width,height){
    canvas.height=height;
    canvas.width = width;
    maxParticles = canvas.width/Radius*2;
    particles.forEach(particle =>{
        particle.resetParticles();
    });
}


particleGenerator(Radius);
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
        
        render(c);
        for(let i=0;i<particles.length;i++){
            particles[i].update(Math.sin(k));
        }
        k+=1/20;
       
        
        connectParticles2(c);
        connectParticles(c);

        c+=10;
    requestAnimationFrame(animate);

}
animate();