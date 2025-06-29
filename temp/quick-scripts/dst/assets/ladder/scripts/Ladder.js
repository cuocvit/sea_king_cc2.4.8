
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/Ladder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFDbEUsK0RBQThEO0FBQzlELG1FQUFrRTtBQUNsRSxtREFBa0Q7QUFFNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEIsMEJBQVU7SUE4RGxDO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBcEVPLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBR3JDLG1CQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUdoQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLHNCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0Isd0JBQWtCLEdBQVksSUFBSSxDQUFDO1FBR25DLCtCQUF5QixHQUFhLElBQUksQ0FBQztRQUczQyw2QkFBdUIsR0FBMkIsSUFBSSxDQUFDO1FBR3ZELDRCQUFzQixHQUFjLElBQUksQ0FBQztRQUd6Qyw2QkFBdUIsR0FBYyxJQUFJLENBQUM7UUFHMUMsNEJBQXNCLEdBQWEsSUFBSSxDQUFDO1FBR3hDLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUdqQywwQkFBb0IsR0FBYSxJQUFJLENBQUM7UUFHdEMsNkJBQXVCLEdBQWEsSUFBSSxDQUFDO1FBVzdDLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdCQUFnQixH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QUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDb0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDcUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDb0I7SUFHdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDeUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzs2REFDZ0M7SUFHbkQ7UUFEQyxRQUFRLENBQUMsK0NBQXNCLENBQUM7MkRBQzhCO0lBRy9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQzZCO0lBR2pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQzhCO0lBR2xEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQzZCO0lBR2hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ3VCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQzJCO0lBRzlDO1FBREMsUUFBUSxDQUFDLG1CQUFRLENBQUM7MkRBQzhCO0lBckR4QyxNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBbU1sQjtJQUFELGFBQUM7Q0FuTUQsQUFtTUMsQ0FuTTJCLHVCQUFVLEdBbU1yQztBQW5NWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXcnO1xyXG5pbXBvcnQgeyBMYWRkZXJCdWlsZGluZ1JhbmtJdGVtIH0gZnJvbSAnLi9MYWRkZXJCdWlsZGluZ1JhbmtJdGVtJztcclxuaW1wb3J0IHsgTGFkZGVyUmFua0l0ZW0gfSBmcm9tICcuL0xhZGRlclJhbmtJdGVtJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTGFkZGVyIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYW55d2hlcmVfY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuVG9nZ2xlXSlcclxuICAgIHByaXZhdGUgdGFiX3RvZ19hcnJheTogY2MuVG9nZ2xlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmFua19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIGxhZGRlcl9yYW5rX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGFkZGVyUmFua0l0ZW0pXHJcbiAgICBwcml2YXRlIHNlbGZfcmFua19pdGVtOiBMYWRkZXJSYW5rSXRlbSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmFua19sZWZ0X2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSByYW5rX3JpZ2h0X2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHJhbmtfcGFnZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYnVpbGRpbmdfcmFua19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIGxhZGRlcl9idWlsZGluZ19yYW5rX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGFkZGVyQnVpbGRpbmdSYW5rSXRlbSlcclxuICAgIHByaXZhdGUgc2VsZl9idWlsZGluZ19yYW5rX2l0ZW06IExhZGRlckJ1aWxkaW5nUmFua0l0ZW0gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJ1aWxkaW5nX3JhbmtfbGVmdF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYnVpbGRpbmdfcmFua19yaWdodF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBidWlsZGluZ19yYW5rX3BhZ2VfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGFjaGlldmVtZW50X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgYWNoaWV2ZW1lbnRfc3Rhcl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIGxhZGRlcl9hY2hpZXZlbWVudF9saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFiX2luZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yYW5rX3BhZ2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JhbmtfdG90YWxfcGFnZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRpbmdfcmFua19wYWdlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9idWlsZGluZ19yYW5rX3RvdGFsX3BhZ2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3BhZ2VfaXRlbV9jb3VudDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl90YWJfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9yYW5rX3BhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuX3JhbmtfdG90YWxfcGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRpbmdfcmFua19wYWdlID0gMTtcclxuICAgICAgICB0aGlzLl9idWlsZGluZ19yYW5rX3RvdGFsX3BhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VfaXRlbV9jb3VudCA9IDY7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgtIDEgPT0gdGhpcy5fdGFiX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhYl9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUYWIgPSB0aGlzLnRhYl90b2dfYXJyYXlbdGhpcy5fdGFiX2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCFkZWZhdWx0VGFiLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRhYi5jaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFRhYi5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yX29uX3RvZ2dsZV9jaGFuZ2VfaGFuZGxlcihkZWZhdWx0VGFiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhZGRlcl9yYW5rX2xpc3QucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmxhZGRlcl9idWlsZGluZ19yYW5rX2xpc3QucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmxhZGRlcl9hY2hpZXZlbWVudF9saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5fdGFiX2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5yYW5rX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idWlsZGluZ19yYW5rX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY2hpZXZlbWVudF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fCBldmVudC50YXJnZXQgPT0gdGhpcy5hbnl3aGVyZV9jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5MYWRkZXIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnJhbmtfbGVmdF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoMSA8IHRoaXMuX3JhbmtfcGFnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFua19wYWdlLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmtfcGFnZV9sYmwuc3RyaW5nID0gdGhpcy5fcmFua19wYWdlICsgXCIvXCIgKyB0aGlzLl9yYW5rX3RvdGFsX3BhZ2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gKHRoaXMuX3JhbmtfcGFnZSAtIDEpICogdGhpcy5fcGFnZV9pdGVtX2NvdW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kSW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4ICsgdGhpcy5fcGFnZV9pdGVtX2NvdW50LCBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEubGFkZGVyX3JhbmtfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBhZ2VSYW5rRGF0YSA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfcmFua19pdGVtX2RhdGFfYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWRkZXJfcmFua19saXN0LnNldERhdGEoY3VycmVudFBhZ2VSYW5rRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yYW5rX3JpZ2h0X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yYW5rX3BhZ2UgPCB0aGlzLl9yYW5rX3RvdGFsX3BhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmtfcGFnZSsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rX3BhZ2VfbGJsLnN0cmluZyA9IHRoaXMuX3JhbmtfcGFnZSArIFwiL1wiICsgdGhpcy5fcmFua190b3RhbF9wYWdlO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9ICh0aGlzLl9yYW5rX3BhZ2UgLSAxKSAqIHRoaXMuX3BhZ2VfaXRlbV9jb3VudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCArIHRoaXMuX3BhZ2VfaXRlbV9jb3VudCwgZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLmxhZGRlcl9yYW5rX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlUmFua0RhdGEgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEubGFkZGVyX3JhbmtfaXRlbV9kYXRhX2FycmF5LnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFkZGVyX3JhbmtfbGlzdC5zZXREYXRhKGN1cnJlbnRQYWdlUmFua0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuYnVpbGRpbmdfcmFua19sZWZ0X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICgxIDwgdGhpcy5fYnVpbGRpbmdfcmFua19wYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWlsZGluZ19yYW5rX3BhZ2UtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdfcmFua19wYWdlX2xibC5zdHJpbmcgPSB0aGlzLl9idWlsZGluZ19yYW5rX3BhZ2UgKyBcIi9cIiArIHRoaXMuX2J1aWxkaW5nX3JhbmtfdG90YWxfcGFnZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSAodGhpcy5fYnVpbGRpbmdfcmFua19wYWdlIC0gMSkgKiB0aGlzLl9wYWdlX2l0ZW1fY291bnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyB0aGlzLl9wYWdlX2l0ZW1fY291bnQsIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UGFnZUJ1aWxkaW5nUmFua0RhdGEgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEubGFkZGVyX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhX2FycmF5LnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFkZGVyX2J1aWxkaW5nX3JhbmtfbGlzdC5zZXREYXRhKGN1cnJlbnRQYWdlQnVpbGRpbmdSYW5rRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5idWlsZGluZ19yYW5rX3JpZ2h0X2J0bi5ub2RlICYmIHRoaXMuX2J1aWxkaW5nX3JhbmtfcGFnZSA8IHRoaXMuX2J1aWxkaW5nX3JhbmtfdG90YWxfcGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZGluZ19yYW5rX3BhZ2UrKztcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ19yYW5rX3BhZ2VfbGJsLnN0cmluZyA9IHRoaXMuX2J1aWxkaW5nX3JhbmtfcGFnZSArIFwiL1wiICsgdGhpcy5fYnVpbGRpbmdfcmFua190b3RhbF9wYWdlO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gKHRoaXMuX2J1aWxkaW5nX3JhbmtfcGFnZSAtIDEpICogdGhpcy5fcGFnZV9pdGVtX2NvdW50O1xyXG4gICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyB0aGlzLl9wYWdlX2l0ZW1fY291bnQsIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlQnVpbGRpbmdSYW5rRGF0YSA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmxhZGRlcl9idWlsZGluZ19yYW5rX2xpc3Quc2V0RGF0YShjdXJyZW50UGFnZUJ1aWxkaW5nUmFua0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl90b2dnbGVfY2hhbmdlX2hhbmRsZXIodG9nZ2xlOiBjYy5Ub2dnbGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90YWJfaW5kZXggPSB0aGlzLnRhYl90b2dfYXJyYXkuaW5kZXhPZih0b2dnbGUpO1xyXG4gICAgICAgIHRoaXMucmFua19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYnVpbGRpbmdfcmFua19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKDAgPT0gdGhpcy5fdGFiX2luZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3JhbmtfdmlldygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoMSA9PSB0aGlzLl90YWJfaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ19yYW5rX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnVpbGRpbmdfcmFua192aWV3KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgyID09IHRoaXMuX3RhYl9pbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYWNoaWV2ZW1lbnRfdmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9yYW5rX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyBsYWRkZXJfdGVtcF9kYXRhIH0gPSBnbS5kYXRhO1xyXG4gICAgICAgIGxhZGRlcl90ZW1wX2RhdGEuYXN5bmNfZ2V0X2xhZGRlcl9yYW5rX2l0ZW1fZGF0YV9hcnJheSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZl9yYW5rX2l0ZW0uZGF0YSA9IGxhZGRlcl90ZW1wX2RhdGEuc2VsZl9yYW5rX2l0ZW1fZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5fcmFua190b3RhbF9wYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxhZGRlcl90ZW1wX2RhdGEubGFkZGVyX3JhbmtfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aCAvIHRoaXMuX3BhZ2VfaXRlbV9jb3VudCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5rX3BhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfcGFnZV9sYmwuc3RyaW5nID0gYCR7dGhpcy5fcmFua19wYWdlfS8ke3RoaXMuX3JhbmtfdG90YWxfcGFnZX1gO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAodGhpcy5fcmFua19wYWdlIC0gMSkgKiB0aGlzLl9wYWdlX2l0ZW1fY291bnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgdGhpcy5fcGFnZV9pdGVtX2NvdW50LCBsYWRkZXJfdGVtcF9kYXRhLmxhZGRlcl9yYW5rX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfcmFua19pdGVtX2RhdGFfYXJyYXkuc2xpY2Uoc3RhcnRJZHgsIGVuZElkeCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxhZGRlcl9yYW5rX2xpc3Quc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9idWlsZGluZ19yYW5rX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyBsYWRkZXJfdGVtcF9kYXRhIH0gPSBnbS5kYXRhO1xyXG5cclxuICAgICAgICBsYWRkZXJfdGVtcF9kYXRhLmFzeW5jX2dldF9idWlsZGluZ19yYW5rX2l0ZW1fZGF0YV9hcnJheSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZl9idWlsZGluZ19yYW5rX2l0ZW0uZGF0YSA9IGxhZGRlcl90ZW1wX2RhdGEuc2VsZl9idWlsZGluZ19yYW5rX2l0ZW1fZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRpbmdfcmFua190b3RhbF9wYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxhZGRlcl90ZW1wX2RhdGEubGFkZGVyX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aCAvIHRoaXMuX3BhZ2VfaXRlbV9jb3VudCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZGluZ19yYW5rX3BhZ2UgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nX3JhbmtfcGFnZV9sYmwuc3RyaW5nID0gYCR7dGhpcy5fYnVpbGRpbmdfcmFua19wYWdlfS8ke3RoaXMuX2J1aWxkaW5nX3JhbmtfdG90YWxfcGFnZX1gO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnRJZHggPSAodGhpcy5fYnVpbGRpbmdfcmFua19wYWdlIC0gMSkgKiB0aGlzLl9wYWdlX2l0ZW1fY291bnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWluKHN0YXJ0SWR4ICsgdGhpcy5fcGFnZV9pdGVtX2NvdW50LCBsYWRkZXJfdGVtcF9kYXRhLmxhZGRlcl9idWlsZGluZ19yYW5rX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXkuc2xpY2Uoc3RhcnRJZHgsIGVuZElkeCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxhZGRlcl9idWlsZGluZ19yYW5rX2xpc3Quc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9hY2hpZXZlbWVudF92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhO1xyXG4gICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRfc3Rhcl9sYmwuc3RyaW5nID0gYFPhu5Egc2FvIHTDrWNoIGzFqXnvvJoke2dtLmRhdGEubGFkZGVyX2RhdGEudG90YWxfc3Rhcn1gO1xyXG4gICAgICAgIHRoaXMubGFkZGVyX2FjaGlldmVtZW50X2xpc3Quc2V0RGF0YSh0ZW1wRGF0YS5sYWRkZXJfYWNoaWV2ZW1lbnRfZGF0YV9hcnJheSk7XHJcbiAgICB9XHJcbn0iXX0=