import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: NextRequest) {
  const { name, url, tag, description, email } = await req.json();

  if (!name || !url || !email) {
    return NextResponse.json({ error: 'Name, URL and email are required' }, { status: 400 });
  }
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { error } = await supabase.from('submit').insert({
    name,
    url,
    tag: tag || null,
    description: description || null,
    email: email.toLowerCase().trim(),
  });

  if (error) {
    console.error('[submit-tool] Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
