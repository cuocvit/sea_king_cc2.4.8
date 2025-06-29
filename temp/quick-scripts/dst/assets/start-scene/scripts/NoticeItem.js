
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/NoticeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc02bAryY1Dfar6TV1azq1j', 'NoticeItem');
// start-scene/scripts/NoticeItem.ts

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
exports.NoticeItem = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NoticeItem = /** @class */ (function (_super) {
    __extends(NoticeItem, _super);
    function NoticeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content_txt = null;
        return _this;
    }
    Object.defineProperty(NoticeItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            if (this.content_txt) {
                this.content_txt.string = value;
            }
            this.scheduleOnce(function () {
                GameManager_1.gm.pool.put(_this.node);
            }, 1);
        },
        enumerable: false,
        configurable: true
    });
    NoticeItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._data = undefined;
        if (this.content_txt) {
            this.content_txt.string = "";
        }
    };
    __decorate([
        property(cc.RichText)
    ], NoticeItem.prototype, "content_txt", void 0);
    NoticeItem = __decorate([
        ccclass
    ], NoticeItem);
    return NoticeItem;
}(NodePoolItem_1.NodePoolItem));
exports.NoticeItem = NoticeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE5vdGljZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDOUMsNkNBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlCLDhCQUFZO0lBQXJDO1FBQUEscUVBMkJDO1FBdkJXLGlCQUFXLEdBQXVCLElBQUksQ0FBQzs7SUF1Qm5ELENBQUM7SUFyQkcsc0JBQUksNEJBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUE3QixpQkFRQztZQVBHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxnQkFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUM7OztPQVZBO0lBWU0sMEJBQUssR0FBWjtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUF0QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzttREFDeUI7SUFKN0MsVUFBVTtRQURmLE9BQU87T0FDRixVQUFVLENBMkJmO0lBQUQsaUJBQUM7Q0EzQkQsQUEyQkMsQ0EzQndCLDJCQUFZLEdBMkJwQztBQUVRLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBOb3RpY2VJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIHByaXZhdGUgX2RhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwcml2YXRlIGNvbnRlbnRfdHh0OiBjYy5SaWNoVGV4dCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGdldCBkYXRhKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudF90eHQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50X3R4dC5zdHJpbmcgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnVzZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51bnVzZSgpO1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudF90eHQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50X3R4dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTm90aWNlSXRlbSB9OyJdfQ==