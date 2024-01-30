import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

type Props = {
  params: { id: string };
};

const fechUser = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
});

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOption);
  const numbericId = parseInt(id, 10);

  if (isNaN(numbericId) || numbericId.toString() !== id) notFound();

  const issue = await fechUser(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={id} />
            <DeleteIssueButton issueId={id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fechUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
