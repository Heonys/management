import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios<User[]>("/api/users").then((res) => res.data),
    staleTime: 5 * 1000,
    retry: 3,
  });

export default useUser;
