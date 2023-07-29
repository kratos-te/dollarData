import { cookies, headers } from 'next/headers';
import { Database } from '@/types_db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@supabase/auth-ui-shared';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { priceIdByUserId } from '@/app/supabase-server';

export async function GET(req: NextRequest) {
    
    const requestUrl = new URL(req.url)
    const apikey = requestUrl.searchParams.get("apiKey")
    if (apikey) {
        try {
            const res = priceIdByUserId(apikey)
            console.log("result>>", res)
            if (res == null) {
                return new Response(JSON.stringify({ res }), { status: 403 })
            }
            return new Response(JSON.stringify({ res }), { status: 200 })
        } catch (err: any) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: err.message } }),
            {
              status: 500
            })
        }
    }
}