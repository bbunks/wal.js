import { useWatcher } from "@wal.js/react";
import { CounterWatcher } from "../../stores/CounterStore";

export default function Counter() {
  const count = useWatcher(CounterWatcher);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">React Counter</h1>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onMouseDown={() => (CounterWatcher.value -= 1)}
        >
          Decrement
        </button>
        <h2 className="text-xl font-bold">{count}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onMouseDown={() => (CounterWatcher.value += 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
