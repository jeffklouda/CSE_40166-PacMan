
var boardPrototype = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,4,2,2,2,2,2,2,1,1,2,2,2,2,2,2,4,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,4,2,2,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,4,1,1,2,2,2,2,1,1,2,2,2,2,1,1,4,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,1,1,1,1,1],
  [1,0,0,0,0,1,4,0,0,0,5,5,5,5,5,5,5,5,0,0,0,4,1,0,0,0,0,1],
  [1,1,1,1,1,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,4,2,2,4,2,2,2,1,1,2,2,2,4,2,2,4,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,4,2,2,4,2,2,2,2,2,2,2,2,4,2,2,4,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,4,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var GhostState = {
  NORMAL: 1,
  BLUE: 2,
  ENTERING: 3
};

var Direction = {
  UP: 1,
  DOWN: -1,
  LEFT: -2,
  RIGHT: 2,
  getComplements: function(direction){
    if(direction == this.UP || direction == this.DOWN){
      return [this.LEFT, this.RIGHT];
    }else if(direction == this.RIGHT || direction == this.LEFT){
      return [this.UP, this.DOWN];
    }
  }
}

var TileType = {
  NORMAL: 1,
  WALL: 2,
  INTERSECTION: 3,
  BOX: 4
}

var TileContents = {
  DOT: 0,
  EMPTY: 1,
  PELLET: 2
}

class Position {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Ghost {
  constructor(position, probability){
    this.alive = true;
    this.position = position;
    this.state = GhostState.NORMAL;
    this.direction = Direction.LEFT;
    this.probability = probability;
  }

  move(game){
    if(game.map.hasIntersection(this.position)){
      if (Math.random() <= this.probability){
        this.handleIntersection(game);
      }else{
        this.randomMovement(game);
      }
    }else if(game.map.hasTwoWayIntersection(this.position)){
      this.handleTwoWayIntersection(game);
    }else{
      this.normalMove(game);
    }
  }

  normalMove(game){
    var map = game.map;
    switch(this.direction){
      case Direction.UP:
        this.position.x -= 1;
        break;
      case Direction.DOWN:
        this.position.x += 1;
        break;
      case Direction.RIGHT:
        this.position.y += 1;
        break;
      case Direction.LEFT:
        this.position.y -= 1;
        break;
    }
    this.checkTile(game);
  }

  handleTwoWayIntersection(game){
    var validOrientations = game.map.getValidOrientations(this.position);
    var complements = Direction.getComplements(this.direction);

    for(let orientation of validOrientations){
        if(orientation == complements[0] || orientation == complements[1]){
          this.direction = orientation;
          break;
        }
    }

    this.move(game);
  }

  handleIntersection(game){
    var validOrientations = game.map.getValidOrientations(this.position);
    var distances = new Map();
    var x = this.position.x, y = this.position.y;

    validOrientations.forEach(function(direction){
      var distance = 0;
      switch(direction){
        case Direction.UP:
          distance = this.getDistanceTo(new Position(x - 1, y), game.pacman.position);
          break;
        case Direction.DOWN:
          distance = this.getDistanceTo(new Position(x + 1, y), game.pacman.position);
          break;
        case Direction.RIGHT:
          distance = this.getDistanceTo(new Position(x, y + 1), game.pacman.position);
          break;
        case Direction.LEFT:
          distance = this.getDistanceTo(new Position(x, y - 1), game.pacman.position);
          break;
      }
      distances.set(direction, distance);
    }.bind(this));

    this.direction = getMinimumDirection(distances);

    this.move(game);
  }

  randomMovement(){

  }

  switchDirection(){
    this.direction *= (-1);
  }

  startBlueMode(){

  }

  checkTile(game){
    if(game.ghostInPosition(this.position)){
      this.switchDirection();
      this.move(game);
      this.move(game);
    }

    if(game.pacManInPosition()){
      game.pacman.loseLife();
    }
  }

  getDistanceTo(first, second){
    return Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2);
  }

  getMinimumDirection(distances){
    var direction = null;
    var minDistance = Infinity;
    for(let [k,v] of distances){
      if(v < minDistance) direction = k;
    }

    return direction;
  }

}

class Tile{
  constructor(type, content){
    this.type = type;
    this.content = content;
  }
}

class Map {
  constructor(boardPrototype){
    var boardInfo = this.buildBoard(boardPrototype);
    this.board = boardInfo.board;
    this.width = boardInfo.width;
    this.height = boardInfo.height;
  }

  buildBoard(boardPrototype){
    var board = [], width = 0, height = 0;
    boardPrototype.forEach(function(row){
      height += 1;
      width = 0;
      var tileRow = [];
      row.forEach(function(num){
        width += 1;
        tileRow.push(this.getTile(num));
      }.bind(this));
      board.push(tileRow);
    }.bind(this));
    return {board: board, width: width, height: height};
  }

  getTile(element){
    switch(element){
      case 0: return new Tile(TileType.NORMAL, TileContents.EMPTY);
      case 1: return new Tile(TileType.WALL, TileContents.EMPTY);
      case 2: return new Tile(TileType.NORMAL, TileContents.DOT);
      case 3: return new Tile(TileType.NORMAL, TileContents.PELLET);
      case 4: return new Tile(TileType.INTERSECTION, TileContents.DOT);
      case 5: return new Tile(TileType.BOX, TileContents.EMPTY);
    }
  }

  hasWall(x, y){
    return this.board[x][y].type == TileType.WALL || this.board[x][y].type == TileType.BOX;
  }

  hasTwoWayIntersection(position){
    var freeBlocks = 0, x = position.x, y = position.y;
    if (this.board[x+1][y].type == TileType.NORMAL) freeBlocks += 1;
    if (this.board[x-1][y].type == TileType.NORMAL) freeBlocks += 1;
    if (this.board[x][y+1].type == TileType.NORMAL) freeBlocks += 1;
    if (this.board[x][y-1].type == TileType.NORMAL) freeBlocks += 1;

    return freeBlocks == 2;
  }

  hasIntersection(position){
    return this.board[position.x][position.y].type == TileType.INTERSECTION;
  }

  getValidOrientations(position){
    var valid = [];
    var x = position.x, y = position.y;

    if (this.board[x+1][y].type == TileType.NORMAL) valid.add(Direction.DOWN);
    if (this.board[x-1][y].type == TileType.NORMAL) valid.add(Direction.UP);
    if (this.board[x][y+1].type == TileType.NORMAL) valid.add(Direction.RIGHT);
    if (this.board[x][y-1].type == TileType.NORMAL) valid.add(Direction.LEFT);

    return valid;
  }
};

class PacMan {
  constructor(position){
    this.position = position;
    this.startPosition = position;
    this.direction = Direction.RIGHT;
    this.lives = 1;
    this.alive = true;
  }

  move(game){
    var map = game.map;
    switch(this.direction){
      case Direction.UP:
        if(!map.hasWall(this.position.x - 1, this.position.y))
          this.position.x -= 1;
        break;
      case Direction.DOWN:
        if(!map.hasWall(this.position.x + 1, this.position.y))
          this.position.x += 1;
        break;
      case Direction.RIGHT:
        if(!map.hasWall(this.position.x, this.position.y + 1))
          this.position.y += 1;
        break;
      case Direction.LEFT:
        if(!map.hasWall(this.position.x, this.position.y - 1))
          this.position.y -= 1;
        break;
    }
    this.checkTile(game);
  }

  checkTile(game){
    if(game.ghostInPosition(this.position)){
      this.loseLife();
      return;
    }

    game.updateTile(this.position);
  }

  loseLife(){
    
  }

}

class Game {
  constructor(prototype){
    this.map = new Map(prototype);
    this.pacman = new PacMan(new Position(12, 23));
    this.ghosts = [new Ghost(new Position(13, 11), 1)];
    this.moveDirection = Direction.RIGHT;
    this.score = 0;
  }

  update(){
    this.pacman.move(this);
    this.ghosts.forEach(function(ghost){
      ghost.move(this);
    }.bind(this));
  }

  setDirection(direction){
    this.moveDirection = direction;
    this.pacman.direction = direction;
  }

  pacManInPosition(position){
    return ((this.pacman.position.x == position.x)
      && (this.pacman.position.y == position.y));
  }

  ghostInPosition(position){
    for(let ghost of this.ghosts){
      if((ghost.position.x == position.x) && (ghost.position.y == position.y)){
        return true;
      }
    }

    return false;
  }

  updateTile(position){
    if(this.map.board[position.x][position.y].content == TileContents.DOT){
      this.map.board[position.x][position.y].content = TileContents.EMPTY;
      game.score += 10;
    }else if(this.map.board[position.x][position.y].content == TileContents.PELLET){
      this.map.board[position.x][position.y].content = TileContents.EMPTY;
      game.score += 50;
      this.ghosts.forEach(function(ghost){
        ghost.startBlueMode();
      });
    }
  }

}

var myMap = new Map(boardPrototype);
var game = new Game(boardPrototype);
console.log(game.pacman.position);
game.update();
console.log(game.pacman.position);
