"use strict";
cc._RF.push(module, '89eeeEbNlRAv42IxyziWJpe', 'base64-js');
// start-scene/scripts/plugins/base64-js.js

"use strict";

var t = require;
var e = module;
var a = exports;
!function (t, e, a) {
  "use strict";

  a.byteLength = function (t) {
    var e = _(t);

    return 3 * ((t = e[0]) + (e = e[1])) / 4 - e;
  }, a.toByteArray = function (t) {
    for (var e, a = (i = _(t))[0], i = i[1], o = new l(3 * (a + i) / 4 - i), n = 0, r = 0 < i ? a - 4 : a, s = 0; s < r; s += 4) {
      e = c[t.charCodeAt(s)] << 18 | c[t.charCodeAt(s + 1)] << 12 | c[t.charCodeAt(s + 2)] << 6 | c[t.charCodeAt(s + 3)], o[n++] = e >> 16 & 255, o[n++] = e >> 8 & 255, o[n++] = 255 & e;
    }

    return 2 === i && (e = c[t.charCodeAt(s)] << 2 | c[t.charCodeAt(s + 1)] >> 4, o[n++] = 255 & e), 1 === i && (e = c[t.charCodeAt(s)] << 10 | c[t.charCodeAt(s + 1)] << 4 | c[t.charCodeAt(s + 2)] >> 2, o[n++] = e >> 8 & 255, o[n++] = 255 & e), o;
  }, a.fromByteArray = function (t) {
    for (var e, a = t.length, i = a % 3, o = [], n = 0, r = a - i; n < r; n += 16383) {
      o.push(function (t, e) {
        for (var a, i = [], o = n; o < e; o += 3) {
          a = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), i.push(s[a >> 18 & 63] + s[a >> 12 & 63] + s[a >> 6 & 63] + s[63 & a]);
        }

        return i.join("");
      }(t, r < n + 16383 ? r : n + 16383));
    }

    return 1 == i ? (e = t[a - 1], o.push(s[e >> 2] + s[e << 4 & 63] + "==")) : 2 == i && (e = (t[a - 2] << 8) + t[a - 1], o.push(s[e >> 10] + s[e >> 4 & 63] + s[e << 2 & 63] + "=")), o.join("");
  };

  for (var s = [], c = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, n = i.length; o < n; ++o) {
    s[o] = i[o], c[i.charCodeAt(o)] = o;
  }

  function _(t) {
    var e = t.length;
    if (0 < e % 4) throw new Error("Invalid string. Length must be a multiple of 4");
    return [t = -1 === (t = t.indexOf("=")) ? e : t, t === e ? 0 : 4 - t % 4];
  }

  c["-".charCodeAt(0)] = 62, c["_".charCodeAt(0)] = 63;
};

cc._RF.pop();