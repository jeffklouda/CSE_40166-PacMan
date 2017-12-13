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
    newGhost.entering = false;
    newGhost.direction = Direction.RIGHT;
    newGhost.position.x = 11;
    newGhost.position.y = 13;
    ghost.state = GhostState.WAITING;
    ghost.direction = Direction.STAY;

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