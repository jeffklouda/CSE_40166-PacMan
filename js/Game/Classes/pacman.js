class PacMan {
  constructor(position){
    this.position = position;
    this.startPosition = position;
    this.direction = Direction.RIGHT;
    this.lastDirection = Direction.RIGHT;
    this.lives = 5;
    this.alive = true;
    this.respawn = false;
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