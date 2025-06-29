"use strict";
cc._RF.push(module, 'f102eITpapAvaVlk/zgH7OF', 'Ladder');
// ladder/scripts/Ladder.ts

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
exports.Ladder = void 0;
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var LadderBuildingRankItem_1 = require("./LadderBuildingRankItem");
var LadderRankItem_1 = require("./LadderRankItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Ladder = /** @class */ (function (_super) {
    __extends(Ladder, _super);
    function Ladder() {
        var _this = _super.call(this) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.tab_tog_array = [];
        _this.rank_node = null;
        _this.ladder_rank_list = null;
        _this.self_rank_item = null;
        _this.rank_left_btn = null;
        _this.rank_right_btn = null;
        _this.rank_page_lbl = null;
        _this.building_rank_node = null;
        _this.ladder_building_rank_list = null;
        _this.self_building_rank_item = null;
        _this.building_rank_left_btn = null;
        _this.building_rank_right_btn = null;
        _this.building_rank_page_lbl = null;
        _this.achievement_node = null;
        _this.achievement_star_lbl = null;
        _this.ladder_achievement_list = null;
        _this._tab_index = -1;
        _this._rank_page = 1;
        _this._rank_total_page = 1;
        _this._building_rank_page = 1;
        _this._building_rank_total_page = 1;
        _this._page_item_count = 6;
        return _this;
    }
    Ladder.prototype.onEnable = function () {
        if (-1 == this._tab_index) {
            this._tab_index = 0;
            var defaultTab = this.tab_tog_array[this._tab_index];
            if (!defaultTab.isChecked) {
                defaultTab.check();
                defaultTab.isChecked = true;
            }
            this.editor_on_toggle_change_handler(defaultTab);
        }
    };
    Ladder.prototype.onDisable = function () {
        this.ladder_rank_list.reset();
        this.ladder_building_rank_list.reset();
        this.ladder_achievement_list.reset();
        this._tab_index = -1;
        this.rank_node.active = false;
        this.building_rank_node.active = false;
        this.achievement_node.active = false;
    };
    Ladder.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Ladder);
        }
        else if (event.target == this.rank_left_btn.node) {
            if (1 < this._rank_page) {
                this._rank_page--;
                this.rank_page_lbl.string = this._rank_page + "/" + this._rank_total_page;
                var startIndex = (this._rank_page - 1) * this._page_item_count;
                var endIndex = Math.min(startIndex + this._page_item_count, GameManager_1.gm.data.ladder_temp_data.ladder_rank_item_data_array.length - 1);
                var currentPageRankData = GameManager_1.gm.data.ladder_temp_data.ladder_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_rank_list.setData(currentPageRankData);
            }
        }
        else if (event.target == this.rank_right_btn.node) {
            if (this._rank_page < this._rank_total_page) {
                this._rank_page++;
                this.rank_page_lbl.string = this._rank_page + "/" + this._rank_total_page;
                var startIndex = (this._rank_page - 1) * this._page_item_count;
                var endIndex = Math.min(startIndex + this._page_item_count, GameManager_1.gm.data.ladder_temp_data.ladder_rank_item_data_array.length - 1);
                var currentPageRankData = GameManager_1.gm.data.ladder_temp_data.ladder_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_rank_list.setData(currentPageRankData);
            }
        }
        else if (event.target == this.building_rank_left_btn.node) {
            if (1 < this._building_rank_page) {
                this._building_rank_page--;
                this.building_rank_page_lbl.string = this._building_rank_page + "/" + this._building_rank_total_page;
                var startIndex = (this._building_rank_page - 1) * this._page_item_count;
                var endIndex = Math.min(startIndex + this._page_item_count, GameManager_1.gm.data.ladder_temp_data.ladder_building_rank_item_data_array.length - 1);
                var currentPageBuildingRankData = GameManager_1.gm.data.ladder_temp_data.ladder_building_rank_item_data_array.slice(startIndex, endIndex);
                this.ladder_building_rank_list.setData(currentPageBuildingRankData);
            }
        }
        else if (event.target == this.building_rank_right_btn.node && this._building_rank_page < this._building_rank_total_page) {
            this._building_rank_page++;
            this.building_rank_page_lbl.string = this._building_rank_page + "/" + this._building_rank_total_page;
            var startIndex = (this._building_rank_page - 1) * this._page_item_count;
            var endIndex = Math.min(startIndex + this._page_item_count, GameManager_1.gm.data.ladder_temp_data.ladder_building_rank_item_data_array.length - 1);
            var currentPageBuildingRankData = GameManager_1.gm.data.ladder_temp_data.ladder_building_rank_item_data_array.slice(startIndex, endIndex);
            this.ladder_building_rank_list.setData(currentPageBuildingRankData);
        }
    };
    Ladder.prototype.editor_on_toggle_change_handler = function (toggle) {
        this._tab_index = this.tab_tog_array.indexOf(toggle);
        this.rank_node.active = false;
        this.building_rank_node.active = false;
        this.achievement_node.active = false;
        if (0 == this._tab_index) {
            this.rank_node.active = true;
            this.update_rank_view();
        }
        else if (1 == this._tab_index) {
            this.building_rank_node.active = true;
            this.update_building_rank_view();
        }
        else if (2 == this._tab_index) {
            this.achievement_node.active = true;
            this.update_achievement_view();
        }
    };
    Ladder.prototype.update_rank_view = function () {
        var _this = this;
        var ladder_temp_data = GameManager_1.gm.data.ladder_temp_data;
        ladder_temp_data.async_get_ladder_rank_item_data_array(function () {
            _this.self_rank_item.data = ladder_temp_data.self_rank_item_data;
            _this._rank_total_page = Math.max(1, Math.ceil(ladder_temp_data.ladder_rank_item_data_array.length / _this._page_item_count));
            _this._rank_page = 1;
            _this.rank_page_lbl.string = _this._rank_page + "/" + _this._rank_total_page;
            var startIdx = (_this._rank_page - 1) * _this._page_item_count;
            var endIdx = Math.min(startIdx + _this._page_item_count, ladder_temp_data.ladder_rank_item_data_array.length);
            var data = ladder_temp_data.ladder_rank_item_data_array.slice(startIdx, endIdx);
            _this.ladder_rank_list.setData(data);
        });
    };
    Ladder.prototype.update_building_rank_view = function () {
        var _this = this;
        var ladder_temp_data = GameManager_1.gm.data.ladder_temp_data;
        ladder_temp_data.async_get_building_rank_item_data_array(function () {
            _this.self_building_rank_item.data = ladder_temp_data.self_building_rank_item_data;
            _this._building_rank_total_page = Math.max(1, Math.ceil(ladder_temp_data.ladder_building_rank_item_data_array.length / _this._page_item_count));
            _this._building_rank_page = 1;
            _this.building_rank_page_lbl.string = _this._building_rank_page + "/" + _this._building_rank_total_page;
            var startIdx = (_this._building_rank_page - 1) * _this._page_item_count;
            var endIdx = Math.min(startIdx + _this._page_item_count, ladder_temp_data.ladder_building_rank_item_data_array.length);
            var data = ladder_temp_data.ladder_building_rank_item_data_array.slice(startIdx, endIdx);
            _this.ladder_building_rank_list.setData(data);
        });
    };
    Ladder.prototype.update_achievement_view = function () {
        var tempData = GameManager_1.gm.data.ladder_temp_data;
        this.achievement_star_lbl.string = "S\u1ED1 sao t\u00EDch l\u0169y\uFF1A" + GameManager_1.gm.data.ladder_data.total_star;
        this.ladder_achievement_list.setData(tempData.ladder_achievement_data_array);
    };
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property([cc.Toggle])
    ], Ladder.prototype, "tab_tog_array", void 0);
    __decorate([
        property(cc.Node)
    ], Ladder.prototype, "rank_node", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Ladder.prototype, "ladder_rank_list", void 0);
    __decorate([
        property(LadderRankItem_1.LadderRankItem)
    ], Ladder.prototype, "self_rank_item", void 0);
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "rank_left_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "rank_right_btn", void 0);
    __decorate([
        property(cc.Label)
    ], Ladder.prototype, "rank_page_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], Ladder.prototype, "building_rank_node", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Ladder.prototype, "ladder_building_rank_list", void 0);
    __decorate([
        property(LadderBuildingRankItem_1.LadderBuildingRankItem)
    ], Ladder.prototype, "self_building_rank_item", void 0);
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "building_rank_left_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Ladder.prototype, "building_rank_right_btn", void 0);
    __decorate([
        property(cc.Label)
    ], Ladder.prototype, "building_rank_page_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], Ladder.prototype, "achievement_node", void 0);
    __decorate([
        property(cc.Label)
    ], Ladder.prototype, "achievement_star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Ladder.prototype, "ladder_achievement_list", void 0);
    Ladder = __decorate([
        ccclass
    ], Ladder);
    return Ladder;
}(GameModule_1.GameModule));
exports.Ladder = Ladder;

cc._RF.pop();