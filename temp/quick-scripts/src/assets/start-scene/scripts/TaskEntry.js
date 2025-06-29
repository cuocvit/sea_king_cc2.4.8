"use strict";
cc._RF.push(module, '1acca36xKFAqpAoUvupI22g', 'TaskEntry');
// start-scene/scripts/TaskEntry.ts

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
exports.TaskEntry = void 0;
// *-*
var TaskData_1 = require("./TaskData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var TaskEntryItem_1 = require("./TaskEntryItem");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskEntry = /** @class */ (function (_super) {
    __extends(TaskEntry, _super);
    function TaskEntry() {
        var _this = _super.call(this) || this;
        _this.task_entry_item_prefab = null;
        _this.task_entry_item_array = [];
        return _this;
    }
    TaskEntry.prototype.onLoad = function () {
        var dailyTaskCount = GameManager_1.gm.data.task_data.daily_task_count;
        for (var i = 0; i < dailyTaskCount; i++) {
            var item = GameManager_1.gm.pool.get(Constants_1.BundleName.TASK, "prefabs/task_entry_item", TaskEntryItem_1.TaskEntryItem);
            this.node.addChild(item.node);
            this.task_entry_item_array[i] = item;
        }
    };
    TaskEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    TaskEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(TaskData_1.TaskData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    TaskEntry.prototype.update_view = function () {
        var taskData = GameManager_1.gm.data.task_data;
        for (var index = 0; index < this.task_entry_item_array.length; index++) {
            var data = taskData.task_data_array[index];
            if (data) {
                this.task_entry_item_array[index].node.active = true;
                this.task_entry_item_array[index].data = data;
            }
            else {
                this.task_entry_item_array[index].node.active = false;
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], TaskEntry.prototype, "task_entry_item_prefab", void 0);
    TaskEntry = __decorate([
        ccclass
    ], TaskEntry);
    return TaskEntry;
}(NodePoolItem_1.NodePoolItem));
exports.TaskEntry = TaskEntry;

cc._RF.pop();