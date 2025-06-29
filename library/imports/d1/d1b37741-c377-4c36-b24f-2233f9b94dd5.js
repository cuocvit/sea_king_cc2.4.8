"use strict";
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