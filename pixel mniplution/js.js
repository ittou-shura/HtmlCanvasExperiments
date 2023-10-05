window.addEventListener('load', function(){
    const canvas = document.getElementById('MyCanvas');
    const ctx = canvas.getContext('2d',{willReadFrequently:true});

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
    
    // ctx.drawImage(image1,250,800);

    class Particle{
        constructor(effect,x,y,color){
            this.effect = effect;
            this.canvas = this.effect.canvas;
            
             
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);

            this.x = this.originX;
            this.y = this.originY;

      


            this.color = color;
            this.space = 0;
            this.size = this.effect.gap-this.space;
            this.ease  = 0.01;


        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x,this.y, this.size,this.size);
        }

        update(){
            this.x = this.x + (this.originX - this.x)*this.ease ;
            this.y = this.y + (this.originY - this.y)*this.ease;


        }   
        warp(){
            this.x = Math.random()*this.canvas.width;
            this.y = Math.random()*this.canvas.height;
        }
    }
    class Effect{
            constructor(canvas,context){
                this.canvas = canvas;
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.context = context;
                this.centerX  = this.width*0.5;
                this.centerY = this. height*0.5;
                this.image1 = document.getElementById("image1");
                console.log(this.image1);
                this.x = this.centerX - this.image1.width*0.5;
                this.y = this.centerY - this.image1.height*0.5;
                this.particles = [];

                this.gap = 4;
                this.createParticles(context);

            }

            createParticles(context){
                context.drawImage(this.image1,this.x,this.y);
                const pixels = context.getImageData(0,0,this.width,this.height).data;
                
                for(let y = 0 ; y < this.height ; y += this.gap)
                {
                    for (let x = 0 ; x < this.width; x += this.gap)
                    {
                        const index = (y*this.width + x)*4 ;
                        const red = pixels[index];
                        const green = pixels[index+1];
                        const blue = pixels[index+2];
                        const alpha = pixels[index+3];
                        const color = `rgb(${red},${green},${blue})`;
                        if (alpha>0)
                            this.particles.push(new Particle(this,x,y,color));
                    }
                }
            }
            draw(context){
                this.particles.forEach(particle=>
                    particle.draw(context));
                // context.drawImage(this.image1, this.x, this.y);
            }
            update(){
                this.particles.forEach(particle => particle.update());
            }
            warp(){
                this.particles.forEach(particle => particle.warp());
            }
    }
    const effect = new Effect(canvas,ctx);
    effect.createParticles(effect.context);
    function  animate(){

        ctx.clearRect(0,0,canvas.width,canvas.height);
        effect.draw(ctx);
        effect.update();

        requestAnimationFrame(animate);
    }
    animate();

    const warpButton = document.getElementById("warpbutton");
    warpButton.addEventListener("click" , function(){
            effect.warp();
    })
});