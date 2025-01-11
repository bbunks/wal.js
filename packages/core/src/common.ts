import { Watcher } from "./Watcher";
import { ComputeVal } from "./ComputedVal";

export { Watcher, ComputeVal };

if (typeof window !== "undefined") {
  (window as any).Watcher = Watcher;
  (window as any).ComputeVal = ComputeVal;
}
