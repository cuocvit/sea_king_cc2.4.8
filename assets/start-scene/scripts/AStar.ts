//  @
export class Node {
    public walkable: boolean;
    public costMultiplier: number;
    public parent: Node;
    public x: number;
    public y: number;
    public g: number;
    public h: number;
    public f: number;

    constructor(x: number, y: number) {
        this.walkable = false;
        this.costMultiplier = 1;
        this.x = x;
        this.y = y;
    }
}

// @
class Grid {
    private _numCols: number;
    private _numRows: number;
    private _nodes: Node[][];
    private _startNode: Node | null;
    private _endNode: Node | null;

    // @
    constructor(numCols: number | { numCols: number; numRows: number; getNodes: () => Node[][] }, numRows?: number) {
        if (numRows !== undefined) {
            this._numCols = numCols as number;
            this._numRows = numRows;
            this._nodes = [];
            for (let a = 0; a < this._numCols; a++) {
                this._nodes[a] = [];
                for (let i = 0; i < this._numRows; i++) {
                    this._nodes[a][i] = new Node(a, i);
                }
            }
        } else {
            this._numCols = (numCols as { numCols: number; numRows: number }).numCols;
            this._numRows = (numCols as { numCols: number; numRows: number }).numRows;
            this._nodes = (numCols as { getNodes: () => Node[][] }).getNodes();
        }
        this._startNode = null;
        this._endNode = null;
    }

    // @
    private validNode(x: number, y: number): boolean {
        return !(x < 0 || x >= this.numCols || y < 0 || y >= this.numRows);
    }

    // @
    private getNodes(): Node[][] {
        return this._nodes;
    }

    // @
    public getNode(x: number, y: number): Node {
        return this._nodes[x][y];
    }

    // @
    public setEndNode(x: number, y: number): void {
        this._endNode = this._nodes[x][y];
    }

    // @
    public setStartNode(x: number, y: number): void {
        this._startNode = this._nodes[x][y];
    }

    // @
    public setWalkable(x: number, y: number, walkable: boolean): void {
        if (0 <= x && x < this._nodes.length) {
            const row = this._nodes[x];
            if (0 <= y && y < row.length) {
                this._nodes[x][y].walkable = walkable;
                return;
            }
        }
        cc.error("The array index passed in is out of bounds"); // 传入的数组索引越界
    }

    // @
    public getWalkable(x: number, y: number): boolean {
        if (0 <= x && x < this._nodes.length) {
            const row = this._nodes[x];
            if (0 <= y && y < row.length) {
                return row[y].walkable;
            }
        }
        cc.error("The array index passed in is out of bounds"); // 传入的数组索引越界
        return false;
    }

    // @
    public get endNode(): Node | null {
        return this._endNode;
    }

    // @
    public get numCols(): number {
        return this._numCols;
    }

    // @
    public get numRows(): number {
        return this._numRows;
    }

    // @
    public get startNode(): Node | null {
        return this._startNode;
    }

    // @
    public clearStartAndEndNode(): void {
        this._startNode = null;
        this._endNode = null;
    }
} // end: Grid

// @
class AStar {
    private _grid: Grid;
    private _open: Node[];
    private _closed: Node[];
    private _startNode: Node | null;
    private _endNode: Node | null;
    private _straightCost: number;
    private _diagCost: number;
    private _allowDiag: boolean;
    private _heuristic: (node: Node) => number;
    private _path: Node[];

    // @
    constructor() {
        this._open = [];
        this._closed = [];
        this._straightCost = 1;
        this._diagCost = Math.SQRT2;
        this._allowDiag = false;
        this._heuristic = this.diagonal;
        this._path = [];
    }

    // @
    private allowDiag(allow: boolean): void {
        this._allowDiag = allow;
    }

    // @
    public findPath(grid: Grid): boolean {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.startNode;
        this._endNode = this._grid.endNode;
        if (this._startNode) {
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
        }
        if (this._startNode && this._endNode) return this.search();
        return false;
    }

    // @
    private search(): boolean {
        let currentNode: Node = this._startNode;
        while (currentNode !== this._endNode) {
            for (
                let l = Math.max(0, currentNode.x - 1),
                r = Math.min(this._grid.numCols - 1, currentNode.x + 1),
                s = Math.max(0, currentNode.y - 1),
                c = Math.min(this._grid.numRows - 1, currentNode.y + 1);
                l <= r;
                l++
            ) {
                for (let _ = s; _ <= c; _++) {
                    if (!this._allowDiag && l !== currentNode.x && _ !== currentNode.y) continue;
                    const neighborNode = this._grid.getNode(l, _);
                    if (neighborNode !== currentNode && neighborNode.walkable && this._grid.getNode(currentNode.x, neighborNode.y).walkable && this._grid.getNode(neighborNode.x, currentNode.y).walkable) {
                        let cost = this._straightCost;
                        if (currentNode.x !== neighborNode.x && currentNode.y !== neighborNode.y) {
                            cost = this._diagCost;
                        }
                        const gCost = currentNode.g + cost * neighborNode.costMultiplier;
                        const hCost = this._heuristic(neighborNode);
                        const fCost = gCost + hCost;

                        if (this.isOpen(neighborNode) || this.isClosed(neighborNode)) {
                            if (neighborNode.f > fCost) {
                                neighborNode.f = fCost;
                                neighborNode.g = gCost;
                                neighborNode.h = hCost;
                                neighborNode.parent = currentNode;
                            }
                        } else {
                            neighborNode.f = fCost;
                            neighborNode.g = gCost;
                            neighborNode.h = hCost;
                            neighborNode.parent = currentNode;
                            this._open.push(neighborNode);
                        }
                    }
                }
            }

            this._closed.push(currentNode);
            if (this._open.length === 0) return false;

            this._open.sort((a, b) => a.f - b.f);
            currentNode = this._open.shift()!;
        }
        this.buildPath();
        return true;
    } // end: search

    // @
    private buildPath(): void {
        this._path = [];
        let node: Node | null = this._endNode;
        while (node !== this._startNode) {
            this._path.unshift(node);
            node = node.parent;
        }
        this._path.unshift(this._startNode);
    }

    // @
    public get path(): Node[] {
        return this._path;
    }

    // @
    private isOpen(node: Node): boolean {
        return this._open.includes(node);
    }

    // @
    private isClosed(node: Node): boolean {
        return this._closed.includes(node);
    }

    // @
    private manhattan(node: Node): number {
        return Math.abs(node.x - this._endNode!.x) * this._straightCost + Math.abs(node.y - this._endNode!.y) * this._straightCost;
        // phép toán gốc là dòng bên dưới nhưng AI tạo ra dòng trên có vẻ đã xử lý đúng hơn.
        // return Math.abs(node.x - this._endNode!.x) * this._straightCost + Math.abs(node.y + this._endNode!.y) * this._straightCost;
    }

    // @
    private euclidian(node: Node): number {
        const dx = node.x - this._endNode!.x;
        const dy = node.y - this._endNode!.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }

    // @
    private diagonal(node: Node): number {
        const dx = Math.abs(node.x - this._endNode!.x);
        const dy = Math.abs(node.y - this._endNode!.y);
        const min = Math.min(dx, dy);
        return this._diagCost * min + this._straightCost * (dx + dy - 2 * min);
    }

    // @
    private get visited(): Node[] {
        return this._closed.concat(this._open);
    }
}

export { Grid, AStar };
