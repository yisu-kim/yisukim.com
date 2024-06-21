import Link from "next/link";

import { Email } from "@/ui/icons/email";
import { GitHub } from "@/ui/icons/github";
import { LinkedIn } from "@/ui/icons/linkedin";

type Props = Readonly<{
  creator: string;
}>;

export default function Footer({ creator }: Props) {
  return (
    <footer className="py-2 text-center flex flex-col gap-2">
      <div className="flex m-auto gap-3 justify-between">
        <Link href="mailto:yisu.kim.job@outlook.com">
          <Email width="1.4em" height="1.4em" />
        </Link>
        <Link href="https://github.com/yisu-kim" target="_blank">
          <GitHub width="1.4em" height="1.4em" />
        </Link>
        <Link href="https://www.linkedin.com/in/yisu-kim" target="_blank">
          <LinkedIn width="1.4em" height="1.4em" />
        </Link>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} {creator} · All rights reserved.
      </p>
    </footer>
  );
}
