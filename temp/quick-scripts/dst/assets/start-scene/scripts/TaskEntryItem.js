
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TaskEntryItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRhc2tFbnRyeUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEVBQUU7QUFDRix1Q0FBK0Q7QUFDL0QsNkNBQW1DO0FBQ25DLCtDQUE4QztBQUM5QyxpQ0FBZ0M7QUFDaEMseUNBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW1DLGlDQUFZO0lBQS9DO1FBQUEscUVBd0hDO1FBdEhXLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxzQkFBZ0IsR0FBZ0IsRUFBRSxDQUFDO1FBR25DLHNCQUFnQixHQUFlLEVBQUUsQ0FBQztRQUdsQyxnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLHNCQUFnQixHQUFxQixJQUFJLENBQUM7UUFHMUMsbUJBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLG1CQUFhLEdBQW1CLElBQUksQ0FBQztRQUdyQyx3QkFBa0IsR0FBbUIsSUFBSSxDQUFDO1FBRzFDLHVCQUFpQixHQUFtQixJQUFJLENBQUM7UUFHekMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFFbEMsV0FBSyxHQUF3QixJQUFJLENBQUMsQ0FBQyxtQkFBbUI7UUFDdEQsbUJBQWEsR0FBVyxLQUFLLENBQUM7O0lBcUYxQyxDQUFDO0lBbkZHLHNCQUFXLCtCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLEtBQW1CO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FMQTtJQU9PLG1DQUFXLEdBQW5CO1FBQUEsaUJBaURDO1FB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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbmltcG9ydCB7IFRhc2tEYXRhLCBUYXNrU3RhdGUsIFRhc2tJdGVtRGF0YSB9IGZyb20gJy4vVGFza0RhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRhc2tFbnRyeUl0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJld2FyZF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfc3ByX2FycmF5OiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTGFiZWxdKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGJsX2FycmF5OiBjYy5MYWJlbFtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgYXZhdGFyX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHByb2dyZXNzX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc19iYXJfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZmxhZ19uZXdfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBmbGFnX3Rvd19ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZsYWdfY29tcGxldGVfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBub3RfY29tcGxldGVfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHRhc2tfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBUYXNrSXRlbURhdGEgfCBudWxsID0gbnVsbDsgLy8gY+G6p24geGVtIFRhc2tEYXRhXHJcbiAgICBwcml2YXRlIF9tYXhfcHJvZ3Jlc3M6IG51bWJlciA9IDAuMTk2O1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBUYXNrSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogVGFza0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb25maWcgPSBkYXRhLmdldF9jb25maWcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmxhZ19uZXdfbm9kZS5hY3RpdmUgPSBkYXRhLmlzX25ldywgZGF0YUNvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLmZsYWdfdG93X25vZGUuYWN0aXZlID0gMSA8IGRhdGFDb25maWcudGltZXM7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXRlID09IFRhc2tTdGF0ZS5BQ0NFUFQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90X2NvbXBsZXRlX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyX3Nwci5maWxsUmFuZ2UgPSBkYXRhLmNvdW50IC8gZGF0YUNvbmZpZy5jb25kaXRpb25fdmFsdWUgKiB0aGlzLl9tYXhfcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsYWdfY29tcGxldGVfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSA5MztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF0ZSA9PSBUYXNrU3RhdGUuRklOSVNIKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdF9jb21wbGV0ZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGFnX2NvbXBsZXRlX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5yZXdhcmRfc3ByX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZFNwciA9IHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkTGJsID0gdGhpcy5yZXdhcmRfbGJsX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXdhcmQgPSBkYXRhQ29uZmlnLnJld2FyZF9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgZGF0YUNvbmZpZy5yZXdhcmRfYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZFNwci5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUocmV3YXJkU3ByLCBCdW5kbGVOYW1lLlRBU0ssIFwicmVzL1wiICsgcmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXdhcmQucmV3YXJkX2lkIDwgM2U0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGJsLnN0cmluZyA9IGl0ZW1DZmcubmFtZSArIFwiIHhcIiArIHJld2FyZC5yZXdhcmRfbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0NmZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0NmZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExibC5zdHJpbmcgPSBoZXJvQ2ZnLm5hbWUgKyBcIiB4XCIgKyByZXdhcmQucmV3YXJkX251bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZFNwci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMYmwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gOTMgKyB0aGlzLnJld2FyZF9ub2RlLndpZHRoIC0gNjE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmF2YXRhcl9zcHIsIEJ1bmRsZU5hbWUuVEFTSywgXCJyZXMvXCIgKyBkYXRhQ29uZmlnLmljb25faWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mbGFnX2NvbXBsZXRlX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy50YXNrX2J0bi5ub2RlICYmIHRoaXMuX2RhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCEodGhpcy5fZGF0YS5zdGF0ZSAhPSBUYXNrU3RhdGUuQUNDRVBUICYmIHRoaXMuX2RhdGEuc3RhdGUgIT0gVGFza1N0YXRlLkZJTklTSCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEuaXNfbmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdtLmRhdGEudGFza19kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICBjb25zdCB3b3JsZFBvaW50ID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52Myg5NCwgMCkpO1xyXG5cclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlRhc2sua2V5LCB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9kYXRhLFxyXG4gICAgICAgICAgICAgICAgd29ybGRfcG9pbnQ6IHdvcmxkUG9pbnRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5UYXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=