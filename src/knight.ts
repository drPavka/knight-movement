class Cell {
  private readonly x: number;
  private readonly y: number;
  private _distance: number = null;

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return String.fromCharCode(this.x + 'h'.charCodeAt(0) - 8).toUpperCase() + this.y.toString();
  }

  toArray() {
    return [this.x, this.y];
  }

  set distance(distance: number) {
    this._distance = distance;
  }

  get distance(): number {
    return this._distance;
  }

  static CREATE(x: number, y: number, distance: number = 0) {
    let c = null;
    if (Cell.IS_ON_BOARD(x, y)) {
      c = new Cell(x, y);
      c.distance = distance;
    }
    return c;
  }

  static CREATE_FROM_STRING(point: string) {
    let r = point.match(/^([a-hA-H])([1-8])$/);
    if (!r) {
      throw new Error('Wrong coordinates');
    }

    r = r.splice(1, 3);
    r[0] = (r[0].toLowerCase().charCodeAt(0) - 'h'.charCodeAt(0) + 8).toString();
    let c: number[] = r.map((i: string) => parseInt(i));

    return new Cell(c[0], c[1]);
  }


  static IS_ON_BOARD(x: number, y: number): boolean {
    return [x, y].every((i: number) => i > 0 && i <= 8);
  }

  static EQUAL(c1: Cell, c2: Cell): boolean {
    return JSON.stringify(c1.toArray()) === JSON.stringify(c2.toArray());
  }
}
class Board {
  private visited: Cell[] = [];

  visit(cell:Cell){
    this.visited.push(cell);
  }
  is_visited(cell:Cell){
    return this.visited.some((visited_point: Cell) => {
      return Cell.EQUAL(cell, visited_point);
    })
  }

}
class Player{
  private cells: Cell[] = [];
  add_to_queue(cell:Cell){
    this.cells.push(cell);
  }
  *possible_steps(c:Cell){
    const steps = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1]
    ];
    for (let i = 0; i < steps.length; i++) {
      let [x, y] = steps[i];
      let [c_x, c_y] = c.toArray();

      let new_cell = Cell.CREATE(c_x + x, c_y + y);
      if (new_cell) {
        yield new_cell;
      }
    }
  }
}





export function knight(start_point: string, end_point: string): any {
  const player = new Player();
  const board = new Board();

  let p1 = Cell.CREATE_FROM_STRING(start_point);
  let p2 = Cell.CREATE_FROM_STRING(end_point);
  p1.distance = 0;

  board.visit(p1);
  player.add_to_queue(p1);

  while (cells.length) {
    let p = cells.shift();
    let d = p.distance;

    if (Cell.EQUAL(p, p2)) {
      return d;
    }

    for (let n of possible_steps(p)) {
      if (n && !is_visited(n)) {
        n.distance = d + 1;
        visited.push(n);
        cells.push(n);
      }
    }

  }

}

