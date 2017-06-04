import {
    DocumentFormattingEditProvider,
    TextDocument, CancellationToken,
    ProviderResult, TextEdit, TextEditor, Range,
    Position, window,
    FormattingOptions
} from 'vscode';

import { FormatScript } from './format_script';

export class ShellFormatter implements DocumentFormattingEditProvider {
    private file_validator: (path: string) => boolean;
    private editor: TextEditor;

    provideDocumentFormattingEdits(document: TextDocument,
        options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
        let text = document.getText()
        // Create a backup file, maybe add config for this?
        this.editor = window.activeTextEditor;

        let fs = new FormatScript();
        return fs.format(text).then(() => {
            return [TextEdit.replace(this.getFullDocRange(), fs.data)];
        },
            _ => {
                window.showErrorMessage("Couldn't format the document:" + fs.err);
            });
    }

    // private onCompleted(formatted: string) {
    //     console.log("Formatted:\n" + formatted);
    //     this.editor.edit((e) => {
    //         e.replace(this.getFullDocRange(), formatted);
    //     })
    // }
    /**
     * Select all the document
     * @param doc Current Document
     */
    private getFullDocRange(): Range {
        return this.editor.document.validateRange(new Range(new Position(0, 0),
            new Position(Number.MAX_VALUE, Number.MAX_VALUE)));
    }

}