import { cn } from "@/lib/utils";
import React from "react";

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("flex flex-col mx-auto max-w-[815px] mt-20", className)}>
			{children}
		</div>
	);
};
