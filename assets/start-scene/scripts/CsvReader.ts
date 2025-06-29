// @@
enum CsvState {
    Start = 1,
    ID = 2,
    String = 3,
    EndString = 4,
    Switch = 5,
    FieldEnd = 6,
    End = 7
}

// @@
class CsvRecordSet {
    private _fields: string[];
    // @@
    constructor() {
        this._fields = [];
    }
    // @@
    public append(field: string): void {
        this._fields.push(field);
    }
    // @@
    public field(index: number): string {
        return this._fields[index];
    }
    // @@
    public fieldsCopy(): string[] {
        return this._fields.concat();
    }
    // @@ (not used)
    /* public count(): number {
        return this._fields.length;
    } */
    // @@
    public reset(): void {
        this._fields.splice(0, this._fields.length);
    }
}

// @@
export class CsvReader {
    // @@
    private charPos: number;
    private content: string;
    public rs: CsvRecordSet;

    // @@
    public constructor() {
        this.charPos = 0;
    }

    // @@
    public init(content: string): void {
        this.content = content;
        this.rs = new CsvRecordSet();
    }

    // @@
    public next(): boolean {
        this.rs.reset();
        if (this.charPos >= this.content.length) return false;
        //
        let state: CsvState = CsvState.Start;
        let pos: number = this.charPos;
        let field: string = "";
        //
        while (state !== CsvState.End) {
            if (pos >= this.content.length) break;
            let valid: boolean = true;
            let char: string = this.content[pos++];
            switch (char) {
                case " ":
                case "\t":
                case ";":
                    if (state === CsvState.Start) {
                        valid = false;
                    } else if (state !== CsvState.String) {
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
                        if (state !== CsvState.String) state = CsvState.ID;
                    }
                    break;
                default:
                    if (state !== CsvState.String) state = CsvState.ID;
            }
            if (valid) field = field.concat(char);
            //
            switch (state) {
                case CsvState.FieldEnd:
                    this.rs.append(field);
                    field = "";
                    state = CsvState.Start;
                    break;
                case CsvState.End:
                    if (field.length) this.rs.append(field);
            }
        }
        this.charPos = pos;
        return true;
    } // end: next
}
