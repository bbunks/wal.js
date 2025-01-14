import { wal } from "./wal";

export { wal };

if (typeof window !== "undefined") {
  (window as any).wal = wal;
}
