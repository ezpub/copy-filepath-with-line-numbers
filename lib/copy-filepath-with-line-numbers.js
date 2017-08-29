'use babel';

import CopyFilepathWithLineNumbersView from './copy-filepath-with-line-numbers-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    copyFilepathWithLineNumbersView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.copyFilepathWithLineNumbersView = new CopyFilepathWithLineNumbersView(state.copyFilepathWithLineNumbersViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.copyFilepathWithLineNumbersView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'copy-filepath-with-line-numbers:relative': () => this.copyPathWithLineNumbers()
        }));
    },

    /**
     * Populate the line number strings
     * @param  {object} start The start of the range of a selection
     * @param  {object} end   The end of the range of a selection
     * @return {string}       A single line number or a range of lines
     */
    linesToString({
        start,
        end
    }) {
        if (start.row == end.row) { // Single line
            return (start.row + 1) + ''
        } else { // Multiple lines
            return (start.row + 1) + '~' + (end.row + 1)
        }
    },

    /**
     * Gets line numbers for all highlighted lines or selections
     *
     * @param  {object} editor The current active editor instance
     * @return {string}        A list of line numbers
     */
    getLineNumbers(editor) {
        const ranges = editor.getSelectedBufferRanges()
        let lineNumbers = []

        if (ranges.length > 1) { // Multiple selections
            ranges.forEach(range => {
                lineNumbers.push(this.linesToString(range))
            })
        } else if (ranges.length == 1) { // Single selection
            lineNumbers.push(this.linesToString(ranges[0]))
        }

        return lineNumbers.join(', ')
    },

    copyPathWithLineNumbers() {
        const editor = atom.workspace.getActiveTextEditor()
        if (!editor) return

        // Get absolute path
        const absolutePath = editor.getPath()
        if (!absolutePath) return

        // Get relative path
        const [, relativePath] = atom.project.relativizePath(absolutePath)

        // Get current line number
        const lineNumbers = this.getLineNumbers(editor)

        // Join relative path and line numbers
        let pathLine = relativePath + ':' + lineNumbers

        // Add to clipboard
        atom.clipboard.write(pathLine)

        // Success notification
        atom.notifications.addSuccess('`' + pathLine + '` is copied to clipboard')
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.copyFilepathWithLineNumbersView.destroy();
    },

    serialize() {
        return {
            copyFilepathWithLineNumbersViewState: this.copyFilepathWithLineNumbersView.serialize()
        };
    },

    toggle() {
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }
};
