
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GraphicsUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdyYXBoaWNzVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLElBQU0sYUFBYSxHQUFrQjtJQUNuQyxjQUFjLEVBQUUsVUFBQyxDQUFDO1FBQ2hCLElBQUksQ0FBVSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4SCxDQUFDO0lBRUQsVUFBVSxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFrQixFQUFFLENBQUM7UUFBckIsa0JBQUEsRUFBQSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSztJQUFVLENBQUM7SUFFaEQsV0FBVyxFQUFFLGNBQVEsQ0FBQztJQUN0QixjQUFjLEVBQUUsVUFBQyxDQUFDO1FBQ2hCLElBQUksQ0FBVSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0gsQ0FBQztJQUNELFdBQVcsRUFBRSxjQUFRLENBQUM7SUFDdEIsV0FBVyxFQUFFLFVBQUMsSUFBYSxFQUFFLEtBQWUsRUFBRSxJQUFhLEVBQUUsQ0FBTSxJQUFPLENBQUM7SUFDM0UsZ0JBQWdCLEVBQUUsVUFBQyxJQUFhLEVBQUUsS0FBZSxFQUFFLElBQWEsRUFBRSxDQUFNLElBQU8sQ0FBQztJQUNoRixTQUFTLEVBQUUsVUFBQyxJQUFhLEVBQUUsS0FBZSxFQUFFLElBQWEsRUFBRSxJQUFhLEVBQUUsQ0FBUyxFQUFFLENBQU0sSUFBTyxDQUFDO0lBQ25HLFlBQVksRUFBRSxjQUFRLENBQUM7SUFDdkIsVUFBVSxFQUFFLGNBQVEsQ0FBQztJQUNyQixnQkFBZ0IsRUFBRSxjQUFRLENBQUM7SUFDM0IsY0FBYyxFQUFFLGNBQVEsQ0FBQztJQUN6QixlQUFlLEVBQUUsS0FBSztJQUN0QixVQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Q0FDcEMsQ0FBQztBQUVPLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW50ZXJmYWNlIEdyYXBoaWNzVXRpbHMge1xyXG4gIGdldF9sYWJlbF9jb21wOiAodDogeyBsYWJlbD86IGNjLkxhYmVsOyBhZGRDaGlsZDogKG5vZGU6IGNjLk5vZGUsIHpJbmRleDogbnVtYmVyKSA9PiB2b2lkIH0pID0+IGNjLkxhYmVsO1xyXG4gIGRyYXdfbGFiZWw6ICh0OiBhbnksIGU6IGFueSwgYT86IGNjLkNvbG9yLCBpPzogYW55KSA9PiB2b2lkO1xyXG4gIGNsZWFyX2xhYmVsOiAoKSA9PiB2b2lkO1xyXG4gIGdldF9ncmFwaF9jb21wOiAodDogeyBncmFwaD86IGNjLkdyYXBoaWNzOyBhZGRDaGlsZDogKG5vZGU6IGNjLk5vZGUsIHpJbmRleDogbnVtYmVyKSA9PiB2b2lkIH0pID0+IGNjLkdyYXBoaWNzO1xyXG4gIGNsZWFyX2dyYXBoOiAoKSA9PiB2b2lkO1xyXG4gIGRyYXdfY2lyY2xlOiAobm9kZTogY2MuTm9kZSwgY29sb3I6IGNjLkNvbG9yLCB6ZXJvOiBjYy5WZWMzLCB0OiBhbnkpID0+IHZvaWQ7XHJcbiAgZHJhd19maWxsX2NpcmNsZTogKG5vZGU6IGNjLk5vZGUsIGNvbG9yOiBjYy5Db2xvciwgemVybzogY2MuVmVjMywgdDogYW55KSA9PiB2b2lkO1xyXG4gIGRyYXdfbGluZTogKG5vZGU6IGNjLk5vZGUsIGNvbG9yOiBjYy5Db2xvciwgemVybzogY2MuVmVjMywgdmVjMzogY2MuVmVjMywgZTogbnVtYmVyLCBjOiBhbnkpID0+IHZvaWQ7XHJcbiAgZHJhd19wb2x5Z29uOiAoKSA9PiB2b2lkO1xyXG4gIGRyYXdfYm91bmQ6ICgpID0+IHZvaWQ7XHJcbiAgZHJhd19ib3VuZF9zdGFydDogKCkgPT4gdm9pZDtcclxuICBkcmF3X2JvdW5kX2VuZDogKCkgPT4gdm9pZDtcclxuICBzaG93X2RlYnVnX2RyYXc6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmc7XHJcbiAgZmlsbF9jb2xvcjogY2MuQ29sb3I7XHJcbn1cclxuXHJcbmNvbnN0IEdyYXBoaWNzVXRpbHM6IEdyYXBoaWNzVXRpbHMgPSB7XHJcbiAgZ2V0X2xhYmVsX2NvbXA6ICh0KSA9PiB7XHJcbiAgICBsZXQgZTogY2MuTm9kZTtcclxuICAgIGxldCBhOiBjYy5MYWJlbCA9IHQubGFiZWw7XHJcbiAgICByZXR1cm4gYSB8fCAoZSA9IG5ldyBjYy5Ob2RlKFwibGFiZWxcIiksIHQubGFiZWwgPSBhID0gZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpLCB0LmFkZENoaWxkKGUsIGNjLm1hY3JvLk1BWF9aSU5ERVgpKSwgYTtcclxuICB9LFxyXG5cclxuICBkcmF3X2xhYmVsOiAodCwgZSwgYSA9IGNjLkNvbG9yLkJMQUNLLCBpKSA9PiB7IH0sXHJcblxyXG4gIGNsZWFyX2xhYmVsOiAoKSA9PiB7IH0sXHJcbiAgZ2V0X2dyYXBoX2NvbXA6ICh0KSA9PiB7XHJcbiAgICBsZXQgZTogY2MuTm9kZTtcclxuICAgIGxldCBhOiBjYy5HcmFwaGljcyA9IHQuZ3JhcGg7XHJcbiAgICByZXR1cm4gYSB8fCAoZSA9IG5ldyBjYy5Ob2RlKFwiZ3JhcGhcIiksIHQuZ3JhcGggPSBhID0gZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpLCB0LmFkZENoaWxkKGUsIGNjLm1hY3JvLk1BWF9aSU5ERVgpKSwgYTtcclxuICB9LFxyXG4gIGNsZWFyX2dyYXBoOiAoKSA9PiB7IH0sXHJcbiAgZHJhd19jaXJjbGU6IChub2RlOiBjYy5Ob2RlLCBjb2xvcjogY2MuQ29sb3IsIHplcm86IGNjLlZlYzMsIHQ6IGFueSkgPT4geyB9LFxyXG4gIGRyYXdfZmlsbF9jaXJjbGU6IChub2RlOiBjYy5Ob2RlLCBjb2xvcjogY2MuQ29sb3IsIHplcm86IGNjLlZlYzMsIHQ6IGFueSkgPT4geyB9LFxyXG4gIGRyYXdfbGluZTogKG5vZGU6IGNjLk5vZGUsIGNvbG9yOiBjYy5Db2xvciwgemVybzogY2MuVmVjMywgdmVjMzogY2MuVmVjMywgZTogbnVtYmVyLCBjOiBhbnkpID0+IHsgfSxcclxuICBkcmF3X3BvbHlnb246ICgpID0+IHsgfSxcclxuICBkcmF3X2JvdW5kOiAoKSA9PiB7IH0sXHJcbiAgZHJhd19ib3VuZF9zdGFydDogKCkgPT4geyB9LFxyXG4gIGRyYXdfYm91bmRfZW5kOiAoKSA9PiB7IH0sXHJcbiAgc2hvd19kZWJ1Z19kcmF3OiBmYWxzZSxcclxuICBmaWxsX2NvbG9yOiBjYy5jb2xvcigyNTUsIDAsIDAsIDMwKVxyXG59O1xyXG5cclxuZXhwb3J0IHsgR3JhcGhpY3NVdGlscyB9OyJdfQ==