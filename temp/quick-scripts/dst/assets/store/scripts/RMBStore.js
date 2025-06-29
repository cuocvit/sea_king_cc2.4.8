
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/store/scripts/RMBStore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50953esjIVPcJrQvE3cnVmt', 'RMBStore');
// store/scripts/RMBStore.ts

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
var RMBStoreItem_1 = require("./RMBStoreItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreComponent = /** @class */ (function (_super) {
    __extends(StoreComponent, _super);
    function StoreComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barrelDiamList = null;
        _this.diamList = null;
        _this.barrelList = null;
        return _this;
    }
    StoreComponent.prototype.onEnable = function () {
        var _this = this;
        var storeList = GameManager_1.gm.data.config_data.getStoreList();
        var addStoreItem = function (index) {
            var _loop_1 = function (itemIndex) {
                var item = storeList[index][itemIndex];
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.STORE, "prefabs/store_item", RMBStoreItem_1.default, function (storeItem) {
                    var _a, _b, _c;
                    storeItem.data = item;
                    if (item.shop_type == 1) {
                        (_a = _this.barrelDiamList) === null || _a === void 0 ? void 0 : _a.addChild(storeItem.node);
                    }
                    else if (item.shop_type == 3) {
                        (_b = _this.barrelList) === null || _b === void 0 ? void 0 : _b.addChild(storeItem.node);
                    }
                    else if (item.shop_type == 2) {
                        (_c = _this.diamList) === null || _c === void 0 ? void 0 : _c.addChild(storeItem.node);
                    }
                });
            };
            for (var itemIndex = 0; itemIndex < storeList[index].length; itemIndex++) {
                _loop_1(itemIndex);
            }
        };
        GameManager_1.gm.pool.put_children(this.barrelDiamList);
        GameManager_1.gm.pool.put_children(this.diamList);
        GameManager_1.gm.pool.put_children(this.barrelList);
        for (var index in GameManager_1.gm.data.config_data.getStoreList()) {
            addStoreItem(Number(index));
        }
    };
    StoreComponent.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RMBSTORE);
    };
    StoreComponent.prototype.onDisable = function () {
        GameManager_1.gm.pool.put_children(this.barrelDiamList);
        GameManager_1.gm.pool.put_children(this.diamList);
        GameManager_1.gm.pool.put_children(this.barrelList);
    };
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "barrelDiamList", void 0);
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "diamList", void 0);
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "barrelList", void 0);
    StoreComponent = __decorate([
        ccclass
    ], StoreComponent);
    return StoreComponent;
}(cc.Component));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RvcmVcXHNjcmlwdHNcXFJNQlN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQyxxRUFBMkQ7QUFDM0QsaUVBQWlFO0FBRTNELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZCLGtDQUFZO0lBQXpDO1FBQUEscUVBK0NDO1FBN0NXLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUd0QyxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxnQkFBVSxHQUFtQixJQUFJLENBQUM7O0lBdUM5QyxDQUFDO0lBckNhLGlDQUFRLEdBQWxCO1FBQUEsaUJBMEJDO1FBekJHLElBQU0sU0FBUyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVyRCxJQUFNLFlBQVksR0FBRyxVQUFDLEtBQWE7b0NBQ3RCLFNBQVM7Z0JBQ2QsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsc0JBQVksRUFBRSxVQUFDLFNBQVM7O29CQUM5RSxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTt3QkFDckIsTUFBQSxLQUFJLENBQUMsY0FBYywwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtxQkFDakQ7eUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTt3QkFDNUIsTUFBQSxLQUFJLENBQUMsVUFBVSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtxQkFDN0M7eUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTt3QkFDNUIsTUFBQSxLQUFJLENBQUMsUUFBUSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtxQkFDM0M7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7O1lBWFAsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFO3dCQUEvRCxTQUFTO2FBWWpCO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEMsS0FBSyxJQUFNLEtBQUssSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDcEQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVPLHFDQUFZLEdBQXBCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVTLGtDQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQTVDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUM0QjtJQUc5QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNzQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUN3QjtJQVJ4QyxjQUFjO1FBRG5CLE9BQU87T0FDRixjQUFjLENBK0NuQjtJQUFELHFCQUFDO0NBL0NELEFBK0NDLENBL0M0QixFQUFFLENBQUMsU0FBUyxHQStDeEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUk1CU3RvcmVJdGVtIGZyb20gJy4vUk1CU3RvcmVJdGVtJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTdG9yZUNvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFycmVsRGlhbUxpc3Q6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZGlhbUxpc3Q6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFycmVsTGlzdDogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdG9yZUxpc3QgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFN0b3JlTGlzdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBhZGRTdG9yZUl0ZW0gPSAoaW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtSW5kZXggPSAwOyBpdGVtSW5kZXggPCBzdG9yZUxpc3RbaW5kZXhdLmxlbmd0aDsgaXRlbUluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzdG9yZUxpc3RbaW5kZXhdW2l0ZW1JbmRleF07XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLlNUT1JFLCBcInByZWZhYnMvc3RvcmVfaXRlbVwiLCBSTUJTdG9yZUl0ZW0sIChzdG9yZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUl0ZW0uZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc2hvcF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXJyZWxEaWFtTGlzdD8uYWRkQ2hpbGQoc3RvcmVJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5zaG9wX3R5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcnJlbExpc3Q/LmFkZENoaWxkKHN0b3JlSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uc2hvcF90eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFtTGlzdD8uYWRkQ2hpbGQoc3RvcmVJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5iYXJyZWxEaWFtTGlzdCk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5kaWFtTGlzdCk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5iYXJyZWxMaXN0KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBpbiBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFN0b3JlTGlzdCgpKSB7XHJcbiAgICAgICAgICAgIGFkZFN0b3JlSXRlbShOdW1iZXIoaW5kZXgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuUk1CU1RPUkUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5iYXJyZWxEaWFtTGlzdCk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5kaWFtTGlzdCk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5iYXJyZWxMaXN0KTtcclxuICAgIH1cclxufSJdfQ==