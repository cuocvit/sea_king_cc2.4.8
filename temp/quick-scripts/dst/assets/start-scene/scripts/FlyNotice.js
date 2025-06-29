
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FlyNotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c320627xHNDUJsQj98F6gFS', 'FlyNotice');
// start-scene/scripts/FlyNotice.ts

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
exports.FlyNotice = void 0;
// +-+
var GameModule_1 = require("./GameModule");
var GameManager_1 = require("./GameManager");
var FlyNoticeItem_1 = require("./FlyNoticeItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FlyNotice = /** @class */ (function (_super) {
    __extends(FlyNotice, _super);
    function FlyNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fly_notice_item_prefab = null;
        return _this;
    }
    FlyNotice.prototype.onLoad = function () {
        GameManager_1.gm.pool.init(GameManager_1.gm.const.FlyNoticeItem.bundle_name, GameManager_1.gm.const.FlyNoticeItem.load_url, FlyNoticeItem_1.FlyNoticeItem);
    };
    FlyNotice.prototype.show_fly_notice = function (message, duration, position) {
        var _this = this;
        GameManager_1.gm.pool.async_get(GameManager_1.gm.const.FlyNoticeItem.bundle_name, GameManager_1.gm.const.FlyNoticeItem.load_url, FlyNoticeItem_1.FlyNoticeItem, function (item) {
            if (!item)
                return;
            _this.node.addChild(item.node);
            item.node.position = _this.node.convertToNodeSpaceAR(position);
            var flyNoticeItem = item;
            flyNoticeItem.set_data(message, duration);
        });
    };
    __decorate([
        property(cc.Prefab)
    ], FlyNotice.prototype, "fly_notice_item_prefab", void 0);
    FlyNotice = __decorate([
        ccclass
    ], FlyNotice);
    return FlyNotice;
}(GameModule_1.GameModule));
exports.FlyNotice = FlyNotice;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZseU5vdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDJDQUEwQztBQUMxQyw2Q0FBbUM7QUFDbkMsaURBQWdEO0FBRTFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQStCLDZCQUFVO0lBQXpDO1FBQUEscUVBaUJDO1FBZlcsNEJBQXNCLEdBQXFCLElBQUksQ0FBQzs7SUFlNUQsQ0FBQztJQWJhLDBCQUFNLEdBQWhCO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSw2QkFBYSxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVPLG1DQUFlLEdBQXZCLFVBQXdCLE9BQWUsRUFBRSxRQUFnQixFQUFFLFFBQWlCO1FBQTVFLGlCQVFDO1FBUEcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSw2QkFBYSxFQUFFLFVBQUMsSUFBSTtZQUN2RyxJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBQ2xCLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELElBQU0sYUFBYSxHQUFHLElBQXFCLENBQUM7WUFDNUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBZEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDb0M7SUFGL0MsU0FBUztRQURyQixPQUFPO09BQ0ssU0FBUyxDQWlCckI7SUFBRCxnQkFBQztDQWpCRCxBQWlCQyxDQWpCOEIsdUJBQVUsR0FpQnhDO0FBakJZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBGbHlOb3RpY2VJdGVtIH0gZnJvbSAnLi9GbHlOb3RpY2VJdGVtJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgRmx5Tm90aWNlIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBmbHlfbm90aWNlX2l0ZW1fcHJlZmFiOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wuaW5pdChnbS5jb25zdC5GbHlOb3RpY2VJdGVtLmJ1bmRsZV9uYW1lLCBnbS5jb25zdC5GbHlOb3RpY2VJdGVtLmxvYWRfdXJsLCBGbHlOb3RpY2VJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfZmx5X25vdGljZShtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uOiBudW1iZXIsIHBvc2l0aW9uOiBjYy5WZWMzKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoZ20uY29uc3QuRmx5Tm90aWNlSXRlbS5idW5kbGVfbmFtZSwgZ20uY29uc3QuRmx5Tm90aWNlSXRlbS5sb2FkX3VybCwgRmx5Tm90aWNlSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUucG9zaXRpb24gPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjb25zdCBmbHlOb3RpY2VJdGVtID0gaXRlbSBhcyBGbHlOb3RpY2VJdGVtO1xyXG4gICAgICAgICAgICBmbHlOb3RpY2VJdGVtLnNldF9kYXRhKG1lc3NhZ2UsIGR1cmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==