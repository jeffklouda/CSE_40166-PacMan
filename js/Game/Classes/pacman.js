class PacMan {
  constructor(position){
    this.position = position;
    this.startPosition = position;
    this.direction = Direction.RIGHT;
    this.lives = 3;
    this.alive = true;
    this.respawn = false;
    this.respawnCounter = 0;
  }

  move(game, direction){
    var map = game.map;
    switch(direction){
      case Direction.UP:
        if(!map.hasWall(this.position.x - 1, this.position.y)){
          this.position.x -= 1;
          this.direction = direction;
        }
        break;
      case Direction.DOWN:
        if(!map.hasWall(this.position.x + 1, this.position.y)){
          this.position.x += 1;
          this.direction = direction;
        }
        break;
      case Direction.RIGHT:
        if(!map.hasWall(this.position.x, this.position.y + 1)){
          this.position.y += 1;
          this.direction = direction;
        }
        break;
      case Direction.LEFT:
        if(!map.hasWall(this.position.x, this.position.y - 1))
          this.position.y -= 1;
        break;
    }
    this.checkTile(game);
  }

  checkTile(game){
    var ghostInPosition = game.ghostInPosition(this.position, null);
    if(ghostInPosition.bool){
      if(ghostInPosition.ghost.state == GhostState.BLUE){
        ghostInPosition.ghost.loseLife();
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