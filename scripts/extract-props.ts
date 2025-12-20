import path from "path";
import fs from "fs";
import { parseComponent } from "react-tsdoc";

// Component to extract props from
const componentPath = path.resolve(
  process.cwd(),
  "app/common/icon/icon.tsx"
);

// Extract props using react-tsdoc
const result = parseComponent(componentPath);

console.log("Extracted props:", JSON.stringify(result, null, 2));

// Generate __generated-props.ts file
const outputPath = path.join(path.dirname(componentPath), "__generated-props.ts");

const propsContent = `// AUTO-GENERATED. DO NOT EDIT.
// Generated from icon.tsx using react-tsdoc

export const iconProps = ${JSON.stringify(result, null, 2)} as const;
`;

fs.writeFileSync(outputPath, propsContent, "utf-8");
console.log(`✓ Generated ${outputPath}`);
