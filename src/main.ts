function point_string_to_num(point: string): number[] {
  let r = point.match(/^([a-hA-H])([1-8])$/);
  if (!r) {
    throw new Error('Wrong coordinates');
  }

  r = r.splice(1, 3);
  r[0] = (r[0].toLowerCase().charCodeAt(0) - 'h'.charCodeAt(0) + 8).toString();
  return r.map((i: string) => parseInt(i));
}

function point_num_to_string(point: number[]): string {

  return String.fromCharCode(point[0] + 'h'.charCodeAt(0) - 8).toUpperCase() + point[1].toString();
}

function is_on_board(point: number[]): boolean {
  if (point.length !== 2) throw new Error('Wrong point');

  return point.every((i: number) => i > 0 && i <= 8);
}

function move(point: number[], x: number, y: number): number[] | void {
  let p = [point[0] + x, point[1] + y];
  if (is_on_board(p)) {
    return p;
  }
}

let visited: number[][] = [];
let results: number[][][] = [];

function is_equal(p1: number[], p2: number[]) {
  return JSON.stringify(p1) === JSON.stringify(p2);
}

function is_visited(point: number[]) {
  return visited.some((visited_point: number[]) => {
    return is_equal(point, visited_point);
  })
}

function try_way(point: number[], destination: number[]) {
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
  steps.forEach(([x, y]: [number, number]) => {
    let p = move(point, x, y);

    if (p) {
      if (!is_equal(p, destination)) {
        if (!is_visited(p)) {
          visited.push(p);
          try_way(p, destination);
        }
      } else {
        let i: number = results.push(visited.slice());
        console.log('found', results[i - 1].length);
      }


    }
  })
}

function main(start_point: string, end_point: string): number[][][] {
  let p1 = point_string_to_num(start_point);
  let p2 = point_string_to_num(end_point);

  try_way(p1, p2);
  return results.map((r: number[][]) => {
    r.unshift(p1);
    r.push(p2);
    return r;
  });
}

console.log(
  main('a1', 'c1').map((r: number[][]) => {
    return r.map((point: number[]) => {
      return point_num_to_string(point);
    }).join(',');
  }).join("\r\n"));
