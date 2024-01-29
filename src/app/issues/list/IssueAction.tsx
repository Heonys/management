import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatueFilter from "./IssueStatueFilter";

const IssueAction = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueStatueFilter />
      <Button>
        <Link href="/issues/new">new Issuee</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
