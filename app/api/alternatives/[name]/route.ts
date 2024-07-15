import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/db/supabase/client';

const supabase = createClient();

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { name } = params;
  if (!name) {
    return NextResponse.json({ error: 'Invalid product name' }, { status: 400 });
  }

  try {
    // 获取产品的alternatives字段
    const { data: product, error: productError } = await supabase
      .from('web_navigation')
      .select('id, alternatives,title')
      .eq('name', name)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: `Error fetching product: ${productError?.message || 'Product not found'}` },
        { status: 500 },
      );
    }

    if (!product.alternatives) {
      return NextResponse.json({ alternatives: [] }, { status: 200 });
    }

    const alternativeIds = product.alternatives.split(',').map(Number);
    const { data: alternatives, error: alternativesError } = await supabase
      .from('web_navigation')
      .select('*')
      .in('id', alternativeIds)
      .limit(10);

    if (alternativesError) {
      return NextResponse.json(
        { error: `Error fetching alternative products: ${alternativesError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ alternatives }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
