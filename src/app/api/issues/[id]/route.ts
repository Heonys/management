import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { patchIssueSchema } from "@/app/validation";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";

type Props = {
  params: { id: string };
};

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const validated = patchIssueSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(validated.error.format(), { status: 400 });
  }

  const { title, assignedToUserId, description } = body;

  if (assignedToUserId) {
    const user = prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid User" }, { status: 400 });
    }
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
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ message: "유효하지않은 이슈 입니다." }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({ message: "delete " });
}
