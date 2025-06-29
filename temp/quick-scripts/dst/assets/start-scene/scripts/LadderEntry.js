
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LadderEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f746dvMTN9Cx7LShmyMqGm0', 'LadderEntry');
// start-scene/scripts/LadderEntry.ts

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
exports.LadderEntry = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var ServerData_1 = require("./ServerData");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderEntry = /** @class */ (function (_super) {
    __extends(LadderEntry, _super);
    function LadderEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lv_spr = null;
        _this.star_lbl = null;
        _this.rank_lbl = null;
        _this.entry_btn = null;
        return _this;
    }
    LadderEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on("ladder_star_change", this.update_view, this);
        GameManager_1.gm.data.event_emitter.on("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        GameManager_1.gm.data.event_emitter.on("ladder_upgrade", this.on_ladder_upgrade, this);
        GameManager_1.gm.data.event_emitter.on("ladder_demotion", this.on_ladder_demotion, this);
        GameManager_1.gm.data.event_emitter.on(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    LadderEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off("ladder_star_change", this.update_view, this);
        GameManager_1.gm.data.event_emitter.off("ladder_achievement_upgrade", this.play_ladder_achievement_upgrade, this);
        GameManager_1.gm.data.event_emitter.off("ladder_upgrade", this.on_ladder_upgrade, this);
        GameManager_1.gm.data.event_emitter.off("ladder_demotion", this.on_ladder_demotion, this);
        GameManager_1.gm.data.event_emitter.off(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    LadderEntry.prototype.on_ladder_upgrade = function () {
        cc.log("on_ladder_upgrade");
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.LADDERUPLVLANIMPVP.key, true);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIMPVP);
    };
    LadderEntry.prototype.on_ladder_demotion = function () {
        cc.log("on_ladder_demotion");
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.LADDERUPLVLANIMPVP.key, false);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIMPVP);
    };
    LadderEntry.prototype.play_ladder_achievement_upgrade = function () {
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.LADDERUPLVLANIM);
    };
    LadderEntry.prototype.update_view = function () {
        var ladderTempData = GameManager_1.gm.data.ladder_temp_data;
        var rankLevel = ladderTempData.convert_rank_to_lv(ladderTempData.rank);
        var rowData = GameManager_1.gm.config.get_row_data("LadderRewardConfigData", rankLevel.toString());
        if (rowData) {
            Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.LADDER, "res/" + rowData.iconId);
        }
        this.star_lbl.string = ladderTempData.total_star.toString();
        this.rank_lbl.string = ladderTempData.rank > 0 ? "Xếp hạng:" + ladderTempData.rank : "Xếp hạng:200+";
    };
    LadderEntry.prototype.reset = function () {
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.rank_lbl.string = "";
    };
    LadderEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.entry_btn.node) {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
            if (!buildData || buildData.buildLvl < 1) {
                GameManager_1.gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
            }
            else {
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Ladder);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], LadderEntry.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderEntry.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderEntry.prototype, "rank_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], LadderEntry.prototype, "entry_btn", void 0);
    LadderEntry = __decorate([
        ccclass
    ], LadderEntry);
    return LadderEntry;
}(NodePoolItem_1.NodePoolItem));
exports.LadderEntry = LadderEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExhZGRlckVudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sK0NBQThDO0FBQzlDLDJDQUEwQztBQUMxQyw2Q0FBbUM7QUFDbkMsaUNBQWdDO0FBQ2hDLHlDQUF3RDtBQUdsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQiwrQkFBWTtJQUF0QztRQUFBLHFFQTJFQztRQXpFVyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUdoQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxlQUFTLEdBQXFCLElBQUksQ0FBQzs7SUFnRS9DLENBQUM7SUE5RGEsOEJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyx1QkFBVSxDQUFDLGlCQUFpQixFQUFF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RyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8sb0RBQThCLEdBQXRDLFVBQXVDLEtBQWU7UUFDbEQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3JDLElBQU0sU0FBUyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3ZGLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLGdCQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO2FBQ2pGO2lCQUFNO2dCQUNILGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztJQXhFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNvQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUN1QjtJQVh6QyxXQUFXO1FBRGhCLE9BQU87T0FDRixXQUFXLENBMkVoQjtJQUFELGtCQUFDO0NBM0VELEFBMkVDLENBM0V5QiwyQkFBWSxHQTJFckM7QUFFUSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFNlcnZlckRhdGEgfSBmcm9tICcuL1NlcnZlckRhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBCdWlsZFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBMYWRkZXJSZXdhcmRDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfcmV3YXJkJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBMYWRkZXJFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByYW5rX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBlbnRyeV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oXCJsYWRkZXJfc3Rhcl9jaGFuZ2VcIiwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFwibGFkZGVyX2FjaGlldmVtZW50X3VwZ3JhZGVcIiwgdGhpcy5wbGF5X2xhZGRlcl9hY2hpZXZlbWVudF91cGdyYWRlLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oXCJsYWRkZXJfdXBncmFkZVwiLCB0aGlzLm9uX2xhZGRlcl91cGdyYWRlLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oXCJsYWRkZXJfZGVtb3Rpb25cIiwgdGhpcy5vbl9sYWRkZXJfZGVtb3Rpb24sIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihTZXJ2ZXJEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFwibGFkZGVyX3N0YXJfY2hhbmdlXCIsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXCJsYWRkZXJfYWNoaWV2ZW1lbnRfdXBncmFkZVwiLCB0aGlzLnBsYXlfbGFkZGVyX2FjaGlldmVtZW50X3VwZ3JhZGUsIHRoaXMpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXCJsYWRkZXJfdXBncmFkZVwiLCB0aGlzLm9uX2xhZGRlcl91cGdyYWRlLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFwibGFkZGVyX2RlbW90aW9uXCIsIHRoaXMub25fbGFkZGVyX2RlbW90aW9uLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNlcnZlckRhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fbGFkZGVyX3VwZ3JhZGUoKTogdm9pZCB7XHJcbiAgICAgICAgY2MubG9nKFwib25fbGFkZGVyX3VwZ3JhZGVcIik7XHJcbiAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkxBRERFUlVQTFZMQU5JTVBWUC5rZXksIHRydWUpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkxBRERFUlVQTFZMQU5JTVBWUCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9sYWRkZXJfZGVtb3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgY2MubG9nKFwib25fbGFkZGVyX2RlbW90aW9uXCIpO1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5MQURERVJVUExWTEFOSU1QVlAua2V5LCBmYWxzZSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTEFEREVSVVBMVkxBTklNUFZQKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlfbGFkZGVyX2FjaGlldmVtZW50X3VwZ3JhZGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuTEFEREVSVVBMVkxBTklNKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxhZGRlclRlbXBEYXRhID0gZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IHJhbmtMZXZlbCA9IGxhZGRlclRlbXBEYXRhLmNvbnZlcnRfcmFua190b19sdihsYWRkZXJUZW1wRGF0YS5yYW5rKTtcclxuICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkxhZGRlclJld2FyZENvbmZpZ0RhdGFcIiwgcmFua0xldmVsLnRvU3RyaW5nKCkpIGFzIExhZGRlclJld2FyZENvbmZpZztcclxuXHJcbiAgICAgICAgaWYgKHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmx2X3NwciwgQnVuZGxlTmFtZS5MQURERVIsIFwicmVzL1wiICsgcm93RGF0YS5pY29uSWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdGFyX2xibC5zdHJpbmcgPSBsYWRkZXJUZW1wRGF0YS50b3RhbF9zdGFyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5yYW5rX2xibC5zdHJpbmcgPSBsYWRkZXJUZW1wRGF0YS5yYW5rID4gMCA/IFwiWOG6v3AgaOG6oW5nOlwiICsgbGFkZGVyVGVtcERhdGEucmFuayA6IFwiWOG6v3AgaOG6oW5nOjIwMCtcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubHZfc3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5yYW5rX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5lbnRyeV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRSlcclxuICAgICAgICAgICAgaWYgKCFidWlsZERhdGEgfHwgYnVpbGREYXRhLmJ1aWxkTHZsIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCLEkGnhu4F1IGtp4buHbiBt4bufIExpw6puIE1pbmggSOG6o2kgVsawxqFuZzogUXXDom4gxJHhu5NuIHRyw7ogxJHhuqF0IGPhuqVwIDFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkxhZGRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IExhZGRlckVudHJ5IH07Il19