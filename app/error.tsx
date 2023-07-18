"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type ErrorStateProps = {
  error: Error;
};

const ErrorState = (error: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="Uh no" subTitle="Something went wrong" />;
};

export default ErrorState;
