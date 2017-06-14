import { ChildProcess, spawn } from 'child-process-promise';
import { notStrictEqual } from 'assert';
import { join } from 'path';
import { EOL } from 'os';
export class FormatScript {
    private formatter: ChildProcess;
    data: string;
    err: string;

    format(fileContent: string, tabSize: number): Promise<string> {
        let scriptPath = join(__dirname, "beautify_bash.py");

        // Setup stdout events and parsing
        let promise = spawn('python', [scriptPath, tabSize]);

        // Setup the python process
        this.formatter = promise.childProcess;
        this.formatter.stdout.on('data', (data) => this.data = data.toString());
        this.formatter.stderr.on('data', (data) => this.err = data.toString());

        // Send the text for formatting
        this.formatter.stdin.write(fileContent);
        this.formatter.stdin.end();

        return promise;
    }
}
