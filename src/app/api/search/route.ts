import { NextResponse } from 'next/server';
import { SEED_SKILLS } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const lowerQuery = query.toLowerCase();
  const results = SEED_SKILLS.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.tagline.toLowerCase().includes(lowerQuery) ||
    skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  ).slice(0, 10);

  return NextResponse.json({ results });
}
