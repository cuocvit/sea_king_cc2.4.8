
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FightConstants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpZ2h0Q29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7QUFDSixJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFDbEIsNkNBQVcsQ0FBQTtJQUNYLDJDQUFVLENBQUE7SUFDViw2Q0FBVyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBSW5CO0FBRUQsSUFBSTtBQUNKLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiwyQ0FBUyxDQUFBO0lBQ1QsbURBQWEsQ0FBQTtJQUNiLDJDQUFTLENBQUE7QUFDWCxDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEI7QUFFRCxJQUFJO0FBQ0osSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3hCLHlEQUFXLENBQUE7SUFDWCx1REFBVSxDQUFBO0lBQ1YsNkRBQWEsQ0FBQTtBQUNmLENBQUMsRUFKVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUl6QjtBQUVELElBQUk7QUFDSixJQUFZLGlCQUlYO0FBSkQsV0FBWSxpQkFBaUI7SUFDM0IsMkVBQWlCLENBQUE7SUFDakIsNkVBQWtCLENBQUE7SUFDbEIsMkVBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBSTVCO0FBRUQsSUFBSTtBQUNKLElBQVkscUJBUVg7QUFSRCxXQUFZLHFCQUFxQjtJQUMvQixxRkFBa0IsQ0FBQTtJQUNsQiw2RUFBYyxDQUFBO0lBQ2QseUVBQVksQ0FBQTtJQUNaLGlFQUFRLENBQUE7SUFDUiwrRUFBZSxDQUFBO0lBQ2YsaUVBQVEsQ0FBQTtJQUNSLGdFQUFRLENBQUE7QUFDVixDQUFDLEVBUlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFRaEM7QUFFRCxJQUFJO0FBQ0o7SUFBQTtJQWdDQSxDQUFDO0lBL0J5QiwyQkFBWSxHQUFhLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsNkJBQWMsR0FBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELDJCQUFZLEdBQVcsRUFBRSxDQUFDO0lBQzFCLDJCQUFZLEdBQVcsR0FBRyxDQUFDO0lBQzNCLCtCQUFnQixHQUFXLENBQUMsQ0FBQztJQUM5QiwrQkFBZ0IsR0FBVyxHQUFHLENBQUM7SUFDL0IsaUNBQWtCLEdBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxtQ0FBb0IsR0FBYSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELGlEQUFrQyxHQUFXLENBQUMsQ0FBQztJQUUvQyxnQ0FBaUIsR0FBYztRQUNwRCxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzNELEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDZixDQUFDO0lBRXFCLG1DQUFvQixHQUFlO1FBQ3hELEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0tBQzlCLENBQUM7SUFFcUIscUNBQXNCLEdBQWU7UUFDMUQsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDL0IsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDaEMsQ0FBQztJQUVxQixtQ0FBb0IsR0FBZTtRQUN4RCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUMvQixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztLQUNoQyxDQUFDO0lBQ0oscUJBQUM7Q0FoQ0QsQUFnQ0MsSUFBQTtBQWhDWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxuZXhwb3J0IGVudW0gSGVyb1R5cGUge1xyXG4gIEZSRUVET00gPSAwLFxyXG4gIEFUVEFDSyA9IDEsXHJcbiAgREVGRU5TRSA9IDIsXHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gSGVyb1N0YXRlIHtcclxuICBBTElWRSA9IDAsXHJcbiAgQVRUQUNLSU5HID0gMSxcclxuICBERUFUSCA9IDIsXHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gSGVyb0ZpZ2h0U3RhdGUge1xyXG4gIFdBSVRJTkcgPSAwLFxyXG4gIE1PVklORyA9IDEsXHJcbiAgQVRUQUNLSU5HID0gMixcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgZW51bSBIZXJvSW5CYXR0bGVTdGF0ZSB7XHJcbiAgTk9UX0lOX0JBVFRMRSA9IDAsXHJcbiAgV0lMTF9JTl9CQVRUTEUgPSAxLFxyXG4gIEhBU19JTl9CQVRUTEUgPSAyLFxyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIEZpZ2h0RHluYW1pY05vZGVMYXllciB7XHJcbiAgREVTVFJPWV9FRkZFQ1QgPSAwLFxyXG4gIERFQ09SQVRJT04gPSAxLFxyXG4gIEJVSUxESU5HID0gMixcclxuICBQUk9QID0gMyxcclxuICBGSVJFX0VGRkVDVCA9IDQsXHJcbiAgTU9WRSA9IDUsXHJcbiAgTUFYID0gMTAsXHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIEZpZ2h0Q29uc3RhbnRzIHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIUF9SRURfQ09MT1I6IGNjLkNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0IyMjkyMVwiKTtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIUF9HUkVFTl9DT0xPUjogY2MuQ29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjNDJGRThEXCIpO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEFUVEFDS19SQU5HRTogbnVtYmVyID0gODA7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0VBUkNIX1JBTkdFOiBudW1iZXIgPSAxNjA7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX0NBVkVTX0xBWUVSUzogbnVtYmVyID0gMztcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEZMWV9XRUFQT05fU1BFRUQ6IG51bWJlciA9IDQwMDtcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEhQX1JFRF9DT0xPUl9MSUdIVDogY2MuQ29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjRkQ0QjQxXCIpO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSFBfR1JFRU5fQ09MT1JfTElHSFQ6IGNjLkNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiIzFCQzA1QVwiKTtcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNLSUxMX0lOVEVSVkFMX05PUk1BTF9BVFRBQ0tfQ09VTlQ6IG51bWJlciA9IDM7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSEVST19PRkZTRVRfQVJSQVk6IGNjLlZlYzNbXSA9IFtcclxuICAgIGNjLnYzKDAsIDApLCBjYy52Myg4LCAxNSksIGNjLnYzKDIzLCAtNiksIGNjLnYzKC04LCAtMTUpLFxyXG4gICAgY2MudjMoLTIyLCA2KSwgY2MudjMoLTE0LCAyMSksIGNjLnYzKDMxLCA5KSwgY2MudjMoMTUsIC0yMSksXHJcbiAgICBjYy52MygtMzAsIC05KVxyXG4gIF07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU0VBX0FSRUFfQ09MT1JfQVJSQVk6IGNjLkNvbG9yW10gPSBbXHJcbiAgICBjYy5jb2xvcigpLmZyb21IRVgoXCIjMDZCNEYzXCIpLFxyXG4gICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzNjMGE3OVwiKSxcclxuICAgIGNjLmNvbG9yKCkuZnJvbUhFWChcIiMyZjIwMjdcIilcclxuICBdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdBVkVfU1RBUlRfQ09MT1JfQVJSQVk6IGNjLkNvbG9yW10gPSBbXHJcbiAgICBjYy5jb2xvcigpLmZyb21IRVgoXCIjNjNGRkZFMkVcIiksXHJcbiAgICBjYy5jb2xvcigpLmZyb21IRVgoXCIjRTA2M0ZGMkVcIilcclxuICBdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFdBVkVfRU5EX0NPTE9SX0FSUkFZOiBjYy5Db2xvcltdID0gW1xyXG4gICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiIzYzRkZGRTAwXCIpLFxyXG4gICAgY2MuY29sb3IoKS5mcm9tSEVYKFwiI0UwNjNGRjAwXCIpXHJcbiAgXTtcclxufVxyXG5cclxuXHJcbiJdfQ==