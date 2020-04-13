export function range(x: number, y: number): number[] {
  return Array.from((function*() {
    while (x <= y) {
      yield x++;
    }
  })());
}
