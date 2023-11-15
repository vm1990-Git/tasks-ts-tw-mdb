import prisma from "@/app/libs/prismadb"

export async function getTasks(userId: string) {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }, where: {
                userId: userId
            }
        })
        return tasks
    } catch (error: any) {
        throw new Error(error)
    }
}