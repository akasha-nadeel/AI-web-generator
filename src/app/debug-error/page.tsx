"use client";

import { useEffect } from "react";

export default function DebugErrorPage() {
  useEffect(() => {
    // Intentionally throw an error to trigger the error.tsx boundary
    throw new Error("This is a test error to show the custom Error page design.");
  }, []);

  return (
    <div className="p-10 text-center">
      <p>Loading error test...</p>
    </div>
  );
}
