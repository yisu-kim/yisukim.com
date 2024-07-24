import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Email } from "@/assets/icons/email";
import { GitHub } from "@/assets/icons/github";
import { LinkedIn } from "@/assets/icons/linkedin";

type Props = Readonly<{
  creator: string;
  contactLinkLabel: {
    email: string;
    github: string;
    linkedin: string;
  };
}>;

export default function Footer({
  creator,
  contactLinkLabel: { email: mail, github, linkedin },
}: Props) {
  return (
    <footer className="mt-4 flex flex-col gap-2 border-t p-4 text-center">
      <div className="m-auto flex justify-between gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="mailto:yisu.kim.job@outlook.com" aria-label={mail}>
            <Email className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link
            href="https://github.com/yisu-kim"
            target="_blank"
            aria-label={github}
          >
            <GitHub className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link
            href="https://www.linkedin.com/in/yisu-kim"
            target="_blank"
            aria-label={linkedin}
          >
            <LinkedIn className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} {creator} · All rights reserved.
      </p>
    </footer>
  );
}
