"use client";
import dynamic from "next/dynamic";
import React from "react";

const MarkdownForm = dynamic(() => import("./MarkdownForm"), { ssr: false });

const page = () => {
  return <MarkdownForm />;
};

export default page;
