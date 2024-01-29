"use client";
import { Status } from "@prisma/client";
import { Select, SelectContent } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type StatusType = {
  id: number;
  label: string;
  value?: Status;
};

const satuses: StatusType[] = [
  { id: 1, label: "All" },
  { id: 2, label: "Open", value: "OPEN" },
  { id: 3, label: "In Progress", value: "IN_PROGRESS" },
  { id: 4, label: "Closed", value: "CLOSED" },
];

const IssueStatueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (status: string) => {
    const params = new URLSearchParams();

    params.append("status", status);
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }

    const query = params.size ? params.toString() : "";
    router.push(`/issues/list?${query}`);
  };

  return (
    <Select.Root onValueChange={handleChange} defaultValue={searchParams.get("status") || ""}>
      <Select.Trigger placeholder="필터링하기" />
      <SelectContent>
        {satuses.map(({ id, label, value }) => {
          return (
            <Select.Item key={id} value={value || "All"}>
              {label}
            </Select.Item>
          );
        })}
      </SelectContent>
    </Select.Root>
  );
};

export default IssueStatueFilter;
