/** hooks/useIsSmall.ts */
import { useEffect, useState } from "react";

export const useIsSmall = () => {
  const mq = "(max-width: 1024px)";
  const [isSmall, setIsSmall] = useState(() => window.matchMedia(mq).matches);

  useEffect(() => {
    const mql = window.matchMedia(mq);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isSmall;
};
