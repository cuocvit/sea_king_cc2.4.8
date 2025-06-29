
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TaskEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRhc2tFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHVDQUFzQztBQUN0Qyw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBQzlDLGlEQUFnRDtBQUNoRCx5Q0FBeUM7QUFFbkMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0IsNkJBQVk7SUFNdkM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFOTyw0QkFBc0IsR0FBcUIsSUFBSSxDQUFDO1FBRWhELDJCQUFxQixHQUFvQixFQUFFLENBQUM7O0lBSXBELENBQUM7SUFFUywwQkFBTSxHQUFoQjtRQUNJLElBQU0sY0FBYyxHQUFXLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNsRSxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQU0sSUFBSSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBVSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRSw2QkFBYSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRVMsNEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVTLDZCQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVPLCtCQUFXLEdBQW5CO1FBQ0ksSUFBTSxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BFLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNyRCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNqRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDekQ7U0FDSjtJQUNMLENBQUM7SUFyQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDb0M7SUFGL0MsU0FBUztRQURyQixPQUFPO09BQ0ssU0FBUyxDQXdDckI7SUFBRCxnQkFBQztDQXhDRCxBQXdDQyxDQXhDOEIsMkJBQVksR0F3QzFDO0FBeENZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKi0qXHJcbmltcG9ydCB7IFRhc2tEYXRhIH0gZnJvbSAnLi9UYXNrRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgVGFza0VudHJ5SXRlbSB9IGZyb20gJy4vVGFza0VudHJ5SXRlbSc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRhc2tFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSB0YXNrX2VudHJ5X2l0ZW1fcHJlZmFiOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRhc2tfZW50cnlfaXRlbV9hcnJheTogVGFza0VudHJ5SXRlbVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhaWx5VGFza0NvdW50OiBudW1iZXIgPSBnbS5kYXRhLnRhc2tfZGF0YS5kYWlseV90YXNrX2NvdW50O1xyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBkYWlseVRhc2tDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBnbS5wb29sLmdldChCdW5kbGVOYW1lLlRBU0ssIFwicHJlZmFicy90YXNrX2VudHJ5X2l0ZW1cIiwgVGFza0VudHJ5SXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tfZW50cnlfaXRlbV9hcnJheVtpXSA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oVGFza0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoVGFza0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFza0RhdGEgPSBnbS5kYXRhLnRhc2tfZGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50YXNrX2VudHJ5X2l0ZW1fYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0YXNrRGF0YS50YXNrX2RhdGFfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrX2VudHJ5X2l0ZW1fYXJyYXlbaW5kZXhdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza19lbnRyeV9pdGVtX2FycmF5W2luZGV4XS5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza19lbnRyeV9pdGVtX2FycmF5W2luZGV4XS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19