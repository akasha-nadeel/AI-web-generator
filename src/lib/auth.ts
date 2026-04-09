import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return user;
}

export async function getAuthUserId() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return userId;
}
