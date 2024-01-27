import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueAction = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">new Issuee</Link>
      </Button>
    </div>
  );
};

export default IssueAction;
