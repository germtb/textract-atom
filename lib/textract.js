'use babel';

import { CompositeDisposable } from 'atom';

export default {

	subscriptions: null,

	activate(state) {
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'textract:up': () => {
				this.newlineAbove(atom.workspace.getActiveTextEditor());
			}
		}));

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'textract:down': () => {
				this.newlineBelow(atom.workspace.getActiveTextEditor());
			}
		}));

		atom.commands.add('atom-text-editor', 'textract:alt-c', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			this.newlineBelow(editor);
			editor.insertText(`console.log('${selectedText}: ', ${selectedText});`);
		});

		atom.commands.add('atom-text-editor', 'textract:alt-shift-c', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			this.newlineAbove(editor);
			editor.insertText(`console.log('${selectedText}: ', ${selectedText});`);
		});

		atom.commands.add('atom-text-editor', 'textract:alt-d', () => {
			const editor = atom.workspace.getActiveTextEditor();
			this.newlineBelow(editor);
			editor.insertText(`debugger;`);
		});

		atom.commands.add('atom-text-editor', 'textract:alt-shift-d', () => {
			const editor = atom.workspace.getActiveTextEditor();
			this.newlineAbove(editor);
			editor.insertText(`debugger;`);
		});

		atom.commands.add('atom-text-editor', 'textract:extract-const', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			editor.insertText(`extractedConst`);
			this.newline(editor);
			editor.insertText(`const extractedConst = ${selectedText};`);
			editor.moveToBeginningOfLine();
			editor.moveToBeginningOfNextWord();
			editor.selectToEndOfWord();
		});

	},

	deactivate() {
		this.subscriptions.dispose();
	},

	serialize() {
		return { };
	},

	newlineBelow(editor) {
		editor.moveToEndOfLine();
		editor.insertNewline();
	},

	newlineAbove(editor) {
		editor.moveToBeginningOfLine();
		editor.insertNewlineAbove();
	},

	toggle() {
		console('toggle');
	}

};
