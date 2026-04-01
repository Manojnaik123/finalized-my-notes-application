import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const targets = [
  path.join(root, "components"),
  path.join(root, "app", "api"),
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(name) && !name.endsWith(".d.ts")) acc.push(p);
  }
  return acc;
}

const printer = ts.createPrinterWithRemoveComments();

for (const base of targets) {
  for (const filePath of walk(base)) {
    const text = fs.readFileSync(filePath, "utf8");
    const kind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const sf = ts.createSourceFile(
      filePath.replace(/\\/g, "/"),
      text,
      ts.ScriptTarget.Latest,
      true,
      kind
    );
    const out = printer.printFile(sf) + (text.endsWith("\n") ? "" : "\n");
    fs.writeFileSync(filePath, out, "utf8");
    console.log("stripped:", path.relative(root, filePath));
  }
}
