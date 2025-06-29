
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Notice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7828C03EZKPrvD2K55cmmL', 'Notice');
// start-scene/scripts/Notice.ts

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
exports.Notice = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var NoticeItem_1 = require("./NoticeItem");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.notice_item_prefab = null;
        _this.window_node = null;
        return _this;
    }
    Notice.prototype.onLoad = function () {
        GameManager_1.gm.pool.init(GameManager_1.gm.const.NoticeItem.bundle_name, GameManager_1.gm.const.NoticeItem.load_url, NoticeItem_1.NoticeItem);
    };
    Notice.prototype.show_notice = function (data) {
        var _this = this;
        GameManager_1.gm.pool.async_get(GameManager_1.gm.const.NoticeItem.bundle_name, GameManager_1.gm.const.NoticeItem.load_url, NoticeItem_1.NoticeItem, function (item) {
            if (!item)
                return;
            _this.window_node.addChild(item.node);
            var notItem = item;
            notItem.data = data;
        });
    };
    __decorate([
        property(cc.Prefab)
    ], Notice.prototype, "notice_item_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], Notice.prototype, "window_node", void 0);
    Notice = __decorate([
        ccclass
    ], Notice);
    return Notice;
}(GameModule_1.GameModule));
exports.Notice = Notice;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5vdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQywyQ0FBMEM7QUFDMUMsMkNBQTBDO0FBRXBDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRCLDBCQUFVO0lBQXRDO1FBQUEscUVBbUJDO1FBakJTLHdCQUFrQixHQUFxQixJQUFJLENBQUM7UUFHNUMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDOztJQWM3QyxDQUFDO0lBWlcsdUJBQU0sR0FBaEI7UUFDRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxnQkFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLHVCQUFVLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRU8sNEJBQVcsR0FBbkIsVUFBb0IsSUFBWTtRQUFoQyxpQkFPQztRQU5DLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGdCQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsdUJBQVUsRUFBRSxVQUFDLElBQUk7WUFDaEcsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUNsQixLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBTSxPQUFPLEdBQUcsSUFBa0IsQ0FBQztZQUNuQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFoQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDZ0M7SUFHcEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDeUI7SUFMaEMsTUFBTTtRQURsQixPQUFPO09BQ0ssTUFBTSxDQW1CbEI7SUFBRCxhQUFDO0NBbkJELEFBbUJDLENBbkIyQix1QkFBVSxHQW1CckM7QUFuQlksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm90aWNlSXRlbSB9IGZyb20gJy4vTm90aWNlSXRlbSc7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBOb3RpY2UgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gIHByaXZhdGUgbm90aWNlX2l0ZW1fcHJlZmFiOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgcHJpdmF0ZSB3aW5kb3dfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgZ20ucG9vbC5pbml0KGdtLmNvbnN0Lk5vdGljZUl0ZW0uYnVuZGxlX25hbWUsIGdtLmNvbnN0Lk5vdGljZUl0ZW0ubG9hZF91cmwsIE5vdGljZUl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93X25vdGljZShkYXRhOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGdtLnBvb2wuYXN5bmNfZ2V0KGdtLmNvbnN0Lk5vdGljZUl0ZW0uYnVuZGxlX25hbWUsIGdtLmNvbnN0Lk5vdGljZUl0ZW0ubG9hZF91cmwsIE5vdGljZUl0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xyXG4gICAgICB0aGlzLndpbmRvd19ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgICAgIGNvbnN0IG5vdEl0ZW0gPSBpdGVtIGFzIE5vdGljZUl0ZW07XHJcbiAgICAgIG5vdEl0ZW0uZGF0YSA9IGRhdGE7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=