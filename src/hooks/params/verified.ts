import { parseAsBoolean, useQueryState } from "nuqs";

export function useVerified() {
  const [verified, setVerified] = useQueryState("verified", parseAsBoolean);

  return {
    verified,
    setVerified,
  };
}
