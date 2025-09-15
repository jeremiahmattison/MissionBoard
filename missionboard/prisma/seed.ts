import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1) Ensure a test user exists (id is stable across reruns via upsert on email)
  const password = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {}, // no updates for now
    create: {
      email: "test@example.com",
      name: "Test User",
      password,
    },
  });

  // 2) Create a project if none exist yet
  let project = await prisma.project.findFirst({ where: { ownerId: user.id } });
  if (!project) {
    project = await prisma.project.create({
      data: {
        name: "First Test Project",
        description: "Seeded project",
        ownerId: user.id,
      },
    });
  }

  // 3) Create a task if none exist yet
  const taskCount = await prisma.task.count({ where: { assigneeId: user.id } });
  if (taskCount === 0) {
    await prisma.task.create({
      data: {
        title: "Set up Prisma",
        notes: "Install, init, migrate",
        status: "IN_PROGRESS",
        priority: 2,
        assigneeId: user.id,
        projectId: project.id,
      },
    });
  }

  console.log("Seeded ✅");
  console.log({ userId: user.id, projectId: project.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
