
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/cycle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8aaaaknm/JH/r7A5s4BvGKw', 'cycle');
// start-scene/scripts/cycle.ts

function decycle(t, n) {
    var r = new WeakMap();
    return function a(e, i) {
        var t;
        var o;
        e = n !== undefined ? n(e) : e;
        if (typeof e !== "object" || e === null || e instanceof Boolean || e instanceof Date || e instanceof Number || e instanceof RegExp || e instanceof String) {
            return e;
        }
        if ((t = r.get(e)) !== undefined) {
            return { $ref: t };
        }
        r.set(e, i);
        if (Array.isArray(e)) {
            o = [];
            e.forEach(function (t, e) {
                o[e] = a(t, i + "[" + e + "]");
            });
        }
        else {
            o = {};
            Object.keys(e).forEach(function (t) {
                o[t] = a(e[t], i + "[" + JSON.stringify(t) + "]");
            });
        }
        return o;
    }(t, "$");
}
function retrocycle(value) {
    var px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;
    return function rez(value) {
        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (element, i) {
                    var path;
                    if (typeof element === "object" && element !== null) {
                        path = element.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[i] = eval(path);
                        }
                        else {
                            rez(element);
                        }
                    }
                });
            }
            else {
                Object.keys(value).forEach(function (name) {
                    var item = value[name];
                    var path;
                    if (typeof item === "object" && item !== null) {
                        path = item.$ref;
                        if (typeof path === "string" && px.test(path)) {
                            value[name] = eval(path);
                        }
                        else {
                            rez(item);
                        }
                    }
                });
            }
        }
    }(value);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXGN5Y2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsT0FBTyxDQUFJLENBQUksRUFBRSxDQUFtQjtJQUN6QyxJQUFNLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztJQUN4QyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUksRUFBRSxDQUFTO1FBQzdCLElBQUksQ0FBcUIsQ0FBQztRQUMxQixJQUFJLENBQU0sQ0FBQztRQUNYLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksTUFBTSxJQUFJLENBQUMsWUFBWSxNQUFNLElBQUksQ0FBQyxZQUFZLE1BQU0sRUFBRTtZQUN2SixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzlCLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDdEI7UUFDRCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1AsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUksRUFBRSxDQUFTO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBSyxDQUFDLFNBQUksQ0FBQyxNQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFTO2dCQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBSyxDQUFDLFNBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFVO0lBQzFCLElBQU0sRUFBRSxHQUFHLG9GQUFvRixDQUFDO0lBQ2hHLE9BQU8sU0FBUyxHQUFHLENBQUMsS0FBVTtRQUMxQixJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDcEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBWSxFQUFFLENBQVM7b0JBQ2xDLElBQUksSUFBd0IsQ0FBQztvQkFDN0IsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTt3QkFDakQsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzNDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3pCOzZCQUFNOzRCQUNILEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDaEI7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7b0JBQ3BDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsSUFBSSxJQUF3QixDQUFDO29CQUM3QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO3dCQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDakIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDNUI7NkJBQU07NEJBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNiO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNiLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkZWN5Y2xlPFQ+KHQ6IFQsIG4/OiAodmFsdWU6IFQpID0+IFQpOiBhbnkge1xyXG4gICAgY29uc3QgciA9IG5ldyBXZWFrTWFwPG9iamVjdCwgc3RyaW5nPigpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGEoZTogVCwgaTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBvOiBhbnk7XHJcbiAgICAgICAgZSA9IG4gIT09IHVuZGVmaW5lZCA/IG4oZSkgOiBlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZSAhPT0gXCJvYmplY3RcIiB8fCBlID09PSBudWxsIHx8IGUgaW5zdGFuY2VvZiBCb29sZWFuIHx8IGUgaW5zdGFuY2VvZiBEYXRlIHx8IGUgaW5zdGFuY2VvZiBOdW1iZXIgfHwgZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCBlIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHQgPSByLmdldChlKSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyAkcmVmOiB0IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHIuc2V0KGUsIGkpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGUpKSB7XHJcbiAgICAgICAgICAgIG8gPSBbXTtcclxuICAgICAgICAgICAgZS5mb3JFYWNoKCh0OiBULCBlOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIG9bZV0gPSBhKHQsIGAke2l9WyR7ZX1dYCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG8gPSB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZSkuZm9yRWFjaCgodDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvW3RdID0gYShlW3RdLCBgJHtpfVske0pTT04uc3RyaW5naWZ5KHQpfV1gKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfSh0LCBcIiRcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHJvY3ljbGUodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBweCA9IC9eXFwkKD86XFxbKD86XFxkK3xcIig/OlteXFxcXFwiXFx1MDAwMC1cXHUwMDFmXXxcXFxcKD86W1xcXFxcIlxcL2JmbnJ0XXx1WzAtOWEtekEtWl17NH0pKSpcIilcXF0pKiQvO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJleih2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKGVsZW1lbnQ6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09IFwib2JqZWN0XCIgJiYgZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gZWxlbWVudC4kcmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgcHgudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbaV0gPSBldmFsKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV6KGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHZhbHVlW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIGl0ZW0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA9IGl0ZW0uJHJlZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIHB4LnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW25hbWVdID0gZXZhbChwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJleihpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSh2YWx1ZSk7XHJcbn0iXX0=