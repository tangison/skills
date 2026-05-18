import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SEED_SKILLS } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const ecosystem = searchParams.get('ecosystem');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'quality';
    const limit = parseInt(searchParams.get('limit') || '50');

    let skills = await db.skill.findMany({
      where: {
        ...(category ? { categoryId: category } : {}),
        ...(ecosystem ? { ecosystemSource: ecosystem as any } : {}),
        ...(search ? {
          OR: [
            { name: { contains: search } },
            { tagline: { contains: search } },
          ]
        } : {}),
      },
      include: { category: true },
      orderBy: sort === 'trending'
        ? { installCount: 'desc' }
        : sort === 'newest'
          ? { createdAt: 'desc' }
          : sort === 'installs'
            ? { installCount: 'desc' }
            : { qualityScore: 'desc' },
      take: limit,
    });

    // If no skills in DB, return seed data
    if (skills.length === 0 && !category && !ecosystem && !search) {
      return NextResponse.json({ skills: SEED_SKILLS, total: SEED_SKILLS.length, source: 'seed' });
    }

    return NextResponse.json({ skills, total: skills.length, source: 'database' });
  } catch (error) {
    // Fallback to seed data on error
    return NextResponse.json({ skills: SEED_SKILLS, total: SEED_SKILLS.length, source: 'seed-fallback' });
  }
}
