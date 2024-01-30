import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import prisma from "../../prisma/client";
import Link from "next/link";
import { StatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(({ id, title, status, assignedToUser }) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${id}/`}>{title}</Link>
                      <StatusBadge status={status} />
                    </Flex>
                    {assignedToUser && (
                      <Avatar src={assignedToUser.image!} fallback="?" size="2" radius="full" />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
