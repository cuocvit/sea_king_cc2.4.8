"use strict";
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