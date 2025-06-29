
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MvcEventDispatcher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9900i/1dlKh5dqBQq4QenY', 'MvcEventDispatcher');
// start-scene/scripts/MvcEventDispatcher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MvcEventDispatcher = void 0;
//
var EventDispatcher_1 = require("./EventDispatcher");
var MvcEventDispatcher = (function () {
    var _DISPATCHERS_DIC = {};
    var dispatchEvent = function (eventName, event) {
        if (eventName) {
            this.getInstance(eventName).dispatchEvent(event);
        }
        else {
            for (var key in _DISPATCHERS_DIC) {
                _DISPATCHERS_DIC[key].dispatchEvent(event);
            }
        }
    };
    var getInstance = function (key) {
        if (_DISPATCHERS_DIC[key] == null) {
            _DISPATCHERS_DIC[key] = new EventDispatcher_1.EventDispatcher();
        }
        return _DISPATCHERS_DIC[key];
    };
    return {
        dispatchEvent: dispatchEvent,
        getInstance: getInstance,
        _DISPATCHERS_DIC: _DISPATCHERS_DIC
    };
})();
exports.MvcEventDispatcher = MvcEventDispatcher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE12Y0V2ZW50RGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YscURBQW9EO0FBUXBELElBQU0sa0JBQWtCLEdBQXVCLENBQUM7SUFDNUMsSUFBTSxnQkFBZ0IsR0FBdUMsRUFBRSxDQUFDO0lBRWhFLElBQU0sYUFBYSxHQUFHLFVBQVMsU0FBaUIsRUFBRSxLQUFlO1FBQzdELElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNILEtBQUssSUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ2hDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QztTQUNKO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsSUFBTSxXQUFXLEdBQUcsVUFBUyxHQUFXO1FBQ3BDLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQy9CLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixPQUFPO1FBQ0gsYUFBYSxlQUFBO1FBQ2IsV0FBVyxhQUFBO1FBQ1gsZ0JBQWdCLGtCQUFBO0tBQ25CLENBQUM7QUFDTixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi9FdmVudERpc3BhdGNoZXInO1xyXG5cclxuaW50ZXJmYWNlIE12Y0V2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBkaXNwYXRjaEV2ZW50OiAoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpID0+IHZvaWQ7XHJcbiAgICBnZXRJbnN0YW5jZTogKGtleTogc3RyaW5nKSA9PiBFdmVudERpc3BhdGNoZXI7XHJcbn1cclxuXHJcblxyXG5jb25zdCBNdmNFdmVudERpc3BhdGNoZXI6IE12Y0V2ZW50RGlzcGF0Y2hlciA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IF9ESVNQQVRDSEVSU19ESUM6IHsgW2tleTogc3RyaW5nXTogRXZlbnREaXNwYXRjaGVyIH0gPSB7fTtcclxuXHJcbiAgICBjb25zdCBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRJbnN0YW5jZShldmVudE5hbWUpLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIF9ESVNQQVRDSEVSU19ESUMpIHtcclxuICAgICAgICAgICAgICAgIF9ESVNQQVRDSEVSU19ESUNba2V5XS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXk6IHN0cmluZyk6IEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgaWYgKF9ESVNQQVRDSEVSU19ESUNba2V5XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIF9ESVNQQVRDSEVSU19ESUNba2V5XSA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9ESVNQQVRDSEVSU19ESUNba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkaXNwYXRjaEV2ZW50LFxyXG4gICAgICAgIGdldEluc3RhbmNlLFxyXG4gICAgICAgIF9ESVNQQVRDSEVSU19ESUNcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBNdmNFdmVudERpc3BhdGNoZXIgfTsiXX0=