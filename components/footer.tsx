import Link from "next/link";

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
    <footer className="flex flex-col gap-2 py-2 text-center">
      <div className="m-auto flex justify-between gap-3">
        <Link href="mailto:yisu.kim.job@outlook.com" aria-label={mail}>
          <Email width="1.4em" height="1.4em" />
        </Link>
        <Link
          href="https://github.com/yisu-kim"
          target="_blank"
          aria-label={github}
        >
          <GitHub width="1.4em" height="1.4em" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/yisu-kim"
          target="_blank"
          aria-label={linkedin}
        >
          <LinkedIn width="1.4em" height="1.4em" />
        </Link>
      </div>
      <p className="text-sm">
        © {new Date().getFullYear()} {creator} · All rights reserved.
      </p>
    </footer>
  );
}
