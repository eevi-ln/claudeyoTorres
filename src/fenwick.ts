export class fenwick {
    private tree: number[];
    constructor(size: number) {
        this.tree = new Array(size).fill(0);
    }
    add(idx: number, delta: number): void {
        for (let i = idx; i < this.tree.length; i = i | (i+1)) {
            this.tree[i] += delta;
        }
    }
    sum(r: number): number {
        let ret = 0;
        for (; r >= 0; r = (r & (r + 1)) - 1) {
            ret += this.tree[r];
        }
        return ret;
    }
}
