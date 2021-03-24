//Attributes.
var cardinalPoints;
var command;
cardinalPoints = prompt("Escribame la orientación del Rover: (N, S, E, O)");
command = prompt("Escribame el comando: (F=Adelante, L=Izquierda, R=Derecha)");
let cvs = document.getElementById("cvs");
let cvsContext = cvs.getContext('2d');

/**
 * Questions to ask the user to manage his Rover.
 */
function questions() {
    cardinalPoints = prompt("Escribame la orientación del Rover: (N, S, E, O)");
    command = prompt("Escribame el comando: (F=Adelante, L=Izquierda, R=Derecha)");
}


class Rectangle {
    //Constructors.
    constructor(x, y, height, width, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.xmom = 0;
        this.ymom = 0;
    }

    /**
     * Draw main rectangle layer in grid.
     */
    draw() {
        cvsContext.lineWidth = 1;
        cvsContext.fillStyle = this.color;
        cvsContext.strokeStyle = "white";
        cvsContext.fillRect(this.x, this.y, this.width, this.height);
        cvsContext.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Moves main rectangle layer in grid.
     */
    move() {
        this.x += this.xmom;
        this.y += this.ymom;
    }
}

class Circle {
    //Constructors.
    constructor(x, y, radius, color, xmom = 0, ymom = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.xmom = xmom;
        this.ymom = ymom;
        this.lens = 0;
    }

    /**
     * Draw Rover appearance;
     */
    draw() {
        cvsContext.lineWidth = 0;
        cvsContext.strokeStyle = this.color;
        cvsContext.beginPath();
        cvsContext.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true);
        cvsContext.fillStyle = this.color;
        cvsContext.fill();
        cvsContext.stroke();
    }

    /**
     * Rover movements.
     */
    move() {
        this.x += this.xmom;
        this.y += this.ymom;
    }
}

class Grid {
    //Constructors.
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.blocks = [];
        for (let q = 0; this.y < cvs.height; q++) {
            for (let q = 0; this.x < cvs.width; q++) {
                let block;
                if (Math.random() < .91) {
                    console.log(this.x);
                    console.log(this.y);
                    block = new Rectangle(this.x, this.y, this.height, this.width, color);
                } else {
                    console.log(this.x);
                    console.log(this.y);
                    block = new Rectangle(this.x, this.y, this.height, this.width, "grey");
                }
                this.blocks.push(block);
                this.x += this.width;
            }
            this.y += this.height;
            this.x = 0;
        }
    }

    /**
     * Draw Grids with their respective colours.
     */
    draw() {
        for (let b = 0; b < this.blocks.length; b++) {
            this.blocks[b].draw();
        }
    }
}

class Rover {
    //Constructors.
    constructor(grid, color) {
        this.grid = grid;
        this.body = new Circle(20, 20, Math.min(this.grid.width / 4, this.grid.height / 4), color);
        this.location = this.grid.blocks[Math.floor(Math.random() * this.grid.blocks.length)];
    }

    /**
     * Draw Rover in relation to where he is.
     */
    draw() {
        this.control();
        this.body.x = this.location.x + this.location.width / 2;
        this.body.y = this.location.y + this.location.height / 2;
        this.body.draw()
    }

    /**
     * Main control of Rover.
     */
    control() {
        if (cardinalPoints.length > 1) {
            alert("Solo tiene que contener 1 carácter la orientación del Rover, vuelva a escribirlo por favor.");
            questions();
        } else {
            switch (cardinalPoints.toUpperCase()) {
                case "N":
                    this.controlNorth();
                    break;
                case "S":
                    this.controlSouth();
                    break;
                case "E":
                    this.controlEast();
                    break;
                case "O":
                    this.controlWest();
                    break;
                default:
                    alert("El carácter introducido no concuerda con ninguna orientación, vuelva a escribirlo por favor.");
                    questions();
            }
        }
    }

    /**
     * Control movements to the north.
     */
    controlNorth() {
        for (let i = 0; i < command.length; i++) {
            switch (command.charAt(i).toUpperCase()) {
                case "F":
                    this.body.y -= this.grid.height;
                    break;
                case "L":
                    this.body.x -= this.grid.width;
                    break;
                case "R":
                    this.body.x += this.grid.width;
                    break;
                default:
                    alert("Algún carácter introducido está mal escrito, vuelva a escribirlo por favor.");
                    questions();
            }
        }
        this.move();
        questions();
    }

    /**
     * Control movements in the south.
     */
    controlSouth() {
        for (let i = 0; i < command.length; i++) {
            switch (command.charAt(i).toUpperCase()) {
                case "F":
                    this.body.y += this.grid.height;
                    break;
                case "L":
                    this.body.x -= this.grid.width;
                    break;
                case "R":
                    this.body.x += this.grid.width;
                    break;
                default:
                    alert("Algún carácter introducido está mal escrito, vuelva a escribirlo por favor.");
                    questions();
            }
        }
        this.move();
    }

    /**
     * Control movements to the east.
     */
    controlEast() {
        for (let i = 0; i < command.length; i++) {
            switch (command.charAt(i).toUpperCase()) {
                case "F":
                    this.body.x += this.grid.width;
                    break;
                case "L":
                    this.body.y -= this.grid.height;
                    break;
                case "R":
                    this.body.y += this.grid.height;
                    break;
                default:
                    alert("Algún carácter introducido está mal escrito, vuelva a escribirlo por favor.");
                    questions();
            }
        }
        this.move();
    }

    /**
     * Control movements to the west.
     */
    controlWest() {
        for (let i = 0; i < command.length; i++) {
            switch (command.charAt(i).toUpperCase()) {
                case "F":
                    this.body.x -= this.grid.width;
                    break;
                case "L":
                    this.body.y -= this.grid.height;
                    break;
                case "R":
                    this.body.y += this.grid.height;
                    break;
                default:
                    alert("Algún carácter introducido está mal escrito, vuelva a escribirlo por favor.");
                    questions();
            }
        }
        this.move();
    }

    /**
     * Execute movements and control obstacles.
     */
    move() {
        for (let g = 0; g < this.grid.blocks.length; g++) {
            if (this.body.x > this.grid.blocks[g].x) {
                if (this.body.y > this.grid.blocks[g].y) {
                    if (this.body.x < this.grid.blocks[g].x + this.grid.blocks[g].width) {
                        if (this.body.y < this.grid.blocks[g].y + this.grid.blocks[g].height) {
                            if (this.grid.blocks[g].color != "grey") {
                                console.log(this.grid.blocks[g]);
                                this.location = this.grid.blocks[g];
                            } else {
                                alert("No puedes moverte para esa dirección porque se encuentra un obstáculo, vuelve a reorientar a Rover.");
                                questions();
                            }
                        }
                    } else {
                        alert("No puedes moverte para esa dirección porque se encuentra un obstáculo, vuelve a reorientar a Rover.");
                        questions();
                    }
                } 
            } 
        }
    }
}

//Create all.
let board = new Grid(40, 40, "brown");
let smith = new Rover(board, "white");
board.draw();
smith.draw();
