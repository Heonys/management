import dynamic from "next/dynamic";
import prisma from "../../../../../prisma/client";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
type Props = {
  params: { id: string };
};

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
