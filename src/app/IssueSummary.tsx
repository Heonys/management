import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ value, label, status }) => {
        return (
          <Card key={label}>
            <Flex direction="column" gap="1">
              <Link className="text-sm font-medium" href={`/issues/list?status=${status}`}>
                {label}
              </Link>
            </Flex>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
