
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/CsvReader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08d24cadq5GdYtY/LYtPfDY', 'CsvReader');
// start-scene/scripts/CsvReader.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvReader = void 0;
// @@
var CsvState;
(function (CsvState) {
    CsvState[CsvState["Start"] = 1] = "Start";
    CsvState[CsvState["ID"] = 2] = "ID";
    CsvState[CsvState["String"] = 3] = "String";
    CsvState[CsvState["EndString"] = 4] = "EndString";
    CsvState[CsvState["Switch"] = 5] = "Switch";
    CsvState[CsvState["FieldEnd"] = 6] = "FieldEnd";
    CsvState[CsvState["End"] = 7] = "End";
})(CsvState || (CsvState = {}));
// @@
var CsvRecordSet = /** @class */ (function () {
    // @@
    function CsvRecordSet() {
        this._fields = [];
    }
    // @@
    CsvRecordSet.prototype.append = function (field) {
        this._fields.push(field);
    };
    // @@
    CsvRecordSet.prototype.field = function (index) {
        return this._fields[index];
    };
    // @@
    CsvRecordSet.prototype.fieldsCopy = function () {
        return this._fields.concat();
    };
    // @@ (not used)
    /* public count(): number {
        return this._fields.length;
    } */
    // @@
    CsvRecordSet.prototype.reset = function () {
        this._fields.splice(0, this._fields.length);
    };
    return CsvRecordSet;
}());
// @@
var CsvReader = /** @class */ (function () {
    // @@
    function CsvReader() {
        this.charPos = 0;
    }
    // @@
    CsvReader.prototype.init = function (content) {
        this.content = content;
        this.rs = new CsvRecordSet();
    };
    // @@
    CsvReader.prototype.next = function () {
        this.rs.reset();
        if (this.charPos >= this.content.length)
            return false;
        //
        var state = CsvState.Start;
        var pos = this.charPos;
        var field = "";
        //
        while (state !== CsvState.End) {
            if (pos >= this.content.length)
                break;
            var valid = true;
            var char = this.content[pos++];
            switch (char) {
                case " ":
                case "\t":
                case ";":
                    if (state === CsvState.Start) {
                        valid = false;
                    }
                    else if (state !== CsvState.String) {
                        state = CsvState.FieldEnd;
                        valid = false;
                    }
                    break;
                case "\r":
                    valid = false;
                    break;
                case "\n":
                    state = CsvState.End;
                    valid = false;
                    break;
                case '"':
                case "'":
                    state = state !== CsvState.String ? CsvState.String : CsvState.EndString;
                    valid = false;
                    break;
                case "\\":
                    if (pos < this.content.length) {
                        switch (this.content.charAt(pos)) {
                            case "t":
                                char = "\t";
                                pos++;
                                break;
                            case "n":
                                char = "\n";
                                pos++;
                        }
                        if (state !== CsvState.String)
                            state = CsvState.ID;
                    }
                    break;
                default:
                    if (state !== CsvState.String)
                        state = CsvState.ID;
            }
            if (valid)
                field = field.concat(char);
            //
            switch (state) {
                case CsvState.FieldEnd:
                    this.rs.append(field);
                    field = "";
                    state = CsvState.Start;
                    break;
                case CsvState.End:
                    if (field.length)
                        this.rs.append(field);
            }
        }
        this.charPos = pos;
        return true;
    }; // end: next
    return CsvReader;
}());
exports.CsvReader = CsvReader;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENzdlJlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxLQUFLO0FBQ0wsSUFBSyxRQVFKO0FBUkQsV0FBSyxRQUFRO0lBQ1QseUNBQVMsQ0FBQTtJQUNULG1DQUFNLENBQUE7SUFDTiwyQ0FBVSxDQUFBO0lBQ1YsaURBQWEsQ0FBQTtJQUNiLDJDQUFVLENBQUE7SUFDViwrQ0FBWSxDQUFBO0lBQ1oscUNBQU8sQ0FBQTtBQUNYLENBQUMsRUFSSSxRQUFRLEtBQVIsUUFBUSxRQVFaO0FBRUQsS0FBSztBQUNMO0lBRUksS0FBSztJQUNMO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELEtBQUs7SUFDRSw2QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsS0FBSztJQUNFLDRCQUFLLEdBQVosVUFBYSxLQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsS0FBSztJQUNFLGlDQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDRCxnQkFBZ0I7SUFDaEI7O1FBRUk7SUFDSixLQUFLO0lBQ0UsNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDTCxtQkFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUFFRCxLQUFLO0FBQ0w7SUFNSSxLQUFLO0lBQ0w7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lB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Q0FBQyxDQUFDO29CQUN0QixLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNYLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO29CQUN2QixNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLEdBQUc7b0JBQ2IsSUFBSSxLQUFLLENBQUMsTUFBTTt3QkFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQztTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxFQUFDLFlBQVk7SUFDbEIsZ0JBQUM7QUFBRCxDQXJGQSxBQXFGQyxJQUFBO0FBckZZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQEBcclxuZW51bSBDc3ZTdGF0ZSB7XHJcbiAgICBTdGFydCA9IDEsXHJcbiAgICBJRCA9IDIsXHJcbiAgICBTdHJpbmcgPSAzLFxyXG4gICAgRW5kU3RyaW5nID0gNCxcclxuICAgIFN3aXRjaCA9IDUsXHJcbiAgICBGaWVsZEVuZCA9IDYsXHJcbiAgICBFbmQgPSA3XHJcbn1cclxuXHJcbi8vIEBAXHJcbmNsYXNzIENzdlJlY29yZFNldCB7XHJcbiAgICBwcml2YXRlIF9maWVsZHM6IHN0cmluZ1tdO1xyXG4gICAgLy8gQEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2ZpZWxkcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBhcHBlbmQoZmllbGQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2ZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgIH1cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgZmllbGQoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpZWxkc1tpbmRleF07XHJcbiAgICB9XHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGZpZWxkc0NvcHkoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maWVsZHMuY29uY2F0KCk7XHJcbiAgICB9XHJcbiAgICAvLyBAQCAobm90IHVzZWQpXHJcbiAgICAvKiBwdWJsaWMgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmllbGRzLmxlbmd0aDtcclxuICAgIH0gKi9cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZmllbGRzLnNwbGljZSgwLCB0aGlzLl9maWVsZHMubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQEBcclxuZXhwb3J0IGNsYXNzIENzdlJlYWRlciB7XHJcbiAgICAvLyBAQFxyXG4gICAgcHJpdmF0ZSBjaGFyUG9zOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByczogQ3N2UmVjb3JkU2V0O1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFyUG9zID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGluaXQoY29udGVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLnJzID0gbmV3IENzdlJlY29yZFNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgbmV4dCgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLnJzLnJlc2V0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhclBvcyA+PSB0aGlzLmNvbnRlbnQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBsZXQgc3RhdGU6IENzdlN0YXRlID0gQ3N2U3RhdGUuU3RhcnQ7XHJcbiAgICAgICAgbGV0IHBvczogbnVtYmVyID0gdGhpcy5jaGFyUG9zO1xyXG4gICAgICAgIGxldCBmaWVsZDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHdoaWxlIChzdGF0ZSAhPT0gQ3N2U3RhdGUuRW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPj0gdGhpcy5jb250ZW50Lmxlbmd0aCkgYnJlYWs7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBjaGFyOiBzdHJpbmcgPSB0aGlzLmNvbnRlbnRbcG9zKytdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIgXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiXFx0XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiO1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gQ3N2U3RhdGUuU3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlICE9PSBDc3ZTdGF0ZS5TdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBDc3ZTdGF0ZS5GaWVsZEVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiXFxyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJcXG5cIjpcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IENzdlN0YXRlLkVuZDtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnXCInOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlICE9PSBDc3ZTdGF0ZS5TdHJpbmcgPyBDc3ZTdGF0ZS5TdHJpbmcgOiBDc3ZTdGF0ZS5FbmRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJcXFxcXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA8IHRoaXMuY29udGVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbnRlbnQuY2hhckF0KHBvcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhciA9IFwiXFx0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXIgPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gQ3N2U3RhdGUuU3RyaW5nKSBzdGF0ZSA9IENzdlN0YXRlLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICE9PSBDc3ZTdGF0ZS5TdHJpbmcpIHN0YXRlID0gQ3N2U3RhdGUuSUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbGlkKSBmaWVsZCA9IGZpZWxkLmNvbmNhdChjaGFyKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDc3ZTdGF0ZS5GaWVsZEVuZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJzLmFwcGVuZChmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gQ3N2U3RhdGUuU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENzdlN0YXRlLkVuZDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGQubGVuZ3RoKSB0aGlzLnJzLmFwcGVuZChmaWVsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFyUG9zID0gcG9zO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSAvLyBlbmQ6IG5leHRcclxufVxyXG4iXX0=