"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	text: string;
	onDelete: () => void;
}

export const Task: React.FC<Props> = ({ text, className, onDelete }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className="text-xl flex flex-row rounded-2xl w-full bg-white p-4 font-semibold text-neutral-950 box-border items-center">
			<div className="flex items-center">
				<Checkbox className="mr-6" onCheckedChange={handleCheckboxChange} />
				<span className={cn(isChecked ? "line-through text-gray-700" : "")}>
					{text}
				</span>
			</div>
			<button className="ml-auto" onClick={onDelete}>
				<CircleX size={38} color="#000000" strokeWidth={1} />
			</button>
		</div>
	);
};
