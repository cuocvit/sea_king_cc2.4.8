"use strict";
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