
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MailTempData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1haWxUZW1wRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsaURBQWdEO0FBRWhELElBQUk7QUFDSjtJQUFrQyxnQ0FBYTtJQVEzQyxJQUFJO0lBQ0o7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFKRyxLQUFJLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLEtBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FoQkEsQUFnQkMsQ0FoQmlDLDZCQUFhLEdBZ0I5QyxDQUFDLG9CQUFvQjtBQWhCVCxvQ0FBWTtBQWtCekIsZ0JBQWdCO0FBQ2hCO0lBaUJJLElBQUk7SUFDSjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQSxDQUFDLHVCQUF1QjtBQS9CWiwwQ0FBZTtBQWlDNUIsSUFBSTtBQUNKO0lBUUksSUFBSTtJQUNKO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQSxDQUFDLHdCQUF3QjtBQWhCYiw0Q0FBZ0I7QUFrQjdCLGFBQWE7QUFDYjtJQVlJLElBQUk7SUFDSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCx3QkFBQztBQUFELENBeEJBLEFBd0JDLElBQUEsQ0FBQyx5QkFBeUI7QUF4QmQsOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQFxyXG5pbXBvcnQgeyByZXdhcmRBcnIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbGFkZGVyX2J1aWxkaW5nXCI7XHJcbmltcG9ydCB7IEJhc2VQcm9wSXRlbURhdGEgfSBmcm9tIFwiLi9GaWdodFRlbXBEYXRhXCI7XHJcbmltcG9ydCB7IFNpbmdsZXRvbkJhc2UgfSBmcm9tIFwiLi9TaW5nbGV0b25CYXNlXCI7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBNYWlsVGVtcERhdGEgZXh0ZW5kcyBTaW5nbGV0b25CYXNlIHtcclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBtYWlsX2RlZmVuc2VfbG9nX2RhdGFfYXJyYXk6IE1haWxMb2dJdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIG1haWxfYXR0YWNrX2xvZ19kYXRhX2FycmF5OiBNYWlsTG9nSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyBtYWlsX2luYm94X2RhdGFfYXJyYXk6IE1haWxJbmJveEl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgdGFyZ2V0X3VpZDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWFpbF9kZWZlbnNlX2xvZ19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5tYWlsX2F0dGFja19sb2dfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMubWFpbF9pbmJveF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy50YXJnZXRfdWlkID0gXCJcIjtcclxuICAgIH1cclxufSAvLyBlbmQ6IE1haWxUZW1wRGF0YVxyXG5cclxuLy8gYW55IHR5cGUgISEhIVxyXG5leHBvcnQgY2xhc3MgTWFpbExvZ0l0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyB1aWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBzdGFyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGFyZ2V0X3N0YXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjaGFuZ2Vfc3RhcjogbnVtYmVyO1xyXG4gICAgcHVibGljIHRhcmdldF9jaGFuZ2Vfc3RhcjogbnVtYmVyO1xyXG4gICAgcHVibGljIG9wX3R5cGU6IHN0cmluZztcclxuICAgIHB1YmxpYyB0YXJnZXRfdWlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGFyZ2V0X25pY2tuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgb3BfcmVzdWx0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVwbGF5X2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXNfZGVkdWN0X2xvc3NfcmV3YXJkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgb3BfcmV3YXJkOiBCYXNlUHJvcEl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgb3BfbG9zc19yZXdhcmQ6IEJhc2VQcm9wSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyBvcF9iYXR0bGU6IE1haWxIZXJvSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyB0YXJnZXRfb3BfYmF0dGxlOiBNYWlsSGVyb0l0ZW1EYXRhW107XHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51aWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhciA9IDA7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfc3RhciA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2Vfc3RhciA9IDA7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfY2hhbmdlX3N0YXIgPSAwO1xyXG4gICAgICAgIHRoaXMub3BfdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfdWlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRhcmdldF9uaWNrbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5vcF9yZXN1bHQgPSAwO1xyXG4gICAgICAgIHRoaXMucmVwbGF5X2lkID0gMDtcclxuICAgICAgICB0aGlzLmlzX2RlZHVjdF9sb3NzX3Jld2FyZCA9IDA7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBNYWlsTG9nSXRlbURhdGFcclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIE1haWxIZXJvSXRlbURhdGEge1xyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHVuaXF1ZV9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBlbnRlcl90aW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZW50ZXJfZ3JpZF9pbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudW5pcXVlX2lkID0gMDtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLmhwID0gMDtcclxuICAgICAgICB0aGlzLmVudGVyX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZW50ZXJfZ3JpZF9pbmRleCA9IDA7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBNYWlsSGVyb0l0ZW1EYXRhXHJcblxyXG4vLyBALCAhISF0eXBlXHJcbmV4cG9ydCBjbGFzcyBNYWlsSW5ib3hJdGVtRGF0YSB7XHJcbiAgICBwdWJsaWMgbWFpbF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1haWxfdHlwZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1haWxfc2VuZGVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbWFpbF90aXRsZTogc3RyaW5nO1xyXG4gICAgcHVibGljIG1haWxfdGV4dDogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wX3N0YXR1czogbnVtYmVyO1xyXG4gICAgcHVibGljIHJld2FyZF9zdGF0dXM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZW5kX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZXdhcmRfYXJyYXk6IHJld2FyZEFycltdO1xyXG4gICAgcHVibGljIHJld2FyZDogeyByYW5rOiBudW1iZXIgfTtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1haWxfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMubWFpbF90eXBlID0gMDtcclxuICAgICAgICB0aGlzLm1haWxfc2VuZGVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1haWxfdGl0bGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubWFpbF90ZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm9wX3N0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLnNlbmRfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfYXJyYXkgPSBbXTtcclxuICAgIH1cclxufSAvLyBlbmQ6IE1haWxJbmJveEl0ZW1EYXRhXHJcbiJdfQ==