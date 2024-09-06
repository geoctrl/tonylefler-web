import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let outputTypes = `// auto-generated icon type definitions from /icons-build.js
export type Icons = `;

let outputComponent = `// auto-generated svg component from /icons-build.js
export function GlobalSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      __SYMBOLS__
    </svg>
  );
}
`;

(async () => {
  const iconNames = [];
  const iconsRaw = [];

  async function dirIcons(dir) {
    const icons = await fs.readdir(dir, { withFileTypes: true });
    const promises = icons.map(async (file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const nestedFiles = await dirIcons(filePath);
        iconNames.concat(nestedFiles);
      } else if (file.isFile() && path.extname(file.name) === ".svg") {
        const file = await fs.readFile(filePath, { encoding: "utf8" });
        const name = path.parse(filePath).name;
        const rawData = file
          .replace(/svg/g, "symbol")
          .replace(/symbol/, `symbol id="${name}"`);
        iconsRaw.push(rawData);

        iconNames.push(filePath);
      }
    });

    await Promise.all(promises);
  }

  await dirIcons(path.resolve(__dirname, "icons"));

  // TYPES
  outputTypes += `${iconNames
    .map((icon) => `"${path.basename(icon, ".svg")}"`)
    .join(" | ")};\n`;
  await fs.writeFile(
    path.resolve(__dirname, "app/types/icon-gen.ts"),
    outputTypes,
  );

  // COMPONENT
  const symbols = iconsRaw.join("\n");
  await fs.writeFile(
    path.resolve(__dirname, "app/components/global-svg.tsx"),
    outputComponent.replace("__SYMBOLS__", symbols),
  );
})();
