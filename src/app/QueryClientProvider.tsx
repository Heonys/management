"use client";
import {
  QueryClient,
  QueryClientProvider as TanstackQeuryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <TanstackQeuryClientProvider client={queryClient}>{children}</TanstackQeuryClientProvider>;
};

export default QueryClientProvider;
