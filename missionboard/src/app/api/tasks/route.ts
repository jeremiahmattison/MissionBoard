import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/tasks  -> list all tasks (newest first)
export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: true, assignee: true },
  });
  return NextResponse.json(tasks);
}

// POST /api/tasks  -> create a task
// expects JSON: { title: string, assigneeId: string, projectId?: string, notes?: string, status?: "TODO"|"IN_PROGRESS"|"DONE"|"BLOCKED", priority?: number, dueDate?: string }
export async function POST(req: Request) {
  const body = await req.json();
  const { title, assigneeId, projectId, notes, status, priority, dueDate } = body;

  if (!title || !assigneeId) {
    return NextResponse.json({ error: "title and assigneeId are required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      assigneeId,
      projectId: projectId || null,
      notes,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
