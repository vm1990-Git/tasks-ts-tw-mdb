import getCurrentUser from './actions/getCurrentUser'
import { getTasks } from './actions/getTasks'
import Container from './components/Container'
import TaskCard from './components/TaskCard'
import EmptyState from './components/EmptyState'
import ClientOnly from './components/ClientOnly'
import EmptyTask from './components/EmptyTask'

const HomePage = async () => {

  try {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const tasks = await getTasks(currentUser.id);

      return (
        <ClientOnly>
          <Container>
            <div
              className="
                pt-24
                grid 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-8
                translate-y-14
                justify-items-center
              "
            >
              {tasks.map((task: any) => (
                <TaskCard data={task} key={task.id} />
              ))}
              <EmptyTask />
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

export default HomePage

