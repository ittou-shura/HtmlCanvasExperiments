const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
class Particles{
    constructor(effect){
        this.effect = effect;
        this.size = 3;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.vx ;
        this.vy ;
        this.speedMod = Math.random()*3;
        this.history = [{x:this.x,y:this.y}];
        this.maxLength = 100;
        this.angle = 0;
        this.timer = this.maxLength*2;
        this.colors =['rgb(200, 31, 222)','rgb(245, 5, 189)','rgb(245, 5, 133)','rgb(230, 7, 66)'];
        this.color = this.colors[Math.floor(Math.random()*4)]
    }

    draw(context){
        // context.fillRect(this.x,this.y,this.size,this.size);
        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo(this.history[0].x,this.history[0].y);
        for(let i=0; i<this.history.length;i++){
            context.lineTo(this.history[i].x,this.history[i].y);
        }
        context.stroke();
    }   
    update(){
        this.timer--;
        if(this.timer >= 1){
                let x = Math.floor(this.x/this.effect.cellsize);
                let y = Math.floor(this.y/this.effect.cellsize);
                let index = y*this.effect.row + x;
                this.angle = this.effect.flowField[index];
                this.vx = Math.cos(this.angle);
                this.vy = Math.sin(this.angle);
                this.x += this.vx*this.speedMod;
                this.y += this.vy*this.speedMod;

                // this.angle += 0.5;
                // this.x += this.vx + Math.cos(this.angle)*5 ;
                // this.y += this.vy + Math.sin(this.angle)*5 ;


                this.history.push({x:this.x,y:this.y});

                if(this.history.length>this.maxLength){
                    this.history.shift();
                }
            }
        else if (this.history.length>1){
                 this.history.shift();
        }
        else{
            this.reset();
        }
    }
    reset(){
        this.x=Math.floor(Math.random()*this.effect.width);
        this.y=Math.floor(Math.random()*this.effect.height);
        this.history = [{x:this.x,y:this.y}];
        this.timer = this.maxLength*2;
    }
}

class Effect{
    constructor(canvas,context){
        this.canvas = canvas;
        this.context = context;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.cellsize = 20;
        this.row;
        this.col;

        this.particles = [];
        this.flowField = [];

        this.curve = 3;
        this.zoom = 0.038;
        this.noOfParticles = 900;


        this.debug = true;

        this.init();

        window.addEventListener("keydown",e=>{
            if(e.key === 'd') this.debug = !this.debug;
        });
        window.addEventListener("resize",e =>{
            this.resize(e.target.window.innerHeight,e.target.window.innerWidth);
        });
    }
    init(){
        this.row = Math.floor(this.height/this.cellsize);
        this.col = Math.floor(this.width/this.cellsize);
        this.flowField = [];
        for (let x=0;x<this.row;x++){
            for(let y=0;y<this.col;y++){
                let angle = (Math.cos(x*this.zoom) + Math.sin(y*this.zoom)) * this.curve;
                this.flowField.push(angle);
            }
        }
 
        this.particles = [];

        for(let i=0;i<this.noOfParticles;i++){
            this.particles.push(new Particles(this));
        }
        
    }
    render(context){
        if (this.debug)
        this.drawGrid(context);

        console.log("inside render");
        this.particles.forEach(particles => {
            particles.draw(context);
            particles.update();
        });
        
    }
    drawGrid(context){

        context.save();
        context.strokeStyle = "red";
        context.lineWidth = '0.3';
        for (let c = 0; c<this.col;c++){
            context.beginPath();
            context.moveTo(this.cellsize*c,0);
            context.lineTo(this.cellsize*c, this.height);
            context.stroke();
        }   
        for(let r = 0; r<this.row;r++){
            context.beginPath();
            context.moveTo(0,this.cellsize*r);
            context.lineTo(this.width,this.cellsize*r);
            context.stroke();
        }
        context.restore();
    
    }

    resize(height,width){
        this.canvas.height = height;
        this.canvas.width = width;
        this.height = height;
        this.width = width;
        this.init();
    }
}


const effect = new Effect(canvas,ctx);

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.render(ctx);
    console.log('animating');
    requestAnimationFrame(animate);
}
animate();

