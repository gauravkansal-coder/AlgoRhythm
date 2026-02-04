/* eslint-disable */
const fs = require('fs');
const https = require('https'); 
const path = require('path');

// -------------------------------------------------
// 🔴 REPLACE THIS WITH YOUR VERCEL DOMAIN!
// DO NOT include 'https://' or '/' at the end.
// Example: const TARGET_DOMAIN = 'algorhythm-app.vercel.app';
const TARGET_DOMAIN = 'v0-algo-rhythm-one.vercel.app'; 
// -------------------------------------------------

console.log("🕵️  CLOUD SPY ACTIVE");
console.log(`📡 Targeting: https://${TARGET_DOMAIN}`);

const WATCH_DIRS = ['.']; 
let keypresses = 0;

// Watcher Logic (Same as before)
function watchFolder(folderPath) {
    if (!fs.existsSync(folderPath)) return;
    fs.watch(folderPath, (eventType, filename) => {
        if (filename && !filename.includes('node_modules') && !filename.includes('.git') && !filename.includes('.next')) {
            process.stdout.write("⚡"); 
            keypresses += 5; 
        }
    });
    
    try {
        fs.readdirSync(folderPath, { withFileTypes: true }).forEach(entry => {
            if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.next') {
                watchFolder(path.join(folderPath, entry.name));
            }
        });
    } catch (e) {}
}

WATCH_DIRS.forEach(dir => watchFolder(dir));

// Sender Logic
setInterval(() => {
    if (keypresses > 0) {
        const wpm = Math.min(60 + keypresses, 120);
        console.log(`\n🔥 Sending FLOW to Vercel (WPM: ${wpm})`);
        sendSignal(wpm);
        keypresses = 0; 
    }
}, 1000);

function sendSignal(wpm) {
    const data = JSON.stringify({ wpm });
    const options = {
        hostname: TARGET_DOMAIN,
        port: 443, // HTTPS port
        path: '/api/status',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        // Just fire and forget
    });

    req.on('error', (e) => console.log(`\n❌ Error: ${e.message}`));
    req.write(data);
    req.end();
}