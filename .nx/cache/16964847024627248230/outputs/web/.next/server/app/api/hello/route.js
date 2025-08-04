"use strict";
(() => {
  var e = {};
  ((e.id = 234),
    (e.ids = [234]),
    (e.modules = {
      399: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      517: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      8850: (e, r, t) => {
        (t.r(r),
          t.d(r, {
            originalPathname: () => c,
            patchFetch: () => h,
            requestAsyncStorage: () => u,
            routeModule: () => p,
            serverHooks: () => d,
            staticGenerationAsyncStorage: () => l,
          }));
        var o = {};
        (t.r(o), t.d(o, { GET: () => i }));
        var a = t(2631),
          n = t(9212),
          s = t(2282);
        async function i(e) {
          return new Response("Hello, from API!");
        }
        let p = new a.AppRouteRouteModule({
            definition: {
              kind: n.x.APP_ROUTE,
              page: "/api/hello/route",
              pathname: "/api/hello",
              filename: "route",
              bundlePath: "app/api/hello/route",
            },
            resolvedPagePath:
              "/workspaces/saigon-signals/web/src/app/api/hello/route.ts",
            nextConfigOutput: "",
            userland: o,
          }),
          {
            requestAsyncStorage: u,
            staticGenerationAsyncStorage: l,
            serverHooks: d,
          } = p,
          c = "/api/hello/route";
        function h() {
          return (0, s.patchFetch)({
            serverHooks: d,
            staticGenerationAsyncStorage: l,
          });
        }
      },
      2631: (e, r, t) => {
        e.exports = t(517);
      },
    }));
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    o = r.X(0, [520], () => t(8850));
  module.exports = o;
})();
