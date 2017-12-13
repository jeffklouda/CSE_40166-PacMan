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