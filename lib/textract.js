'use babel';

import { CompositeDisposable } from 'atom';

export default {

	subscriptions: null,

	activate(state) {
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'textract:line-up': () => {
				this.newlineAbove(atom.workspace.getActiveTextEditor());
			}
		}));

		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'textract:line-down': () => {
				this.newlineBelow(atom.workspace.getActiveTextEditor());
			}
		}));

		atom.commands.add('atom-text-editor', 'textract:console-down', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			this.newlineBelow(editor);
			editor.insertText(`console.log('${selectedText}: ', ${selectedText});`);
		});

		atom.commands.add('atom-text-editor', 'textract:console-up', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			this.newlineAbove(editor);
			editor.insertText(`console.log('${selectedText}: ', ${selectedText});`);
		});

		atom.commands.add('atom-text-editor', 'textract:debugger-down', () => {
			const editor = atom.workspace.getActiveTextEditor();
			this.newlineBelow(editor);
			editor.insertText(`debugger;`);
		});

		atom.commands.add('atom-text-editor', 'textract:debugger-up', () => {
			const editor = atom.workspace.getActiveTextEditor();
			this.newlineAbove(editor);
			editor.insertText(`debugger;`);
		});

		atom.commands.add('atom-text-editor', 'textract:extract-const', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			editor.insertText(`extractedConst`);
			this.newlineAbove(editor);
			editor.insertText(`const extractedConst = ${selectedText};`);
			editor.moveToBeginningOfLine();
			editor.moveToBeginningOfNextWord();
			editor.moveToBeginningOfNextWord();
			editor.selectToEndOfWord();
			const editorView = atom.views.getView(editor);
			atom.commands.dispatch(editorView, 'find-and-replace:select-next');
		});

		atom.commands.add('atom-text-editor', 'textract:extract-var', () => {
			const editor = atom.workspace.getActiveTextEditor();
			const selectedText = editor.getSelectedText();
			editor.insertText(`extractedConst`);
			this.newlineAbove(editor);
			editor.insertText(`var extractedConst = ${selectedText};`);
			editor.moveToBeginningOfLine();
			editor.moveToBeginningOfNextWord();
			editor.moveToBeginningOfNextWord();
			editor.selectToEndOfWord();
			const editorView = atom.views.getView(editor);
			atom.commands.dispatch(editorView, 'find-and-replace:select-next');
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
