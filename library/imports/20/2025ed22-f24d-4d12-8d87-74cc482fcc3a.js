"use strict";
cc._RF.push(module, '2025e0i8k1NEo2HdMxIL8w6', 'Timer');
// start-scene/scripts/Timer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
// @
var Timer = /** @class */ (function () {
    function Timer() {
        this._timer_id = 0;
        this._interval = 0;
        this._cur_count = 0;
        this._total_count = 0;
        this._is_running = false;
    }
    Object.defineProperty(Timer.prototype, "is_running", {
        // @
        get: function () {
            return this._is_running;
        },
        enumerable: false,
        configurable: true
    });
    // @
    Timer.prototype.start = function (callback, interval, total_count) {
        if (interval === void 0) { interval = 1000; }
        if (total_count === void 0) { total_count = 0; }
        this._on_timer_handler = callback;
        this._interval = interval;
        this._total_count = total_count;
        this._cur_count = 0;
        this._is_running = true;
        this._on_timer_handler(this._cur_count, this._total_count);
        this.next();
    };
    // @
    Timer.prototype.stop = function () {
        if (!this._is_running)
            return;
        if (this._timer_id > 0) {
            clearTimeout(this._timer_id);
            this._timer_id = 0;
        }
        this._interval = 0;
        this._cur_count = 0;
        this._total_count = 0;
        this._on_timer_handler = undefined;
        this._is_running = false;
    };
    // @
    Timer.prototype.next = function () {
        var _this = this;
        if (this._is_running && (this._total_count === 0 || this._cur_count < this._total_count)) {
            clearTimeout(this._timer_id);
            this._timer_id = setTimeout(function () {
                if (_this._on_timer_handler) {
                    _this._cur_count++;
                    _this._on_timer_handler(_this._cur_count, _this._total_count);
                    _this.next();
                }
            }, this._interval);
        }
        else {
            this.stop();
        }
    };
    return Timer;
}());
exports.Timer = Timer;

cc._RF.pop();