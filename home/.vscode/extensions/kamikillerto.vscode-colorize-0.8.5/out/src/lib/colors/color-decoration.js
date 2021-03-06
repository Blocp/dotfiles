"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const color_util_1 = require("../util/color-util");
class ColorDecoration {
    constructor(color) {
        /**
         * Keep track of the TextEditorDecorationType status
         *
         * @type {boolean}
         * @public
         * @memberOf ColorDecoration
         */
        this.disposed = false;
        this.hidden = false;
        this.color = color;
    }
    /**
     * The TextEditorDecorationType associated to the color
     *
     * @type {TextEditorDecorationType}
     * @memberOf ColorDecoration
     */
    get decoration() {
        this._generateDecorator();
        return this._decoration;
    }
    set decoration(deco) {
        this._decoration = deco;
    }
    /**
     * Dispose the TextEditorDecorationType
     * (destroy the colored background)
     *
     * @public
     * @memberOf ColorDecoration
     */
    dispose() {
        this._decoration.dispose();
        this.disposed = true;
    }
    /**
     * Hide the TextEditorDecorationType.
     *
     * @public
     * @memberOf ColorDecoration
     */
    hide() {
        if (this._decoration) {
            this._decoration.dispose();
        }
        this.hidden = true;
    }
    /**
     * Generate the decoration Range (start and end position in line)
     *
     * @param {number} line
     * @returns {Range}
     *
     * @memberOf ColorDecoration
     */
    generateRange(line) {
        const range = new vscode_1.Range(new vscode_1.Position(line, this.color.positionInText), new vscode_1.Position(line, this.color.positionInText + this.color.value.length));
        this.currentRange = range;
        return range;
    }
    shouldGenerateDecoration() {
        if (this.disposed === true /* || this.hidden === true */) {
            return false;
        }
        return this._decoration === null || this._decoration === undefined || this.hidden;
    }
    _generateDecorator() {
        let backgroundDecorationType = vscode_1.window.createTextEditorDecorationType({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: this.color.toRgbString(),
            backgroundColor: this.color.toRgbString(),
            color: color_util_1.generateOptimalTextColor(this.color)
        });
        this._decoration = backgroundDecorationType;
    }
}
exports.default = ColorDecoration;
//# sourceMappingURL=color-decoration.js.map