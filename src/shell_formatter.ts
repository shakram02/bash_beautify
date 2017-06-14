import {
    DocumentFormattingEditProvider,
    TextDocument, CancellationToken,
    ProviderResult, TextEdit, TextEditor, Range,
    Position, window, workspace,
    FormattingOptions
} from 'vscode';

import { FormatScript } from './format_script';

export class ShellFormatter implements DocumentFormattingEditProvider {
    private file_validator: (path: string) => boolean;
    private document: TextDocument;
    private script: FormatScript = new FormatScript();

    provideDocumentFormattingEdits(document: TextDocument,
        options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {

        // Retrieve all text in document
        let text = document.getText();
        this.document = document;

        if (text.length == 0) {
            return [];
        }

        // Get the tabsize before each format attempt, to 
        // ensure using the updated value
        let config = workspace.getConfiguration('bashBeautify');
        let tabSize = config.tabSize;

        return this.script.format(text, tabSize).then(() => {
            // Alright, replace the document content with the formatted one
            return [TextEdit.replace(this.getFullDocRange(), this.script.data)];
        },
            _ => {
                // Something went wrong
                window.showWarningMessage("Couldn't format the document:"
                    + this.script.err);
            });
    }

    /**
     * Select all the document
     * @param doc Current Document
     */
    private getFullDocRange(): Range {
        return this.document.validateRange(new Range(new Position(0, 0),
            new Position(Number.MAX_VALUE, Number.MAX_VALUE)));
    }

}