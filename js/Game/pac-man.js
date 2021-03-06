var warp_l = {x: 14, y: 1};
var warp_r = {x: 14, y: 26};

var boardPrototype = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,4,2,2,2,2,2,2,1,1,2,2,2,2,2,2,4,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,4,2,2,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,2,2,4,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,4,1,1,2,2,2,2,1,1,2,2,2,2,1,1,4,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,1,1,1,1,1],
  [1,6,0,0,0,0,4,0,0,4,5,5,5,5,5,5,5,5,4,0,0,4,0,0,0,0,7,1],
  [1,1,1,1,1,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,4,0,0,0,0,0,0,0,0,4,1,1,2,1,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,4,2,2,4,2,2,2,1,1,2,2,2,4,2,2,4,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,3,2,2,1,1,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,1,1,2,2,3,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,4,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,4,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,4,2,2,4,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var GhostState = {
  NORMAL: 1,
  BLUE: 2,
  WAITING: 3
};

var GhostName = {
  BLINKY: 1,
  INKY: 2,
  CLYDE: 3,
  PINKY: 4
}

var Direction = {
  UP: 1,
  DOWN: -1,
  LEFT: -2,
  RIGHT: 2,
  STAY: 0,
  getComplements: function(direction){
    if(direction == this.UP || direction == this.DOWN){
      return [this.LEFT, this.RIGHT];
    }else if (direction == this.RIGHT || direction == this.LEFT){
      return [this.UP, this.DOWN];
    }
  }
}

var TileType = {
  NORMAL: 1,
  WALL: 2,
  INTERSECTION: 3,
  BOX: 4,
  WARP_LEFT: 6,
  WARP_RIGHT: 7
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

class Tile{
  constructor(type, content){
    this.type = type;
    this.content = content;
  }
}

class Ghost {
  constructor(position, probability, name, direction){
    this.alive = true;
    this.name = name;
    this.position = position;
    this.entering = false;
    this.direction = direction;
    this.state = (direction == Direction.STAY ? GhostState.WAITING : GhostState.NORMAL);
    this.probability = probability;
    this.counter = 0;
  }


  move(game){
    if(this.state == GhostState.WAITING || this.direction == Direction.STAY){
        return;
    }
    
    this.normalMove(game);
    
    if (game.map.isLeftWarp(this.position.x, this.position.y)) {
        this.position.x = warp_r.x;
        this.position.y = warp_r.y;
    }
    else if (game.map.isRightWarp(this.position.x, this.position.y)) {
        this.position.x = warp_l.x;
        this.position.y = warp_l.y;
    }else if(game.map.hasIntersection(this.position)){
      if ((Math.random() <= this.probability) || (this.state == GhostState.BLUE)){
        this.handleIntersection(game);
      }else{
        this.randomMovement(game);
      }
    }else if(game.map.hasTwoWayIntersection(this.position)){
      this.handleTwoWayIntersection(game);
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

    if(this.state == GhostState.NORMAL) this.direction = this.getMinDirection(distances);
    else if(this.state == GhostState.BLUE) this.direction = this.getMaxDirection(distances);

  }

  randomMovement(game){
    var validOrientations = game.map.getValidOrientations(this.position);
    var currentDirIndex = validOrientations.indexOf(this.direction);
    if (currentDirIndex > -1) {
      validOrientations.splice(currentDirIndex, 1);
    }

    var min = 0, max = validOrientations.length -1;
    var index = Math.floor(Math.random() * (max - min +1)) + min;
    this.direction = validOrientations[index];

  }

  switchDirection(){
    this.direction *= (-1);
  }

  startBlueMode(){
    this.counter = 0;
    this.state = GhostState.BLUE;
  }

  updateCounter(){
    if(this.state == GhostState.BLUE) this.counter += 1;
    if(this.counter >= 100){
      this.counter = 0;
      this.state = GhostState.NORMAL;
    }
  }

  checkTile(game){

    if(game.pacManInPosition(this.position)){
      if(this.state != GhostState.BLUE) game.pacman.loseLife();
      else this.loseLife(game);
    }
  }

  loseLife(game){
    this.alive = false;
    game.killAndDeploy(this);
  }

  getDistanceTo(first, second){
    return Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2);
  }

  getMinDirection(distances){
    var direction = null;
    var minDistance = Infinity;
    for(let [k,v] of distances){
      if(v < minDistance) {
        direction = k;
        minDistance = v;
      }
    }

    return direction;
  }

  getMaxDirection(distances){
    var direction = null;
    var maxDistance = -1;
    for(let [k,v] of distances){
      if(v > maxDistance){
        direction = k;
        maxDistance = v;
      }
    }

    return direction;
  }

  handleCollition(game){
    var map = game.map;
    switch(this.direction){
      case Direction.UP:
        this.position.x += 1;
        break;
      case Direction.DOWN:
        this.position.x -= 1;
        break;
      case Direction.RIGHT:
        this.position.y -= 1;
        break;
      case Direction.LEFT:
        this.position.y += 1;
        break;
    }
  }

}

class GameMap {
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
      case 6: return new Tile(TileType.WARP_LEFT, TileContents.EMPTY);
      case 7: return new Tile(TileType.WARP_RIGHT, TileContents.EMPTY);
    }
  }

  isLeftWarp(x, y) {
    return (this.board[x][y].type == TileType.WARP_LEFT);
  }
  isRightWarp(x, y) {
    return (this.board[x][y].type == TileType.WARP_RIGHT);
  }

  hasWall(x, y){
    return this.board[x][y].type == TileType.WALL || this.board[x][y].type == TileType.BOX;
  }

  hasBox(position){
    this.board[position.x][position.y].type == TileType.BOX;
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

    if (this.board[x+1][y].type == TileType.NORMAL) valid.push(Direction.DOWN);
    if (this.board[x-1][y].type == TileType.NORMAL) valid.push(Direction.UP);
    if (this.board[x][y+1].type == TileType.NORMAL) valid.push(Direction.RIGHT);
    if (this.board[x][y-1].type == TileType.NORMAL) valid.push(Direction.LEFT);

    return valid;
  }
};

class PacMan {
  constructor(position){
    this.position = position;
    this.startPosition = position;
    this.direction = Direction.RIGHT;
    this.lastDirection = Direction.RIGHT;
    this.lives = 5;
    this.alive = true;
    this.respawn = false;
    this.respawnCounter = 0;
    this.moving=false;
  }
  checkWall(game, dir) {
      switch(dir){
        case Direction.UP:
            return game.map.hasWall(this.position.x - 1, this.position.y);

        case Direction.DOWN:
            return game.map.hasWall(this.position.x + 1, this.position.y);

        case Direction.RIGHT:
            return game.map.hasWall(this.position.x, this.position.y + 1);

        case Direction.LEFT:
            return game.map.hasWall(this.position.x, this.position.y - 1);
    }
  }

  move(game, direction){
    var map = game.map;
    this.moving = true;
    switch(this.direction) {
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
    if (map.isLeftWarp(this.position.x, this.position.y)) {
        this.position.x = warp_r.x;
        this.position.y = warp_r.y;
    }
    else if (map.isRightWarp(this.position.x, this.position.y)) {
        this.position.x = warp_l.x;
        this.position.y = warp_l.y;
    }

    if (this.direction != Direction.STAY) {
        this.lastDirection = this.direction;
    }
    if (this.checkWall(game, direction)) {
        if (this.checkWall(game, this.direction)) {
            this.direction = Direction.STAY;
        }
    } else {
        this.direction = direction;
    }
    
    this.checkTile(game);
  }

  checkTile(game){
    var ghostInPosition = game.ghostInPosition(this.position, null);
    if(ghostInPosition.bool){
      if(ghostInPosition.ghost.state == GhostState.BLUE){
        ghostInPosition.ghost.loseLife(game);
      }else{
        this.loseLife();
        return;
      }
    }

    game.updateTile(this.position);
  }

  loseLife(){
    this.respawn = true;
    this.lives -= 1;
    if (this.lives == 0) this.alive = false;
  }

}

class Game {
  constructor(prototype){
    this.map = new GameMap(prototype);
    this.pacman = new PacMan(new Position(23, 12));
    this.pacman.moving = false;
    this.ghosts = [
      new Ghost(new Position(11, 13), 1, GhostName.BLINKY, Direction.LEFT),
      new Ghost(new Position(11, 15), 0.2, GhostName.PINKY, Direction.RIGHT),
      new Ghost(new Position(14, 13), 0.4, GhostName.INKY, Direction.STAY),
      new Ghost(new Position(14, 15), 0.7, GhostName.CLYDE, Direction.STAY)
    ];
    this.moveDirection = Direction.RIGHT;
    this.score = 0;
    this.pause = false;
    
    this.deployments = {
      activeGhosts: [this.ghosts[0], this.ghosts[1]],
      inactiveGhosts: [this.ghosts[2], this.ghosts[3]],
    }
  }

  update(direction){
    if(this.pacman.alive && !this.pacman.respawn && this.score != 2660){

      this.pacman.move(this, direction);

      for(var i = 0; i < this.ghosts.length; i += 1) {
        if(this.ghosts[i].alive) {
            this.ghosts[i].move(this);
        }
        this.ghosts[i].updateCounter();
      }
    }else if(this.pacman.respawn){
      this.respawn();
    }
  }

  setDirection(direction){
    this.moveDirection = direction;
  }

  respawn(){
    this.pacman.position = new Position(23, 12);
    this.pacman.moving = false;
    this.pacman.respawn = false;
    this.ghosts = [
      new Ghost(new Position(11, 13), 1, GhostName.BLINKY, Direction.LEFT),
      new Ghost(new Position(11, 15), 0.2, GhostName.PINKY, Direction.RIGHT),
      new Ghost(new Position(14, 13), 0.4, GhostName.INKY, Direction.STAY),
      new Ghost(new Position(14, 15), 0.7, GhostName.CLYDE, Direction.STAY)
    ];
    this.deployments = {
      activeGhosts: [this.ghosts[0], this.ghosts[1]],
      inactiveGhosts: [this.ghosts[2], this.ghosts[3]],
    }
    this.moveDirection = Direction.RIGHT;
    this.pacman.direction = Direction.RIGHT;
    if (this.pacman.lives < 1) {
        this.deployments.activeGhosts[0].direction = Direction.STAY;
        this.deployments.activeGhosts[1].direction = Direction.STAY;
        this.pacman.direction = Direction.STAY;
    }
  }

  pacManInPosition(position){
    return ((this.pacman.position.x == position.x)
      && (this.pacman.position.y == position.y));
  }

  ghostInPosition(position, caller){
    for(let ghost of this.ghosts){
      if((caller != ghost) && (ghost.position.x == position.x) && (ghost.position.y == position.y)){
        return {bool: true, ghost: ghost};
      }
    }

    return {bool: false, ghost: null};
  }

  killAndDeploy(ghost){
    var i = this.deployments.activeGhosts.indexOf(ghost);
    var j = Math.floor(Math.random() * (this.deployments.inactiveGhosts.length));
    var newGhost = this.deployments.inactiveGhosts[j];
    ghost.position.x = newGhost.position.x;
    ghost.position.y = newGhost.position.y;
    newGhost.state = GhostState.NORMAL;
    newGhost.alive = true;
    newGhost.entering = false;
    newGhost.direction = Direction.RIGHT;
    newGhost.position.x = 11;
    newGhost.position.y = 13;
    ghost.state = GhostState.WAITING;
    ghost.direction = Direction.STAY;
    //ghost.alive = true;

    this.deployments.activeGhosts[i] = newGhost;
    this.deployments.inactiveGhosts[j] = ghost;
  }

  updateTile(position){
    var x = position.x, y = position.y;
    if(this.map.board[x][y].content == TileContents.DOT){
      this.map.board[x][y].content = TileContents.EMPTY;
      this.score += 10;
    }else if(this.map.board[x][y].content == TileContents.PELLET){
      this.map.board[x][y].content = TileContents.EMPTY;
      this.score += 50;
      this.deployments.activeGhosts.forEach(function(ghost){
        ghost.startBlueMode();
      });
    }
  }

}
