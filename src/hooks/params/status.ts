import { parseAsStringLiteral, useQueryState } from "nuqs";
import { ARTWORK_STATUS_VALUES } from "@/lib/constants";

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
