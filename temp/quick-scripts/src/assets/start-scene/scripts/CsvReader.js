"use strict";
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