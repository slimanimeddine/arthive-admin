import { ARTWORK_STATUS_VALUES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function useStatus() {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(ARTWORK_STATUS_VALUES),
  );

  return {
    status,
    setStatus,
  };
}
