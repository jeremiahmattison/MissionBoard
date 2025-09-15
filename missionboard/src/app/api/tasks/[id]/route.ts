import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/tasks/:id  -> fetch one task
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: { project: true, assignee: true },
    });
    if (!task) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// PATCH /api/tasks/:id  -> update fields
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { title, notes, status, priority, dueDate, projectId, assigneeId } = await req.json();

  try {
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(typeof notes !== "undefined" && { notes }),
        ...(status && { status }),
        ...(typeof priority !== "undefined" && { priority }),
        ...(typeof projectId !== "undefined" && { projectId }),
        ...(typeof assigneeId !== "undefined" && { assigneeId }),
        ...(typeof dueDate !== "undefined" && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}

// DELETE /api/tasks/:id
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
