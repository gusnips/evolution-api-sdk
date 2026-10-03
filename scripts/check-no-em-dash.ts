import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

const emDash = /—|\\u2014|\\u\{2014\}|&mdash;|&#(?:0*8212|x0*2014);/i;
const problems = new Set<string>();

for (const file of ["README.md", "CHANGELOG.md", "package.json"]) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (emDash.test(line)) problems.add(`${file}:${index + 1}`);
    });
}

for (const file of readdirSync("src", { recursive: true, encoding: "utf8" })) {
  if (
    !/\.tsx?$/.test(file) ||
    /(?:^|\/)(?:__tests__|tests)\/|\.(?:test|spec)\.tsx?$/.test(file)
  )
    continue;
  const path = join("src", file);
  const source = ts.createSourceFile(
    path,
    readFileSync(path, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const report = (node: ts.Node) => {
    const { line } = source.getLineAndCharacterOfPosition(
      node.getStart(source),
    );
    problems.add(`${path}:${line + 1}`);
  };
  const visit = (node: ts.Node): void => {
    if (
      (ts.isStringLiteralLike(node) ||
        ts.isTemplateHead(node) ||
        ts.isTemplateMiddle(node) ||
        ts.isTemplateTail(node) ||
        ts.isJsxText(node)) &&
      emDash.test(node.text)
    )
      report(node);
    // JSDoc ships in the declarations shown by an editor; implementation comments do not.
    for (const doc of ts.getJSDocCommentsAndTags(node)) {
      if (emDash.test(doc.getText(source))) report(doc);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

if (problems.size) {
  console.error(
    "Em dash found in public copy. Use a period, comma, colon or parentheses:\n" +
      [...problems].join("\n"),
  );
  process.exit(1);
}
console.log("Public copy has no em dashes.");
