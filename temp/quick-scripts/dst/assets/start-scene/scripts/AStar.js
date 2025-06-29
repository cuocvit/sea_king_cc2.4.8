
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/AStar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEFTdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEtBQUs7QUFDTDtJQVVJLGNBQVksQ0FBUyxFQUFFLENBQVM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQTtBQWhCWSxvQkFBSTtBQWtCakIsSUFBSTtBQUNKO0lBT0ksSUFBSTtJQUNKLGNBQVksT0FBZ0YsRUFBRSxPQUFnQjtRQUMxRyxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFpQixDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN0QzthQUNKO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUksT0FB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R0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUk7SUFDSSx3QkFBUSxHQUFoQixVQUFpQixJQUFVO1FBQ3ZCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFHRCxzQkFBWSwwQkFBTztRQURuQixJQUFJO2FBQ0o7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUNMLFlBQUM7QUFBRCxDQXBKQSxBQW9KQyxJQUFBO0FBRWMsc0JBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgQFxyXG5leHBvcnQgY2xhc3MgTm9kZSB7XHJcbiAgICBwdWJsaWMgd2Fsa2FibGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgY29zdE11bHRpcGxpZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwYXJlbnQ6IE5vZGU7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBnOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaDogbnVtYmVyO1xyXG4gICAgcHVibGljIGY6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMud2Fsa2FibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvc3RNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEBcclxuY2xhc3MgR3JpZCB7XHJcbiAgICBwcml2YXRlIF9udW1Db2xzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9udW1Sb3dzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9ub2RlczogTm9kZVtdW107XHJcbiAgICBwcml2YXRlIF9zdGFydE5vZGU6IE5vZGUgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZW5kTm9kZTogTm9kZSB8IG51bGw7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IobnVtQ29sczogbnVtYmVyIHwgeyBudW1Db2xzOiBudW1iZXI7IG51bVJvd3M6IG51bWJlcjsgZ2V0Tm9kZXM6ICgpID0+IE5vZGVbXVtdIH0sIG51bVJvd3M/OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtUm93cyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX251bUNvbHMgPSBudW1Db2xzIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy5fbnVtUm93cyA9IG51bVJvd3M7XHJcbiAgICAgICAgICAgIHRoaXMuX25vZGVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5fbnVtQ29sczsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2Rlc1thXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1Sb3dzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub2Rlc1thXVtpXSA9IG5ldyBOb2RlKGEsIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbnVtQ29scyA9IChudW1Db2xzIGFzIHsgbnVtQ29sczogbnVtYmVyOyBudW1Sb3dzOiBudW1iZXIgfSkubnVtQ29scztcclxuICAgICAgICAgICAgdGhpcy5fbnVtUm93cyA9IChudW1Db2xzIGFzIHsgbnVtQ29sczogbnVtYmVyOyBudW1Sb3dzOiBudW1iZXIgfSkubnVtUm93cztcclxuICAgICAgICAgICAgdGhpcy5fbm9kZXMgPSAobnVtQ29scyBhcyB7IGdldE5vZGVzOiAoKSA9PiBOb2RlW11bXSB9KS5nZXROb2RlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdGFydE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2VuZE5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgdmFsaWROb2RlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEoeCA8IDAgfHwgeCA+PSB0aGlzLm51bUNvbHMgfHwgeSA8IDAgfHwgeSA+PSB0aGlzLm51bVJvd3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0Tm9kZXMoKTogTm9kZVtdW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IE5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2Rlc1t4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc2V0RW5kTm9kZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2VuZE5vZGUgPSB0aGlzLl9ub2Rlc1t4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc2V0U3RhcnROb2RlKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnROb2RlID0gdGhpcy5fbm9kZXNbeF1beV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHNldFdhbGthYmxlKHg6IG51bWJlciwgeTogbnVtYmVyLCB3YWxrYWJsZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmICgwIDw9IHggJiYgeCA8IHRoaXMuX25vZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGlzLl9ub2Rlc1t4XTtcclxuICAgICAgICAgICAgaWYgKDAgPD0geSAmJiB5IDwgcm93Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZXNbeF1beV0ud2Fsa2FibGUgPSB3YWxrYWJsZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5lcnJvcihcIlRoZSBhcnJheSBpbmRleCBwYXNzZWQgaW4gaXMgb3V0IG9mIGJvdW5kc1wiKTsgLy8g5Lyg5YWl55qE5pWw57uE57Si5byV6LaK55WMXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldFdhbGthYmxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKDAgPD0geCAmJiB4IDwgdGhpcy5fbm9kZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuX25vZGVzW3hdO1xyXG4gICAgICAgICAgICBpZiAoMCA8PSB5ICYmIHkgPCByb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93W3ldLndhbGthYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmVycm9yKFwiVGhlIGFycmF5IGluZGV4IHBhc3NlZCBpbiBpcyBvdXQgb2YgYm91bmRzXCIpOyAvLyDkvKDlhaXnmoTmlbDnu4TntKLlvJXotornlYxcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCBlbmROb2RlKCk6IE5vZGUgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5kTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IG51bUNvbHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtQ29scztcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IG51bVJvd3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtUm93cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXJ0Tm9kZSgpOiBOb2RlIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgY2xlYXJTdGFydEFuZEVuZE5vZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9lbmROb2RlID0gbnVsbDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEdyaWRcclxuXHJcbi8vIEBcclxuY2xhc3MgQVN0YXIge1xyXG4gICAgcHJpdmF0ZSBfZ3JpZDogR3JpZDtcclxuICAgIHByaXZhdGUgX29wZW46IE5vZGVbXTtcclxuICAgIHByaXZhdGUgX2Nsb3NlZDogTm9kZVtdO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnROb2RlOiBOb2RlIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2VuZE5vZGU6IE5vZGUgfCBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3RyYWlnaHRDb3N0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9kaWFnQ29zdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYWxsb3dEaWFnOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaGV1cmlzdGljOiAobm9kZTogTm9kZSkgPT4gbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcGF0aDogTm9kZVtdO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX29wZW4gPSBbXTtcclxuICAgICAgICB0aGlzLl9jbG9zZWQgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdHJhaWdodENvc3QgPSAxO1xyXG4gICAgICAgIHRoaXMuX2RpYWdDb3N0ID0gTWF0aC5TUVJUMjtcclxuICAgICAgICB0aGlzLl9hbGxvd0RpYWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9oZXVyaXN0aWMgPSB0aGlzLmRpYWdvbmFsO1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGFsbG93RGlhZyhhbGxvdzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FsbG93RGlhZyA9IGFsbG93O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBmaW5kUGF0aChncmlkOiBHcmlkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICAgICAgdGhpcy5fb3BlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2Nsb3NlZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRoaXMuX2dyaWQuc3RhcnROb2RlO1xyXG4gICAgICAgIHRoaXMuX2VuZE5vZGUgPSB0aGlzLl9ncmlkLmVuZE5vZGU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydE5vZGUuZyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZS5oID0gdGhpcy5faGV1cmlzdGljKHRoaXMuX3N0YXJ0Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZS5mID0gdGhpcy5fc3RhcnROb2RlLmcgKyB0aGlzLl9zdGFydE5vZGUuaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0Tm9kZSAmJiB0aGlzLl9lbmROb2RlKSByZXR1cm4gdGhpcy5zZWFyY2goKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBzZWFyY2goKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlOiBOb2RlID0gdGhpcy5fc3RhcnROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gdGhpcy5fZW5kTm9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICAgICAgbGV0IGwgPSBNYXRoLm1heCgwLCBjdXJyZW50Tm9kZS54IC0gMSksXHJcbiAgICAgICAgICAgICAgICByID0gTWF0aC5taW4odGhpcy5fZ3JpZC5udW1Db2xzIC0gMSwgY3VycmVudE5vZGUueCArIDEpLFxyXG4gICAgICAgICAgICAgICAgcyA9IE1hdGgubWF4KDAsIGN1cnJlbnROb2RlLnkgLSAxKSxcclxuICAgICAgICAgICAgICAgIGMgPSBNYXRoLm1pbih0aGlzLl9ncmlkLm51bVJvd3MgLSAxLCBjdXJyZW50Tm9kZS55ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBsIDw9IHI7XHJcbiAgICAgICAgICAgICAgICBsKytcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBfID0gczsgXyA8PSBjOyBfKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FsbG93RGlhZyAmJiBsICE9PSBjdXJyZW50Tm9kZS54ICYmIF8gIT09IGN1cnJlbnROb2RlLnkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5laWdoYm9yTm9kZSA9IHRoaXMuX2dyaWQuZ2V0Tm9kZShsLCBfKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3JOb2RlICE9PSBjdXJyZW50Tm9kZSAmJiBuZWlnaGJvck5vZGUud2Fsa2FibGUgJiYgdGhpcy5fZ3JpZC5nZXROb2RlKGN1cnJlbnROb2RlLngsIG5laWdoYm9yTm9kZS55KS53YWxrYWJsZSAmJiB0aGlzLl9ncmlkLmdldE5vZGUobmVpZ2hib3JOb2RlLngsIGN1cnJlbnROb2RlLnkpLndhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3N0ID0gdGhpcy5fc3RyYWlnaHRDb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUueCAhPT0gbmVpZ2hib3JOb2RlLnggJiYgY3VycmVudE5vZGUueSAhPT0gbmVpZ2hib3JOb2RlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvc3QgPSB0aGlzLl9kaWFnQ29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnQ29zdCA9IGN1cnJlbnROb2RlLmcgKyBjb3N0ICogbmVpZ2hib3JOb2RlLmNvc3RNdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoQ29zdCA9IHRoaXMuX2hldXJpc3RpYyhuZWlnaGJvck5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmQ29zdCA9IGdDb3N0ICsgaENvc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4obmVpZ2hib3JOb2RlKSB8fCB0aGlzLmlzQ2xvc2VkKG5laWdoYm9yTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvck5vZGUuZiA+IGZDb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JOb2RlLmYgPSBmQ29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvck5vZGUuZyA9IGdDb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9yTm9kZS5oID0gaENvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JOb2RlLnBhcmVudCA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JOb2RlLmYgPSBmQ29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9yTm9kZS5nID0gZ0Nvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvck5vZGUuaCA9IGhDb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JOb2RlLnBhcmVudCA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3Blbi5wdXNoKG5laWdoYm9yTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Nsb3NlZC5wdXNoKGN1cnJlbnROb2RlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wZW4ubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9vcGVuLnNvcnQoKGEsIGIpID0+IGEuZiAtIGIuZik7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gdGhpcy5fb3Blbi5zaGlmdCgpITtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idWlsZFBhdGgoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gLy8gZW5kOiBzZWFyY2hcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGJ1aWxkUGF0aCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXRoID0gW107XHJcbiAgICAgICAgbGV0IG5vZGU6IE5vZGUgfCBudWxsID0gdGhpcy5fZW5kTm9kZTtcclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gdGhpcy5fc3RhcnROb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhdGgudW5zaGlmdChub2RlKTtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wYXRoLnVuc2hpZnQodGhpcy5fc3RhcnROb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IHBhdGgoKTogTm9kZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGlzT3Blbihub2RlOiBOb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW4uaW5jbHVkZXMobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBpc0Nsb3NlZChub2RlOiBOb2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlZC5pbmNsdWRlcyhub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIG1hbmhhdHRhbihub2RlOiBOb2RlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMobm9kZS54IC0gdGhpcy5fZW5kTm9kZSEueCkgKiB0aGlzLl9zdHJhaWdodENvc3QgKyBNYXRoLmFicyhub2RlLnkgLSB0aGlzLl9lbmROb2RlIS55KSAqIHRoaXMuX3N0cmFpZ2h0Q29zdDtcclxuICAgICAgICAvLyBwaMOpcCB0b8OhbiBn4buRYyBsw6AgZMOybmcgYsOqbiBkxrDhu5tpIG5oxrBuZyBBSSB04bqhbyByYSBkw7JuZyB0csOqbiBjw7MgduG6uyDEkcOjIHjhu60gbMO9IMSRw7puZyBoxqFuLlxyXG4gICAgICAgIC8vIHJldHVybiBNYXRoLmFicyhub2RlLnggLSB0aGlzLl9lbmROb2RlIS54KSAqIHRoaXMuX3N0cmFpZ2h0Q29zdCArIE1hdGguYWJzKG5vZGUueSArIHRoaXMuX2VuZE5vZGUhLnkpICogdGhpcy5fc3RyYWlnaHRDb3N0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZXVjbGlkaWFuKG5vZGU6IE5vZGUpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGR4ID0gbm9kZS54IC0gdGhpcy5fZW5kTm9kZSEueDtcclxuICAgICAgICBjb25zdCBkeSA9IG5vZGUueSAtIHRoaXMuX2VuZE5vZGUhLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgKiB0aGlzLl9zdHJhaWdodENvc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBkaWFnb25hbChub2RlOiBOb2RlKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBkeCA9IE1hdGguYWJzKG5vZGUueCAtIHRoaXMuX2VuZE5vZGUhLngpO1xyXG4gICAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMobm9kZS55IC0gdGhpcy5fZW5kTm9kZSEueSk7XHJcbiAgICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oZHgsIGR5KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlhZ0Nvc3QgKiBtaW4gKyB0aGlzLl9zdHJhaWdodENvc3QgKiAoZHggKyBkeSAtIDIgKiBtaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0IHZpc2l0ZWQoKTogTm9kZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2VkLmNvbmNhdCh0aGlzLl9vcGVuKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgR3JpZCwgQVN0YXIgfTtcclxuIl19