"use strict";
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