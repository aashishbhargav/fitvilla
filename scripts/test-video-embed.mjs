import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const sourcePath = new URL("../src/lib/videoEmbed.ts", import.meta.url);
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const exports = {};

vm.runInNewContext(compiled, { exports, URL, URLSearchParams });

const { getVideoEmbed, isEmbeddableVideo } = exports;
const assertJsonEqual = (actual, expected) => assert.equal(JSON.stringify(actual), JSON.stringify(expected));

assert.equal(isEmbeddableVideo("https://vimeo.com/123456789"), true);
assert.equal(isEmbeddableVideo("https://player.vimeo.com/video/123456789"), true);
assert.equal(isEmbeddableVideo("/videos/hero.mp4"), false);

assertJsonEqual(getVideoEmbed("https://vimeo.com/123456789"), {
  provider: "vimeo",
  src: "https://player.vimeo.com/video/123456789?autoplay=1&muted=1&loop=1&playsinline=1&dnt=1",
});

assertJsonEqual(getVideoEmbed("https://player.vimeo.com/video/123456789?h=abc123"), {
  provider: "vimeo",
  src: "https://player.vimeo.com/video/123456789?h=abc123&autoplay=1&muted=1&loop=1&playsinline=1&dnt=1",
});

assertJsonEqual(getVideoEmbed("https://vimeo.com/123456789", { controls: false }), {
  provider: "vimeo",
  src: "https://player.vimeo.com/video/123456789?autoplay=1&muted=1&loop=1&playsinline=1&dnt=1&controls=0",
});

assertJsonEqual(getVideoEmbed("https://drive.google.com/file/d/abc/preview"), {
  provider: "drive",
  src: "https://drive.google.com/file/d/abc/preview?autoplay=1",
});

assert.equal(getVideoEmbed("/videos/hero.mp4"), null);

console.log("video embed helpers passed");
