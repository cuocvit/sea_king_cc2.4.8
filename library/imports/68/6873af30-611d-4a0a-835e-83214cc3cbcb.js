"use strict";
cc._RF.push(module, '6873a8wYR1KCoNegyFMw8vL', 'AStar');
// start-scene/scripts/AStar.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AStar = exports.Grid = exports.Node = void 0;
//  @
var Node = /** @class */ (function () {
    function Node(x, y) {
        this.walkable = false;
        this.costMultiplier = 1;
        this.x = x;
        this.y = y;
    }
    return Node;
}());
exports.Node = Node;
// @
var Grid = /** @class */ (function () {
    // @
    function Grid(numCols, numRows) {
        if (numRows !== undefined) {
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = [];
            for (var a = 0; a < this._numCols; a++) {
                this._nodes[a] = [];
                for (var i = 0; i < this._numRows; i++) {
                    this._nodes[a][i] = new Node(a, i);
                }
            }
        }
        else {
            this._numCols = numCols.numCols;
            this._numRows = numCols.numRows;
            this._nodes = numCols.getNodes();
        }
        this._startNode = null;
        this._endNode = null;
    }
    // @
    Grid.prototype.validNode = function (x, y) {
        return !(x < 0 || x >= this.numCols || y < 0 || y >= this.numRows);
    };
    // @
    Grid.prototype.getNodes = function () {
        return this._nodes;
    };
    // @
    Grid.prototype.getNode = function (x, y) {
        return this._nodes[x][y];
    };
    // @
    Grid.prototype.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    // @
    Grid.prototype.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    // @
    Grid.prototype.setWalkable = function (x, y, walkable) {
        if (0 <= x && x < this._nodes.length) {
            var row = this._nodes[x];
            if (0 <= y && y < row.length) {
                this._nodes[x][y].walkable = walkable;
                return;
            }
        }
        cc.error("The array index passed in is out of bounds"); // 传入的数组索引越界
    };
    // @
    Grid.prototype.getWalkable = function (x, y) {
        if (0 <= x && x < this._nodes.length) {
            var row = this._nodes[x];
            if (0 <= y && y < row.length) {
                return row[y].walkable;
            }
        }
        cc.error("The array index passed in is out of bounds"); // 传入的数组索引越界
        return false;
    };
    Object.defineProperty(Grid.prototype, "endNode", {
        // @
        get: function () {
            return this._endNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numCols", {
        // @
        get: function () {
            return this._numCols;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "numRows", {
        // @
        get: function () {
            return this._numRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "startNode", {
        // @
        get: function () {
            return this._startNode;
        },
        enumerable: false,
        configurable: true
    });
    // @
    Grid.prototype.clearStartAndEndNode = function () {
        this._startNode = null;
        this._endNode = null;
    };
    return Grid;
}()); // end: Grid
exports.Grid = Grid;
// @
var AStar = /** @class */ (function () {
    // @
    function AStar() {
        this._open = [];
        this._closed = [];
        this._straightCost = 1;
        this._diagCost = Math.SQRT2;
        this._allowDiag = false;
        this._heuristic = this.diagonal;
        this._path = [];
    }
    // @
    AStar.prototype.allowDiag = function (allow) {
        this._allowDiag = allow;
    };
    // @
    AStar.prototype.findPath = function (grid) {
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
        if (this._startNode && this._endNode)
            return this.search();
        return false;
    };
    // @
    AStar.prototype.search = function () {
        var currentNode = this._startNode;
        while (currentNode !== this._endNode) {
            for (var l = Math.max(0, currentNode.x - 1), r = Math.min(this._grid.numCols - 1, currentNode.x + 1), s = Math.max(0, currentNode.y - 1), c = Math.min(this._grid.numRows - 1, currentNode.y + 1); l <= r; l++) {
                for (var _ = s; _ <= c; _++) {
                    if (!this._allowDiag && l !== currentNode.x && _ !== currentNode.y)
                        continue;
                    var neighborNode = this._grid.getNode(l, _);
                    if (neighborNode !== currentNode && neighborNode.walkable && this._grid.getNode(currentNode.x, neighborNode.y).walkable && this._grid.getNode(neighborNode.x, currentNode.y).walkable) {
                        var cost = this._straightCost;
                        if (currentNode.x !== neighborNode.x && currentNode.y !== neighborNode.y) {
                            cost = this._diagCost;
                        }
                        var gCost = currentNode.g + cost * neighborNode.costMultiplier;
                        var hCost = this._heuristic(neighborNode);
                        var fCost = gCost + hCost;
                        if (this.isOpen(neighborNode) || this.isClosed(neighborNode)) {
                            if (neighborNode.f > fCost) {
                                neighborNode.f = fCost;
                                neighborNode.g = gCost;
                                neighborNode.h = hCost;
                                neighborNode.parent = currentNode;
                            }
                        }
                        else {
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
            if (this._open.length === 0)
                return false;
            this._open.sort(function (a, b) { return a.f - b.f; });
            currentNode = this._open.shift();
        }
        this.buildPath();
        return true;
    }; // end: search
    // @
    AStar.prototype.buildPath = function () {
        this._path = [];
        var node = this._endNode;
        while (node !== this._startNode) {
            this._path.unshift(node);
            node = node.parent;
        }
        this._path.unshift(this._startNode);
    };
    Object.defineProperty(AStar.prototype, "path", {
        // @
        get: function () {
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    // @
    AStar.prototype.isOpen = function (node) {
        return this._open.includes(node);
    };
    // @
    AStar.prototype.isClosed = function (node) {
        return this._closed.includes(node);
    };
    // @
    AStar.prototype.manhattan = function (node) {
        return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y - this._endNode.y) * this._straightCost;
        // phép toán gốc là dòng bên dưới nhưng AI tạo ra dòng trên có vẻ đã xử lý đúng hơn.
        // return Math.abs(node.x - this._endNode!.x) * this._straightCost + Math.abs(node.y + this._endNode!.y) * this._straightCost;
    };
    // @
    AStar.prototype.euclidian = function (node) {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    // @
    AStar.prototype.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var min = Math.min(dx, dy);
        return this._diagCost * min + this._straightCost * (dx + dy - 2 * min);
    };
    Object.defineProperty(AStar.prototype, "visited", {
        // @
        get: function () {
            return this._closed.concat(this._open);
        },
        enumerable: false,
        configurable: true
    });
    return AStar;
}());
exports.AStar = AStar;

cc._RF.pop();