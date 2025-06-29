"use strict";
cc._RF.push(module, '122c6bJb4RDZIJIv6mAeuBO', 'MailTempData');
// start-scene/scripts/MailTempData.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailInboxItemData = exports.MailHeroItemData = exports.MailLogItemData = exports.MailTempData = void 0;
var SingletonBase_1 = require("./SingletonBase");
// @
var MailTempData = /** @class */ (function (_super) {
    __extends(MailTempData, _super);
    // @
    function MailTempData() {
        var _this = _super.call(this) || this;
        _this.mail_defense_log_data_array = [];
        _this.mail_attack_log_data_array = [];
        _this.mail_inbox_data_array = [];
        _this.target_uid = "";
        return _this;
    }
    return MailTempData;
}(SingletonBase_1.SingletonBase)); // end: MailTempData
exports.MailTempData = MailTempData;
// any type !!!!
var MailLogItemData = /** @class */ (function () {
    // @
    function MailLogItemData() {
        this.uid = "";
        this.star = 0;
        this.target_star = 0;
        this.change_star = 0;
        this.target_change_star = 0;
        this.op_type = "";
        this.target_uid = "";
        this.target_nickname = "";
        this.op_result = 0;
        this.replay_id = 0;
        this.is_deduct_loss_reward = 0;
    }
    return MailLogItemData;
}()); // end: MailLogItemData
exports.MailLogItemData = MailLogItemData;
// @
var MailHeroItemData = /** @class */ (function () {
    // @
    function MailHeroItemData() {
        this.unique_id = 0;
        this.id = 0;
        this.hp = 0;
        this.enter_time = 0;
        this.enter_grid_index = 0;
    }
    return MailHeroItemData;
}()); // end: MailHeroItemData
exports.MailHeroItemData = MailHeroItemData;
// @, !!!type
var MailInboxItemData = /** @class */ (function () {
    // @
    function MailInboxItemData() {
        this.mail_id = 0;
        this.mail_type = 0;
        this.mail_sender = "";
        this.mail_title = "";
        this.mail_text = "";
        this.op_status = 0;
        this.reward_status = 0;
        this.send_time = 0;
        this.reward_array = [];
    }
    return MailInboxItemData;
}()); // end: MailInboxItemData
exports.MailInboxItemData = MailInboxItemData;

cc._RF.pop();