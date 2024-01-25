import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <Button>
      <Link href="/issues/new">new Issuee</Link>
    </Button>
  );
};

export default IssuesPage;
