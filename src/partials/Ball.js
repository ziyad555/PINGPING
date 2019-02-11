// Ball.js
import { SVG_NS } from '../settings';

export default class Ball {
  
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');

    // set the X and Y coordinates at the center
    this.reset();
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitLeft || hitRight) {
            this.vx = -this.vx;
        } else if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }

    // Or this for goal detection
    // if (hitLeft) {
    //   this.goal(player2);
    //   this.vx = -this.vx;
    // } else if (hitRight) {
    //   this.goal(player1);
    // } else if (hitTop || hitBottom) {
    //   this.vy = -this.vy;
    // }
  }

  paddleCollision(player1, player2) {
    // if moving toward the right end...
    if (this.vx > 0) { 
      // detect player2 paddle collision
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [ leftX, rightX, topY, bottomY ] = paddle;

      if ( 
        (this.x + this.radius >= leftX) // right edge of the ball is >= left edge of the paddle
        && (this.x + this.radius <= rightX) // right edge of the ball is <= right edge of the paddle
        && (this.y >= topY && this.y <= bottomY) // ball Y is >= paddle top Y and <= paddle bottom Y
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [ leftX, rightX, topY, bottomY ] = paddle;

      if (
        (this.x - this.radius <= rightX) // left edge of the ball is <= right edge of the paddle 
        && (this.x - this.radius >= leftX) // left edge of the ball is >= left edge of the paddle
        && (this.y >= topY && this.y <= bottomY) // ball Y is >= paddle top Y or <= paddle bottom
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  reset() {
    this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
    
    // generates random number between -5 and 5 that isn't 0
    this.vy = 0;
    
    while( this.vy === 0 ) {
      this.vy = Math.floor(Math.random() * 10 - 5);   
    }

    // a number between -5 and 5, based on this.vy
    // this guarantees that if vy is large, vx is small (and vice versa)
        this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg, player1, player2) {
    this.x += this.vx;
        this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    // draw ball
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
    circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
    circle.setAttributeNS(null, 'fill', 'white'); 
    svg.appendChild(circle);

    // Detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    
    if (rightGoal) {
            this.goal(player1);
      this.direction = 1;
        } else if (leftGoal) {
            this.goal(player2);
      this.direction = -1;
        }
  }

}