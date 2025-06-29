//
interface GraphicsUtils {
  get_label_comp: (t: { label?: cc.Label; addChild: (node: cc.Node, zIndex: number) => void }) => cc.Label;
  draw_label: (t: any, e: any, a?: cc.Color, i?: any) => void;
  clear_label: () => void;
  get_graph_comp: (t: { graph?: cc.Graphics; addChild: (node: cc.Node, zIndex: number) => void }) => cc.Graphics;
  clear_graph: () => void;
  draw_circle: (node: cc.Node, color: cc.Color, zero: cc.Vec3, t: any) => void;
  draw_fill_circle: (node: cc.Node, color: cc.Color, zero: cc.Vec3, t: any) => void;
  draw_line: (node: cc.Node, color: cc.Color, zero: cc.Vec3, vec3: cc.Vec3, e: number, c: any) => void;
  draw_polygon: () => void;
  draw_bound: () => void;
  draw_bound_start: () => void;
  draw_bound_end: () => void;
  show_debug_draw: boolean | number | string;
  fill_color: cc.Color;
}

const GraphicsUtils: GraphicsUtils = {
  get_label_comp: (t) => {
    let e: cc.Node;
    let a: cc.Label = t.label;
    return a || (e = new cc.Node("label"), t.label = a = e.addComponent(cc.Label), t.addChild(e, cc.macro.MAX_ZINDEX)), a;
  },

  draw_label: (t, e, a = cc.Color.BLACK, i) => { },

  clear_label: () => { },
  get_graph_comp: (t) => {
    let e: cc.Node;
    let a: cc.Graphics = t.graph;
    return a || (e = new cc.Node("graph"), t.graph = a = e.addComponent(cc.Graphics), t.addChild(e, cc.macro.MAX_ZINDEX)), a;
  },
  clear_graph: () => { },
  draw_circle: (node: cc.Node, color: cc.Color, zero: cc.Vec3, t: any) => { },
  draw_fill_circle: (node: cc.Node, color: cc.Color, zero: cc.Vec3, t: any) => { },
  draw_line: (node: cc.Node, color: cc.Color, zero: cc.Vec3, vec3: cc.Vec3, e: number, c: any) => { },
  draw_polygon: () => { },
  draw_bound: () => { },
  draw_bound_start: () => { },
  draw_bound_end: () => { },
  show_debug_draw: false,
  fill_color: cc.color(255, 0, 0, 30)
};

export { GraphicsUtils };