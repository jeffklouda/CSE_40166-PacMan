class Game {
  constructor(prototype){
    this.map = new GameMap(prototype);
    this.pacman = new PacMan(new Position(23, 12));
    this.ghosts = [
      new Ghost(new Position(11, 13), 1, GhostName.BLINKY, Direction.LEFT),
      new Ghost(new Position(11, 15), 0.2, GhostName.PINKY, Direction.RIGHT),
      new Ghost(new Position(14, 13), 0.4, GhostName.INKY, Direction.STAY),
      new Ghost(new Position(14, 15), 0.7, GhostName.CLYDE, Direction.STAY)
    ];
    this.moveDirection = Direction.RIGHT;
    this.score = 0;

    this.deployments = {
      activeGhosts: [this.ghosts[0], this.ghosts[1]],
      inactiveGhosts: [this.ghosts[2], this.ghosts[3]],
      returnTargets: new Map()
    }
  }

  update(direction){
    console.log(this.pacman.alive, !this.pacman.respawn, this.pacman.lives);
    if(this.pacman.alive && !this.pacman.respawn){
      this.pacman.move(this, direction);

      this.ghosts.forEach(function(ghost){
        if(ghost.alive) ghost.move(this);
      }.bind(this));
    }else if(this.pacman.respawn){
      this.respawn();
    }
  }

  setDirection(direction){
    this.moveDirection = direction;
  }

  respawn(){
    this.pacman.position = new Position(23, 12);
    this.pacman.respawn = false;
    this.ghosts = [
      new Ghost(new Position(11, 13), 1, GhostName.BLINKY, Direction.LEFT),
      new Ghost(new Position(11, 15), 0.2, GhostName.PINKY, Direction.RIGHT),
      new Ghost(new Position(14, 13), 0.4, GhostName.INKY, Direction.STAY),
      new Ghost(new Position(14, 15), 0.7, GhostName.CLYDE, Direction.STAY)
    ];
    this.deployments.activeGhosts = [this.ghosts[0], this.ghosts[1]];
    this.deployments.inactiveGhosts = [this.ghosts[2], this.ghosts[3]];
    this.moveDirection = Direction.RIGHT;
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
    if (i > -1){
      this.deployments.activeGhosts.splice(index, 1);
    }

    var j = Math.floor(Math.random() * (this.deployments.inactiveGhosts.length));
    var newGhost = this.deployments.inactiveGhosts[j];
    this.deployments.returnTargets.set(ghost, {target: newGhost.position, previousGhost: newGhost});

    newGhost.state = GhostState.ENTERING;
    newGhost.direction = Direction.UP;
    this.deployments.activeGhosts.push(newGhost);
  }

  updateBox(ghost){
    for(let [k,v] of this.deployments.returnTargets){
      if(v.previousGhost == ghost){
        k.position = v.target;
        k.alive = true;
        k.state = GhostState.WAITING;
        k.direction = Direction.STAY;
      }
    }
  }

  updateTile(position){
    var x = position.x, y = position.y;
    if(this.map.board[x][y].content == TileContents.DOT){
      this.map.board[x][y].content = TileContents.EMPTY;
      game.score += 10;
    }else if(this.map.board[x][y].content == TileContents.PELLET){
      this.map.board[x][y].content = TileContents.EMPTY;
      game.score += 50;
      this.ghosts.forEach(function(ghost){
        ghost.startBlueMode();
      });
    }
  }
}