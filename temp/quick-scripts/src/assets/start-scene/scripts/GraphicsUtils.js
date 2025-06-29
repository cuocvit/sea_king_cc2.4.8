"use strict";
cc._RF.push(module, 'e646cZi9n1CLYOI0oqxzqGi', 'GraphicsUtils');
// start-scene/scripts/GraphicsUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicsUtils = void 0;
var GraphicsUtils = {
    get_label_comp: function (t) {
        var e;
        var a = t.label;
        return a || (e = new cc.Node("label"), t.label = a = e.addComponent(cc.Label), t.addChild(e, cc.macro.MAX_ZINDEX)), a;
    },
    draw_label: function (t, e, a, i) {
        if (a === void 0) { a = cc.Color.BLACK; }
    },
    clear_label: function () { },
    get_graph_comp: function (t) {
        var e;
        var a = t.graph;
        return a || (e = new cc.Node("graph"), t.graph = a = e.addComponent(cc.Graphics), t.addChild(e, cc.macro.MAX_ZINDEX)), a;
    },
    clear_graph: function () { },
    draw_circle: function (node, color, zero, t) { },
    draw_fill_circle: function (node, color, zero, t) { },
    draw_line: function (node, color, zero, vec3, e, c) { },
    draw_polygon: function () { },
    draw_bound: function () { },
    draw_bound_start: function () { },
    draw_bound_end: function () { },
    show_debug_draw: false,
    fill_color: cc.color(255, 0, 0, 30)
};
exports.GraphicsUtils = GraphicsUtils;

cc._RF.pop();