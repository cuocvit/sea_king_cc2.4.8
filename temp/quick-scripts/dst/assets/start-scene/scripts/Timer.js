
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Timer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQUk7QUFDSjtJQUFBO1FBQ1ksY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7SUFnRHpDLENBQUM7SUE1Q0csc0JBQVcsNkJBQVU7UUFEckIsSUFBSTthQUNKO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsSUFBSTtJQUNHLHFCQUFLLEdBQVosVUFBYSxRQUF1QixFQUFFLFFBQXVCLEVBQUUsV0FBdUI7UUFBaEQseUJBQUEsRUFBQSxlQUF1QjtRQUFFLDRCQUFBLEVBQUEsZUFBdUI7UUFDbEYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO0lBQ0csb0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNwQixZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSTtJQUNJLG9CQUFJLEdBQVo7UUFBQSxpQkFhQztRQVpHLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RGLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0JBQ3hCLElBQUksS0FBSSxDQUFDLGlCQUFpQixFQUFFO29CQUN4QixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDM0QsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNmO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBQ0wsWUFBQztBQUFELENBckRBLEFBcURDLElBQUE7QUFFUSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxudHlwZSBUaW1lckNhbGxiYWNrID0gKGN1cl9jb3VudDogbnVtYmVyLCB0b3RhbF9jb3VudDogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuLy8gQFxyXG5jbGFzcyBUaW1lciB7XHJcbiAgICBwcml2YXRlIF90aW1lcl9pZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2ludGVydmFsOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfY3VyX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9pc19ydW5uaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9vbl90aW1lcl9oYW5kbGVyPzogVGltZXJDYWxsYmFjaztcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IGlzX3J1bm5pbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzX3J1bm5pbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN0YXJ0KGNhbGxiYWNrOiBUaW1lckNhbGxiYWNrLCBpbnRlcnZhbDogbnVtYmVyID0gMTAwMCwgdG90YWxfY291bnQ6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vbl90aW1lcl9oYW5kbGVyID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBpbnRlcnZhbDtcclxuICAgICAgICB0aGlzLl90b3RhbF9jb3VudCA9IHRvdGFsX2NvdW50O1xyXG4gICAgICAgIHRoaXMuX2N1cl9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5faXNfcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fb25fdGltZXJfaGFuZGxlcih0aGlzLl9jdXJfY291bnQsIHRoaXMuX3RvdGFsX2NvdW50KTtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzX3J1bm5pbmcpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fdGltZXJfaWQgPiAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcl9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyX2lkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuX2N1cl9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdG90YWxfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX29uX3RpbWVyX2hhbmRsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5faXNfcnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgbmV4dCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faXNfcnVubmluZyAmJiAodGhpcy5fdG90YWxfY291bnQgPT09IDAgfHwgdGhpcy5fY3VyX2NvdW50IDwgdGhpcy5fdG90YWxfY291bnQpKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcl9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyX2lkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb25fdGltZXJfaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cl9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uX3RpbWVyX2hhbmRsZXIodGhpcy5fY3VyX2NvdW50LCB0aGlzLl90b3RhbF9jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2ludGVydmFsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRpbWVyIH07XHJcbiJdfQ==