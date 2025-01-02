import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	try {
		await prisma.task.delete({
			where: { id: parseInt(id, 10) },
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: "Task not found" }, { status: 404 });
	}
}
