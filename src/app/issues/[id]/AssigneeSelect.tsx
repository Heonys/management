"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios<User[]>("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="담당자" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users.map(({ id, name }) => {
            return (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
