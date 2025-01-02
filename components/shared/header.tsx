"use client";

import React, { useState } from "react";
import { MoveRight } from "lucide-react";
import { Task } from "./task";

interface TaskType {
	id: number;
	text: string;
}

interface Props {
	initialTasks: TaskType[];
}

export function Header({ initialTasks }: Props) {
	const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const addTask = async () => {
		if (!inputValue.trim()) return;

		try {
			const res = await fetch("/api/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: inputValue }),
			});

			if (res.ok) {
				const newTask = await res.json();
				setTasks((prev) => [...prev, newTask]);
				setInputValue("");
			}
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	const deleteTask = async (id: number) => {
		try {
			const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

			if (res.ok) {
				setTasks((prev) => prev.filter((task) => task.id !== id));
			}
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	return (
		<div className="flex flex-col gap-7">
			<form
				className="relative"
				onSubmit={(e) => {
					e.preventDefault();
					addTask();
				}}
			>
				<input
					value={inputValue}
					onChange={handleInputChange}
					className="text-xl rounded-3xl outline-none w-full bg-white p-4 text-neutral-950 box-border placeholder:text-neutral-950"
					type="text"
					placeholder="write something and press enter"
				/>
				<MoveRight
					className="top-1/2 -translate-y-1/2 right-4 absolute cursor-pointer"
					color="#000000"
					size={38}
					strokeWidth={1}
					onClick={addTask}
				/>
			</form>

			<ul className="flex flex-col gap-2">
				{tasks.map((task) => (
					<li key={task.id} className="list-none">
						<Task
							text={task.text}
							onDelete={() => deleteTask(task.id)}
							className="text-xl flex flex-row rounded-2xl w-full bg-white p-4 font-semibold text-neutral-950 box-border items-center"
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
