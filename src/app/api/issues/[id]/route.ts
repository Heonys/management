import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { issueSchema } from "@/app/validation";

type Props = {
  params: { id: string };
};

export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();

  const validated = issueSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(validated.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ message: "찾을 수 없습니다" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
