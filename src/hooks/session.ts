import { SessionContext } from "@/providers/session-client-provider";
import { useContext } from "react";

export function useSession() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return session;
}
