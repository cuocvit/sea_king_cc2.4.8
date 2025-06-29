
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/task/scripts/Task.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dae0ePVTVZD974Yl7eJ1cgK', 'Task');
// task/scripts/Task.ts

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
exports.Task = void 0;
var TaskData_1 = require("../../start-scene/scripts/TaskData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Timer_1 = require("../../start-scene/scripts/Timer");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_node = null;
        _this.window_node = null;
        _this.receive_node = null;
        _this.reward_bg_node = null;
        _this.flag_tow_node = null;
        _this.close_btn = null;
        _this.receive_btn = null;
        _this.title_lbl = null;
        _this.content_lbl = null;
        _this.count_lbl = null;
        _this.count_prg = null;
        _this.left_sec_lbl = null;
        _this.reward_spr_array = [];
        _this.reward_lbl_array = [];
        _this._args = null;
        _this._timer = null;
        return _this;
    }
    Task.prototype.onEnable = function () {
        this._args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.Task.key);
        this.window_node.position = this.node.convertToNodeSpaceAR(this._args.world_point);
        GameManager_1.gm.data.event_emitter.on(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.update_view();
    };
    Task.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.mask_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this._timer && this._timer.is_running && this._timer.stop();
    };
    Task.prototype.update_view = function () {
        var _this = this;
        var data = this._args.data;
        var dataConfig = data.get_config();
        if (dataConfig) {
            this.title_lbl.string = dataConfig.name;
            if (1 == data.type) {
                this.content_lbl.string = dataConfig.content;
            }
            else if (2 == data.type) {
                this.content_lbl.string = cc.js.formatStr(dataConfig.content, data.count + "/" + dataConfig.condition_value);
            }
            this.count_lbl.string = data.count + "/" + dataConfig.condition_value;
            this.count_prg.progress = data.count / dataConfig.condition_value;
            for (var index = 0; index < this.reward_spr_array.length; index++) {
                var rewardSpr = this.reward_spr_array[index];
                var rewardLbl = this.reward_lbl_array[index];
                if (index < dataConfig.reward_array.length) {
                    rewardSpr.node.active = true;
                    rewardLbl.node.active = true;
                    Utils_1.Utils.async_set_sprite_frame(rewardSpr, Constants_1.BundleName.TASK, "res/" + dataConfig.reward_array[index].reward_id);
                    rewardLbl.string = "x" + dataConfig.reward_array[index].reward_num;
                }
                else {
                    rewardSpr.node.active = false;
                    rewardLbl.node.active = false;
                }
            }
            this.flag_tow_node.active = 1 < dataConfig.times;
        }
        if (data.state == TaskData_1.TaskState.ACCEPT) {
            this.receive_node.active = false;
            this.reward_bg_node.color = GameManager_1.gm.const.TASK_NOT_COMPLETE_COLOR;
            if (0 < data.task_end_timestamp) {
                var remainingTimeInSeconds = Math.ceil((data.task_end_timestamp - Date.now()) / 1e3);
                if (0 < remainingTimeInSeconds) {
                    this.left_sec_lbl.node.active = true;
                    if (!this._timer) {
                        this._timer = new Timer_1.Timer;
                    }
                    this._timer.start(function (t, e) {
                        var remainingTimeInSeconds = Math.ceil((data.task_end_timestamp - Date.now()) / 1e3);
                        _this.left_sec_lbl.string = Utils_1.Utils.format_time(remainingTimeInSeconds);
                        if (e <= t) {
                            GameManager_1.gm.data.task_data.get_next_task(data);
                            GameManager_1.gm.data.task_data.async_write_data();
                            _this.update_view();
                        }
                    }, 1e3, remainingTimeInSeconds);
                }
                else {
                    GameManager_1.gm.data.task_data.get_next_task(data);
                    GameManager_1.gm.data.task_data.async_write_data();
                    this.update_view();
                }
            }
            else {
                this.left_sec_lbl.node.active = false;
            }
        }
        else if (data.state == TaskData_1.TaskState.FINISH) {
            this.receive_node.active = true;
            this.reward_bg_node.color = GameManager_1.gm.const.TASK_COMPLETE_COLOR;
            this.left_sec_lbl.node.active = false;
        }
    };
    Task.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Task);
        }
        else if (event.target == this.receive_btn.node) {
            GameManager_1.gm.data.task_data.receive_reward(this._args.data, this.reward_bg_node, 2);
            GameManager_1.gm.channel.report_event("receive_task_reward", {
                event_desc: "领取任务奖励",
                desc: "领取日常任务奖励"
            });
            NetUtils_1.ReportData.instance.report_once_point(10801);
            NetUtils_1.ReportData.instance.report_point(10802);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Task);
        }
    };
    Task.prototype.on_touch_end_handler = function (event) {
        if (event.target == this.mask_node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Task);
        }
    };
    __decorate([
        property(cc.Node)
    ], Task.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], Task.prototype, "window_node", void 0);
    __decorate([
        property(cc.Node)
    ], Task.prototype, "receive_node", void 0);
    __decorate([
        property(cc.Node)
    ], Task.prototype, "reward_bg_node", void 0);
    __decorate([
        property(cc.Node)
    ], Task.prototype, "flag_tow_node", void 0);
    __decorate([
        property(cc.Button)
    ], Task.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Task.prototype, "receive_btn", void 0);
    __decorate([
        property(cc.Label)
    ], Task.prototype, "title_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], Task.prototype, "content_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], Task.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Task.prototype, "count_prg", void 0);
    __decorate([
        property(cc.Label)
    ], Task.prototype, "left_sec_lbl", void 0);
    __decorate([
        property([cc.Sprite])
    ], Task.prototype, "reward_spr_array", void 0);
    __decorate([
        property([cc.Label])
    ], Task.prototype, "reward_lbl_array", void 0);
    Task = __decorate([
        ccclass
    ], Task);
    return Task;
}(GameModule_1.GameModule));
exports.Task = Task;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGFza1xcc2NyaXB0c1xcVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXVGO0FBQ3ZGLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFDbEUseURBQXdEO0FBQ3hELHlEQUF3RDtBQUN4RCwrREFBZ0U7QUFDaEUsaUVBQWlFO0FBTTNELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW1CLHdCQUFVO0lBQTdCO1FBQUEscUVBc0pDO1FBcEpXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFHakMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsc0JBQWdCLEdBQWdCLEVBQUUsQ0FBQztRQUduQyxzQkFBZ0IsR0FBZSxFQUFFLENBQUM7UUFFbEMsV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQWlCLElBQUksQ0FBQzs7SUEwR3hDLENBQUM7SUF4R2EsdUJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FB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QUNtQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNxQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNvQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJDQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNnQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZDQUNrQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNnQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzJDQUNnQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNtQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztrREFDcUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7a0RBQ3FCO0lBekN4QyxJQUFJO1FBRFQsT0FBTztPQUNGLElBQUksQ0FzSlQ7SUFBRCxXQUFDO0NBdEpELEFBc0pDLENBdEprQix1QkFBVSxHQXNKNUI7QUFFUSxvQkFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2tEYXRhLCBUYXNrSXRlbURhdGEsIFRhc2tTdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVGFza0RhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1RpbWVyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYXNrQXJncyB7XHJcbiAgICB3b3JsZF9wb2ludDogY2MuVmVjMztcclxuICAgIGRhdGE6IFRhc2tJdGVtRGF0YTtcclxufVxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgVGFzayBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1hc2tfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHdpbmRvd19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmV3YXJkX2JnX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBmbGFnX3Rvd19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjZWl2ZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSB0aXRsZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGNvbnRlbnRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBjb3VudF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcml2YXRlIGNvdW50X3ByZzogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGVmdF9zZWNfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfc3ByX2FycmF5OiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGJsX2FycmF5OiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfYXJnczogVGFza0FyZ3MgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfdGltZXI6IFRpbWVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FyZ3MgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuVGFzay5rZXkpIGFzIFRhc2tBcmdzO1xyXG4gICAgICAgIHRoaXMud2luZG93X25vZGUucG9zaXRpb24gPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5fYXJncy53b3JsZF9wb2ludCk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFRhc2tEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1hc2tfbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoVGFza0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubWFza19ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyICYmIHRoaXMuX3RpbWVyLmlzX3J1bm5pbmcgJiYgdGhpcy5fdGltZXIuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2FyZ3MuZGF0YTtcclxuICAgICAgICBjb25zdCBkYXRhQ29uZmlnID0gZGF0YS5nZXRfY29uZmlnKCk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVfbGJsLnN0cmluZyA9IGRhdGFDb25maWcubmFtZTtcclxuICAgICAgICAgICAgaWYgKDEgPT0gZGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRfbGJsLnN0cmluZyA9IGRhdGFDb25maWcuY29udGVudDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IGRhdGEudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50X2xibC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoZGF0YUNvbmZpZy5jb250ZW50LCBkYXRhLmNvdW50ICsgXCIvXCIgKyBkYXRhQ29uZmlnLmNvbmRpdGlvbl92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudF9sYmwuc3RyaW5nID0gZGF0YS5jb3VudCArIFwiL1wiICsgZGF0YUNvbmZpZy5jb25kaXRpb25fdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnRfcHJnLnByb2dyZXNzID0gZGF0YS5jb3VudCAvIGRhdGFDb25maWcuY29uZGl0aW9uX3ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucmV3YXJkX3Nwcl9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZFNwciA9IHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXdhcmRMYmwgPSB0aGlzLnJld2FyZF9sYmxfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgZGF0YUNvbmZpZy5yZXdhcmRfYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkU3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRMYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUocmV3YXJkU3ByLCBCdW5kbGVOYW1lLlRBU0ssIFwicmVzL1wiICsgZGF0YUNvbmZpZy5yZXdhcmRfYXJyYXlbaW5kZXhdLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGJsLnN0cmluZyA9IFwieFwiICsgZGF0YUNvbmZpZy5yZXdhcmRfYXJyYXlbaW5kZXhdLnJld2FyZF9udW07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFNwci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmxhZ190b3dfbm9kZS5hY3RpdmUgPSAxIDwgZGF0YUNvbmZpZy50aW1lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN0YXRlID09IFRhc2tTdGF0ZS5BQ0NFUFQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkX2JnX25vZGUuY29sb3IgPSBnbS5jb25zdC5UQVNLX05PVF9DT01QTEVURV9DT0xPUjtcclxuICAgICAgICAgICAgaWYgKDAgPCBkYXRhLnRhc2tfZW5kX3RpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nVGltZUluU2Vjb25kcyA9IE1hdGguY2VpbCgoZGF0YS50YXNrX2VuZF90aW1lc3RhbXAgLSBEYXRlLm5vdygpKSAvIDFlMyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoMCA8IHJlbWFpbmluZ1RpbWVJblNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRfc2VjX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl90aW1lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IG5ldyBUaW1lcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCh0LCBlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ1RpbWVJblNlY29uZHMgPSBNYXRoLmNlaWwoKGRhdGEudGFza19lbmRfdGltZXN0YW1wIC0gRGF0ZS5ub3coKSkgLyAxZTMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRfc2VjX2xibC5zdHJpbmcgPSBVdGlscy5mb3JtYXRfdGltZShyZW1haW5pbmdUaW1lSW5TZWNvbmRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlIDw9IHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEudGFza19kYXRhLmdldF9uZXh0X3Rhc2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxZTMsIHJlbWFpbmluZ1RpbWVJblNlY29uZHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEuZ2V0X25leHRfdGFzayhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdF9zZWNfbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXRlID09IFRhc2tTdGF0ZS5GSU5JU0gpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRfYmdfbm9kZS5jb2xvciA9IGdtLmNvbnN0LlRBU0tfQ09NUExFVEVfQ09MT1I7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdF9zZWNfbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5UYXNrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnJlY2VpdmVfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEucmVjZWl2ZV9yZXdhcmQodGhpcy5fYXJncy5kYXRhLCB0aGlzLnJld2FyZF9iZ19ub2RlLCAyKTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJyZWNlaXZlX3Rhc2tfcmV3YXJkXCIsIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi6aKG5Y+W5Lu75Yqh5aWW5YqxXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIumihuWPluaXpeW4uOS7u+WKoeWlluWKsVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgwMSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODAyKTtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuVGFzaylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9lbmRfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMubWFza19ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlRhc2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVGFzayB9OyJdfQ==