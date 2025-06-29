
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/ScaleMapDemo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcU2NhbGVNYXBEZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQixnQ0FBWTtJQUF2QztRQUFBLHFFQXFHQztRQW5HVyxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFFbEMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFDakMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFDakMsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUErRmxDLENBQUM7SUE3RmEsZ0NBQVMsR0FBbkI7UUFBQSxpQkEyQ0M7UUExQ0csT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUEwQjtZQUNuRSxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxH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QUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBbEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ3dCO0lBRnhDLFlBQVk7UUFEakIsT0FBTztPQUNGLFlBQVksQ0FxR2pCO0lBQUQsbUJBQUM7Q0FyR0QsQUFxR0MsQ0FyRzBCLEVBQUUsQ0FBQyxTQUFTLEdBcUd0QztBQUVRLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFNjYWxlTWFwRGVtbyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbWFwQ29udGVudDogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc3RhcnRQb3MxOiBjYy5WZWMyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXJ0UG9zMjogY2MuVmVjMiB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwb2ludHNEaXM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlMigpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmNvdW50KFwib25FbmFibGVcIik7XHJcbiAgICAgICAgY2MubWFjcm8uRU5BQkxFX01VTFRJX1RPVUNIID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpO1xyXG4gICAgICAgICAgICBpZiAodG91Y2hlcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFBvczEgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2hlc1swXS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRQb3MyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoZXNbMV0uZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50c0RpcyA9IHRoaXMuc3RhcnRQb3MxLnN1Yih0aGlzLnN0YXJ0UG9zMikubWFnKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpO1xyXG4gICAgICAgICAgICBpZiAodG91Y2hlcy5sZW5ndGggIT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LnkgKz0gZXZlbnQuZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zMSA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaGVzWzBdLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaGVzWzFdLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudERpcyA9IHBvczEuc3ViKHBvczIpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihKU09OLnN0cmluZ2lmeShwb3MxKSk7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKEpTT04uc3RyaW5naWZ5KHBvczIpKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IHRoaXMubWFwQ29udGVudC5zY2FsZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudERpcyA+IHRoaXMucG9pbnRzRGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludHNEaXMgPSBjdXJyZW50RGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlICs9IDAuMDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnREaXMgPCB0aGlzLnBvaW50c0Rpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzRGlzID0gY3VycmVudERpcztcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZSAtPSAwLjA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJTY2FsZSB1bmNoYW5nZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heChzY2FsZSwgMSksIDIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG9sZF9zY2FsZTogJHt0aGlzLm1hcENvbnRlbnQuc2NhbGV9IG5ld19zY2FsZTogJHtzY2FsZX1gKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcENvbnRlbnQuc2NhbGUgIT09IHNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uX3RvdWNoX3N0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vbl90b3VjaF9tb3ZlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3RvdWNoX3N0YXJ0KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LmdldFRvdWNoZXMoKTtcclxuICAgICAgICBpZiAodG91Y2hlcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9zMSA9IHRoaXMubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaGVzWzBdLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9zMiA9IHRoaXMubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaGVzWzFdLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50c0RpcyA9IHRoaXMuc3RhcnRQb3MxLnN1Yih0aGlzLnN0YXJ0UG9zMikubWFnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fdG91Y2hfbW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC5nZXRUb3VjaGVzKCk7XHJcbiAgICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoICE9IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXBDb250ZW50LnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQueSArPSBldmVudC5nZXREZWx0YSgpLnk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcG9zMSA9IHRoaXMubWFwQ29udGVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaGVzWzBdLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3MyID0gdGhpcy5tYXBDb250ZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoZXNbMV0uZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREaXMgPSBwb3MxLnN1Yihwb3MyKS5tYWcoKTtcclxuICAgICAgICAgICAgY2Mud2FybihKU09OLnN0cmluZ2lmeShwb3MxKSk7XHJcbiAgICAgICAgICAgIGNjLndhcm4oSlNPTi5zdHJpbmdpZnkocG9zMikpO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLm1hcENvbnRlbnQuc2NhbGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudERpcyA+IHRoaXMucG9pbnRzRGlzKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSArPSAwLjA1O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnREaXMgPCB0aGlzLnBvaW50c0Rpcykge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgLT0gMC4wNTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlNjYWxlIHVuY2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heChzY2FsZSwgMSksIDIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgb2xkX3NjYWxlOiAke3RoaXMubWFwQ29udGVudC5zY2FsZX0gbmV3X3NjYWxlOiAke3NjYWxlfWApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXBDb250ZW50LnNjYWxlICE9IHNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcENvbnRlbnQuc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwQ29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbl90b3VjaF9zdGFydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uX3RvdWNoX21vdmUsIHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBTY2FsZU1hcERlbW8gfTsiXX0=