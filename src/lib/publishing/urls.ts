// Client + server safe. Kept separate from subdomain.ts so importing
// publicUrlFor into a "use client" component doesn't drag the
// Supabase server client into the browser bundle.

export const PUBLISH_APEX = process.env.NEXT_PUBLIC_PUBLISH_APEX || "weavo.site";

function isLocalApex(apex: string): boolean {
  return (
    apex === "localhost" ||
    apex.startsWith("127.") ||
    apex === "0.0.0.0"
  );
}

export function publicUrlFor(subdomain: string): string {
  const apex = PUBLISH_APEX;
  if (isLocalApex(apex)) {
    // Local dev: *.localhost resolves to 127.0.0.1 in all modern browsers.
    // We assume the Next dev server is on :3000 — override with
    // NEXT_PUBLIC_PUBLISH_LOCAL_PORT if you run on a different port.
    const port = process.env.NEXT_PUBLIC_PUBLISH_LOCAL_PORT || "3000";
    return `http://${subdomain}.${apex}:${port}`;
  }
  return `https://${subdomain}.${apex}`;
}
