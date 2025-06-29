
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailInboxItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9bcf6JnjwVOg6zfAieE01m1', 'MailInboxItem');
// mail/scripts/MailInboxItem.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailInboxItem = /** @class */ (function (_super) {
    __extends(MailInboxItem, _super);
    function MailInboxItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.open_btn = null;
        _this.icon_spr = null;
        _this.title_lbl = null;
        _this.content_lbl = null;
        _this.unread_node = null;
        _this.read_node = null;
        return _this;
    }
    Object.defineProperty(MailInboxItem.prototype, "data", {
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
    MailInboxItem.prototype.update_view = function () {
        this.title_lbl.string = this._data.mail_title;
        this.content_lbl.string = this._data.mail_text;
        this.unread_node.active = this._data.op_status == 0;
        this.read_node.active = this._data.op_status == 1;
        Utils_1.Utils.async_set_sprite_frame(this.icon_spr, Constants_1.BundleName.MAIL, "res/icon_" + this._data.mail_type);
    };
    MailInboxItem.prototype.reset = function () {
        this.title_lbl.string = "";
        this.content_lbl.string = "";
        this.unread_node.active = false;
        this.read_node.active = false;
        this.icon_spr.spriteFrame = null;
    };
    MailInboxItem.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.open_btn.node) {
            if (0 == this._data.op_status) {
                var serverData = GameManager_1.gm.data.server_data;
                var requestData = {
                    uid: serverData.uid,
                    token: serverData.token,
                    mail_id: this._data.mail_id,
                    op_status: 1,
                    reward_status: 0
                };
                serverData.op_player_email(function (response) {
                    if (0 == response.ResultCode) {
                        _this._data.op_status = 1;
                        _this.update_view();
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.MailDetails.key, {
                            data: _this._data
                        });
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MailDetails);
                    }
                }, requestData);
            }
            else {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.MailDetails.key, {
                    data: this._data
                });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MailDetails);
            }
        }
    };
    __decorate([
        property(cc.Button)
    ], MailInboxItem.prototype, "open_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailInboxItem.prototype, "icon_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailInboxItem.prototype, "title_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailInboxItem.prototype, "content_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailInboxItem.prototype, "unread_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailInboxItem.prototype, "read_node", void 0);
    MailInboxItem = __decorate([
        ccclass
    ], MailInboxItem);
    return MailInboxItem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbEluYm94SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRUFBMkQ7QUFDM0QsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCxpRUFBaUU7QUFHM0QsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEIsaUNBQVk7SUFBeEM7UUFBQSxxRUE2RUM7UUEzRVMsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFZLElBQUksQ0FBQzs7SUE0RHBDLENBQUM7SUF4REMsc0JBQVcsK0JBQUk7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBRUQsVUFBZ0IsS0FBd0I7WUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUxBO0lBT00sbUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxT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IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlld0l0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBNYWlsSW5ib3hJdGVtRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTWFpbFRlbXBEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBNYWlsSW5ib3hJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gIHByaXZhdGUgb3Blbl9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgcHJpdmF0ZSBpY29uX3NwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gIHByaXZhdGUgdGl0bGVfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICBwcml2YXRlIGNvbnRlbnRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gIHByaXZhdGUgdW5yZWFkX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICBwcml2YXRlIHJlYWRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBfZGF0YTogTWFpbEluYm94SXRlbURhdGE7XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBNYWlsSW5ib3hJdGVtRGF0YSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogTWFpbEluYm94SXRlbURhdGEpIHtcclxuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgIHRoaXMudGl0bGVfbGJsLnN0cmluZyA9IHRoaXMuX2RhdGEubWFpbF90aXRsZTtcclxuICAgIHRoaXMuY29udGVudF9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS5tYWlsX3RleHQ7XHJcbiAgICB0aGlzLnVucmVhZF9ub2RlLmFjdGl2ZSA9IHRoaXMuX2RhdGEub3Bfc3RhdHVzID09IDA7XHJcbiAgICB0aGlzLnJlYWRfbm9kZS5hY3RpdmUgPSB0aGlzLl9kYXRhLm9wX3N0YXR1cyA9PSAxO1xyXG4gICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmljb25fc3ByLCBCdW5kbGVOYW1lLk1BSUwsIFwicmVzL2ljb25fXCIgKyB0aGlzLl9kYXRhLm1haWxfdHlwZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpdGxlX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy5jb250ZW50X2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpcy51bnJlYWRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMucmVhZF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pY29uX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5vcGVuX2J0bi5ub2RlKSB7XHJcbiAgICAgIGlmICgwID09IHRoaXMuX2RhdGEub3Bfc3RhdHVzKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmVyRGF0YSA9IGdtLmRhdGEuc2VydmVyX2RhdGFcclxuICAgICAgICBjb25zdCByZXF1ZXN0RGF0YSA9IHtcclxuICAgICAgICAgIHVpZDogc2VydmVyRGF0YS51aWQsXHJcbiAgICAgICAgICB0b2tlbjogc2VydmVyRGF0YS50b2tlbixcclxuICAgICAgICAgIG1haWxfaWQ6IHRoaXMuX2RhdGEubWFpbF9pZCxcclxuICAgICAgICAgIG9wX3N0YXR1czogMSxcclxuICAgICAgICAgIHJld2FyZF9zdGF0dXM6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXJ2ZXJEYXRhLm9wX3BsYXllcl9lbWFpbCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmICgwID09IHJlc3BvbnNlLlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5vcF9zdGF0dXMgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5NYWlsRGV0YWlscy5rZXksIHtcclxuICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9kYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5NYWlsRGV0YWlscyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgcmVxdWVzdERhdGEpXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5NYWlsRGV0YWlscy5rZXksIHtcclxuICAgICAgICAgIGRhdGE6IHRoaXMuX2RhdGFcclxuICAgICAgICB9KTtcclxuICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5NYWlsRGV0YWlscyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19