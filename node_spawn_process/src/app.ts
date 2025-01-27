import { spawn } from 'child_process';

async function main() {
    console.log("about to spawn child")
    const child = spawn('python', ['-c', 'import time; time.sleep(50000)']);
    //const child = spawn('python', ['-c', 'print("hello")']);
    //let sidecar_path = '/home/james/.config/Aide/User/globalStorage/codestory-ghost.codestoryai/sidecar_bin/target/release/webserver'
    //const child = spawn(sidecar_path);
    child.unref();
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    console.log("spawned python")
    await new Promise(resolve => setTimeout(resolve, 50000));
    console.log("finished sleep")
}




main().then(() => console.log("finished main")).catch(err => {
        // Deal with the fact the chain failed
    });