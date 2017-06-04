import {
    DocumentFormattingEditProvider,
    TextDocument, CancellationToken,
    ProviderResult, TextEdit, Range,
    Position, window,
    FormattingOptions
} from 'vscode';

import { FormatScript } from './format_script';

export class ShellFormatter implements DocumentFormattingEditProvider {
    private file_validator: (path: string) => boolean;

    provideDocumentFormattingEdits(document: TextDocument,
        options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
        let text = document.getText()
        // Create a backup file, maybe add config for this?
        let editor = window.activeTextEditor;
        let fs = new FormatScript();
        fs.format(text);

        // editor.edit(editorEdit => {
        //     for (let i = 0; i < ranges.length; i++) {
        //         editorEdit.replace(ranges[i], edits[i]);
        //     }
        throw new Error("Method not implemented.");
    }

    /**
     * Select all the document
     * @param doc Current Document
     */
    private getFullDocRange(doc: TextDocument): Range {
        return doc.validateRange(new Range(new Position(0, 0),
            new Position(Number.MAX_VALUE, Number.MAX_VALUE)));
    }

}