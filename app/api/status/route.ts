import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// 1. THE LISTENER (Spy.js talks to this)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Logic: If WPM > 0, we are FLOWing.
    const status = body.wpm > 0 ? 'FLOW' : 'IDLE';
    
    // Save to Vercel KV (Redis)
    // We set it to expire in 10 seconds so it auto-resets if you stop sending
    await kv.set('user_status', { 
      status: status, 
      lastActive: Date.now() 
    }, { ex: 10 }); // ex: 10 means "expire in 10 seconds"

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("API Error:", error); 
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// 2. THE REPORTER (Website asks this)
export async function GET() {
  try {
    // Read from Vercel KV
    const data = await kv.get('user_status') as { status: string; lastActive: number } | null;

    // If no data found (expired), assume IDLE
    if (!data) {
        return NextResponse.json({ status: 'IDLE' });
    }
  
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'IDLE' });
  }
}