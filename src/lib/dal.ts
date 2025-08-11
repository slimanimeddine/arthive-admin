import "server-only";

import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifyAuth = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  if (!(session?.id && session?.token)) {
    redirect("/sign-in");
  }

  return { isAuth: true, id: session.id, token: session.token };
});
