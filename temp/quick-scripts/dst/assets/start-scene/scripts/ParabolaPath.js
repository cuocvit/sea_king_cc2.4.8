
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ParabolaPath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1b37dBw3dMNrJPIjP5uU3V', 'ParabolaPath');
// start-scene/scripts/ParabolaPath.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParabolaPath = void 0;
var ParabolaPath = /** @class */ (function () {
    function ParabolaPath(startPoint, endPoint, height, gravity) {
        if (gravity === void 0) { gravity = -9.8; }
        this.isClampStartEnd = false;
        this.init(startPoint, endPoint, height, gravity);
    }
    ParabolaPath.prototype.init = function (startPoint, endPoint, height, gravity) {
        if (height === void 0) { height = 10; }
        if (gravity === void 0) { gravity = -9.8; }
        var peakY = Math.max(startPoint.y, endPoint.y) + height;
        var startHeight = peakY - startPoint.y;
        var endHeight = peakY - endPoint.y;
        var gravityFactor = 2 / -gravity;
        var upTime = Math.sqrt(gravityFactor * startHeight);
        var downTime = Math.sqrt(gravityFactor * endHeight);
        var horizontalVelocityX = (endPoint.x - startPoint.x) / (peakY = upTime + downTime);
        var horizontalVelocityZ = (endPoint.z - startPoint.z) / peakY;
        var verticalVelocity = -gravity * upTime;
        this.m_start = startPoint;
        this.m_end = endPoint;
        this.m_height = height;
        this.m_gravity = gravity;
        this.m_upTime = upTime;
        this.m_downTime = downTime;
        this.m_totalTime = peakY;
        this.m_velocityStart = new cc.Vec3(horizontalVelocityX, verticalVelocity, horizontalVelocityZ);
        this.m_position = this.m_start;
        this.m_time = 0;
    };
    Object.defineProperty(ParabolaPath.prototype, "start", {
        get: function () {
            return this.m_start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "end", {
        get: function () {
            return this.m_end;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "height", {
        get: function () {
            return this.m_height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "gravity", {
        get: function () {
            return this.m_gravity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "upTime", {
        get: function () {
            return this.m_upTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "downTime", {
        get: function () {
            return this.m_downTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "totalTime", {
        get: function () {
            return this.m_totalTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "top", {
        get: function () {
            return this.getPosition(this.m_upTime);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "velocityStart", {
        get: function () {
            return this.m_velocityStart;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "position", {
        get: function () {
            return this.m_position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "velocity", {
        get: function () {
            return this.getVelocity(this.m_time);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParabolaPath.prototype, "time", {
        get: function () {
            return this.m_time;
        },
        set: function (num) {
            if (this.isClampStartEnd) {
                num = cc.misc.clampf(num, 0, this.m_totalTime);
            }
            this.m_time = num;
            this.m_position = this.getPosition(num);
        },
        enumerable: false,
        configurable: true
    });
    ParabolaPath.prototype.getPosition = function (time) {
        if (time === 0)
            return this.m_start;
        if (time === this.m_totalTime)
            return this.m_end;
        var displacementY = 0.5 * this.m_gravity * time * time;
        return this.m_start.add(this.m_velocityStart.clone().multiplyScalar(time)).add(new cc.Vec3(0, displacementY, 0));
    };
    ParabolaPath.prototype.getVelocity = function (time) {
        return time === 0 ? this.m_velocityStart : this.m_velocityStart.add(new cc.Vec3(0, this.m_velocityStart.y + this.m_gravity * time, 0));
    };
    return ParabolaPath;
}());
exports.ParabolaPath = ParabolaPath;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFBhcmFib2xhUGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQWFJLHNCQUFZLFVBQW1CLEVBQUUsUUFBaUIsRUFBRSxNQUFjLEVBQUUsT0FBc0I7UUFBdEIsd0JBQUEsRUFBQSxXQUFtQixHQUFHO1FBRm5GLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVPLDJCQUFJLEdBQVosVUFBYSxVQUFtQixFQUFFLFFBQWlCLEVBQUUsTUFBbUIsRUFBRSxPQUFzQjtRQUEzQyx1QkFBQSxFQUFBLFdBQW1CO1FBQUUsd0JBQUEsRUFBQSxXQUFtQixHQUFHO1FBQzVGLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2hFLElBQU0sV0FBVyxHQUFXLEtBQUssR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQU0sU0FBUyxHQUFXLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQU0sYUFBYSxHQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMzQyxJQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM5RCxJQUFNLG1CQUFtQixHQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxD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TyxDQUFDO1FBQ3BDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2pELElBQU0sYUFBYSxHQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JILENBQUM7SUFFTyxrQ0FBVyxHQUFuQixVQUFvQixJQUFZO1FBQzVCLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNJLENBQUM7SUFDTCxtQkFBQztBQUFELENBMUdBLEFBMEdDLElBQUE7QUFFUSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBhcmFib2xhUGF0aCB7XHJcbiAgICBwcml2YXRlIG1fc3RhcnQ6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIG1fZW5kOiBjYy5WZWMzO1xyXG4gICAgcHJpdmF0ZSBtX2hlaWdodDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX2dyYXZpdHk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV91cFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9kb3duVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX3RvdGFsVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX3ZlbG9jaXR5U3RhcnQ6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIG1fcG9zaXRpb246IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIG1fdGltZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGlzQ2xhbXBTdGFydEVuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UG9pbnQ6IGNjLlZlYzMsIGVuZFBvaW50OiBjYy5WZWMzLCBoZWlnaHQ6IG51bWJlciwgZ3Jhdml0eTogbnVtYmVyID0gLTkuOCkge1xyXG4gICAgICAgIHRoaXMuaW5pdChzdGFydFBvaW50LCBlbmRQb2ludCwgaGVpZ2h0LCBncmF2aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXQoc3RhcnRQb2ludDogY2MuVmVjMywgZW5kUG9pbnQ6IGNjLlZlYzMsIGhlaWdodDogbnVtYmVyID0gMTAsIGdyYXZpdHk6IG51bWJlciA9IC05LjgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcGVha1k6IG51bWJlciA9IE1hdGgubWF4KHN0YXJ0UG9pbnQueSwgZW5kUG9pbnQueSkgKyBoZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRIZWlnaHQ6IG51bWJlciA9IHBlYWtZIC0gc3RhcnRQb2ludC55O1xyXG4gICAgICAgIGNvbnN0IGVuZEhlaWdodDogbnVtYmVyID0gcGVha1kgLSBlbmRQb2ludC55O1xyXG4gICAgICAgIGNvbnN0IGdyYXZpdHlGYWN0b3I6IG51bWJlciA9IDIgLyAtZ3Jhdml0eTtcclxuICAgICAgICBjb25zdCB1cFRpbWU6IG51bWJlciA9IE1hdGguc3FydChncmF2aXR5RmFjdG9yICogc3RhcnRIZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGRvd25UaW1lOiBudW1iZXIgPSBNYXRoLnNxcnQoZ3Jhdml0eUZhY3RvciAqIGVuZEhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbFZlbG9jaXR5WDogbnVtYmVyID0gKGVuZFBvaW50LnggLSBzdGFydFBvaW50LngpIC8gKHBlYWtZID0gdXBUaW1lICsgZG93blRpbWUpO1xyXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxWZWxvY2l0eVo6IG51bWJlciA9IChlbmRQb2ludC56IC0gc3RhcnRQb2ludC56KSAvIHBlYWtZO1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsVmVsb2NpdHk6IG51bWJlciA9IC1ncmF2aXR5ICogdXBUaW1lO1xyXG5cclxuICAgICAgICB0aGlzLm1fc3RhcnQgPSBzdGFydFBvaW50O1xyXG4gICAgICAgIHRoaXMubV9lbmQgPSBlbmRQb2ludDtcclxuICAgICAgICB0aGlzLm1faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubV9ncmF2aXR5ID0gZ3Jhdml0eTtcclxuICAgICAgICB0aGlzLm1fdXBUaW1lID0gdXBUaW1lO1xyXG4gICAgICAgIHRoaXMubV9kb3duVGltZSA9IGRvd25UaW1lO1xyXG4gICAgICAgIHRoaXMubV90b3RhbFRpbWUgPSBwZWFrWTtcclxuICAgICAgICB0aGlzLm1fdmVsb2NpdHlTdGFydCA9IG5ldyBjYy5WZWMzKGhvcml6b250YWxWZWxvY2l0eVgsIHZlcnRpY2FsVmVsb2NpdHksIGhvcml6b250YWxWZWxvY2l0eVopO1xyXG4gICAgICAgIHRoaXMubV9wb3NpdGlvbiA9IHRoaXMubV9zdGFydDtcclxuICAgICAgICB0aGlzLm1fdGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdGFydCgpOiBjYy5WZWMzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX3N0YXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5kKCk6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fZW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBncmF2aXR5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9ncmF2aXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdXBUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV91cFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkb3duVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fZG93blRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0b3RhbFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX3RvdGFsVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRvcCgpOiBjYy5WZWMzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQb3NpdGlvbih0aGlzLm1fdXBUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZlbG9jaXR5U3RhcnQoKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV92ZWxvY2l0eVN0YXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcG9zaXRpb24oKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHZlbG9jaXR5KCk6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFZlbG9jaXR5KHRoaXMubV90aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0aW1lKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDbGFtcFN0YXJ0RW5kKSB7XHJcbiAgICAgICAgICAgIG51bSA9IGNjLm1pc2MuY2xhbXBmKG51bSwgMCwgdGhpcy5tX3RvdGFsVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV90aW1lID0gbnVtO1xyXG4gICAgICAgIHRoaXMubV9wb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24obnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24odGltZTogbnVtYmVyKTogY2MuVmVjMyB7XHJcbiAgICAgICAgaWYgKHRpbWUgPT09IDApIHJldHVybiB0aGlzLm1fc3RhcnQ7XHJcbiAgICAgICAgaWYgKHRpbWUgPT09IHRoaXMubV90b3RhbFRpbWUpIHJldHVybiB0aGlzLm1fZW5kO1xyXG4gICAgICAgIGNvbnN0IGRpc3BsYWNlbWVudFk6IG51bWJlciA9IDAuNSAqIHRoaXMubV9ncmF2aXR5ICogdGltZSAqIHRpbWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9zdGFydC5hZGQodGhpcy5tX3ZlbG9jaXR5U3RhcnQuY2xvbmUoKS5tdWx0aXBseVNjYWxhcih0aW1lKSkuYWRkKG5ldyBjYy5WZWMzKDAsIGRpc3BsYWNlbWVudFksIDApKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZlbG9jaXR5KHRpbWU6IG51bWJlcik6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiB0aW1lID09PSAwID8gdGhpcy5tX3ZlbG9jaXR5U3RhcnQgOiB0aGlzLm1fdmVsb2NpdHlTdGFydC5hZGQobmV3IGNjLlZlYzMoMCwgdGhpcy5tX3ZlbG9jaXR5U3RhcnQueSArIHRoaXMubV9ncmF2aXR5ICogdGltZSwgMCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQYXJhYm9sYVBhdGggfTsiXX0=