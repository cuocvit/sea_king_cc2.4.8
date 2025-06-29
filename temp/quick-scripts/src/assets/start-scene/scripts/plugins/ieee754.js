"use strict";
cc._RF.push(module, 'b3e2dRvATpEWJkFH9iirRBF', 'ieee754');
// start-scene/scripts/plugins/ieee754.js

"use strict";

var t = require;
var e = module;
var a = exports;
!function (t, e, a) {
  a.read = function (t, e, a, i, o) {
    var n,
        r,
        s = 8 * o - i - 1,
        c = (1 << s) - 1,
        l = c >> 1,
        _ = -7,
        d = a ? o - 1 : 0,
        p = a ? -1 : 1,
        a = t[e + d];

    for (d += p, n = a & (1 << -_) - 1, a >>= -_, _ += s; 0 < _; n = 256 * n + t[e + d], d += p, _ -= 8) {
      ;
    }

    for (r = n & (1 << -_) - 1, n >>= -_, _ += i; 0 < _; r = 256 * r + t[e + d], d += p, _ -= 8) {
      ;
    }

    if (0 === n) n = 1 - l;else {
      if (n === c) return r ? NaN : 1 / 0 * (a ? -1 : 1);
      r += Math.pow(2, i), n -= l;
    }
    return (a ? -1 : 1) * r * Math.pow(2, n - i);
  }, a.write = function (t, e, a, i, o, n) {
    var r,
        s,
        c = 8 * n - o - 1,
        l = (1 << c) - 1,
        _ = l >> 1,
        d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = i ? 0 : n - 1,
        h = i ? 1 : -1,
        n = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, r = l) : (r = Math.floor(Math.log(e) / Math.LN2), e * (i = Math.pow(2, -r)) < 1 && (r--, i *= 2), 2 <= (e += 1 <= r + _ ? d / i : d * Math.pow(2, 1 - _)) * i && (r++, i /= 2), l <= r + _ ? (s = 0, r = l) : 1 <= r + _ ? (s = (e * i - 1) * Math.pow(2, o), r += _) : (s = e * Math.pow(2, _ - 1) * Math.pow(2, o), r = 0)); 8 <= o; t[a + p] = 255 & s, p += h, s /= 256, o -= 8) {
      ;
    }

    for (r = r << o | s, c += o; 0 < c; t[a + p] = 255 & r, p += h, r /= 256, c -= 8) {
      ;
    }

    t[a + p - h] |= 128 * n;
  };
};

cc._RF.pop();