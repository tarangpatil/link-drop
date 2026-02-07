"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    /// @ts-expect-error bootstrap js bundle be imported
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  return <></>;
}
