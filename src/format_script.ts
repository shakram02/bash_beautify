import { ChildProcess, spawn } from 'child-process-promise';
import { notStrictEqual } from 'assert';
import { join } from 'path';
import { EOL } from 'os';
export class FormatScript {
    private formatter: ChildProcess;
    data: string;
    err: string;

    format(fileContent: string): Promise<string> {
        let scriptPath = join(__dirname, "hello.py");
        // Setup stdout events and parsing
        let promise = spawn('python', [scriptPath, "-"]);
        this.formatter = promise.childProcess;
        this.formatter.stdout.on('data', (data) => this.data = data.toString());
        this.formatter.stderr.on('data', (data) => this.err = data.toString());

        this.formatter.stdin.write(fileContent);
        this.formatter.stdin.end();

        return promise;
    }
}
