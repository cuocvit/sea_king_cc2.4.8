"use strict";
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