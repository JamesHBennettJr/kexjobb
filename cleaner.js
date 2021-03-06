

class Cleaner {
  constructor(x,y,radius,color,ang, speed){
    this.x=x;
    this.y=y;
    this.startx = x;
    this.starty = y;
    this.radius=radius;
    this.color=color;
    this.ang=ang;
    this.speed = speed;
    this.trace=[[x,y]];
    this.totalAng = 0;
  }
  render(){
    ctx.globalAlpha=0.1;
    ctx.strokeStyle=this.color;
    ctx.lineWidth=2*this.radius;
    let i =this.trace.length-1;
      ctx.beginPath();
      ctx.moveTo(this.trace[i-1][0],this.trace[i-1][1]);
      ctx.lineTo(this.trace[i][0],this.trace[i][1]);
      ctx.stroke();


  }

  rotate(ang){
      //console.log("Rotating ... "+ang + "\n"+this.ang); 
      if(ang > Math.PI*2) ang -= Math.PI*2;
      if(Math.abs(this.ang - ang) > Math.PI) {
          this.totalAng += 2*Math.PI - Math.abs(this.ang-ang);
      } else {
          this.totalAng += Math.abs(this.ang-ang);
      }
      this.ang = ang;
  }

  bounceRight(){
    if(this.ang<Math.PI/2) this.rotate(Math.PI/2 + Math.random()*Math.PI/2);
    else this.rotate(Math.PI + Math.random()*Math.PI/2);
  }
  bounceLeft(){
    if(this.ang>Math.PI/2&&this.ang<Math.PI) this.rotate(Math.PI/2 - Math.random()*Math.PI/2);
    else this.rotate(3*2*Math.PI/4 + Math.random()*Math.PI/2);
  }
  bounceTop(){
    if(this.ang<2*Math.PI&&this.ang>3*2*Math.PI/4) this.rotate(Math.random()*Math.PI/2);
    else this.rotate(Math.PI/2+Math.random()*Math.PI/2);
  }
  bounceBottom(){
    if(this.ang<Math.PI/2) this.rotate(3*2*Math.PI/4+Math.random()*Math.PI/2);
    else this.rotate(Math.PI+Math.random()*Math.PI/2)
  }
  move(){
    //this.trace.pop();

    this.x += (this.speed*Math.cos(this.ang));
    this.y += (this.speed*Math.sin(this.ang));
    if(this.x+this.radius>canvas.width) {
      this.bounceRight();
      this.x=canvas.width-this.radius;
      this.trace.push([this.x,this.y]);
    }
    else if(this.x-this.radius<0) {
      this.bounceLeft();
      this.x=this.radius+0;
      this.trace.push([this.x,this.y]);
    }
    else if(this.y-this.radius<0) {
      this.bounceTop();
      this.y=this.radius;
      this.trace.push([this.x,this.y]);
    }
    else if(this.y+this.radius>canvas.height) {
      this.bounceBottom();
      this.y=canvas.height-this.radius;
      this.trace.push([this.x,this.y]);
    }
    this.trace.push([this.x,this.y]);
  }
}
