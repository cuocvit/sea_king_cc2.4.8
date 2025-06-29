"use strict";
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