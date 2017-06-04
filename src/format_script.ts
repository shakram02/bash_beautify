import { ChildProcess, spawn } from 'child_process';
import { notStrictEqual } from 'assert';
import { join } from 'path';
import { EOL } from 'os';
export class FormatScript {
    private formatter: ChildProcess;

    format(fileContent: string): void {
        let scriptPath = join(__dirname, "hello.py");
        // Setup stdout events and parsing
        this.formatter = spawn('python', [scriptPath, "-"]);
        notStrictEqual(this.formatter, undefined, "Couldn't start formatter script");
        this.formatter.stdout.on('data', (data) => console.log("OUT:" + data.toString()));
        this.formatter.stderr.on('data', (data) => console.log("Stderr:" + data.toString()));
        this.formatter.stdin.write(fileContent);
        this.formatter.stdin.end()
    }

}