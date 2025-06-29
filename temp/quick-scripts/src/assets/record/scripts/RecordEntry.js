"use strict";
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