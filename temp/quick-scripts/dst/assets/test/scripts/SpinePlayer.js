
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/SpinePlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ee90atYEhG57fbi+jBBBKP', 'SpinePlayer');
// test/scripts/SpinePlayer.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpinePlayer = /** @class */ (function (_super) {
    __extends(SpinePlayer, _super);
    function SpinePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bundle_name_edit = null;
        _this.spine_url_edit = null;
        _this.skin_edit = null;
        _this.animation_edit = null;
        _this.time_scale_edit = null;
        _this.loop_tog = null;
        _this.duration_lbl = null;
        _this.current_time_lbl = null;
        _this.timeline_sld = null;
        _this.spine_node = null;
        _this.flag_node = null;
        _this.flag_edit = null;
        _this.load_btn = null;
        _this.play_btn = null;
        _this.pause_btn = null;
        _this.resume_btn = null;
        _this._spine = null;
        _this._spine_track = null;
        return _this;
    }
    SpinePlayer.prototype.onEnable = function () {
        this.flag_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.flag_node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
    };
    SpinePlayer.prototype.onDisable = function () {
        this.flag_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.flag_node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
    };
    SpinePlayer.prototype.on_touch_move_handler = function (event) {
        this.flag_node.position = this.flag_node.position.add(cc.v3(event.getDelta()));
        this.flag_edit.string = Math.floor(this.flag_node.x) + "," + Math.floor(this.flag_node.y);
    };
    SpinePlayer.prototype.on_touch_end_handler = function () {
        this.flag_edit.string = Math.floor(this.flag_node.x) + "," + Math.floor(this.flag_node.y);
    };
    SpinePlayer.prototype.on_editor_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        if (target == this.load_btn.node) {
            GameManager_1.gm.pool.put_children(this.spine_node);
            if (this.spine_node.childrenCount == 0) {
                GameManager_1.gm.pool.async_get(this.bundle_name_edit.string.trim(), this.spine_url_edit.string.trim(), NodePoolItem_1.NodePoolItem, function (item) {
                    if (_this.spine_node.childrenCount == 0) {
                        _this.spine_node.addChild(item.node);
                        _this._spine = item.getComponent(sp.Skeleton);
                        _this.do_play();
                    }
                    else {
                        GameManager_1.gm.pool.put_children(_this.spine_node);
                    }
                });
            }
        }
        else if (target == this.play_btn.node) {
            this.do_play();
        }
        else if (target == this.pause_btn.node && this._spine_track) {
            this._spine_track.timeScale = 0;
        }
        else if (target == this.resume_btn.node && this._spine_track) {
            this._spine_track.timeScale = 1;
        }
    };
    SpinePlayer.prototype.do_play = function () {
        if (!this._spine)
            return;
        cc.director.getScheduler().setTimeScale(GameManager_1.gm.const.FIGHT_SPEED_X2);
        var animationName = this.animation_edit.string.trim();
        this._spine.setSkin(this.skin_edit.string.trim());
        this._spine.timeScale = parseInt(this.time_scale_edit.string.trim());
        this._spine_track = this._spine.setAnimation(0, animationName, this.loop_tog.isChecked);
        this.duration_lbl.string = this._spine_track.animation.duration.toFixed(2) + "s";
        this.timeline_sld.progress = 0;
        this.current_time_lbl.string = "0s";
    };
    SpinePlayer.prototype.move_to_time = function (time) {
        if (this._spine_track) {
            this._spine_track.timeScale = 0;
            this._spine_track.trackTime = time;
        }
    };
    SpinePlayer.prototype.on_slide_change_handler = function () {
        if (this._spine_track) {
            var time = this.timeline_sld.progress * this._spine_track.animation.duration;
            this.move_to_time(time);
            this.current_time_lbl.string = time.toFixed(2) + "s";
        }
    };
    SpinePlayer.prototype.stopAtFrame = function (frame) {
        var currentTrackEntry = this._spine.getCurrent(0);
        var time = frame == -1 ? currentTrackEntry.animation.duration : (frame - 1) / 30;
        time = time < 0 ? 0 : time;
        if (time >= currentTrackEntry.animation.duration) {
            time = currentTrackEntry.animation.duration - 0.01;
        }
        currentTrackEntry.timeScale = 0;
        currentTrackEntry.trackTime = time;
    };
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "bundle_name_edit", void 0);
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "spine_url_edit", void 0);
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "skin_edit", void 0);
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "animation_edit", void 0);
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "time_scale_edit", void 0);
    __decorate([
        property(cc.Toggle)
    ], SpinePlayer.prototype, "loop_tog", void 0);
    __decorate([
        property(cc.Label)
    ], SpinePlayer.prototype, "duration_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], SpinePlayer.prototype, "current_time_lbl", void 0);
    __decorate([
        property(cc.Slider)
    ], SpinePlayer.prototype, "timeline_sld", void 0);
    __decorate([
        property(cc.Node)
    ], SpinePlayer.prototype, "spine_node", void 0);
    __decorate([
        property(cc.Node)
    ], SpinePlayer.prototype, "flag_node", void 0);
    __decorate([
        property(cc.EditBox)
    ], SpinePlayer.prototype, "flag_edit", void 0);
    __decorate([
        property(cc.Button)
    ], SpinePlayer.prototype, "load_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SpinePlayer.prototype, "play_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SpinePlayer.prototype, "pause_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SpinePlayer.prototype, "resume_btn", void 0);
    SpinePlayer = __decorate([
        ccclass
    ], SpinePlayer);
    return SpinePlayer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcU3BpbmVQbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUVBQTJEO0FBQzNELHVFQUFzRTtBQUVoRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQiwrQkFBWTtJQUF0QztRQUFBLHFFQXlJQztRQXZJVyxzQkFBZ0IsR0FBZSxJQUFJLENBQUM7UUFHcEMsb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFlLElBQUksQ0FBQztRQUc3QixvQkFBYyxHQUFlLElBQUksQ0FBQztRQUdsQyxxQkFBZSxHQUFlLElBQUksQ0FBQztRQUduQyxjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLHNCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsWUFBTSxHQUF1QixJQUFJLENBQUM7UUFDbEMsa0JBQVksR0FBK0IsSUFBSSxDQUFDOztJQXVGNUQsQ0FBQztJQXJGYSw4QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFNBQVMs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eyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgU3BpbmVQbGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIGJ1bmRsZV9uYW1lX2VkaXQ6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxyXG4gICAgcHJpdmF0ZSBzcGluZV91cmxfZWRpdDogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIHNraW5fZWRpdDogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIGFuaW1hdGlvbl9lZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICAgIHByaXZhdGUgdGltZV9zY2FsZV9lZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxyXG4gICAgcHJpdmF0ZSBsb29wX3RvZzogY2MuVG9nZ2xlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGR1cmF0aW9uX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgY3VycmVudF90aW1lX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TbGlkZXIpXHJcbiAgICBwcml2YXRlIHRpbWVsaW5lX3NsZDogY2MuU2xpZGVyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc3BpbmVfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZsYWdfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXHJcbiAgICBwcml2YXRlIGZsYWdfZWRpdDogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgbG9hZF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcGxheV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcGF1c2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHJlc3VtZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3BpbmU6IHNwLlNrZWxldG9uIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9zcGluZV90cmFjazogc3Auc3BpbmUuVHJhY2tFbnRyeSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsYWdfbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmxhZ19ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25fdG91Y2hfbW92ZV9oYW5kbGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmxhZ19ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmxhZ19ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uX3RvdWNoX21vdmVfaGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9tb3ZlX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsYWdfbm9kZS5wb3NpdGlvbiA9IHRoaXMuZmxhZ19ub2RlLnBvc2l0aW9uLmFkZChjYy52MyhldmVudC5nZXREZWx0YSgpKSk7XHJcbiAgICAgICAgdGhpcy5mbGFnX2VkaXQuc3RyaW5nID0gYCR7TWF0aC5mbG9vcih0aGlzLmZsYWdfbm9kZS54KX0sJHtNYXRoLmZsb29yKHRoaXMuZmxhZ19ub2RlLnkpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9lbmRfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsYWdfZWRpdC5zdHJpbmcgPSBgJHtNYXRoLmZsb29yKHRoaXMuZmxhZ19ub2RlLngpfSwke01hdGguZmxvb3IodGhpcy5mbGFnX25vZGUueSl9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2VkaXRvcl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IHRoaXMubG9hZF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLnNwaW5lX25vZGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zcGluZV9ub2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idW5kbGVfbmFtZV9lZGl0LnN0cmluZy50cmltKCkgYXMgQnVuZGxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lX3VybF9lZGl0LnN0cmluZy50cmltKCksXHJcbiAgICAgICAgICAgICAgICAgICAgTm9kZVBvb2xJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIChpdGVtOiBOb2RlUG9vbEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BpbmVfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmVfbm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUgPSBpdGVtLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvX3BsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuc3BpbmVfbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gdGhpcy5wbGF5X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9fcGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09IHRoaXMucGF1c2VfYnRuLm5vZGUgJiYgdGhpcy5fc3BpbmVfdHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sudGltZVNjYWxlID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSB0aGlzLnJlc3VtZV9idG4ubm9kZSAmJiB0aGlzLl9zcGluZV90cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjay50aW1lU2NhbGUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvX3BsYXkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zcGluZSkgcmV0dXJuO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNldFRpbWVTY2FsZShnbS5jb25zdC5GSUdIVF9TUEVFRF9YMik7XHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uTmFtZSA9IHRoaXMuYW5pbWF0aW9uX2VkaXQuc3RyaW5nLnRyaW0oKTtcclxuICAgICAgICB0aGlzLl9zcGluZS5zZXRTa2luKHRoaXMuc2tpbl9lZGl0LnN0cmluZy50cmltKCkpO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lLnRpbWVTY2FsZSA9IHBhcnNlSW50KHRoaXMudGltZV9zY2FsZV9lZGl0LnN0cmluZy50cmltKCkpO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lX3RyYWNrID0gdGhpcy5fc3BpbmUuc2V0QW5pbWF0aW9uKDAsIGFuaW1hdGlvbk5hbWUsIHRoaXMubG9vcF90b2cuaXNDaGVja2VkKTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uX2xibC5zdHJpbmcgPSBgJHt0aGlzLl9zcGluZV90cmFjay5hbmltYXRpb24uZHVyYXRpb24udG9GaXhlZCgyKX1zYDtcclxuICAgICAgICB0aGlzLnRpbWVsaW5lX3NsZC5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3RpbWVfbGJsLnN0cmluZyA9IFwiMHNcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdmVfdG9fdGltZSh0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3BpbmVfdHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sudGltZVNjYWxlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sudHJhY2tUaW1lID0gdGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9zbGlkZV9jaGFuZ2VfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3BpbmVfdHJhY2spIHtcclxuICAgICAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZWxpbmVfc2xkLnByb2dyZXNzICogdGhpcy5fc3BpbmVfdHJhY2suYW5pbWF0aW9uLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfdG9fdGltZSh0aW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3RpbWVfbGJsLnN0cmluZyA9IGAke3RpbWUudG9GaXhlZCgyKX1zYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdG9wQXRGcmFtZShmcmFtZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRyYWNrRW50cnkgPSB0aGlzLl9zcGluZS5nZXRDdXJyZW50KDApO1xyXG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBmcmFtZSA9PSAtMSA/IGN1cnJlbnRUcmFja0VudHJ5LmFuaW1hdGlvbi5kdXJhdGlvbiA6IChmcmFtZSAtIDEpIC8gMzA7XHJcbiAgICAgICAgdGltZSA9IHRpbWUgPCAwID8gMCA6IHRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWUgPj0gY3VycmVudFRyYWNrRW50cnkuYW5pbWF0aW9uLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBjdXJyZW50VHJhY2tFbnRyeS5hbmltYXRpb24uZHVyYXRpb24gLSAwLjAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50VHJhY2tFbnRyeS50aW1lU2NhbGUgPSAwO1xyXG4gICAgICAgIGN1cnJlbnRUcmFja0VudHJ5LnRyYWNrVGltZSA9IHRpbWU7XHJcbiAgICB9XHJcbn1cclxuIl19