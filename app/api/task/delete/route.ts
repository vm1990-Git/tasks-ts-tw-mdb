import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id: taskId } = body;

  if (!taskId || typeof taskId !== 'string') {
    throw new Error('Invalid ID');
  }

  const task = await prisma.task.deleteMany({
    where: {
      id: taskId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(task);
}