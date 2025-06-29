
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderBuildingRankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca2fbreC8lFN57jpscz0eJg', 'LadderBuildingRankItem');
// ladder/scripts/LadderBuildingRankItem.ts

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
exports.LadderBuildingRankItem = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderBuildingRankItem = /** @class */ (function (_super) {
    __extends(LadderBuildingRankItem, _super);
    function LadderBuildingRankItem() {
        var _this = _super.call(this) || this;
        _this.rank_spr = null;
        _this.lv_spr = null;
        _this.name_lbl = null;
        _this.rank_lbl = null;
        _this.building_lv_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    Object.defineProperty(LadderBuildingRankItem.prototype, "data", {
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
    LadderBuildingRankItem.prototype.update_view = function () {
        if (this._data.rank <= 0) {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = "200+";
            this.rank_spr.node.active = false;
        }
        else if (this._data.rank > 0 && this._data.rank < 4) {
            this.rank_lbl.node.active = false;
            this.rank_spr.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.rank_spr, Constants_1.BundleName.LADDER, "res/rank_" + this._data.rank);
        }
        else {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank.toString();
            this.rank_spr.node.active = false;
        }
        this.building_lv_lbl.string = this._data.castle_level.toString();
        this.name_lbl.string = this._data.name + (this._data.uid === "0" ? "." : "");
        if (this._data.rank > 0) {
            var number = GameManager_1.gm.data.ladder_temp_data.convert_building_rank_to_lv(this._data.rank);
            var rowData = GameManager_1.gm.config.get_row_data("LadderBuildingConfigData", number.toString());
            if (rowData) {
                Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.LADDER, "res/" + rowData.iconId);
                this.reward_list.setData(rowData.reward_array);
            }
        }
        else {
            this.reward_list.reset();
        }
    };
    LadderBuildingRankItem.prototype.reset = function () {
        this.rank_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.building_lv_lbl.string = "";
        this.name_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], LadderBuildingRankItem.prototype, "rank_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderBuildingRankItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderBuildingRankItem.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderBuildingRankItem.prototype, "rank_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderBuildingRankItem.prototype, "building_lv_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], LadderBuildingRankItem.prototype, "reward_list", void 0);
    LadderBuildingRankItem = __decorate([
        ccclass
    ], LadderBuildingRankItem);
    return LadderBuildingRankItem;
}(ListViewItem_1.ListViewItem));
exports.LadderBuildingRankItem = LadderBuildingRankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJCdWlsZGluZ1JhbmtJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUseURBQXdEO0FBQ3hELGlFQUFpRTtBQUNqRSxxRUFBMkQ7QUFDM0QsK0RBQThEO0FBR3hELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBVTVDO0lBQTRDLDBDQUFZO0lBbUJwRDtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQW5CTyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUdoQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFHeEMsaUJBQVcsR0FBb0IsSUFBSSxDQUFDOztJQUk1QyxDQUFDO0lBRUQsc0JBQVcsd0NBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBaUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUxBO0lBT00sNENBQVcsR0FBbEI7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxJ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Q0FuRUQsQUFtRUMsQ0FuRTJDLDJCQUFZLEdBbUV2RDtBQW5FWSx3REFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0Vmlld0l0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3SXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IExhZGRlckJ1aWxkZGluZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9idWlsZGluZyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuaW50ZXJmYWNlIExhZGRlckJ1aWxkaW5nUmFua0l0ZW1EYXRhIHtcclxuICAgIHJhbms6IG51bWJlcjtcclxuICAgIGNhc3RsZV9sZXZlbDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdWlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBMYWRkZXJCdWlsZGluZ1JhbmtJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHJhbmtfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbmFtZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByYW5rX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGJ1aWxkaW5nX2x2X2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIHJld2FyZF9saXN0OiBMaXN0VmlldyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IExhZGRlckJ1aWxkaW5nUmFua0l0ZW1EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IExhZGRlckJ1aWxkaW5nUmFua0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEucmFuayA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19sYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfbGJsLnN0cmluZyA9IFwiMjAwK1wiO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfc3ByLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhLnJhbmsgPiAwICYmIHRoaXMuX2RhdGEucmFuayA8IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfc3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnJhbmtfc3ByLCBCdW5kbGVOYW1lLkxBRERFUiwgXCJyZXMvcmFua19cIiArIHRoaXMuX2RhdGEucmFuayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5yYW5rLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19zcHIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idWlsZGluZ19sdl9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5jYXN0bGVfbGV2ZWwudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IHRoaXMuX2RhdGEubmFtZSArICh0aGlzLl9kYXRhLnVpZCA9PT0gXCIwXCIgPyBcIi5cIiA6IFwiXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGF0YS5yYW5rID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBudW1iZXIgPSBnbS5kYXRhLmxhZGRlcl90ZW1wX2RhdGEuY29udmVydF9idWlsZGluZ19yYW5rX3RvX2x2KHRoaXMuX2RhdGEucmFuayk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiTGFkZGVyQnVpbGRpbmdDb25maWdEYXRhXCIsIG51bWJlci50b1N0cmluZygpKSBhcyBMYWRkZXJCdWlsZGRpbmc7XHJcbiAgICAgICAgICAgIGlmIChyb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubHZfc3ByLCBCdW5kbGVOYW1lLkxBRERFUiwgXCJyZXMvXCIgKyByb3dEYXRhLmljb25JZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9saXN0LnNldERhdGEocm93RGF0YS5yZXdhcmRfYXJyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGlzdC5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yYW5rX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sdl9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYnVpbGRpbmdfbHZfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5uYW1lX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG59Il19