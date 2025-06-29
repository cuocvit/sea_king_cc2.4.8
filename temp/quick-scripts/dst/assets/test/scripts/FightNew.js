
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/FightNew.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcRmlnaHROZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyx5QkFBWTtJQUEvQzs7SUFxQkEsQ0FBQztJQXBCYSxzQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFOUQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLElBQUksUUFBUSxDQUNSLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FDM0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsR0FBRyxJQUFJLHNCQUFzQixDQUFDLENBQUMsRUFB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QUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRU8saUNBQWMsR0FBdEIsVUFBdUIsR0FBVztRQUM5QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBNUJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpZ2h0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHQgPSBuZXcgVW5pdERhdGEoKTtcclxuICAgICAgICBsZXQgZSA9IG5ldyBVbml0UHJvcGVydHlEYXRhKDAsIFwiYXR0YWNrXCIsIFwi5pS75Ye75YqbXCIsIDEwLCAwLCAxMDAwKTtcclxuICAgICAgICBsZXQgbyA9IG5ldyBVbml0UHJvcGVydHlEYXRhKDEsIFwiaHBcIiwgXCLooYDph4/lgLxcIiwgMTAwLCAwLCAxMDApO1xyXG4gICAgICAgIGxldCBpID0gbmV3IFVuaXRQcm9wZXJ0eURhdGEoMiwgXCJkZWZlbnNlXCIsIFwi6Ziy5b6h5YC8XCIsIDEwLCAwLCAxMDApO1xyXG5cclxuICAgICAgICB0LmFkZFByb3BlcnR5KGUpO1xyXG4gICAgICAgIHQuYWRkUHJvcGVydHkobyk7XHJcblxyXG4gICAgICAgIG5ldyBQaXBlbGluZShcclxuICAgICAgICAgICAgbmV3IFBpcGUoSGFuZGxlci5hZGRGaXhlZFZhbHVlLCBIYW5kbGVyLCAxKSxcclxuICAgICAgICAgICAgbmV3IFBpcGUoSGFuZGxlci5hZGRSYXRpbywgSGFuZGxlciwgMC4xKVxyXG4gICAgICAgICkucnVuKGUpO1xyXG5cclxuICAgICAgICBsZXQgbiA9IG5ldyBQYXNzaXZlU2tpbGxFZmZlY3REYXRhKDEsIFwi6KKr5Yqo5oqA6IO977ya6Ziy5b6h5aKe5YqgMTDvvIzmlLvlh7vlop7liqAxMFwiLCBbZSwgbywgaV0pO1xyXG5cclxuICAgICAgICBsZXQgc2tpbGxQaXBlbGluZSA9IG5ldyBQaXBlbGluZSgpO1xyXG4gICAgICAgIHNraWxsUGlwZWxpbmUucHVzaChuZXcgUGlwZShIYW5kbGVyLnBhc3NpdmVTa2lsbCwgSGFuZGxlciwgbikpO1xyXG4gICAgICAgIHNraWxsUGlwZWxpbmUucnVuKHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQYXNzaXZlU2tpbGxFZmZlY3REYXRhIHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBVbml0UHJvcGVydHlEYXRhW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiBVbml0UHJvcGVydHlEYXRhW10pIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb250ZW50QmFzZSB7IH1cclxuXHJcbmNsYXNzIEhhbmRsZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRGaXhlZFZhbHVlKHByb3A6IFVuaXRQcm9wZXJ0eURhdGEsIHZhbHVlOiBudW1iZXIpOiBVbml0UHJvcGVydHlEYXRhIHtcclxuICAgICAgICBwcm9wLnZhbHVlICs9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkUmF0aW8ocHJvcDogVW5pdFByb3BlcnR5RGF0YSwgcmF0aW86IG51bWJlcik6IFVuaXRQcm9wZXJ0eURhdGEge1xyXG4gICAgICAgIHByb3AudmFsdWUgKz0gcHJvcC52YWx1ZSAqIHJhdGlvO1xyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFzc2l2ZVNraWxsKHNraWxsOiBQYXNzaXZlU2tpbGxFZmZlY3REYXRhKTogUGFzc2l2ZVNraWxsRWZmZWN0RGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHNraWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQaXBlIHtcclxuICAgIHByaXZhdGUgX2Z1bmM6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0OiBIYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSBfYXJnczogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZnVuYzogRnVuY3Rpb24sIHRhcmdldDogSGFuZGxlciwgLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICB0aGlzLl9mdW5jID0gZnVuYztcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5fYXJncyA9IGFyZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUoaW5wdXQ6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mdW5jLmFwcGx5KHRoaXMuX3RhcmdldCwgW2lucHV0LCAuLi50aGlzLl9hcmdzXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBpcGVsaW5lIHtcclxuICAgIHByaXZhdGUgX3BpcGVBcnJheTogUGlwZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKC4uLnBpcGVzOiBQaXBlW10pIHtcclxuICAgICAgICB0aGlzLl9waXBlQXJyYXkgPSBwaXBlcyB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVzaChwaXBlOiBQaXBlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGlwZUFycmF5LnB1c2gocGlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1bihpbnB1dDogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQaXBlbGluZSBpbnB1dDpcIiwgSlNPTi5zdHJpbmdpZnkoaW5wdXQpKTtcclxuICAgICAgICBpbnB1dCA9IHRoaXMuX3BpcGVBcnJheS5yZWR1Y2UoKGFjYywgcGlwZSkgPT4gcGlwZS5leGVjdXRlKGFjYyksIGlucHV0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBpcGVsaW5lIHJlc3VsdDpcIiwgSlNPTi5zdHJpbmdpZnkoaW5wdXQpKTtcclxuICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFVuaXRQcm9wZXJ0eURhdGEge1xyXG4gICAgcHVibGljIGtleTogbnVtYmVyO1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBuYW1lWmg6IHN0cmluZztcclxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1pblZhbHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWF4VmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBrZXk6IG51bWJlcixcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgbmFtZVpoOiBzdHJpbmcsXHJcbiAgICAgICAgdmFsdWU6IG51bWJlcixcclxuICAgICAgICBtaW5WYWx1ZTogbnVtYmVyLFxyXG4gICAgICAgIG1heFZhbHVlOiBudW1iZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5uYW1lWmggPSBuYW1lWmg7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMubWluVmFsdWUgPSBtaW5WYWx1ZTtcclxuICAgICAgICB0aGlzLm1heFZhbHVlID0gbWF4VmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0RGF0YSB7XHJcbiAgICBwcml2YXRlIHByb3BlcnR5TWFwOiB7IFtrZXk6IG51bWJlcl06IFVuaXRQcm9wZXJ0eURhdGEgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlWYWx1ZShrZXk6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlNYXBba2V5XT8udmFsdWUgPz8gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFByb3BlcnR5VmFsdWUoa2V5OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0eU1hcFtrZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlNYXBba2V5XS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFByb3BlcnR5KGtleTogbnVtYmVyKTogVW5pdFByb3BlcnR5RGF0YSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydHlNYXBba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJvcGVydHkocHJvcGVydHk6IFVuaXRQcm9wZXJ0eURhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcGVydHlNYXBbcHJvcGVydHkua2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TWFwW3Byb3BlcnR5LmtleV0gPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVQcm9wZXJ0eShrZXk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnR5TWFwW2tleV0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucHJvcGVydHlNYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19