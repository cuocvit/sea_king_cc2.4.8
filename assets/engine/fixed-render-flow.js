var t; - 1 < ["2.4.0", "2.4.1", "2.4.2", "2.4.3", "2.4.4", "2.4.5"].indexOf(cc.ENGINE_VERSION) && (console.log("应用修复Uncaught TypeError: Cannot read property '_assembler' of null问题的补丁"), (t = cc.RenderFlow.prototype)._updateRenderData, t._updateRenderData = function(e) {
    var n = e._renderComponent;
    n && (n._assembler.updateRenderData(n), e._renderFlag &= ~cc.RenderFlow.FLAG_UPDATE_RENDER_DATA), this._next._func(e)
}, t._render, t._render = function(e) {
    var n, r = e._renderComponent;
    r && (n = cc.RenderFlow.getBachther(), r._checkBacth(n, e._cullingMask), r._assembler.fillBuffers(r, n)), this._next._func(e)
}, t._postRender, t._postRender = function(e) {
    var n, r = e._renderComponent;
    r && (n = cc.RenderFlow.getBachther(), r._checkBacth(n, e._cullingMask), r._assembler.postFillBuffers(r, n)), this._next._func(e)
}, t._draw, t._draw = function(e, n) {
    var r = cc.RenderFlow.getBachther(),
        t = r._device._ctx,
        r = r._camera;
    t.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty), t.scale(1, -1);
    r = e._renderComponent;
    r && r._assembler[n](t, r), this._next._func(e)
})