import { OutOfCreditsModal } from "@/components/ui/OutOfCreditsModal";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <OutOfCreditsModal />
    </>
  );
}
