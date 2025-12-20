import React, { useState } from "react";
import { Input } from "root";

export function InputExample1() {
  const [val, setVal] = useState("");
  return (
    <div>
      <div className="mb-4 max-w-xs">
        <Input value={val} onChange={setVal} />
      </div>

      <div>Result: {val}</div>
    </div>
  );
}
