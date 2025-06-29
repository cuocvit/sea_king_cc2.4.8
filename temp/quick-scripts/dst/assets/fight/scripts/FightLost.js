
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightLost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e178dj/OCFMVKY2U4AWdqSN', 'FightLost');
// fight/scripts/FightLost.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightLost = /** @class */ (function (_super) {
    __extends(FightLost, _super);
    function FightLost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_lbl = null;
        _this.gold_lbl = null;
        _this.lost_sv = null;
        _this.prop_list = null;
        _this.death_hero_list = null;
        _this.ok_btn = null;
        return _this;
    }
    FightLost.prototype.onEnable = function () {
        this.update_view();
    };
    FightLost.prototype.onDisable = function () {
        this.prop_list.reset();
        this.death_hero_list.reset();
        this.lost_sv.scrollToTop();
    };
    FightLost.prototype.update_view = function () {
        var fightResultData = GameManager_1.gm.data.fight_temp_data.fight_result_data;
        this.name_lbl.string = fightResultData.attacker_name;
        this.gold_lbl.string = "-" + fightResultData.gold_num;
        this.prop_list.setData(fightResultData.prop_data_array);
        this.death_hero_list.setData(fightResultData.death_hero_data_array);
    };
    FightLost.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightLost);
        }
    };
    __decorate([
        property(cc.Label)
    ], FightLost.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], FightLost.prototype, "gold_lbl", void 0);
    __decorate([
        property(cc.ScrollView)
    ], FightLost.prototype, "lost_sv", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightLost.prototype, "prop_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightLost.prototype, "death_hero_list", void 0);
    __decorate([
        property(cc.Button)
    ], FightLost.prototype, "ok_btn", void 0);
    FightLost = __decorate([
        ccclass
    ], FightLost);
    return FightLost;
}(GameModule_1.GameModule));
exports.default = FightLost;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0TG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBQ2xFLCtEQUE4RDtBQUV4RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qiw2QkFBVTtJQUFsQztRQUFBLHFFQTBDQztRQXhDUyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFrQixJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxZQUFNLEdBQWMsSUFBSSxDQUFDOztJQXlCbkMsQ0FBQztJQXZCVyw0QkFBUSxHQUFsQjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsNkJBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sK0JBQVcsR0FBbkI7UUFDRSxJQUFNLGVBQWUsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVTLGtEQUE4QixHQUF4QyxVQUF5QyxLQUFlO1FBQ3RELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUF2Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDZTtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7OENBQ2M7SUFHdEM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQztnREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQztzREFDc0I7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDYTtJQWpCN0IsU0FBUztRQURkLE9BQU87T0FDRixTQUFTLENBMENkO0lBQUQsZ0JBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3VCLHVCQUFVLEdBMENqQztBQUVELGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXcnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0TG9zdCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICBwcml2YXRlIG5hbWVfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICBwcml2YXRlIGdvbGRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxyXG4gIHByaXZhdGUgbG9zdF9zdjogY2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICBwcml2YXRlIHByb3BfbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgcHJpdmF0ZSBkZWF0aF9oZXJvX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIG9rX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcF9saXN0LnJlc2V0KCk7XHJcbiAgICB0aGlzLmRlYXRoX2hlcm9fbGlzdC5yZXNldCgpO1xyXG4gICAgdGhpcy5sb3N0X3N2LnNjcm9sbFRvVG9wKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmlnaHRSZXN1bHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZmlnaHRfcmVzdWx0X2RhdGE7XHJcbiAgICB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IGZpZ2h0UmVzdWx0RGF0YS5hdHRhY2tlcl9uYW1lO1xyXG4gICAgdGhpcy5nb2xkX2xibC5zdHJpbmcgPSBcIi1cIiArIGZpZ2h0UmVzdWx0RGF0YS5nb2xkX251bTtcclxuICAgIHRoaXMucHJvcF9saXN0LnNldERhdGEoZmlnaHRSZXN1bHREYXRhLnByb3BfZGF0YV9hcnJheSk7XHJcbiAgICB0aGlzLmRlYXRoX2hlcm9fbGlzdC5zZXREYXRhKGZpZ2h0UmVzdWx0RGF0YS5kZWF0aF9oZXJvX2RhdGFfYXJyYXkpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5va19idG4ubm9kZSkge1xyXG4gICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5GaWdodExvc3QpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlnaHRMb3N0OyJdfQ==