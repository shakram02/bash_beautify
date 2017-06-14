'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ShellFormatter } from './shell_formatter';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.languages.
        registerDocumentFormattingEditProvider('shellscript',
        new ShellFormatter());

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}