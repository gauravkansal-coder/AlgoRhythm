/* eslint-disable */
const fs = require('fs');
const http = require('http');
const path = require('path');

console.log("🕵️  UNIVERSAL SPY ACTIVE");

// 1. DYNAMIC CONFIGURATION
// If the user provides folders, use them. Otherwise, watch the CURRENT folder.
// Usage: node spy.js ./src ./public
const args = process.argv.slice(2);
const WATCH_DIRS = args.length > 0 ? args : ['.']; 

console.log(`👀 Watching path: ${process.cwd()}`);
console.log(`📂 Tracking subfolders: ${WATCH_DIRS.join(', ')}`);
console.log("📝 REMEMBER: Music reacts when you SAVE (Ctrl+S)!");

let keypresses = 0;

// 2. RECURSIVE WATCHER (The "All-Seeing Eye")
// This function finds every subfolder automatically so you don't have to list them.
function watchFolder(folderPath) {
    if (!fs.existsSync(folderPath)) return;

    // Watch the folder itself
    fs.watch(folderPath, (eventType, filename) => {
        if (filename && !filename.includes('node_modules') && !filename.includes('.git')) {
            console.log(`⚡ Activity in: ${filename}`);
            keypresses += 5; 
        }
    });

    // Find subfolders and watch them too
    fs.readdirSync(folderPath, { withFileTypes: true }).forEach(entry => {
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.next') {
            watchFolder(path.join(folderPath, entry.name));
        }
    });
}

// Start watching
WATCH_DIRS.forEach(dir => watchFolder(dir));

// 3. THE PULSE (Sends data every 1 second)
setInterval(() => {
    if (keypresses > 0) {
        // Capping WPM at 120 so the graph doesn't explode
        const wpm = Math.min(keypresses > 0 ? 60 + keypresses : 0, 120);
        console.log(`🔥 Vibe Detected: FLOW (Activity Level: ${wpm})`);
        sendSignal(wpm);
        keypresses = 0; 
    }
}, 1000);

// 4. THE SENDER
function sendSignal(wpm) {
    const data = JSON.stringify({ wpm });
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/status',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, () => {});
    req.on('error', () => { /* Ignore connection errors if app is closed */ });
    req.write(data);
    req.end();
}