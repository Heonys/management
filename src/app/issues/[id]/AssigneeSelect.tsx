"use client";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import useUser from "./useUser";

type Props = {
  issue: Issue;
};

const AssigneeSelect = ({ issue }: Props) => {
  const { data: users, isLoading, error } = useUser();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const handleChange = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("담장자 업데이트에 문제가 발생했습니다.");
      });
  };

  return (
    <>
      <Select.Root
        onValueChange={handleChange}
        defaultValue={issue.assignedToUserId || "unassigned"}
      >
        <Select.Trigger placeholder="담당자" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item value="unassigned">담당자가 없습니다</Select.Item>
            {users?.map(({ id, name }) => {
              return (
                <Select.Item key={id} value={id}>
                  {name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
