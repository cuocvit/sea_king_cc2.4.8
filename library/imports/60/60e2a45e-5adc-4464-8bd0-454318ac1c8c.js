"use strict";
cc._RF.push(module, '60e2aReWtxEZIvQRUMYrByM', 'Launch');
// start-scene/scripts/Launch.ts

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
exports.Launch = exports.LoadingState = void 0;
// @
var NetUtils_1 = require("./NetUtils");
// @
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["START"] = 0] = "START";
    LoadingState[LoadingState["START_FULL"] = 1] = "START_FULL";
    LoadingState[LoadingState["CAVES_FULL"] = 2] = "CAVES_FULL";
    LoadingState[LoadingState["REWARD_FULL"] = 3] = "REWARD_FULL";
    LoadingState[LoadingState["BOAT_OUT"] = 4] = "BOAT_OUT";
    LoadingState[LoadingState["BOAT_IN"] = 5] = "BOAT_IN";
    LoadingState[LoadingState["COMPLETE"] = 6] = "COMPLETE";
})(LoadingState = exports.LoadingState || (exports.LoadingState = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//
var Launch = /** @class */ (function (_super) {
    __extends(Launch, _super);
    // @
    function Launch() {
        var _this = _super.call(this) || this;
        // @
        _this.bg_node = null;
        // (not used) ???
        _this.notice_node = null;
        // (not used) ???
        _this.notice_txt = null;
        // (not used) ???
        _this.prompt_lbl = null;
        _this.bar_node = null;
        _this.bar_node_2 = null;
        _this._low_speed = 20;
        _this._low_speed_2 = 100;
        _this._total_len = 0;
        _this._total_len_2 = 0;
        _this._high_speed = 500;
        return _this;
        // this._state = LoadingState.START
    }
    Launch_1 = Launch;
    Object.defineProperty(Launch, "instance", {
        get: function () {
            if (this._instance === null) {
                console.error("Call after the singleton is instantiated");
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Launch.prototype.onLoad = function () {
        var _this = this;
        Launch_1._instance = this;
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
            _this.scheduleOnce(function () {
                _this.after_first_draw();
            });
        }, this);
        cc.game.on(cc.game.EVENT_HIDE, this.on_game_hide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.on_game_show, this);
    };
    Launch.prototype.after_first_draw = function () {
        NetUtils_1.ReportData.instance.report_once_point(10010);
        this.state = LoadingState.START;
        cc.Canvas.instance.node.addComponent("GameMain");
    };
    Launch.prototype.onDestroy = function () {
        cc.game.off(cc.game.EVENT_HIDE, this.on_game_hide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.on_game_show, this);
    };
    Launch.prototype.on_game_hide = function () {
        cc.log("Switch to the background and pause the game");
        cc.game.pause();
    };
    Launch.prototype.on_game_show = function () {
        cc.log("Switch to the background and resume the game");
        cc.game.resume();
    };
    Object.defineProperty(Launch.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state !== value) {
                this._state = value;
            }
            if (value === LoadingState.COMPLETE) {
                this.bg_node.active = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Launch.prototype.update = function (deltaTime) {
        if (this._state === LoadingState.COMPLETE) {
            this._total_len += deltaTime * this._high_speed;
            this._total_len_2 += deltaTime * this._high_speed;
            this.bar_node.progress = Math.floor(this._total_len) / 100;
            this.bar_node_2.progress = (this._total_len_2 % 100) / 100;
            if (this._total_len >= 100) {
                this.bg_node.active = false;
            }
            /* if (cc.sys.platform === cc.sys.OPPO_GAME) {
                qg.setLoadingProgress({ progress: this._total_len });
            } */
        }
        else {
            if (this._total_len < 90) {
                this._total_len += deltaTime * this._low_speed;
                this.bar_node.progress = Math.floor(this._total_len) / 100;
            }
            this._total_len_2 += deltaTime * this._low_speed_2;
            this.bar_node_2.progress = (this._total_len_2 % 100) / 100;
        }
    };
    var Launch_1;
    // @
    Launch._instance = null;
    __decorate([
        property(cc.Node)
    ], Launch.prototype, "bg_node", void 0);
    __decorate([
        property(cc.Node)
    ], Launch.prototype, "notice_node", void 0);
    __decorate([
        property(cc.RichText)
    ], Launch.prototype, "notice_txt", void 0);
    __decorate([
        property(cc.Label)
    ], Launch.prototype, "prompt_lbl", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Launch.prototype, "bar_node", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Launch.prototype, "bar_node_2", void 0);
    Launch = Launch_1 = __decorate([
        ccclass("Launch")
    ], Launch);
    return Launch;
}(cc.Component));
exports.Launch = Launch;

cc._RF.pop();