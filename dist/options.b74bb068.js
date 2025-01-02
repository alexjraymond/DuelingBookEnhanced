// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iUu8y":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Options", ()=>Options);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _client = require("react-dom/client");
var _styledComponents = require("styled-components");
var _styledComponentsDefault = parcelHelpers.interopDefault(_styledComponents);
var _optionsStorage = require("./options-storage");
var _utils = require("./utils");
function Options() {
    const [isLoading, setIsLoading] = (0, _react.useState)(true);
    const [hotkeyConfig, setHotkeyConfig] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        async function fetchHotkeys() {
            const hotkeys = await (0, _optionsStorage.hotkeyStorage).getAll();
            setHotkeyConfig(hotkeys);
            setIsLoading(false);
        }
        fetchHotkeys();
    }, []);
    const [list, setList] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        if (!isLoading) {
            const localList = Array.from((0, _utils.actionDisplayNames)).map(([key, val])=>{
                return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(KeybindEntry, {
                    id: key,
                    onClick: setKeybind,
                    children: [
                        val,
                        " | ",
                        hotkeyConfig[key]
                    ]
                }, key, true, {
                    fileName: "src/options.js",
                    lineNumber: 24,
                    columnNumber: 11
                }, this);
            });
            setList(localList);
        }
    }, [
        hotkeyConfig,
        isLoading
    ]);
    let keybind = "";
    let actionId = "";
    function setKeybind(e) {
        actionId = e.target.id;
        setHotkeyConfig({
            ...hotkeyConfig,
            [actionId]: "Setting keybind..."
        });
        document.addEventListener("keydown", recordKeybind);
    }
    function recordKeybind(e) {
        e.preventDefault();
        switch(e.key){
            case "Escape":
                if (keybind.endsWith("+")) keybind = keybind.substring(0, keybind.length - 1);
                else if (keybind === "") keybind = "Not Set";
                setHotkeyConfig({
                    ...hotkeyConfig,
                    [actionId]: keybind
                });
                document.removeEventListener("keydown", recordKeybind);
                (0, _optionsStorage.hotkeyStorage).set({
                    [actionId]: keybind
                });
                keybind = "";
                break;
            case "Meta":
                alert("This key is unsupported. Please try again.");
                setHotkeyConfig({
                    ...hotkeyConfig,
                    [actionId]: hotkeyConfig[actionId]
                });
                document.removeEventListener("keydown", recordKeybind);
                break;
            default:
                console.log(e.key);
                keybind += `${e.key}+`;
                break;
        }
    }
    return !isLoading && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(OptionsWrapper, {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
                children: "Customize Hotkeys"
            }, void 0, false, {
                fileName: "src/options.js",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                children: "Click on a box to begin recording your desired keybind, and press Escape to save it."
            }, void 0, false, {
                fileName: "src/options.js",
                lineNumber: 74,
                columnNumber: 9
            }, this),
            list
        ]
    }, void 0, true, {
        fileName: "src/options.js",
        lineNumber: 72,
        columnNumber: 7
    }, this);
}
const container = document.getElementById("dbe-options");
const root = (0, _client.createRoot)(container);
root.render(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Options, {}, void 0, false, {
    fileName: "src/options.js",
    lineNumber: 86,
    columnNumber: 13
}, undefined));
const OptionsWrapper = (0, _styledComponentsDefault.default).div`
  height: 500px;
  font-family: "Dejavu Sans";
`;
const KeybindEntry = (0, _styledComponentsDefault.default).div`
  display: flex;
  align-items: center;
  min-width: 300px;
  height: 25px;
  border: 3px solid black;
  padding: 0 5px;
  margin: 10px 0;
`;

},{"react/jsx-dev-runtime":"dQCHq","react":"cZrAr","react-dom/client":"fAcHq","styled-components":"lvo7W","./options-storage":"krcXZ","./utils":"5LKoK","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}]},["iUu8y"], "iUu8y", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBLEdBQUEsZ0NBQU0sQUFBRCxFQUFFLEdBQUcsQ0FBQzs7Ozs7Ozs7QUFRaEMsQ0FBQyIsInNvdXJjZXMiOlsic3JjL29wdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgaG90a2V5U3RvcmFnZSB9IGZyb20gXCIuL29wdGlvbnMtc3RvcmFnZVwiO1xuaW1wb3J0IHsgYWN0aW9uRGlzcGxheU5hbWVzIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIE9wdGlvbnMoKSB7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2hvdGtleUNvbmZpZywgc2V0SG90a2V5Q29uZmlnXSA9IHVzZVN0YXRlKG51bGwpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoSG90a2V5cygpIHtcbiAgICAgIGNvbnN0IGhvdGtleXMgPSBhd2FpdCBob3RrZXlTdG9yYWdlLmdldEFsbCgpO1xuICAgICAgc2V0SG90a2V5Q29uZmlnKGhvdGtleXMpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gICAgZmV0Y2hIb3RrZXlzKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBbbGlzdCwgc2V0TGlzdF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzTG9hZGluZykge1xuICAgICAgY29uc3QgbG9jYWxMaXN0ID0gQXJyYXkuZnJvbShhY3Rpb25EaXNwbGF5TmFtZXMpLm1hcCgoW2tleSwgdmFsXSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxLZXliaW5kRW50cnkgaWQ9e2tleX0ga2V5PXtrZXl9IG9uQ2xpY2s9e3NldEtleWJpbmR9PlxuICAgICAgICAgICAge3ZhbH0gfCB7aG90a2V5Q29uZmlnW2tleV19XG4gICAgICAgICAgPC9LZXliaW5kRW50cnk+XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIHNldExpc3QobG9jYWxMaXN0KTtcbiAgICB9XG4gIH0sIFtob3RrZXlDb25maWcsIGlzTG9hZGluZ10pO1xuXG4gIGxldCBrZXliaW5kID0gXCJcIjtcbiAgbGV0IGFjdGlvbklkID0gXCJcIjtcbiAgZnVuY3Rpb24gc2V0S2V5YmluZChlKSB7XG4gICAgYWN0aW9uSWQgPSBlLnRhcmdldC5pZDtcbiAgICBzZXRIb3RrZXlDb25maWcoeyAuLi5ob3RrZXlDb25maWcsIFthY3Rpb25JZF06IFwiU2V0dGluZyBrZXliaW5kLi4uXCIgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgcmVjb3JkS2V5YmluZCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWNvcmRLZXliaW5kKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgY2FzZSBcIkVzY2FwZVwiOlxuICAgICAgICBpZiAoa2V5YmluZC5lbmRzV2l0aChcIitcIikpIHtcbiAgICAgICAgICBrZXliaW5kID0ga2V5YmluZC5zdWJzdHJpbmcoMCwga2V5YmluZC5sZW5ndGggLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXliaW5kID09PSBcIlwiKSB7XG4gICAgICAgICAga2V5YmluZCA9IFwiTm90IFNldFwiO1xuICAgICAgICB9XG4gICAgICAgIHNldEhvdGtleUNvbmZpZyh7IC4uLmhvdGtleUNvbmZpZywgW2FjdGlvbklkXToga2V5YmluZCB9KTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgcmVjb3JkS2V5YmluZCk7XG4gICAgICAgIGhvdGtleVN0b3JhZ2Uuc2V0KHsgW2FjdGlvbklkXToga2V5YmluZCB9KTtcbiAgICAgICAga2V5YmluZCA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk1ldGFcIjpcbiAgICAgICAgYWxlcnQoXCJUaGlzIGtleSBpcyB1bnN1cHBvcnRlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgIHNldEhvdGtleUNvbmZpZyh7XG4gICAgICAgICAgLi4uaG90a2V5Q29uZmlnLFxuICAgICAgICAgIFthY3Rpb25JZF06IGhvdGtleUNvbmZpZ1thY3Rpb25JZF0sXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCByZWNvcmRLZXliaW5kKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhlLmtleSk7XG4gICAgICAgIGtleWJpbmQgKz0gYCR7ZS5rZXl9K2A7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgIWlzTG9hZGluZyAmJiAoXG4gICAgICA8T3B0aW9uc1dyYXBwZXI+XG4gICAgICAgIDxoMT5DdXN0b21pemUgSG90a2V5czwvaDE+XG4gICAgICAgIDxoMj5cbiAgICAgICAgICBDbGljayBvbiBhIGJveCB0byBiZWdpbiByZWNvcmRpbmcgeW91ciBkZXNpcmVkIGtleWJpbmQsIGFuZCBwcmVzc1xuICAgICAgICAgIEVzY2FwZSB0byBzYXZlIGl0LlxuICAgICAgICA8L2gyPlxuICAgICAgICB7bGlzdH1cbiAgICAgIDwvT3B0aW9uc1dyYXBwZXI+XG4gICAgKVxuICApO1xufVxuXG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRiZS1vcHRpb25zXCIpO1xuY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3QoY29udGFpbmVyKTtcbnJvb3QucmVuZGVyKDxPcHRpb25zIC8+KTtcblxuY29uc3QgT3B0aW9uc1dyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBoZWlnaHQ6IDUwMHB4O1xuICBmb250LWZhbWlseTogXCJEZWphdnUgU2Fuc1wiO1xuYDtcblxuY29uc3QgS2V5YmluZEVudHJ5ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLXdpZHRoOiAzMDBweDtcbiAgaGVpZ2h0OiAyNXB4O1xuICBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcbiAgcGFkZGluZzogMCA1cHg7XG4gIG1hcmdpbjogMTBweCAwO1xuYDtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJvcHRpb25zLkhBU0hfUkVGXzZlNmM3YTZhZmUzMDMzZmYuanMubWFwIn0=
