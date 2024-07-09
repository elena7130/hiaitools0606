import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/db/supabase/client';

const supabase = createClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: 'Invalid keyword' }, { status: 400 });
  }

  try {
    const { data: websites, error: websitesError } = await supabase
      .from('web_navigation')
      .select('*')
      .eq('keyword', keyword)
      .limit(10);

    if (websitesError) {
      throw new Error(`Error querying Supabase: ${websitesError.message}`);
    }

    if (!websites || websites.length === 0) {
      return NextResponse.json({ error: 'No websites found for the given keyword' }, { status: 404 });
    }

    return NextResponse.json({ websites }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export default GET;
