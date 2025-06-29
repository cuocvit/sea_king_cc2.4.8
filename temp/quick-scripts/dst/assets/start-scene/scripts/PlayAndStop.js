
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/PlayAndStop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7b69UbhI5Lg7lPmQhkCZcz', 'PlayAndStop');
// start-scene/scripts/PlayAndStop.ts

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
exports.PlayAndStop = void 0;
// +-+
var GameObject_1 = require("./GameObject");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var PlayAndStop = /** @class */ (function (_super) {
    __extends(PlayAndStop, _super);
    function PlayAndStop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.auto_play_and_stop = true;
        _this._ps = null;
        _this._anim = null;
        _this._spine = null;
        _this._anim_state = null;
        _this._spine_track = null;
        return _this;
    }
    PlayAndStop.prototype.onLoad = function () {
        this._ps = this.node.getComponent(cc.ParticleSystem);
        this._anim = this.node.getComponent(cc.Animation);
        this._spine = this.node.getComponent(sp.Skeleton);
    };
    PlayAndStop.prototype.onEnable = function () {
        if (this.auto_play_and_stop) {
            if (this._ps) {
                this._ps.resetSystem();
            }
            if (this._anim) {
                this._anim_state = this._anim.play();
            }
            else if (this._spine) {
                this._spine_track = this._spine.setAnimation(0, this._spine.defaultAnimation, false);
            }
        }
    };
    PlayAndStop.prototype.onDisable = function () {
        if (this.auto_play_and_stop) {
            if (this._ps) {
                this._ps.stopSystem();
            }
            if (this._anim) {
                this._anim.stop();
            }
            else if (this._spine) {
                this._spine.clearTrack(0);
            }
        }
    };
    PlayAndStop.prototype.play = function (animationName, loop, time) {
        if (this._anim) {
            this._anim_state = this._anim.play(animationName, time);
            if (this._anim_state) {
                this._anim_state.wrapMode = loop ? cc.WrapMode.Loop : cc.WrapMode.Default;
            }
        }
        else if (this._spine) {
            this._spine_track = this._spine.setAnimation(0, animationName, loop);
            if (this._spine_track) {
                this._spine_track.trackTime = time;
            }
        }
    };
    PlayAndStop.prototype.stop = function () {
        if (this._anim) {
            this._anim.stop();
        }
        else if (this._spine) {
            this._spine.clearTrack(0);
        }
    };
    __decorate([
        property(cc.Boolean)
    ], PlayAndStop.prototype, "auto_play_and_stop", void 0);
    PlayAndStop = __decorate([
        ccclass,
        menu("添加自定义组件/PlayAndStop")
    ], PlayAndStop);
    return PlayAndStop;
}(GameObject_1.GameObject));
exports.PlayAndStop = PlayAndStop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFBsYXlBbmRTdG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sMkNBQTBDO0FBRXBDLElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSWxEO0lBQWlDLCtCQUFVO0lBQTNDO1FBQUEscUVBK0RDO1FBN0RXLHdCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyxTQUFHLEdBQTZCLElBQUksQ0FBQztRQUNyQyxXQUFLLEdBQXdCLElBQUksQ0FBQztRQUNsQyxZQUFNLEdBQXVCLElBQUksQ0FBQztRQUNsQyxpQkFBVyxHQUE2QixJQUFJLENBQUM7UUFDN0Msa0JBQVksR0FBK0IsSUFBSSxDQUFDOztJQXVENUQsQ0FBQztJQXJEYSw0QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFUyw4QkFBUSxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QztpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEY7U0FDSjtJQUNMLENBQUM7SUFFUywrQkFBUyxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDckI7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO0lBQ0wsQ0FBQztJQUVPLDBCQUFJLEdBQVosVUFBYSxhQUFxQixFQUFFLElBQWEsRUFBRSxJQUFZO1FBQzNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDN0U7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDdEM7U0FDSjtJQUNMLENBQUM7SUFFTywwQkFBSSxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUE1REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzsyREFDc0I7SUFGbEMsV0FBVztRQUZ2QixPQUFPO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDO09BQ2YsV0FBVyxDQStEdkI7SUFBRCxrQkFBQztDQS9ERCxBQStEQyxDQS9EZ0MsdUJBQVUsR0ErRDFDO0FBL0RZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tICcuL0dhbWVPYmplY3QnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbkBtZW51KFwi5re75Yqg6Ieq5a6a5LmJ57uE5Lu2L1BsYXlBbmRTdG9wXCIpXHJcbmV4cG9ydCBjbGFzcyBQbGF5QW5kU3RvcCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgQHByb3BlcnR5KGNjLkJvb2xlYW4pXHJcbiAgICBwcml2YXRlIGF1dG9fcGxheV9hbmRfc3RvcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHM6IGNjLlBhcnRpY2xlU3lzdGVtIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hbmltOiBjYy5BbmltYXRpb24gfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NwaW5lOiBzcC5Ta2VsZXRvbiB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYW5pbV9zdGF0ZTogY2MuQW5pbWF0aW9uU3RhdGUgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NwaW5lX3RyYWNrOiBzcC5zcGluZS5UcmFja0VudHJ5IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wcyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pO1xyXG4gICAgICAgIHRoaXMuX2FuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdGhpcy5fc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b19wbGF5X2FuZF9zdG9wKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHMucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbV9zdGF0ZSA9IHRoaXMuX2FuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjayA9IHRoaXMuX3NwaW5lLnNldEFuaW1hdGlvbigwLCB0aGlzLl9zcGluZS5kZWZhdWx0QW5pbWF0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvX3BsYXlfYW5kX3N0b3ApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcy5zdG9wU3lzdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FuaW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW0uc3RvcCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZS5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheShhbmltYXRpb25OYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIHRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9hbmltKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1fc3RhdGUgPSB0aGlzLl9hbmltLnBsYXkoYW5pbWF0aW9uTmFtZSwgdGltZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbmltX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltX3N0YXRlLndyYXBNb2RlID0gbG9vcCA/IGNjLldyYXBNb2RlLkxvb3AgOiBjYy5XcmFwTW9kZS5EZWZhdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zcGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjayA9IHRoaXMuX3NwaW5lLnNldEFuaW1hdGlvbigwLCBhbmltYXRpb25OYW1lLCBsb29wKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwaW5lX3RyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjay50cmFja1RpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5pbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltLnN0b3AoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lLmNsZWFyVHJhY2soMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19