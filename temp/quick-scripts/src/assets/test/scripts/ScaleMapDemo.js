"use strict";
cc._RF.push(module, 'f37f5v/bYhPzJqO+6Bexjzl', 'ScaleMapDemo');
// test/scripts/ScaleMapDemo.ts

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
exports.ScaleMapDemo = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScaleMapDemo = /** @class */ (function (_super) {
    __extends(ScaleMapDemo, _super);
    function ScaleMapDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mapContent = null;
        _this.startPos1 = null;
        _this.startPos2 = null;
        _this.pointsDis = 0;
        return _this;
    }
    ScaleMapDemo.prototype.onEnable2 = function () {
        var _this = this;
        console.count("onEnable");
        cc.macro.ENABLE_MULTI_TOUCH = true;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            if (touches.length == 2) {
                _this.startPos1 = _this.node.convertToNodeSpaceAR(touches[0].getLocation());
                _this.startPos2 = _this.node.convertToNodeSpaceAR(touches[1].getLocation());
                _this.pointsDis = _this.startPos1.sub(_this.startPos2).mag();
            }
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            if (touches.length != 2) {
                _this.mapContent.x += event.getDelta().x;
                _this.mapContent.y += event.getDelta().y;
            }
            else {
                var pos1 = _this.node.convertToNodeSpaceAR(touches[0].getLocation());
                var pos2 = _this.node.convertToNodeSpaceAR(touches[1].getLocation());
                var currentDis = pos1.sub(pos2).mag();
                cc.warn(JSON.stringify(pos1));
                cc.warn(JSON.stringify(pos2));
                var scale = _this.mapContent.scale;
                if (currentDis > _this.pointsDis) {
                    _this.pointsDis = currentDis;
                    scale += 0.05;
                }
                else if (currentDis < _this.pointsDis) {
                    _this.pointsDis = currentDis;
                    scale -= 0.05;
                }
                else {
                    console.warn("Scale unchanged");
                }
                scale = Math.min(Math.max(scale, 1), 2);
                console.log("old_scale: " + _this.mapContent.scale + " new_scale: " + scale);
                if (_this.mapContent.scale !== scale) {
                    _this.mapContent.scale = scale;
                    _this.mapContent.getContentSize();
                }
            }
        });
    };
    ScaleMapDemo.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    };
    ScaleMapDemo.prototype.on_touch_start = function (event) {
        var touches = event.getTouches();
        if (touches.length == 2) {
            this.startPos1 = this.mapContent.convertToNodeSpaceAR(touches[0].getLocation());
            this.startPos2 = this.mapContent.convertToNodeSpaceAR(touches[1].getLocation());
            this.pointsDis = this.startPos1.sub(this.startPos2).mag();
        }
    };
    ScaleMapDemo.prototype.on_touch_move = function (event) {
        var touches = event.getTouches();
        if (touches.length != 2) {
            this.mapContent.x += event.getDelta().x;
            this.mapContent.y += event.getDelta().y;
        }
        else {
            var pos1 = this.mapContent.convertToNodeSpaceAR(touches[0].getLocation());
            var pos2 = this.mapContent.convertToNodeSpaceAR(touches[1].getLocation());
            var currentDis = pos1.sub(pos2).mag();
            cc.warn(JSON.stringify(pos1));
            cc.warn(JSON.stringify(pos2));
            var scale = this.mapContent.scale;
            if (currentDis > this.pointsDis) {
                scale += 0.05;
            }
            else if (currentDis < this.pointsDis) {
                scale -= 0.05;
            }
            else {
                console.warn("Scale unchanged");
            }
            scale = Math.min(Math.max(scale, 1), 2);
            console.log("old_scale: " + this.mapContent.scale + " new_scale: " + scale);
            if (this.mapContent.scale != scale) {
                this.mapContent.scale = scale;
                this.mapContent.getContentSize();
            }
        }
    };
    ScaleMapDemo.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
    };
    __decorate([
        property(cc.Node)
    ], ScaleMapDemo.prototype, "mapContent", void 0);
    ScaleMapDemo = __decorate([
        ccclass
    ], ScaleMapDemo);
    return ScaleMapDemo;
}(cc.Component));
exports.ScaleMapDemo = ScaleMapDemo;

cc._RF.pop();