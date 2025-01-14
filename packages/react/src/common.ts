import { useWatcher } from "./useWatcher";

export { useWatcher };

if (typeof window !== "undefined") {
  (window as any).useWatcher = useWatcher;
}
