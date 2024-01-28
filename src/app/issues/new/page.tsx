"use client";
import dynamic from "next/dynamic";
import React from "react";

const IssueForm = dynamic(() => import("../_components/IssueForm"), { ssr: false });

const page = () => {
  return <IssueForm />;
};

export default page;
