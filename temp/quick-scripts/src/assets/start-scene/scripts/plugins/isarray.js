"use strict";
cc._RF.push(module, '1d0c1qF7xBPPK/j7oK6ZYnd', 'isarray');
// start-scene/scripts/plugins/isarray.js

"use strict";

var t = require;
var e = module;
var a = exports;
!function (t, e) {
  var a = {}.toString;

  e.exports = Array.isArray || function (t) {
    return "[object Array]" == a.call(t);
  };
};

cc._RF.pop();