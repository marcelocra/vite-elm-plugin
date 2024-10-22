import { execSync as c } from "node:child_process";

var p = "vite-elm-plugin";
function g({ mode: l, elmCompiledJs: o, isWatchMode: e }) {
  let i = ["**/elm-stuff/**", o];
  return {
    base: "./",
    clearScreen: !1,
    server: e ? { watch: { ignored: i } } : {},
    build: { emptyOutDir: !0, ...(e ? { watch: { exclude: i } } : {}) },
    define: { __IS_DEV_MODE__: l === "development" },
  };
}
function u(l) {
  let { elmMakeInput: o, elmMakeOutput: e, shouldOptimize: i } = l;
  return `
      elm make ${o} --output=${e} ${i ? "--optimize" : ""} \\
      && sed -i -E -e 's/\\(this\\)/(window)/g' ${e}
  `;
}
function h({
  elmInputMain: l = "src/Main.elm",
  elmJsOutputTo: o = "compiled.js",
  shouldOptimizeOutput: e = !1,
  ignoreElm: i = !1,
  extraConfigs: n = {},
} = {}) {
  let t = process.argv.includes("--watch"),
    r = e;
  return (
    console.log("isWatchMode", t),
    console.log("shouldOptimize", r),
    {
      name: p,
      config(s, { command: m, mode: d }) {
        m === "build" && !t ? (r = !0) : (r = !1);
        let a = g({ mode: d, elmCompiledJs: o, isWatchMode: t });
        return n.build && (a.build = { ...a.build, ...n.build }), a;
      },
      async buildStart() {
        if (i) {
          console.log("Ignoring Elm changes.");
          return;
        }
        try {
          console.log("Starting Elm compilation..."),
            c(u({ elmMakeInput: l, elmMakeOutput: o, shouldOptimize: r }), { stdio: "inherit" }),
            console.log("Elm compilation finished.");
        } catch (s) {
          throw (console.error("Elm compilation error:", s.stderr), new Error("Failed to compile Elm files."));
        } finally {
          console.log("Elm build process completed.");
        }
      },
      async watchChange(s) {
        if (i) {
          console.log("Ignoring Elm changes.");
          return;
        }
        if (s.endsWith(".elm"))
          try {
            c(u({ elmMakeInput: l, elmMakeOutput: o, shouldOptimize: e }), { stdio: "inherit" });
          } catch (m) {
            console.error("Elm compilation error:", m.stderr);
          }
      },
    }
  );
}
export { h as elmCompilerPlugin, u as elmMakeCommand };
//# sourceMappingURL=vite-elm-plugin.js.map
