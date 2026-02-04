import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// 1. LOCAL MEMORY FALLBACK
// This is used only when running on your laptop (localhost)
let localMemory = {
  status: 'IDLE',
  lastActive: Date.now()
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const status = body.wpm > 0 ? 'FLOW' : 'IDLE';
    const hasKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

    if (hasKV) {
        // --- VERCEL MODE (Cloud Database) ---
        await kv.set('user_status', { 
            status: status, 
            lastActive: Date.now() 
        }, { ex: 10 });
    } else {
        // --- LOCALHOST MODE (Laptop Memory) ---
        // console.log("💻 Using Local Memory"); // Uncomment to debug
        localMemory.status = status;
        localMemory.lastActive = Date.now();
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("API Error:", error); 
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const hasKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
    let data = null;

    if (hasKV) {
        // --- VERCEL MODE ---
        data = await kv.get('user_status') as { status: string; lastActive: number } | null;
    } else {
        // --- LOCALHOST MODE ---
        // Reset to IDLE if no signal for 10 seconds
        if (Date.now() - localMemory.lastActive > 10000) {
            localMemory.status = 'IDLE';
        }
        data = localMemory;
    }

    if (!data) {
        return NextResponse.json({ status: 'IDLE' });
    }
  
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'IDLE' });
  }
}//kdakndalkdsk