
class Piece {
    constructor(row, col, type, player) {
      this.row = row;
      this.col = col;
      this.type = type;
      this.player = player;
    }
  
    getRival() {
      if (this.player === WHITE_PLAYER) {
        return BLACK_PLAYER;
      }
      return WHITE_PLAYER;
    }
  
    getPossibleMoves(boardData) {
      let moves;
      if (this.type === PAWN) {
        moves = this.getPawnMoves(boardData);
      } else if (this.type === ROOK) {
        moves = this.getRookMoves(boardData);
      } else if (this.type === KNIGHT) {
        moves = this.getKnightMoves(boardData);
      } else if (this.type === BISHOP) {
        moves = this.getBishopMoves(boardData);
      } else if (this.type === KING) {
        moves = this.getKingMoves(boardData);
      } else if (this.type === QUEEN) {
        moves = this.getQueenMoves(boardData);
      } else {
        console.log("Unknown type", type)
      }
  
      let filteredMoves = [];
      for (const absoluteMove of moves) {
        const absoluteRow = absoluteMove[0];
        const absoluteCol = absoluteMove[1];
        if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
          filteredMoves.push(absoluteMove);
        }
      }
      return filteredMoves;
    }
  
    getPawnMoves(boardData) {
      let result = [];
      let direction = 1;
      if (this.player === BLACK_PLAYER) {
        direction = -1;
      }
  
      let position = [this.row + direction, this.col];
      if (boardData.isEmpty(position[0], position[1])) {
        result.push(position);
      }
  
      position = [this.row + direction, this.col + direction];
      if (boardData.isPlayer(position[0], position[1], this.getRival())) {
        result.push(position);
      }
  
      position = [this.row + direction, this.col - direction];
      if (boardData.isPlayer(position[0], position[1], this.getRival())) {
        result.push(position);
      }
  
  
      return result;
    }
  
    getRookMoves(boardData) {
      let result = [];
      result = result.concat(this.getMovesInDirection(-1, 0, boardData));
      result = result.concat(this.getMovesInDirection(1, 0, boardData));
      result = result.concat(this.getMovesInDirection(0, -1, boardData));
      result = result.concat(this.getMovesInDirection(0, 1, boardData));
      return result;
    }
  
    getMovesInDirection(directionRow, directionCol, boardData) {
      let result = [];
  
      for (let i = 1; i < BOARD_SIZE; i++) {
        let row = this.row + directionRow * i;
        let col = this.col + directionCol * i;
        if (boardData.isEmpty(row, col)) {
          result.push([row, col]);
        } else if (boardData.isPlayer(row, col, this.getRival())) {
          result.push([row, col]);
          console.log("rival");
          return result;
        } else if (boardData.isPlayer(row, col, this.player)) {
          console.log("player");
          return result;
        }
      }
      console.log("all empty");
      return result;
    }
  
    getKnightMoves(boardData) {
      let result = [];
      const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
      for (let relativeMove of relativeMoves) {
        let row = this.row + relativeMove[0];
        let col = this.col + relativeMove[1];
        if (!boardData.isPlayer(row, col, this.player)) {
          result.push([row, col]);
        }
      }
      return result;
    }
  
    getBishopMoves(boardData) {
      let result = [];
      result = result.concat(this.getMovesInDirection(-1, -1, boardData));
      result = result.concat(this.getMovesInDirection(-1, 1, boardData));
      result = result.concat(this.getMovesInDirection(1, -1, boardData));
      result = result.concat(this.getMovesInDirection(1, 1, boardData));
      return result;
    }
  
    getKingMoves(boardData) {
      let result = [];
      const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      for (let relativeMove of relativeMoves) {
        let row = this.row + relativeMove[0];
        let col = this.col + relativeMove[1];
        if (!boardData.isPlayer(row, col, this.player)) {
          result.push([row, col]);
        }
      }
      return result;
    }
  
    getQueenMoves(boardData) {
      let result = this.getBishopMoves(boardData);
      result = result.concat(this.getRookMoves(boardData));
      return result;
    }
  }

  function getInitialBoard() {
    let result = [];
    result.push(new Piece(0, 0, "rook", WHITE_PLAYER))
    result.push(new Piece(0, 1, "knight", WHITE_PLAYER))
    result.push(new Piece(0, 2, "bishop", WHITE_PLAYER))
    result.push(new Piece(0, 3, "queen", WHITE_PLAYER))
    result.push(new Piece(0, 4, "king", WHITE_PLAYER))
    result.push(new Piece(0, 5, "bishop", WHITE_PLAYER))
    result.push(new Piece(0, 6, "knight", WHITE_PLAYER))
    result.push(new Piece(0, 7, "rook", WHITE_PLAYER))
  
    result.push(new Piece(7, 0, "rook", BLACK_PLAYER))
    result.push(new Piece(7, 1, "knight", BLACK_PLAYER))
    result.push(new Piece(7, 2, "bishop", BLACK_PLAYER))
    result.push(new Piece(7, 3, "queen", BLACK_PLAYER))
    result.push(new Piece(7, 4, "king", BLACK_PLAYER))
    result.push(new Piece(7, 5, "bishop", BLACK_PLAYER))
    result.push(new Piece(7, 6, "knight", BLACK_PLAYER))
    result.push(new Piece(7, 7, "rook", BLACK_PLAYER))
    for (let i = 0; i <= 7; i++) {
      result.push(new Piece(1, i, "pawn", WHITE_PLAYER));
      result.push(new Piece(6, i, "pawn", BLACK_PLAYER));
    }
    return result;
  }
  