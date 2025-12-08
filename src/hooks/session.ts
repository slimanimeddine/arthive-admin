import { useContext } from "react";
import { SessionContext } from "@/providers/session-client-provider";

export function useSession() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return session;
}
