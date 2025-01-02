import { Container, Header } from "@/components/shared";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
	const prisma = new PrismaClient();
	const tasks = await prisma.task.findMany();

	return (
		<Container>
			<h1 className="flex font-bold text-4xl justify-center mb-20">todo-app</h1>
			<Header initialTasks={tasks} />
		</Container>
	);
}
