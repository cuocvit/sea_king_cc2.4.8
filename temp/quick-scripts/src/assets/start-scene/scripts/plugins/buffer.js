"use strict";
cc._RF.push(module, 'ad57b9Vza5JA6xlHzWK0/dv', 'buffer');
// start-scene/scripts/plugins/buffer.js

"use strict";

var e = require;
var t = module;
var P = exports;
!function (t) {
  "use strict";

  var r = e("base64-js"),
      n = e("ieee754"),
      s = e("isarray");

  function a() {
    return d.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }

  function o(t, e) {
    if (a() < e) throw new RangeError("Invalid typed array length");
    return d.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = d.prototype : (t = null === t ? new d(e) : t).length = e, t;
  }

  function d(t, e, a) {
    if (!(d.TYPED_ARRAY_SUPPORT || this instanceof d)) return new d(t, e, a);
    if ("number" != typeof t) return i(this, t, e, a);
    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
    return l(this, t);
  }

  function i(t, e, a, i) {
    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, a, i) {
      if (e.byteLength, a < 0 || e.byteLength < a) throw new RangeError("'offset' is out of bounds");
      if (e.byteLength < a + (i || 0)) throw new RangeError("'length' is out of bounds");
      return e = void 0 === a && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e, a) : new Uint8Array(e, a, i), d.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = d.prototype : t = _(t, e), t;
    }(t, e, a, i) : "string" == typeof e ? function (t, e, a) {
      if (!d.isEncoding(a = "string" != typeof a || "" === a ? "utf8" : a)) throw new TypeError('"encoding" must be a valid string encoding');
      var i = 0 | h(e, a);
      return (a = (t = o(t, i)).write(e, a)) !== i ? t.slice(0, a) : t;
    }(t, e, a) : function (t, e) {
      if (d.isBuffer(e)) {
        var a = 0 | p(e.length);
        return 0 === (t = o(t, a)).length || e.copy(t, 0, 0, a), t;
      }

      if (e) {
        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (a = e.length) != a ? o(t, 0) : _(t, e);
        if ("Buffer" === e.type && s(e.data)) return _(t, e.data);
      }

      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }(t, e);
  }

  function c(t) {
    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
    if (t < 0) throw new RangeError('"size" argument must not be negative');
  }

  function l(t, e) {
    if (c(e), t = o(t, e < 0 ? 0 : 0 | p(e)), !d.TYPED_ARRAY_SUPPORT) for (var a = 0; a < e; ++a) {
      t[a] = 0;
    }
    return t;
  }

  function _(t, e) {
    var a = e.length < 0 ? 0 : 0 | p(e.length);
    t = o(t, a);

    for (var i = 0; i < a; i += 1) {
      t[i] = 255 & e[i];
    }

    return t;
  }

  function p(t) {
    if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
    return 0 | t;
  }

  function h(t, e) {
    if (d.isBuffer(t)) return t.length;
    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
    var a = (t = "string" != typeof t ? "" + t : t).length;
    if (0 === a) return 0;

    for (var i = !1;;) {
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return a;

        case "utf8":
        case "utf-8":
        case void 0:
          return A(t).length;

        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * a;

        case "hex":
          return a >>> 1;

        case "base64":
          return O(t).length;

        default:
          if (i) return A(t).length;
          e = ("" + e).toLowerCase(), i = !0;
      }
    }
  }

  function u(t, e, a) {
    var i = t[e];
    t[e] = t[a], t[a] = i;
  }

  function m(t, e, a, i, o) {
    if (0 === t.length) return -1;

    if ("string" == typeof a ? (i = a, a = 0) : 2147483647 < a ? a = 2147483647 : a < -2147483648 && (a = -2147483648), a = +a, (a = (a = isNaN(a) ? o ? 0 : t.length - 1 : a) < 0 ? t.length + a : a) >= t.length) {
      if (o) return -1;
      a = t.length - 1;
    } else if (a < 0) {
      if (!o) return -1;
      a = 0;
    }

    if ("string" == typeof e && (e = d.from(e, i)), d.isBuffer(e)) return 0 === e.length ? -1 : g(t, e, a, i, o);
    if ("number" == typeof e) return e &= 255, d.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (o ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(t, e, a) : g(t, [e], a, i, o);
    throw new TypeError("val must be string, number or Buffer");
  }

  function g(t, e, a, i, o) {
    var n = 1,
        r = t.length,
        s = e.length;

    if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
      if (t.length < 2 || e.length < 2) return -1;
      r /= n = 2, s /= 2, a /= 2;
    }

    function c(t, e) {
      return 1 === n ? t[e] : t.readUInt16BE(e * n);
    }

    if (o) for (var l = -1, _ = a; _ < r; _++) {
      if (c(t, _) === c(e, -1 === l ? 0 : _ - l)) {
        if (_ - (l = -1 === l ? _ : l) + 1 === s) return l * n;
      } else -1 !== l && (_ -= _ - l), l = -1;
    } else for (_ = a = r < a + s ? r - s : a; 0 <= _; _--) {
      for (var d = !0, p = 0; p < s; p++) {
        if (c(t, _ + p) !== c(e, p)) {
          d = !1;
          break;
        }
      }

      if (d) return _;
    }
    return -1;
  }

  function f(t, e, a, i) {
    return S(function (t) {
      for (var e = [], a = 0; a < t.length; ++a) {
        e.push(255 & t.charCodeAt(a));
      }

      return e;
    }(e), t, a, i);
  }

  function y(t, e, a) {
    a = Math.min(t.length, a);

    for (var i = [], o = e; o < a;) {
      var n,
          r,
          s,
          c,
          l = t[o],
          _ = null,
          d = 239 < l ? 4 : 223 < l ? 3 : 191 < l ? 2 : 1;
      if (o + d <= a) switch (d) {
        case 1:
          l < 128 && (_ = l);
          break;

        case 2:
          128 == (192 & (n = t[o + 1])) && 127 < (c = (31 & l) << 6 | 63 & n) && (_ = c);
          break;

        case 3:
          n = t[o + 1], r = t[o + 2], 128 == (192 & n) && 128 == (192 & r) && 2047 < (c = (15 & l) << 12 | (63 & n) << 6 | 63 & r) && (c < 55296 || 57343 < c) && (_ = c);
          break;

        case 4:
          n = t[o + 1], r = t[o + 2], s = t[o + 3], 128 == (192 & n) && 128 == (192 & r) && 128 == (192 & s) && 65535 < (c = (15 & l) << 18 | (63 & n) << 12 | (63 & r) << 6 | 63 & s) && c < 1114112 && (_ = c);
      }
      null === _ ? (_ = 65533, d = 1) : 65535 < _ && (_ -= 65536, i.push(_ >>> 10 & 1023 | 55296), _ = 56320 | 1023 & _), i.push(_), o += d;
    }

    return function (t) {
      var e = t.length;
      if (e <= v) return String.fromCharCode.apply(String, t);

      for (var a = "", i = 0; i < e;) {
        a += String.fromCharCode.apply(String, t.slice(i, i += v));
      }

      return a;
    }(i);
  }

  P.Buffer = d, P.SlowBuffer = function (t) {
    return d.alloc(+(t = +t != t ? 0 : t));
  }, P.INSPECT_MAX_BYTES = 50, d.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
    try {
      var t = new Uint8Array(1);
      return t.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function foo() {
          return 42;
        }
      }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
    } catch (t) {
      return !1;
    }
  }(), P.kMaxLength = a(), d.poolSize = 8192, d._augment = function (t) {
    return t.__proto__ = d.prototype, t;
  }, d.from = function (t, e, a) {
    return i(null, t, e, a);
  }, d.TYPED_ARRAY_SUPPORT && (d.prototype.__proto__ = Uint8Array.prototype, d.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && d[Symbol.species] === d && Object.defineProperty(d, Symbol.species, {
    value: null,
    configurable: !0
  })), d.alloc = function (t, e, a) {
    return c(t), t <= 0 || void 0 === e ? o(null, t) : "string" == typeof a ? o(null, t).fill(e, a) : o(null, t).fill(e);
  }, d.allocUnsafe = function (t) {
    return l(null, t);
  }, d.allocUnsafeSlow = function (t) {
    return l(null, t);
  }, d.isBuffer = function (t) {
    return !(null == t || !t._isBuffer);
  }, d.compare = function (t, e) {
    if (!d.isBuffer(t) || !d.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
    if (t === e) return 0;

    for (var a = t.length, i = e.length, o = 0, n = Math.min(a, i); o < n; ++o) {
      if (t[o] !== e[o]) {
        a = t[o], i = e[o];
        break;
      }
    }

    return a < i ? -1 : i < a ? 1 : 0;
  }, d.isEncoding = function (t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;

      default:
        return !1;
    }
  }, d.concat = function (t, e) {
    if (!s(t)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t.length) return d.alloc(0);
    if (void 0 === e) for (o = e = 0; o < t.length; ++o) {
      e += t[o].length;
    }

    for (var a = d.allocUnsafe(e), i = 0, o = 0; o < t.length; ++o) {
      var n = t[o];
      if (!d.isBuffer(n)) throw new TypeError('"list" argument must be an Array of Buffers');
      n.copy(a, i), i += n.length;
    }

    return a;
  }, d.byteLength = h, d.prototype._isBuffer = !0, d.prototype.swap16 = function () {
    var t = this.length;
    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

    for (var e = 0; e < t; e += 2) {
      u(this, e, e + 1);
    }

    return this;
  }, d.prototype.swap32 = function () {
    var t = this.length;
    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

    for (var e = 0; e < t; e += 4) {
      u(this, e, e + 3), u(this, e + 1, e + 2);
    }

    return this;
  }, d.prototype.swap64 = function () {
    var t = this.length;
    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

    for (var e = 0; e < t; e += 8) {
      u(this, e, e + 7), u(this, e + 1, e + 6), u(this, e + 2, e + 5), u(this, e + 3, e + 4);
    }

    return this;
  }, d.prototype.toString = function () {
    var t = 0 | this.length;
    return 0 == t ? "" : 0 === arguments.length ? y(this, 0, t) : function (t, e, a) {
      var i,
          o,
          n = !1;
      if ((e = void 0 === e || e < 0 ? 0 : e) > this.length) return "";
      if ((a = void 0 === a || a > this.length ? this.length : a) <= 0) return "";
      if ((a >>>= 0) <= (e >>>= 0)) return "";

      for (t = t || "utf8";;) {
        switch (t) {
          case "hex":
            return function (t, e, a) {
              var i,
                  o = t.length;
              (!a || a < 0 || o < a) && (a = o);

              for (var n = "", r = e = !e || e < 0 ? 0 : e; r < a; ++r) {
                n += (i = t[r]) < 16 ? "0" + i.toString(16) : i.toString(16);
              }

              return n;
            }(this, e, a);

          case "utf8":
          case "utf-8":
            return y(this, e, a);

          case "ascii":
            return function (t, e, a) {
              var i = "";
              a = Math.min(t.length, a);

              for (var o = e; o < a; ++o) {
                i += String.fromCharCode(127 & t[o]);
              }

              return i;
            }(this, e, a);

          case "latin1":
          case "binary":
            return function (t, e, a) {
              var i = "";
              a = Math.min(t.length, a);

              for (var o = e; o < a; ++o) {
                i += String.fromCharCode(t[o]);
              }

              return i;
            }(this, e, a);

          case "base64":
            return o = a, 0 === (i = e) && o === this.length ? r.fromByteArray(this) : r.fromByteArray(this.slice(i, o));

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return function (t, e, a) {
              for (var i = t.slice(e, a), o = "", n = 0; n < i.length; n += 2) {
                o += String.fromCharCode(i[n] + 256 * i[n + 1]);
              }

              return o;
            }(this, e, a);

          default:
            if (n) throw new TypeError("Unknown encoding: " + t);
            t = (t + "").toLowerCase(), n = !0;
        }
      }
    }.apply(this, arguments);
  }, d.prototype.equals = function (t) {
    if (!d.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
    return this === t || 0 === d.compare(this, t);
  }, d.prototype.inspect = function () {
    var t = "",
        e = P.INSPECT_MAX_BYTES;
    return 0 < this.length && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">";
  }, d.prototype.compare = function (t, e, a, i, o) {
    if (!d.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
    if (void 0 === a && (a = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), (e = void 0 === e ? 0 : e) < 0 || a > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
    if (o <= i && a <= e) return 0;
    if (o <= i) return -1;
    if (a <= e) return 1;
    if (this === t) return 0;

    for (var n = (o >>>= 0) - (i >>>= 0), r = (a >>>= 0) - (e >>>= 0), s = Math.min(n, r), c = this.slice(i, o), l = t.slice(e, a), _ = 0; _ < s; ++_) {
      if (c[_] !== l[_]) {
        n = c[_], r = l[_];
        break;
      }
    }

    return n < r ? -1 : r < n ? 1 : 0;
  }, d.prototype.includes = function (t, e, a) {
    return -1 !== this.indexOf(t, e, a);
  }, d.prototype.indexOf = function (t, e, a) {
    return m(this, t, e, a, !0);
  }, d.prototype.lastIndexOf = function (t, e, a) {
    return m(this, t, e, a, !1);
  }, d.prototype.write = function (t, s, e, a) {
    if (void 0 === s) a = "utf8", e = this.length, s = 0;else if (void 0 === e && "string" == typeof s) a = s, e = this.length, s = 0;else {
      if (!isFinite(s)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      s |= 0, isFinite(e) ? (e |= 0, void 0 === a && (a = "utf8")) : (a = e, e = void 0);
    }
    var i = this.length - s;
    if ((void 0 === e || i < e) && (e = i), 0 < t.length && (e < 0 || s < 0) || s > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    a = a || "utf8";

    for (var o, n, r, c, l, _, d = !1;;) {
      switch (a) {
        case "hex":
          return function (t, e, a, i) {
            a = Number(s) || 0;
            var o = t.length - a;
            if ((!i || (i = Number(i)) > o) && (i = o), (o = e.length) % 2 != 0) throw new TypeError("Invalid hex string");
            o / 2 < i && (i = o / 2);

            for (var n = 0; n < i; ++n) {
              var r = parseInt(e.substr(2 * n, 2), 16);
              if (isNaN(r)) return n;
              t[a + n] = r;
            }

            return n;
          }(this, t, 0, e);

        case "utf8":
        case "utf-8":
          return n = s, r = e, S(A(t, (o = this).length - n), o, n, r);

        case "ascii":
          return f(this, t, s, e);

        case "latin1":
        case "binary":
          return f(this, t, s, e);

        case "base64":
          return o = this, n = s, r = e, S(O(t), o, n, r);

        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return l = s, _ = e, S(function (t, e) {
            for (var a, i, o = [], n = 0; n < t.length && !((e -= 2) < 0); ++n) {
              a = (i = t.charCodeAt(n)) >> 8, o.push(i %= 256), o.push(a);
            }

            return o;
          }(t, (c = this).length - l), c, l, _);

        default:
          if (d) throw new TypeError("Unknown encoding: " + a);
          a = ("" + a).toLowerCase(), d = !0;
      }
    }
  }, d.prototype.toJSON = function () {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  var v = 4096;

  function D(t, e, a) {
    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
    if (a < t + e) throw new RangeError("Trying to access beyond buffer length");
  }

  function I(t, e, a, i, o, n) {
    if (!d.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (o < e || e < n) throw new RangeError('"value" argument is out of bounds');
    if (a + i > t.length) throw new RangeError("Index out of range");
  }

  function E(t, e, a, i) {
    e < 0 && (e = 65535 + e + 1);

    for (var o = 0, n = Math.min(t.length - a, 2); o < n; ++o) {
      t[a + o] = (e & 255 << 8 * (i ? o : 1 - o)) >>> 8 * (i ? o : 1 - o);
    }
  }

  function C(t, e, a, i) {
    e < 0 && (e = 4294967295 + e + 1);

    for (var o = 0, n = Math.min(t.length - a, 4); o < n; ++o) {
      t[a + o] = e >>> 8 * (i ? o : 3 - o) & 255;
    }
  }

  function T(t, e, a, i) {
    if (a + i > t.length) throw new RangeError("Index out of range");
    if (a < 0) throw new RangeError("Index out of range");
  }

  function b(t, e, a, i, o) {
    return o || T(t, 0, a, 4), n.write(t, e, a, i, 23, 4), a + 4;
  }

  function w(t, e, a, i, o) {
    return o || T(t, 0, a, 8), n.write(t, e, a, i, 52, 8), a + 8;
  }

  d.prototype.slice = function (t, e) {
    var a = this.length;
    if ((t = ~~t) < 0 ? (t += a) < 0 && (t = 0) : a < t && (t = a), (e = void 0 === e ? a : ~~e) < 0 ? (e += a) < 0 && (e = 0) : a < e && (e = a), e < t && (e = t), d.TYPED_ARRAY_SUPPORT) (o = this.subarray(t, e)).__proto__ = d.prototype;else for (var i = e - t, o = new d(i, void 0), n = 0; n < i; ++n) {
      o[n] = this[n + t];
    }
    return o;
  }, d.prototype.readUIntLE = function (t, e, a) {
    t |= 0, e |= 0, a || D(t, e, this.length);

    for (var i = this[t], o = 1, n = 0; ++n < e && (o *= 256);) {
      i += this[t + n] * o;
    }

    return i;
  }, d.prototype.readUIntBE = function (t, e, a) {
    t |= 0, e |= 0, a || D(t, e, this.length);

    for (var i = this[t + --e], o = 1; 0 < e && (o *= 256);) {
      i += this[t + --e] * o;
    }

    return i;
  }, d.prototype.readUInt8 = function (t, e) {
    return e || D(t, 1, this.length), this[t];
  }, d.prototype.readUInt16LE = function (t, e) {
    return e || D(t, 2, this.length), this[t] | this[t + 1] << 8;
  }, d.prototype.readUInt16BE = function (t, e) {
    return e || D(t, 2, this.length), this[t] << 8 | this[t + 1];
  }, d.prototype.readUInt32LE = function (t, e) {
    return e || D(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
  }, d.prototype.readUInt32BE = function (t, e) {
    return e || D(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  }, d.prototype.readIntLE = function (t, e, a) {
    t |= 0, e |= 0, a || D(t, e, this.length);

    for (var i = this[t], o = 1, n = 0; ++n < e && (o *= 256);) {
      i += this[t + n] * o;
    }

    return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
  }, d.prototype.readIntBE = function (t, e, a) {
    t |= 0, e |= 0, a || D(t, e, this.length);

    for (var i = e, o = 1, n = this[t + --i]; 0 < i && (o *= 256);) {
      n += this[t + --i] * o;
    }

    return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
  }, d.prototype.readInt8 = function (t, e) {
    return e || D(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
  }, d.prototype.readInt16LE = function (t, e) {
    return e || D(t, 2, this.length), 32768 & (t = this[t] | this[t + 1] << 8) ? 4294901760 | t : t;
  }, d.prototype.readInt16BE = function (t, e) {
    return e || D(t, 2, this.length), 32768 & (t = this[t + 1] | this[t] << 8) ? 4294901760 | t : t;
  }, d.prototype.readInt32LE = function (t, e) {
    return e || D(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  }, d.prototype.readInt32BE = function (t, e) {
    return e || D(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  }, d.prototype.readFloatLE = function (t, e) {
    return e || D(t, 4, this.length), n.read(this, t, !0, 23, 4);
  }, d.prototype.readFloatBE = function (t, e) {
    return e || D(t, 4, this.length), n.read(this, t, !1, 23, 4);
  }, d.prototype.readDoubleLE = function (t, e) {
    return e || D(t, 8, this.length), n.read(this, t, !0, 52, 8);
  }, d.prototype.readDoubleBE = function (t, e) {
    return e || D(t, 8, this.length), n.read(this, t, !1, 52, 8);
  }, d.prototype.writeUIntLE = function (t, e, a, i) {
    t = +t, e |= 0, a |= 0, i || I(this, t, e, a, Math.pow(2, 8 * a) - 1, 0);
    var o = 1,
        n = 0;

    for (this[e] = 255 & t; ++n < a && (o *= 256);) {
      this[e + n] = t / o & 255;
    }

    return e + a;
  }, d.prototype.writeUIntBE = function (t, e, a, i) {
    t = +t, e |= 0, a |= 0, i || I(this, t, e, a, Math.pow(2, 8 * a) - 1, 0);
    var o = a - 1,
        n = 1;

    for (this[e + o] = 255 & t; 0 <= --o && (n *= 256);) {
      this[e + o] = t / n & 255;
    }

    return e + a;
  }, d.prototype.writeUInt8 = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 1, 255, 0), d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
  }, d.prototype.writeUInt16LE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : E(this, t, e, !0), e + 2;
  }, d.prototype.writeUInt16BE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : E(this, t, e, !1), e + 2;
  }, d.prototype.writeUInt32LE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : C(this, t, e, !0), e + 4;
  }, d.prototype.writeUInt32BE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4;
  }, d.prototype.writeIntLE = function (t, e, a, i) {
    t = +t, e |= 0, i || I(this, t, e, a, (i = Math.pow(2, 8 * a - 1)) - 1, -i);
    var o = 0,
        n = 1,
        r = 0;

    for (this[e] = 255 & t; ++o < a && (n *= 256);) {
      t < 0 && 0 === r && 0 !== this[e + o - 1] && (r = 1), this[e + o] = (t / n >> 0) - r & 255;
    }

    return e + a;
  }, d.prototype.writeIntBE = function (t, e, a, i) {
    t = +t, e |= 0, i || I(this, t, e, a, (i = Math.pow(2, 8 * a - 1)) - 1, -i);
    var o = a - 1,
        n = 1,
        r = 0;

    for (this[e + o] = 255 & t; 0 <= --o && (n *= 256);) {
      t < 0 && 0 === r && 0 !== this[e + o + 1] && (r = 1), this[e + o] = (t / n >> 0) - r & 255;
    }

    return e + a;
  }, d.prototype.writeInt8 = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 1, 127, -128), d.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & (t = t < 0 ? 255 + t + 1 : t), e + 1;
  }, d.prototype.writeInt16LE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : E(this, t, e, !0), e + 2;
  }, d.prototype.writeInt16BE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : E(this, t, e, !1), e + 2;
  }, d.prototype.writeInt32LE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 4, 2147483647, -2147483648), d.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : C(this, t, e, !0), e + 4;
  }, d.prototype.writeInt32BE = function (t, e, a) {
    return t = +t, e |= 0, a || I(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), d.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : C(this, t, e, !1), e + 4;
  }, d.prototype.writeFloatLE = function (t, e, a) {
    return b(this, t, e, !0, a);
  }, d.prototype.writeFloatBE = function (t, e, a) {
    return b(this, t, e, !1, a);
  }, d.prototype.writeDoubleLE = function (t, e, a) {
    return w(this, t, e, !0, a);
  }, d.prototype.writeDoubleBE = function (t, e, a) {
    return w(this, t, e, !1, a);
  }, d.prototype.copy = function (t, e, a, i) {
    if (a = a || 0, i || 0 === i || (i = this.length), e >= t.length && (e = t.length), (i = 0 < i && i < a ? a : i) === a) return 0;
    if (0 === t.length || 0 === this.length) return 0;
    if ((e = e || 0) < 0) throw new RangeError("targetStart out of bounds");
    if (a < 0 || a >= this.length) throw new RangeError("sourceStart out of bounds");
    if (i < 0) throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length);
    var o,
        n = (i = t.length - e < i - a ? t.length - e + a : i) - a;
    if (this === t && a < e && e < i) for (o = n - 1; 0 <= o; --o) {
      t[o + e] = this[o + a];
    } else if (n < 1e3 || !d.TYPED_ARRAY_SUPPORT) for (o = 0; o < n; ++o) {
      t[o + e] = this[o + a];
    } else Uint8Array.prototype.set.call(t, this.subarray(a, a + n), e);
    return n;
  }, d.prototype.fill = function (t, e, a, i) {
    if ("string" == typeof t) {
      var o;
      if ("string" == typeof e ? (i = e, e = 0, a = this.length) : "string" == typeof a && (i = a, a = this.length), 1 === t.length && (o = t.charCodeAt(0)) < 256 && (t = o), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
      if ("string" == typeof i && !d.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
    } else "number" == typeof t && (t &= 255);

    if (e < 0 || this.length < e || this.length < a) throw new RangeError("Out of range index");
    if (a <= e) return this;
    if (e >>>= 0, a = void 0 === a ? this.length : a >>> 0, "number" == typeof (t = t || 0)) for (s = e; s < a; ++s) {
      this[s] = t;
    } else for (var n = d.isBuffer(t) ? t : A(new d(t, i).toString()), r = n.length, s = 0; s < a - e; ++s) {
      this[s + e] = n[s % r];
    }
    return this;
  };
  var N = /[^+\/0-9A-Za-z-_]/g;

  function A(t, e) {
    var a;
    e = e || 1 / 0;

    for (var i = t.length, o = null, n = [], r = 0; r < i; ++r) {
      if (55295 < (a = t.charCodeAt(r)) && a < 57344) {
        if (!o) {
          if (56319 < a) {
            -1 < (e -= 3) && n.push(239, 191, 189);
            continue;
          }

          if (r + 1 === i) {
            -1 < (e -= 3) && n.push(239, 191, 189);
            continue;
          }

          o = a;
          continue;
        }

        if (a < 56320) {
          -1 < (e -= 3) && n.push(239, 191, 189), o = a;
          continue;
        }

        a = 65536 + (o - 55296 << 10 | a - 56320);
      } else o && -1 < (e -= 3) && n.push(239, 191, 189);

      if (o = null, a < 128) {
        if (--e < 0) break;
        n.push(a);
      } else if (a < 2048) {
        if ((e -= 2) < 0) break;
        n.push(a >> 6 | 192, 63 & a | 128);
      } else if (a < 65536) {
        if ((e -= 3) < 0) break;
        n.push(a >> 12 | 224, a >> 6 & 63 | 128, 63 & a | 128);
      } else {
        if (!(a < 1114112)) throw new Error("Invalid code point");
        if ((e -= 4) < 0) break;
        n.push(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, 63 & a | 128);
      }
    }

    return n;
  }

  function O(t) {
    return r.toByteArray(function (t) {
      if ((t = ((e = t).trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(N, "")).length < 2) return "";

      for (var e; t.length % 4 != 0;) {
        t += "=";
      }

      return t;
    }(t));
  }

  function S(t, e, a, i) {
    for (var o = 0; o < i && !(o + a >= e.length || o >= t.length); ++o) {
      e[o + a] = t[o];
    }

    return o;
  }
}.call(void 0, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}); //, { "base64-js": 1, ieee754: 4, isarray: 3 }]

cc._RF.pop();