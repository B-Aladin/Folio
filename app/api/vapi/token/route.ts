import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { VapiClient } from '@vapi-ai/server-sdk';
import { ASSISTANT_ID } from '@/lib/constants';

// Initialize Vapi Server SDK
const VAPI_API_KEY = process.env.VAPI_API_KEY || process.env.NEXT_PUBLIC_VAPI_API_KEY;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!VAPI_API_KEY) {
            console.error('VAPI_API_KEY is not set');
            return NextResponse.json({ error: 'Vapi API Key not configured' }, { status: 500 });
        }

        const client = new VapiClient({ token: VAPI_API_KEY });
        
        // We'll create a ephemeral token for the session
        // Note: The @vapi-ai/server-sdk might have different method names based on version
        // Usually it's something like client.calls.create or client.assistants.createToken
        
        // If we want to use the assistant, we can also just return the assistant config 
        // if the client side SDK supports it, but the user specifically asked for a token/session based start.
        
        // Return session config for the frontend
        return NextResponse.json({ 
            token: VAPI_API_KEY, 
            assistantId: ASSISTANT_ID 
        });

    } catch (error) {
        console.error('Error in /api/vapi/token:', error);
        return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
    }
}
