"use strict";
cc._RF.push(module, '350e5ylqXZEGLKSlG5ax+QT', 'TurtleExchange');
// start-scene/scripts/TurtleExchange.ts

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
exports.TurtleExchange = void 0;
//
var GameModule_1 = require("./GameModule");
var TurtleExchangeData_1 = require("./TurtleExchangeData");
var GameManager_1 = require("./GameManager");
var ListView_1 = require("./ListView");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchange = /** @class */ (function (_super) {
    __extends(TurtleExchange, _super);
    function TurtleExchange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_node = null;
        _this.window_node = null;
        _this.close_btn = null;
        _this.exchange_list = null;
        _this.refresh_count_lbl = null;
        _this.refresh_btn = null;
        _this.refresh_diamond_lbl = null;
        return _this;
    }
    TurtleExchange.prototype.onEnable = function () {
        var _a;
        this._args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.Task.key);
        GameManager_1.gm.data.event_emitter.on(TurtleExchangeData_1.TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        (_a = this.mask_node) === null || _a === void 0 ? void 0 : _a.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        this.update_view();
    };
    TurtleExchange.prototype.onDisable = function () {
        var _a, _b;
        GameManager_1.gm.data.event_emitter.off(TurtleExchangeData_1.TurtleExchangeData.EVENT_DATA_CHANGE, this.update_view, this);
        (_a = this.mask_node) === null || _a === void 0 ? void 0 : _a.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
        (_b = this.exchange_list) === null || _b === void 0 ? void 0 : _b.reset();
    };
    TurtleExchange.prototype.update_view = function () {
        var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
        this.refresh_count_lbl.string = cc.js.formatStr("Số lần：%d/%d", turtleExchangeData.left_refresh_count, GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT);
        this.refresh_diamond_lbl.string = GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND.toString();
        this.exchange_list.setData(turtleExchangeData.get_turtle_exchange_data_array());
    };
    TurtleExchange.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b;
        if (event.target === ((_a = this.close_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.TurtleExchange);
        }
        else if (event.target === ((_b = this.refresh_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            var mapCellData = GameManager_1.gm.data.mapCell_data;
            if (mapCellData.roleCoinData.diamondNum < GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND) {
                GameManager_1.gm.ui.show_notice("Không đủ kim cương");
            }
            else {
                mapCellData.delCellItem(Constants_1.RewardIdEnum.DIAMOND, GameManager_1.gm.const.TURTLE_EXCHANGE_REFRESH_DIAMOND);
                var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
                turtleExchangeData.left_refresh_count += GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                turtleExchangeData.async_write_data();
            }
        }
    };
    TurtleExchange.prototype.on_touch_end_handler = function (event) {
        if (event.target === this.mask_node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.TurtleExchange);
        }
    };
    __decorate([
        property(cc.Node)
    ], TurtleExchange.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], TurtleExchange.prototype, "window_node", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchange.prototype, "close_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], TurtleExchange.prototype, "exchange_list", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchange.prototype, "refresh_count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchange.prototype, "refresh_btn", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchange.prototype, "refresh_diamond_lbl", void 0);
    TurtleExchange = __decorate([
        ccclass
    ], TurtleExchange);
    return TurtleExchange;
}(GameModule_1.GameModule));
exports.TurtleExchange = TurtleExchange;

cc._RF.pop();