import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH /api/projects/:id  -> update name and/or description
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, description } = await req.json();
  if (!name && typeof description === "undefined") {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }
  try {
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(typeof description !== "undefined" && { description }),
      },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}

// DELETE /api/projects/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
