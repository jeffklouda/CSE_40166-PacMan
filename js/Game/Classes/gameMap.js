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
    }
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