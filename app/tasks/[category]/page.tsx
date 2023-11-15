import getCurrentUser from "@/app/actions/getCurrentUser";
import { getTasks } from "@/app/actions/getTasks";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import TaskCard from "@/app/components/TaskCard";

interface CatergoryParams {
    category?: string;
}

const CategoryPage = async ({ params }: { params: CatergoryParams }) => {

    try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
            const tasks = await getTasks(currentUser.id);
            const filteredTasks = tasks.filter((t)=>t.state === params.category)

            return (
                <ClientOnly>
                    <Container>
                        <div
                            className="
                                pt-24
                                grid 
                                grid-cols-1
                                sm:grid-cols-2
                                md:grid-cols-3
                                lg:grid-cols-4
                                xl:grid-cols-5
                                gap-8
                                translate-y-14
                                justify-items-center
                            "
                        >
                            {filteredTasks.map((task: any) => (
                                <TaskCard data={task} key={task.id} />
                            ))}
                        </div>
                    </Container>
                </ClientOnly>
            );
        } else {
            return <EmptyState />
        }
    } catch (error: any) {
        return <div>Error: {error.message}</div>;
    }
}

export default CategoryPage

