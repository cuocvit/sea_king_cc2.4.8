"use strict";
cc._RF.push(module, 'a6f189EJZ9PP5p+39drzcZT', 'FightNew');
// test/scripts/FightNew.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitData = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Fight = /** @class */ (function (_super) {
    __extends(Fight, _super);
    function Fight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fight.prototype.onLoad = function () {
        var t = new UnitData();
        var e = new UnitPropertyData(0, "attack", "攻击力", 10, 0, 1000);
        var o = new UnitPropertyData(1, "hp", "血量值", 100, 0, 100);
        var i = new UnitPropertyData(2, "defense", "防御值", 10, 0, 100);
        t.addProperty(e);
        t.addProperty(o);
        new Pipeline(new Pipe(Handler.addFixedValue, Handler, 1), new Pipe(Handler.addRatio, Handler, 0.1)).run(e);
        var n = new PassiveSkillEffectData(1, "被动技能：防御增加10，攻击增加10", [e, o, i]);
        var skillPipeline = new Pipeline();
        skillPipeline.push(new Pipe(Handler.passiveSkill, Handler, n));
        skillPipeline.run(t);
    };
    Fight = __decorate([
        ccclass
    ], Fight);
    return Fight;
}(cc.Component));
exports.default = Fight;
var PassiveSkillEffectData = /** @class */ (function () {
    function PassiveSkillEffectData(id, name, properties) {
        this.id = id;
        this.name = name;
        this.properties = properties;
    }
    return PassiveSkillEffectData;
}());
var ContentBase = /** @class */ (function () {
    function ContentBase() {
    }
    return ContentBase;
}());
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.addFixedValue = function (prop, value) {
        prop.value += value;
        return prop;
    };
    Handler.addRatio = function (prop, ratio) {
        prop.value += prop.value * ratio;
        return prop;
    };
    Handler.passiveSkill = function (skill) {
        return skill;
    };
    return Handler;
}());
var Pipe = /** @class */ (function () {
    function Pipe(func, target) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this._func = func;
        this._target = target;
        this._args = args;
    }
    Pipe.prototype.execute = function (input) {
        return this._func.apply(this._target, __spreadArrays([input], this._args));
    };
    return Pipe;
}());
var Pipeline = /** @class */ (function () {
    function Pipeline() {
        var pipes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pipes[_i] = arguments[_i];
        }
        this._pipeArray = pipes || [];
    }
    Pipeline.prototype.push = function (pipe) {
        this._pipeArray.push(pipe);
    };
    Pipeline.prototype.run = function (input) {
        console.log("Pipeline input:", JSON.stringify(input));
        input = this._pipeArray.reduce(function (acc, pipe) { return pipe.execute(acc); }, input);
        console.log("Pipeline result:", JSON.stringify(input));
        return input;
    };
    return Pipeline;
}());
var UnitPropertyData = /** @class */ (function () {
    function UnitPropertyData(key, name, nameZh, value, minValue, maxValue) {
        this.key = key;
        this.name = name;
        this.nameZh = nameZh;
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    return UnitPropertyData;
}());
var UnitData = /** @class */ (function () {
    function UnitData() {
        this.propertyMap = {};
    }
    UnitData.prototype.getPropertyValue = function (key) {
        var _a, _b;
        return (_b = (_a = this.propertyMap[key]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    };
    UnitData.prototype.setPropertyValue = function (key, value) {
        if (this.propertyMap[key]) {
            this.propertyMap[key].value = value;
        }
    };
    UnitData.prototype.getProperty = function (key) {
        return this.propertyMap[key];
    };
    UnitData.prototype.addProperty = function (property) {
        if (!this.propertyMap[property.key]) {
            this.propertyMap[property.key] = property;
        }
    };
    UnitData.prototype.removeProperty = function (key) {
        if (this.propertyMap[key]) {
            delete this.propertyMap[key];
        }
    };
    return UnitData;
}());
exports.UnitData = UnitData;

cc._RF.pop();