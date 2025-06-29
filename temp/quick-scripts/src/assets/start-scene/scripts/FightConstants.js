"use strict";
cc._RF.push(module, '5c4e6bd7/lGRb76o0E73hOh', 'FightConstants');
// start-scene/scripts/FightConstants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightConstants = exports.FightDynamicNodeLayer = exports.HeroInBattleState = exports.HeroFightState = exports.HeroState = exports.HeroType = void 0;
// @
var HeroType;
(function (HeroType) {
    HeroType[HeroType["FREEDOM"] = 0] = "FREEDOM";
    HeroType[HeroType["ATTACK"] = 1] = "ATTACK";
    HeroType[HeroType["DEFENSE"] = 2] = "DEFENSE";
})(HeroType = exports.HeroType || (exports.HeroType = {}));
// @
var HeroState;
(function (HeroState) {
    HeroState[HeroState["ALIVE"] = 0] = "ALIVE";
    HeroState[HeroState["ATTACKING"] = 1] = "ATTACKING";
    HeroState[HeroState["DEATH"] = 2] = "DEATH";
})(HeroState = exports.HeroState || (exports.HeroState = {}));
// @
var HeroFightState;
(function (HeroFightState) {
    HeroFightState[HeroFightState["WAITING"] = 0] = "WAITING";
    HeroFightState[HeroFightState["MOVING"] = 1] = "MOVING";
    HeroFightState[HeroFightState["ATTACKING"] = 2] = "ATTACKING";
})(HeroFightState = exports.HeroFightState || (exports.HeroFightState = {}));
// @
var HeroInBattleState;
(function (HeroInBattleState) {
    HeroInBattleState[HeroInBattleState["NOT_IN_BATTLE"] = 0] = "NOT_IN_BATTLE";
    HeroInBattleState[HeroInBattleState["WILL_IN_BATTLE"] = 1] = "WILL_IN_BATTLE";
    HeroInBattleState[HeroInBattleState["HAS_IN_BATTLE"] = 2] = "HAS_IN_BATTLE";
})(HeroInBattleState = exports.HeroInBattleState || (exports.HeroInBattleState = {}));
// @
var FightDynamicNodeLayer;
(function (FightDynamicNodeLayer) {
    FightDynamicNodeLayer[FightDynamicNodeLayer["DESTROY_EFFECT"] = 0] = "DESTROY_EFFECT";
    FightDynamicNodeLayer[FightDynamicNodeLayer["DECORATION"] = 1] = "DECORATION";
    FightDynamicNodeLayer[FightDynamicNodeLayer["BUILDING"] = 2] = "BUILDING";
    FightDynamicNodeLayer[FightDynamicNodeLayer["PROP"] = 3] = "PROP";
    FightDynamicNodeLayer[FightDynamicNodeLayer["FIRE_EFFECT"] = 4] = "FIRE_EFFECT";
    FightDynamicNodeLayer[FightDynamicNodeLayer["MOVE"] = 5] = "MOVE";
    FightDynamicNodeLayer[FightDynamicNodeLayer["MAX"] = 10] = "MAX";
})(FightDynamicNodeLayer = exports.FightDynamicNodeLayer || (exports.FightDynamicNodeLayer = {}));
// @
var FightConstants = /** @class */ (function () {
    function FightConstants() {
    }
    FightConstants.HP_RED_COLOR = cc.color().fromHEX("#B22921");
    FightConstants.HP_GREEN_COLOR = cc.color().fromHEX("#42FE8D");
    FightConstants.ATTACK_RANGE = 80;
    FightConstants.SEARCH_RANGE = 160;
    FightConstants.MAX_CAVES_LAYERS = 3;
    FightConstants.FLY_WEAPON_SPEED = 400;
    FightConstants.HP_RED_COLOR_LIGHT = cc.color().fromHEX("#FD4B41");
    FightConstants.HP_GREEN_COLOR_LIGHT = cc.color().fromHEX("#1BC05A");
    FightConstants.SKILL_INTERVAL_NORMAL_ATTACK_COUNT = 3;
    FightConstants.HERO_OFFSET_ARRAY = [
        cc.v3(0, 0), cc.v3(8, 15), cc.v3(23, -6), cc.v3(-8, -15),
        cc.v3(-22, 6), cc.v3(-14, 21), cc.v3(31, 9), cc.v3(15, -21),
        cc.v3(-30, -9)
    ];
    FightConstants.SEA_AREA_COLOR_ARRAY = [
        cc.color().fromHEX("#06B4F3"),
        cc.color().fromHEX("#3c0a79"),
        cc.color().fromHEX("#2f2027")
    ];
    FightConstants.WAVE_START_COLOR_ARRAY = [
        cc.color().fromHEX("#63FFFE2E"),
        cc.color().fromHEX("#E063FF2E")
    ];
    FightConstants.WAVE_END_COLOR_ARRAY = [
        cc.color().fromHEX("#63FFFE00"),
        cc.color().fromHEX("#E063FF00")
    ];
    return FightConstants;
}());
exports.FightConstants = FightConstants;

cc._RF.pop();