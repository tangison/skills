import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Try to update in DB, but don't fail if skill doesn't exist
    try {
      const { db } = await import('@/lib/db');
      await db.skill.update({
        where: { id },
        data: { copyCount: { increment: 1 } },
      });
    } catch {
      // Skill might not be in DB (seed data only) — that's fine
    }
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
