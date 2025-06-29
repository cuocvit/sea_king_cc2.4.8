"use strict";
cc._RF.push(module, 'c2b1aS3o8hEzJohHYUOjCaZ', 'encryptjs');
// start-scene/scripts/encryptjs.js

"use strict";

var e = require;
var a = module;
var i = exports;
!function (t) {
  "use strict";

  !function (t) {
    void 0 !== i && void 0 !== a ? a.exports = t() : "function" == typeof define && "object" == typeof define.amd ? define(t) : "function" == typeof define && "object" == typeof define.petal ? define("encryptjs", [], t) : this.encryptjs = t();
  }(function (D) {
    var I;
    (D = {
      version: "1.0.0"
    }).init = function () {
      console.log("--------------------Applying Encryption Algorithm------------------ ");
    }, void 0 !== a && a.exports && (I = e("algo")), D.encrypt = function (t, e, a) {
      if (128 != a && 192 != a && 256 != a) return "";
      t = String(t).utf8Encode(), e = String(e).utf8Encode();

      for (var i = a / 8, o = new Array(i), n = 0; n < i; n++) {
        o[n] = isNaN(e.charCodeAt(n)) ? 0 : e.charCodeAt(n);
      }

      var r = (r = I.cipher(o, I.keyExpansion(o))).concat(r.slice(0, i - 16)),
          s = new Array(16),
          c = (a = new Date().getTime()) % 1e3,
          l = Math.floor(a / 1e3),
          _ = Math.floor(65535 * Math.random());

      for (n = 0; n < 2; n++) {
        s[n] = c >>> 8 * n & 255;
      }

      for (n = 0; n < 2; n++) {
        s[n + 2] = _ >>> 8 * n & 255;
      }

      for (n = 0; n < 4; n++) {
        s[n + 4] = l >>> 8 * n & 255;
      }

      var d = "";

      for (n = 0; n < 8; n++) {
        d += String.fromCharCode(s[n]);
      }

      for (var p = I.keyExpansion(r), h = Math.ceil(t.length / 16), u = new Array(h), m = 0; m < h; m++) {
        for (var g = 0; g < 4; g++) {
          s[15 - g] = m >>> 8 * g & 255;
        }

        for (g = 0; g < 4; g++) {
          s[15 - g - 4] = m / 4294967296 >>> 8 * g;
        }

        for (var f = I.cipher(s, p), y = m < h - 1 ? 16 : (t.length - 1) % 16 + 1, v = new Array(y), n = 0; n < y; n++) {
          v[n] = f[n] ^ t.charCodeAt(16 * m + n), v[n] = String.fromCharCode(v[n]);
        }

        u[m] = v.join("");
      }

      return r = d + u.join(""), D.base64Encode(r);
    }, D.decrypt = function (t, e, a) {
      if (128 != a && 192 != a && 256 != a) return "";
      t = D.base64Decode(String(t)), e = String(e).utf8Encode();

      for (var i = a / 8, o = new Array(i), n = 0; n < i; n++) {
        o[n] = isNaN(e.charCodeAt(n)) ? 0 : e.charCodeAt(n);
      }

      var a = (a = I.cipher(o, I.keyExpansion(o))).concat(a.slice(0, i - 16)),
          r = new Array(8),
          s = t.slice(0, 8);

      for (n = 0; n < 8; n++) {
        r[n] = s.charCodeAt(n);
      }

      for (var c = I.keyExpansion(a), l = Math.ceil((t.length - 8) / 16), _ = new Array(l), d = 0; d < l; d++) {
        _[d] = t.slice(8 + 16 * d, 24 + 16 * d);
      }

      t = _;

      for (var p = new Array(t.length), d = 0; d < l; d++) {
        for (var h = 0; h < 4; h++) {
          r[15 - h] = d >>> 8 * h & 255;
        }

        for (h = 0; h < 4; h++) {
          r[15 - h - 4] = (d + 1) / 4294967296 - 1 >>> 8 * h & 255;
        }

        for (var u = I.cipher(r, c), m = new Array(t[d].length), n = 0; n < t[d].length; n++) {
          m[n] = u[n] ^ t[d].charCodeAt(n), m[n] = String.fromCharCode(m[n]);
        }

        p[d] = m.join("");
      }

      return p.join("").utf8Decode();
    };
    var l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return D.base64Encode = function (t) {
      var e,
          a,
          i,
          o,
          n,
          r,
          s = "",
          c = 0;

      for (t = D._utf8_encode(t); c < t.length;) {
        i = (r = t.charCodeAt(c++)) >> 2, o = (3 & r) << 4 | (e = t.charCodeAt(c++)) >> 4, n = (15 & e) << 2 | (a = t.charCodeAt(c++)) >> 6, r = 63 & a, isNaN(e) ? n = r = 64 : isNaN(a) && (r = 64), s = s + l.charAt(i) + l.charAt(o) + l.charAt(n) + l.charAt(r);
      }

      return s;
    }, D.base64Decode = function (t) {
      var e,
          a,
          i,
          o,
          n,
          r = "",
          s = 0;

      for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < t.length;) {
        e = l.indexOf(t.charAt(s++)) << 2 | (i = l.indexOf(t.charAt(s++))) >> 4, a = (15 & i) << 4 | (o = l.indexOf(t.charAt(s++))) >> 2, i = (3 & o) << 6 | (n = l.indexOf(t.charAt(s++))), r += String.fromCharCode(e), 64 != o && (r += String.fromCharCode(a)), 64 != n && (r += String.fromCharCode(i));
      }

      return D._utf8_decode(r);
    }, D._utf8_encode = function (t) {
      t = t.replace(/\r\n/g, "\n");

      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a);
        i < 128 ? e += String.fromCharCode(i) : (127 < i && i < 2048 ? e += String.fromCharCode(i >> 6 | 192) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128)), e += String.fromCharCode(63 & i | 128));
      }

      return e;
    }, D._utf8_decode = function (t) {
      for (var e, a = "", i = 0, o = 0; i < t.length;) {
        (e = t.charCodeAt(i)) < 128 ? (a += String.fromCharCode(e), i++) : 191 < e && e < 224 ? (o = t.charCodeAt(i + 1), a += String.fromCharCode((31 & e) << 6 | 63 & o), i += 2) : (o = t.charCodeAt(i + 1), c3 = t.charCodeAt(i + 2), a += String.fromCharCode((15 & e) << 12 | (63 & o) << 6 | 63 & c3), i += 3);
      }

      return a;
    }, D.getTextEncryptAndSaveToTextFile = function () {
      throw Error("Command line not supported on this platform");
    }, D.getTextEncryptAndSaveToJSONFile = function () {
      throw Error("Command line not supported on this platform");
    }, D.writeCipherTextToJSON = function (t, e, a, i) {
      null == i && (i = a, a = {});
      var o = ("object" == typeof a && null !== a && "spaces" in a ? a : this).spaces;

      try {
        JSON.stringify(e, a ? a.replacer : null, o);
      } catch (t) {
        if (i) return i(t, null);
      }
    }, void 0 === String.prototype.utf8Encode && (String.prototype.utf8Encode = function () {
      return unescape(encodeURIComponent(this));
    }), void 0 === String.prototype.utf8Decode && (String.prototype.utf8Decode = function () {
      try {
        return decodeURIComponent(escape(this));
      } catch (t) {
        return this;
      }
    }), void 0 === String.prototype.base64Encode && (String.prototype.base64Encode = function () {
      if ("undefined" != typeof btoa) return btoa(this);
      if (void 0 !== t) return new t(this, "utf8").toString("base64");
      throw new Error("No Base64 Encode");
    }), void 0 === String.prototype.base64Decode && (String.prototype.base64Decode = function () {
      if ("undefined" != typeof atob) return atob(this);
      if (void 0 !== t) return new t(this, "base64").toString("utf8");
      throw new Error("No Base64 Decode");
    }), D.init(), D;
  });
}.call(void 0, e("buffer").Buffer);

cc._RF.pop();