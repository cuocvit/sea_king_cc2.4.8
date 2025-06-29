
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/record/scripts/RecordEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb8041b3ktMSZle3lYMcrzG', 'RecordEntry');
// record/scripts/RecordEntry.ts

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
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Timer_1 = require("../../start-scene/scripts/Timer");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordEntry = /** @class */ (function (_super) {
    __extends(RecordEntry, _super);
    function RecordEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.record_start_btn = null;
        _this.record_stop_btn = null;
        _this.time_lbl = null;
        _this._time = null;
        return _this;
    }
    RecordEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this.on_record_state_change_handler();
    };
    RecordEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        if (this._time)
            this._time.stop();
    };
    RecordEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.record_start_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Record);
        }
        else if (event.target == this.record_stop_btn.node) {
            if (Math.floor((Date.now() - GameManager_1.gm.data.record_data.record_timestamp) / 1e3) < RecordData_1.RecordData.MIN_RECORD_TIME) {
                GameManager_1.gm.ui.show_notice(cc.js.formatStr("Thời gian ghi không được ít hơn %d giây!!!", RecordData_1.RecordData.MIN_RECORD_TIME));
            }
            else {
                this.stop_record();
            }
        }
    };
    RecordEntry.prototype.on_record_state_change_handler = function () {
        var _this = this;
        this.record_start_btn.node.active = 1 != GameManager_1.gm.data.record_data.record_state;
        this.record_stop_btn.node.active = 1 == GameManager_1.gm.data.record_data.record_state;
        if (1 == GameManager_1.gm.data.record_data.record_type) {
            if (1 == GameManager_1.gm.data.record_data.record_state) {
                if (!this._time) {
                    this._time = new Timer_1.Timer;
                }
                if (!this._time.is_running) {
                    this._time.start(function () {
                        var elapsedTime = Math.floor((Date.now() - GameManager_1.gm.data.record_data.record_timestamp) / 1e3);
                        _this.time_lbl.string = Utils_1.Utils.time_format(elapsedTime, "mm:ss");
                        if (elapsedTime >= RecordData_1.RecordData.AUTO_END_RECORD_TIME) {
                            _this._time.stop();
                            _this.stop_record();
                        }
                    }, 1e3, 0);
                }
            }
            else if (this._time) {
                this._time.stop();
            }
        }
    };
    RecordEntry.prototype.stop_record = function () {
        GameManager_1.gm.channel.record_stop(false);
        GameManager_1.gm.data.record_data.record_state = 2;
        GameManager_1.gm.data.event_emitter.emit(RecordData_1.RecordData.RECORD_STATE_CHANGE);
        GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Record);
    };
    __decorate([
        property(cc.Button)
    ], RecordEntry.prototype, "record_start_btn", void 0);
    __decorate([
        property(cc.Button)
    ], RecordEntry.prototype, "record_stop_btn", void 0);
    __decorate([
        property(cc.Label)
    ], RecordEntry.prototype, "time_lbl", void 0);
    RecordEntry = __decorate([
        ccclass
    ], RecordEntry);
    return RecordEntry;
}(NodePoolItem_1.NodePoolItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVjb3JkXFxzY3JpcHRzXFxSZWNvcmRFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBa0U7QUFDbEUscUVBQTJEO0FBQzNELHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQseURBQXdEO0FBRWxELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFZO0lBQXRDO1FBQUEscUVBa0VDO1FBaEVTLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRTFCLFdBQUssR0FBaUIsSUFBSSxDQUFDOztJQXdEckMsQ0FBQztJQXREVyw4QkFBUSxHQUFsQjtRQUNFLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVTLCtCQUFTLEdBQW5CO1FBQ0UsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBVSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU8sb0RBQThCLEdBQXRDLFVBQXVDLEtBQWU7UUFDcEQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7WUFDOUMsZ0JBQUUsQ0FBQyxFQUFFLENB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QUFDLE1BQU0sQ0FBQzt3REFDc0I7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDZTtJQVI5QixXQUFXO1FBRGhCLE9BQU87T0FDRixXQUFXLENBa0VoQjtJQUFELGtCQUFDO0NBbEVELEFBa0VDLENBbEV5QiwyQkFBWSxHQWtFckMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9SZWNvcmREYXRhJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVGltZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFJlY29yZEVudHJ5IGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gIHByaXZhdGUgcmVjb3JkX3N0YXJ0X2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIHJlY29yZF9zdG9wX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIHByaXZhdGUgdGltZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBfdGltZTogVGltZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFJlY29yZERhdGEuUkVDT1JEX1NUQVRFX0NIQU5HRSwgdGhpcy5vbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgdGhpcy5vbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFJlY29yZERhdGEuUkVDT1JEX1NUQVRFX0NIQU5HRSwgdGhpcy5vbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgaWYgKHRoaXMuX3RpbWUpIHRoaXMuX3RpbWUuc3RvcCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMucmVjb3JkX3N0YXJ0X2J0bi5ub2RlKSB7XHJcbiAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuUmVjb3JkKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMucmVjb3JkX3N0b3BfYnRuLm5vZGUpIHtcclxuICAgICAgaWYgKE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90aW1lc3RhbXApIC8gMWUzKSA8IFJlY29yZERhdGEuTUlOX1JFQ09SRF9USU1FKSB7XHJcbiAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoY2MuanMuZm9ybWF0U3RyKFwiVGjhu51pIGdpYW4gZ2hpIGtow7RuZyDEkcaw4bujYyDDrXQgaMahbiAlZCBnacOieSEhIVwiLCBSZWNvcmREYXRhLk1JTl9SRUNPUkRfVElNRSkpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdG9wX3JlY29yZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uX3JlY29yZF9zdGF0ZV9jaGFuZ2VfaGFuZGxlcigpOiB2b2lkIHtcclxuICAgIHRoaXMucmVjb3JkX3N0YXJ0X2J0bi5ub2RlLmFjdGl2ZSA9IDEgIT0gZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGU7XHJcbiAgICB0aGlzLnJlY29yZF9zdG9wX2J0bi5ub2RlLmFjdGl2ZSA9IDEgPT0gZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGU7XHJcbiAgICBpZiAoMSA9PSBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90eXBlKSB7XHJcbiAgICAgIGlmICgxID09IGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3N0YXRlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90aW1lKSB7XHJcbiAgICAgICAgICB0aGlzLl90aW1lID0gbmV3IFRpbWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl90aW1lLmlzX3J1bm5pbmcpIHtcclxuICAgICAgICAgIHRoaXMuX3RpbWUuc3RhcnQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkVGltZSA9IE1hdGguZmxvb3IoKERhdGUubm93KCkgLSBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90aW1lc3RhbXApIC8gMWUzKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lX2xibC5zdHJpbmcgPSBVdGlscy50aW1lX2Zvcm1hdChlbGFwc2VkVGltZSwgXCJtbTpzc1wiKTtcclxuICAgICAgICAgICAgaWYgKGVsYXBzZWRUaW1lID49IFJlY29yZERhdGEuQVVUT19FTkRfUkVDT1JEX1RJTUUpIHtcclxuICAgICAgICAgICAgICB0aGlzLl90aW1lLnN0b3AoKTtcclxuICAgICAgICAgICAgICB0aGlzLnN0b3BfcmVjb3JkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIDFlMywgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLl90aW1lKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZS5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RvcF9yZWNvcmQoKTogdm9pZCB7XHJcbiAgICBnbS5jaGFubmVsLnJlY29yZF9zdG9wKGZhbHNlKTtcclxuICAgIGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3N0YXRlID0gMjtcclxuICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFJlY29yZERhdGEuUkVDT1JEX1NUQVRFX0NIQU5HRSk7XHJcbiAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LlJlY29yZCk7XHJcbiAgfVxyXG59Il19