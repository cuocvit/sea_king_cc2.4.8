
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/AutoMergeMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56566xrBf5FlbRSMkHupme9', 'AutoMergeMessage');
// start-scene/scripts/AutoMergeMessage.ts

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
exports.AutoMergeMessage = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AutoMergeMessage = /** @class */ (function (_super) {
    __extends(AutoMergeMessage, _super);
    function AutoMergeMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.ok_btn = null;
        _this.video_btn = null;
        _this.free_btn = null;
        return _this;
    }
    AutoMergeMessage.prototype.onEnable = function () {
        var _a;
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        this.free_btn.node.active = false;
        this.video_btn.node.active = false;
        this.free_btn.node.active = GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0;
        this.video_btn.node.active = !((_a = this.free_btn) === null || _a === void 0 ? void 0 : _a.node.active);
    };
    AutoMergeMessage.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    AutoMergeMessage.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b, _c, _d;
        if (event.target == ((_a = this.close_btn) === null || _a === void 0 ? void 0 : _a.node) || event.target == ((_b = this.ok_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
        }
        else if (event.target == ((_c = this.video_btn) === null || _c === void 0 ? void 0 : _c.node)) {
            GameManager_1.gm.channel.show_video_ad(function () {
                GameManager_1.gm.data.event_emitter.emit("auto_merge_message");
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
            }, 1);
        }
        else if (event.target == ((_d = this.free_btn) === null || _d === void 0 ? void 0 : _d.node)) {
            GameManager_1.gm.data.event_emitter.emit("auto_merge_message");
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
        }
    };
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "video_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "free_btn", void 0);
    AutoMergeMessage = __decorate([
        ccclass
    ], AutoMergeMessage);
    return AutoMergeMessage;
}(GameModule_1.GameModule));
exports.AutoMergeMessage = AutoMergeMessage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEF1dG9NZXJnZU1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFDbkMsbURBQWtEO0FBQ2xELDJDQUEwQztBQUVwQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyxvQ0FBVTtJQUFoRDtRQUFBLHFFQXNDQztRQXBDVyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUduQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUduQyxjQUFRLEdBQXFCLElBQUksQ0FBQzs7SUEyQjlDLENBQUM7SUF6QmEsbUNBQVEsR0FBbEI7O1FBQ0ksZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQztJQUM3RCxDQUFDO0lBRVMsb0NBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsK0JBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8seURBQThCLEdBQXRDLFVBQXVDLEtBQWU7O1FBQ2xELElBQUksS0FBSyxDQUFDLE1BQU0sV0FBSSxJQUFJLENBQUMsU0FBUywwQ0FBRSxJQUFJLENBQUEsSUFBSSxLQUFLLENBQUMsTUFBTSxXQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQSxFQUFFO1lBQzNFLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLFdBQUksSUFBSSxDQUFDLFNBQVMsMENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDN0MsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUNyQixnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ2pELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLFdBQUksSUFBSSxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDNUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2pELGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBbkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ29CO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ3NCO0lBWGpDLGdCQUFnQjtRQUQ1QixPQUFPO09BQ0ssZ0JBQWdCLENBc0M1QjtJQUFELHVCQUFDO0NBdENELEFBc0NDLENBdENxQyx1QkFBVSxHQXNDL0M7QUF0Q1ksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tIFwiLi9DaGFubmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBBdXRvTWVyZ2VNZXNzYWdlIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIG9rX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgdmlkZW9fYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBmcmVlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgICAgICB0aGlzLmZyZWVfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy52aWRlb19idG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZyZWVfYnRuLm5vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNfZmlyc3RfYXV0b19jb21wb3NlID09IDA7XHJcbiAgICAgICAgdGhpcy52aWRlb19idG4ubm9kZS5hY3RpdmUgPSAhdGhpcy5mcmVlX2J0bj8ubm9kZS5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bj8ubm9kZSB8fCBldmVudC50YXJnZXQgPT0gdGhpcy5va19idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuQXV0b01lcmdlTWVzc2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy52aWRlb19idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5zaG93X3ZpZGVvX2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwiYXV0b19tZXJnZV9tZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuQXV0b01lcmdlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuZnJlZV9idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJhdXRvX21lcmdlX21lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkF1dG9NZXJnZU1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==