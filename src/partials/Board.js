import { SVG_NS } from '../settings';

export default class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', '#353535');
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);

        //Create line down the middle of the board
        let line = document.createElementNS(SVG_NS, 'line');
        //Set x coordinate which is half of the board
        line.setAttributeNS(null, 'x1', (this.width / 2));
        // Set y coordinate to the top of the board
        line.setAttributeNS(null, 'y1', 0);
        //Set x coordinate which is half of the board
        line.setAttributeNS(null, 'x2', (this.width / 2));
        //Set x coordinate which is the total height of the board (the bottom)
        line.setAttributeNS(null, 'y2', this.height);
        //Add strke attributes and values
        line.setAttributeNS(null, 'stroke', 'white');
        line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
        line.setAttributeNS(null, 'stroke-width', 4);

        svg.appendChild(rect);
        svg.appendChild(line);
        //wallCollision
    }
}