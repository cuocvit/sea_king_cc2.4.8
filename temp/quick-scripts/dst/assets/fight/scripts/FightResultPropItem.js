
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightResultPropItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e80f4/ZUqlNGIwtvecmxcQI', 'FightResultPropItem');
// fight/scripts/FightResultPropItem.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightResultPropItem = /** @class */ (function (_super) {
    __extends(FightResultPropItem, _super);
    function FightResultPropItem() {
        var _this = _super.call(this) || this;
        _this.color_spr = null;
        _this.prop_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(FightResultPropItem.prototype, "data", {
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
    FightResultPropItem.prototype.update_view = function () {
        if (!this._data)
            return;
        Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + this._data.color);
        if (this._data.type == 1) {
            Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
            this.num_lbl.string = this._data.num.toString();
            this.num_lbl.node.active = true;
        }
        else {
            Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
            this.num_lbl.node.active = false;
            Utils_1.Utils.set_sprite_state(this.color_spr.node, cc.Sprite.State.GRAY);
            Utils_1.Utils.set_sprite_state(this.prop_spr.node, cc.Sprite.State.GRAY);
        }
        this.num_lbl.node.active = this._data.type == 1;
    };
    FightResultPropItem.prototype.reset = function () {
        this.prop_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightResultPropItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightResultPropItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightResultPropItem.prototype, "num_lbl", void 0);
    FightResultPropItem = __decorate([
        ccclass
    ], FightResultPropItem);
    return FightResultPropItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0UmVzdWx0UHJvcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFHM0QsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0MsdUNBQVk7SUFVNUM7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFWTyxlQUFTLEdBQXFCLElBQUksQ0FBQztRQUduQyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxhQUFPLEdBQW9CLElBQUksQ0FBQzs7SUFJeEMsQ0FBQztJQUVELHNCQUFXLHFDQUFJO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQWdCLEtBQXFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FMQTtJQU9NLHlDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUN4QixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN4QixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO2FBQU07WUFDTCxhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRSxhQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxtQ0FBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBeENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ3FCO0lBUnBDLG1CQUFtQjtRQUR4QixPQUFPO09BQ0YsbUJBQW1CLENBMkN4QjtJQUFELDBCQUFDO0NBM0NELEFBMkNDLENBM0NpQywyQkFBWSxHQTJDN0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0Vmlld0l0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3SXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodFRlbXBEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBGaWdodFJlc3VsdFByb3BJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gIHByaXZhdGUgY29sb3Jfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICBwcml2YXRlIHByb3Bfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIHByaXZhdGUgbnVtX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhKCk6IEZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogRmlnaHRSZXN1bHRQcm9wSXRlbURhdGEgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGEpIHJldHVybjtcclxuICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jb2xvcl9zcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jb2xvcl9cIiArIHRoaXMuX2RhdGEuY29sb3IpO1xyXG4gICAgaWYgKHRoaXMuX2RhdGEudHlwZSA9PSAxKSB7XHJcbiAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5wcm9wX3NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgdGhpcy5fZGF0YS5pZCk7XHJcbiAgICAgIHRoaXMubnVtX2xibC5zdHJpbmcgPSB0aGlzLl9kYXRhLm51bS50b1N0cmluZygpO1xyXG4gICAgICB0aGlzLm51bV9sYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnByb3Bfc3ByLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyB0aGlzLl9kYXRhLmlkKTtcclxuICAgICAgdGhpcy5udW1fbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5jb2xvcl9zcHIubm9kZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMucHJvcF9zcHIubm9kZSwgY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5udW1fbGJsLm5vZGUuYWN0aXZlID0gdGhpcy5fZGF0YS50eXBlID09IDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3Bfc3ByLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIHRoaXMubnVtX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gIH1cclxufVxyXG4iXX0=