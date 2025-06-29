
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Launch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExhdW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSTtBQUNKLHVDQUF3QztBQUV4QyxJQUFJO0FBQ0osSUFBWSxZQVFYO0FBUkQsV0FBWSxZQUFZO0lBQ3BCLGlEQUFTLENBQUE7SUFDVCwyREFBYyxDQUFBO0lBQ2QsMkRBQWMsQ0FBQTtJQUNkLDZEQUFlLENBQUE7SUFDZix1REFBWSxDQUFBO0lBQ1oscURBQVcsQ0FBQTtJQUNYLHVEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVJXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBUXZCO0FBRUssSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsRUFBRTtBQUVGO0lBQTRCLDBCQUFZO0lBa0NwQyxJQUFJO0lBQ0o7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUF2Q0QsSUFBSTtRQUVJLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFaEMsaUJBQWlCO1FBRVAsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFdEMsaUJBQWlCO1FBRVAsZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBRXpDLGlCQUFpQjtRQUVQLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBMEIsSUFBSSxDQUFDO1FBR3ZDLGdCQUFVLEdBQTBCLElBQUksQ0FBQztRQWE3QyxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzs7UUFDdkIsbUNBQW1DO0lBQ3ZDLENBQUM7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Q0FBQzs4Q0FDd0I7SUF4QnhDLE1BQU07UUFEbEIsT0FBTyxDQUFDLFFBQVEsQ0FBQztPQUNMLE1BQU0sQ0EwSGxCO0lBQUQsYUFBQztDQTFIRCxBQTBIQyxDQTFIMkIsRUFBRSxDQUFDLFNBQVMsR0EwSHZDO0FBMUhZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQFxyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSBcIi4vTmV0VXRpbHNcIjtcclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gTG9hZGluZ1N0YXRlIHtcclxuICAgIFNUQVJUID0gMCxcclxuICAgIFNUQVJUX0ZVTEwgPSAxLFxyXG4gICAgQ0FWRVNfRlVMTCA9IDIsXHJcbiAgICBSRVdBUkRfRlVMTCA9IDMsXHJcbiAgICBCT0FUX09VVCA9IDQsXHJcbiAgICBCT0FUX0lOID0gNSxcclxuICAgIENPTVBMRVRFID0gNixcclxufVxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8vXHJcbkBjY2NsYXNzKFwiTGF1bmNoXCIpXHJcbmV4cG9ydCBjbGFzcyBMYXVuY2ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMYXVuY2ggPSBudWxsO1xyXG5cclxuICAgIC8vIEBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBiZ19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyAobm90IHVzZWQpID8/P1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm90ZWN0ZWQgbm90aWNlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIChub3QgdXNlZCkgPz8/XHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwcm90ZWN0ZWQgbm90aWNlX3R4dDogY2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAgIC8vIChub3QgdXNlZCkgPz8/XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcm90ZWN0ZWQgcHJvbXB0X2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIHByaXZhdGUgYmFyX25vZGU6IGNjLlByb2dyZXNzQmFyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHJpdmF0ZSBiYXJfbm9kZV8yOiBjYy5Qcm9ncmVzc0JhciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgX2xvd19zcGVlZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbG93X3NwZWVkXzI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3RvdGFsX2xlbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxfbGVuXzI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2hpZ2hfc3BlZWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3N0YXRlOiBMb2FkaW5nU3RhdGU7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2xvd19zcGVlZCA9IDIwO1xyXG4gICAgICAgIHRoaXMuX2xvd19zcGVlZF8yID0gMTAwO1xyXG4gICAgICAgIHRoaXMuX3RvdGFsX2xlbiA9IDA7XHJcbiAgICAgICAgdGhpcy5fdG90YWxfbGVuXzIgPSAwO1xyXG4gICAgICAgIHRoaXMuX2hpZ2hfc3BlZWQgPSA1MDA7XHJcbiAgICAgICAgLy8gdGhpcy5fc3RhdGUgPSBMb2FkaW5nU3RhdGUuU1RBUlRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBMYXVuY2gge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FsbCBhZnRlciB0aGUgc2luZ2xldG9uIGlzIGluc3RhbnRpYXRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlITtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIExhdW5jaC5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uY2UoXHJcbiAgICAgICAgICAgIGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyX2ZpcnN0X2RyYXcoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5vbl9nYW1lX2hpZGUsIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uX2dhbWVfc2hvdywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZnRlcl9maXJzdF9kcmF3KCk6IHZvaWQge1xyXG4gICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTAwMTApO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBMb2FkaW5nU3RhdGUuU1RBUlQ7XHJcbiAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuYWRkQ29tcG9uZW50KFwiR2FtZU1haW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMub25fZ2FtZV9oaWRlLCB0aGlzKTtcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25fZ2FtZV9zaG93LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2dhbWVfaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5sb2coXCJTd2l0Y2ggdG8gdGhlIGJhY2tncm91bmQgYW5kIHBhdXNlIHRoZSBnYW1lXCIpO1xyXG4gICAgICAgIGNjLmdhbWUucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2dhbWVfc2hvdygpOiB2b2lkIHtcclxuICAgICAgICBjYy5sb2coXCJTd2l0Y2ggdG8gdGhlIGJhY2tncm91bmQgYW5kIHJlc3VtZSB0aGUgZ2FtZVwiKTtcclxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogTG9hZGluZ1N0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzdGF0ZSh2YWx1ZTogTG9hZGluZ1N0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IExvYWRpbmdTdGF0ZS5DT01QTEVURSkge1xyXG4gICAgICAgICAgICB0aGlzLmJnX25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IExvYWRpbmdTdGF0ZS5DT01QTEVURSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b3RhbF9sZW4gKz0gZGVsdGFUaW1lICogdGhpcy5faGlnaF9zcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5fdG90YWxfbGVuXzIgKz0gZGVsdGFUaW1lICogdGhpcy5faGlnaF9zcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5iYXJfbm9kZSEucHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHRoaXMuX3RvdGFsX2xlbikgLyAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyX25vZGVfMiEucHJvZ3Jlc3MgPSAodGhpcy5fdG90YWxfbGVuXzIgJSAxMDApIC8gMTAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG90YWxfbGVuID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ19ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuT1BQT19HQU1FKSB7XHJcbiAgICAgICAgICAgICAgICBxZy5zZXRMb2FkaW5nUHJvZ3Jlc3MoeyBwcm9ncmVzczogdGhpcy5fdG90YWxfbGVuIH0pO1xyXG4gICAgICAgICAgICB9ICovXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RvdGFsX2xlbiA8IDkwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b3RhbF9sZW4gKz0gZGVsdGFUaW1lICogdGhpcy5fbG93X3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXJfbm9kZSEucHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHRoaXMuX3RvdGFsX2xlbikgLyAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdG90YWxfbGVuXzIgKz0gZGVsdGFUaW1lICogdGhpcy5fbG93X3NwZWVkXzI7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyX25vZGVfMiEucHJvZ3Jlc3MgPSAodGhpcy5fdG90YWxfbGVuXzIgJSAxMDApIC8gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=