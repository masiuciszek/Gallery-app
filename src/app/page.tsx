import Link from "next/link";

import {H1, Lead, Span} from "@/components/typography";
import {appData} from "@/lib/config";

function Title() {
  let [nutri, check] = appData.title.split(" ");
  return (
    <aside>
      <H1>{appData.title}</H1>
      <Lead className="flex gap-1">
        Welcome to{" "}
        <Span className="relative rounded-sm after:absolute after:left-0 after:top-3 after:h-1 after:w-full after:-rotate-3  after:bg-primary/20 after:transition-transform after:content-['']">
          {nutri}
        </Span>{" "}
        <Span className="relative rounded-sm after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:rotate-2 after:bg-primary/20 after:transition-transform after:content-['']">
          {check}
        </Span>
      </Lead>
    </aside>
  );
}

export default async function Home() {
  return (
    <div>
      <Title />
      <Link href="/foods">View foods</Link>
    </div>
  );
}
