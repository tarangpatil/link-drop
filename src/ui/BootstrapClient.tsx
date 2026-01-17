"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    /// @ts-ignore
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  return <></>;
}
