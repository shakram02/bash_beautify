import { ChildProcess, spawn } from 'child_process';
import { notStrictEqual } from 'assert';
import { join } from 'path';
export class FormatScript {
    private formatter: ChildProcess;

    sendData(fileContent: string) {
        let scriptPath = join(__dirname, "hello.py");
        // Setup stdout events and parsing
        this.formatter = spawn('python', [scriptPath, fileContent]);
        // spawn src/ beautify_bash.py
        notStrictEqual(this.formatter, undefined, "Couldn't start formatter script");
        this.formatter.stdout.on('data', (data) => console.log("Stdout:" + data.toString()));
        this.formatter.stdin.on('data', (data) => console.log("Stdin:" + data.toString()));
        this.formatter.stderr.on('data', (data) => console.log("Stderr:" + data.toString()));
        // console.log("Sending:" + fileContent)
        // this.formatter.stdin.write(fileContent + "\n")
        // this.formatter.kill()
    }

    // format(fileContent: string): void {
    //     console.log("Formatting");
    //     this.formatter.send(fileContent);
    //     // this.formatter.stdin.write("\r\n");
    // }

    private onOut(data: string | Buffer) {
        let dataStr = data.toString();
        console.log(dataStr);
    }
}