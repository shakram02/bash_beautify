import { ChildProcess, spawn } from 'child_process';
class FormatScript {
    constructor() {
        // Setup stdout events and parsing
    }

    static format(fileContent: string): void {

        let process: ChildProcess = spawn('python',
            // The script requires the "-" if called from stdin
            ["path/to/script.py", "-"]);
        process.stdin.write(fileContent);

        throw new Error("Method not implemented.");
    }
}