import type {PropsWithChildren} from "react";

import {cn} from "../lib/cn";

export function PageWrapper({
  children,
  className,
  fluid,
}: PropsWithChildren<{
  fluid?: boolean;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col items-center",
        className,
        fluid ? "max-w-full" : "max-w-6xl",
      )}
    >
      {children}
    </div>
  );
}
