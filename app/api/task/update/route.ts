import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        id: taskId,
        title: UpdateTitle,
        description: UpdateDescription,
        state: UpdateState,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const task = await prisma.task.update({
        where: { id: taskId },
        data: {
            title: UpdateTitle,
            description: UpdateDescription,
            state: UpdateState,
        }
    });

    return NextResponse.json(task);
}