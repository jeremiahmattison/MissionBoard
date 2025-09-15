import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/projects
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST /api/projects
export async function POST(req: Request) {
  const { name, description, ownerId } = await req.json();
  if (!name || !ownerId) {
    return NextResponse.json({ error: "name and ownerId are required" }, { status: 400 });
  }
  const project = await prisma.project.create({
    data: { name, description, ownerId },
  });
  return NextResponse.json(project, { status: 201 });
}
