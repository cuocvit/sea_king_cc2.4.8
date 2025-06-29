"use strict";
cc._RF.push(module, 'f7cf82xypFIaat2PSCDcKxT', 'TaskEntryItem');
// start-scene/scripts/TaskEntryItem.ts

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
exports.TaskEntryItem = void 0;
//
var TaskData_1 = require("./TaskData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskEntryItem = /** @class */ (function (_super) {
    __extends(TaskEntryItem, _super);
    function TaskEntryItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_node = null;
        _this.reward_spr_array = [];
        _this.reward_lbl_array = [];
        _this.avatar_spr = null;
        _this.progress_node = null;
        _this.progress_bar_spr = null;
        _this.flag_new_node = null;
        _this.flag_tow_node = null;
        _this.flag_complete_node = null;
        _this.not_complete_node = null;
        _this.task_btn = null;
        _this._data = null; // cần xem TaskData
        _this._max_progress = 0.196;
        return _this;
    }
    Object.defineProperty(TaskEntryItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    TaskEntryItem.prototype.update_view = function () {
        var _this = this;
        var data = this._data;
        var dataConfig = data.get_config();
        if (this.flag_new_node.active = data.is_new, dataConfig) {
            this.flag_tow_node.active = 1 < dataConfig.times;
            if (data.state == TaskData_1.TaskState.ACCEPT) {
                this.not_complete_node.active = true;
                this.progress_bar_spr.fillRange = data.count / dataConfig.condition_value * this._max_progress;
                this.flag_complete_node.active = false;
                this.reward_node.active = false;
                this.node.width = 93;
            }
            else if (data.state == TaskData_1.TaskState.FINISH) {
                this.not_complete_node.active = false;
                this.flag_complete_node.active = true;
                this.reward_node.active = true;
                for (var index = 0; index < this.reward_spr_array.length; index++) {
                    var rewardSpr = this.reward_spr_array[index];
                    var rewardLbl = this.reward_lbl_array[index];
                    var reward = dataConfig.reward_array[index];
                    if (index < dataConfig.reward_array.length) {
                        rewardSpr.node.active = true;
                        rewardLbl.node.active = true;
                        Utils_1.Utils.async_set_sprite_frame(rewardSpr, Constants_1.BundleName.TASK, "res/" + reward.reward_id);
                        if (reward.reward_id < 3e4) {
                            var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(reward.reward_id);
                            if (itemCfg) {
                                rewardLbl.string = itemCfg.name + " x" + reward.reward_num;
                            }
                        }
                        else {
                            var heroCfg = GameManager_1.gm.data.config_data.getHeroCfgByID(reward.reward_id);
                            if (heroCfg) {
                                rewardLbl.string = heroCfg.name + " x" + reward.reward_num;
                            }
                        }
                    }
                    else {
                        rewardSpr.node.active = false;
                        rewardLbl.node.active = false;
                    }
                }
                this.scheduleOnce(function () {
                    _this.node.width = 93 + _this.reward_node.width - 61;
                });
            }
            Utils_1.Utils.async_set_sprite_frame(this.avatar_spr, Constants_1.BundleName.TASK, "res/" + dataConfig.icon_id);
        }
    };
    TaskEntryItem.prototype.reset = function () {
        this.flag_complete_node.active = false;
        this.reward_node.active = false;
    };
    TaskEntryItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.task_btn.node && this._data) {
            if (!(this._data.state != TaskData_1.TaskState.ACCEPT && this._data.state != TaskData_1.TaskState.FINISH)) {
                this._data.is_new = false;
            }
            GameManager_1.gm.data.task_data.async_write_data();
            this.update_view();
            var worldPoint = this.node.convertToWorldSpaceAR(cc.v3(94, 0));
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.Task.key, {
                data: this._data,
                world_point: worldPoint
            });
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Task);
        }
    };
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "reward_node", void 0);
    __decorate([
        property([cc.Sprite])
    ], TaskEntryItem.prototype, "reward_spr_array", void 0);
    __decorate([
        property([cc.Label])
    ], TaskEntryItem.prototype, "reward_lbl_array", void 0);
    __decorate([
        property(cc.Sprite)
    ], TaskEntryItem.prototype, "avatar_spr", void 0);
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "progress_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], TaskEntryItem.prototype, "progress_bar_spr", void 0);
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "flag_new_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "flag_tow_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "flag_complete_node", void 0);
    __decorate([
        property(cc.Node)
    ], TaskEntryItem.prototype, "not_complete_node", void 0);
    __decorate([
        property(cc.Button)
    ], TaskEntryItem.prototype, "task_btn", void 0);
    TaskEntryItem = __decorate([
        ccclass
    ], TaskEntryItem);
    return TaskEntryItem;
}(NodePoolItem_1.NodePoolItem));
exports.TaskEntryItem = TaskEntryItem;

cc._RF.pop();