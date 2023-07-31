const canvas = document.querySelector(".canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d');
canvas.height= window.innerHeight;
canvas.width = window.innerWidth;


ctx.strokeStyle = "white";
ctx.fillStyle = "blue";


class Particles{
    constructor(effect){
        this.size = 10;
        this.x =  Math.random() * this.effect.width;
        this.y = Math.random() *this.effect.height;
        this.speedX = Math.random()*5 - 2.5;
        this.speedY = Math.random()*5 - 2.5;
        // this.color = ;


    }
    draw(context){
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI*2);
        context.stroke();
        console.log("draw");
    }
    reset(){
        this.x=Math.random()*this.effect.height;
        this.y=Math.random()*this.effect.width;
    }
}


class Cavnascontroller{
    constructor(canvas,context){
        this.canvas = canvas;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.particlesNumber = 20;
        this.particles = [];
        this.maxParticles = 100;
        this.context = context;


        window.addEventListener("resize",e =>{
            this.resize(e.target.window.innerHeight,e.target.window.innerWidth);
        });
    }
    init(){
        for(let i = 0; i<this.particlesNumber; i++){
            this.particles.push( new Particles(this));
        }
        
    }
    createParticles(context){
        this.init();
        this.particles.forEach(particles => {
            particles.draw(context);
        });
    }
    resize(height,width){
        
            this.canvas.height=height;
            this.canvas.width=width;
            this.height=height;
            this.width=width;
            console.log(this.context);
            this.context.fillStyle= "white";
            this.context.strokeStyle="white";
            console.log(this.context);
            console.log("context fill stroke updated");
            this.particles.forEach(particles =>{
                particles.reset();
            })
        
    }
}
const effect = new Cavnascontroller(canvas,ctx);
console.log(effect);
effect.createParticles(ctx);
// function animate(){
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     effect.createParticles(ctx);
//     console.log("animate executed");
//     if(effect.particles.length>=effect.maxParticles )
//     {
//         for(let i=0;i<effect.maxParticles;i++)
//         {  
//             effect.particles.shift();
//         }
//     }
//     requestAnimationFrame(animate);
// }
// animate();