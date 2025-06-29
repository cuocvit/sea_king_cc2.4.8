
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/VipGiftEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5ba0ZBTQtPZ6D9fctH7I6V', 'VipGiftEntry');
// start-scene/scripts/VipGiftEntry.ts

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
exports.VipGiftEntry = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipGiftEntry = /** @class */ (function (_super) {
    __extends(VipGiftEntry, _super);
    function VipGiftEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entry_btn = null;
        _this.extend_node = null;
        return _this;
    }
    VipGiftEntry.prototype.onEnable = function () {
        if (this.node.parent) {
            this.node.parent.active = true;
        }
    };
    VipGiftEntry.prototype.onDisable = function () {
        // Add any necessary cleanup logic here
    };
    VipGiftEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.VIPGIFT);
        }
    };
    __decorate([
        property(cc.Button)
    ], VipGiftEntry.prototype, "entry_btn", void 0);
    __decorate([
        property(cc.Node)
    ], VipGiftEntry.prototype, "extend_node", void 0);
    VipGiftEntry = __decorate([
        ccclass
    ], VipGiftEntry);
    return VipGiftEntry;
}(NodePoolItem_1.NodePoolItem));
exports.VipGiftEntry = VipGiftEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFZpcEdpZnRFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQywrQ0FBNkM7QUFFdkMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0MsZ0NBQVk7SUFBOUM7UUFBQSxxRUFzQkM7UUFwQlcsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDOztJQWlCL0MsQ0FBQztJQWZhLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVTLGdDQUFTLEdBQW5CO1FBQ0ksdUNBQXVDO0lBQzNDLENBQUM7SUFFTyxxREFBOEIsR0FBdEMsVUFBdUMsS0FBZTtRQUNsRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUMzQixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBbkJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ3lCO0lBTGxDLFlBQVk7UUFEeEIsT0FBTztPQUNLLFlBQVksQ0FzQnhCO0lBQUQsbUJBQUM7Q0F0QkQsQUFzQkMsQ0F0QmlDLDJCQUFZLEdBc0I3QztBQXRCWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICotKlxyXG5pbXBvcnQgeyBnbSB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gXCIuL05vZGVQb29sSXRlbVwiXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFZpcEdpZnRFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBlbnRyeV9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBleHRlbmRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQWRkIGFueSBuZWNlc3NhcnkgY2xlYW51cCBsb2dpYyBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5WSVBHSUZUKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=