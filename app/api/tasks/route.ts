import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const tasks = await prisma.task.findMany();
	return NextResponse.json(tasks);
}

export async function POST(req: Request) {
	const { text } = await req.json();

	if (!text || text.trim() === "") {
		return NextResponse.json(
			{ error: "Task text cannot be empty" },
			{ status: 400 }
		);
	}

	const newTask = await prisma.task.create({
		data: { text },
	});

	return NextResponse.json(newTask);
}
