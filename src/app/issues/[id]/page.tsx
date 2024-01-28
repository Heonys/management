import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const numbericId = parseInt(id, 10);

  if (isNaN(numbericId) || numbericId.toString() !== id) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={id} />
          <DeleteIssueButton issueId={id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
