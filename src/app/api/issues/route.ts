import { createIssueSchema } from "@/app/validation";
import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validate = createIssueSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
