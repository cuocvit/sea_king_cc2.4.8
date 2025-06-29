
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderRankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '35bfcVO4TZMcYdKIvBV+act', 'LadderRankItem');
// ladder/scripts/LadderRankItem.ts

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
exports.LadderRankItem = void 0;
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderRankItem = /** @class */ (function (_super) {
    __extends(LadderRankItem, _super);
    function LadderRankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rank_spr = null;
        _this.lv_spr = null;
        _this.name_lbl = null;
        _this.rank_lbl = null;
        _this.star_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    Object.defineProperty(LadderRankItem.prototype, "data", {
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
    LadderRankItem.prototype.update_view = function () {
        if (this._data.rank <= 0) {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = "200+";
            this.rank_spr.node.active = false;
        }
        else if (0 < this._data.rank && this._data.rank < 4) {
            this.rank_lbl.node.active = false;
            this.rank_spr.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.rank_spr, Constants_1.BundleName.LADDER, "res/rank_" + this._data.rank);
        }
        else {
            this.rank_lbl.node.active = true;
            this.rank_lbl.string = this._data.rank + "";
            this.rank_spr.node.active = false;
        }
        this.star_lbl.string = this._data.star + "";
        this.name_lbl.string = this._data.name + ("0" == this._data.uid ? "." : "");
        if (0 < this._data.rank) {
            var number = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(this._data.rank);
            var rowData = GameManager_1.gm.config.get_row_data("LadderRewardConfigData", number + "");
            if (rowData) {
                Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.LADDER, "res/" + rowData.iconId);
                this.reward_list.setData(rowData.reward_array);
            }
        }
        else {
            this.reward_list.reset();
        }
    };
    LadderRankItem.prototype.reset = function () {
        this.rank_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.star_lbl.string = "";
        this.name_lbl.string = "";
        this.reward_list.reset();
    };
    __decorate([
        property(cc.Sprite)
    ], LadderRankItem.prototype, "rank_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderRankItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "rank_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderRankItem.prototype, "star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], LadderRankItem.prototype, "reward_list", void 0);
    LadderRankItem = __decorate([
        ccclass
    ], LadderRankItem);
    return LadderRankItem;
}(ListViewItem_1.ListViewItem));
exports.LadderRankItem = LadderRankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJSYW5rSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFDakUscUVBQTJEO0FBQzNELCtEQUE4RDtBQUl4RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQyxrQ0FBWTtJQUFoRDtRQUFBLHFFQW1FQztRQWpFVyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUdoQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFvQixJQUFJLENBQUM7O0lBa0RoRCxDQUFDO0lBaERHLHNCQUFXLGdDQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLEtBQXlCO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FMQTtJQU9NLG9DQUFXLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUVyQzthQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FB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QkFBQztDQW5FRCxBQW1FQyxDQW5FbUMsMkJBQVksR0FtRS9DO0FBbkVZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlld0l0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXcnO1xyXG5pbXBvcnQgeyBMYWRkZXJSZXdhcmRDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfcmV3YXJkJztcclxuaW1wb3J0IHsgTGFkZGVyUmFua0l0ZW1EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MYWRkZXJUZW1wRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIExhZGRlclJhbmtJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHJhbmtfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbmFtZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByYW5rX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHN0YXJfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgcmV3YXJkX2xpc3Q6IExpc3RWaWV3IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IExhZGRlclJhbmtJdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBMYWRkZXJSYW5rSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YS5yYW5rIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19sYmwuc3RyaW5nID0gXCIyMDArXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19zcHIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgwIDwgdGhpcy5fZGF0YS5yYW5rICYmIHRoaXMuX2RhdGEucmFuayA8IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5rX2xibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfc3ByLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnJhbmtfc3ByLCBCdW5kbGVOYW1lLkxBRERFUiwgXCJyZXMvcmFua19cIiArIHRoaXMuX2RhdGEucmFuayk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19sYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmtfbGJsLnN0cmluZyA9IHRoaXMuX2RhdGEucmFuayArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMucmFua19zcHIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3Rhcl9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5zdGFyICsgXCJcIjtcclxuICAgICAgICB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IHRoaXMuX2RhdGEubmFtZSArIChcIjBcIiA9PSB0aGlzLl9kYXRhLnVpZCA/IFwiLlwiIDogXCJcIik7XHJcblxyXG4gICAgICAgIGlmICgwIDwgdGhpcy5fZGF0YS5yYW5rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bWJlciA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5jb252ZXJ0X3JhbmtfdG9fbHYodGhpcy5fZGF0YS5yYW5rKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJMYWRkZXJSZXdhcmRDb25maWdEYXRhXCIsIG51bWJlciArIFwiXCIpIGFzIExhZGRlclJld2FyZENvbmZpZztcclxuICAgICAgICAgICAgaWYgKHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5sdl9zcHIsIEJ1bmRsZU5hbWUuTEFEREVSLCBcInJlcy9cIiArIHJvd0RhdGEuaWNvbklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2xpc3Quc2V0RGF0YShyb3dEYXRhLnJld2FyZF9hcnJheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZF9saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJhbmtfc3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmx2X3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFyX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubmFtZV9sYmwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnJld2FyZF9saXN0LnJlc2V0KCk7XHJcbiAgICB9XHJcbn0iXX0=