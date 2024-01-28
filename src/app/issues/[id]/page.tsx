import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
