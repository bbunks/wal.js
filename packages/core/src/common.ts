import { Watcher } from "./Watcher";
import { ComputeVal } from "./ComputedVal";

if (typeof window !== "undefined") {
  (window as any).Watcher = Watcher;
  (window as any).ComputeVal = ComputeVal;
}
