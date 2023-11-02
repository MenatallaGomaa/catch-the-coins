class Snake {
    constructor() {
        // initialtize properties
        this.positionX = 40;
        this.positionY = 40;
        this.height = 20;
        this.width = 20;
        this.backgroundColor = "blue";


        // DOM manipulation to reflect initial values 
        this.playerElm = document.createElement("div");

        this.playerElm.id = "player";
        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
        this.playerElm.style.backgroundColor = this.backgroundColor;
        this.playerElm.style.position = "absolute";
        this.playerElm.style.left = this.positionX + "px";
        this.playerElm.style.top = this.positionY + "px";

        document.body.appendChild(this.playerElm);

        // Add event listeners for arrow key presses
        document.addEventListener("keydown", (event) => {
            this.handleKeyPress(event);
        });
    }

    // for the snake movement

    handleKeyPress(event) {
        if (event.key === "ArrowUp") {
            this.moveUp();
        } else if (event.key === "ArrowDown") {
            this.moveDown();
        } else if (event.key === "ArrowLeft") {
            this.moveLeft();
        } else if (event.key === "ArrowRight") {
            this.moveRight();
        }
    }

    moveLeft() {
        this.positionX--;
        this.playerElm.style.left = this.positionX * this.width + "px";
    }

    moveRight() {
        this.positionX++;
        this.playerElm.style.left = this.positionX * this.width + "px";
    }

    moveUp() {
        this.positionY--;
        this.playerElm.style.top = this.positionY * this.height + "px";
    }

    moveDown() {
        this.positionY++;
        this.playerElm.style.top = this.positionY * this.height + "px";
    }
}

const snake = new Snake();
const snakeElement = document.getElementById("snake");


class Food {
    constructor() {
        this.positionX = 40;
        this.positionY = 40;
        this.width = 20;
        this.height = 20;
        this.foodElm = document.createElement("div");

        this.foodElm.id = "food";
        this.foodElm.style.width = this.width + "px";
        this.foodElm.style.height = this.height + "px";
        this.foodElm.style.backgroundColor = "red";
        this.foodElm.style.position = "absolute";

        // Generate random initial position for food
        this.randomizePosition();

        document.body.appendChild(this.foodElm);


    }

randomizePosition() {
    const gameBoard = document.getElementById("gameBoard");
    const boardWidth = gameBoard.clientWidth;
    const boardHeight = gameBoard.clientHeight;

    const maxX = (boardWidth / this.width) - 1;
    const maxY = (boardHeight / this.height) - 1;

    const randomX = Math.floor(Math.random() * maxX) * this.width;
    const randomY = Math.floor(Math.random() * maxY) * this.height;

    this.foodElm.style.left = randomX + "px";
    this.foodElm.style.top = randomY + "px";
}
}

const food = new Food();
const foodElement = document.getElementById("food");


//////////////////////////////////

class CollisionDetector {
    constructor(player, food) {
        this.player = player;
        this.food = food;
    }

    checkCollision() {
        if (
            this.player.positionX < this.food.positionX + this.food.width &&
            this.player.positionX + this.player.width > this.food.positionX &&
            this.player.positionY < this.food.positionY + this.food.height &&
            this.player.positionY + this.player.height > this.food.positionY
        ) {
            // Collision detected
            return true;
        }
        return false; // No collision
    }
}

//////////////////////

food.snake = snake; // Set the snake property in the Food class to access it for collision checking


//////////////////////
const collisionDetector = new CollisionDetector(snake, food);

// Example usage:
if (collisionDetector.checkCollision()) {
    console.log("Collision detected!");
} else {
    console.log("No collision.");
}

