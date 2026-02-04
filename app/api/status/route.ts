import { NextResponse } from 'next/server';

// 1. THE MEMORY (Temporary Database)
// This variable lives on the server and remembers if you are typing.
let currentStatus = {
  status: 'IDLE', // Defaults to IDLE
  lastActive: Date.now()
};

// 2. THE LISTENER (Spy.js talks to this)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔥 Signal Received:", body);
    
    // Update the Memory based on WPM (Words Per Minute)
    if (body.wpm > 0) {
        currentStatus.status = 'FLOW';
        currentStatus.lastActive = Date.now();
    } else {
        currentStatus.status = 'IDLE';
    }

    return NextResponse.json({ success: true, status: currentStatus.status });
 } catch (error) {
    console.error("API Error:", error); 
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// 3. THE REPORTER (Your Website asks this)
// The useAudio hook calls this every second to check the vibe.
export async function GET() {
  // Logic: If no signal for 10 seconds, reset to IDLE
  if (Date.now() - currentStatus.lastActive > 10000) {
      currentStatus.status = 'IDLE';
  }
  
  return NextResponse.json(currentStatus);
}