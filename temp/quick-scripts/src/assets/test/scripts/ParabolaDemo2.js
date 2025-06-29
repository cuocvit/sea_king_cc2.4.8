"use strict";
cc._RF.push(module, '7774dCCT6hKZYRySbwKg8RX', 'ParabolaDemo2');
// test/scripts/ParabolaDemo2.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Arrow_1 = require("./Arrow");
var ParabolaPath_1 = require("../../start-scene/scripts/ParabolaPath");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PathType;
(function (PathType) {
    PathType[PathType["LEFT_PARABOL"] = 0] = "LEFT_PARABOL";
    PathType[PathType["LINE"] = 1] = "LINE";
})(PathType || (PathType = {}));
var ParabolaDemo2 = /** @class */ (function (_super) {
    __extends(ParabolaDemo2, _super);
    function ParabolaDemo2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrow = null;
        _this.start_node = null;
        _this.end_node = null;
        _this.target_node = null;
        _this.graph = null;
        _this.path = null;
        _this.path_array = [];
        return _this;
    }
    ParabolaDemo2.prototype.start = function () { };
    ParabolaDemo2.prototype.onEnable = function () { };
    ParabolaDemo2.prototype.draw = function () {
        this.graph.clear();
        for (var i = 0; i < this.path_array.length; i++) {
            var curPos = this.path_array[i];
            this.graph.circle(curPos.position.x, curPos.position.y, 10);
        }
        this.graph.fill();
        this.graph.stroke();
    };
    ParabolaDemo2.prototype.generate_path = function () {
        var _a, _b;
        this.path = new ParabolaPath_1.ParabolaPath((_a = this.start_node) === null || _a === void 0 ? void 0 : _a.position, (_b = this.end_node) === null || _b === void 0 ? void 0 : _b.position, 16, -9.8);
        this.path.isClampStartEnd = true;
        this.path_array = [];
        this.target_node.position = this.start_node.position;
        var position = this.path.getPosition(this.path.time + 1).sub(this.target_node.position);
        this.target_node.angle = (180 * Math.atan2(position.y, position.x)) / Math.PI;
        this.path_array.push({
            time: this.path.time,
            position: this.target_node.position,
            angle: this.target_node.angle
        });
        while (this.path.time < this.path.totalTime) {
            this.generate_pos(1);
            this.path_array.push({
                time: this.path.time,
                position: this.target_node.position,
                angle: this.target_node.angle
            });
        }
        console.log(this.path_array);
        this.draw();
    };
    ParabolaDemo2.prototype.generate_pos = function (num) {
        this.path.time += num;
        this.target_node.position = new cc.Vec3(this.path.position.x, this.path.position.y);
        var delta = this.path.getPosition(this.path.time + num).sub(this.target_node.position);
        this.target_node.angle = (180 * Math.atan2(delta.y, delta.x)) / Math.PI;
    };
    __decorate([
        property(Arrow_1.Arrow)
    ], ParabolaDemo2.prototype, "arrow", void 0);
    __decorate([
        property(cc.Node)
    ], ParabolaDemo2.prototype, "start_node", void 0);
    __decorate([
        property(cc.Node)
    ], ParabolaDemo2.prototype, "end_node", void 0);
    __decorate([
        property(cc.Node)
    ], ParabolaDemo2.prototype, "target_node", void 0);
    __decorate([
        property(cc.Graphics)
    ], ParabolaDemo2.prototype, "graph", void 0);
    ParabolaDemo2 = __decorate([
        ccclass
    ], ParabolaDemo2);
    return ParabolaDemo2;
}(cc.Component));

cc._RF.pop();