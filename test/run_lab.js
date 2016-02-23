'use strict';

const ChildProcess = require('child_process');
const Path = require('path');

const labPath = Path.join(__dirname, '..', 'bin', '_lab');

module.exports = (args, callback) => {

    return new Promise((resolve, reject) => {

        const cli = ChildProcess.spawn('node', [labPath, ...args]);
        let output = '';
        let errorOutput = '';
        let combinedOutput = '';

        cli.stdout.on('data', (data) => {

            output += data;
            combinedOutput += data;
        });

        cli.stderr.on('data', (data) => {

            errorOutput += data;
            combinedOutput += data;
        });

        cli.once('close', (code, signal) => {

        	if (signal) {
        		reject(new Promise(() => {

		            expect(signal).to.not.exist();
        		}));
        	}
            resolve({output, errorOutput, combinedOutput, code, signal});
        });
    })

}