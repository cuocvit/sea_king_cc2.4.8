
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ListViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7422R/mlFMA6pUjkF+AzoF', 'ListViewItem');
// start-scene/scripts/ListViewItem.ts

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
exports.ListViewItem = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ListViewItem = /** @class */ (function (_super) {
    __extends(ListViewItem, _super);
    function ListViewItem() {
        var _this = _super.call(this) || this;
        _this._index = -1;
        _this._select = false;
        _this._interactable = true;
        return _this;
    }
    ListViewItem.prototype.init = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Initialization logic can be added here
    };
    Object.defineProperty(ListViewItem.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListViewItem.prototype, "select", {
        get: function () {
            return this._select;
        },
        set: function (value) {
            this._select = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListViewItem.prototype, "interactable", {
        get: function () {
            return this._interactable;
        },
        set: function (value) {
            this._interactable = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListViewItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value != null) {
                this._data = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    ListViewItem.prototype.reset = function () {
        this._data = null;
        this._index = -1;
        this.select = false;
        this.interactable = true;
    };
    ListViewItem.prototype.release = function () {
        // Release logic can be added here
    };
    ListViewItem.prototype.update_view = function () { };
    ;
    ListViewItem = __decorate([
        ccclass
    ], ListViewItem);
    return ListViewItem;
}(cc.Component));
exports.ListViewItem = ListViewItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExpc3RWaWV3SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0MsZ0NBQVk7SUFNMUM7UUFBQSxZQUNJLGlCQUFPLFNBSVY7UUFIRyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztJQUM5QixDQUFDO0lBRU0sMkJBQUksR0FBWDtRQUFZLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O1FBQ3RCLHlDQUF5QztJQUM3QyxDQUFDO0lBRUQsc0JBQVcsK0JBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQWlCLEtBQWE7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVyxnQ0FBTTthQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO2FBRUQsVUFBa0IsS0FBYztZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLHNDQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUF3QixLQUFjO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsOEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBVTtZQUN0QixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDdEI7UUFDTCxDQUFDOzs7T0FOQTtJQVFNLDRCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFTSw4QkFBTyxHQUFkO1FBQ0ksa0NBQWtDO0lBQ3RDLENBQUM7SUFFTSxrQ0FBVyxHQUFsQixjQUF1QixDQUFDO0lBQUEsQ0FBQztJQTlEaEIsWUFBWTtRQUR4QixPQUFPO09BQ0ssWUFBWSxDQStEeEI7SUFBRCxtQkFBQztDQS9ERCxBQStEQyxDQS9EaUMsRUFBRSxDQUFDLFNBQVMsR0ErRDdDO0FBL0RZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBMaXN0Vmlld0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBfc2VsZWN0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJhY3RhYmxlOiBib29sZWFuO1xyXG4gICAgcHVibGljIF9kYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICAvLyBJbml0aWFsaXphdGlvbiBsb2dpYyBjYW4gYmUgYWRkZWQgaGVyZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNlbGVjdCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VsZWN0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbnRlcmFjdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGludGVyYWN0YWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2ludGVyYWN0YWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLnNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBSZWxlYXNlIGxvZ2ljIGNhbiBiZSBhZGRlZCBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCkgeyB9O1xyXG59Il19