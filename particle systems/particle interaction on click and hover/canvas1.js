const canvas = document.querySelector(".canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ctx.fillStyle = "blue";
//     ctx.beginPath();
//     ctx.arc(100,100,150,0,Math.PI*2);
//     ctx.fill();

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(100,100,150,0,Math.PI*2);
    // ctx.fill();
});

// ctx.fillStyle = "blue";
// ctx.fillRect(0,0, 150,150);

particleArray = [];
hue = 0;


const mouse = {
    x:undefined,
    y:undefined,
};


canvas.addEventListener("click",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<9; i++){
        particleArray.push(new Particles());
    }
    if(particleArray.length >=50){
        particleArray.shift();
    }
});


class Particles{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.speedX = Math.random()*5 - 2.5;
        this.speedY = Math.random()*5 - 2.5;
        this.size = Math.random()*10 + 1;
        this.color = "hsl(" + hue + ",100% ,50%)"
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.1)
        {
            this.size -= 0.1;
        }
        
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }

}


// function init(){
//     for(let i = 0; i < 10 ; i++)
//     {
//         particleArray.push(new Particles());
//         console.log(particleArray[i]);
//     }
// }

// init();

function particleEffector(){
    for(let i=0; i<particleArray.length; i++)
    {
        particleArray[i].update();
        particleArray[i].draw();
        console.log("particles have been drawn");
        // if(particleArray[i].size <= 0.3 ){
        //     particlesArray.splice(i,1);
        //     i--;
        // }
        for(let j=i; j<particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = particleArray[i].size/4;
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
            } 
        }

    }
}

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    particleEffector();
    hue+=5;
   
    console.log("animate block executed");
    requestAnimationFrame(animate);
    
}

animate();