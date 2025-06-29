
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ItemRender.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '640d8e8JUpJfLo75rWwfWxW', 'ItemRender');
// start-scene/scripts/ItemRender.ts

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
exports.ItemRenderVO = exports.ItemRender = void 0;
// +-+
var ListViewItem_1 = require("./ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemRender = /** @class */ (function (_super) {
    __extends(ItemRender, _super);
    function ItemRender() {
        var _this = _super.call(this) || this;
        _this.select_node = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(ItemRender.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (value) {
                this.num_lbl.string = value.id.toString();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemRender.prototype, "select", {
        set: function (value) {
            this._select = value;
            if (this.select_node) {
                this.select_node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    ItemRender.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._data = null;
    };
    __decorate([
        property(cc.Node)
    ], ItemRender.prototype, "select_node", void 0);
    __decorate([
        property(cc.Label)
    ], ItemRender.prototype, "num_lbl", void 0);
    ItemRender = __decorate([
        ccclass
    ], ItemRender);
    return ItemRender;
}(ListViewItem_1.ListViewItem));
exports.ItemRender = ItemRender;
var ItemRenderVO = /** @class */ (function () {
    function ItemRenderVO() {
        this.id = 0;
    }
    return ItemRenderVO;
}());
exports.ItemRenderVO = ItemRenderVO;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEl0ZW1SZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0MsOEJBQVk7SUFPMUM7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFQTyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsYUFBTyxHQUFvQixJQUFJLENBQUM7O0lBSXhDLENBQUM7SUFFRCxzQkFBVyw0QkFBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7YUFFRCxVQUFnQixLQUFtQjtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzNDO1FBQ0gsQ0FBQzs7O09BUEE7SUFTRCxzQkFBVyw4QkFBTTthQUFqQixVQUFrQixLQUFjO1lBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFTSwwQkFBSyxHQUFaO1FBQ0UsaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBOUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3lCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ3FCO0lBTDdCLFVBQVU7UUFEdEIsT0FBTztPQUNLLFVBQVUsQ0FpQ3RCO0lBQUQsaUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQytCLDJCQUFZLEdBaUMzQztBQWpDWSxnQ0FBVTtBQW1DdkI7SUFBQTtRQUNTLE9BQUUsR0FBVyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUE7QUFGWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBMaXN0Vmlld0l0ZW0gfSBmcm9tIFwiLi9MaXN0Vmlld0l0ZW1cIjtcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBJdGVtUmVuZGVyIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBwcml2YXRlIHNlbGVjdF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICBwcml2YXRlIG51bV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBJdGVtUmVuZGVyVk8ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEl0ZW1SZW5kZXJWTykge1xyXG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMubnVtX2xibC5zdHJpbmcgPSB2YWx1ZS5pZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3NlbGVjdCA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0X25vZGUpIHtcclxuICAgICAgdGhpcy5zZWxlY3Rfbm9kZS5hY3RpdmUgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB0aGlzLl9kYXRhID0gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtUmVuZGVyVk8ge1xyXG4gIHB1YmxpYyBpZDogbnVtYmVyID0gMDtcclxufSJdfQ==