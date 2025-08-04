(() => {
  var e = {};
  ((e.id = 409),
    (e.ids = [409]),
    (e.modules = {
      2934: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/action-async-storage.external.js");
      },
      4580: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external.js");
      },
      5869: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external.js");
      },
      399: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      4423: (e, t, n) => {
        "use strict";
        (n.r(t),
          n.d(t, {
            GlobalError: () => s.a,
            __next_app__: () => f,
            originalPathname: () => c,
            pages: () => d,
            routeModule: () => p,
            tree: () => a,
          }),
          n(4895),
          n(1476),
          n(1562));
        var r = n(3404),
          o = n(9212),
          i = n(8949),
          s = n.n(i),
          l = n(2846),
          u = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (u[e] = () => l[e]);
        n.d(t, u);
        let a = [
            "",
            {
              children: [
                "/_not-found",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(n.t.bind(n, 1476, 23)),
                        "next/dist/client/components/not-found-error",
                      ],
                    },
                  ],
                },
                {},
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(n.bind(n, 1562)),
                "/workspaces/saigon-signals/web/src/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(n.t.bind(n, 1476, 23)),
                "next/dist/client/components/not-found-error",
              ],
            },
          ],
          d = [],
          c = "/_not-found/page",
          f = { require: n, loadChunk: () => Promise.resolve() },
          p = new r.AppPageRouteModule({
            definition: {
              kind: o.x.APP_PAGE,
              page: "/_not-found/page",
              pathname: "/_not-found",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: a },
          });
      },
      3619: (e, t, n) => {
        (Promise.resolve().then(n.t.bind(n, 5614, 23)),
          Promise.resolve().then(n.t.bind(n, 1472, 23)),
          Promise.resolve().then(n.t.bind(n, 7e3, 23)),
          Promise.resolve().then(n.t.bind(n, 6709, 23)),
          Promise.resolve().then(n.t.bind(n, 1022, 23)),
          Promise.resolve().then(n.t.bind(n, 9358, 23)));
      },
      6932: () => {},
      7682: (e, t) => {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (function (e, t) {
            for (var n in t)
              Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
          })(t, {
            isNotFoundError: function () {
              return o;
            },
            notFound: function () {
              return r;
            },
          }));
        let n = "NEXT_NOT_FOUND";
        function r() {
          let e = Error(n);
          throw ((e.digest = n), e);
        }
        function o(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            "digest" in e &&
            e.digest === n
          );
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      4895: (e, t, n) => {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          (function (e, t) {
            for (var n in t)
              Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
          })(t, {
            PARALLEL_ROUTE_DEFAULT_PATH: function () {
              return o;
            },
            default: function () {
              return i;
            },
          }));
        let r = n(7682),
          o = "next/dist/client/components/parallel-route-default.js";
        function i() {
          (0, r.notFound)();
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      1562: (e, t, n) => {
        "use strict";
        (n.r(t), n.d(t, { default: () => i, metadata: () => o }));
        var r = n(2365);
        n(5340);
        let o = {
          title: "Welcome to web",
          description: "Generated by create-nx-workspace",
        };
        function i({ children: e }) {
          return r.jsx("html", {
            lang: "en",
            children: r.jsx("body", { children: e }),
          });
        }
      },
      5340: () => {},
    }));
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var n = (e) => t((t.s = e)),
    r = t.X(0, [520, 295], () => n(4423));
  module.exports = r;
})();
