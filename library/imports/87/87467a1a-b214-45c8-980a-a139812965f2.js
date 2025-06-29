"use strict";
cc._RF.push(module, '87467oashRFyJgKoTmBKWXy', 'DataEvent');
// start-scene/scripts/DataEvent.ts

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
exports.DataEvent = void 0;
// +-+
var Event_1 = require("./Event");
var DataEvent = /** @class */ (function (_super) {
    __extends(DataEvent, _super);
    function DataEvent(type, data, data2) {
        if (data === void 0) { data = null; }
        if (data2 === void 0) { data2 = null; }
        var _this = _super.call(this, type) || this;
        _this._data = data;
        _this._data2 = data2;
        return _this;
    }
    Object.defineProperty(DataEvent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataEvent.prototype, "data2", {
        get: function () {
            return this._data2;
        },
        set: function (value) {
            this._data2 = value;
        },
        enumerable: false,
        configurable: true
    });
    DataEvent.DATA = "data";
    DataEvent.GUIDENEWERGUIDE = "guide-newerGuide";
    DataEvent.NEWERGUIDEOPHIDE = "hideGuideOp";
    DataEvent.NEWERGUIDEOPSHOW = "showGuideOp";
    DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS = "guide-clickBuildBtnPos";
    DataEvent.GUIDE_CLICK_BUILD_UPGRAE_POS_SUC = "guide-clickBuildBtnPosSucc";
    DataEvent.GUIDE_CLICK_BARREL_POS = "guide-clickBarrelBtnPos";
    DataEvent.GUIDE_CLICK_BARREL_POS_SUC = "guide-clickBarrelBtnPosSucc";
    DataEvent.GUIDE_CLICK_BUILD_UP_POS = "guide-clickBuildUpBtnPos";
    DataEvent.GUIDE_CLICK_BUILD_UP_POS_SUC = "guide-clickBuildUpBtnPosSucc";
    DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS = "guide-clickBeginFightBtnPos";
    DataEvent.GUIDE_CLICK_BEGIN_FIGHT_POS_SUC = "guide-clickBeginFightBtnPosSucc";
    DataEvent.GUIDEATFEROPENNEWERGUIDEPANEL = "showGuideOp";
    DataEvent.GUIDE_OPEN_MERGE_SWORD_POS = "guide-getOpenSwordBtnPos";
    DataEvent.GUIDE_OPEN_MERGE_SWORD_POS_SUC = "guide-getOpenSwordBtnSucc";
    DataEvent.GUIDE_OPEN_BACK_MAIN_POS = "guide-clickBackMainBtnPos";
    DataEvent.GUIDE_OPEN_BACK_MAIN_POS_SUC = "guide-clickBackMainBtnSucc";
    DataEvent.GUIDE_OPEN_EQUIP_POS = "guide-clickOpenEquipBtnPos";
    DataEvent.GUIDE_OPEN_EQUIP_POS_SUC = "guide-clickOpenEquipBtnSucc";
    DataEvent.GUIDE_EQUIP_UP_POS = "guide-clickEquipUpBtnPos";
    DataEvent.GUIDE_EQUIP_UP_POSS_SUC = "guide-clickEquipUpBtnSucc";
    DataEvent.GUIDE_CLOSE_EQUIP_POS = "guide-clickCloseEquipBtnPos";
    DataEvent.GUIDE_CLOSE_EQUIP_POS_SUC = "guide-clickCloseEquipBtnSucc";
    DataEvent.GUIDE_CLICK_WHITE_POS = "guide-clickWhiteBtnPos";
    DataEvent.GUIDE_CLICK_WHITE_SUC = "guide-clickWhiteBtnSucc";
    DataEvent.GUIDE_GET_CREATE_SWORD_POS = "guide-getCreateSwordBtnPos";
    DataEvent.GUIDE_GET_CREATE_SWORD_POS_SUC = "guide-getCreateSwordBtnSucc";
    DataEvent.GUIDE_GET_FIX_SWORD_POS = "guide-getSwordBtnPos";
    DataEvent.GUIDE_GET_FIX_SWORD_POS_SUC = "guide-getSwordBtnSucc";
    DataEvent.GUIDE_GET_NEW_SWORD_POS = "guide-clickNewSwordBtnPos";
    DataEvent.GUIDE_GET_NEW_SWORD_POS_SUC = "guide-clickNewSwordBtnSucc";
    DataEvent.GUIDE_GET_FIGHT_POS = "guide-getFightBtnPos";
    DataEvent.GUIDE_GET_FIGHT_POS_SUC = "guide-getFightBtnSucc";
    DataEvent.GUIDE_GET_CHAPTER_POS = "guide-getChapterBtnPos";
    DataEvent.GUIDE_GET_CHAPTER_SUC = "guide-getChapterBtnSucc";
    DataEvent.GUIDE_GET_SWORD_STRENG_POS = "guide-getSwordStrengBtnPos";
    DataEvent.GUIDE_GET_SWORD_STRENG_SUC = "guide-getSwordStrengBtnSucc";
    DataEvent.GUIDE_GET_STRENG_DAMAGE_POS = "guide-getStreng1BtnPos";
    DataEvent.GUIDE_GET_STRENG_DAMAGE_SUC = "guide-getStreng1BtnSucc";
    DataEvent.GUIDE_GET_STRENG_SPEED_POS = "guide-getStreng2BtnPos";
    DataEvent.GUIDE_GET_STRENG_SPEED_SUC = "guide-getStreng2BtnSucc";
    DataEvent.GUIDE_GET_STRENG_COUNT_POS = "guide-getStreng3BtnPos";
    DataEvent.GUIDE_GET_STRENG_COUNT_SUC = "guide-getStreng3BtnSucc";
    DataEvent.GUIDE_GET_STRENG_CLOSE_POS = "guide-getStreng4BtnPos";
    DataEvent.GUIDE_GET_STRENG_CLOSE_SUC = "guide-getStreng4BtnSucc";
    DataEvent.GUIDE_GET_MAGIC_POS = "guide-getMagicBtnPos";
    DataEvent.GUIDE_GET_MAGIC_SUC = "guide-getMagicBtnSucc";
    DataEvent.GUIDE_GET_FIGHT_UP_POS = "guide-getFightUpBtnPos";
    DataEvent.GUIDE_GET_FIGHT_UP_SUC = "guide-getFightUpBtnSucc";
    DataEvent.GUIDE_GET_HP_POS = "guide-getHpBtnPos";
    DataEvent.GUIDE_GET_HP_SUC = "guide-getHpBtnSucc";
    DataEvent.GUIDE_GET_MAGIC_CHOOSE_POS = "guide-getChooseMagicBtnPos";
    DataEvent.GUIDE_GET_MAGIC_CHOOSE_SUC = "guide-getChooseMagicBtnSucc";
    return DataEvent;
}(Event_1.Event));
exports.DataEvent = DataEvent;

cc._RF.pop();