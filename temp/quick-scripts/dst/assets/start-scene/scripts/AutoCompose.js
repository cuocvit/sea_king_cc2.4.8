
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/AutoCompose.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbb4eZ0JxNAKqPyb07yZ06j', 'AutoCompose');
// start-scene/scripts/AutoCompose.ts

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
//
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var TaskData_1 = require("./TaskData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AutoCompose = /** @class */ (function (_super) {
    __extends(AutoCompose, _super);
    function AutoCompose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask = null;
        _this.lblTime = null;
        _this.newerIcon = null;
        _this.handAni = null;
        _this.autoAnim = null;
        _this._timeContainer = 0;
        _this._maxTime = 600;
        _this._stopTime = 0;
        _this.timer = 0;
        return _this;
    }
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.onEnable = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        this.newerIcon.active = GameManager_1.gm.data.mapCell_data.is_first_auto_compose === 0;
        this.showReciveTime();
        GameManager_1.gm.ui.on("task_finish_20009", this.showHandAnimAtAutoCom, this);
        GameManager_1.gm.data.event_emitter.on("auto_merge_message", this.on_auto_merge_message, this);
    };
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off("auto_merge_message", this.on_auto_merge_message, this);
        GameManager_1.gm.ui.off("task_finish_20009", this.showHandAnimAtAutoCom, this);
    };
    // @
    AutoCompose.prototype.showHandAnimAtAutoCom = function () {
        this.handAni.active = true;
    };
    // @
    AutoCompose.prototype.on_auto_merge_message = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            GameManager_1.gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
        }
        else {
            this._stopTime = this._maxTime;
            GameManager_1.gm.channel.report_event("video_auto_merge", {
                event_desc: "Watch video automatically",
                desc: "Watch video automatically" // 看视频自动合成
            });
            NetUtils_1.ReportData.instance.report_once_point(10881);
            NetUtils_1.ReportData.instance.report_point(10882);
        }
        this.playAutoCompose();
    };
    // @
    AutoCompose.prototype.playAutoCompose = function () {
        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.AUTOCOMPOSE);
        if (!GameManager_1.gm.data.mapCell_data.autoCompose()) {
            GameManager_1.gm.data.mapCell_data.autoOpenCase();
        }
    };
    // @
    AutoCompose.prototype.onClick = function () {
        this.handAni.active = false;
        this.autoAnim.node.active = false;
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.newerIcon.active = false;
            GameManager_1.gm.data.mapCell_data.setAutoComposeUsed();
            this._stopTime = this._maxTime;
            this.playAutoCompose();
        }
        else if (this._stopTime <= 0) {
            GameManager_1.gm.channel.show_video_ad(this.watchAdCb, this);
        }
    };
    // @
    AutoCompose.prototype.watchAdCb = function () {
        if (this._stopTime > 0)
            return;
        this._stopTime = this._maxTime;
        GameManager_1.gm.channel.report_event("video_auto_merge", {
            event_desc: "Watch video automatically",
            desc: "Watch video automatically" // 看视频自动合成
        });
        NetUtils_1.ReportData.instance.report_once_point(10881);
        NetUtils_1.ReportData.instance.report_point(10882);
        this.playAutoCompose();
    };
    // @ (LIFE-CYCLE CALLBACKS)
    AutoCompose.prototype.update = function (deltaTime) {
        if (GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0) {
            this.timer += deltaTime;
            if (this.timer > 15 && !this.autoAnim.node.active) {
                this.autoAnim.node.active = true;
                this.autoAnim.play();
            }
        }
        if (this._stopTime > 0) {
            this._timeContainer += deltaTime;
            if (this._timeContainer >= 1) {
                --this._timeContainer;
                this._stopTime--;
                this.playAutoCompose();
                this.showReciveTime();
            }
        }
    };
    // @
    AutoCompose.prototype.showReciveTime = function () {
        this.lblTime.string = Utils_1.Utils.format_time_miunte(this._stopTime);
        this.mask.fillRange = this._stopTime / this._maxTime;
        if (this._stopTime === 0) {
            this.lblTime.string = "Tự động tổng hợp"; // 自动合成
            this.mask.fillRange = 0;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], AutoCompose.prototype, "mask", void 0);
    __decorate([
        property(cc.Label)
    ], AutoCompose.prototype, "lblTime", void 0);
    __decorate([
        property(cc.Node)
    ], AutoCompose.prototype, "newerIcon", void 0);
    __decorate([
        property(cc.Node)
    ], AutoCompose.prototype, "handAni", void 0);
    __decorate([
        property(cc.Animation)
    ], AutoCompose.prototype, "autoAnim", void 0);
    AutoCompose = __decorate([
        ccclass
    ], AutoCompose);
    return AutoCompose;
}(GameModule_1.GameModule));
exports.default = AutoCompose;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEF1dG9Db21wb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEVBQUU7QUFDRiw2Q0FBbUM7QUFDbkMsMkNBQTBDO0FBQzFDLGlDQUFnQztBQUNoQyx1Q0FBd0M7QUFDeEMsdUNBQStDO0FBRXpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFVO0lBQW5EO1FBQUEscUVBOEhDO1FBNUhXLFVBQUksR0FBcUIsSUFBSSxDQUFDO1FBRzlCLGFBQU8sR0FBb0IsSUFBSSxDQUFDO1FBR2hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBR2pDLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBd0IsSUFBSSxDQUFDO1FBRXJDLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGNBQVEsR0FBVyxHQUFHLENBQUM7UUFDeEIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUNyQixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQTJHOUIsQ0FBQztJQXpHRywyQkFBMkI7SUFDakIsOEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFD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QUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFFRCxJQUFJO0lBQ0ksb0NBQWMsR0FBdEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLENBQUMsT0FBTztZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBM0hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ2tCO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ3FCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ3VCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ3FCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7aURBQ3NCO0lBZDVCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E4SC9CO0lBQUQsa0JBQUM7Q0E5SEQsQUE4SEMsQ0E5SHdDLHVCQUFVLEdBOEhsRDtrQkE5SG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBUYXNrQ29uZGl0aW9uVHlwZSB9IGZyb20gJy4vVGFza0RhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Db21wb3NlIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBtYXNrOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpbWU6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG5ld2VySWNvbjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBoYW5kQW5pOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICAgIHByaXZhdGUgYXV0b0FuaW06IGNjLkFuaW1hdGlvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3RpbWVDb250YWluZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9tYXhUaW1lOiBudW1iZXIgPSA2MDA7XHJcbiAgICBwdWJsaWMgX3N0b3BUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aW1lcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLyBAIChMSUZFLUNZQ0xFIENBTExCQUNLUylcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhhbmRBbmkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvQW5pbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV3ZXJJY29uLmFjdGl2ZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzX2ZpcnN0X2F1dG9fY29tcG9zZSA9PT0gMDtcclxuICAgICAgICB0aGlzLnNob3dSZWNpdmVUaW1lKCk7XHJcbiAgICAgICAgZ20udWkub24oXCJ0YXNrX2ZpbmlzaF8yMDAwOVwiLCB0aGlzLnNob3dIYW5kQW5pbUF0QXV0b0NvbSwgdGhpcyk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFwiYXV0b19tZXJnZV9tZXNzYWdlXCIsIHRoaXMub25fYXV0b19tZXJnZV9tZXNzYWdlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAIChMSUZFLUNZQ0xFIENBTExCQUNLUylcclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9mZihcImF1dG9fbWVyZ2VfbWVzc2FnZVwiLCB0aGlzLm9uX2F1dG9fbWVyZ2VfbWVzc2FnZSwgdGhpcyk7XHJcbiAgICAgICAgZ20udWkub2ZmKFwidGFza19maW5pc2hfMjAwMDlcIiwgdGhpcy5zaG93SGFuZEFuaW1BdEF1dG9Db20sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgc2hvd0hhbmRBbmltQXRBdXRvQ29tKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgb25fYXV0b19tZXJnZV9tZXNzYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZEFuaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9BbmltLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmlzX2ZpcnN0X2F1dG9fY29tcG9zZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3ZXJJY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBdXRvQ29tcG9zZVVzZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcFRpbWUgPSB0aGlzLl9tYXhUaW1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BUaW1lID0gdGhpcy5fbWF4VGltZTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ2aWRlb19hdXRvX21lcmdlXCIsIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwiV2F0Y2ggdmlkZW8gYXV0b21hdGljYWxseVwiLCAvLyDnnIvop4bpopHoh6rliqjlkIjmiJBcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwiV2F0Y2ggdmlkZW8gYXV0b21hdGljYWxseVwiIC8vIOeci+inhumikeiHquWKqOWQiOaIkFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDg4MSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5QXV0b0NvbXBvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIHBsYXlBdXRvQ29tcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5BVVRPQ09NUE9TRSk7XHJcbiAgICAgICAgaWYgKCFnbS5kYXRhLm1hcENlbGxfZGF0YS5hdXRvQ29tcG9zZSgpKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmF1dG9PcGVuQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oYW5kQW5pLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0FuaW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNfZmlyc3RfYXV0b19jb21wb3NlID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5uZXdlckljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEF1dG9Db21wb3NlVXNlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdG9wVGltZSA9IHRoaXMuX21heFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUF1dG9Db21wb3NlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdG9wVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoQWRDYiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgd2F0Y2hBZENiKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9wVGltZSA+IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLl9zdG9wVGltZSA9IHRoaXMuX21heFRpbWU7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ2aWRlb19hdXRvX21lcmdlXCIsIHtcclxuICAgICAgICAgICAgZXZlbnRfZGVzYzogXCJXYXRjaCB2aWRlbyBhdXRvbWF0aWNhbGx5XCIsIC8vIOeci+inhumikeiHquWKqOWQiOaIkFxyXG4gICAgICAgICAgICBkZXNjOiBcIldhdGNoIHZpZGVvIGF1dG9tYXRpY2FsbHlcIiAvLyDnnIvop4bpopHoh6rliqjlkIjmiJBcclxuICAgICAgICB9KTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODgxKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDg4Mik7XHJcbiAgICAgICAgdGhpcy5wbGF5QXV0b0NvbXBvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAIChMSUZFLUNZQ0xFIENBTExCQUNLUylcclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNfZmlyc3RfYXV0b19jb21wb3NlID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lciArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyID4gMTUgJiYgIXRoaXMuYXV0b0FuaW0ubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b0FuaW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3BUaW1lID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lQ29udGFpbmVyICs9IGRlbHRhVGltZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWVDb250YWluZXIgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl90aW1lQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RvcFRpbWUtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUF1dG9Db21wb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWNpdmVUaW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBzaG93UmVjaXZlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxibFRpbWUuc3RyaW5nID0gVXRpbHMuZm9ybWF0X3RpbWVfbWl1bnRlKHRoaXMuX3N0b3BUaW1lKTtcclxuICAgICAgICB0aGlzLm1hc2suZmlsbFJhbmdlID0gdGhpcy5fc3RvcFRpbWUgLyB0aGlzLl9tYXhUaW1lO1xyXG4gICAgICAgIGlmICh0aGlzLl9zdG9wVGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxibFRpbWUuc3RyaW5nID0gXCJU4buxIMSR4buZbmcgdOG7lW5nIGjhu6NwXCI7IC8vIOiHquWKqOWQiOaIkFxyXG4gICAgICAgICAgICB0aGlzLm1hc2suZmlsbFJhbmdlID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19