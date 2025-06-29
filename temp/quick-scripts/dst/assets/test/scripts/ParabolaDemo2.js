
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/ParabolaDemo2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcUGFyYWJvbGFEZW1vMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMsdUVBQXNFO0FBRWhFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssUUFHSjtBQUhELFdBQUssUUFBUTtJQUNULHVEQUFnQixDQUFBO0lBQ2hCLHVDQUFRLENBQUE7QUFDWixDQUFDLEVBSEksUUFBUSxLQUFSLFFBQVEsUUFHWjtBQUdEO0lBQTRCLGlDQUFZO0lBQXhDO1FBQUEscUVBbUVDO1FBakVXLFdBQUssR0FBaUIsSUFBSSxDQUFDO1FBRzNCLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsV0FBSyxHQUF1QixJQUFJLENBQUM7UUFFakMsVUFBSSxHQUF3QixJQUFJLENBQUM7UUFDakMsZ0JBQVUsR0FBeUQsRUFBRSxDQUFDOztJQWtEbEYsQ0FBQztJQWhEVSw2QkFBSyxHQUFaLGNBQXVCLENBQUM7SUFFZCxnQ0FBUSxHQUFsQixjQUE2QixDQUFDO0lBRXRCLDRCQUFJLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFR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Q0FBQyxhQUFLLENBQUM7Z0RBQ21CO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ3dCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3NCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ3lCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0RBQ21CO0lBZHZDLGFBQWE7UUFEbEIsT0FBTztPQUNGLGFBQWEsQ0FtRWxCO0lBQUQsb0JBQUM7Q0FuRUQsQUFtRUMsQ0FuRTJCLEVBQUUsQ0FBQyxTQUFTLEdBbUV2QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycm93IH0gZnJvbSAnLi9BcnJvdyc7XHJcbmltcG9ydCB7IFBhcmFib2xhUGF0aCB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvUGFyYWJvbGFQYXRoJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFBhdGhUeXBlIHtcclxuICAgIExFRlRfUEFSQUJPTCA9IDAsXHJcbiAgICBMSU5FID0gMVxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBQYXJhYm9sYURlbW8yIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShBcnJvdylcclxuICAgIHByaXZhdGUgYXJyb3c6IEFycm93IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHN0YXJ0X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZW5kX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdGFyZ2V0X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuR3JhcGhpY3MpXHJcbiAgICBwcml2YXRlIGdyYXBoOiBjYy5HcmFwaGljcyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgcGF0aDogUGFyYWJvbGFQYXRoIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHBhdGhfYXJyYXk6IHsgdGltZTogbnVtYmVyOyBwb3NpdGlvbjogY2MuVmVjMzsgYW5nbGU6IG51bWJlciB9W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ncmFwaC5jbGVhcigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXRoX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clBvcyA9IHRoaXMucGF0aF9hcnJheVtpXTtcclxuICAgICAgICAgICAgdGhpcy5ncmFwaC5jaXJjbGUoY3VyUG9zLnBvc2l0aW9uLngsIGN1clBvcy5wb3NpdGlvbi55LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JhcGguZmlsbCgpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGguc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZV9wYXRoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGF0aCA9IG5ldyBQYXJhYm9sYVBhdGgodGhpcy5zdGFydF9ub2RlPy5wb3NpdGlvbiwgdGhpcy5lbmRfbm9kZT8ucG9zaXRpb24sIDE2LCAtOS44KTtcclxuICAgICAgICB0aGlzLnBhdGguaXNDbGFtcFN0YXJ0RW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBhdGhfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnRhcmdldF9ub2RlLnBvc2l0aW9uID0gdGhpcy5zdGFydF9ub2RlLnBvc2l0aW9uO1xyXG5cclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucGF0aC5nZXRQb3NpdGlvbih0aGlzLnBhdGgudGltZSArIDEpLnN1Yih0aGlzLnRhcmdldF9ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnRhcmdldF9ub2RlLmFuZ2xlID0gKDE4MCAqIE1hdGguYXRhbjIocG9zaXRpb24ueSwgcG9zaXRpb24ueCkpIC8gTWF0aC5QSTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXRoX2FycmF5LnB1c2goe1xyXG4gICAgICAgICAgICB0aW1lOiB0aGlzLnBhdGgudGltZSxcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24sXHJcbiAgICAgICAgICAgIGFuZ2xlOiB0aGlzLnRhcmdldF9ub2RlLmFuZ2xlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLnBhdGgudGltZSA8IHRoaXMucGF0aC50b3RhbFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZV9wb3MoMSk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aF9hcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRpbWU6IHRoaXMucGF0aC50aW1lLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMudGFyZ2V0X25vZGUucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBhbmdsZTogdGhpcy50YXJnZXRfbm9kZS5hbmdsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGF0aF9hcnJheSk7XHJcbiAgICAgICAgdGhpcy5kcmF3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZV9wb3MobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhdGgudGltZSArPSBudW07XHJcbiAgICAgICAgdGhpcy50YXJnZXRfbm9kZS5wb3NpdGlvbiA9IG5ldyBjYy5WZWMzKHRoaXMucGF0aC5wb3NpdGlvbi54LCB0aGlzLnBhdGgucG9zaXRpb24ueSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLnBhdGguZ2V0UG9zaXRpb24odGhpcy5wYXRoLnRpbWUgKyBudW0pLnN1Yih0aGlzLnRhcmdldF9ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLnRhcmdldF9ub2RlLmFuZ2xlID0gKDE4MCAqIE1hdGguYXRhbjIoZGVsdGEueSwgZGVsdGEueCkpIC8gTWF0aC5QSTtcclxuICAgIH1cclxufVxyXG5cclxuIl19