import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { getSession } from "@/actions/session";

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
