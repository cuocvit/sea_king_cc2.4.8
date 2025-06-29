"use strict";
cc._RF.push(module, '6dd31vOKz5GxqMimAD48/W+', 'algo');
// start-scene/scripts/algo.js

"use strict";

var t = require;
var e = module;
"use strict";

var c = {
  cipher: function cipher(t, e) {
    for (var a = e.length / 4 - 1, i = [[], [], [], []], o = 0; o < 16; o++) {
      i[o % 4][Math.floor(o / 4)] = t[o];
    }

    for (var i = c.addRoundKey(i, e, 0, 4), n = 1; n < a; n++) {
      i = c.subBytes(i, 4), i = c.shiftRows(i, 4), i = c.mixColumns(i, 4), i = c.addRoundKey(i, e, n, 4);
    }

    i = c.subBytes(i, 4), i = c.shiftRows(i, 4), i = c.addRoundKey(i, e, a, 4);

    for (var r = new Array(16), o = 0; o < 16; o++) {
      r[o] = i[o % 4][Math.floor(o / 4)];
    }

    return r;
  },
  keyExpansion: function keyExpansion(t) {
    for (var e = t.length / 4, a = 6 + e, i = new Array(4 * (1 + a)), o = new Array(4), n = 0; n < e; n++) {
      var r = [t[4 * n], t[4 * n + 1], t[4 * n + 2], t[4 * n + 3]];
      i[n] = r;
    }

    for (n = e; n < 4 * (1 + a); n++) {
      i[n] = new Array(4);

      for (var s = 0; s < 4; s++) {
        o[s] = i[n - 1][s];
      }

      if (n % e == 0) for (o = c.subWord(c.rotWord(o)), s = 0; s < 4; s++) {
        o[s] ^= c.rCon[n / e][s];
      } else 6 < e && n % e == 4 && (o = c.subWord(o));

      for (s = 0; s < 4; s++) {
        i[n][s] = i[n - e][s] ^ o[s];
      }
    }

    return i;
  },
  subBytes: function subBytes(t, e) {
    for (var a = 0; a < 4; a++) {
      for (var i = 0; i < e; i++) {
        t[a][i] = c.sBox[t[a][i]];
      }
    }

    return t;
  },
  shiftRows: function shiftRows(t, e) {
    for (var a = new Array(4), i = 1; i < 4; i++) {
      for (var o = 0; o < 4; o++) {
        a[o] = t[i][(o + i) % e];
      }

      for (o = 0; o < 4; o++) {
        t[i][o] = a[o];
      }
    }

    return t;
  },
  mixColumns: function mixColumns(t) {
    for (var e = 0; e < 4; e++) {
      for (var a = new Array(4), i = new Array(4), o = 0; o < 4; o++) {
        a[o] = t[o][e], i[o] = 128 & t[o][e] ? t[o][e] << 1 ^ 283 : t[o][e] << 1;
      }

      t[0][e] = i[0] ^ a[1] ^ i[1] ^ a[2] ^ a[3], t[1][e] = a[0] ^ i[1] ^ a[2] ^ i[2] ^ a[3], t[2][e] = a[0] ^ a[1] ^ i[2] ^ a[3] ^ i[3], t[3][e] = a[0] ^ i[0] ^ a[1] ^ a[2] ^ i[3];
    }

    return t;
  },
  addRoundKey: function addRoundKey(t, e, a, i) {
    for (var o = 0; o < 4; o++) {
      for (var n = 0; n < i; n++) {
        t[o][n] ^= e[4 * a + n][o];
      }
    }

    return t;
  },
  subWord: function subWord(t) {
    for (var e = 0; e < 4; e++) {
      t[e] = c.sBox[t[e]];
    }

    return t;
  },
  rotWord: function rotWord(t) {
    for (var e = t[0], a = 0; a < 3; a++) {
      t[a] = t[a + 1];
    }

    return t[3] = e, t;
  },
  sBox: [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
  rCon: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]]
};
void 0 !== e && e.exports && (e.exports = c), "function" == typeof define && define.amd && define([], function () {
  return c;
});

cc._RF.pop();