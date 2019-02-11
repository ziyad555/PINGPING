// Game.js
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import { SVG_NS } from '../settings';
import { KEYS } from '../settings';
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
    // Create a board object and set width and height to game width and height
    this.board = new Board(this.width, this.height);
    this.ball = new Ball(8, this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      // Game/Board height
      this.height,
      // Paddle width and height
      this.paddleWidth,
      this.paddleHeight,
      // Gap between paddle and board side
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    )

    this.player2 = new Paddle(
      // Game/Board height
      this.height,
      // Paddle width and height
      this.paddleWidth,
      this.paddleHeight,
      // Gap between paddle and right board side
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
    )

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    document.addEventListener('keydown', event => {
      //change boolean from true to false 
      switch(event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          // console.log(this.pause);
          break;
      }
    });
  }

  render() {
    // pause the game
    if(this.pause) {
      return;
    }

    // Be sure to empty out before rendering again
    this.gameElement.innerHTML = '';

    let svg = document.createElementNS(SVG_NS, 'svg');

    //Set attributes
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    
    //Append svg to our game element (selected by id)
    this.gameElement.appendChild(svg);

    // render the game components inside the SVG
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    // render and update the score component based on player score
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
