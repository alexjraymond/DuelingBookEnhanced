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
})({"bOkLm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// NOTE: Add some denounce state here or something.
parcelHelpers.export(exports, "loadHotkeys", ()=>loadHotkeys);
var _optionsStorageJs = require("./options-storage.js");
var _hotkeysJs = require("hotkeys-js");
var _hotkeysJsDefault = parcelHelpers.interopDefault(_hotkeysJs);
console.log("\uD83D\uDC88 Content script loaded for", chrome.runtime.getManifest().name);
async function loadHotkeys() {
    const hotkeyConfig = await (0, _optionsStorageJs.hotkeyStorage).getAll();
    (0, _hotkeysJsDefault.default)(hotkeyConfig.toggleDeckView, function(e) {
        e.preventDefault();
        handleDeckView("Main");
    });
    (0, _hotkeysJsDefault.default)("Escape", function(e) {
        e.preventDefault();
        closeViewMenu();
    });
}
function closeViewMenu() {
    console.log("Closing");
    document.getElementById("view")?.getElementsByClassName("exit_btn")[0]?.click();
}
function handleDeckView(deckType) {
    let deck = document.getElementById("deck_hidden");
    const mouseOverEvent = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    if (deckType === "Main") deck?.dispatchEvent(mouseOverEvent);
    else if (deckType === "Extra") extraDeck?.dispatchEvent(mouseOverEvent);
    deckMenu = document.getElementById("card_menu_content");
    deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[0];
    deckViewSpan = deckViewButton?.getElementsByTagName("span")[0];
    if (deckViewSpan && deckViewSpan.textContent === "View") deckViewSpan.click();
    else if (deckViewSpan && deckViewSpan.textContent === "Show") {
        deckViewButton = deckMenu?.getElementsByClassName("card_menu_btn")[1];
        deckViewSpan = deckViewButton?.getElementsByTagName("span")[0];
        deckViewSpan.click();
    } else closeViewMenu();
}
async function init() {
    console.log("init called");
    await loadHotkeys();
    console.log("Loaded!");
}
(0, _optionsStorageJs.hotkeyStorage).onChanged(async ()=>{
    await loadHotkeys();
    console.log("Hotkeys Updated");
});
init();

},{"./options-storage.js":"krcXZ","hotkeys-js":"h9Qxi","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"krcXZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hotkeyStorage", ()=>hotkeyStorage);
var _webextOptionsSync = require("webext-options-sync");
var _webextOptionsSyncDefault = parcelHelpers.interopDefault(_webextOptionsSync);
var _utils = require("./utils");
const optionsStorage = new (0, _webextOptionsSyncDefault.default)({
    defaults: {
        disableExtension: false,
        disableHotkeys: false,
        skipIntro: false,
        autoConnect: false,
        darkMode: false
    },
    migrations: [
        (0, _webextOptionsSyncDefault.default).migrations.removeUnused
    ],
    logging: true
});
exports.default = optionsStorage;
const hotkeyStorage = new (0, _webextOptionsSyncDefault.default)({
    defaults: Object.assign({}, ...Array.from((0, _utils.actionDisplayNames).keys()).map((item)=>({
            [item]: "Not Set"
        }))),
    //migrations: [OptionsSync.migrations.removeUnused],
    logging: true
});

},{"webext-options-sync":"5Apzs","./utils":"5LKoK","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"5Apzs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _throttleDebounce = require("throttle-debounce");
var _webextPolyfillKinda = require("webext-polyfill-kinda");
var _webextPolyfillKindaDefault = parcelHelpers.interopDefault(_webextPolyfillKinda);
var _webextDetect = require("webext-detect");
var _domFormSerializerMjs = require("dom-form-serializer/dist/dom-form-serializer.mjs");
var _lzString = require("lz-string");
var _lzStringDefault = parcelHelpers.interopDefault(_lzString);
var _webextEvents = require("webext-events");
var _fileJs = require("./file.js");
// eslint-disable-next-line @typescript-eslint/naming-convention -- CJS in ESM imports
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = (0, _lzStringDefault.default);
function alertAndThrow(message) {
    // eslint-disable-next-line no-alert
    alert(message);
    throw new Error(message);
}
async function shouldRunMigrations() {
    const self = await (0, _webextPolyfillKindaDefault.default).management?.getSelf();
    // Always run migrations during development #25
    if (self?.installType === 'development') return true;
    return new Promise((resolve)=>{
        // Run migrations when the extension is installed or updated
        chrome.runtime.onInstalled.addListener(()=>{
            resolve(true);
        });
        // If `onInstalled` isn't fired, then migrations should not be run
        setTimeout(resolve, 500, false);
    });
}
class OptionsSync {
    static migrations = {
        /**
        Helper method that removes any option that isn't defined in the defaults. It's useful to avoid leaving old options taking up space.
        */ removeUnused (options, defaults) {
            for (const key of Object.keys(options))if (!(key in defaults)) delete options[key];
        }
    };
    storageName;
    storageType;
    defaults;
    _form;
    _migrations;
    /**
    @constructor Returns an instance linked to the chosen storage.
    @param setup - Configuration for `webext-options-sync`
    */ constructor({ // `as` reason: https://github.com/fregante/webext-options-sync/pull/21#issuecomment-500314074
    defaults = {}, storageName = 'options', migrations = [], logging = true, storageType = 'sync' } = {}){
        this.storageName = storageName;
        this.defaults = defaults;
        this.storageType = storageType;
        if (!logging) this._log = ()=>{};
        this._migrations = this._runMigrations(migrations);
    }
    get storage() {
        return (0, _webextPolyfillKindaDefault.default).storage[this.storageType];
    }
    /**
    Retrieves all the options stored.

    @returns Promise that will resolve with **all** the options stored, as an object.

    @example
    const optionsStorage = new OptionsSync();
    const options = await optionsStorage.getAll();
    console.log('The user’s options are', options);
    if (options.color) {
        document.body.style.color = color;
    }
    */ async getAll() {
        await this._migrations;
        return this._getAll();
    }
    /**
    Overrides **all** the options stored with your `options`.

    @param newOptions - A map of default options as strings or booleans. The keys will have to match the form fields' `name` attributes.
    */ async setAll(newOptions) {
        await this._migrations;
        return this._setAll(newOptions);
    }
    /**
    Merges new options with the existing stored options.

    @param newOptions - A map of default options as strings or booleans. The keys will have to match the form fields' `name` attributes.
    */ async set(newOptions) {
        return this.setAll({
            ...await this.getAll(),
            ...newOptions
        });
    }
    /**
    Any defaults or saved options will be loaded into the `<form>` and any change will automatically be saved to storage

    @param selector - The `<form>` that needs to be synchronized or a CSS selector (one element).
    The form fields' `name` attributes will have to match the option names.
    */ async syncForm(form) {
        this.stopSyncForm();
        this._form = form instanceof HTMLFormElement ? form : document.querySelector(form);
        this._form.addEventListener('input', this._handleFormInput);
        this._form.addEventListener('submit', this._handleFormSubmit);
        chrome.storage.onChanged.addListener(this._handleStorageChangeOnForm);
        this._updateForm(this._form, await this.getAll());
        this._form.querySelector('.js-export')?.addEventListener('click', this.exportToFile);
        this._form.querySelector('.js-import')?.addEventListener('click', this.importFromFile);
        (0, _webextEvents.onContextInvalidated).addListener(()=>{
            location.reload();
        });
    }
    /**
    Removes any listeners added by `syncForm`
    */ stopSyncForm() {
        if (this._form) {
            this._form.removeEventListener('input', this._handleFormInput);
            this._form.removeEventListener('submit', this._handleFormSubmit);
            this._form.querySelector('.js-export')?.removeEventListener('click', this.exportToFile);
            this._form.querySelector('.js-import')?.removeEventListener('click', this.importFromFile);
            chrome.storage.onChanged.removeListener(this._handleStorageChangeOnForm);
            delete this._form;
        }
    }
    get _jsonIdentityHelper() {
        return '__webextOptionsSync';
    }
    /**
    Opens the browser’s file picker to import options from a previously-saved JSON file
    */ importFromFile = async ()=>{
        const text = await (0, _fileJs.loadFile)();
        let options;
        try {
            options = JSON.parse(text);
        } catch  {
            alertAndThrow('The file is not a valid JSON file.');
        }
        if (!(this._jsonIdentityHelper in options)) alertAndThrow('The file selected is not a valid recognized options file.');
        delete options[this._jsonIdentityHelper];
        await this.set(options);
        if (this._form) this._updateForm(this._form, options);
    };
    /**
    Opens the browser’s "save file" dialog to export options to a JSON file
    */ exportToFile = async ()=>{
        const extension = chrome.runtime.getManifest();
        const text = JSON.stringify({
            [this._jsonIdentityHelper]: extension.name,
            ...await this.getAll()
        }, null, '\t');
        await (0, _fileJs.saveFile)(text, extension.name + ' options.json');
    };
    onChanged(callback, signal) {
        const onChanged = (changes, area)=>{
            const data = changes[this.storageName];
            if (data && area === this.storageType) callback(this._decode(data.newValue), this._decode(data.oldValue ?? {}));
        };
        chrome.storage.onChanged.addListener(onChanged);
        signal?.addEventListener('abort', ()=>{
            chrome.storage.onChanged.removeListener(onChanged);
        });
    }
    _log(method, ...arguments_) {
        console[method](...arguments_);
    }
    async _getAll() {
        const result = await this.storage.get(this.storageName);
        return this._decode(result[this.storageName]);
    }
    async _setAll(newOptions) {
        this._log('log', 'Saving options', newOptions);
        await this.storage.set({
            [this.storageName]: this._encode(newOptions)
        });
    }
    _encode(options) {
        const thinnedOptions = {
            ...options
        };
        for (const [key, value] of Object.entries(thinnedOptions))if (this.defaults[key] === value) delete thinnedOptions[key];
        this._log('log', 'Without the default values', thinnedOptions);
        return compressToEncodedURIComponent(JSON.stringify(thinnedOptions));
    }
    _decode(options) {
        let decompressed = options;
        if (typeof options === 'string') decompressed = JSON.parse(decompressFromEncodedURIComponent(options));
        return {
            ...this.defaults,
            ...decompressed
        };
    }
    async _runMigrations(migrations) {
        if (migrations.length === 0 || !(0, _webextDetect.isBackground)() || !await shouldRunMigrations()) return;
        const options = await this._getAll();
        const initial = JSON.stringify(options);
        this._log('log', 'Found these stored options', {
            ...options
        });
        this._log('info', 'Will run', migrations.length, migrations.length === 1 ? 'migration' : ' migrations');
        for (const migrate of migrations)// eslint-disable-next-line no-await-in-loop -- Must be done in order
        await migrate(options, this.defaults);
        // Only save to storage if there were any changes
        if (initial !== JSON.stringify(options)) await this._setAll(options);
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering -- Needs to be near _handleFormSubmit
    _handleFormInput = (0, _throttleDebounce.debounce)(300, async ({ target })=>{
        const field = target;
        if (!field.name) return;
        try {
            await this.set(this._parseForm(field.form));
        } catch (error) {
            field.dispatchEvent(new CustomEvent('options-sync:save-error', {
                bubbles: true,
                detail: error
            }));
            throw error;
        }
        field.dispatchEvent(new CustomEvent('options-sync:save-success', {
            bubbles: true
        }));
        // TODO: Deprecated; drop in next major
        field.form.dispatchEvent(new CustomEvent('options-sync:form-synced', {
            bubbles: true
        }));
    });
    _handleFormSubmit(event) {
        event.preventDefault();
    }
    _updateForm(form, options) {
        // Reduce changes to only values that have changed
        const currentFormState = this._parseForm(form);
        for (const [key, value] of Object.entries(options))if (currentFormState[key] === value) delete options[key];
        const include = Object.keys(options);
        if (include.length > 0) // Limits `deserialize` to only the specified fields. Without it, it will try to set the every field, even if they're missing from the supplied `options`
        (0, _domFormSerializerMjs.deserialize)(form, options, {
            include
        });
    }
    // Parse form into object, except invalid fields
    _parseForm(form) {
        const include = [];
        // Don't serialize disabled and invalid fields
        for (const field of form.querySelectorAll('[name]'))if (field.validity.valid && !field.disabled) include.push(field.name.replace(/\[.*]/, ''));
        return (0, _domFormSerializerMjs.serialize)(form, {
            include
        });
    }
    _handleStorageChangeOnForm = (changes, areaName)=>{
        if (areaName === this.storageType && this.storageName in changes && (!document.hasFocus() || !this._form.contains(document.activeElement) // Avoid applying changes while the user is editing a field
        )) this._updateForm(this._form, this._decode(changes[this.storageName].newValue));
    };
}
exports.default = OptionsSync;

},{"throttle-debounce":"3UUQo","webext-polyfill-kinda":"hSrui","webext-detect":"iCTjD","dom-form-serializer/dist/dom-form-serializer.mjs":"jWODf","lz-string":"i8EbL","webext-events":"4OdgO","./file.js":"l2Qzt","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"3UUQo":[function(require,module,exports,__globalThis) {
/* eslint-disable no-undefined,no-param-reassign,no-shadow */ /**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
 *                                            are most useful.
 * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
 *                                            as-is, to `callback` when the throttled-function is executed.
 * @param {object} [options] -              An object to configure options.
 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
 *                                            `delay` milliseconds, the internal counter is reset).
 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
 *                                            callback will never executed if both noLeading = true and noTrailing = true.
 * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
 *                                            false (at end), schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function} A new, throttled, function.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
parcelHelpers.export(exports, "throttle", ()=>throttle);
function throttle(delay, callback, options) {
    var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
    /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */ var timeoutID;
    var cancelled = false;
    // Keep track of the last time `callback` was executed.
    var lastExec = 0;
    // Function to clear existing timeout
    function clearExistingTimeout() {
        if (timeoutID) clearTimeout(timeoutID);
    }
    // Function to cancel next exec
    function cancel(options) {
        var _ref2 = options || {}, _ref2$upcomingOnly = _ref2.upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
        clearExistingTimeout();
        cancelled = !upcomingOnly;
    }
    /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */ function wrapper() {
        for(var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++)arguments_[_key] = arguments[_key];
        var self = this;
        var elapsed = Date.now() - lastExec;
        if (cancelled) return;
        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Date.now();
            callback.apply(self, arguments_);
        }
        /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */ function clear() {
            timeoutID = undefined;
        }
        if (!noLeading && debounceMode && !timeoutID) /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`
       * and noLeading != true.
       */ exec();
        clearExistingTimeout();
        if (debounceMode === undefined && elapsed > delay) {
            if (noLeading) {
                /*
         * In throttle mode with noLeading, if `delay` time has
         * been exceeded, update `lastExec` and schedule `callback`
         * to execute after `delay` ms.
         */ lastExec = Date.now();
                if (!noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, delay);
            } else /*
         * In throttle mode without noLeading, if `delay` time has been exceeded, execute
         * `callback`.
         */ exec();
        } else if (noTrailing !== true) /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */ timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
    wrapper.cancel = cancel;
    // Return the wrapper function.
    return wrapper;
}
/* eslint-disable no-undefined */ /**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                        to `callback` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */ function debounce(delay, callback, options) {
    var _ref = options || {}, _ref$atBegin = _ref.atBegin, atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
    return throttle(delay, callback, {
        debounceMode: atBegin !== false
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"8ISrk":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"hSrui":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function NestedProxy(target) {
    return new Proxy(target, {
        get (target, prop) {
            if (!target[prop]) return;
            if (typeof target[prop] !== 'function') return new NestedProxy(target[prop]);
            return (...arguments_)=>new Promise((resolve, reject)=>{
                    target[prop](...arguments_, (result)=>{
                        if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
                        else resolve(result);
                    });
                });
        }
    });
}
const chromeP = globalThis.chrome && new NestedProxy(globalThis.chrome);
exports.default = chromeP;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"iCTjD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "disableWebextDetectPageCache", ()=>disableWebextDetectPageCache);
parcelHelpers.export(exports, "isWebPage", ()=>isWebPage);
parcelHelpers.export(exports, "isExtensionContext", ()=>isExtensionContext);
parcelHelpers.export(exports, "isSandboxedPage", ()=>isSandboxedPage);
parcelHelpers.export(exports, "isContentScript", ()=>isContentScript);
parcelHelpers.export(exports, "isBackground", ()=>isBackground);
parcelHelpers.export(exports, "isBackgroundPage", ()=>isBackgroundPage);
parcelHelpers.export(exports, "isBackgroundWorker", ()=>isBackgroundWorker);
parcelHelpers.export(exports, "isPersistentBackgroundPage", ()=>isPersistentBackgroundPage);
parcelHelpers.export(exports, "isOptionsPage", ()=>isOptionsPage);
parcelHelpers.export(exports, "isSidePanel", ()=>isSidePanel);
parcelHelpers.export(exports, "isActionPopup", ()=>isActionPopup);
parcelHelpers.export(exports, "isMainDevToolsPage", ()=>isMainDevToolsPage);
parcelHelpers.export(exports, "isDevToolsPage", ()=>isDevToolsPage);
parcelHelpers.export(exports, "isDevTools", ()=>isDevTools);
parcelHelpers.export(exports, "isOffscreenDocument", ()=>isOffscreenDocument);
parcelHelpers.export(exports, "isFirefox", ()=>isFirefox);
parcelHelpers.export(exports, "isChrome", ()=>isChrome);
parcelHelpers.export(exports, "isSafari", ()=>isSafari);
parcelHelpers.export(exports, "isMobileSafari", ()=>isMobileSafari);
parcelHelpers.export(exports, "contextNames", ()=>contextNames);
/** Returns the first matching context among those defined in `ContextName`, depending on the current context. Returns "unknown" if no match is found. */ parcelHelpers.export(exports, "getContextName", ()=>getContextName);
let cache = true;
function disableWebextDetectPageCache() {
    cache = false;
}
function isCurrentPathname(path) {
    if (!path) return false;
    try {
        const { pathname } = new URL(path, location.origin);
        return pathname === location.pathname;
    } catch  {
        return false;
    }
}
function getManifest(_version) {
    return globalThis.chrome?.runtime?.getManifest?.();
}
/* @__PURE__ */ function once(function_) {
    let result;
    return ()=>{
        if (!cache || result === undefined) result = function_();
        return result;
    };
}
const isWebPage = once(()=>[
        'about:',
        'http:',
        'https:'
    ].includes(location.protocol));
const isExtensionContext = once(()=>typeof globalThis.chrome?.runtime?.id === 'string');
const isSandboxedPage = once(()=>location.protocol.endsWith('-extension:') && !isExtensionContext());
const isContentScript = once(()=>isExtensionContext() && isWebPage());
const isBackground = ()=>isBackgroundPage() || isBackgroundWorker();
const isBackgroundPage = once(()=>{
    const manifest = getManifest(2);
    if (!manifest) return false;
    if (isCurrentPathname(manifest.background_page ?? manifest.background?.page)) return true;
    return Boolean(manifest.background?.scripts && isCurrentPathname('/_generated_background_page.html'));
});
const isBackgroundWorker = once(()=>isCurrentPathname(getManifest(3)?.background?.service_worker));
const isPersistentBackgroundPage = once(()=>isBackgroundPage() && getManifest(2)?.manifest_version === 2 // Firefox can have a background page on MV3, but can't be persistent
     && getManifest(2)?.background?.persistent !== false);
const isOptionsPage = once(()=>isCurrentPathname(getManifest()?.options_ui?.page ?? getManifest()?.options_page));
const isSidePanel = once(()=>// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Not yet in @types/chrome
    isCurrentPathname(getManifest(3)?.['side_panel']?.default_path));
const isActionPopup = once(()=>{
    // Chrome-only; Firefox uses the whole window…
    if (globalThis.outerHeight - globalThis.innerHeight === 14) return true;
    return isCurrentPathname(getManifest(3)?.action?.default_popup ?? getManifest(2)?.browser_action?.default_popup);
});
const isMainDevToolsPage = once(()=>isExtensionContext() && Boolean(chrome.devtools) && isCurrentPathname(getManifest()?.devtools_page));
const isDevToolsPage = isMainDevToolsPage;
const isDevTools = ()=>Boolean(globalThis.chrome?.devtools);
const isOffscreenDocument = once(()=>isExtensionContext() && 'document' in globalThis && globalThis.chrome?.extension === undefined);
const isFirefox = ()=>globalThis.navigator?.userAgent.includes('Firefox');
const isChrome = ()=>globalThis.navigator?.userAgent.includes('Chrome');
const isSafari = ()=>!isChrome() && globalThis.navigator?.userAgent.includes('Safari');
const isMobileSafari = ()=>isSafari() && globalThis.navigator?.userAgent.includes('Mobile');
const contextChecks = {
    contentScript: isContentScript,
    background: isBackground,
    options: isOptionsPage,
    sidePanel: isSidePanel,
    actionPopup: isActionPopup,
    devTools: isDevTools,
    devToolsPage: isDevToolsPage,
    offscreenDocument: isOffscreenDocument,
    extension: isExtensionContext,
    sandbox: isSandboxedPage,
    web: isWebPage
};
const contextNames = Object.keys(contextChecks);
function getContextName() {
    for (const [name, test] of Object.entries(contextChecks)){
        if (test()) return name;
    }
    return 'unknown';
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"jWODf":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "serialize", ()=>serialize);
parcelHelpers.export(exports, "deserialize", ()=>deserialize);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var asyncGenerator = function() {
    function AwaitValue(value) {
        this.value = value;
    }
    function AsyncGenerator(gen) {
        var front, back;
        function send(key, arg) {
            return new Promise(function(resolve, reject) {
                var request = {
                    key: key,
                    arg: arg,
                    resolve: resolve,
                    reject: reject,
                    next: null
                };
                if (back) back = back.next = request;
                else {
                    front = back = request;
                    resume(key, arg);
                }
            });
        }
        function resume(key, arg) {
            try {
                var result = gen[key](arg);
                var value = result.value;
                if (value instanceof AwaitValue) Promise.resolve(value.value).then(function(arg) {
                    resume("next", arg);
                }, function(arg) {
                    resume("throw", arg);
                });
                else settle(result.done ? "return" : "normal", result.value);
            } catch (err) {
                settle("throw", err);
            }
        }
        function settle(type, value) {
            switch(type){
                case "return":
                    front.resolve({
                        value: value,
                        done: true
                    });
                    break;
                case "throw":
                    front.reject(value);
                    break;
                default:
                    front.resolve({
                        value: value,
                        done: false
                    });
                    break;
            }
            front = front.next;
            if (front) resume(front.key, front.arg);
            else back = null;
        }
        this._invoke = send;
        if (typeof gen.return !== "function") this.return = undefined;
    }
    if (typeof Symbol === "function" && Symbol.asyncIterator) AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
        return this;
    };
    AsyncGenerator.prototype.next = function(arg) {
        return this._invoke("next", arg);
    };
    AsyncGenerator.prototype.throw = function(arg) {
        return this._invoke("throw", arg);
    };
    AsyncGenerator.prototype.return = function(arg) {
        return this._invoke("return", arg);
    };
    return {
        wrap: function(fn) {
            return function() {
                return new AsyncGenerator(fn.apply(this, arguments));
            };
        },
        await: function(value) {
            return new AwaitValue(value);
        }
    };
}();
var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
};
var createClass = function() {
    function defineProperties(target, props) {
        for(var i = 0; i < props.length; i++){
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var possibleConstructorReturn = function(self, call) {
    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
};
var TypeRegistry = function() {
    function TypeRegistry() {
        var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, TypeRegistry);
        this.registeredTypes = initial;
    }
    createClass(TypeRegistry, [
        {
            key: 'get',
            value: function get(type) {
                if (typeof this.registeredTypes[type] !== 'undefined') return this.registeredTypes[type];
                else return this.registeredTypes['default'];
            }
        },
        {
            key: 'register',
            value: function register(type, item) {
                if (typeof this.registeredTypes[type] === 'undefined') this.registeredTypes[type] = item;
            }
        },
        {
            key: 'registerDefault',
            value: function registerDefault(item) {
                this.register('default', item);
            }
        }
    ]);
    return TypeRegistry;
}();
var KeyExtractors = function(_TypeRegistry) {
    inherits(KeyExtractors, _TypeRegistry);
    function KeyExtractors(options) {
        classCallCheck(this, KeyExtractors);
        var _this = possibleConstructorReturn(this, (KeyExtractors.__proto__ || Object.getPrototypeOf(KeyExtractors)).call(this, options));
        _this.registerDefault(function(el) {
            return el.getAttribute('name') || '';
        });
        return _this;
    }
    return KeyExtractors;
}(TypeRegistry);
var InputReaders = function(_TypeRegistry) {
    inherits(InputReaders, _TypeRegistry);
    function InputReaders(options) {
        classCallCheck(this, InputReaders);
        var _this = possibleConstructorReturn(this, (InputReaders.__proto__ || Object.getPrototypeOf(InputReaders)).call(this, options));
        _this.registerDefault(function(el) {
            return el.value;
        });
        _this.register('checkbox', function(el) {
            return el.getAttribute('value') !== null ? el.checked ? el.getAttribute('value') : null : el.checked;
        });
        _this.register('select', function(el) {
            return getSelectValue(el);
        });
        return _this;
    }
    return InputReaders;
}(TypeRegistry);
function getSelectValue(elem) {
    var value, option, i;
    var options = elem.options;
    var index = elem.selectedIndex;
    var one = elem.type === 'select-one';
    var values = one ? null : [];
    var max = one ? index + 1 : options.length;
    if (index < 0) i = max;
    else i = one ? index : 0;
    // Loop through all the selected options
    for(; i < max; i++){
        option = options[i];
        // Support: IE <=9 only
        // IE8-9 doesn't update selected after form reset
        if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
        !option.disabled && !(option.parentNode.disabled && option.parentNode.tagName.toLowerCase() === 'optgroup')) {
            // Get the specific value for the option
            value = option.value;
            // We don't need an array for one selects
            if (one) return value;
            // Multi-Selects return an array
            values.push(value);
        }
    }
    return values;
}
var KeyAssignmentValidators = function(_TypeRegistry) {
    inherits(KeyAssignmentValidators, _TypeRegistry);
    function KeyAssignmentValidators(options) {
        classCallCheck(this, KeyAssignmentValidators);
        var _this = possibleConstructorReturn(this, (KeyAssignmentValidators.__proto__ || Object.getPrototypeOf(KeyAssignmentValidators)).call(this, options));
        _this.registerDefault(function() {
            return true;
        });
        _this.register('radio', function(el) {
            return el.checked;
        });
        return _this;
    }
    return KeyAssignmentValidators;
}(TypeRegistry);
function keySplitter(key) {
    var matches = key.match(/[^[\]]+/g);
    var lastKey = void 0;
    if (key.length > 1 && key.indexOf('[]') === key.length - 2) {
        lastKey = matches.pop();
        matches.push([
            lastKey
        ]);
    }
    return matches;
}
function getElementType(el) {
    var typeAttr = void 0;
    var tagName = el.tagName;
    var type = tagName;
    if (tagName.toLowerCase() === 'input') {
        typeAttr = el.getAttribute('type');
        if (typeAttr) type = typeAttr;
        else type = 'text';
    }
    return type.toLowerCase();
}
function getInputElements(element, options) {
    return Array.prototype.filter.call(element.querySelectorAll('input,select,textarea'), function(el) {
        if (el.tagName.toLowerCase() === 'input' && (el.type === 'submit' || el.type === 'reset')) return false;
        var myType = getElementType(el);
        var extractor = options.keyExtractors.get(myType);
        var identifier = extractor(el);
        var foundInInclude = (options.include || []).indexOf(identifier) !== -1;
        var foundInExclude = (options.exclude || []).indexOf(identifier) !== -1;
        var foundInIgnored = false;
        var reject = false;
        if (options.ignoredTypes) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for(var _iterator = options.ignoredTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var selector = _step.value;
                    if (el.matches(selector)) foundInIgnored = true;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) _iterator.return();
                } finally{
                    if (_didIteratorError) throw _iteratorError;
                }
            }
        }
        if (foundInInclude) reject = false;
        else if (options.include) reject = true;
        else reject = foundInExclude || foundInIgnored;
        return !reject;
    });
}
function assignKeyValue(obj, keychain, value) {
    if (!keychain) return obj;
    var key = keychain.shift();
    // build the current object we need to store data
    if (!obj[key]) obj[key] = Array.isArray(key) ? [] : {};
    // if it's the last key in the chain, assign the value directly
    if (keychain.length === 0) {
        if (!Array.isArray(obj[key])) obj[key] = value;
        else if (value !== null) obj[key].push(value);
    }
    // recursive parsing of the array, depth-first
    if (keychain.length > 0) assignKeyValue(obj[key], keychain, value);
    return obj;
}
/**
 * Get a JSON object that represents all of the form inputs, in this element.
 *
 * @param {HTMLElement} Root element
 * @param {object} options
 * @param {object} options.inputReaders
 * @param {object} options.keyAssignmentValidators
 * @param {object} options.keyExtractors
 * @param {object} options.keySplitter
 * @param {string[]} options.include
 * @param {string[]} options.exclude
 * @param {string[]} options.ignoredTypes
 * @return {object}
 */ function serialize(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var data = {};
    options.keySplitter = options.keySplitter || keySplitter;
    options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
    options.inputReaders = new InputReaders(options.inputReaders || {});
    options.keyAssignmentValidators = new KeyAssignmentValidators(options.keyAssignmentValidators || {});
    Array.prototype.forEach.call(getInputElements(element, options), function(el) {
        var type = getElementType(el);
        var keyExtractor = options.keyExtractors.get(type);
        var key = keyExtractor(el);
        var inputReader = options.inputReaders.get(type);
        var value = inputReader(el);
        var validKeyAssignment = options.keyAssignmentValidators.get(type);
        if (validKeyAssignment(el, key, value)) {
            var keychain = options.keySplitter(key);
            data = assignKeyValue(data, keychain, value);
        }
    });
    return data;
}
var InputWriters = function(_TypeRegistry) {
    inherits(InputWriters, _TypeRegistry);
    function InputWriters(options) {
        classCallCheck(this, InputWriters);
        var _this = possibleConstructorReturn(this, (InputWriters.__proto__ || Object.getPrototypeOf(InputWriters)).call(this, options));
        _this.registerDefault(function(el, value) {
            el.value = value;
        });
        _this.register('checkbox', function(el, value) {
            if (value === null) el.indeterminate = true;
            else el.checked = Array.isArray(value) ? value.indexOf(el.value) !== -1 : value;
        });
        _this.register('radio', function(el, value) {
            if (value !== undefined) el.checked = el.value === value.toString();
        });
        _this.register('select', setSelectValue);
        return _this;
    }
    return InputWriters;
}(TypeRegistry);
function makeArray(arr) {
    var ret = [];
    if (arr !== null) {
        if (Array.isArray(arr)) ret.push.apply(ret, arr);
        else ret.push(arr);
    }
    return ret;
}
/**
 * Write select values
 *
 * @see {@link https://github.com/jquery/jquery/blob/master/src/attributes/val.js|Github}
 * @param {object} Select element
 * @param {string|array} Select value
 */ function setSelectValue(elem, value) {
    var optionSet, option;
    var options = elem.options;
    var values = makeArray(value);
    var i = options.length;
    while(i--){
        option = options[i];
        /* eslint-disable no-cond-assign */ if (values.indexOf(option.value) > -1) {
            option.setAttribute('selected', true);
            optionSet = true;
        }
    /* eslint-enable no-cond-assign */ }
    // Force browsers to behave consistently when non-matching value is set
    if (!optionSet) elem.selectedIndex = -1;
}
function keyJoiner(parentKey, childKey) {
    return parentKey + '[' + childKey + ']';
}
function flattenData(data, parentKey) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var flatData = {};
    var keyJoiner$$ = options.keyJoiner || keyJoiner;
    for(var keyName in data){
        if (!data.hasOwnProperty(keyName)) continue;
        var value = data[keyName];
        var hash = {};
        // If there is a parent key, join it with
        // the current, child key.
        if (parentKey) keyName = keyJoiner$$(parentKey, keyName);
        if (Array.isArray(value)) {
            hash[keyName + '[]'] = value;
            hash[keyName] = value;
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') hash = flattenData(value, keyName, options);
        else hash[keyName] = value;
        Object.assign(flatData, hash);
    }
    return flatData;
}
/**
 * Use the given JSON object to populate all of the form inputs, in this element.
 *
 * @param {HTMLElement} Root element
 * @param {object} options
 * @param {object} options.inputWriters
 * @param {object} options.keyExtractors
 * @param {object} options.keySplitter
 * @param {string[]} options.include
 * @param {string[]} options.exclude
 * @param {string[]} options.ignoredTypes
 */ function deserialize(form, data) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var flattenedData = flattenData(data, null, options);
    options.keyExtractors = new KeyExtractors(options.keyExtractors || {});
    options.inputWriters = new InputWriters(options.inputWriters || {});
    Array.prototype.forEach.call(getInputElements(form, options), function(el) {
        var type = getElementType(el);
        var keyExtractor = options.keyExtractors.get(type);
        var key = keyExtractor(el);
        var inputWriter = options.inputWriters.get(type);
        var value = flattenedData[key];
        inputWriter(el, value);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"i8EbL":[function(require,module,exports,__globalThis) {
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.5
var LZString = function() {
    // private property
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for(var i = 0; i < alphabet.length; i++)baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
        return baseReverseDic[alphabet][character];
    }
    var LZString = {
        compressToBase64: function(input) {
            if (input == null) return "";
            var res = LZString._compress(input, 6, function(a) {
                return keyStrBase64.charAt(a);
            });
            switch(res.length % 4){
                default:
                case 0:
                    return res;
                case 1:
                    return res + "===";
                case 2:
                    return res + "==";
                case 3:
                    return res + "=";
            }
        },
        decompressFromBase64: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
            });
        },
        compressToUTF16: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 15, function(a) {
                return f(a + 32);
            }) + " ";
        },
        decompressFromUTF16: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 16384, function(index) {
                return compressed.charCodeAt(index) - 32;
            });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
            var compressed = LZString.compress(uncompressed);
            var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
            for(var i = 0, TotalLen = compressed.length; i < TotalLen; i++){
                var current_value = compressed.charCodeAt(i);
                buf[i * 2] = current_value >>> 8;
                buf[i * 2 + 1] = current_value % 256;
            }
            return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
            if (compressed === null || compressed === undefined) return LZString.decompress(compressed);
            else {
                var buf = new Array(compressed.length / 2); // 2 bytes per character
                for(var i = 0, TotalLen = buf.length; i < TotalLen; i++)buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                var result = [];
                buf.forEach(function(c) {
                    result.push(f(c));
                });
                return LZString.decompress(result.join(''));
            }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 6, function(a) {
                return keyStrUriSafe.charAt(a);
            });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrUriSafe, input.charAt(index));
            });
        },
        compress: function(uncompressed) {
            return LZString._compress(uncompressed, 16, function(a) {
                return f(a);
            });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null) return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for(ii = 0; ii < uncompressed.length; ii += 1){
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
                else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 8; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1 | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 16; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    // Add wc to the dictionary.
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            // Output the code for w.
            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 8; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 16; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for(i = 0; i < context_numBits; i++){
                        context_data_val = context_data_val << 1 | value & 1;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else context_data_position++;
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            // Mark the end of the stream
            value = 2;
            for(i = 0; i < context_numBits; i++){
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else context_data_position++;
                value = value >> 1;
            }
            // Flush the last char
            while(true){
                context_data_val = context_data_val << 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                } else context_data_position++;
            }
            return context_data.join('');
        },
        decompress: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 32768, function(index) {
                return compressed.charCodeAt(index);
            });
        },
        _decompress: function(length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1
            };
            for(i = 0; i < 3; i += 1)dictionary[i] = i;
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while(power != maxpower){
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch(next = bits){
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while(true){
                if (data.index > length) return "";
                bits = 0;
                maxpower = Math.pow(2, numBits);
                power = 1;
                while(power != maxpower){
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch(c = bits){
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join('');
                }
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) entry = dictionary[c];
                else {
                    if (c === dictSize) entry = w + w.charAt(0);
                    else return null;
                }
                result.push(entry);
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;
                w = entry;
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }
    };
    return LZString;
}();
if (typeof define === 'function' && define.amd) define(function() {
    return LZString;
});
else if (module != null) module.exports = LZString;
else if (typeof angular !== 'undefined' && angular != null) angular.module('LZString', []).factory('LZString', function() {
    return LZString;
});

},{}],"4OdgO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _onContextInvalidatedJs = require("./on-context-invalidated.js");
parcelHelpers.exportAll(_onContextInvalidatedJs, exports);
var _onExtensionStartJs = require("./on-extension-start.js");
parcelHelpers.exportAll(_onExtensionStartJs, exports);
var _oneEventJs = require("./one-event.js");
parcelHelpers.exportAll(_oneEventJs, exports);
var _addListenerJs = require("./add-listener.js");
parcelHelpers.exportAll(_addListenerJs, exports);

},{"./on-context-invalidated.js":"aojmV","./on-extension-start.js":"aQwuZ","./one-event.js":"eWtCO","./add-listener.js":"dqlLk","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"aojmV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "onContextInvalidated", ()=>onContextInvalidated);
parcelHelpers.export(exports, "wasContextInvalidated", ()=>wasContextInvalidated);
parcelHelpers.export(exports, "_testing", ()=>_testing);
class OnContextInvalidated {
    #timer;
    #controller = new AbortController();
    // Calling this will start the polling
    get signal() {
        if (this.#timer) return this.#controller.signal;
        this.#timer = setInterval(()=>{
            if (wasContextInvalidated()) {
                this.#controller.abort();
                clearInterval(this.#timer);
            }
        }, 200);
        return this.#controller.signal;
    }
    get promise() {
        return new Promise((resolve)=>{
            this.addListener(resolve);
        });
    }
    /**
     *
     * @param callback         The function to call when the context is invalidated
     * @param options.signal   The signal to remove the listener, like with the regular `addEventListener()`
     */ addListener(callback, { signal } = {}) {
        if (this.signal.aborted && !signal?.aborted) {
            setTimeout(callback, 0);
            return;
        }
        this.signal.addEventListener('abort', callback, {
            once: true,
            signal
        });
    }
}
const onContextInvalidated = new OnContextInvalidated();
const wasContextInvalidated = ()=>!chrome.runtime?.id;
const _testing = OnContextInvalidated;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"aQwuZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "onExtensionStart", ()=>onExtensionStart);
var _webextDetect = require("webext-detect");
const storageKey = '__webext-events__startup';
const event = new EventTarget();
let hasRun = false;
let hasListeners = false;
// @ts-expect-error No need to load `browser` types yet
const browserStorage = globalThis.browser?.storage ?? globalThis.chrome?.storage;
async function runner() {
    hasRun = true;
    if (!hasListeners) return;
    if ((0, _webextDetect.isPersistentBackgroundPage)()) {
        // It's certainly the first and only time
        event.dispatchEvent(new Event('extension-start'));
        return;
    }
    if (!browserStorage?.session) {
        if ((0, _webextDetect.isChrome)() && chrome.runtime.getManifest().manifest_version === 2) console.warn("onExtensionStart is unable to determine whether it\u2019s being run for the first time on MV2 Event Pages in Chrome. It will run the listeners anyway.");
        else console.warn("onExtensionStart is unable to determine whether it\u2019s being run for the first time without the `storage` permission. It will run the listeners anyway");
        event.dispatchEvent(new Event('extension-start'));
        return;
    }
    const storage = await browserStorage.session.get(storageKey);
    if (storageKey in storage) return;
    await browserStorage.session.set({
        [storageKey]: true
    });
    event.dispatchEvent(new Event('extension-start'));
}
const onExtensionStart = Object.freeze({
    addListener (callback) {
        if (hasRun) console.warn('onExtensionStart.addListener() was called after the extension started. The callback will not be called.');
        else {
            hasListeners = true;
            event.addEventListener('extension-start', callback);
        }
    },
    removeListener (callback) {
        event.removeEventListener('extension-start', callback);
    }
});
// Automatically register the runner
setTimeout(runner, 2);

},{"webext-detect":"iCTjD","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"eWtCO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "oneEvent", ()=>oneEvent);
async function oneEvent(event, { filter, signal } = {}) {
    if (signal?.aborted) return;
    return new Promise((resolve)=>{
        // TODO: VoidFunction should not be necessary, it's equivalent to using "any"
        const listener = (...parameters)=>{
            if (!filter || filter(...parameters)) {
                resolve(parameters);
                event.removeListener(listener);
            }
        };
        event.addListener(listener);
        // TODO: The abort listener is left behind if never aborted
        signal?.addEventListener('abort', ()=>{
            resolve();
            event.removeListener(listener);
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"dqlLk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addListener", ()=>addListener);
function addListener(event, listener, { signal }) {
    if (signal?.aborted) return;
    event.addListener(listener);
    signal.addEventListener('abort', ()=>{
        event.removeListener(listener);
    }, {
        once: true
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"l2Qzt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadFile", ()=>loadFile);
parcelHelpers.export(exports, "saveFile", ()=>saveFile);
var _uint8ArrayExtras = require("uint8array-extras");
const filePickerOptions = {
    types: [
        {
            accept: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'application/json': '.json'
            }
        }
    ]
};
const isModern = typeof showOpenFilePicker === 'function';
async function loadFileOld() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    const eventPromise = new Promise((resolve)=>{
        input.addEventListener('change', resolve, {
            once: true
        });
    });
    input.click();
    const event = await eventPromise;
    const file = event.target.files[0];
    if (!file) throw new Error('No file selected');
    return file.text();
}
async function saveFileOld(text, suggestedName) {
    // Use data URL because Safari doesn't support saving blob URLs
    // Use base64 or else linebreaks are lost
    const url = `data:application/json;base64,${(0, _uint8ArrayExtras.stringToBase64)(text)}`;
    const link = document.createElement('a');
    link.download = suggestedName;
    link.href = url;
    link.click();
}
async function loadFileModern() {
    const [fileHandle] = await showOpenFilePicker(filePickerOptions);
    const file = await fileHandle.getFile();
    return file.text();
}
async function saveFileModern(text, suggestedName) {
    const fileHandle = await showSaveFilePicker({
        ...filePickerOptions,
        suggestedName
    });
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
}
const loadFile = isModern ? loadFileModern : loadFileOld;
const saveFile = isModern ? saveFileModern : saveFileOld;

},{"uint8array-extras":"48guS","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"48guS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isUint8Array", ()=>isUint8Array);
parcelHelpers.export(exports, "assertUint8Array", ()=>assertUint8Array);
parcelHelpers.export(exports, "assertUint8ArrayOrArrayBuffer", ()=>assertUint8ArrayOrArrayBuffer);
parcelHelpers.export(exports, "toUint8Array", ()=>toUint8Array);
parcelHelpers.export(exports, "concatUint8Arrays", ()=>concatUint8Arrays);
parcelHelpers.export(exports, "areUint8ArraysEqual", ()=>areUint8ArraysEqual);
parcelHelpers.export(exports, "compareUint8Arrays", ()=>compareUint8Arrays);
parcelHelpers.export(exports, "uint8ArrayToString", ()=>uint8ArrayToString);
parcelHelpers.export(exports, "stringToUint8Array", ()=>stringToUint8Array);
parcelHelpers.export(exports, "uint8ArrayToBase64", ()=>uint8ArrayToBase64);
parcelHelpers.export(exports, "base64ToUint8Array", ()=>base64ToUint8Array);
parcelHelpers.export(exports, "stringToBase64", ()=>stringToBase64);
parcelHelpers.export(exports, "base64ToString", ()=>base64ToString);
parcelHelpers.export(exports, "uint8ArrayToHex", ()=>uint8ArrayToHex);
parcelHelpers.export(exports, "hexToUint8Array", ()=>hexToUint8Array);
/**
@param {DataView} view
@returns {number}
*/ parcelHelpers.export(exports, "getUintBE", ()=>getUintBE);
/**
@param {Uint8Array} array
@param {Uint8Array} value
@returns {number}
*/ parcelHelpers.export(exports, "indexOf", ()=>indexOf);
/**
@param {Uint8Array} array
@param {Uint8Array} value
@returns {boolean}
*/ parcelHelpers.export(exports, "includes", ()=>includes);
const objectToString = Object.prototype.toString;
const uint8ArrayStringified = '[object Uint8Array]';
const arrayBufferStringified = '[object ArrayBuffer]';
function isType(value, typeConstructor, typeStringified) {
    if (!value) return false;
    if (value.constructor === typeConstructor) return true;
    return objectToString.call(value) === typeStringified;
}
function isUint8Array(value) {
    return isType(value, Uint8Array, uint8ArrayStringified);
}
function isArrayBuffer(value) {
    return isType(value, ArrayBuffer, arrayBufferStringified);
}
function isUint8ArrayOrArrayBuffer(value) {
    return isUint8Array(value) || isArrayBuffer(value);
}
function assertUint8Array(value) {
    if (!isUint8Array(value)) throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof value}\``);
}
function assertUint8ArrayOrArrayBuffer(value) {
    if (!isUint8ArrayOrArrayBuffer(value)) throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof value}\``);
}
function toUint8Array(value) {
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    throw new TypeError(`Unsupported value, got \`${typeof value}\`.`);
}
function concatUint8Arrays(arrays, totalLength) {
    if (arrays.length === 0) return new Uint8Array(0);
    totalLength ??= arrays.reduce((accumulator, currentValue)=>accumulator + currentValue.length, 0);
    const returnValue = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays){
        assertUint8Array(array);
        returnValue.set(array, offset);
        offset += array.length;
    }
    return returnValue;
}
function areUint8ArraysEqual(a, b) {
    assertUint8Array(a);
    assertUint8Array(b);
    if (a === b) return true;
    if (a.length !== b.length) return false;
    // eslint-disable-next-line unicorn/no-for-loop
    for(let index = 0; index < a.length; index++){
        if (a[index] !== b[index]) return false;
    }
    return true;
}
function compareUint8Arrays(a, b) {
    assertUint8Array(a);
    assertUint8Array(b);
    const length = Math.min(a.length, b.length);
    for(let index = 0; index < length; index++){
        const diff = a[index] - b[index];
        if (diff !== 0) return Math.sign(diff);
    }
    // At this point, all the compared elements are equal.
    // The shorter array should come first if the arrays are of different lengths.
    return Math.sign(a.length - b.length);
}
const cachedDecoders = {
    utf8: new globalThis.TextDecoder('utf8')
};
function uint8ArrayToString(array, encoding = 'utf8') {
    assertUint8ArrayOrArrayBuffer(array);
    cachedDecoders[encoding] ??= new globalThis.TextDecoder(encoding);
    return cachedDecoders[encoding].decode(array);
}
function assertString(value) {
    if (typeof value !== 'string') throw new TypeError(`Expected \`string\`, got \`${typeof value}\``);
}
const cachedEncoder = new globalThis.TextEncoder();
function stringToUint8Array(string) {
    assertString(string);
    return cachedEncoder.encode(string);
}
function base64ToBase64Url(base64) {
    return base64.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}
function base64UrlToBase64(base64url) {
    return base64url.replaceAll('-', '+').replaceAll('_', '/');
}
// Reference: https://phuoc.ng/collection/this-vs-that/concat-vs-push/
const MAX_BLOCK_SIZE = 65535;
function uint8ArrayToBase64(array, { urlSafe = false } = {}) {
    assertUint8Array(array);
    let base64;
    if (array.length < MAX_BLOCK_SIZE) // Required as `btoa` and `atob` don't properly support Unicode: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
    base64 = globalThis.btoa(String.fromCodePoint.apply(this, array));
    else {
        base64 = '';
        for (const value of array)base64 += String.fromCodePoint(value);
        base64 = globalThis.btoa(base64);
    }
    return urlSafe ? base64ToBase64Url(base64) : base64;
}
function base64ToUint8Array(base64String) {
    assertString(base64String);
    return Uint8Array.from(globalThis.atob(base64UrlToBase64(base64String)), (x)=>x.codePointAt(0));
}
function stringToBase64(string, { urlSafe = false } = {}) {
    assertString(string);
    return uint8ArrayToBase64(stringToUint8Array(string), {
        urlSafe
    });
}
function base64ToString(base64String) {
    assertString(base64String);
    return uint8ArrayToString(base64ToUint8Array(base64String));
}
const byteToHexLookupTable = Array.from({
    length: 256
}, (_, index)=>index.toString(16).padStart(2, '0'));
function uint8ArrayToHex(array) {
    assertUint8Array(array);
    // Concatenating a string is faster than using an array.
    let hexString = '';
    // eslint-disable-next-line unicorn/no-for-loop -- Max performance is critical.
    for(let index = 0; index < array.length; index++)hexString += byteToHexLookupTable[array[index]];
    return hexString;
}
const hexToDecimalLookupTable = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
};
function hexToUint8Array(hexString) {
    assertString(hexString);
    if (hexString.length % 2 !== 0) throw new Error('Invalid Hex string length.');
    const resultLength = hexString.length / 2;
    const bytes = new Uint8Array(resultLength);
    for(let index = 0; index < resultLength; index++){
        const highNibble = hexToDecimalLookupTable[hexString[index * 2]];
        const lowNibble = hexToDecimalLookupTable[hexString[index * 2 + 1]];
        if (highNibble === undefined || lowNibble === undefined) throw new Error(`Invalid Hex character encountered at position ${index * 2}`);
        bytes[index] = highNibble << 4 | lowNibble; // eslint-disable-line no-bitwise
    }
    return bytes;
}
function getUintBE(view) {
    const { byteLength } = view;
    if (byteLength === 6) return view.getUint16(0) * 2 ** 32 + view.getUint32(2);
    if (byteLength === 5) return view.getUint8(0) * 2 ** 32 + view.getUint32(1);
    if (byteLength === 4) return view.getUint32(0);
    if (byteLength === 3) return view.getUint8(0) * 2 ** 16 + view.getUint16(1);
    if (byteLength === 2) return view.getUint16(0);
    if (byteLength === 1) return view.getUint8(0);
}
function indexOf(array, value) {
    const arrayLength = array.length;
    const valueLength = value.length;
    if (valueLength === 0) return -1;
    if (valueLength > arrayLength) return -1;
    const validOffsetLength = arrayLength - valueLength;
    for(let index = 0; index <= validOffsetLength; index++){
        let isMatch = true;
        for(let index2 = 0; index2 < valueLength; index2++)if (array[index + index2] !== value[index2]) {
            isMatch = false;
            break;
        }
        if (isMatch) return index;
    }
    return -1;
}
function includes(array, value) {
    return indexOf(array, value) !== -1;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"5LKoK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "actionDisplayNames", ()=>actionDisplayNames);
const actionDisplayNames = new Map([
    [
        "toggleMainDeckView",
        "Toggle Main Deck View"
    ],
    [
        "toggleExtraDeckView",
        "Toggle Extra Deck View"
    ],
    [
        "toggleGraveView",
        "Toggle GY View"
    ],
    [
        "toggleBanishView",
        "Toggle Banished View"
    ],
    [
        "activateCard",
        'Activate Card - "To S/T"'
    ],
    [
        "banishCard",
        "Banish Card"
    ],
    [
        "banishCardFd",
        "Banish Card Face-Down"
    ],
    [
        "banishDeckTop",
        "Banish Top of Main Deck"
    ],
    [
        "banishDeckTopFd",
        "Banish Top of Main Deck Face-Down"
    ],
    [
        "declareEff",
        "Declare"
    ],
    [
        "normalSummonCard",
        "Normal Summon"
    ],
    [
        "overlayMaterial",
        "Overlay"
    ],
    [
        "specSummonAtk",
        "Special Summon (ATK)"
    ],
    [
        "specSummonDef",
        "Special Summon (DEF)"
    ],
    [
        "xyzSummonAtk",
        "XYZ Summon (ATK)"
    ],
    [
        "xyzSummonDef",
        "XYZ Summon (DEF)"
    ],
    [
        "setCard",
        "Set Card"
    ],
    [
        "cardToDeckBottom",
        "To Bottom of Deck"
    ],
    [
        "cardToGy",
        "To Graveyard"
    ],
    [
        "bounceCard",
        "Add Card to Hand/Extra Deck"
    ],
    [
        "cardToExtraDeckFu",
        "Add Card to Extra Deck Face-Up"
    ],
    [
        "addLp",
        "Gain LP"
    ],
    [
        "subLp",
        "Lose LP"
    ],
    [
        "toggleChatBox",
        "Toggle Chat Box"
    ],
    [
        "signalThinking",
        "Thinking"
    ],
    [
        "singalOkay",
        "Thumbs Up"
    ]
]);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"h9Qxi":[function(require,module,exports,__globalThis) {
/**! 
 * hotkeys-js v3.13.7 
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies. 
 * 
 * Copyright (c) 2024 kenny wong <wowohoo@qq.com> 
 * https://github.com/jaywcjlove/hotkeys-js.git 
 * 
 * @website: https://jaywcjlove.github.io/hotkeys-js
 
 * Licensed under the MIT license 
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>hotkeys);
const isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false;
// 绑定事件
function addEvent(object, event, method, useCapture) {
    if (object.addEventListener) object.addEventListener(event, method, useCapture);
    else if (object.attachEvent) object.attachEvent("on".concat(event), method);
}
function removeEvent(object, event, method, useCapture) {
    if (object.removeEventListener) object.removeEventListener(event, method, useCapture);
    else if (object.detachEvent) object.detachEvent("on".concat(event), method);
}
// 修饰键转换成对应的键码
function getMods(modifier, key) {
    const mods = key.slice(0, key.length - 1);
    for(let i = 0; i < mods.length; i++)mods[i] = modifier[mods[i].toLowerCase()];
    return mods;
}
// 处理传的key字符串转换成数组
function getKeys(key) {
    if (typeof key !== 'string') key = '';
    key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等
    const keys = key.split(','); // 同时设置多个快捷键，以','分割
    let index = keys.lastIndexOf('');
    // 快捷键可能包含','，需特殊处理
    for(; index >= 0;){
        keys[index - 1] += ',';
        keys.splice(index, 1);
        index = keys.lastIndexOf('');
    }
    return keys;
}
// 比较修饰键的数组
function compareArray(a1, a2) {
    const arr1 = a1.length >= a2.length ? a1 : a2;
    const arr2 = a1.length >= a2.length ? a2 : a1;
    let isIndex = true;
    for(let i = 0; i < arr1.length; i++)if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
    return isIndex;
}
// Special Keys
const _keyMap = {
    backspace: 8,
    "\u232B": 8,
    tab: 9,
    clear: 12,
    enter: 13,
    "\u21A9": 13,
    return: 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    delete: 46,
    ins: 45,
    insert: 45,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    capslock: 20,
    num_0: 96,
    num_1: 97,
    num_2: 98,
    num_3: 99,
    num_4: 100,
    num_5: 101,
    num_6: 102,
    num_7: 103,
    num_8: 104,
    num_9: 105,
    num_multiply: 106,
    num_add: 107,
    num_enter: 108,
    num_subtract: 109,
    num_decimal: 110,
    num_divide: 111,
    "\u21EA": 20,
    ',': 188,
    '.': 190,
    '/': 191,
    '`': 192,
    '-': isff ? 173 : 189,
    '=': isff ? 61 : 187,
    ';': isff ? 59 : 186,
    '\'': 222,
    '[': 219,
    ']': 221,
    '\\': 220
};
// Modifier Keys
const _modifier = {
    // shiftKey
    "\u21E7": 16,
    shift: 16,
    // altKey
    "\u2325": 18,
    alt: 18,
    option: 18,
    // ctrlKey
    "\u2303": 17,
    ctrl: 17,
    control: 17,
    // metaKey
    "\u2318": 91,
    cmd: 91,
    command: 91
};
const modifierMap = {
    16: 'shiftKey',
    18: 'altKey',
    17: 'ctrlKey',
    91: 'metaKey',
    shiftKey: 16,
    ctrlKey: 17,
    altKey: 18,
    metaKey: 91
};
const _mods = {
    16: false,
    18: false,
    17: false,
    91: false
};
const _handlers = {};
// F1~F12 special key
for(let k = 1; k < 20; k++)_keyMap["f".concat(k)] = 111 + k;
let _downKeys = []; // 记录摁下的绑定键
let winListendFocus = null; // window是否已经监听了focus事件
let _scope = 'all'; // 默认热键范围
const elementEventMap = new Map(); // 已绑定事件的节点记录
// 返回键码
const code = (x)=>_keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
const getKey = (x)=>Object.keys(_keyMap).find((k)=>_keyMap[k] === x);
const getModifier = (x)=>Object.keys(_modifier).find((k)=>_modifier[k] === x);
// 设置获取当前范围（默认为'所有'）
function setScope(scope) {
    _scope = scope || 'all';
}
// 获取当前范围
function getScope() {
    return _scope || 'all';
}
// 获取摁下绑定键的键值
function getPressedKeyCodes() {
    return _downKeys.slice(0);
}
function getPressedKeyString() {
    return _downKeys.map((c)=>getKey(c) || getModifier(c) || String.fromCharCode(c));
}
function getAllKeyCodes() {
    const result = [];
    Object.keys(_handlers).forEach((k)=>{
        _handlers[k].forEach((_ref)=>{
            let { key, scope, mods, shortcut } = _ref;
            result.push({
                scope,
                shortcut,
                mods,
                keys: key.split('+').map((v)=>code(v))
            });
        });
    });
    return result;
}
// 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true
function filter(event) {
    const target = event.target || event.srcElement;
    const { tagName } = target;
    let flag = true;
    const isInput = tagName === 'INPUT' && ![
        'checkbox',
        'radio',
        'range',
        'button',
        'file',
        'reset',
        'submit',
        'color'
    ].includes(target.type);
    // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>
    if (target.isContentEditable || (isInput || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) flag = false;
    return flag;
}
// 判断摁下的键是否为某个键，返回true或者false
function isPressed(keyCode) {
    if (typeof keyCode === 'string') keyCode = code(keyCode); // 转换成键码
    return _downKeys.indexOf(keyCode) !== -1;
}
// 循环删除handlers中的所有 scope(范围)
function deleteScope(scope, newScope) {
    let handlers;
    let i;
    // 没有指定scope，获取scope
    if (!scope) scope = getScope();
    for(const key in _handlers)if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
        handlers = _handlers[key];
        for(i = 0; i < handlers.length;)if (handlers[i].scope === scope) {
            const deleteItems = handlers.splice(i, 1);
            deleteItems.forEach((_ref2)=>{
                let { element } = _ref2;
                return removeKeyEvent(element);
            });
        } else i++;
    }
    // 如果scope被删除，将scope重置为all
    if (getScope() === scope) setScope(newScope || 'all');
}
// 清除修饰键
function clearModifier(event) {
    let key = event.keyCode || event.which || event.charCode;
    const i = _downKeys.indexOf(key);
    // 从列表中清除按压过的键
    if (i >= 0) _downKeys.splice(i, 1);
    // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题
    if (event.key && event.key.toLowerCase() === 'meta') _downKeys.splice(0, _downKeys.length);
    // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除
    if (key === 93 || key === 224) key = 91;
    if (key in _mods) {
        _mods[key] = false;
        // 将修饰键重置为false
        for(const k in _modifier)if (_modifier[k] === key) hotkeys[k] = false;
    }
}
function unbind(keysInfo) {
    // unbind(), unbind all keys
    if (typeof keysInfo === 'undefined') {
        Object.keys(_handlers).forEach((key)=>{
            Array.isArray(_handlers[key]) && _handlers[key].forEach((info)=>eachUnbind(info));
            delete _handlers[key];
        });
        removeKeyEvent(null);
    } else if (Array.isArray(keysInfo)) // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach((info)=>{
        if (info.key) eachUnbind(info);
    });
    else if (typeof keysInfo === 'object') // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    {
        if (keysInfo.key) eachUnbind(keysInfo);
    } else if (typeof keysInfo === 'string') {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        // support old method
        // eslint-disable-line
        let [scope, method] = args;
        if (typeof scope === 'function') {
            method = scope;
            scope = '';
        }
        eachUnbind({
            key: keysInfo,
            scope,
            method,
            splitKey: '+'
        });
    }
}
// 解除绑定某个范围的快捷键
const eachUnbind = (_ref3)=>{
    let { key, scope, method, splitKey = '+' } = _ref3;
    const multipleKeys = getKeys(key);
    multipleKeys.forEach((originKey)=>{
        const unbindKeys = originKey.split(splitKey);
        const len = unbindKeys.length;
        const lastKey = unbindKeys[len - 1];
        const keyCode = lastKey === '*' ? '*' : code(lastKey);
        if (!_handlers[keyCode]) return;
        // 判断是否传入范围，没有就获取范围
        if (!scope) scope = getScope();
        const mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
        const unbindElements = [];
        _handlers[keyCode] = _handlers[keyCode].filter((record)=>{
            // 通过函数判断，是否解除绑定，函数相等直接返回
            const isMatchingMethod = method ? record.method === method : true;
            const isUnbind = isMatchingMethod && record.scope === scope && compareArray(record.mods, mods);
            if (isUnbind) unbindElements.push(record.element);
            return !isUnbind;
        });
        unbindElements.forEach((element)=>removeKeyEvent(element));
    });
};
// 对监听对应快捷键的回调函数进行处理
function eventHandler(event, handler, scope, element) {
    if (handler.element !== element) return;
    let modifiersMatch;
    // 看它是否在当前范围
    if (handler.scope === scope || handler.scope === 'all') {
        // 检查是否匹配修饰符（如果有返回true）
        modifiersMatch = handler.mods.length > 0;
        for(const y in _mods){
            if (Object.prototype.hasOwnProperty.call(_mods, y)) {
                if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) modifiersMatch = false;
            }
        }
        // 调用处理程序，如果是修饰键不做处理
        if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
            handler.keys = [];
            handler.keys = handler.keys.concat(_downKeys);
            if (handler.method(event, handler) === false) {
                if (event.preventDefault) event.preventDefault();
                else event.returnValue = false;
                if (event.stopPropagation) event.stopPropagation();
                if (event.cancelBubble) event.cancelBubble = true;
            }
        }
    }
}
// 处理keydown事件
function dispatch(event, element) {
    const asterisk = _handlers['*'];
    let key = event.keyCode || event.which || event.charCode;
    // 表单控件过滤 默认表单控件不触发快捷键
    if (!hotkeys.filter.call(this, event)) return;
    // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
    // Webkit左右 command 键值不一样
    if (key === 93 || key === 224) key = 91;
    /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */ if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
    /**
   * Jest test cases are required.
   * ===============================
   */ [
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey'
    ].forEach((keyName)=>{
        const keyNum = modifierMap[keyName];
        if (event[keyName] && _downKeys.indexOf(keyNum) === -1) _downKeys.push(keyNum);
        else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) _downKeys.splice(_downKeys.indexOf(keyNum), 1);
        else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) /**
       * Fix if Command is pressed:
       * ===============================
       */ {
            if (!(event.ctrlKey || event.shiftKey || event.altKey)) _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
        }
    });
    /**
   * -------------------------------
   */ if (key in _mods) {
        _mods[key] = true;
        // 将特殊字符的key注册到 hotkeys 上
        for(const k in _modifier)if (_modifier[k] === key) hotkeys[k] = true;
        if (!asterisk) return;
    }
    // 将 modifierMap 里面的修饰键绑定到 event 中
    for(const e in _mods)if (Object.prototype.hasOwnProperty.call(_mods, e)) _mods[e] = event[modifierMap[e]];
    /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */ if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
        if (_downKeys.indexOf(17) === -1) _downKeys.push(17);
        if (_downKeys.indexOf(18) === -1) _downKeys.push(18);
        _mods[17] = true;
        _mods[18] = true;
    }
    // 获取范围 默认为 `all`
    const scope = getScope();
    // 对任何快捷键都需要做的处理
    if (asterisk) {
        for(let i = 0; i < asterisk.length; i++)if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) eventHandler(event, asterisk[i], scope, element);
    }
    // key 不在 _handlers 中返回
    if (!(key in _handlers)) return;
    const handlerKey = _handlers[key];
    const keyLen = handlerKey.length;
    for(let i = 0; i < keyLen; i++){
        if (event.type === 'keydown' && handlerKey[i].keydown || event.type === 'keyup' && handlerKey[i].keyup) {
            if (handlerKey[i].key) {
                const record = handlerKey[i];
                const { splitKey } = record;
                const keyShortcut = record.key.split(splitKey);
                const _downKeysCurrent = []; // 记录当前按键键值
                for(let a = 0; a < keyShortcut.length; a++)_downKeysCurrent.push(code(keyShortcut[a]));
                if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) // 找到处理内容
                eventHandler(event, record, scope, element);
            }
        }
    }
}
function hotkeys(key, option, method) {
    _downKeys = [];
    const keys = getKeys(key); // 需要处理的快捷键列表
    let mods = [];
    let scope = 'all'; // scope默认为all，所有范围都有效
    let element = document; // 快捷键事件绑定节点
    let i = 0;
    let keyup = false;
    let keydown = true;
    let splitKey = '+';
    let capture = false;
    let single = false; // 单个callback
    // 对为设定范围的判断
    if (method === undefined && typeof option === 'function') method = option;
    if (Object.prototype.toString.call(option) === '[object Object]') {
        if (option.scope) scope = option.scope; // eslint-disable-line
        if (option.element) element = option.element; // eslint-disable-line
        if (option.keyup) keyup = option.keyup; // eslint-disable-line
        if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line
        if (option.capture !== undefined) capture = option.capture; // eslint-disable-line
        if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
        if (option.single === true) single = true; // eslint-disable-line
    }
    if (typeof option === 'string') scope = option;
    // 如果只允许单个callback，先unbind
    if (single) unbind(key, scope);
    // 对于每个快捷键进行处理
    for(; i < keys.length; i++){
        key = keys[i].split(splitKey); // 按键列表
        mods = [];
        // 如果是组合快捷键取得组合快捷键
        if (key.length > 1) mods = getMods(_modifier, key);
        // 将非修饰键转化为键码
        key = key[key.length - 1];
        key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
        // 判断key是否在_handlers中，不在就赋一个空数组
        if (!(key in _handlers)) _handlers[key] = [];
        _handlers[key].push({
            keyup,
            keydown,
            scope,
            mods,
            shortcut: keys[i],
            method,
            key: keys[i],
            splitKey,
            element
        });
    }
    // 在全局document上设置快捷键
    if (typeof element !== 'undefined' && window) {
        if (!elementEventMap.has(element)) {
            const keydownListener = function() {
                let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
                return dispatch(event, element);
            };
            const keyupListenr = function() {
                let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;
                dispatch(event, element);
                clearModifier(event);
            };
            elementEventMap.set(element, {
                keydownListener,
                keyupListenr,
                capture
            });
            addEvent(element, 'keydown', keydownListener, capture);
            addEvent(element, 'keyup', keyupListenr, capture);
        }
        if (!winListendFocus) {
            const listener = ()=>{
                _downKeys = [];
            };
            winListendFocus = {
                listener,
                capture
            };
            addEvent(window, 'focus', listener, capture);
        }
    }
}
function trigger(shortcut) {
    let scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
    Object.keys(_handlers).forEach((key)=>{
        const dataList = _handlers[key].filter((item)=>item.scope === scope && item.shortcut === shortcut);
        dataList.forEach((data)=>{
            if (data && data.method) data.method();
        });
    });
}
// 销毁事件,unbind之后判断element上是否还有键盘快捷键，如果没有移除监听
function removeKeyEvent(element) {
    const values = Object.values(_handlers).flat();
    const findindex = values.findIndex((_ref4)=>{
        let { element: el } = _ref4;
        return el === element;
    });
    if (findindex < 0) {
        const { keydownListener, keyupListenr, capture } = elementEventMap.get(element) || {};
        if (keydownListener && keyupListenr) {
            removeEvent(element, 'keyup', keyupListenr, capture);
            removeEvent(element, 'keydown', keydownListener, capture);
            elementEventMap.delete(element);
        }
    }
    if (values.length <= 0 || elementEventMap.size <= 0) {
        // 移除所有的元素上的监听
        const eventKeys = Object.keys(elementEventMap);
        eventKeys.forEach((el)=>{
            const { keydownListener, keyupListenr, capture } = elementEventMap.get(el) || {};
            if (keydownListener && keyupListenr) {
                removeEvent(el, 'keyup', keyupListenr, capture);
                removeEvent(el, 'keydown', keydownListener, capture);
                elementEventMap.delete(el);
            }
        });
        // 清空 elementEventMap
        elementEventMap.clear();
        // 清空 _handlers
        Object.keys(_handlers).forEach((key)=>delete _handlers[key]);
        // 移除window上的focus监听
        if (winListendFocus) {
            const { listener, capture } = winListendFocus;
            removeEvent(window, 'focus', listener, capture);
            winListendFocus = null;
        }
    }
}
const _api = {
    getPressedKeyString,
    setScope,
    getScope,
    deleteScope,
    getPressedKeyCodes,
    getAllKeyCodes,
    isPressed,
    filter,
    trigger,
    unbind,
    keyMap: _keyMap,
    modifier: _modifier,
    modifierMap
};
for(const a in _api)if (Object.prototype.hasOwnProperty.call(_api, a)) hotkeys[a] = _api[a];
if (typeof window !== 'undefined') {
    const _hotkeys = window.hotkeys;
    hotkeys.noConflict = (deep)=>{
        if (deep && window.hotkeys === hotkeys) window.hotkeys = _hotkeys;
        return hotkeys;
    };
    window.hotkeys = hotkeys;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}]},["bOkLm"], "bOkLm", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLHNCQUFzQixLQUFLLElBQU0sd0JBQ3ZDLGNBQWMsY0FDZCxXQUFXLE1BQU0sRUFBRSxjQUFjO0FBRWpDLE1BQU0sWUFBWSxJQUFNLFdBQVcsU0FBUyxFQUFFLFVBQVUsU0FBUztBQUVqRSxNQUFNLFdBQVcsSUFBTSxXQUFXLFNBQVMsRUFBRSxVQUFVLFNBQVM7QUFFaEUsTUFBTSxXQUFXLElBQU0sQ0FBQyxjQUFjLFdBQVcsU0FBUyxFQUFFLFVBQVUsU0FBUztBQUUvRSxNQUFNLGlCQUFpQixJQUFNLGNBQWMsV0FBVyxTQUFTLEVBQUUsVUFBVSxTQUFTO0FBQzNGLE1BQU0sZ0JBQWdCO0lBQ2xCLGVBQWU7SUFDZixZQUFZO0lBQ1osU0FBUztJQUNULFdBQVc7SUFDWCxhQUFhO0lBQ2IsVUFBVTtJQUNWLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsV0FBVztJQUNYLFNBQVM7SUFDVCxLQUFLO0FBQ1Q7QUFDTyxNQUFNLGVBQWUsT0FBTyxJQUFJLENBQUM7QUFFakMsU0FBUztJQUNaLEtBQUssTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLE9BQU8sT0FBTyxDQUFDLGVBQWdCO1FBQ3RELElBQUksUUFDQSxPQUFPO0lBRWY7SUFDQSxPQUFPO0FBQ1g7Ozs7O0EsK0M7QSxpRDtBLEksVSxPLFcsYyxPLE8sUSxLLFcsUyxHO0ksTyxPO0EsSSxTLEc7SSxPLE8sTyxXLGMsSSxXLEssVSxRLE8sUyxHLFcsTztBO0EsSSxpQjtJLFMsVyxLO1EsSSxDLEssRztJO0ksUyxlLEc7USxJLE87USxTLEssRyxFLEc7WSxPLEksUSxTLE8sRSxNO2dCLEksVTtvQixLO29CLEs7b0IsUztvQixRO29CLE07Z0I7Z0IsSSxNLE8sSyxJLEc7cUI7b0IsUSxPO29CLE8sSztnQjtZO1E7USxTLE8sRyxFLEc7WSxJO2dCLEksUyxHLEMsSSxDO2dCLEksUSxPLEs7Z0IsSSxpQixZLFEsTyxDLE0sSyxFLEksQyxTLEc7b0IsTyxRO2dCLEcsUyxHO29CLE8sUztnQjtxQixPLE8sSSxHLFcsVSxPLEs7WSxFLE8sSztnQixPLFM7WTtRO1EsUyxPLEksRSxLO1ksTztnQixLO29CLE0sTyxDO3dCLE87d0IsTTtvQjtvQjtnQixLO29CLE0sTSxDO29CO2dCO29CLE0sTyxDO3dCLE87d0IsTTtvQjtvQjtZO1ksUSxNLEk7WSxJLE8sTyxNLEcsRSxNLEc7aUIsTztRO1EsSSxDLE8sRztRLEksTyxJLE0sSyxZLEksQyxNLEc7STtJLEksTyxXLGMsTyxhLEUsZSxTLEMsTyxhLEMsRztRLE8sSTtJO0ksZSxTLEMsSSxHLFMsRztRLE8sSSxDLE8sQyxRO0k7SSxlLFMsQyxLLEcsUyxHO1EsTyxJLEMsTyxDLFM7STtJLGUsUyxDLE0sRyxTLEc7USxPLEksQyxPLEMsVTtJO0ksTztRLE0sUyxFO1ksTztnQixPLEksZSxHLEssQyxJLEU7WTtRO1EsTyxTLEs7WSxPLEksVztRO0k7QTtBLEksaUIsUyxRLEUsVztJLEksQyxDLG9CLFcsRyxNLEksVTtBO0EsSSxjO0ksUyxpQixNLEUsSztRLEksSSxJLEcsSSxNLE0sRSxJO1ksSSxhLEssQyxFO1ksVyxVLEcsVyxVLEk7WSxXLFksRztZLEksVyxZLFcsUSxHO1ksTyxjLEMsUSxXLEcsRTtRO0k7SSxPLFMsVyxFLFUsRSxXO1EsSSxZLGlCLFksUyxFO1EsSSxhLGlCLGE7USxPO0k7QTtBLEksVyxTLFEsRSxVO0ksSSxPLGUsYyxlLE0sTSxJLFUsNkQsTztJLFMsUyxHLE8sTSxDLGMsVyxTLEU7USxhO1ksTztZLFk7WSxVO1ksYztRO0k7SSxJLFksTyxjLEcsTyxjLEMsVSxjLFMsUyxHO0E7QSxJLDRCLFMsSSxFLEk7SSxJLEMsTSxNLEksZTtJLE8sUSxDLE8sUyxZLE8sUyxVLEksTztBO0FFakhxQkUsSUFBQUEsZUFBQUE7SUFDUSxTQUFBO1FBQWRDLElBQUFBLFVBQWMsVUFBQSxNQUFBLEdBQUEsS0FBQSxTQUFBLENBQUEsRUFBQSxLQUFBLFlBQUEsU0FBQSxDQUFBLEVBQUEsR0FBSixDQUFBO1EsZSxJLEU7UUFDaEJDLElBQUFBLENBQUFBLGVBQUwsR0FBdUJEO0k7SSxZLGM7UTtZLEs7WUFHcEJFLE9B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LE9BQU8sQ0FBQztZQUNoQyxJQUFJLG1CQUFtQixjQUFjO2dCQUNuQyxZQUFZLElBQUksU0FBUyxjQUFjO2dCQUN2QyxZQUFZLElBQUksV0FBVyxpQkFBaUI7Z0JBQzVDLGdCQUFnQixNQUFNLENBQUM7WUFDekI7UUFDRjtRQUNBLHFCQUFxQjtRQUNyQixnQkFBZ0IsS0FBSztRQUNyQixlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxPQUFPLENBQUMsQ0FBQSxNQUFPLE9BQU8sU0FBUyxDQUFDLElBQUk7UUFDM0Qsb0JBQW9CO1FBQ3BCLElBQUksaUJBQWlCO1lBQ25CLE1BQU0sRUFDSixRQUFRLEVBQ1IsT0FBTyxFQUNSLEdBQUc7WUFDSixZQUFZLFFBQVEsU0FBUyxVQUFVO1lBQ3ZDLGtCQUFrQjtRQUNwQjtJQUNGO0FBQ0Y7QUFDQSxNQUFNLE9BQU87SUFDWDtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFFBQVE7SUFDUixVQUFVO0lBQ1Y7QUFDRjtBQUNBLElBQUssTUFBTSxLQUFLLEtBQ2QsSUFBSSxPQUFPLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFDN0MsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUd4QixJQUFJLE9BQU8sV0FBVyxhQUFhO0lBQ2pDLE1BQU0sV0FBVyxPQUFPLE9BQU87SUFDL0IsUUFBUSxVQUFVLEdBQUcsQ0FBQTtRQUNuQixJQUFJLFFBQVEsT0FBTyxPQUFPLEtBQUssU0FDN0IsT0FBTyxPQUFPLEdBQUc7UUFFbkIsT0FBTztJQUNUO0lBQ0EsT0FBTyxPQUFPLEdBQUc7QUFDbkIiLCJzb3VyY2VzIjpbInNyYy9jb250ZW50LmpzIiwic3JjL29wdGlvbnMtc3RvcmFnZS5qcyIsIm5vZGVfbW9kdWxlcy93ZWJleHQtb3B0aW9ucy1zeW5jL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Rocm90dGxlLWRlYm91bmNlL2VzbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aHJvdHRsZS1kZWJvdW5jZS90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy90aHJvdHRsZS1kZWJvdW5jZS9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwibm9kZV9tb2R1bGVzL3dlYmV4dC1wb2x5ZmlsbC1raW5kYS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy93ZWJleHQtZGV0ZWN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RvbS1mb3JtLXNlcmlhbGl6ZXIvZGlzdC9kb20tZm9ybS1zZXJpYWxpemVyLm1qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9UeXBlUmVnaXN0cnkuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIvS2V5RXh0cmFjdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9JbnB1dFJlYWRlcnMuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIvS2V5QXNzaWdubWVudFZhbGlkYXRvcnMuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIva2V5U3BsaXR0ZXIuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIvZ2V0RWxlbWVudFR5cGUuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIvZ2V0SW5wdXRFbGVtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9hc3NpZ25LZXlWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9zZXJpYWxpemUuanMiLCJub2RlX21vZHVsZXMvZG9tLWZvcm0tc2VyaWFsaXplci9saWIvSW5wdXRXcml0ZXJzLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1mb3JtLXNlcmlhbGl6ZXIvbGliL2tleUpvaW5lci5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9mbGF0dGVuRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9kb20tZm9ybS1zZXJpYWxpemVyL2xpYi9kZXNlcmlhbGl6ZS5qcyIsIm5vZGVfbW9kdWxlcy9sei1zdHJpbmcvbGlicy9sei1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb24tY29udGV4dC1pbnZhbGlkYXRlZC5qcyIsIm5vZGVfbW9kdWxlcy93ZWJleHQtZXZlbnRzL2Rpc3RyaWJ1dGlvbi9vbi1leHRlbnNpb24tc3RhcnQuanMiLCJub2RlX21vZHVsZXMvd2ViZXh0LWV2ZW50cy9kaXN0cmlidXRpb24vb25lLWV2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3dlYmV4dC1ldmVudHMvZGlzdHJpYnV0aW9uL2FkZC1saXN0ZW5lci5qcyIsIm5vZGVfbW9kdWxlcy93ZWJleHQtb3B0aW9ucy1zeW5jL2ZpbGUuanMiLCJub2RlX21vZHVsZXMvdWludDhhcnJheS1leHRyYXMvaW5kZXguanMiLCJzcmMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvaG90a2V5cy1qcy9kaXN0L2hvdGtleXMuZXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvdGtleVN0b3JhZ2UgfSBmcm9tIFwiLi9vcHRpb25zLXN0b3JhZ2UuanNcIjtcbmltcG9ydCBob3RrZXlzIGZyb20gXCJob3RrZXlzLWpzXCI7XG5cbmNvbnNvbGUubG9nKFwi8J+SiCBDb250ZW50IHNjcmlwdCBsb2FkZWQgZm9yXCIsIGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubmFtZSk7XG5cbi8vIE5PVEU6IEFkZCBzb21lIGRlbm91bmNlIHN0YXRlIGhlcmUgb3Igc29tZXRoaW5nLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRIb3RrZXlzKCkge1xuICBjb25zdCBob3RrZXlDb25maWcgPSBhd2FpdCBob3RrZXlTdG9yYWdlLmdldEFsbCgpO1xuICBob3RrZXlzKGhvdGtleUNvbmZpZy50b2dnbGVEZWNrVmlldywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlRGVja1ZpZXcoXCJNYWluXCIpO1xuICB9KTtcblxuICBob3RrZXlzKFwiRXNjYXBlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsb3NlVmlld01lbnUoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlVmlld01lbnUoKSB7XG4gIGNvbnNvbGUubG9nKFwiQ2xvc2luZ1wiKTtcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3XCIpXG4gICAgPy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXhpdF9idG5cIilbMF1cbiAgICA/LmNsaWNrKCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURlY2tWaWV3KGRlY2tUeXBlKSB7XG4gIGxldCBkZWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWNrX2hpZGRlblwiKTtcbiAgY29uc3QgbW91c2VPdmVyRXZlbnQgPSBuZXcgTW91c2VFdmVudChcIm1vdXNlb3ZlclwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIHZpZXc6IHdpbmRvdyxcbiAgfSk7XG5cbiAgaWYgKGRlY2tUeXBlID09PSBcIk1haW5cIikge1xuICAgIGRlY2s/LmRpc3BhdGNoRXZlbnQobW91c2VPdmVyRXZlbnQpO1xuICB9IGVsc2UgaWYgKGRlY2tUeXBlID09PSBcIkV4dHJhXCIpIHtcbiAgICBleHRyYURlY2s/LmRpc3BhdGNoRXZlbnQobW91c2VPdmVyRXZlbnQpO1xuICB9XG5cbiAgZGVja01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcmRfbWVudV9jb250ZW50XCIpO1xuICBkZWNrVmlld0J1dHRvbiA9IGRlY2tNZW51Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FyZF9tZW51X2J0blwiKVswXTtcbiAgZGVja1ZpZXdTcGFuID0gZGVja1ZpZXdCdXR0b24/LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKVswXTtcblxuICBpZiAoZGVja1ZpZXdTcGFuICYmIGRlY2tWaWV3U3Bhbi50ZXh0Q29udGVudCA9PT0gXCJWaWV3XCIpIHtcbiAgICBkZWNrVmlld1NwYW4uY2xpY2soKTtcbiAgfSBlbHNlIGlmIChkZWNrVmlld1NwYW4gJiYgZGVja1ZpZXdTcGFuLnRleHRDb250ZW50ID09PSBcIlNob3dcIikge1xuICAgIGRlY2tWaWV3QnV0dG9uID0gZGVja01lbnU/LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjYXJkX21lbnVfYnRuXCIpWzFdO1xuICAgIGRlY2tWaWV3U3BhbiA9IGRlY2tWaWV3QnV0dG9uPy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIilbMF07XG4gICAgZGVja1ZpZXdTcGFuLmNsaWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgY2xvc2VWaWV3TWVudSgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnNvbGUubG9nKFwiaW5pdCBjYWxsZWRcIik7XG4gIGF3YWl0IGxvYWRIb3RrZXlzKCk7XG4gIGNvbnNvbGUubG9nKFwiTG9hZGVkIVwiKTtcbn1cblxuaG90a2V5U3RvcmFnZS5vbkNoYW5nZWQoYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBsb2FkSG90a2V5cygpO1xuICBjb25zb2xlLmxvZyhcIkhvdGtleXMgVXBkYXRlZFwiKTtcbn0pO1xuXG5pbml0KCk7XG4iLCJpbXBvcnQgT3B0aW9uc1N5bmMgZnJvbSBcIndlYmV4dC1vcHRpb25zLXN5bmNcIjtcbmltcG9ydCB7IGFjdGlvbkRpc3BsYXlOYW1lcyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IG9wdGlvbnNTdG9yYWdlID0gbmV3IE9wdGlvbnNTeW5jKHtcbiAgZGVmYXVsdHM6IHtcbiAgICBkaXNhYmxlRXh0ZW5zaW9uOiBmYWxzZSxcbiAgICBkaXNhYmxlSG90a2V5czogZmFsc2UsXG4gICAgc2tpcEludHJvOiBmYWxzZSxcbiAgICBhdXRvQ29ubmVjdDogZmFsc2UsXG4gICAgZGFya01vZGU6IGZhbHNlLFxuICB9LFxuICBtaWdyYXRpb25zOiBbT3B0aW9uc1N5bmMubWlncmF0aW9ucy5yZW1vdmVVbnVzZWRdLFxuICBsb2dnaW5nOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnNTdG9yYWdlO1xuXG5leHBvcnQgY29uc3QgaG90a2V5U3RvcmFnZSA9IG5ldyBPcHRpb25zU3luYyh7XG4gIGRlZmF1bHRzOiBPYmplY3QuYXNzaWduKFxuICAgIHt9LFxuICAgIC4uLkFycmF5LmZyb20oYWN0aW9uRGlzcGxheU5hbWVzLmtleXMoKSkubWFwKChpdGVtKSA9PiAoe1xuICAgICAgW2l0ZW1dOiBcIk5vdCBTZXRcIixcbiAgICB9KSksXG4gICksXG4gIC8vbWlncmF0aW9uczogW09wdGlvbnNTeW5jLm1pZ3JhdGlvbnMucmVtb3ZlVW51c2VkXSxcbiAgbG9nZ2luZzogdHJ1ZSxcbn0pO1xuIiwiaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICd0aHJvdHRsZS1kZWJvdW5jZSc7XG5pbXBvcnQgY2hyb21lUCBmcm9tICd3ZWJleHQtcG9seWZpbGwta2luZGEnO1xuaW1wb3J0IHsgaXNCYWNrZ3JvdW5kIH0gZnJvbSAnd2ViZXh0LWRldGVjdCc7XG5pbXBvcnQgeyBzZXJpYWxpemUsIGRlc2VyaWFsaXplIH0gZnJvbSAnZG9tLWZvcm0tc2VyaWFsaXplci9kaXN0L2RvbS1mb3JtLXNlcmlhbGl6ZXIubWpzJztcbmltcG9ydCBMWlN0cmluZyBmcm9tICdsei1zdHJpbmcnO1xuaW1wb3J0IHsgb25Db250ZXh0SW52YWxpZGF0ZWQgfSBmcm9tICd3ZWJleHQtZXZlbnRzJztcbmltcG9ydCB7IGxvYWRGaWxlLCBzYXZlRmlsZSB9IGZyb20gJy4vZmlsZS5qcyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uIC0tIENKUyBpbiBFU00gaW1wb3J0c1xuY29uc3QgeyBjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudCwgZGVjb21wcmVzc0Zyb21FbmNvZGVkVVJJQ29tcG9uZW50IH0gPSBMWlN0cmluZztcbmZ1bmN0aW9uIGFsZXJ0QW5kVGhyb3cobWVzc2FnZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hbGVydFxuICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNob3VsZFJ1bk1pZ3JhdGlvbnMoKSB7XG4gICAgY29uc3Qgc2VsZiA9IGF3YWl0IGNocm9tZVAubWFuYWdlbWVudD8uZ2V0U2VsZigpO1xuICAgIC8vIEFsd2F5cyBydW4gbWlncmF0aW9ucyBkdXJpbmcgZGV2ZWxvcG1lbnQgIzI1XG4gICAgaWYgKHNlbGY/Lmluc3RhbGxUeXBlID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIC8vIFJ1biBtaWdyYXRpb25zIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQgb3IgdXBkYXRlZFxuICAgICAgICBjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSWYgYG9uSW5zdGFsbGVkYCBpc24ndCBmaXJlZCwgdGhlbiBtaWdyYXRpb25zIHNob3VsZCBub3QgYmUgcnVuXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwLCBmYWxzZSk7XG4gICAgfSk7XG59XG5jbGFzcyBPcHRpb25zU3luYyB7XG4gICAgc3RhdGljIG1pZ3JhdGlvbnMgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICBIZWxwZXIgbWV0aG9kIHRoYXQgcmVtb3ZlcyBhbnkgb3B0aW9uIHRoYXQgaXNuJ3QgZGVmaW5lZCBpbiB0aGUgZGVmYXVsdHMuIEl0J3MgdXNlZnVsIHRvIGF2b2lkIGxlYXZpbmcgb2xkIG9wdGlvbnMgdGFraW5nIHVwIHNwYWNlLlxuICAgICAgICAqL1xuICAgICAgICByZW1vdmVVbnVzZWQob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIGRlZmF1bHRzKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHN0b3JhZ2VOYW1lO1xuICAgIHN0b3JhZ2VUeXBlO1xuICAgIGRlZmF1bHRzO1xuICAgIF9mb3JtO1xuICAgIF9taWdyYXRpb25zO1xuICAgIC8qKlxuICAgIEBjb25zdHJ1Y3RvciBSZXR1cm5zIGFuIGluc3RhbmNlIGxpbmtlZCB0byB0aGUgY2hvc2VuIHN0b3JhZ2UuXG4gICAgQHBhcmFtIHNldHVwIC0gQ29uZmlndXJhdGlvbiBmb3IgYHdlYmV4dC1vcHRpb25zLXN5bmNgXG4gICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7IFxuICAgIC8vIGBhc2AgcmVhc29uOiBodHRwczovL2dpdGh1Yi5jb20vZnJlZ2FudGUvd2ViZXh0LW9wdGlvbnMtc3luYy9wdWxsLzIxI2lzc3VlY29tbWVudC01MDAzMTQwNzRcbiAgICBkZWZhdWx0cyA9IHt9LCBzdG9yYWdlTmFtZSA9ICdvcHRpb25zJywgbWlncmF0aW9ucyA9IFtdLCBsb2dnaW5nID0gdHJ1ZSwgc3RvcmFnZVR5cGUgPSAnc3luYycsIH0gPSB7fSkge1xuICAgICAgICB0aGlzLnN0b3JhZ2VOYW1lID0gc3RvcmFnZU5hbWU7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICAgICAgdGhpcy5zdG9yYWdlVHlwZSA9IHN0b3JhZ2VUeXBlO1xuICAgICAgICBpZiAoIWxvZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZyA9ICgpID0+IHsgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9taWdyYXRpb25zID0gdGhpcy5fcnVuTWlncmF0aW9ucyhtaWdyYXRpb25zKTtcbiAgICB9XG4gICAgZ2V0IHN0b3JhZ2UoKSB7XG4gICAgICAgIHJldHVybiBjaHJvbWVQLnN0b3JhZ2VbdGhpcy5zdG9yYWdlVHlwZV07XG4gICAgfVxuICAgIC8qKlxuICAgIFJldHJpZXZlcyBhbGwgdGhlIG9wdGlvbnMgc3RvcmVkLlxuXG4gICAgQHJldHVybnMgUHJvbWlzZSB0aGF0IHdpbGwgcmVzb2x2ZSB3aXRoICoqYWxsKiogdGhlIG9wdGlvbnMgc3RvcmVkLCBhcyBhbiBvYmplY3QuXG5cbiAgICBAZXhhbXBsZVxuICAgIGNvbnN0IG9wdGlvbnNTdG9yYWdlID0gbmV3IE9wdGlvbnNTeW5jKCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGF3YWl0IG9wdGlvbnNTdG9yYWdlLmdldEFsbCgpO1xuICAgIGNvbnNvbGUubG9nKCdUaGUgdXNlcuKAmXMgb3B0aW9ucyBhcmUnLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5jb2xvcikge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgfVxuICAgICovXG4gICAgYXN5bmMgZ2V0QWxsKCkge1xuICAgICAgICBhd2FpdCB0aGlzLl9taWdyYXRpb25zO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWxsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIE92ZXJyaWRlcyAqKmFsbCoqIHRoZSBvcHRpb25zIHN0b3JlZCB3aXRoIHlvdXIgYG9wdGlvbnNgLlxuXG4gICAgQHBhcmFtIG5ld09wdGlvbnMgLSBBIG1hcCBvZiBkZWZhdWx0IG9wdGlvbnMgYXMgc3RyaW5ncyBvciBib29sZWFucy4gVGhlIGtleXMgd2lsbCBoYXZlIHRvIG1hdGNoIHRoZSBmb3JtIGZpZWxkcycgYG5hbWVgIGF0dHJpYnV0ZXMuXG4gICAgKi9cbiAgICBhc3luYyBzZXRBbGwobmV3T3B0aW9ucykge1xuICAgICAgICBhd2FpdCB0aGlzLl9taWdyYXRpb25zO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0QWxsKG5ld09wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICBNZXJnZXMgbmV3IG9wdGlvbnMgd2l0aCB0aGUgZXhpc3Rpbmcgc3RvcmVkIG9wdGlvbnMuXG5cbiAgICBAcGFyYW0gbmV3T3B0aW9ucyAtIEEgbWFwIG9mIGRlZmF1bHQgb3B0aW9ucyBhcyBzdHJpbmdzIG9yIGJvb2xlYW5zLiBUaGUga2V5cyB3aWxsIGhhdmUgdG8gbWF0Y2ggdGhlIGZvcm0gZmllbGRzJyBgbmFtZWAgYXR0cmlidXRlcy5cbiAgICAqL1xuICAgIGFzeW5jIHNldChuZXdPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldEFsbCh7IC4uLmF3YWl0IHRoaXMuZ2V0QWxsKCksIC4uLm5ld09wdGlvbnMgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgIEFueSBkZWZhdWx0cyBvciBzYXZlZCBvcHRpb25zIHdpbGwgYmUgbG9hZGVkIGludG8gdGhlIGA8Zm9ybT5gIGFuZCBhbnkgY2hhbmdlIHdpbGwgYXV0b21hdGljYWxseSBiZSBzYXZlZCB0byBzdG9yYWdlXG5cbiAgICBAcGFyYW0gc2VsZWN0b3IgLSBUaGUgYDxmb3JtPmAgdGhhdCBuZWVkcyB0byBiZSBzeW5jaHJvbml6ZWQgb3IgYSBDU1Mgc2VsZWN0b3IgKG9uZSBlbGVtZW50KS5cbiAgICBUaGUgZm9ybSBmaWVsZHMnIGBuYW1lYCBhdHRyaWJ1dGVzIHdpbGwgaGF2ZSB0byBtYXRjaCB0aGUgb3B0aW9uIG5hbWVzLlxuICAgICovXG4gICAgYXN5bmMgc3luY0Zvcm0oZm9ybSkge1xuICAgICAgICB0aGlzLnN0b3BTeW5jRm9ybSgpO1xuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudFxuICAgICAgICAgICAgPyBmb3JtXG4gICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybSk7XG4gICAgICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9oYW5kbGVGb3JtSW5wdXQpO1xuICAgICAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQpO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIodGhpcy5faGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZvcm0odGhpcy5fZm9ybSwgYXdhaXQgdGhpcy5nZXRBbGwoKSk7XG4gICAgICAgIHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcignLmpzLWV4cG9ydCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXhwb3J0VG9GaWxlKTtcbiAgICAgICAgdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKCcuanMtaW1wb3J0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5pbXBvcnRGcm9tRmlsZSk7XG4gICAgICAgIG9uQ29udGV4dEludmFsaWRhdGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgUmVtb3ZlcyBhbnkgbGlzdGVuZXJzIGFkZGVkIGJ5IGBzeW5jRm9ybWBcbiAgICAqL1xuICAgIHN0b3BTeW5jRm9ybSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9oYW5kbGVGb3JtSW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5fZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcignLmpzLWV4cG9ydCcpPy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZXhwb3J0VG9GaWxlKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcignLmpzLWltcG9ydCcpPy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaW1wb3J0RnJvbUZpbGUpO1xuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2hhbmRsZVN0b3JhZ2VDaGFuZ2VPbkZvcm0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2Zvcm07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IF9qc29uSWRlbnRpdHlIZWxwZXIoKSB7XG4gICAgICAgIHJldHVybiAnX193ZWJleHRPcHRpb25zU3luYyc7XG4gICAgfVxuICAgIC8qKlxuICAgIE9wZW5zIHRoZSBicm93c2Vy4oCZcyBmaWxlIHBpY2tlciB0byBpbXBvcnQgb3B0aW9ucyBmcm9tIGEgcHJldmlvdXNseS1zYXZlZCBKU09OIGZpbGVcbiAgICAqL1xuICAgIGltcG9ydEZyb21GaWxlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgbG9hZEZpbGUoKTtcbiAgICAgICAgbGV0IG9wdGlvbnM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICBhbGVydEFuZFRocm93KCdUaGUgZmlsZSBpcyBub3QgYSB2YWxpZCBKU09OIGZpbGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEodGhpcy5fanNvbklkZW50aXR5SGVscGVyIGluIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBhbGVydEFuZFRocm93KCdUaGUgZmlsZSBzZWxlY3RlZCBpcyBub3QgYSB2YWxpZCByZWNvZ25pemVkIG9wdGlvbnMgZmlsZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgb3B0aW9uc1t0aGlzLl9qc29uSWRlbnRpdHlIZWxwZXJdO1xuICAgICAgICBhd2FpdCB0aGlzLnNldChvcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuX2Zvcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvcm0odGhpcy5fZm9ybSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgIE9wZW5zIHRoZSBicm93c2Vy4oCZcyBcInNhdmUgZmlsZVwiIGRpYWxvZyB0byBleHBvcnQgb3B0aW9ucyB0byBhIEpTT04gZmlsZVxuICAgICovXG4gICAgZXhwb3J0VG9GaWxlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBleHRlbnNpb24gPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgW3RoaXMuX2pzb25JZGVudGl0eUhlbHBlcl06IGV4dGVuc2lvbi5uYW1lLFxuICAgICAgICAgICAgLi4uYXdhaXQgdGhpcy5nZXRBbGwoKSxcbiAgICAgICAgfSwgbnVsbCwgJ1xcdCcpO1xuICAgICAgICBhd2FpdCBzYXZlRmlsZSh0ZXh0LCBleHRlbnNpb24ubmFtZSArICcgb3B0aW9ucy5qc29uJyk7XG4gICAgfTtcbiAgICBvbkNoYW5nZWQoY2FsbGJhY2ssIHNpZ25hbCkge1xuICAgICAgICBjb25zdCBvbkNoYW5nZWQgPSAoY2hhbmdlcywgYXJlYSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGNoYW5nZXNbdGhpcy5zdG9yYWdlTmFtZV07XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBhcmVhID09PSB0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fZGVjb2RlKGRhdGEubmV3VmFsdWUpLCB0aGlzLl9kZWNvZGUoZGF0YS5vbGRWYWx1ZSA/PyB7fSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIob25DaGFuZ2VkKTtcbiAgICAgICAgc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihvbkNoYW5nZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2xvZyhtZXRob2QsIC4uLmFyZ3VtZW50c18pIHtcbiAgICAgICAgY29uc29sZVttZXRob2RdKC4uLmFyZ3VtZW50c18pO1xuICAgIH1cbiAgICBhc3luYyBfZ2V0QWxsKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMuc3RvcmFnZU5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVjb2RlKHJlc3VsdFt0aGlzLnN0b3JhZ2VOYW1lXSk7XG4gICAgfVxuICAgIGFzeW5jIF9zZXRBbGwobmV3T3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2coJ2xvZycsICdTYXZpbmcgb3B0aW9ucycsIG5ld09wdGlvbnMpO1xuICAgICAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0KHtcbiAgICAgICAgICAgIFt0aGlzLnN0b3JhZ2VOYW1lXTogdGhpcy5fZW5jb2RlKG5ld09wdGlvbnMpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2VuY29kZShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHRoaW5uZWRPcHRpb25zID0geyAuLi5vcHRpb25zIH07XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaW5uZWRPcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdHNba2V5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpbm5lZE9wdGlvbnNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2coJ2xvZycsICdXaXRob3V0IHRoZSBkZWZhdWx0IHZhbHVlcycsIHRoaW5uZWRPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaW5uZWRPcHRpb25zKSk7XG4gICAgfVxuICAgIF9kZWNvZGUob3B0aW9ucykge1xuICAgICAgICBsZXQgZGVjb21wcmVzc2VkID0gb3B0aW9ucztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGVjb21wcmVzc2VkID0gSlNPTi5wYXJzZShkZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQob3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuZGVmYXVsdHMsIC4uLmRlY29tcHJlc3NlZCB9O1xuICAgIH1cbiAgICBhc3luYyBfcnVuTWlncmF0aW9ucyhtaWdyYXRpb25zKSB7XG4gICAgICAgIGlmIChtaWdyYXRpb25zLmxlbmd0aCA9PT0gMCB8fCAhaXNCYWNrZ3JvdW5kKCkgfHwgIWF3YWl0IHNob3VsZFJ1bk1pZ3JhdGlvbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB0aGlzLl9nZXRBbGwoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sb2coJ2xvZycsICdGb3VuZCB0aGVzZSBzdG9yZWQgb3B0aW9ucycsIHsgLi4ub3B0aW9ucyB9KTtcbiAgICAgICAgdGhpcy5fbG9nKCdpbmZvJywgJ1dpbGwgcnVuJywgbWlncmF0aW9ucy5sZW5ndGgsIG1pZ3JhdGlvbnMubGVuZ3RoID09PSAxID8gJ21pZ3JhdGlvbicgOiAnIG1pZ3JhdGlvbnMnKTtcbiAgICAgICAgZm9yIChjb25zdCBtaWdyYXRlIG9mIG1pZ3JhdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wIC0tIE11c3QgYmUgZG9uZSBpbiBvcmRlclxuICAgICAgICAgICAgYXdhaXQgbWlncmF0ZShvcHRpb25zLCB0aGlzLmRlZmF1bHRzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNhdmUgdG8gc3RvcmFnZSBpZiB0aGVyZSB3ZXJlIGFueSBjaGFuZ2VzXG4gICAgICAgIGlmIChpbml0aWFsICE9PSBKU09OLnN0cmluZ2lmeShvcHRpb25zKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2V0QWxsKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbWVtYmVyLW9yZGVyaW5nIC0tIE5lZWRzIHRvIGJlIG5lYXIgX2hhbmRsZUZvcm1TdWJtaXRcbiAgICBfaGFuZGxlRm9ybUlucHV0ID0gZGVib3VuY2UoMzAwLCBhc3luYyAoeyB0YXJnZXQgfSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRhcmdldDtcbiAgICAgICAgaWYgKCFmaWVsZC5uYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0KHRoaXMuX3BhcnNlRm9ybShmaWVsZC5mb3JtKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb3B0aW9ucy1zeW5jOnNhdmUtZXJyb3InLCB7XG4gICAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IGVycm9yLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29wdGlvbnMtc3luYzpzYXZlLXN1Y2Nlc3MnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRPRE86IERlcHJlY2F0ZWQ7IGRyb3AgaW4gbmV4dCBtYWpvclxuICAgICAgICBmaWVsZC5mb3JtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvcHRpb25zLXN5bmM6Zm9ybS1zeW5jZWQnLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KSk7XG4gICAgfSk7XG4gICAgX2hhbmRsZUZvcm1TdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgX3VwZGF0ZUZvcm0oZm9ybSwgb3B0aW9ucykge1xuICAgICAgICAvLyBSZWR1Y2UgY2hhbmdlcyB0byBvbmx5IHZhbHVlcyB0aGF0IGhhdmUgY2hhbmdlZFxuICAgICAgICBjb25zdCBjdXJyZW50Rm9ybVN0YXRlID0gdGhpcy5fcGFyc2VGb3JtKGZvcm0pO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRGb3JtU3RhdGVba2V5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluY2x1ZGUgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICAgICAgaWYgKGluY2x1ZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gTGltaXRzIGBkZXNlcmlhbGl6ZWAgdG8gb25seSB0aGUgc3BlY2lmaWVkIGZpZWxkcy4gV2l0aG91dCBpdCwgaXQgd2lsbCB0cnkgdG8gc2V0IHRoZSBldmVyeSBmaWVsZCwgZXZlbiBpZiB0aGV5J3JlIG1pc3NpbmcgZnJvbSB0aGUgc3VwcGxpZWQgYG9wdGlvbnNgXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZShmb3JtLCBvcHRpb25zLCB7IGluY2x1ZGUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUGFyc2UgZm9ybSBpbnRvIG9iamVjdCwgZXhjZXB0IGludmFsaWQgZmllbGRzXG4gICAgX3BhcnNlRm9ybShmb3JtKSB7XG4gICAgICAgIGNvbnN0IGluY2x1ZGUgPSBbXTtcbiAgICAgICAgLy8gRG9uJ3Qgc2VyaWFsaXplIGRpc2FibGVkIGFuZCBpbnZhbGlkIGZpZWxkc1xuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW25hbWVdJykpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGl0eS52YWxpZCAmJiAhZmllbGQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlLnB1c2goZmllbGQubmFtZS5yZXBsYWNlKC9cXFsuKl0vLCAnJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXJpYWxpemUoZm9ybSwgeyBpbmNsdWRlIH0pO1xuICAgIH1cbiAgICBfaGFuZGxlU3RvcmFnZUNoYW5nZU9uRm9ybSA9IChjaGFuZ2VzLCBhcmVhTmFtZSkgPT4ge1xuICAgICAgICBpZiAoYXJlYU5hbWUgPT09IHRoaXMuc3RvcmFnZVR5cGVcbiAgICAgICAgICAgICYmIHRoaXMuc3RvcmFnZU5hbWUgaW4gY2hhbmdlc1xuICAgICAgICAgICAgJiYgKCFkb2N1bWVudC5oYXNGb2N1cygpIHx8ICF0aGlzLl9mb3JtLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSAvLyBBdm9pZCBhcHBseWluZyBjaGFuZ2VzIHdoaWxlIHRoZSB1c2VyIGlzIGVkaXRpbmcgYSBmaWVsZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvcm0odGhpcy5fZm9ybSwgdGhpcy5fZGVjb2RlKGNoYW5nZXNbdGhpcy5zdG9yYWdlTmFtZV0ubmV3VmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgZGVmYXVsdCBPcHRpb25zU3luYztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCxuby1wYXJhbS1yZWFzc2lnbixuby1zaGFkb3cgKi9cblxuLyoqXG4gKiBUaHJvdHRsZSBleGVjdXRpb24gb2YgYSBmdW5jdGlvbi4gRXNwZWNpYWxseSB1c2VmdWwgZm9yIHJhdGUgbGltaXRpbmdcbiAqIGV4ZWN1dGlvbiBvZiBoYW5kbGVycyBvbiBldmVudHMgbGlrZSByZXNpemUgYW5kIHNjcm9sbC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSAgICAgICAgICAgICAgICAgIEEgemVyby1vci1ncmVhdGVyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy4gRm9yIGV2ZW50IGNhbGxiYWNrcywgdmFsdWVzIGFyb3VuZCAxMDAgb3IgMjUwIChvciBldmVuIGhpZ2hlcilcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgbW9zdCB1c2VmdWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtICAgICAgICAgICAgICAgQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciBkZWxheSBtaWxsaXNlY29uZHMuIFRoZSBgdGhpc2AgY29udGV4dCBhbmQgYWxsIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRocm91Z2gsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMtaXMsIHRvIGBjYWxsYmFja2Agd2hlbiB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGlzIGV4ZWN1dGVkLlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtICAgICAgICAgICAgICBBbiBvYmplY3QgdG8gY29uZmlndXJlIG9wdGlvbnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm5vVHJhaWxpbmddIC0gICBPcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2UuIElmIG5vVHJhaWxpbmcgaXMgdHJ1ZSwgY2FsbGJhY2sgd2lsbCBvbmx5IGV4ZWN1dGUgZXZlcnkgYGRlbGF5YCBtaWxsaXNlY29uZHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGlzIGJlaW5nIGNhbGxlZC4gSWYgbm9UcmFpbGluZyBpcyBmYWxzZSBvciB1bnNwZWNpZmllZCwgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uZSBmaW5hbCB0aW1lIGFmdGVyIHRoZSBsYXN0IHRocm90dGxlZC1mdW5jdGlvbiBjYWxsLiAoQWZ0ZXIgdGhlIHRocm90dGxlZC1mdW5jdGlvbiBoYXMgbm90IGJlZW4gY2FsbGVkIGZvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBkZWxheWAgbWlsbGlzZWNvbmRzLCB0aGUgaW50ZXJuYWwgY291bnRlciBpcyByZXNldCkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm5vTGVhZGluZ10gLSAgIE9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZS4gSWYgbm9MZWFkaW5nIGlzIGZhbHNlLCB0aGUgZmlyc3QgdGhyb3R0bGVkLWZ1bmN0aW9uIGNhbGwgd2lsbCBleGVjdXRlIGNhbGxiYWNrXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1tZWRpYXRlbHkuIElmIG5vTGVhZGluZyBpcyB0cnVlLCB0aGUgZmlyc3QgdGhlIGNhbGxiYWNrIGV4ZWN1dGlvbiB3aWxsIGJlIHNraXBwZWQuIEl0IHNob3VsZCBiZSBub3RlZCB0aGF0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgd2lsbCBuZXZlciBleGVjdXRlZCBpZiBib3RoIG5vTGVhZGluZyA9IHRydWUgYW5kIG5vVHJhaWxpbmcgPSB0cnVlLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5kZWJvdW5jZU1vZGVdIC0gSWYgYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pLCBzY2hlZHVsZSBgY2xlYXJgIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy4gSWYgYGRlYm91bmNlTW9kZWAgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSAoYXQgZW5kKSwgc2NoZWR1bGUgYGNhbGxiYWNrYCB0byBleGVjdXRlIGFmdGVyIGBkZWxheWAgbXMuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldywgdGhyb3R0bGVkLCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUgKGRlbGF5LCBjYWxsYmFjaywgb3B0aW9ucykge1xuICB2YXIgX3JlZiA9IG9wdGlvbnMgfHwge30sXG4gICAgX3JlZiRub1RyYWlsaW5nID0gX3JlZi5ub1RyYWlsaW5nLFxuICAgIG5vVHJhaWxpbmcgPSBfcmVmJG5vVHJhaWxpbmcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRub1RyYWlsaW5nLFxuICAgIF9yZWYkbm9MZWFkaW5nID0gX3JlZi5ub0xlYWRpbmcsXG4gICAgbm9MZWFkaW5nID0gX3JlZiRub0xlYWRpbmcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRub0xlYWRpbmcsXG4gICAgX3JlZiRkZWJvdW5jZU1vZGUgPSBfcmVmLmRlYm91bmNlTW9kZSxcbiAgICBkZWJvdW5jZU1vZGUgPSBfcmVmJGRlYm91bmNlTW9kZSA9PT0gdm9pZCAwID8gdW5kZWZpbmVkIDogX3JlZiRkZWJvdW5jZU1vZGU7XG4gIC8qXG4gICAqIEFmdGVyIHdyYXBwZXIgaGFzIHN0b3BwZWQgYmVpbmcgY2FsbGVkLCB0aGlzIHRpbWVvdXQgZW5zdXJlcyB0aGF0XG4gICAqIGBjYWxsYmFja2AgaXMgZXhlY3V0ZWQgYXQgdGhlIHByb3BlciB0aW1lcyBpbiBgdGhyb3R0bGVgIGFuZCBgZW5kYFxuICAgKiBkZWJvdW5jZSBtb2Rlcy5cbiAgICovXG4gIHZhciB0aW1lb3V0SUQ7XG4gIHZhciBjYW5jZWxsZWQgPSBmYWxzZTtcblxuICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBsYXN0IHRpbWUgYGNhbGxiYWNrYCB3YXMgZXhlY3V0ZWQuXG4gIHZhciBsYXN0RXhlYyA9IDA7XG5cbiAgLy8gRnVuY3Rpb24gdG8gY2xlYXIgZXhpc3RpbmcgdGltZW91dFxuICBmdW5jdGlvbiBjbGVhckV4aXN0aW5nVGltZW91dCgpIHtcbiAgICBpZiAodGltZW91dElEKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBjYW5jZWwgbmV4dCBleGVjXG4gIGZ1bmN0aW9uIGNhbmNlbChvcHRpb25zKSB7XG4gICAgdmFyIF9yZWYyID0gb3B0aW9ucyB8fCB7fSxcbiAgICAgIF9yZWYyJHVwY29taW5nT25seSA9IF9yZWYyLnVwY29taW5nT25seSxcbiAgICAgIHVwY29taW5nT25seSA9IF9yZWYyJHVwY29taW5nT25seSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmMiR1cGNvbWluZ09ubHk7XG4gICAgY2xlYXJFeGlzdGluZ1RpbWVvdXQoKTtcbiAgICBjYW5jZWxsZWQgPSAhdXBjb21pbmdPbmx5O1xuICB9XG5cbiAgLypcbiAgICogVGhlIGB3cmFwcGVyYCBmdW5jdGlvbiBlbmNhcHN1bGF0ZXMgYWxsIG9mIHRoZSB0aHJvdHRsaW5nIC8gZGVib3VuY2luZ1xuICAgKiBmdW5jdGlvbmFsaXR5IGFuZCB3aGVuIGV4ZWN1dGVkIHdpbGwgbGltaXQgdGhlIHJhdGUgYXQgd2hpY2ggYGNhbGxiYWNrYFxuICAgKiBpcyBleGVjdXRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c18gPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmd1bWVudHNfW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gbGFzdEV4ZWM7XG4gICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEV4ZWN1dGUgYGNhbGxiYWNrYCBhbmQgdXBkYXRlIHRoZSBgbGFzdEV4ZWNgIHRpbWVzdGFtcC5cbiAgICBmdW5jdGlvbiBleGVjKCkge1xuICAgICAgbGFzdEV4ZWMgPSBEYXRlLm5vdygpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoc2VsZiwgYXJndW1lbnRzXyk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbikgdGhpcyBpcyB1c2VkIHRvIGNsZWFyIHRoZSBmbGFnXG4gICAgICogdG8gYWxsb3cgZnV0dXJlIGBjYWxsYmFja2AgZXhlY3V0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRpbWVvdXRJRCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCFub0xlYWRpbmcgJiYgZGVib3VuY2VNb2RlICYmICF0aW1lb3V0SUQpIHtcbiAgICAgIC8qXG4gICAgICAgKiBTaW5jZSBgd3JhcHBlcmAgaXMgYmVpbmcgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZSBhbmRcbiAgICAgICAqIGBkZWJvdW5jZU1vZGVgIGlzIHRydWUgKGF0IGJlZ2luKSwgZXhlY3V0ZSBgY2FsbGJhY2tgXG4gICAgICAgKiBhbmQgbm9MZWFkaW5nICE9IHRydWUuXG4gICAgICAgKi9cbiAgICAgIGV4ZWMoKTtcbiAgICB9XG4gICAgY2xlYXJFeGlzdGluZ1RpbWVvdXQoKTtcbiAgICBpZiAoZGVib3VuY2VNb2RlID09PSB1bmRlZmluZWQgJiYgZWxhcHNlZCA+IGRlbGF5KSB7XG4gICAgICBpZiAobm9MZWFkaW5nKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIEluIHRocm90dGxlIG1vZGUgd2l0aCBub0xlYWRpbmcsIGlmIGBkZWxheWAgdGltZSBoYXNcbiAgICAgICAgICogYmVlbiBleGNlZWRlZCwgdXBkYXRlIGBsYXN0RXhlY2AgYW5kIHNjaGVkdWxlIGBjYWxsYmFja2BcbiAgICAgICAgICogdG8gZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLlxuICAgICAgICAgKi9cbiAgICAgICAgbGFzdEV4ZWMgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIW5vVHJhaWxpbmcpIHtcbiAgICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGRlYm91bmNlTW9kZSA/IGNsZWFyIDogZXhlYywgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbiB0aHJvdHRsZSBtb2RlIHdpdGhvdXQgbm9MZWFkaW5nLCBpZiBgZGVsYXlgIHRpbWUgaGFzIGJlZW4gZXhjZWVkZWQsIGV4ZWN1dGVcbiAgICAgICAgICogYGNhbGxiYWNrYC5cbiAgICAgICAgICovXG4gICAgICAgIGV4ZWMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vVHJhaWxpbmcgIT09IHRydWUpIHtcbiAgICAgIC8qXG4gICAgICAgKiBJbiB0cmFpbGluZyB0aHJvdHRsZSBtb2RlLCBzaW5jZSBgZGVsYXlgIHRpbWUgaGFzIG5vdCBiZWVuXG4gICAgICAgKiBleGNlZWRlZCwgc2NoZWR1bGUgYGNhbGxiYWNrYCB0byBleGVjdXRlIGBkZWxheWAgbXMgYWZ0ZXIgbW9zdFxuICAgICAgICogcmVjZW50IGV4ZWN1dGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbiksIHNjaGVkdWxlIGBjbGVhcmAgdG8gZXhlY3V0ZVxuICAgICAgICogYWZ0ZXIgYGRlbGF5YCBtcy5cbiAgICAgICAqXG4gICAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyBmYWxzZSAoYXQgZW5kKSwgc2NoZWR1bGUgYGNhbGxiYWNrYCB0b1xuICAgICAgICogZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLlxuICAgICAgICovXG4gICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGRlYm91bmNlTW9kZSA/IGNsZWFyIDogZXhlYywgZGVib3VuY2VNb2RlID09PSB1bmRlZmluZWQgPyBkZWxheSAtIGVsYXBzZWQgOiBkZWxheSk7XG4gICAgfVxuICB9XG4gIHdyYXBwZXIuY2FuY2VsID0gY2FuY2VsO1xuXG4gIC8vIFJldHVybiB0aGUgd3JhcHBlciBmdW5jdGlvbi5cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCAqL1xuXG4vKipcbiAqIERlYm91bmNlIGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLiBEZWJvdW5jaW5nLCB1bmxpa2UgdGhyb3R0bGluZyxcbiAqIGd1YXJhbnRlZXMgdGhhdCBhIGZ1bmN0aW9uIGlzIG9ubHkgZXhlY3V0ZWQgYSBzaW5nbGUgdGltZSwgZWl0aGVyIGF0IHRoZVxuICogdmVyeSBiZWdpbm5pbmcgb2YgYSBzZXJpZXMgb2YgY2FsbHMsIG9yIGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSAgICAgICAgICAgICAgIEEgemVyby1vci1ncmVhdGVyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy4gRm9yIGV2ZW50IGNhbGxiYWNrcywgdmFsdWVzIGFyb3VuZCAxMDAgb3IgMjUwIChvciBldmVuIGhpZ2hlcikgYXJlIG1vc3QgdXNlZnVsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGRlbGF5IG1pbGxpc2Vjb25kcy4gVGhlIGB0aGlzYCBjb250ZXh0IGFuZCBhbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCwgYXMtaXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBgY2FsbGJhY2tgIHdoZW4gdGhlIGRlYm91bmNlZC1mdW5jdGlvbiBpcyBleGVjdXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSAgICAgICAgICAgQW4gb2JqZWN0IHRvIGNvbmZpZ3VyZSBvcHRpb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdEJlZ2luXSAtICBPcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2UuIElmIGF0QmVnaW4gaXMgZmFsc2Ugb3IgdW5zcGVjaWZpZWQsIGNhbGxiYWNrIHdpbGwgb25seSBiZSBleGVjdXRlZCBgZGVsYXlgIG1pbGxpc2Vjb25kc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIGxhc3QgZGVib3VuY2VkLWZ1bmN0aW9uIGNhbGwuIElmIGF0QmVnaW4gaXMgdHJ1ZSwgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBvbmx5IGF0IHRoZSBmaXJzdCBkZWJvdW5jZWQtZnVuY3Rpb24gY2FsbC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yIGBkZWxheWAgbWlsbGlzZWNvbmRzLCB0aGUgaW50ZXJuYWwgY291bnRlciBpcyByZXNldCkuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldywgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBkZWJvdW5jZSAoZGVsYXksIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmID0gb3B0aW9ucyB8fCB7fSxcbiAgICBfcmVmJGF0QmVnaW4gPSBfcmVmLmF0QmVnaW4sXG4gICAgYXRCZWdpbiA9IF9yZWYkYXRCZWdpbiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGF0QmVnaW47XG4gIHJldHVybiB0aHJvdHRsZShkZWxheSwgY2FsbGJhY2ssIHtcbiAgICBkZWJvdW5jZU1vZGU6IGF0QmVnaW4gIT09IGZhbHNlXG4gIH0pO1xufVxuXG5leHBvcnQgeyBkZWJvdW5jZSwgdGhyb3R0bGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkLG5vLXBhcmFtLXJlYXNzaWduLG5vLXNoYWRvdyAqL1xuXG4vKipcbiAqIFRocm90dGxlIGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLiBFc3BlY2lhbGx5IHVzZWZ1bCBmb3IgcmF0ZSBsaW1pdGluZ1xuICogZXhlY3V0aW9uIG9mIGhhbmRsZXJzIG9uIGV2ZW50cyBsaWtlIHJlc2l6ZSBhbmQgc2Nyb2xsLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtICAgICAgICAgICAgICAgICAgQSB6ZXJvLW9yLWdyZWF0ZXIgZGVsYXkgaW4gbWlsbGlzZWNvbmRzLiBGb3IgZXZlbnQgY2FsbGJhY2tzLCB2YWx1ZXMgYXJvdW5kIDEwMCBvciAyNTAgKG9yIGV2ZW4gaGlnaGVyKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBtb3N0IHVzZWZ1bC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gICAgICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGRlbGF5IG1pbGxpc2Vjb25kcy4gVGhlIGB0aGlzYCBjb250ZXh0IGFuZCBhbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcy1pcywgdG8gYGNhbGxiYWNrYCB3aGVuIHRoZSB0aHJvdHRsZWQtZnVuY3Rpb24gaXMgZXhlY3V0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gICAgICAgICAgICAgIEFuIG9iamVjdCB0byBjb25maWd1cmUgb3B0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubm9UcmFpbGluZ10gLSAgIE9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZS4gSWYgbm9UcmFpbGluZyBpcyB0cnVlLCBjYWxsYmFjayB3aWxsIG9ubHkgZXhlY3V0ZSBldmVyeSBgZGVsYXlgIG1pbGxpc2Vjb25kc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIHRoZSB0aHJvdHRsZWQtZnVuY3Rpb24gaXMgYmVpbmcgY2FsbGVkLiBJZiBub1RyYWlsaW5nIGlzIGZhbHNlIG9yIHVuc3BlY2lmaWVkLCBjYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lIGZpbmFsIHRpbWUgYWZ0ZXIgdGhlIGxhc3QgdGhyb3R0bGVkLWZ1bmN0aW9uIGNhbGwuIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGRlbGF5YCBtaWxsaXNlY29uZHMsIHRoZSBpbnRlcm5hbCBjb3VudGVyIGlzIHJlc2V0KS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubm9MZWFkaW5nXSAtICAgT3B0aW9uYWwsIGRlZmF1bHRzIHRvIGZhbHNlLiBJZiBub0xlYWRpbmcgaXMgZmFsc2UsIHRoZSBmaXJzdCB0aHJvdHRsZWQtZnVuY3Rpb24gY2FsbCB3aWxsIGV4ZWN1dGUgY2FsbGJhY2tcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseS4gSWYgbm9MZWFkaW5nIGlzIHRydWUsIHRoZSBmaXJzdCB0aGUgY2FsbGJhY2sgZXhlY3V0aW9uIHdpbGwgYmUgc2tpcHBlZC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayB3aWxsIG5ldmVyIGV4ZWN1dGVkIGlmIGJvdGggbm9MZWFkaW5nID0gdHJ1ZSBhbmQgbm9UcmFpbGluZyA9IHRydWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlYm91bmNlTW9kZV0gLSBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbiksIHNjaGVkdWxlIGBjbGVhcmAgdG8gZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLiBJZiBgZGVib3VuY2VNb2RlYCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlIChhdCBlbmQpLCBzY2hlZHVsZSBgY2FsbGJhY2tgIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3LCB0aHJvdHRsZWQsIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZGVsYXksIGNhbGxiYWNrLCBvcHRpb25zKSB7XG5cdGNvbnN0IHtcblx0XHRub1RyYWlsaW5nID0gZmFsc2UsXG5cdFx0bm9MZWFkaW5nID0gZmFsc2UsXG5cdFx0ZGVib3VuY2VNb2RlID0gdW5kZWZpbmVkXG5cdH0gPSBvcHRpb25zIHx8IHt9O1xuXHQvKlxuXHQgKiBBZnRlciB3cmFwcGVyIGhhcyBzdG9wcGVkIGJlaW5nIGNhbGxlZCwgdGhpcyB0aW1lb3V0IGVuc3VyZXMgdGhhdFxuXHQgKiBgY2FsbGJhY2tgIGlzIGV4ZWN1dGVkIGF0IHRoZSBwcm9wZXIgdGltZXMgaW4gYHRocm90dGxlYCBhbmQgYGVuZGBcblx0ICogZGVib3VuY2UgbW9kZXMuXG5cdCAqL1xuXHRsZXQgdGltZW91dElEO1xuXHRsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG5cblx0Ly8gS2VlcCB0cmFjayBvZiB0aGUgbGFzdCB0aW1lIGBjYWxsYmFja2Agd2FzIGV4ZWN1dGVkLlxuXHRsZXQgbGFzdEV4ZWMgPSAwO1xuXG5cdC8vIEZ1bmN0aW9uIHRvIGNsZWFyIGV4aXN0aW5nIHRpbWVvdXRcblx0ZnVuY3Rpb24gY2xlYXJFeGlzdGluZ1RpbWVvdXQoKSB7XG5cdFx0aWYgKHRpbWVvdXRJRCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gRnVuY3Rpb24gdG8gY2FuY2VsIG5leHQgZXhlY1xuXHRmdW5jdGlvbiBjYW5jZWwob3B0aW9ucykge1xuXHRcdGNvbnN0IHsgdXBjb21pbmdPbmx5ID0gZmFsc2UgfSA9IG9wdGlvbnMgfHwge307XG5cdFx0Y2xlYXJFeGlzdGluZ1RpbWVvdXQoKTtcblx0XHRjYW5jZWxsZWQgPSAhdXBjb21pbmdPbmx5O1xuXHR9XG5cblx0Lypcblx0ICogVGhlIGB3cmFwcGVyYCBmdW5jdGlvbiBlbmNhcHN1bGF0ZXMgYWxsIG9mIHRoZSB0aHJvdHRsaW5nIC8gZGVib3VuY2luZ1xuXHQgKiBmdW5jdGlvbmFsaXR5IGFuZCB3aGVuIGV4ZWN1dGVkIHdpbGwgbGltaXQgdGhlIHJhdGUgYXQgd2hpY2ggYGNhbGxiYWNrYFxuXHQgKiBpcyBleGVjdXRlZC5cblx0ICovXG5cdGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJndW1lbnRzXykge1xuXHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRsZXQgZWxhcHNlZCA9IERhdGUubm93KCkgLSBsYXN0RXhlYztcblxuXHRcdGlmIChjYW5jZWxsZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBFeGVjdXRlIGBjYWxsYmFja2AgYW5kIHVwZGF0ZSB0aGUgYGxhc3RFeGVjYCB0aW1lc3RhbXAuXG5cdFx0ZnVuY3Rpb24gZXhlYygpIHtcblx0XHRcdGxhc3RFeGVjID0gRGF0ZS5ub3coKTtcblx0XHRcdGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogSWYgYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pIHRoaXMgaXMgdXNlZCB0byBjbGVhciB0aGUgZmxhZ1xuXHRcdCAqIHRvIGFsbG93IGZ1dHVyZSBgY2FsbGJhY2tgIGV4ZWN1dGlvbnMuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gY2xlYXIoKSB7XG5cdFx0XHR0aW1lb3V0SUQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFub0xlYWRpbmcgJiYgZGVib3VuY2VNb2RlICYmICF0aW1lb3V0SUQpIHtcblx0XHRcdC8qXG5cdFx0XHQgKiBTaW5jZSBgd3JhcHBlcmAgaXMgYmVpbmcgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZSBhbmRcblx0XHRcdCAqIGBkZWJvdW5jZU1vZGVgIGlzIHRydWUgKGF0IGJlZ2luKSwgZXhlY3V0ZSBgY2FsbGJhY2tgXG5cdFx0XHQgKiBhbmQgbm9MZWFkaW5nICE9IHRydWUuXG5cdFx0XHQgKi9cblx0XHRcdGV4ZWMoKTtcblx0XHR9XG5cblx0XHRjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuXG5cdFx0aWYgKGRlYm91bmNlTW9kZSA9PT0gdW5kZWZpbmVkICYmIGVsYXBzZWQgPiBkZWxheSkge1xuXHRcdFx0aWYgKG5vTGVhZGluZykge1xuXHRcdFx0XHQvKlxuXHRcdFx0XHQgKiBJbiB0aHJvdHRsZSBtb2RlIHdpdGggbm9MZWFkaW5nLCBpZiBgZGVsYXlgIHRpbWUgaGFzXG5cdFx0XHRcdCAqIGJlZW4gZXhjZWVkZWQsIHVwZGF0ZSBgbGFzdEV4ZWNgIGFuZCBzY2hlZHVsZSBgY2FsbGJhY2tgXG5cdFx0XHRcdCAqIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy5cblx0XHRcdFx0ICovXG5cdFx0XHRcdGxhc3RFeGVjID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0aWYgKCFub1RyYWlsaW5nKSB7XG5cdFx0XHRcdFx0dGltZW91dElEID0gc2V0VGltZW91dChkZWJvdW5jZU1vZGUgPyBjbGVhciA6IGV4ZWMsIGRlbGF5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Lypcblx0XHRcdFx0ICogSW4gdGhyb3R0bGUgbW9kZSB3aXRob3V0IG5vTGVhZGluZywgaWYgYGRlbGF5YCB0aW1lIGhhcyBiZWVuIGV4Y2VlZGVkLCBleGVjdXRlXG5cdFx0XHRcdCAqIGBjYWxsYmFja2AuXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRleGVjKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChub1RyYWlsaW5nICE9PSB0cnVlKSB7XG5cdFx0XHQvKlxuXHRcdFx0ICogSW4gdHJhaWxpbmcgdGhyb3R0bGUgbW9kZSwgc2luY2UgYGRlbGF5YCB0aW1lIGhhcyBub3QgYmVlblxuXHRcdFx0ICogZXhjZWVkZWQsIHNjaGVkdWxlIGBjYWxsYmFja2AgdG8gZXhlY3V0ZSBgZGVsYXlgIG1zIGFmdGVyIG1vc3Rcblx0XHRcdCAqIHJlY2VudCBleGVjdXRpb24uXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgYGRlYm91bmNlTW9kZWAgaXMgdHJ1ZSAoYXQgYmVnaW4pLCBzY2hlZHVsZSBgY2xlYXJgIHRvIGV4ZWN1dGVcblx0XHRcdCAqIGFmdGVyIGBkZWxheWAgbXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgYGRlYm91bmNlTW9kZWAgaXMgZmFsc2UgKGF0IGVuZCksIHNjaGVkdWxlIGBjYWxsYmFja2AgdG9cblx0XHRcdCAqIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy5cblx0XHRcdCAqL1xuXHRcdFx0dGltZW91dElEID0gc2V0VGltZW91dChcblx0XHRcdFx0ZGVib3VuY2VNb2RlID8gY2xlYXIgOiBleGVjLFxuXHRcdFx0XHRkZWJvdW5jZU1vZGUgPT09IHVuZGVmaW5lZCA/IGRlbGF5IC0gZWxhcHNlZCA6IGRlbGF5XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdHdyYXBwZXIuY2FuY2VsID0gY2FuY2VsO1xuXG5cdC8vIFJldHVybiB0aGUgd3JhcHBlciBmdW5jdGlvbi5cblx0cmV0dXJuIHdyYXBwZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZmluZWQgKi9cblxuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vdGhyb3R0bGUuanMnO1xuXG4vKipcbiAqIERlYm91bmNlIGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLiBEZWJvdW5jaW5nLCB1bmxpa2UgdGhyb3R0bGluZyxcbiAqIGd1YXJhbnRlZXMgdGhhdCBhIGZ1bmN0aW9uIGlzIG9ubHkgZXhlY3V0ZWQgYSBzaW5nbGUgdGltZSwgZWl0aGVyIGF0IHRoZVxuICogdmVyeSBiZWdpbm5pbmcgb2YgYSBzZXJpZXMgb2YgY2FsbHMsIG9yIGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSAgICAgICAgICAgICAgIEEgemVyby1vci1ncmVhdGVyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy4gRm9yIGV2ZW50IGNhbGxiYWNrcywgdmFsdWVzIGFyb3VuZCAxMDAgb3IgMjUwIChvciBldmVuIGhpZ2hlcikgYXJlIG1vc3QgdXNlZnVsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGRlbGF5IG1pbGxpc2Vjb25kcy4gVGhlIGB0aGlzYCBjb250ZXh0IGFuZCBhbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCwgYXMtaXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBgY2FsbGJhY2tgIHdoZW4gdGhlIGRlYm91bmNlZC1mdW5jdGlvbiBpcyBleGVjdXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSAgICAgICAgICAgQW4gb2JqZWN0IHRvIGNvbmZpZ3VyZSBvcHRpb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdEJlZ2luXSAtICBPcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2UuIElmIGF0QmVnaW4gaXMgZmFsc2Ugb3IgdW5zcGVjaWZpZWQsIGNhbGxiYWNrIHdpbGwgb25seSBiZSBleGVjdXRlZCBgZGVsYXlgIG1pbGxpc2Vjb25kc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIGxhc3QgZGVib3VuY2VkLWZ1bmN0aW9uIGNhbGwuIElmIGF0QmVnaW4gaXMgdHJ1ZSwgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBvbmx5IGF0IHRoZSBmaXJzdCBkZWJvdW5jZWQtZnVuY3Rpb24gY2FsbC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yIGBkZWxheWAgbWlsbGlzZWNvbmRzLCB0aGUgaW50ZXJuYWwgY291bnRlciBpcyByZXNldCkuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldywgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZGVsYXksIGNhbGxiYWNrLCBvcHRpb25zKSB7XG5cdGNvbnN0IHsgYXRCZWdpbiA9IGZhbHNlIH0gPSBvcHRpb25zIHx8IHt9O1xuXHRyZXR1cm4gdGhyb3R0bGUoZGVsYXksIGNhbGxiYWNrLCB7IGRlYm91bmNlTW9kZTogYXRCZWdpbiAhPT0gZmFsc2UgfSk7XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChcbiAgICAgIGtleSA9PT0gJ2RlZmF1bHQnIHx8XG4gICAgICBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fFxuICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc3QsIGtleSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJmdW5jdGlvbiBOZXN0ZWRQcm94eSh0YXJnZXQpIHtcblx0cmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcblx0XHRnZXQodGFyZ2V0LCBwcm9wKSB7XG5cdFx0XHRpZiAoIXRhcmdldFtwcm9wXSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgTmVzdGVkUHJveHkodGFyZ2V0W3Byb3BdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICguLi5hcmd1bWVudHNfKSA9PlxuXHRcdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dGFyZ2V0W3Byb3BdKC4uLmFyZ3VtZW50c18sIHJlc3VsdCA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblx0fSk7XG59XG5cbmNvbnN0IGNocm9tZVAgPSBnbG9iYWxUaGlzLmNocm9tZSAmJiBuZXcgTmVzdGVkUHJveHkoZ2xvYmFsVGhpcy5jaHJvbWUpO1xuXG5leHBvcnQgZGVmYXVsdCBjaHJvbWVQO1xuIiwibGV0IGNhY2hlID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlV2ViZXh0RGV0ZWN0UGFnZUNhY2hlKCkge1xuICAgIGNhY2hlID0gZmFsc2U7XG59XG5mdW5jdGlvbiBpc0N1cnJlbnRQYXRobmFtZShwYXRoKSB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBwYXRobmFtZSB9ID0gbmV3IFVSTChwYXRoLCBsb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICByZXR1cm4gcGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNYW5pZmVzdChfdmVyc2lvbikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZT8uZ2V0TWFuaWZlc3Q/LigpO1xufVxuLyogQF9fUFVSRV9fICovXG5mdW5jdGlvbiBvbmNlKGZ1bmN0aW9uXykge1xuICAgIGxldCByZXN1bHQ7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFjYWNoZSB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuLyoqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBjb2RlIGlzIGJlaW5nIHJ1biBvbiBodHRwKHMpOi8vIHBhZ2VzIChpdCBjb3VsZCBiZSBpbiBhIGNvbnRlbnQgc2NyaXB0IG9yIHJlZ3VsYXIgd2ViIGNvbnRleHQpICovXG5leHBvcnQgY29uc3QgaXNXZWJQYWdlID0gb25jZSgoKSA9PiBbJ2Fib3V0OicsICdodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhsb2NhdGlvbi5wcm90b2NvbCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiBleHRlbnNpb24gY29udGV4dHMgdGhhdCBoYXZlIGFjY2VzcyB0byB0aGUgY2hyb21lIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRXh0ZW5zaW9uQ29udGV4dCA9IG9uY2UoKCkgPT4gdHlwZW9mIGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lPy5pZCA9PT0gJ3N0cmluZycpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiBhIHNhbmRib3hlZCBwYWdlICgtZXh0ZW5zaW9uOi8vIFVSTCBwcm90b2NvbCwgYnV0IG5vIGNocm9tZS4qIEFQSSBhY2Nlc3MpICovXG5leHBvcnQgY29uc3QgaXNTYW5kYm94ZWRQYWdlID0gb25jZSgoKSA9PiBsb2NhdGlvbi5wcm90b2NvbC5lbmRzV2l0aCgnLWV4dGVuc2lvbjonKSAmJiAhaXNFeHRlbnNpb25Db250ZXh0KCkpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiBhIGNvbnRlbnQgc2NyaXB0LiBOb3RlIHRoYXQgdGhlIE1BSU4gd29ybGQgaXMgbm90IGNvbnNpZGVyZWQgYSBjb250ZW50IHNjcmlwdC4gKi9cbmV4cG9ydCBjb25zdCBpc0NvbnRlbnRTY3JpcHQgPSBvbmNlKCgpID0+IGlzRXh0ZW5zaW9uQ29udGV4dCgpICYmIGlzV2ViUGFnZSgpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB5b3UncmUgaW4gYSBiYWNrZ3JvdW5kIGNvbnRleHQgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmQgPSAoKSA9PiBpc0JhY2tncm91bmRQYWdlKCkgfHwgaXNCYWNrZ3JvdW5kV29ya2VyKCk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgeW91J3JlIGluIGEgYmFja2dyb3VuZCBwYWdlICovXG5leHBvcnQgY29uc3QgaXNCYWNrZ3JvdW5kUGFnZSA9IG9uY2UoKCkgPT4ge1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gZ2V0TWFuaWZlc3QoMik7XG4gICAgaWYgKCFtYW5pZmVzdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0N1cnJlbnRQYXRobmFtZShtYW5pZmVzdC5iYWNrZ3JvdW5kX3BhZ2UgPz8gbWFuaWZlc3QuYmFja2dyb3VuZD8ucGFnZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBCb29sZWFuKG1hbmlmZXN0LmJhY2tncm91bmQ/LnNjcmlwdHNcbiAgICAgICAgJiYgaXNDdXJyZW50UGF0aG5hbWUoJy9fZ2VuZXJhdGVkX2JhY2tncm91bmRfcGFnZS5odG1sJykpO1xufSk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgeW91J3JlIGluIGEgYmFja2dyb3VuZCB3b3JrZXIgKi9cbmV4cG9ydCBjb25zdCBpc0JhY2tncm91bmRXb3JrZXIgPSBvbmNlKCgpID0+IGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KDMpPy5iYWNrZ3JvdW5kPy5zZXJ2aWNlX3dvcmtlcikpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiBhIHBlcnNpc3RlbnQgYmFja2dyb3VuZCBwYWdlIChhcyBvcHBvc2VkIHRvIGFuIEV2ZW50IFBhZ2Ugb3IgQmFja2dyb3VuZCBXb3JrZXIsIGJvdGggb2Ygd2hpY2ggY2FuIGJlIHVubG9hZGVkIGJ5IHRoZSBicm93c2VyKSAqL1xuZXhwb3J0IGNvbnN0IGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlID0gb25jZSgoKSA9PiBpc0JhY2tncm91bmRQYWdlKClcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8ubWFuaWZlc3RfdmVyc2lvbiA9PT0gMiAvLyBGaXJlZm94IGNhbiBoYXZlIGEgYmFja2dyb3VuZCBwYWdlIG9uIE1WMywgYnV0IGNhbid0IGJlIHBlcnNpc3RlbnRcbiAgICAmJiBnZXRNYW5pZmVzdCgyKT8uYmFja2dyb3VuZD8ucGVyc2lzdGVudCAhPT0gZmFsc2UpO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiBhbiBvcHRpb25zIHBhZ2UuIFRoaXMgb25seSB3b3JrcyBpZiB0aGUgY3VycmVudCBwYWdl4oCZcyBVUkwgbWF0Y2hlcyB0aGUgb25lIHNwZWNpZmllZCBpbiB0aGUgZXh0ZW5zaW9uJ3MgYG1hbmlmZXN0Lmpzb25gICovXG5leHBvcnQgY29uc3QgaXNPcHRpb25zUGFnZSA9IG9uY2UoKCkgPT4gaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoKT8ub3B0aW9uc191aT8ucGFnZSA/PyBnZXRNYW5pZmVzdCgpPy5vcHRpb25zX3BhZ2UpKTtcbi8qKiBJbmRpY2F0ZXMgd2hldGhlciB5b3UncmUgaW4gYSBzaWRlIHBhbmVsLiBUaGlzIG9ubHkgd29ya3MgaWYgdGhlIGN1cnJlbnQgcGFnZeKAmXMgVVJMIG1hdGNoZXMgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCAqL1xuZXhwb3J0IGNvbnN0IGlzU2lkZVBhbmVsID0gb25jZSgoKSA9PiBcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50IC0tIE5vdCB5ZXQgaW4gQHR5cGVzL2Nocm9tZVxuaXNDdXJyZW50UGF0aG5hbWUoZ2V0TWFuaWZlc3QoMyk/Llsnc2lkZV9wYW5lbCddPy5kZWZhdWx0X3BhdGgpKTtcbmV4cG9ydCBjb25zdCBpc0FjdGlvblBvcHVwID0gb25jZSgoKSA9PiB7XG4gICAgLy8gQ2hyb21lLW9ubHk7IEZpcmVmb3ggdXNlcyB0aGUgd2hvbGUgd2luZG934oCmXG4gICAgaWYgKGdsb2JhbFRoaXMub3V0ZXJIZWlnaHQgLSBnbG9iYWxUaGlzLmlubmVySGVpZ2h0ID09PSAxNCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KDMpPy5hY3Rpb24/LmRlZmF1bHRfcG9wdXAgPz8gZ2V0TWFuaWZlc3QoMik/LmJyb3dzZXJfYWN0aW9uPy5kZWZhdWx0X3BvcHVwKTtcbn0pO1xuLyoqIEluZGljYXRlcyB3aGV0aGVyIHlvdSdyZSBpbiB0aGUgbWFpbiBkZXYgdG9vbHMgcGFnZSwgdGhlIG9uZSBzcGVjaWZpZWQgaW4gdGhlIGV4dGVuc2lvbidzIGBtYW5pZmVzdC5qc29uYCBgZGV2dG9vbHNfcGFnZWAgZmllbGQuICovXG5leHBvcnQgY29uc3QgaXNNYWluRGV2VG9vbHNQYWdlID0gb25jZSgoKSA9PiBpc0V4dGVuc2lvbkNvbnRleHQoKVxuICAgICYmIEJvb2xlYW4oY2hyb21lLmRldnRvb2xzKVxuICAgICYmIGlzQ3VycmVudFBhdGhuYW1lKGdldE1hbmlmZXN0KCk/LmRldnRvb2xzX3BhZ2UpKTtcbi8vIFRPRE86IFdoZW4gZHJvcHBpbmcgdGhpcywgYWxzbyByZW5hbWUgdGhlIGBkZXZUb29sc1BhZ2VgIGNvbnRleHQgbmFtZSBiZWxvd1xuLyoqIEBkZXByZWNhdGVkIFVzZSBgaXNNYWluRGV2VG9vbHNQYWdlYCBpbnN0ZWFkICovXG5leHBvcnQgY29uc3QgaXNEZXZUb29sc1BhZ2UgPSBpc01haW5EZXZUb29sc1BhZ2U7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgeW91J3JlIGluIHRoZSBkZXYgdG9vbHMgcGFnZS4gVW5saWtlIGBpc0RldlRvb2xzUGFnZWAsIHRoaXMgd29ya3MgaW4gYW55IHBhZ2UgdGhhdCBoYXMgdGhlIGBjaHJvbWUuZGV2VG9vbHNgIEFQSSAqL1xuZXhwb3J0IGNvbnN0IGlzRGV2VG9vbHMgPSAoKSA9PiBCb29sZWFuKGdsb2JhbFRoaXMuY2hyb21lPy5kZXZ0b29scyk7XG4vKiogSW5kaWNhdGVzIHdoZXRoZXIgeW91J3JlIGluIGEgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY2hyb21lLm9mZnNjcmVlbiAqL1xuZXhwb3J0IGNvbnN0IGlzT2Zmc2NyZWVuRG9jdW1lbnQgPSBvbmNlKCgpID0+IGlzRXh0ZW5zaW9uQ29udGV4dCgpXG4gICAgJiYgJ2RvY3VtZW50JyBpbiBnbG9iYWxUaGlzXG4gICAgJiYgZ2xvYmFsVGhpcy5jaHJvbWU/LmV4dGVuc2lvbiA9PT0gdW5kZWZpbmVkKTtcbi8qKiBMb29zZWx5IGRldGVjdCBGaXJlZm94IHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpO1xuLyoqIExvb3NlbHkgZGV0ZWN0IENocm9tZSB2aWEgdXNlciBhZ2VudCAobWlnaHQgYWxzbyBpbmNsdWRlIENocm9taXVtIGFuZCBmb3JrcyBsaWtlIE9wZXJhKSAqL1xuZXhwb3J0IGNvbnN0IGlzQ2hyb21lID0gKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudC5pbmNsdWRlcygnQ2hyb21lJyk7XG4vKiogTG9vc2VseSBkZXRlY3QgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNTYWZhcmkgPSAoKSA9PiAhaXNDaHJvbWUoKSAmJiBnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50LmluY2x1ZGVzKCdTYWZhcmknKTtcbi8qKiBMb29zZWx5IGRldGVjdCBNb2JpbGUgU2FmYXJpIHZpYSB1c2VyIGFnZW50ICovXG5leHBvcnQgY29uc3QgaXNNb2JpbGVTYWZhcmkgPSAoKSA9PiBpc1NhZmFyaSgpICYmIGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQuaW5jbHVkZXMoJ01vYmlsZScpO1xuY29uc3QgY29udGV4dENoZWNrcyA9IHtcbiAgICBjb250ZW50U2NyaXB0OiBpc0NvbnRlbnRTY3JpcHQsXG4gICAgYmFja2dyb3VuZDogaXNCYWNrZ3JvdW5kLFxuICAgIG9wdGlvbnM6IGlzT3B0aW9uc1BhZ2UsXG4gICAgc2lkZVBhbmVsOiBpc1NpZGVQYW5lbCxcbiAgICBhY3Rpb25Qb3B1cDogaXNBY3Rpb25Qb3B1cCxcbiAgICBkZXZUb29sczogaXNEZXZUb29scyxcbiAgICBkZXZUb29sc1BhZ2U6IGlzRGV2VG9vbHNQYWdlLFxuICAgIG9mZnNjcmVlbkRvY3VtZW50OiBpc09mZnNjcmVlbkRvY3VtZW50LFxuICAgIGV4dGVuc2lvbjogaXNFeHRlbnNpb25Db250ZXh0LFxuICAgIHNhbmRib3g6IGlzU2FuZGJveGVkUGFnZSxcbiAgICB3ZWI6IGlzV2ViUGFnZSxcbn07XG5leHBvcnQgY29uc3QgY29udGV4dE5hbWVzID0gT2JqZWN0LmtleXMoY29udGV4dENoZWNrcyk7XG4vKiogUmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgY29udGV4dCBhbW9uZyB0aG9zZSBkZWZpbmVkIGluIGBDb250ZXh0TmFtZWAsIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBjb250ZXh0LiBSZXR1cm5zIFwidW5rbm93blwiIGlmIG5vIG1hdGNoIGlzIGZvdW5kLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHROYW1lKCkge1xuICAgIGZvciAoY29uc3QgW25hbWUsIHRlc3RdIG9mIE9iamVjdC5lbnRyaWVzKGNvbnRleHRDaGVja3MpKSB7XG4gICAgICAgIGlmICh0ZXN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAndW5rbm93bic7XG59XG4iLCJ2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxudmFyIGFzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBd2FpdFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNHZW5lcmF0b3IoZ2VuKSB7XG4gICAgdmFyIGZyb250LCBiYWNrO1xuXG4gICAgZnVuY3Rpb24gc2VuZChrZXksIGFyZykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgYXJnOiBhcmcsXG4gICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJhY2spIHtcbiAgICAgICAgICBiYWNrID0gYmFjay5uZXh0ID0gcmVxdWVzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9udCA9IGJhY2sgPSByZXF1ZXN0O1xuICAgICAgICAgIHJlc3VtZShrZXksIGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZShrZXksIGFyZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBd2FpdFZhbHVlKSB7XG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLnZhbHVlKS50aGVuKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHJlc3VtZShcIm5leHRcIiwgYXJnKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJ0aHJvd1wiLCBhcmcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHRsZShyZXN1bHQuZG9uZSA/IFwicmV0dXJuXCIgOiBcIm5vcm1hbFwiLCByZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0dGxlKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR0bGUodHlwZSwgdmFsdWUpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwicmV0dXJuXCI6XG4gICAgICAgICAgZnJvbnQucmVzb2x2ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInRocm93XCI6XG4gICAgICAgICAgZnJvbnQucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZnJvbnQgPSBmcm9udC5uZXh0O1xuXG4gICAgICBpZiAoZnJvbnQpIHtcbiAgICAgICAgcmVzdW1lKGZyb250LmtleSwgZnJvbnQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2sgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludm9rZSA9IHNlbmQ7XG5cbiAgICBpZiAodHlwZW9mIGdlbi5yZXR1cm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5yZXR1cm4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuYXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcIm5leHRcIiwgYXJnKTtcbiAgfTtcblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInRocm93XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwicmV0dXJuXCIsIGFyZyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB3cmFwOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNHZW5lcmF0b3IoZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgYXdhaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBBd2FpdFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG52YXIgVHlwZVJlZ2lzdHJ5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUeXBlUmVnaXN0cnkoKSB7XG4gICAgdmFyIGluaXRpYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFR5cGVSZWdpc3RyeSk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyZWRUeXBlcyA9IGluaXRpYWw7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhUeXBlUmVnaXN0cnksIFt7XG4gICAga2V5OiAnZ2V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KHR5cGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyZWRUeXBlc1t0eXBlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyZWRUeXBlc1snZGVmYXVsdCddO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlZ2lzdGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXIodHlwZSwgaXRlbSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJlZ2lzdGVyZWRUeXBlc1t0eXBlXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gPSBpdGVtO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlZ2lzdGVyRGVmYXVsdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdChpdGVtKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyKCdkZWZhdWx0JywgaXRlbSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUeXBlUmVnaXN0cnk7XG59KCk7XG5cbnZhciBLZXlFeHRyYWN0b3JzID0gZnVuY3Rpb24gKF9UeXBlUmVnaXN0cnkpIHtcbiAgaW5oZXJpdHMoS2V5RXh0cmFjdG9ycywgX1R5cGVSZWdpc3RyeSk7XG5cbiAgZnVuY3Rpb24gS2V5RXh0cmFjdG9ycyhvcHRpb25zKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgS2V5RXh0cmFjdG9ycyk7XG5cbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChLZXlFeHRyYWN0b3JzLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoS2V5RXh0cmFjdG9ycykpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMucmVnaXN0ZXJEZWZhdWx0KGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8ICcnO1xuICAgIH0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHJldHVybiBLZXlFeHRyYWN0b3JzO1xufShUeXBlUmVnaXN0cnkpO1xuXG52YXIgSW5wdXRSZWFkZXJzID0gZnVuY3Rpb24gKF9UeXBlUmVnaXN0cnkpIHtcbiAgaW5oZXJpdHMoSW5wdXRSZWFkZXJzLCBfVHlwZVJlZ2lzdHJ5KTtcblxuICBmdW5jdGlvbiBJbnB1dFJlYWRlcnMob3B0aW9ucykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0UmVhZGVycyk7XG5cbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChJbnB1dFJlYWRlcnMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihJbnB1dFJlYWRlcnMpKS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLnJlZ2lzdGVyRGVmYXVsdChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBlbC52YWx1ZTtcbiAgICB9KTtcbiAgICBfdGhpcy5yZWdpc3RlcignY2hlY2tib3gnLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgIT09IG51bGwgPyBlbC5jaGVja2VkID8gZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpIDogbnVsbCA6IGVsLmNoZWNrZWQ7XG4gICAgfSk7XG4gICAgX3RoaXMucmVnaXN0ZXIoJ3NlbGVjdCcsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGdldFNlbGVjdFZhbHVlKGVsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICByZXR1cm4gSW5wdXRSZWFkZXJzO1xufShUeXBlUmVnaXN0cnkpO1xuXG5mdW5jdGlvbiBnZXRTZWxlY3RWYWx1ZShlbGVtKSB7XG4gIHZhciB2YWx1ZSwgb3B0aW9uLCBpO1xuICB2YXIgb3B0aW9ucyA9IGVsZW0ub3B0aW9ucztcbiAgdmFyIGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4O1xuICB2YXIgb25lID0gZWxlbS50eXBlID09PSAnc2VsZWN0LW9uZSc7XG4gIHZhciB2YWx1ZXMgPSBvbmUgPyBudWxsIDogW107XG4gIHZhciBtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aDtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgaSA9IG1heDtcbiAgfSBlbHNlIHtcbiAgICBpID0gb25lID8gaW5kZXggOiAwO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgc2VsZWN0ZWQgb3B0aW9uc1xuICBmb3IgKDsgaSA8IG1heDsgaSsrKSB7XG4gICAgb3B0aW9uID0gb3B0aW9uc1tpXTtcblxuICAgIC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4gICAgLy8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldFxuICAgIGlmICgob3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4KSAmJlxuXG4gICAgLy8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuICAgICFvcHRpb24uZGlzYWJsZWQgJiYgIShvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCAmJiBvcHRpb24ucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdvcHRncm91cCcpKSB7XG4gICAgICAvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG4gICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcblxuICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcbiAgICAgIGlmIChvbmUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICAvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbnZhciBLZXlBc3NpZ25tZW50VmFsaWRhdG9ycyA9IGZ1bmN0aW9uIChfVHlwZVJlZ2lzdHJ5KSB7XG4gIGluaGVyaXRzKEtleUFzc2lnbm1lbnRWYWxpZGF0b3JzLCBfVHlwZVJlZ2lzdHJ5KTtcblxuICBmdW5jdGlvbiBLZXlBc3NpZ25tZW50VmFsaWRhdG9ycyhvcHRpb25zKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgS2V5QXNzaWdubWVudFZhbGlkYXRvcnMpO1xuXG4gICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoS2V5QXNzaWdubWVudFZhbGlkYXRvcnMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihLZXlBc3NpZ25tZW50VmFsaWRhdG9ycykpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMucmVnaXN0ZXJEZWZhdWx0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIF90aGlzLnJlZ2lzdGVyKCdyYWRpbycsIGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGVsLmNoZWNrZWQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgcmV0dXJuIEtleUFzc2lnbm1lbnRWYWxpZGF0b3JzO1xufShUeXBlUmVnaXN0cnkpO1xuXG5mdW5jdGlvbiBrZXlTcGxpdHRlcihrZXkpIHtcbiAgdmFyIG1hdGNoZXMgPSBrZXkubWF0Y2goL1teW1xcXV0rL2cpO1xuICB2YXIgbGFzdEtleSA9IHZvaWQgMDtcbiAgaWYgKGtleS5sZW5ndGggPiAxICYmIGtleS5pbmRleE9mKCdbXScpID09PSBrZXkubGVuZ3RoIC0gMikge1xuICAgIGxhc3RLZXkgPSBtYXRjaGVzLnBvcCgpO1xuICAgIG1hdGNoZXMucHVzaChbbGFzdEtleV0pO1xuICB9XG4gIHJldHVybiBtYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50VHlwZShlbCkge1xuICB2YXIgdHlwZUF0dHIgPSB2b2lkIDA7XG4gIHZhciB0YWdOYW1lID0gZWwudGFnTmFtZTtcbiAgdmFyIHR5cGUgPSB0YWdOYW1lO1xuICBpZiAodGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgdHlwZUF0dHIgPSBlbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKTtcbiAgICBpZiAodHlwZUF0dHIpIHtcbiAgICAgIHR5cGUgPSB0eXBlQXR0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9ICd0ZXh0JztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHR5cGUudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5wdXRFbGVtZW50cyhlbGVtZW50LCBvcHRpb25zKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCxzZWxlY3QsdGV4dGFyZWEnKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0JyAmJiAoZWwudHlwZSA9PT0gJ3N1Ym1pdCcgfHwgZWwudHlwZSA9PT0gJ3Jlc2V0JykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG15VHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKTtcbiAgICB2YXIgZXh0cmFjdG9yID0gb3B0aW9ucy5rZXlFeHRyYWN0b3JzLmdldChteVR5cGUpO1xuICAgIHZhciBpZGVudGlmaWVyID0gZXh0cmFjdG9yKGVsKTtcbiAgICB2YXIgZm91bmRJbkluY2x1ZGUgPSAob3B0aW9ucy5pbmNsdWRlIHx8IFtdKS5pbmRleE9mKGlkZW50aWZpZXIpICE9PSAtMTtcbiAgICB2YXIgZm91bmRJbkV4Y2x1ZGUgPSAob3B0aW9ucy5leGNsdWRlIHx8IFtdKS5pbmRleE9mKGlkZW50aWZpZXIpICE9PSAtMTtcbiAgICB2YXIgZm91bmRJbklnbm9yZWQgPSBmYWxzZTtcbiAgICB2YXIgcmVqZWN0ID0gZmFsc2U7XG5cbiAgICBpZiAob3B0aW9ucy5pZ25vcmVkVHlwZXMpIHtcbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBvcHRpb25zLmlnbm9yZWRUeXBlc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgIGlmIChlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZm91bmRJbklnbm9yZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kSW5JbmNsdWRlKSB7XG4gICAgICByZWplY3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuaW5jbHVkZSkge1xuICAgICAgICByZWplY3QgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0ID0gZm91bmRJbkV4Y2x1ZGUgfHwgZm91bmRJbklnbm9yZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICFyZWplY3Q7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25LZXlWYWx1ZShvYmosIGtleWNoYWluLCB2YWx1ZSkge1xuICBpZiAoIWtleWNoYWluKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciBrZXkgPSBrZXljaGFpbi5zaGlmdCgpO1xuXG4gIC8vIGJ1aWxkIHRoZSBjdXJyZW50IG9iamVjdCB3ZSBuZWVkIHRvIHN0b3JlIGRhdGFcbiAgaWYgKCFvYmpba2V5XSkge1xuICAgIG9ialtrZXldID0gQXJyYXkuaXNBcnJheShrZXkpID8gW10gOiB7fTtcbiAgfVxuXG4gIC8vIGlmIGl0J3MgdGhlIGxhc3Qga2V5IGluIHRoZSBjaGFpbiwgYXNzaWduIHRoZSB2YWx1ZSBkaXJlY3RseVxuICBpZiAoa2V5Y2hhaW4ubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICBvYmpba2V5XS5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyByZWN1cnNpdmUgcGFyc2luZyBvZiB0aGUgYXJyYXksIGRlcHRoLWZpcnN0XG4gIGlmIChrZXljaGFpbi5sZW5ndGggPiAwKSB7XG4gICAgYXNzaWduS2V5VmFsdWUob2JqW2tleV0sIGtleWNoYWluLCB2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBhIEpTT04gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhbGwgb2YgdGhlIGZvcm0gaW5wdXRzLCBpbiB0aGlzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gUm9vdCBlbGVtZW50XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuaW5wdXRSZWFkZXJzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5rZXlBc3NpZ25tZW50VmFsaWRhdG9yc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMua2V5RXh0cmFjdG9yc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMua2V5U3BsaXR0ZXJcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMuaW5jbHVkZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5leGNsdWRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLmlnbm9yZWRUeXBlc1xuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5mdW5jdGlvbiBzZXJpYWxpemUoZWxlbWVudCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgdmFyIGRhdGEgPSB7fTtcbiAgb3B0aW9ucy5rZXlTcGxpdHRlciA9IG9wdGlvbnMua2V5U3BsaXR0ZXIgfHwga2V5U3BsaXR0ZXI7XG4gIG9wdGlvbnMua2V5RXh0cmFjdG9ycyA9IG5ldyBLZXlFeHRyYWN0b3JzKG9wdGlvbnMua2V5RXh0cmFjdG9ycyB8fCB7fSk7XG4gIG9wdGlvbnMuaW5wdXRSZWFkZXJzID0gbmV3IElucHV0UmVhZGVycyhvcHRpb25zLmlucHV0UmVhZGVycyB8fCB7fSk7XG4gIG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnMgPSBuZXcgS2V5QXNzaWdubWVudFZhbGlkYXRvcnMob3B0aW9ucy5rZXlBc3NpZ25tZW50VmFsaWRhdG9ycyB8fCB7fSk7XG5cbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChnZXRJbnB1dEVsZW1lbnRzKGVsZW1lbnQsIG9wdGlvbnMpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgdHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKTtcbiAgICB2YXIga2V5RXh0cmFjdG9yID0gb3B0aW9ucy5rZXlFeHRyYWN0b3JzLmdldCh0eXBlKTtcbiAgICB2YXIga2V5ID0ga2V5RXh0cmFjdG9yKGVsKTtcbiAgICB2YXIgaW5wdXRSZWFkZXIgPSBvcHRpb25zLmlucHV0UmVhZGVycy5nZXQodHlwZSk7XG4gICAgdmFyIHZhbHVlID0gaW5wdXRSZWFkZXIoZWwpO1xuICAgIHZhciB2YWxpZEtleUFzc2lnbm1lbnQgPSBvcHRpb25zLmtleUFzc2lnbm1lbnRWYWxpZGF0b3JzLmdldCh0eXBlKTtcbiAgICBpZiAodmFsaWRLZXlBc3NpZ25tZW50KGVsLCBrZXksIHZhbHVlKSkge1xuICAgICAgdmFyIGtleWNoYWluID0gb3B0aW9ucy5rZXlTcGxpdHRlcihrZXkpO1xuICAgICAgZGF0YSA9IGFzc2lnbktleVZhbHVlKGRhdGEsIGtleWNoYWluLCB2YWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxudmFyIElucHV0V3JpdGVycyA9IGZ1bmN0aW9uIChfVHlwZVJlZ2lzdHJ5KSB7XG4gIGluaGVyaXRzKElucHV0V3JpdGVycywgX1R5cGVSZWdpc3RyeSk7XG5cbiAgZnVuY3Rpb24gSW5wdXRXcml0ZXJzKG9wdGlvbnMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBJbnB1dFdyaXRlcnMpO1xuXG4gICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoSW5wdXRXcml0ZXJzLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW5wdXRXcml0ZXJzKSkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5yZWdpc3RlckRlZmF1bHQoZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xuICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9KTtcbiAgICBfdGhpcy5yZWdpc3RlcignY2hlY2tib3gnLCBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgZWwuaW5kZXRlcm1pbmF0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5pbmRleE9mKGVsLnZhbHVlKSAhPT0gLTEgOiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBfdGhpcy5yZWdpc3RlcigncmFkaW8nLCBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbC5jaGVja2VkID0gZWwudmFsdWUgPT09IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMucmVnaXN0ZXIoJ3NlbGVjdCcsIHNldFNlbGVjdFZhbHVlKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICByZXR1cm4gSW5wdXRXcml0ZXJzO1xufShUeXBlUmVnaXN0cnkpO1xuXG5mdW5jdGlvbiBtYWtlQXJyYXkoYXJyKSB7XG4gIHZhciByZXQgPSBbXTtcbiAgaWYgKGFyciAhPT0gbnVsbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgYXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0LnB1c2goYXJyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBXcml0ZSBzZWxlY3QgdmFsdWVzXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9tYXN0ZXIvc3JjL2F0dHJpYnV0ZXMvdmFsLmpzfEdpdGh1Yn1cbiAqIEBwYXJhbSB7b2JqZWN0fSBTZWxlY3QgZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd8YXJyYXl9IFNlbGVjdCB2YWx1ZVxuICovXG5mdW5jdGlvbiBzZXRTZWxlY3RWYWx1ZShlbGVtLCB2YWx1ZSkge1xuICB2YXIgb3B0aW9uU2V0LCBvcHRpb247XG4gIHZhciBvcHRpb25zID0gZWxlbS5vcHRpb25zO1xuICB2YXIgdmFsdWVzID0gbWFrZUFycmF5KHZhbHVlKTtcbiAgdmFyIGkgPSBvcHRpb25zLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgIGlmICh2YWx1ZXMuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpIHtcbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG4gICAgICBvcHRpb25TZXQgPSB0cnVlO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG4gIH1cblxuICAvLyBGb3JjZSBicm93c2VycyB0byBiZWhhdmUgY29uc2lzdGVudGx5IHdoZW4gbm9uLW1hdGNoaW5nIHZhbHVlIGlzIHNldFxuICBpZiAoIW9wdGlvblNldCkge1xuICAgIGVsZW0uc2VsZWN0ZWRJbmRleCA9IC0xO1xuICB9XG59XG5cbmZ1bmN0aW9uIGtleUpvaW5lcihwYXJlbnRLZXksIGNoaWxkS2V5KSB7XG4gIHJldHVybiBwYXJlbnRLZXkgKyAnWycgKyBjaGlsZEtleSArICddJztcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRhdGEoZGF0YSwgcGFyZW50S2V5KSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcblxuICB2YXIgZmxhdERhdGEgPSB7fTtcbiAgdmFyIGtleUpvaW5lciQkID0gb3B0aW9ucy5rZXlKb2luZXIgfHwga2V5Sm9pbmVyO1xuXG4gIGZvciAodmFyIGtleU5hbWUgaW4gZGF0YSkge1xuICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXlOYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlID0gZGF0YVtrZXlOYW1lXTtcbiAgICB2YXIgaGFzaCA9IHt9O1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBwYXJlbnQga2V5LCBqb2luIGl0IHdpdGhcbiAgICAvLyB0aGUgY3VycmVudCwgY2hpbGQga2V5LlxuICAgIGlmIChwYXJlbnRLZXkpIHtcbiAgICAgIGtleU5hbWUgPSBrZXlKb2luZXIkJChwYXJlbnRLZXksIGtleU5hbWUpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaGFzaFtrZXlOYW1lICsgJ1tdJ10gPSB2YWx1ZTtcbiAgICAgIGhhc2hba2V5TmFtZV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICBoYXNoID0gZmxhdHRlbkRhdGEodmFsdWUsIGtleU5hbWUsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoW2tleU5hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihmbGF0RGF0YSwgaGFzaCk7XG4gIH1cblxuICByZXR1cm4gZmxhdERhdGE7XG59XG5cbi8qKlxuICogVXNlIHRoZSBnaXZlbiBKU09OIG9iamVjdCB0byBwb3B1bGF0ZSBhbGwgb2YgdGhlIGZvcm0gaW5wdXRzLCBpbiB0aGlzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gUm9vdCBlbGVtZW50XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuaW5wdXRXcml0ZXJzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5rZXlFeHRyYWN0b3JzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5rZXlTcGxpdHRlclxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5pbmNsdWRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLmV4Y2x1ZGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMuaWdub3JlZFR5cGVzXG4gKi9cbmZ1bmN0aW9uIGRlc2VyaWFsaXplKGZvcm0sIGRhdGEpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gIHZhciBmbGF0dGVuZWREYXRhID0gZmxhdHRlbkRhdGEoZGF0YSwgbnVsbCwgb3B0aW9ucyk7XG4gIG9wdGlvbnMua2V5RXh0cmFjdG9ycyA9IG5ldyBLZXlFeHRyYWN0b3JzKG9wdGlvbnMua2V5RXh0cmFjdG9ycyB8fCB7fSk7XG4gIG9wdGlvbnMuaW5wdXRXcml0ZXJzID0gbmV3IElucHV0V3JpdGVycyhvcHRpb25zLmlucHV0V3JpdGVycyB8fCB7fSk7XG5cbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChnZXRJbnB1dEVsZW1lbnRzKGZvcm0sIG9wdGlvbnMpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgdHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKTtcblxuICAgIHZhciBrZXlFeHRyYWN0b3IgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KHR5cGUpO1xuICAgIHZhciBrZXkgPSBrZXlFeHRyYWN0b3IoZWwpO1xuXG4gICAgdmFyIGlucHV0V3JpdGVyID0gb3B0aW9ucy5pbnB1dFdyaXRlcnMuZ2V0KHR5cGUpO1xuICAgIHZhciB2YWx1ZSA9IGZsYXR0ZW5lZERhdGFba2V5XTtcblxuICAgIGlucHV0V3JpdGVyKGVsLCB2YWx1ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBzZXJpYWxpemUsIGRlc2VyaWFsaXplIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20tZm9ybS1zZXJpYWxpemVyLm1qcy5tYXBcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFR5cGVSZWdpc3RyeSB7XG4gIGNvbnN0cnVjdG9yIChpbml0aWFsID0ge30pIHtcbiAgICB0aGlzLnJlZ2lzdGVyZWRUeXBlcyA9IGluaXRpYWxcbiAgfVxuXG4gIGdldCAodHlwZSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJlZFR5cGVzWydkZWZhdWx0J11cbiAgICB9XG4gIH1cblxuICByZWdpc3RlciAodHlwZSwgaXRlbSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5yZWdpc3RlcmVkVHlwZXNbdHlwZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyZWRUeXBlc1t0eXBlXSA9IGl0ZW1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlckRlZmF1bHQgKGl0ZW0pIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCdkZWZhdWx0JywgaXRlbSlcbiAgfVxufVxuIiwiaW1wb3J0IFR5cGVSZWdpc3RyeSBmcm9tICcuL1R5cGVSZWdpc3RyeSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5RXh0cmFjdG9ycyBleHRlbmRzIFR5cGVSZWdpc3RyeSB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLnJlZ2lzdGVyRGVmYXVsdChlbCA9PiAoZWwuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJycpKVxuICB9XG59XG4iLCJpbXBvcnQgVHlwZVJlZ2lzdHJ5IGZyb20gJy4vVHlwZVJlZ2lzdHJ5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dFJlYWRlcnMgZXh0ZW5kcyBUeXBlUmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHQoZWwgPT4gZWwudmFsdWUpXG4gICAgdGhpcy5yZWdpc3RlcignY2hlY2tib3gnLCBlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgIT09IG51bGwgPyAoZWwuY2hlY2tlZCA/IGVsLmdldEF0dHJpYnV0ZSgndmFsdWUnKSA6IG51bGwpIDogZWwuY2hlY2tlZClcbiAgICB0aGlzLnJlZ2lzdGVyKCdzZWxlY3QnLCBlbCA9PiBnZXRTZWxlY3RWYWx1ZShlbCkpXG4gIH1cbn1cblxuLyoqXG4gKiBSZWFkIHNlbGVjdCB2YWx1ZXNcbiAqXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvYXR0cmlidXRlcy92YWwuanN8R2l0aHVifVxuICogQHBhcmFtIHtvYmplY3R9IFNlbGVjdCBlbGVtZW50XG4gKiBAcmV0dXJuIHtzdHJpbmd8QXJyYXl9IFNlbGVjdCB2YWx1ZShzKVxuICovXG5mdW5jdGlvbiBnZXRTZWxlY3RWYWx1ZSAoZWxlbSkge1xuICB2YXIgdmFsdWUsIG9wdGlvbiwgaVxuICB2YXIgb3B0aW9ucyA9IGVsZW0ub3B0aW9uc1xuICB2YXIgaW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXhcbiAgdmFyIG9uZSA9IGVsZW0udHlwZSA9PT0gJ3NlbGVjdC1vbmUnXG4gIHZhciB2YWx1ZXMgPSBvbmUgPyBudWxsIDogW11cbiAgdmFyIG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoXG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGkgPSBtYXhcbiAgfSBlbHNlIHtcbiAgICBpID0gb25lID8gaW5kZXggOiAwXG4gIH1cblxuICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG4gIGZvciAoOyBpIDwgbWF4OyBpKyspIHtcbiAgICBvcHRpb24gPSBvcHRpb25zW2ldXG5cbiAgICAvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuICAgIC8vIElFOC05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXRcbiAgICBpZiAoKG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCkgJiZcblxuICAgICAgICAvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG4gICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcbiAgICAgICAgIShvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCAmJiBvcHRpb24ucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdvcHRncm91cCcpXG4gICAgKSB7XG4gICAgICAvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG4gICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZVxuXG4gICAgICAvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuICAgICAgaWYgKG9uZSkge1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgIH1cblxuICAgICAgLy8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcbiAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZXNcbn1cblxuIiwiaW1wb3J0IFR5cGVSZWdpc3RyeSBmcm9tICcuL1R5cGVSZWdpc3RyeSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5QXNzaWdubWVudFZhbGlkYXRvcnMgZXh0ZW5kcyBUeXBlUmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5yZWdpc3RlckRlZmF1bHQoKCkgPT4gdHJ1ZSlcbiAgICB0aGlzLnJlZ2lzdGVyKCdyYWRpbycsIChlbCkgPT4gZWwuY2hlY2tlZClcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ga2V5U3BsaXR0ZXIgKGtleSkge1xuICBsZXQgbWF0Y2hlcyA9IGtleS5tYXRjaCgvW15bXFxdXSsvZylcbiAgbGV0IGxhc3RLZXlcbiAgaWYgKGtleS5sZW5ndGggPiAxICYmIGtleS5pbmRleE9mKCdbXScpID09PSBrZXkubGVuZ3RoIC0gMikge1xuICAgIGxhc3RLZXkgPSBtYXRjaGVzLnBvcCgpXG4gICAgbWF0Y2hlcy5wdXNoKFtsYXN0S2V5XSlcbiAgfVxuICByZXR1cm4gbWF0Y2hlc1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RWxlbWVudFR5cGUgKGVsKSB7XG4gIGxldCB0eXBlQXR0clxuICBsZXQgdGFnTmFtZSA9IGVsLnRhZ05hbWVcbiAgbGV0IHR5cGUgPSB0YWdOYW1lXG4gIGlmICh0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICB0eXBlQXR0ciA9IGVsLmdldEF0dHJpYnV0ZSgndHlwZScpXG4gICAgaWYgKHR5cGVBdHRyKSB7XG4gICAgICB0eXBlID0gdHlwZUF0dHJcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9ICd0ZXh0J1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHlwZS50b0xvd2VyQ2FzZSgpXG59XG4iLCJpbXBvcnQgZ2V0RWxlbWVudFR5cGUgZnJvbSAnLi9nZXRFbGVtZW50VHlwZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SW5wdXRFbGVtZW50cyAoZWxlbWVudCwgb3B0aW9ucykge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKFxuICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsc2VsZWN0LHRleHRhcmVhJyksXG4gICAgKGVsKSA9PiB7XG4gICAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnICYmIChlbC50eXBlID09PSAnc3VibWl0JyB8fCBlbC50eXBlID09PSAncmVzZXQnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGxldCBteVR5cGUgPSBnZXRFbGVtZW50VHlwZShlbClcbiAgICAgIGxldCBleHRyYWN0b3IgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KG15VHlwZSlcbiAgICAgIGxldCBpZGVudGlmaWVyID0gZXh0cmFjdG9yKGVsKVxuICAgICAgbGV0IGZvdW5kSW5JbmNsdWRlID0gKG9wdGlvbnMuaW5jbHVkZSB8fCBbXSkuaW5kZXhPZihpZGVudGlmaWVyKSAhPT0gLTFcbiAgICAgIGxldCBmb3VuZEluRXhjbHVkZSA9IChvcHRpb25zLmV4Y2x1ZGUgfHwgW10pLmluZGV4T2YoaWRlbnRpZmllcikgIT09IC0xXG4gICAgICBsZXQgZm91bmRJbklnbm9yZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlamVjdCA9IGZhbHNlXG5cbiAgICAgIGlmIChvcHRpb25zLmlnbm9yZWRUeXBlcykge1xuICAgICAgICBmb3IgKGxldCBzZWxlY3RvciBvZiBvcHRpb25zLmlnbm9yZWRUeXBlcykge1xuICAgICAgICAgIGlmIChlbC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZm91bmRJbklnbm9yZWQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3VuZEluSW5jbHVkZSkge1xuICAgICAgICByZWplY3QgPSBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaW5jbHVkZSkge1xuICAgICAgICAgIHJlamVjdCA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QgPSAoZm91bmRJbkV4Y2x1ZGUgfHwgZm91bmRJbklnbm9yZWQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFyZWplY3RcbiAgICB9XG4gIClcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2lnbktleVZhbHVlIChvYmosIGtleWNoYWluLCB2YWx1ZSkge1xuICBpZiAoIWtleWNoYWluKSB7IHJldHVybiBvYmogfVxuXG4gIHZhciBrZXkgPSBrZXljaGFpbi5zaGlmdCgpXG5cbiAgLy8gYnVpbGQgdGhlIGN1cnJlbnQgb2JqZWN0IHdlIG5lZWQgdG8gc3RvcmUgZGF0YVxuICBpZiAoIW9ialtrZXldKSB7XG4gICAgb2JqW2tleV0gPSBBcnJheS5pc0FycmF5KGtleSkgPyBbXSA6IHt9XG4gIH1cblxuICAvLyBpZiBpdCdzIHRoZSBsYXN0IGtleSBpbiB0aGUgY2hhaW4sIGFzc2lnbiB0aGUgdmFsdWUgZGlyZWN0bHlcbiAgaWYgKGtleWNoYWluLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvYmpba2V5XSkpIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWVcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICBvYmpba2V5XS5wdXNoKHZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlY3Vyc2l2ZSBwYXJzaW5nIG9mIHRoZSBhcnJheSwgZGVwdGgtZmlyc3RcbiAgaWYgKGtleWNoYWluLmxlbmd0aCA+IDApIHtcbiAgICBhc3NpZ25LZXlWYWx1ZShvYmpba2V5XSwga2V5Y2hhaW4sIHZhbHVlKVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuIiwiaW1wb3J0IEtleUV4dHJhY3RvcnMgZnJvbSAnLi9LZXlFeHRyYWN0b3JzJ1xuaW1wb3J0IElucHV0UmVhZGVycyBmcm9tICcuL0lucHV0UmVhZGVycydcbmltcG9ydCBLZXlBc3NpZ25tZW50VmFsaWRhdG9ycyBmcm9tICcuL0tleUFzc2lnbm1lbnRWYWxpZGF0b3JzJ1xuaW1wb3J0IGRlZmF1bHRLZXlTcGxpdHRlciBmcm9tICcuL2tleVNwbGl0dGVyJ1xuaW1wb3J0IGdldElucHV0RWxlbWVudHMgZnJvbSAnLi9nZXRJbnB1dEVsZW1lbnRzJ1xuaW1wb3J0IGdldEVsZW1lbnRUeXBlIGZyb20gJy4vZ2V0RWxlbWVudFR5cGUnXG5pbXBvcnQgYXNzaWduS2V5VmFsdWUgZnJvbSAnLi9hc3NpZ25LZXlWYWx1ZSdcblxuLyoqXG4gKiBHZXQgYSBKU09OIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYWxsIG9mIHRoZSBmb3JtIGlucHV0cywgaW4gdGhpcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmlucHV0UmVhZGVyc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmtleUV4dHJhY3RvcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmtleVNwbGl0dGVyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLmluY2x1ZGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMuZXhjbHVkZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5pZ25vcmVkVHlwZXNcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VyaWFsaXplIChlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGRhdGEgPSB7fVxuICBvcHRpb25zLmtleVNwbGl0dGVyID0gb3B0aW9ucy5rZXlTcGxpdHRlciB8fCBkZWZhdWx0S2V5U3BsaXR0ZXJcbiAgb3B0aW9ucy5rZXlFeHRyYWN0b3JzID0gbmV3IEtleUV4dHJhY3RvcnMob3B0aW9ucy5rZXlFeHRyYWN0b3JzIHx8IHt9KVxuICBvcHRpb25zLmlucHV0UmVhZGVycyA9IG5ldyBJbnB1dFJlYWRlcnMob3B0aW9ucy5pbnB1dFJlYWRlcnMgfHwge30pXG4gIG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnMgPSBuZXcgS2V5QXNzaWdubWVudFZhbGlkYXRvcnMob3B0aW9ucy5rZXlBc3NpZ25tZW50VmFsaWRhdG9ycyB8fCB7fSlcblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKFxuICAgIGdldElucHV0RWxlbWVudHMoZWxlbWVudCwgb3B0aW9ucyksXG4gICAgKGVsKSA9PiB7XG4gICAgICBsZXQgdHlwZSA9IGdldEVsZW1lbnRUeXBlKGVsKVxuICAgICAgbGV0IGtleUV4dHJhY3RvciA9IG9wdGlvbnMua2V5RXh0cmFjdG9ycy5nZXQodHlwZSlcbiAgICAgIGxldCBrZXkgPSBrZXlFeHRyYWN0b3IoZWwpXG4gICAgICBsZXQgaW5wdXRSZWFkZXIgPSBvcHRpb25zLmlucHV0UmVhZGVycy5nZXQodHlwZSlcbiAgICAgIGxldCB2YWx1ZSA9IGlucHV0UmVhZGVyKGVsKVxuICAgICAgbGV0IHZhbGlkS2V5QXNzaWdubWVudCA9IG9wdGlvbnMua2V5QXNzaWdubWVudFZhbGlkYXRvcnMuZ2V0KHR5cGUpXG4gICAgICBpZiAodmFsaWRLZXlBc3NpZ25tZW50KGVsLCBrZXksIHZhbHVlKSkge1xuICAgICAgICBsZXQga2V5Y2hhaW4gPSBvcHRpb25zLmtleVNwbGl0dGVyKGtleSlcbiAgICAgICAgZGF0YSA9IGFzc2lnbktleVZhbHVlKGRhdGEsIGtleWNoYWluLCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIClcblxuICByZXR1cm4gZGF0YVxufVxuIiwiaW1wb3J0IFR5cGVSZWdpc3RyeSBmcm9tICcuL1R5cGVSZWdpc3RyeSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRXcml0ZXJzIGV4dGVuZHMgVHlwZVJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMucmVnaXN0ZXJEZWZhdWx0KChlbCwgdmFsdWUpID0+IHsgZWwudmFsdWUgPSB2YWx1ZSB9KVxuICAgIHRoaXMucmVnaXN0ZXIoJ2NoZWNrYm94JywgKGVsLCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGVsLmluZGV0ZXJtaW5hdGUgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5pbmRleE9mKGVsLnZhbHVlKSAhPT0gLTEgOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5yZWdpc3RlcigncmFkaW8nLCBmdW5jdGlvbiAoZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbC5jaGVja2VkID0gZWwudmFsdWUgPT09IHZhbHVlLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMucmVnaXN0ZXIoJ3NlbGVjdCcsIHNldFNlbGVjdFZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VBcnJheSAoYXJyKSB7XG4gIHZhciByZXQgPSBbXVxuICBpZiAoYXJyICE9PSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0LnB1c2guYXBwbHkocmV0LCBhcnIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldC5wdXNoKGFycilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIFdyaXRlIHNlbGVjdCB2YWx1ZXNcbiAqXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL21hc3Rlci9zcmMvYXR0cmlidXRlcy92YWwuanN8R2l0aHVifVxuICogQHBhcmFtIHtvYmplY3R9IFNlbGVjdCBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ3xhcnJheX0gU2VsZWN0IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHNldFNlbGVjdFZhbHVlIChlbGVtLCB2YWx1ZSkge1xuICB2YXIgb3B0aW9uU2V0LCBvcHRpb25cbiAgdmFyIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnNcbiAgdmFyIHZhbHVlcyA9IG1ha2VBcnJheSh2YWx1ZSlcbiAgdmFyIGkgPSBvcHRpb25zLmxlbmd0aFxuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcHRpb24gPSBvcHRpb25zWyBpIF1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICAgIGlmICh2YWx1ZXMuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTEpIHtcbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSlcbiAgICAgIG9wdGlvblNldCA9IHRydWVcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuICB9XG5cbiAgLy8gRm9yY2UgYnJvd3NlcnMgdG8gYmVoYXZlIGNvbnNpc3RlbnRseSB3aGVuIG5vbi1tYXRjaGluZyB2YWx1ZSBpcyBzZXRcbiAgaWYgKCFvcHRpb25TZXQpIHtcbiAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSAtMVxuICB9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGtleUpvaW5lciAocGFyZW50S2V5LCBjaGlsZEtleSkge1xuICByZXR1cm4gcGFyZW50S2V5ICsgJ1snICsgY2hpbGRLZXkgKyAnXSdcbn1cbiIsImltcG9ydCBkZWZhdWx0S2V5Sm9pbmVyIGZyb20gJy4va2V5Sm9pbmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmbGF0dGVuRGF0YSAoZGF0YSwgcGFyZW50S2V5LCBvcHRpb25zID0ge30pIHtcbiAgbGV0IGZsYXREYXRhID0ge31cbiAgbGV0IGtleUpvaW5lciA9IG9wdGlvbnMua2V5Sm9pbmVyIHx8IGRlZmF1bHRLZXlKb2luZXJcblxuICBmb3IgKGxldCBrZXlOYW1lIGluIGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkoa2V5TmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgbGV0IHZhbHVlID0gZGF0YVtrZXlOYW1lXVxuICAgIGxldCBoYXNoID0ge31cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGtleSwgam9pbiBpdCB3aXRoXG4gICAgLy8gdGhlIGN1cnJlbnQsIGNoaWxkIGtleS5cbiAgICBpZiAocGFyZW50S2V5KSB7XG4gICAgICBrZXlOYW1lID0ga2V5Sm9pbmVyKHBhcmVudEtleSwga2V5TmFtZSlcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGhhc2hba2V5TmFtZSArICdbXSddID0gdmFsdWVcbiAgICAgIGhhc2hba2V5TmFtZV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaGFzaCA9IGZsYXR0ZW5EYXRhKHZhbHVlLCBrZXlOYW1lLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoW2tleU5hbWVdID0gdmFsdWVcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKGZsYXREYXRhLCBoYXNoKVxuICB9XG5cbiAgcmV0dXJuIGZsYXREYXRhXG59XG4iLCJpbXBvcnQgS2V5RXh0cmFjdG9ycyBmcm9tICcuL0tleUV4dHJhY3RvcnMnXG5pbXBvcnQgSW5wdXRXcml0ZXJzIGZyb20gJy4vSW5wdXRXcml0ZXJzJ1xuaW1wb3J0IGZsYXR0ZW5EYXRhIGZyb20gJy4vZmxhdHRlbkRhdGEnXG5pbXBvcnQgZ2V0SW5wdXRFbGVtZW50cyBmcm9tICcuL2dldElucHV0RWxlbWVudHMnXG5pbXBvcnQgZ2V0RWxlbWVudFR5cGUgZnJvbSAnLi9nZXRFbGVtZW50VHlwZSdcblxuLyoqXG4gKiBVc2UgdGhlIGdpdmVuIEpTT04gb2JqZWN0IHRvIHBvcHVsYXRlIGFsbCBvZiB0aGUgZm9ybSBpbnB1dHMsIGluIHRoaXMgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBSb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5pbnB1dFdyaXRlcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmtleUV4dHJhY3RvcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmtleVNwbGl0dGVyXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLmluY2x1ZGVcbiAqIEBwYXJhbSB7c3RyaW5nW119IG9wdGlvbnMuZXhjbHVkZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5pZ25vcmVkVHlwZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVzZXJpYWxpemUgKGZvcm0sIGRhdGEsIG9wdGlvbnMgPSB7fSkge1xuICBsZXQgZmxhdHRlbmVkRGF0YSA9IGZsYXR0ZW5EYXRhKGRhdGEsIG51bGwsIG9wdGlvbnMpXG4gIG9wdGlvbnMua2V5RXh0cmFjdG9ycyA9IG5ldyBLZXlFeHRyYWN0b3JzKG9wdGlvbnMua2V5RXh0cmFjdG9ycyB8fCB7fSlcbiAgb3B0aW9ucy5pbnB1dFdyaXRlcnMgPSBuZXcgSW5wdXRXcml0ZXJzKG9wdGlvbnMuaW5wdXRXcml0ZXJzIHx8IHt9KVxuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoXG4gICAgZ2V0SW5wdXRFbGVtZW50cyhmb3JtLCBvcHRpb25zKSxcbiAgICAoZWwpID0+IHtcbiAgICAgIGxldCB0eXBlID0gZ2V0RWxlbWVudFR5cGUoZWwpXG5cbiAgICAgIGxldCBrZXlFeHRyYWN0b3IgPSBvcHRpb25zLmtleUV4dHJhY3RvcnMuZ2V0KHR5cGUpXG4gICAgICBsZXQga2V5ID0ga2V5RXh0cmFjdG9yKGVsKVxuXG4gICAgICBsZXQgaW5wdXRXcml0ZXIgPSBvcHRpb25zLmlucHV0V3JpdGVycy5nZXQodHlwZSlcbiAgICAgIGxldCB2YWx1ZSA9IGZsYXR0ZW5lZERhdGFba2V5XVxuXG4gICAgICBpbnB1dFdyaXRlcihlbCwgdmFsdWUpXG4gICAgfVxuICApXG59XG5cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxMyBQaWVyb3h5IDxwaWVyb3h5QHBpZXJveHkubmV0PlxuLy8gVGhpcyB3b3JrIGlzIGZyZWUuIFlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXRcbi8vIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgV1RGUEwsIFZlcnNpb24gMlxuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIExJQ0VOU0UudHh0IG9yIGh0dHA6Ly93d3cud3RmcGwubmV0L1xuLy9cbi8vIEZvciBtb3JlIGluZm9ybWF0aW9uLCB0aGUgaG9tZSBwYWdlOlxuLy8gaHR0cDovL3BpZXJveHkubmV0L2Jsb2cvcGFnZXMvbHotc3RyaW5nL3Rlc3RpbmcuaHRtbFxuLy9cbi8vIExaLWJhc2VkIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgdmVyc2lvbiAxLjQuNVxudmFyIExaU3RyaW5nID0gKGZ1bmN0aW9uKCkge1xuXG4vLyBwcml2YXRlIHByb3BlcnR5XG52YXIgZiA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIga2V5U3RyQmFzZTY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO1xudmFyIGtleVN0clVyaVNhZmUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky0kXCI7XG52YXIgYmFzZVJldmVyc2VEaWMgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QmFzZVZhbHVlKGFscGhhYmV0LCBjaGFyYWN0ZXIpIHtcbiAgaWYgKCFiYXNlUmV2ZXJzZURpY1thbHBoYWJldF0pIHtcbiAgICBiYXNlUmV2ZXJzZURpY1thbHBoYWJldF0gPSB7fTtcbiAgICBmb3IgKHZhciBpPTAgOyBpPGFscGhhYmV0Lmxlbmd0aCA7IGkrKykge1xuICAgICAgYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdW2FscGhhYmV0LmNoYXJBdChpKV0gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdW2NoYXJhY3Rlcl07XG59XG5cbnZhciBMWlN0cmluZyA9IHtcbiAgY29tcHJlc3NUb0Jhc2U2NCA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgcmVzID0gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCA2LCBmdW5jdGlvbihhKXtyZXR1cm4ga2V5U3RyQmFzZTY0LmNoYXJBdChhKTt9KTtcbiAgICBzd2l0Y2ggKHJlcy5sZW5ndGggJSA0KSB7IC8vIFRvIHByb2R1Y2UgdmFsaWQgQmFzZTY0XG4gICAgZGVmYXVsdDogLy8gV2hlbiBjb3VsZCB0aGlzIGhhcHBlbiA/XG4gICAgY2FzZSAwIDogcmV0dXJuIHJlcztcbiAgICBjYXNlIDEgOiByZXR1cm4gcmVzK1wiPT09XCI7XG4gICAgY2FzZSAyIDogcmV0dXJuIHJlcytcIj09XCI7XG4gICAgY2FzZSAzIDogcmV0dXJuIHJlcytcIj1cIjtcbiAgICB9XG4gIH0sXG5cbiAgZGVjb21wcmVzc0Zyb21CYXNlNjQgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGlucHV0ID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhpbnB1dC5sZW5ndGgsIDMyLCBmdW5jdGlvbihpbmRleCkgeyByZXR1cm4gZ2V0QmFzZVZhbHVlKGtleVN0ckJhc2U2NCwgaW5wdXQuY2hhckF0KGluZGV4KSk7IH0pO1xuICB9LFxuXG4gIGNvbXByZXNzVG9VVEYxNiA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCAxNSwgZnVuY3Rpb24oYSl7cmV0dXJuIGYoYSszMik7fSkgKyBcIiBcIjtcbiAgfSxcblxuICBkZWNvbXByZXNzRnJvbVVURjE2OiBmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIGlmIChjb21wcmVzc2VkID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhjb21wcmVzc2VkLmxlbmd0aCwgMTYzODQsIGZ1bmN0aW9uKGluZGV4KSB7IHJldHVybiBjb21wcmVzc2VkLmNoYXJDb2RlQXQoaW5kZXgpIC0gMzI7IH0pO1xuICB9LFxuXG4gIC8vY29tcHJlc3MgaW50byB1aW50OGFycmF5IChVQ1MtMiBiaWcgZW5kaWFuIGZvcm1hdClcbiAgY29tcHJlc3NUb1VpbnQ4QXJyYXk6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQpIHtcbiAgICB2YXIgY29tcHJlc3NlZCA9IExaU3RyaW5nLmNvbXByZXNzKHVuY29tcHJlc3NlZCk7XG4gICAgdmFyIGJ1Zj1uZXcgVWludDhBcnJheShjb21wcmVzc2VkLmxlbmd0aCoyKTsgLy8gMiBieXRlcyBwZXIgY2hhcmFjdGVyXG5cbiAgICBmb3IgKHZhciBpPTAsIFRvdGFsTGVuPWNvbXByZXNzZWQubGVuZ3RoOyBpPFRvdGFsTGVuOyBpKyspIHtcbiAgICAgIHZhciBjdXJyZW50X3ZhbHVlID0gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgYnVmW2kqMl0gPSBjdXJyZW50X3ZhbHVlID4+PiA4O1xuICAgICAgYnVmW2kqMisxXSA9IGN1cnJlbnRfdmFsdWUgJSAyNTY7XG4gICAgfVxuICAgIHJldHVybiBidWY7XG4gIH0sXG5cbiAgLy9kZWNvbXByZXNzIGZyb20gdWludDhhcnJheSAoVUNTLTIgYmlnIGVuZGlhbiBmb3JtYXQpXG4gIGRlY29tcHJlc3NGcm9tVWludDhBcnJheTpmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkPT09bnVsbCB8fCBjb21wcmVzc2VkPT09dW5kZWZpbmVkKXtcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MoY29tcHJlc3NlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGJ1Zj1uZXcgQXJyYXkoY29tcHJlc3NlZC5sZW5ndGgvMik7IC8vIDIgYnl0ZXMgcGVyIGNoYXJhY3RlclxuICAgICAgICBmb3IgKHZhciBpPTAsIFRvdGFsTGVuPWJ1Zi5sZW5ndGg7IGk8VG90YWxMZW47IGkrKykge1xuICAgICAgICAgIGJ1ZltpXT1jb21wcmVzc2VkW2kqMl0qMjU2K2NvbXByZXNzZWRbaSoyKzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBidWYuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGYoYykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MocmVzdWx0LmpvaW4oJycpKTtcblxuICAgIH1cblxuICB9LFxuXG5cbiAgLy9jb21wcmVzcyBpbnRvIGEgc3RyaW5nIHRoYXQgaXMgYWxyZWFkeSBVUkkgZW5jb2RlZFxuICBjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKGlucHV0ID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIHJldHVybiBMWlN0cmluZy5fY29tcHJlc3MoaW5wdXQsIDYsIGZ1bmN0aW9uKGEpe3JldHVybiBrZXlTdHJVcmlTYWZlLmNoYXJBdChhKTt9KTtcbiAgfSxcblxuICAvL2RlY29tcHJlc3MgZnJvbSBhbiBvdXRwdXQgb2YgY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnRcbiAgZGVjb21wcmVzc0Zyb21FbmNvZGVkVVJJQ29tcG9uZW50OmZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICBpZiAoaW5wdXQgPT0gXCJcIikgcmV0dXJuIG51bGw7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC8gL2csIFwiK1wiKTtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoaW5wdXQubGVuZ3RoLCAzMiwgZnVuY3Rpb24oaW5kZXgpIHsgcmV0dXJuIGdldEJhc2VWYWx1ZShrZXlTdHJVcmlTYWZlLCBpbnB1dC5jaGFyQXQoaW5kZXgpKTsgfSk7XG4gIH0sXG5cbiAgY29tcHJlc3M6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQpIHtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2NvbXByZXNzKHVuY29tcHJlc3NlZCwgMTYsIGZ1bmN0aW9uKGEpe3JldHVybiBmKGEpO30pO1xuICB9LFxuICBfY29tcHJlc3M6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQsIGJpdHNQZXJDaGFyLCBnZXRDaGFyRnJvbUludCkge1xuICAgIGlmICh1bmNvbXByZXNzZWQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGksIHZhbHVlLFxuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnk9IHt9LFxuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZT0ge30sXG4gICAgICAgIGNvbnRleHRfYz1cIlwiLFxuICAgICAgICBjb250ZXh0X3djPVwiXCIsXG4gICAgICAgIGNvbnRleHRfdz1cIlwiLFxuICAgICAgICBjb250ZXh0X2VubGFyZ2VJbj0gMiwgLy8gQ29tcGVuc2F0ZSBmb3IgdGhlIGZpcnN0IGVudHJ5IHdoaWNoIHNob3VsZCBub3QgY291bnRcbiAgICAgICAgY29udGV4dF9kaWN0U2l6ZT0gMyxcbiAgICAgICAgY29udGV4dF9udW1CaXRzPSAyLFxuICAgICAgICBjb250ZXh0X2RhdGE9W10sXG4gICAgICAgIGNvbnRleHRfZGF0YV92YWw9MCxcbiAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uPTAsXG4gICAgICAgIGlpO1xuXG4gICAgZm9yIChpaSA9IDA7IGlpIDwgdW5jb21wcmVzc2VkLmxlbmd0aDsgaWkgKz0gMSkge1xuICAgICAgY29udGV4dF9jID0gdW5jb21wcmVzc2VkLmNoYXJBdChpaSk7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnksY29udGV4dF9jKSkge1xuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF9jXSA9IGNvbnRleHRfZGljdFNpemUrKztcbiAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGVbY29udGV4dF9jXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHRfd2MgPSBjb250ZXh0X3cgKyBjb250ZXh0X2M7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeSxjb250ZXh0X3djKSkge1xuICAgICAgICBjb250ZXh0X3cgPSBjb250ZXh0X3djO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSxjb250ZXh0X3cpKSB7XG4gICAgICAgICAgaWYgKGNvbnRleHRfdy5jaGFyQ29kZUF0KDApPDI1Nikge1xuICAgICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSk7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgZm9yIChpPTAgOyBpPDggOyBpKyspIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgdmFsdWU7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT1iaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIGZvciAoaT0wIDsgaTwxNiA7IGkrKykge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSkgfCAodmFsdWUmMSk7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgICAgICBpZiAoY29udGV4dF9lbmxhcmdlSW4gPT0gMCkge1xuICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZVtjb250ZXh0X3ddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd107XG4gICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRfZW5sYXJnZUluLS07XG4gICAgICAgIGlmIChjb250ZXh0X2VubGFyZ2VJbiA9PSAwKSB7XG4gICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB3YyB0byB0aGUgZGljdGlvbmFyeS5cbiAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd2NdID0gY29udGV4dF9kaWN0U2l6ZSsrO1xuICAgICAgICBjb250ZXh0X3cgPSBTdHJpbmcoY29udGV4dF9jKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdXRwdXQgdGhlIGNvZGUgZm9yIHcuXG4gICAgaWYgKGNvbnRleHRfdyAhPT0gXCJcIikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSxjb250ZXh0X3cpKSB7XG4gICAgICAgIGlmIChjb250ZXh0X3cuY2hhckNvZGVBdCgwKTwyNTYpIHtcbiAgICAgICAgICBmb3IgKGk9MCA7IGk8Y29udGV4dF9udW1CaXRzIDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgIGZvciAoaT0wIDsgaTw4IDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSkgfCAodmFsdWUmMSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA+PiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgdmFsdWU7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgIGZvciAoaT0wIDsgaTwxNiA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgICAgaWYgKGNvbnRleHRfZW5sYXJnZUluID09IDApIHtcbiAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbiA9IE1hdGgucG93KDIsIGNvbnRleHRfbnVtQml0cyk7XG4gICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlW2NvbnRleHRfd107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3ddO1xuICAgICAgICBmb3IgKGk9MCA7IGk8Y29udGV4dF9udW1CaXRzIDsgaSsrKSB7XG4gICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSA+PiAxO1xuICAgICAgICB9XG5cblxuICAgICAgfVxuICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgIGlmIChjb250ZXh0X2VubGFyZ2VJbiA9PSAwKSB7XG4gICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcbiAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFyayB0aGUgZW5kIG9mIHRoZSBzdHJlYW1cbiAgICB2YWx1ZSA9IDI7XG4gICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICB9XG5cbiAgICAvLyBGbHVzaCB0aGUgbGFzdCBjaGFyXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKTtcbiAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHRfZGF0YS5qb2luKCcnKTtcbiAgfSxcblxuICBkZWNvbXByZXNzOiBmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIGlmIChjb21wcmVzc2VkID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhjb21wcmVzc2VkLmxlbmd0aCwgMzI3NjgsIGZ1bmN0aW9uKGluZGV4KSB7IHJldHVybiBjb21wcmVzc2VkLmNoYXJDb2RlQXQoaW5kZXgpOyB9KTtcbiAgfSxcblxuICBfZGVjb21wcmVzczogZnVuY3Rpb24gKGxlbmd0aCwgcmVzZXRWYWx1ZSwgZ2V0TmV4dFZhbHVlKSB7XG4gICAgdmFyIGRpY3Rpb25hcnkgPSBbXSxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgZW5sYXJnZUluID0gNCxcbiAgICAgICAgZGljdFNpemUgPSA0LFxuICAgICAgICBudW1CaXRzID0gMyxcbiAgICAgICAgZW50cnkgPSBcIlwiLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgaSxcbiAgICAgICAgdyxcbiAgICAgICAgYml0cywgcmVzYiwgbWF4cG93ZXIsIHBvd2VyLFxuICAgICAgICBjLFxuICAgICAgICBkYXRhID0ge3ZhbDpnZXROZXh0VmFsdWUoMCksIHBvc2l0aW9uOnJlc2V0VmFsdWUsIGluZGV4OjF9O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDM7IGkgKz0gMSkge1xuICAgICAgZGljdGlvbmFyeVtpXSA9IGk7XG4gICAgfVxuXG4gICAgYml0cyA9IDA7XG4gICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDIpO1xuICAgIHBvd2VyPTE7XG4gICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgfVxuICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICBwb3dlciA8PD0gMTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG5leHQgPSBiaXRzKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDgpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIGMgPSBmKGJpdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsMTYpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIGMgPSBmKGJpdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGRpY3Rpb25hcnlbM10gPSBjO1xuICAgIHcgPSBjO1xuICAgIHJlc3VsdC5wdXNoKGMpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoZGF0YS5pbmRleCA+IGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cblxuICAgICAgYml0cyA9IDA7XG4gICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsbnVtQml0cyk7XG4gICAgICBwb3dlcj0xO1xuICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICByZXNiID0gZGF0YS52YWwgJiBkYXRhLnBvc2l0aW9uO1xuICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgfVxuICAgICAgICBiaXRzIHw9IChyZXNiPjAgPyAxIDogMCkgKiBwb3dlcjtcbiAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoYyA9IGJpdHMpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiw4KTtcbiAgICAgICAgICBwb3dlcj0xO1xuICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcbiAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcbiAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgYyA9IGRpY3RTaXplLTE7XG4gICAgICAgICAgZW5sYXJnZUluLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsMTYpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgYyA9IGRpY3RTaXplLTE7XG4gICAgICAgICAgZW5sYXJnZUluLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5sYXJnZUluID09IDApIHtcbiAgICAgICAgZW5sYXJnZUluID0gTWF0aC5wb3coMiwgbnVtQml0cyk7XG4gICAgICAgIG51bUJpdHMrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpY3Rpb25hcnlbY10pIHtcbiAgICAgICAgZW50cnkgPSBkaWN0aW9uYXJ5W2NdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IGRpY3RTaXplKSB7XG4gICAgICAgICAgZW50cnkgPSB3ICsgdy5jaGFyQXQoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKGVudHJ5KTtcblxuICAgICAgLy8gQWRkIHcrZW50cnlbMF0gdG8gdGhlIGRpY3Rpb25hcnkuXG4gICAgICBkaWN0aW9uYXJ5W2RpY3RTaXplKytdID0gdyArIGVudHJ5LmNoYXJBdCgwKTtcbiAgICAgIGVubGFyZ2VJbi0tO1xuXG4gICAgICB3ID0gZW50cnk7XG5cbiAgICAgIGlmIChlbmxhcmdlSW4gPT0gMCkge1xuICAgICAgICBlbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBudW1CaXRzKTtcbiAgICAgICAgbnVtQml0cysrO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG59O1xuICByZXR1cm4gTFpTdHJpbmc7XG59KSgpO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBMWlN0cmluZzsgfSk7XG59IGVsc2UgaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZSAhPSBudWxsICkge1xuICBtb2R1bGUuZXhwb3J0cyA9IExaU3RyaW5nXG59IGVsc2UgaWYoIHR5cGVvZiBhbmd1bGFyICE9PSAndW5kZWZpbmVkJyAmJiBhbmd1bGFyICE9IG51bGwgKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdMWlN0cmluZycsIFtdKVxuICAuZmFjdG9yeSgnTFpTdHJpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIExaU3RyaW5nO1xuICB9KTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vb24tY29udGV4dC1pbnZhbGlkYXRlZC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29uLWV4dGVuc2lvbi1zdGFydC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29uZS1ldmVudC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2FkZC1saXN0ZW5lci5qcyc7XG4iLCJjbGFzcyBPbkNvbnRleHRJbnZhbGlkYXRlZCB7XG4gICAgI3RpbWVyO1xuICAgICNjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIC8vIENhbGxpbmcgdGhpcyB3aWxsIHN0YXJ0IHRoZSBwb2xsaW5nXG4gICAgZ2V0IHNpZ25hbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuI3RpbWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4jY29udHJvbGxlci5zaWduYWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2FzQ29udGV4dEludmFsaWRhdGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNjb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLiN0aW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMCk7XG4gICAgICAgIHJldHVybiB0aGlzLiNjb250cm9sbGVyLnNpZ25hbDtcbiAgICB9XG4gICAgZ2V0IHByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIocmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAgICAgICAgIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGNvbnRleHQgaXMgaW52YWxpZGF0ZWRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5zaWduYWwgICBUaGUgc2lnbmFsIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIsIGxpa2Ugd2l0aCB0aGUgcmVndWxhciBgYWRkRXZlbnRMaXN0ZW5lcigpYFxuICAgICAqL1xuICAgIGFkZExpc3RlbmVyKGNhbGxiYWNrLCB7IHNpZ25hbCB9ID0ge30pIHtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmFsLmFib3J0ZWQgJiYgIXNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBjYWxsYmFjaywgeyBvbmNlOiB0cnVlLCBzaWduYWwgfSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IG9uQ29udGV4dEludmFsaWRhdGVkID0gbmV3IE9uQ29udGV4dEludmFsaWRhdGVkKCk7XG5leHBvcnQgY29uc3Qgd2FzQ29udGV4dEludmFsaWRhdGVkID0gKCkgPT4gIWNocm9tZS5ydW50aW1lPy5pZDtcbi8vIFRoaXMgaXMgZG9uZSB0byBlbnN1cmUgZWFjaCBsaXN0ZW5lciBhbmQgYWJvcnRzaWduYWwgYXJlIGluZGVwZW5kZW50IGluIGVhY2ggdGVzdFxuZXhwb3J0IGNvbnN0IF90ZXN0aW5nID0gT25Db250ZXh0SW52YWxpZGF0ZWQ7XG4iLCJpbXBvcnQgeyBpc0Nocm9tZSwgaXNQZXJzaXN0ZW50QmFja2dyb3VuZFBhZ2UgfSBmcm9tICd3ZWJleHQtZGV0ZWN0JztcbmNvbnN0IHN0b3JhZ2VLZXkgPSAnX193ZWJleHQtZXZlbnRzX19zdGFydHVwJztcbmNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG5sZXQgaGFzUnVuID0gZmFsc2U7XG5sZXQgaGFzTGlzdGVuZXJzID0gZmFsc2U7XG4vLyBAdHMtZXhwZWN0LWVycm9yIE5vIG5lZWQgdG8gbG9hZCBgYnJvd3NlcmAgdHlwZXMgeWV0XG5jb25zdCBicm93c2VyU3RvcmFnZSA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8uc3RvcmFnZSA/PyBnbG9iYWxUaGlzLmNocm9tZT8uc3RvcmFnZTtcbmFzeW5jIGZ1bmN0aW9uIHJ1bm5lcigpIHtcbiAgICBoYXNSdW4gPSB0cnVlO1xuICAgIGlmICghaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzUGVyc2lzdGVudEJhY2tncm91bmRQYWdlKCkpIHtcbiAgICAgICAgLy8gSXQncyBjZXJ0YWlubHkgdGhlIGZpcnN0IGFuZCBvbmx5IHRpbWVcbiAgICAgICAgZXZlbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2V4dGVuc2lvbi1zdGFydCcpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWJyb3dzZXJTdG9yYWdlPy5zZXNzaW9uKSB7XG4gICAgICAgIGlmIChpc0Nocm9tZSgpICYmIGNocm9tZS5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdvbkV4dGVuc2lvblN0YXJ0IGlzIHVuYWJsZSB0byBkZXRlcm1pbmUgd2hldGhlciBpdOKAmXMgYmVpbmcgcnVuIGZvciB0aGUgZmlyc3QgdGltZSBvbiBNVjIgRXZlbnQgUGFnZXMgaW4gQ2hyb21lLiBJdCB3aWxsIHJ1biB0aGUgbGlzdGVuZXJzIGFueXdheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignb25FeHRlbnNpb25TdGFydCBpcyB1bmFibGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgaXTigJlzIGJlaW5nIHJ1biBmb3IgdGhlIGZpcnN0IHRpbWUgd2l0aG91dCB0aGUgYHN0b3JhZ2VgIHBlcm1pc3Npb24uIEl0IHdpbGwgcnVuIHRoZSBsaXN0ZW5lcnMgYW55d2F5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2V4dGVuc2lvbi1zdGFydCcpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdG9yYWdlID0gYXdhaXQgYnJvd3NlclN0b3JhZ2Uuc2Vzc2lvbi5nZXQoc3RvcmFnZUtleSk7XG4gICAgaWYgKHN0b3JhZ2VLZXkgaW4gc3RvcmFnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGJyb3dzZXJTdG9yYWdlLnNlc3Npb24uc2V0KHsgW3N0b3JhZ2VLZXldOiB0cnVlIH0pO1xuICAgIGV2ZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdleHRlbnNpb24tc3RhcnQnKSk7XG59XG5leHBvcnQgY29uc3Qgb25FeHRlbnNpb25TdGFydCA9IE9iamVjdC5mcmVlemUoe1xuICAgIGFkZExpc3RlbmVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChoYXNSdW4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignb25FeHRlbnNpb25TdGFydC5hZGRMaXN0ZW5lcigpIHdhcyBjYWxsZWQgYWZ0ZXIgdGhlIGV4dGVuc2lvbiBzdGFydGVkLiBUaGUgY2FsbGJhY2sgd2lsbCBub3QgYmUgY2FsbGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFzTGlzdGVuZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgIGV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2V4dGVuc2lvbi1zdGFydCcsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICAgICAgZXZlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXh0ZW5zaW9uLXN0YXJ0JywgY2FsbGJhY2spO1xuICAgIH0sXG59KTtcbi8vIEF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgdGhlIHJ1bm5lclxuc2V0VGltZW91dChydW5uZXIsIDIpO1xuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uZUV2ZW50KGV2ZW50LCB7IGZpbHRlciwgc2lnbmFsLCB9ID0ge30pIHtcbiAgICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAvLyBUT0RPOiBWb2lkRnVuY3Rpb24gc2hvdWxkIG5vdCBiZSBuZWNlc3NhcnksIGl0J3MgZXF1aXZhbGVudCB0byB1c2luZyBcImFueVwiXG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKC4uLnBhcmFtZXRlcnMpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlciguLi5wYXJhbWV0ZXJzKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgZXZlbnQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgIC8vIFRPRE86IFRoZSBhYm9ydCBsaXN0ZW5lciBpcyBsZWZ0IGJlaGluZCBpZiBuZXZlciBhYm9ydGVkXG4gICAgICAgIHNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgeyBzaWduYWwsIH0pIHtcbiAgICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQuYWRkTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHtcbiAgICAgICAgZXZlbnQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcbn1cbiIsImltcG9ydCB7IHN0cmluZ1RvQmFzZTY0IH0gZnJvbSAndWludDhhcnJheS1leHRyYXMnO1xuY29uc3QgZmlsZVBpY2tlck9wdGlvbnMgPSB7XG4gICAgdHlwZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgYWNjZXB0OiB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJzogJy5qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgXSxcbn07XG5jb25zdCBpc01vZGVybiA9IHR5cGVvZiBzaG93T3BlbkZpbGVQaWNrZXIgPT09ICdmdW5jdGlvbic7XG5hc3luYyBmdW5jdGlvbiBsb2FkRmlsZU9sZCgpIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgICBpbnB1dC5hY2NlcHQgPSAnLmpzb24nO1xuICAgIGNvbnN0IGV2ZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCByZXNvbHZlLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfSk7XG4gICAgaW5wdXQuY2xpY2soKTtcbiAgICBjb25zdCBldmVudCA9IGF3YWl0IGV2ZW50UHJvbWlzZTtcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGZpbGUgc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGUudGV4dCgpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2F2ZUZpbGVPbGQodGV4dCwgc3VnZ2VzdGVkTmFtZSkge1xuICAgIC8vIFVzZSBkYXRhIFVSTCBiZWNhdXNlIFNhZmFyaSBkb2Vzbid0IHN1cHBvcnQgc2F2aW5nIGJsb2IgVVJMc1xuICAgIC8vIFVzZSBiYXNlNjQgb3IgZWxzZSBsaW5lYnJlYWtzIGFyZSBsb3N0XG4gICAgY29uc3QgdXJsID0gYGRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJHtzdHJpbmdUb0Jhc2U2NCh0ZXh0KX1gO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5kb3dubG9hZCA9IHN1Z2dlc3RlZE5hbWU7XG4gICAgbGluay5ocmVmID0gdXJsO1xuICAgIGxpbmsuY2xpY2soKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGxvYWRGaWxlTW9kZXJuKCkge1xuICAgIGNvbnN0IFtmaWxlSGFuZGxlXSA9IGF3YWl0IHNob3dPcGVuRmlsZVBpY2tlcihmaWxlUGlja2VyT3B0aW9ucyk7XG4gICAgY29uc3QgZmlsZSA9IGF3YWl0IGZpbGVIYW5kbGUuZ2V0RmlsZSgpO1xuICAgIHJldHVybiBmaWxlLnRleHQoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNhdmVGaWxlTW9kZXJuKHRleHQsIHN1Z2dlc3RlZE5hbWUpIHtcbiAgICBjb25zdCBmaWxlSGFuZGxlID0gYXdhaXQgc2hvd1NhdmVGaWxlUGlja2VyKHtcbiAgICAgICAgLi4uZmlsZVBpY2tlck9wdGlvbnMsXG4gICAgICAgIHN1Z2dlc3RlZE5hbWUsXG4gICAgfSk7XG4gICAgY29uc3Qgd3JpdGFibGUgPSBhd2FpdCBmaWxlSGFuZGxlLmNyZWF0ZVdyaXRhYmxlKCk7XG4gICAgYXdhaXQgd3JpdGFibGUud3JpdGUodGV4dCk7XG4gICAgYXdhaXQgd3JpdGFibGUuY2xvc2UoKTtcbn1cbmV4cG9ydCBjb25zdCBsb2FkRmlsZSA9IGlzTW9kZXJuID8gbG9hZEZpbGVNb2Rlcm4gOiBsb2FkRmlsZU9sZDtcbmV4cG9ydCBjb25zdCBzYXZlRmlsZSA9IGlzTW9kZXJuID8gc2F2ZUZpbGVNb2Rlcm4gOiBzYXZlRmlsZU9sZDtcbiIsImNvbnN0IG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHVpbnQ4QXJyYXlTdHJpbmdpZmllZCA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJztcbmNvbnN0IGFycmF5QnVmZmVyU3RyaW5naWZpZWQgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xuXG5mdW5jdGlvbiBpc1R5cGUodmFsdWUsIHR5cGVDb25zdHJ1Y3RvciwgdHlwZVN0cmluZ2lmaWVkKSB7XG5cdGlmICghdmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAodmFsdWUuY29uc3RydWN0b3IgPT09IHR5cGVDb25zdHJ1Y3Rvcikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09PSB0eXBlU3RyaW5naWZpZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VpbnQ4QXJyYXkodmFsdWUpIHtcblx0cmV0dXJuIGlzVHlwZSh2YWx1ZSwgVWludDhBcnJheSwgdWludDhBcnJheVN0cmluZ2lmaWVkKTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZSkge1xuXHRyZXR1cm4gaXNUeXBlKHZhbHVlLCBBcnJheUJ1ZmZlciwgYXJyYXlCdWZmZXJTdHJpbmdpZmllZCk7XG59XG5cbmZ1bmN0aW9uIGlzVWludDhBcnJheU9yQXJyYXlCdWZmZXIodmFsdWUpIHtcblx0cmV0dXJuIGlzVWludDhBcnJheSh2YWx1ZSkgfHwgaXNBcnJheUJ1ZmZlcih2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRVaW50OEFycmF5KHZhbHVlKSB7XG5cdGlmICghaXNVaW50OEFycmF5KHZhbHVlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYFVpbnQ4QXJyYXlcXGAsIGdvdCBcXGAke3R5cGVvZiB2YWx1ZX1cXGBgKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0VWludDhBcnJheU9yQXJyYXlCdWZmZXIodmFsdWUpIHtcblx0aWYgKCFpc1VpbnQ4QXJyYXlPckFycmF5QnVmZmVyKHZhbHVlKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYFVpbnQ4QXJyYXlcXGAgb3IgXFxgQXJyYXlCdWZmZXJcXGAsIGdvdCBcXGAke3R5cGVvZiB2YWx1ZX1cXGBgKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9VaW50OEFycmF5KHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG5cdFx0cmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbHVlKTtcblx0fVxuXG5cdGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKSB7XG5cdFx0cmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbHVlLmJ1ZmZlciwgdmFsdWUuYnl0ZU9mZnNldCwgdmFsdWUuYnl0ZUxlbmd0aCk7XG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB2YWx1ZSwgZ290IFxcYCR7dHlwZW9mIHZhbHVlfVxcYC5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdFVpbnQ4QXJyYXlzKGFycmF5cywgdG90YWxMZW5ndGgpIHtcblx0aWYgKGFycmF5cy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7XG5cdH1cblxuXHR0b3RhbExlbmd0aCA/Pz0gYXJyYXlzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4gYWNjdW11bGF0b3IgKyBjdXJyZW50VmFsdWUubGVuZ3RoLCAwKTtcblxuXHRjb25zdCByZXR1cm5WYWx1ZSA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcblxuXHRsZXQgb2Zmc2V0ID0gMDtcblx0Zm9yIChjb25zdCBhcnJheSBvZiBhcnJheXMpIHtcblx0XHRhc3NlcnRVaW50OEFycmF5KGFycmF5KTtcblx0XHRyZXR1cm5WYWx1ZS5zZXQoYXJyYXksIG9mZnNldCk7XG5cdFx0b2Zmc2V0ICs9IGFycmF5Lmxlbmd0aDtcblx0fVxuXG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZVVpbnQ4QXJyYXlzRXF1YWwoYSwgYikge1xuXHRhc3NlcnRVaW50OEFycmF5KGEpO1xuXHRhc3NlcnRVaW50OEFycmF5KGIpO1xuXG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tZm9yLWxvb3Bcblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGEubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0aWYgKGFbaW5kZXhdICE9PSBiW2luZGV4XSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVVpbnQ4QXJyYXlzKGEsIGIpIHtcblx0YXNzZXJ0VWludDhBcnJheShhKTtcblx0YXNzZXJ0VWludDhBcnJheShiKTtcblxuXHRjb25zdCBsZW5ndGggPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuXG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBkaWZmID0gYVtpbmRleF0gLSBiW2luZGV4XTtcblx0XHRpZiAoZGlmZiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuIE1hdGguc2lnbihkaWZmKTtcblx0XHR9XG5cdH1cblxuXHQvLyBBdCB0aGlzIHBvaW50LCBhbGwgdGhlIGNvbXBhcmVkIGVsZW1lbnRzIGFyZSBlcXVhbC5cblx0Ly8gVGhlIHNob3J0ZXIgYXJyYXkgc2hvdWxkIGNvbWUgZmlyc3QgaWYgdGhlIGFycmF5cyBhcmUgb2YgZGlmZmVyZW50IGxlbmd0aHMuXG5cdHJldHVybiBNYXRoLnNpZ24oYS5sZW5ndGggLSBiLmxlbmd0aCk7XG59XG5cbmNvbnN0IGNhY2hlZERlY29kZXJzID0ge1xuXHR1dGY4OiBuZXcgZ2xvYmFsVGhpcy5UZXh0RGVjb2RlcigndXRmOCcpLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ4QXJyYXlUb1N0cmluZyhhcnJheSwgZW5jb2RpbmcgPSAndXRmOCcpIHtcblx0YXNzZXJ0VWludDhBcnJheU9yQXJyYXlCdWZmZXIoYXJyYXkpO1xuXHRjYWNoZWREZWNvZGVyc1tlbmNvZGluZ10gPz89IG5ldyBnbG9iYWxUaGlzLlRleHREZWNvZGVyKGVuY29kaW5nKTtcblx0cmV0dXJuIGNhY2hlZERlY29kZXJzW2VuY29kaW5nXS5kZWNvZGUoYXJyYXkpO1xufVxuXG5mdW5jdGlvbiBhc3NlcnRTdHJpbmcodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiB2YWx1ZX1cXGBgKTtcblx0fVxufVxuXG5jb25zdCBjYWNoZWRFbmNvZGVyID0gbmV3IGdsb2JhbFRoaXMuVGV4dEVuY29kZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvVWludDhBcnJheShzdHJpbmcpIHtcblx0YXNzZXJ0U3RyaW5nKHN0cmluZyk7XG5cdHJldHVybiBjYWNoZWRFbmNvZGVyLmVuY29kZShzdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0Jhc2U2NFVybChiYXNlNjQpIHtcblx0cmV0dXJuIGJhc2U2NC5yZXBsYWNlQWxsKCcrJywgJy0nKS5yZXBsYWNlQWxsKCcvJywgJ18nKS5yZXBsYWNlKC89KyQvLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFVybFRvQmFzZTY0KGJhc2U2NHVybCkge1xuXHRyZXR1cm4gYmFzZTY0dXJsLnJlcGxhY2VBbGwoJy0nLCAnKycpLnJlcGxhY2VBbGwoJ18nLCAnLycpO1xufVxuXG4vLyBSZWZlcmVuY2U6IGh0dHBzOi8vcGh1b2MubmcvY29sbGVjdGlvbi90aGlzLXZzLXRoYXQvY29uY2F0LXZzLXB1c2gvXG5jb25zdCBNQVhfQkxPQ0tfU0laRSA9IDY1XzUzNTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVpbnQ4QXJyYXlUb0Jhc2U2NChhcnJheSwge3VybFNhZmUgPSBmYWxzZX0gPSB7fSkge1xuXHRhc3NlcnRVaW50OEFycmF5KGFycmF5KTtcblxuXHRsZXQgYmFzZTY0O1xuXG5cdGlmIChhcnJheS5sZW5ndGggPCBNQVhfQkxPQ0tfU0laRSkge1xuXHQvLyBSZXF1aXJlZCBhcyBgYnRvYWAgYW5kIGBhdG9iYCBkb24ndCBwcm9wZXJseSBzdXBwb3J0IFVuaWNvZGU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2xvc3NhcnkvQmFzZTY0I3RoZV91bmljb2RlX3Byb2JsZW1cblx0XHRiYXNlNjQgPSBnbG9iYWxUaGlzLmJ0b2EoU3RyaW5nLmZyb21Db2RlUG9pbnQuYXBwbHkodGhpcywgYXJyYXkpKTtcblx0fSBlbHNlIHtcblx0XHRiYXNlNjQgPSAnJztcblx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIGFycmF5KSB7XG5cdFx0XHRiYXNlNjQgKz0gU3RyaW5nLmZyb21Db2RlUG9pbnQodmFsdWUpO1xuXHRcdH1cblxuXHRcdGJhc2U2NCA9IGdsb2JhbFRoaXMuYnRvYShiYXNlNjQpO1xuXHR9XG5cblx0cmV0dXJuIHVybFNhZmUgPyBiYXNlNjRUb0Jhc2U2NFVybChiYXNlNjQpIDogYmFzZTY0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0VG9VaW50OEFycmF5KGJhc2U2NFN0cmluZykge1xuXHRhc3NlcnRTdHJpbmcoYmFzZTY0U3RyaW5nKTtcblx0cmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShnbG9iYWxUaGlzLmF0b2IoYmFzZTY0VXJsVG9CYXNlNjQoYmFzZTY0U3RyaW5nKSksIHggPT4geC5jb2RlUG9pbnRBdCgwKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0Jhc2U2NChzdHJpbmcsIHt1cmxTYWZlID0gZmFsc2V9ID0ge30pIHtcblx0YXNzZXJ0U3RyaW5nKHN0cmluZyk7XG5cdHJldHVybiB1aW50OEFycmF5VG9CYXNlNjQoc3RyaW5nVG9VaW50OEFycmF5KHN0cmluZyksIHt1cmxTYWZlfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjRUb1N0cmluZyhiYXNlNjRTdHJpbmcpIHtcblx0YXNzZXJ0U3RyaW5nKGJhc2U2NFN0cmluZyk7XG5cdHJldHVybiB1aW50OEFycmF5VG9TdHJpbmcoYmFzZTY0VG9VaW50OEFycmF5KGJhc2U2NFN0cmluZykpO1xufVxuXG5jb25zdCBieXRlVG9IZXhMb29rdXBUYWJsZSA9IEFycmF5LmZyb20oe2xlbmd0aDogMjU2fSwgKF8sIGluZGV4KSA9PiBpbmRleC50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1aW50OEFycmF5VG9IZXgoYXJyYXkpIHtcblx0YXNzZXJ0VWludDhBcnJheShhcnJheSk7XG5cblx0Ly8gQ29uY2F0ZW5hdGluZyBhIHN0cmluZyBpcyBmYXN0ZXIgdGhhbiB1c2luZyBhbiBhcnJheS5cblx0bGV0IGhleFN0cmluZyA9ICcnO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLWZvci1sb29wIC0tIE1heCBwZXJmb3JtYW5jZSBpcyBjcml0aWNhbC5cblx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdGhleFN0cmluZyArPSBieXRlVG9IZXhMb29rdXBUYWJsZVthcnJheVtpbmRleF1dO1xuXHR9XG5cblx0cmV0dXJuIGhleFN0cmluZztcbn1cblxuY29uc3QgaGV4VG9EZWNpbWFsTG9va3VwVGFibGUgPSB7XG5cdDA6IDAsXG5cdDE6IDEsXG5cdDI6IDIsXG5cdDM6IDMsXG5cdDQ6IDQsXG5cdDU6IDUsXG5cdDY6IDYsXG5cdDc6IDcsXG5cdDg6IDgsXG5cdDk6IDksXG5cdGE6IDEwLFxuXHRiOiAxMSxcblx0YzogMTIsXG5cdGQ6IDEzLFxuXHRlOiAxNCxcblx0ZjogMTUsXG5cdEE6IDEwLFxuXHRCOiAxMSxcblx0QzogMTIsXG5cdEQ6IDEzLFxuXHRFOiAxNCxcblx0RjogMTUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9VaW50OEFycmF5KGhleFN0cmluZykge1xuXHRhc3NlcnRTdHJpbmcoaGV4U3RyaW5nKTtcblxuXHRpZiAoaGV4U3RyaW5nLmxlbmd0aCAlIDIgIT09IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSGV4IHN0cmluZyBsZW5ndGguJyk7XG5cdH1cblxuXHRjb25zdCByZXN1bHRMZW5ndGggPSBoZXhTdHJpbmcubGVuZ3RoIC8gMjtcblx0Y29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShyZXN1bHRMZW5ndGgpO1xuXG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXN1bHRMZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBoaWdoTmliYmxlID0gaGV4VG9EZWNpbWFsTG9va3VwVGFibGVbaGV4U3RyaW5nW2luZGV4ICogMl1dO1xuXHRcdGNvbnN0IGxvd05pYmJsZSA9IGhleFRvRGVjaW1hbExvb2t1cFRhYmxlW2hleFN0cmluZ1soaW5kZXggKiAyKSArIDFdXTtcblxuXHRcdGlmIChoaWdoTmliYmxlID09PSB1bmRlZmluZWQgfHwgbG93TmliYmxlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBIZXggY2hhcmFjdGVyIGVuY291bnRlcmVkIGF0IHBvc2l0aW9uICR7aW5kZXggKiAyfWApO1xuXHRcdH1cblxuXHRcdGJ5dGVzW2luZGV4XSA9IChoaWdoTmliYmxlIDw8IDQpIHwgbG93TmliYmxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWJpdHdpc2Vcblx0fVxuXG5cdHJldHVybiBieXRlcztcbn1cblxuLyoqXG5AcGFyYW0ge0RhdGFWaWV3fSB2aWV3XG5AcmV0dXJucyB7bnVtYmVyfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVaW50QkUodmlldykge1xuXHRjb25zdCB7Ynl0ZUxlbmd0aH0gPSB2aWV3O1xuXG5cdGlmIChieXRlTGVuZ3RoID09PSA2KSB7XG5cdFx0cmV0dXJuICh2aWV3LmdldFVpbnQxNigwKSAqICgyICoqIDMyKSkgKyB2aWV3LmdldFVpbnQzMigyKTtcblx0fVxuXG5cdGlmIChieXRlTGVuZ3RoID09PSA1KSB7XG5cdFx0cmV0dXJuICh2aWV3LmdldFVpbnQ4KDApICogKDIgKiogMzIpKSArIHZpZXcuZ2V0VWludDMyKDEpO1xuXHR9XG5cblx0aWYgKGJ5dGVMZW5ndGggPT09IDQpIHtcblx0XHRyZXR1cm4gdmlldy5nZXRVaW50MzIoMCk7XG5cdH1cblxuXHRpZiAoYnl0ZUxlbmd0aCA9PT0gMykge1xuXHRcdHJldHVybiAodmlldy5nZXRVaW50OCgwKSAqICgyICoqIDE2KSkgKyB2aWV3LmdldFVpbnQxNigxKTtcblx0fVxuXG5cdGlmIChieXRlTGVuZ3RoID09PSAyKSB7XG5cdFx0cmV0dXJuIHZpZXcuZ2V0VWludDE2KDApO1xuXHR9XG5cblx0aWYgKGJ5dGVMZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gdmlldy5nZXRVaW50OCgwKTtcblx0fVxufVxuXG4vKipcbkBwYXJhbSB7VWludDhBcnJheX0gYXJyYXlcbkBwYXJhbSB7VWludDhBcnJheX0gdmFsdWVcbkByZXR1cm5zIHtudW1iZXJ9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG5cdGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRjb25zdCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcblxuXHRpZiAodmFsdWVMZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRpZiAodmFsdWVMZW5ndGggPiBhcnJheUxlbmd0aCkge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGNvbnN0IHZhbGlkT2Zmc2V0TGVuZ3RoID0gYXJyYXlMZW5ndGggLSB2YWx1ZUxlbmd0aDtcblxuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDw9IHZhbGlkT2Zmc2V0TGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0bGV0IGlzTWF0Y2ggPSB0cnVlO1xuXHRcdGZvciAobGV0IGluZGV4MiA9IDA7IGluZGV4MiA8IHZhbHVlTGVuZ3RoOyBpbmRleDIrKykge1xuXHRcdFx0aWYgKGFycmF5W2luZGV4ICsgaW5kZXgyXSAhPT0gdmFsdWVbaW5kZXgyXSkge1xuXHRcdFx0XHRpc01hdGNoID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc01hdGNoKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIC0xO1xufVxuXG4vKipcbkBwYXJhbSB7VWludDhBcnJheX0gYXJyYXlcbkBwYXJhbSB7VWludDhBcnJheX0gdmFsdWVcbkByZXR1cm5zIHtib29sZWFufVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcblx0cmV0dXJuIGluZGV4T2YoYXJyYXksIHZhbHVlKSAhPT0gLTE7XG59XG4iLCJleHBvcnQgY29uc3QgYWN0aW9uRGlzcGxheU5hbWVzID0gbmV3IE1hcChbXG4gIFtcInRvZ2dsZU1haW5EZWNrVmlld1wiLCBcIlRvZ2dsZSBNYWluIERlY2sgVmlld1wiXSxcbiAgW1widG9nZ2xlRXh0cmFEZWNrVmlld1wiLCBcIlRvZ2dsZSBFeHRyYSBEZWNrIFZpZXdcIl0sXG4gIFtcInRvZ2dsZUdyYXZlVmlld1wiLCBcIlRvZ2dsZSBHWSBWaWV3XCJdLFxuICBbXCJ0b2dnbGVCYW5pc2hWaWV3XCIsIFwiVG9nZ2xlIEJhbmlzaGVkIFZpZXdcIl0sXG4gIFtcImFjdGl2YXRlQ2FyZFwiLCAnQWN0aXZhdGUgQ2FyZCAtIFwiVG8gUy9UXCInXSxcbiAgW1wiYmFuaXNoQ2FyZFwiLCBcIkJhbmlzaCBDYXJkXCJdLFxuICBbXCJiYW5pc2hDYXJkRmRcIiwgXCJCYW5pc2ggQ2FyZCBGYWNlLURvd25cIl0sXG4gIFtcImJhbmlzaERlY2tUb3BcIiwgXCJCYW5pc2ggVG9wIG9mIE1haW4gRGVja1wiXSxcbiAgW1wiYmFuaXNoRGVja1RvcEZkXCIsIFwiQmFuaXNoIFRvcCBvZiBNYWluIERlY2sgRmFjZS1Eb3duXCJdLFxuICBbXCJkZWNsYXJlRWZmXCIsIFwiRGVjbGFyZVwiXSxcbiAgW1wibm9ybWFsU3VtbW9uQ2FyZFwiLCBcIk5vcm1hbCBTdW1tb25cIl0sXG4gIFtcIm92ZXJsYXlNYXRlcmlhbFwiLCBcIk92ZXJsYXlcIl0sXG4gIFtcInNwZWNTdW1tb25BdGtcIiwgXCJTcGVjaWFsIFN1bW1vbiAoQVRLKVwiXSxcbiAgW1wic3BlY1N1bW1vbkRlZlwiLCBcIlNwZWNpYWwgU3VtbW9uIChERUYpXCJdLFxuICBbXCJ4eXpTdW1tb25BdGtcIiwgXCJYWVogU3VtbW9uIChBVEspXCJdLFxuICBbXCJ4eXpTdW1tb25EZWZcIiwgXCJYWVogU3VtbW9uIChERUYpXCJdLFxuICBbXCJzZXRDYXJkXCIsIFwiU2V0IENhcmRcIl0sXG4gIFtcImNhcmRUb0RlY2tCb3R0b21cIiwgXCJUbyBCb3R0b20gb2YgRGVja1wiXSxcbiAgW1wiY2FyZFRvR3lcIiwgXCJUbyBHcmF2ZXlhcmRcIl0sXG4gIFtcImJvdW5jZUNhcmRcIiwgXCJBZGQgQ2FyZCB0byBIYW5kL0V4dHJhIERlY2tcIl0sXG4gIFtcImNhcmRUb0V4dHJhRGVja0Z1XCIsIFwiQWRkIENhcmQgdG8gRXh0cmEgRGVjayBGYWNlLVVwXCJdLFxuICBbXCJhZGRMcFwiLCBcIkdhaW4gTFBcIl0sXG4gIFtcInN1YkxwXCIsIFwiTG9zZSBMUFwiXSxcbiAgW1widG9nZ2xlQ2hhdEJveFwiLCBcIlRvZ2dsZSBDaGF0IEJveFwiXSxcbiAgW1wic2lnbmFsVGhpbmtpbmdcIiwgXCJUaGlua2luZ1wiXSxcbiAgW1wic2luZ2FsT2theVwiLCBcIlRodW1icyBVcFwiXSxcbl0pO1xuIiwiLyoqISBcbiAqIGhvdGtleXMtanMgdjMuMTMuNyBcbiAqIEEgc2ltcGxlIG1pY3JvLWxpYnJhcnkgZm9yIGRlZmluaW5nIGFuZCBkaXNwYXRjaGluZyBrZXlib2FyZCBzaG9ydGN1dHMuIEl0IGhhcyBubyBkZXBlbmRlbmNpZXMuIFxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjQga2Vubnkgd29uZyA8d293b2hvb0BxcS5jb20+IFxuICogaHR0cHM6Ly9naXRodWIuY29tL2pheXdjamxvdmUvaG90a2V5cy1qcy5naXQgXG4gKiBcbiAqIEB3ZWJzaXRlOiBodHRwczovL2pheXdjamxvdmUuZ2l0aHViLmlvL2hvdGtleXMtanNcbiBcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBcbiAqL1xuXG5jb25zdCBpc2ZmID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gMCA6IGZhbHNlO1xuXG4vLyDnu5Hlrprkuovku7ZcbmZ1bmN0aW9uIGFkZEV2ZW50KG9iamVjdCwgZXZlbnQsIG1ldGhvZCwgdXNlQ2FwdHVyZSkge1xuICBpZiAob2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbWV0aG9kLCB1c2VDYXB0dXJlKTtcbiAgfSBlbHNlIGlmIChvYmplY3QuYXR0YWNoRXZlbnQpIHtcbiAgICBvYmplY3QuYXR0YWNoRXZlbnQoXCJvblwiLmNvbmNhdChldmVudCksIG1ldGhvZCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50KG9iamVjdCwgZXZlbnQsIG1ldGhvZCwgdXNlQ2FwdHVyZSkge1xuICBpZiAob2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBvYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbWV0aG9kLCB1c2VDYXB0dXJlKTtcbiAgfSBlbHNlIGlmIChvYmplY3QuZGV0YWNoRXZlbnQpIHtcbiAgICBvYmplY3QuZGV0YWNoRXZlbnQoXCJvblwiLmNvbmNhdChldmVudCksIG1ldGhvZCk7XG4gIH1cbn1cblxuLy8g5L+u6aWw6ZSu6L2s5o2i5oiQ5a+55bqU55qE6ZSu56CBXG5mdW5jdGlvbiBnZXRNb2RzKG1vZGlmaWVyLCBrZXkpIHtcbiAgY29uc3QgbW9kcyA9IGtleS5zbGljZSgwLCBrZXkubGVuZ3RoIC0gMSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kcy5sZW5ndGg7IGkrKykgbW9kc1tpXSA9IG1vZGlmaWVyW21vZHNbaV0udG9Mb3dlckNhc2UoKV07XG4gIHJldHVybiBtb2RzO1xufVxuXG4vLyDlpITnkIbkvKDnmoRrZXnlrZfnrKbkuLLovazmjaLmiJDmlbDnu4RcbmZ1bmN0aW9uIGdldEtleXMoa2V5KSB7XG4gIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykga2V5ID0gJyc7XG4gIGtleSA9IGtleS5yZXBsYWNlKC9cXHMvZywgJycpOyAvLyDljLnphY3ku7vkvZXnqbrnmb3lrZfnrKYs5YyF5ous56m65qC844CB5Yi26KGo56ym44CB5o2i6aG156ym562J562JXG4gIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJywnKTsgLy8g5ZCM5pe26K6+572u5aSa5Liq5b+r5o236ZSu77yM5LulJywn5YiG5YmyXG4gIGxldCBpbmRleCA9IGtleXMubGFzdEluZGV4T2YoJycpO1xuXG4gIC8vIOW/q+aNt+mUruWPr+iDveWMheWQqycsJ++8jOmcgOeJueauiuWkhOeQhlxuICBmb3IgKDsgaW5kZXggPj0gMDspIHtcbiAgICBrZXlzW2luZGV4IC0gMV0gKz0gJywnO1xuICAgIGtleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBpbmRleCA9IGtleXMubGFzdEluZGV4T2YoJycpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufVxuXG4vLyDmr5TovoPkv67ppbDplK7nmoTmlbDnu4RcbmZ1bmN0aW9uIGNvbXBhcmVBcnJheShhMSwgYTIpIHtcbiAgY29uc3QgYXJyMSA9IGExLmxlbmd0aCA+PSBhMi5sZW5ndGggPyBhMSA6IGEyO1xuICBjb25zdCBhcnIyID0gYTEubGVuZ3RoID49IGEyLmxlbmd0aCA/IGEyIDogYTE7XG4gIGxldCBpc0luZGV4ID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIxLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycjIuaW5kZXhPZihhcnIxW2ldKSA9PT0gLTEpIGlzSW5kZXggPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNJbmRleDtcbn1cblxuLy8gU3BlY2lhbCBLZXlzXG5jb25zdCBfa2V5TWFwID0ge1xuICBiYWNrc3BhY2U6IDgsXG4gICfijKsnOiA4LFxuICB0YWI6IDksXG4gIGNsZWFyOiAxMixcbiAgZW50ZXI6IDEzLFxuICAn4oapJzogMTMsXG4gIHJldHVybjogMTMsXG4gIGVzYzogMjcsXG4gIGVzY2FwZTogMjcsXG4gIHNwYWNlOiAzMixcbiAgbGVmdDogMzcsXG4gIHVwOiAzOCxcbiAgcmlnaHQ6IDM5LFxuICBkb3duOiA0MCxcbiAgZGVsOiA0NixcbiAgZGVsZXRlOiA0NixcbiAgaW5zOiA0NSxcbiAgaW5zZXJ0OiA0NSxcbiAgaG9tZTogMzYsXG4gIGVuZDogMzUsXG4gIHBhZ2V1cDogMzMsXG4gIHBhZ2Vkb3duOiAzNCxcbiAgY2Fwc2xvY2s6IDIwLFxuICBudW1fMDogOTYsXG4gIG51bV8xOiA5NyxcbiAgbnVtXzI6IDk4LFxuICBudW1fMzogOTksXG4gIG51bV80OiAxMDAsXG4gIG51bV81OiAxMDEsXG4gIG51bV82OiAxMDIsXG4gIG51bV83OiAxMDMsXG4gIG51bV84OiAxMDQsXG4gIG51bV85OiAxMDUsXG4gIG51bV9tdWx0aXBseTogMTA2LFxuICBudW1fYWRkOiAxMDcsXG4gIG51bV9lbnRlcjogMTA4LFxuICBudW1fc3VidHJhY3Q6IDEwOSxcbiAgbnVtX2RlY2ltYWw6IDExMCxcbiAgbnVtX2RpdmlkZTogMTExLFxuICAn4oeqJzogMjAsXG4gICcsJzogMTg4LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnLSc6IGlzZmYgPyAxNzMgOiAxODksXG4gICc9JzogaXNmZiA/IDYxIDogMTg3LFxuICAnOyc6IGlzZmYgPyA1OSA6IDE4NixcbiAgJ1xcJyc6IDIyMixcbiAgJ1snOiAyMTksXG4gICddJzogMjIxLFxuICAnXFxcXCc6IDIyMFxufTtcblxuLy8gTW9kaWZpZXIgS2V5c1xuY29uc3QgX21vZGlmaWVyID0ge1xuICAvLyBzaGlmdEtleVxuICAn4oenJzogMTYsXG4gIHNoaWZ0OiAxNixcbiAgLy8gYWx0S2V5XG4gICfijKUnOiAxOCxcbiAgYWx0OiAxOCxcbiAgb3B0aW9uOiAxOCxcbiAgLy8gY3RybEtleVxuICAn4oyDJzogMTcsXG4gIGN0cmw6IDE3LFxuICBjb250cm9sOiAxNyxcbiAgLy8gbWV0YUtleVxuICAn4oyYJzogOTEsXG4gIGNtZDogOTEsXG4gIGNvbW1hbmQ6IDkxXG59O1xuY29uc3QgbW9kaWZpZXJNYXAgPSB7XG4gIDE2OiAnc2hpZnRLZXknLFxuICAxODogJ2FsdEtleScsXG4gIDE3OiAnY3RybEtleScsXG4gIDkxOiAnbWV0YUtleScsXG4gIHNoaWZ0S2V5OiAxNixcbiAgY3RybEtleTogMTcsXG4gIGFsdEtleTogMTgsXG4gIG1ldGFLZXk6IDkxXG59O1xuY29uc3QgX21vZHMgPSB7XG4gIDE2OiBmYWxzZSxcbiAgMTg6IGZhbHNlLFxuICAxNzogZmFsc2UsXG4gIDkxOiBmYWxzZVxufTtcbmNvbnN0IF9oYW5kbGVycyA9IHt9O1xuXG4vLyBGMX5GMTIgc3BlY2lhbCBrZXlcbmZvciAobGV0IGsgPSAxOyBrIDwgMjA7IGsrKykge1xuICBfa2V5TWFwW1wiZlwiLmNvbmNhdChrKV0gPSAxMTEgKyBrO1xufVxuXG5sZXQgX2Rvd25LZXlzID0gW107IC8vIOiusOW9leaRgeS4i+eahOe7keWumumUrlxubGV0IHdpbkxpc3RlbmRGb2N1cyA9IG51bGw7IC8vIHdpbmRvd+aYr+WQpuW3sue7j+ebkeWQrOS6hmZvY3Vz5LqL5Lu2XG5sZXQgX3Njb3BlID0gJ2FsbCc7IC8vIOm7mOiupOeDremUruiMg+WbtFxuY29uc3QgZWxlbWVudEV2ZW50TWFwID0gbmV3IE1hcCgpOyAvLyDlt7Lnu5Hlrprkuovku7bnmoToioLngrnorrDlvZVcblxuLy8g6L+U5Zue6ZSu56CBXG5jb25zdCBjb2RlID0geCA9PiBfa2V5TWFwW3gudG9Mb3dlckNhc2UoKV0gfHwgX21vZGlmaWVyW3gudG9Mb3dlckNhc2UoKV0gfHwgeC50b1VwcGVyQ2FzZSgpLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBnZXRLZXkgPSB4ID0+IE9iamVjdC5rZXlzKF9rZXlNYXApLmZpbmQoayA9PiBfa2V5TWFwW2tdID09PSB4KTtcbmNvbnN0IGdldE1vZGlmaWVyID0geCA9PiBPYmplY3Qua2V5cyhfbW9kaWZpZXIpLmZpbmQoayA9PiBfbW9kaWZpZXJba10gPT09IHgpO1xuXG4vLyDorr7nva7ojrflj5blvZPliY3ojIPlm7TvvIjpu5jorqTkuLon5omA5pyJJ++8iVxuZnVuY3Rpb24gc2V0U2NvcGUoc2NvcGUpIHtcbiAgX3Njb3BlID0gc2NvcGUgfHwgJ2FsbCc7XG59XG4vLyDojrflj5blvZPliY3ojIPlm7RcbmZ1bmN0aW9uIGdldFNjb3BlKCkge1xuICByZXR1cm4gX3Njb3BlIHx8ICdhbGwnO1xufVxuLy8g6I635Y+W5pGB5LiL57uR5a6a6ZSu55qE6ZSu5YC8XG5mdW5jdGlvbiBnZXRQcmVzc2VkS2V5Q29kZXMoKSB7XG4gIHJldHVybiBfZG93bktleXMuc2xpY2UoMCk7XG59XG5mdW5jdGlvbiBnZXRQcmVzc2VkS2V5U3RyaW5nKCkge1xuICByZXR1cm4gX2Rvd25LZXlzLm1hcChjID0+IGdldEtleShjKSB8fCBnZXRNb2RpZmllcihjKSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpKTtcbn1cbmZ1bmN0aW9uIGdldEFsbEtleUNvZGVzKCkge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgT2JqZWN0LmtleXMoX2hhbmRsZXJzKS5mb3JFYWNoKGsgPT4ge1xuICAgIF9oYW5kbGVyc1trXS5mb3JFYWNoKF9yZWYgPT4ge1xuICAgICAgbGV0IHtcbiAgICAgICAga2V5LFxuICAgICAgICBzY29wZSxcbiAgICAgICAgbW9kcyxcbiAgICAgICAgc2hvcnRjdXRcbiAgICAgIH0gPSBfcmVmO1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBzY29wZSxcbiAgICAgICAgc2hvcnRjdXQsXG4gICAgICAgIG1vZHMsXG4gICAgICAgIGtleXM6IGtleS5zcGxpdCgnKycpLm1hcCh2ID0+IGNvZGUodikpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIOihqOWNleaOp+S7tuaOp+S7tuWIpOaWrSDov5Tlm54gQm9vbGVhblxuLy8gaG90a2V5IGlzIGVmZmVjdGl2ZSBvbmx5IHdoZW4gZmlsdGVyIHJldHVybiB0cnVlXG5mdW5jdGlvbiBmaWx0ZXIoZXZlbnQpIHtcbiAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG4gIGNvbnN0IHtcbiAgICB0YWdOYW1lXG4gIH0gPSB0YXJnZXQ7XG4gIGxldCBmbGFnID0gdHJ1ZTtcbiAgY29uc3QgaXNJbnB1dCA9IHRhZ05hbWUgPT09ICdJTlBVVCcgJiYgIVsnY2hlY2tib3gnLCAncmFkaW8nLCAncmFuZ2UnLCAnYnV0dG9uJywgJ2ZpbGUnLCAncmVzZXQnLCAnc3VibWl0JywgJ2NvbG9yJ10uaW5jbHVkZXModGFyZ2V0LnR5cGUpO1xuICAvLyBpZ25vcmU6IGlzQ29udGVudEVkaXRhYmxlID09PSAndHJ1ZScsIDxpbnB1dD4gYW5kIDx0ZXh0YXJlYT4gd2hlbiByZWFkT25seSBzdGF0ZSBpcyBmYWxzZSwgPHNlbGVjdD5cbiAgaWYgKHRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSB8fCAoaXNJbnB1dCB8fCB0YWdOYW1lID09PSAnVEVYVEFSRUEnIHx8IHRhZ05hbWUgPT09ICdTRUxFQ1QnKSAmJiAhdGFyZ2V0LnJlYWRPbmx5KSB7XG4gICAgZmxhZyA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBmbGFnO1xufVxuXG4vLyDliKTmlq3mkYHkuIvnmoTplK7mmK/lkKbkuLrmn5DkuKrplK7vvIzov5Tlm550cnVl5oiW6ICFZmFsc2VcbmZ1bmN0aW9uIGlzUHJlc3NlZChrZXlDb2RlKSB7XG4gIGlmICh0eXBlb2Yga2V5Q29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICBrZXlDb2RlID0gY29kZShrZXlDb2RlKTsgLy8g6L2s5o2i5oiQ6ZSu56CBXG4gIH1cbiAgcmV0dXJuIF9kb3duS2V5cy5pbmRleE9mKGtleUNvZGUpICE9PSAtMTtcbn1cblxuLy8g5b6q546v5Yig6ZmkaGFuZGxlcnPkuK3nmoTmiYDmnIkgc2NvcGUo6IyD5Zu0KVxuZnVuY3Rpb24gZGVsZXRlU2NvcGUoc2NvcGUsIG5ld1Njb3BlKSB7XG4gIGxldCBoYW5kbGVycztcbiAgbGV0IGk7XG5cbiAgLy8g5rKh5pyJ5oyH5a6ac2NvcGXvvIzojrflj5ZzY29wZVxuICBpZiAoIXNjb3BlKSBzY29wZSA9IGdldFNjb3BlKCk7XG4gIGZvciAoY29uc3Qga2V5IGluIF9oYW5kbGVycykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX2hhbmRsZXJzLCBrZXkpKSB7XG4gICAgICBoYW5kbGVycyA9IF9oYW5kbGVyc1trZXldO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDspIHtcbiAgICAgICAgaWYgKGhhbmRsZXJzW2ldLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgIGNvbnN0IGRlbGV0ZUl0ZW1zID0gaGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGRlbGV0ZUl0ZW1zLmZvckVhY2goX3JlZjIgPT4ge1xuICAgICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgfSA9IF9yZWYyO1xuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUtleUV2ZW50KGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOWmguaenHNjb3Bl6KKr5Yig6Zmk77yM5bCGc2NvcGXph43nva7kuLphbGxcbiAgaWYgKGdldFNjb3BlKCkgPT09IHNjb3BlKSBzZXRTY29wZShuZXdTY29wZSB8fCAnYWxsJyk7XG59XG5cbi8vIOa4hemZpOS/rumlsOmUrlxuZnVuY3Rpb24gY2xlYXJNb2RpZmllcihldmVudCkge1xuICBsZXQga2V5ID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaCB8fCBldmVudC5jaGFyQ29kZTtcbiAgY29uc3QgaSA9IF9kb3duS2V5cy5pbmRleE9mKGtleSk7XG5cbiAgLy8g5LuO5YiX6KGo5Lit5riF6Zmk5oyJ5Y6L6L+H55qE6ZSuXG4gIGlmIChpID49IDApIHtcbiAgICBfZG93bktleXMuc3BsaWNlKGksIDEpO1xuICB9XG4gIC8vIOeJueauiuWkhOeQhiBjbW1hbmQg6ZSu77yM5ZyoIGNtbWFuZCDnu4TlkIjlv6vmjbfplK4ga2V5dXAg5Y+q5omn6KGM5LiA5qyh55qE6Zeu6aKYXG4gIGlmIChldmVudC5rZXkgJiYgZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdtZXRhJykge1xuICAgIF9kb3duS2V5cy5zcGxpY2UoMCwgX2Rvd25LZXlzLmxlbmd0aCk7XG4gIH1cblxuICAvLyDkv67ppbDplK4gc2hpZnRLZXkgYWx0S2V5IGN0cmxLZXkgKGNvbW1hbmR8fG1ldGFLZXkpIOa4hemZpFxuICBpZiAoa2V5ID09PSA5MyB8fCBrZXkgPT09IDIyNCkga2V5ID0gOTE7XG4gIGlmIChrZXkgaW4gX21vZHMpIHtcbiAgICBfbW9kc1trZXldID0gZmFsc2U7XG5cbiAgICAvLyDlsIbkv67ppbDplK7ph43nva7kuLpmYWxzZVxuICAgIGZvciAoY29uc3QgayBpbiBfbW9kaWZpZXIpIGlmIChfbW9kaWZpZXJba10gPT09IGtleSkgaG90a2V5c1trXSA9IGZhbHNlO1xuICB9XG59XG5mdW5jdGlvbiB1bmJpbmQoa2V5c0luZm8pIHtcbiAgLy8gdW5iaW5kKCksIHVuYmluZCBhbGwga2V5c1xuICBpZiAodHlwZW9mIGtleXNJbmZvID09PSAndW5kZWZpbmVkJykge1xuICAgIE9iamVjdC5rZXlzKF9oYW5kbGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgQXJyYXkuaXNBcnJheShfaGFuZGxlcnNba2V5XSkgJiYgX2hhbmRsZXJzW2tleV0uZm9yRWFjaChpbmZvID0+IGVhY2hVbmJpbmQoaW5mbykpO1xuICAgICAgZGVsZXRlIF9oYW5kbGVyc1trZXldO1xuICAgIH0pO1xuICAgIHJlbW92ZUtleUV2ZW50KG51bGwpO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoa2V5c0luZm8pKSB7XG4gICAgLy8gc3VwcG9ydCBsaWtlIDogdW5iaW5kKFt7a2V5OiAnY3RybCthJywgc2NvcGU6ICdzMSd9LCB7a2V5OiAnY3RybC1hJywgc2NvcGU6ICdzMicsIHNwbGl0S2V5OiAnLSd9XSlcbiAgICBrZXlzSW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgaWYgKGluZm8ua2V5KSBlYWNoVW5iaW5kKGluZm8pO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBrZXlzSW5mbyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBzdXBwb3J0IGxpa2UgdW5iaW5kKHtrZXk6ICdjdHJsK2EsIGN0cmwrYicsIHNjb3BlOidhYmMnfSlcbiAgICBpZiAoa2V5c0luZm8ua2V5KSBlYWNoVW5iaW5kKGtleXNJbmZvKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Yga2V5c0luZm8gPT09ICdzdHJpbmcnKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuICAgIC8vIHN1cHBvcnQgb2xkIG1ldGhvZFxuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBsZXQgW3Njb3BlLCBtZXRob2RdID0gYXJncztcbiAgICBpZiAodHlwZW9mIHNjb3BlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtZXRob2QgPSBzY29wZTtcbiAgICAgIHNjb3BlID0gJyc7XG4gICAgfVxuICAgIGVhY2hVbmJpbmQoe1xuICAgICAga2V5OiBrZXlzSW5mbyxcbiAgICAgIHNjb3BlLFxuICAgICAgbWV0aG9kLFxuICAgICAgc3BsaXRLZXk6ICcrJ1xuICAgIH0pO1xuICB9XG59XG5cbi8vIOino+mZpOe7keWumuafkOS4quiMg+WbtOeahOW/q+aNt+mUrlxuY29uc3QgZWFjaFVuYmluZCA9IF9yZWYzID0+IHtcbiAgbGV0IHtcbiAgICBrZXksXG4gICAgc2NvcGUsXG4gICAgbWV0aG9kLFxuICAgIHNwbGl0S2V5ID0gJysnXG4gIH0gPSBfcmVmMztcbiAgY29uc3QgbXVsdGlwbGVLZXlzID0gZ2V0S2V5cyhrZXkpO1xuICBtdWx0aXBsZUtleXMuZm9yRWFjaChvcmlnaW5LZXkgPT4ge1xuICAgIGNvbnN0IHVuYmluZEtleXMgPSBvcmlnaW5LZXkuc3BsaXQoc3BsaXRLZXkpO1xuICAgIGNvbnN0IGxlbiA9IHVuYmluZEtleXMubGVuZ3RoO1xuICAgIGNvbnN0IGxhc3RLZXkgPSB1bmJpbmRLZXlzW2xlbiAtIDFdO1xuICAgIGNvbnN0IGtleUNvZGUgPSBsYXN0S2V5ID09PSAnKicgPyAnKicgOiBjb2RlKGxhc3RLZXkpO1xuICAgIGlmICghX2hhbmRsZXJzW2tleUNvZGVdKSByZXR1cm47XG4gICAgLy8g5Yik5pat5piv5ZCm5Lyg5YWl6IyD5Zu077yM5rKh5pyJ5bCx6I635Y+W6IyD5Zu0XG4gICAgaWYgKCFzY29wZSkgc2NvcGUgPSBnZXRTY29wZSgpO1xuICAgIGNvbnN0IG1vZHMgPSBsZW4gPiAxID8gZ2V0TW9kcyhfbW9kaWZpZXIsIHVuYmluZEtleXMpIDogW107XG4gICAgY29uc3QgdW5iaW5kRWxlbWVudHMgPSBbXTtcbiAgICBfaGFuZGxlcnNba2V5Q29kZV0gPSBfaGFuZGxlcnNba2V5Q29kZV0uZmlsdGVyKHJlY29yZCA9PiB7XG4gICAgICAvLyDpgJrov4flh73mlbDliKTmlq3vvIzmmK/lkKbop6PpmaTnu5HlrprvvIzlh73mlbDnm7jnrYnnm7TmjqXov5Tlm55cbiAgICAgIGNvbnN0IGlzTWF0Y2hpbmdNZXRob2QgPSBtZXRob2QgPyByZWNvcmQubWV0aG9kID09PSBtZXRob2QgOiB0cnVlO1xuICAgICAgY29uc3QgaXNVbmJpbmQgPSBpc01hdGNoaW5nTWV0aG9kICYmIHJlY29yZC5zY29wZSA9PT0gc2NvcGUgJiYgY29tcGFyZUFycmF5KHJlY29yZC5tb2RzLCBtb2RzKTtcbiAgICAgIGlmIChpc1VuYmluZCkgdW5iaW5kRWxlbWVudHMucHVzaChyZWNvcmQuZWxlbWVudCk7XG4gICAgICByZXR1cm4gIWlzVW5iaW5kO1xuICAgIH0pO1xuICAgIHVuYmluZEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiByZW1vdmVLZXlFdmVudChlbGVtZW50KSk7XG4gIH0pO1xufTtcblxuLy8g5a+555uR5ZCs5a+55bqU5b+r5o236ZSu55qE5Zue6LCD5Ye95pWw6L+b6KGM5aSE55CGXG5mdW5jdGlvbiBldmVudEhhbmRsZXIoZXZlbnQsIGhhbmRsZXIsIHNjb3BlLCBlbGVtZW50KSB7XG4gIGlmIChoYW5kbGVyLmVsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IG1vZGlmaWVyc01hdGNoO1xuXG4gIC8vIOeci+Wug+aYr+WQpuWcqOW9k+WJjeiMg+WbtFxuICBpZiAoaGFuZGxlci5zY29wZSA9PT0gc2NvcGUgfHwgaGFuZGxlci5zY29wZSA9PT0gJ2FsbCcpIHtcbiAgICAvLyDmo4Dmn6XmmK/lkKbljLnphY3kv67ppbDnrKbvvIjlpoLmnpzmnInov5Tlm550cnVl77yJXG4gICAgbW9kaWZpZXJzTWF0Y2ggPSBoYW5kbGVyLm1vZHMubGVuZ3RoID4gMDtcbiAgICBmb3IgKGNvbnN0IHkgaW4gX21vZHMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX21vZHMsIHkpKSB7XG4gICAgICAgIGlmICghX21vZHNbeV0gJiYgaGFuZGxlci5tb2RzLmluZGV4T2YoK3kpID4gLTEgfHwgX21vZHNbeV0gJiYgaGFuZGxlci5tb2RzLmluZGV4T2YoK3kpID09PSAtMSkge1xuICAgICAgICAgIG1vZGlmaWVyc01hdGNoID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDosIPnlKjlpITnkIbnqIvluo/vvIzlpoLmnpzmmK/kv67ppbDplK7kuI3lgZrlpITnkIZcbiAgICBpZiAoaGFuZGxlci5tb2RzLmxlbmd0aCA9PT0gMCAmJiAhX21vZHNbMTZdICYmICFfbW9kc1sxOF0gJiYgIV9tb2RzWzE3XSAmJiAhX21vZHNbOTFdIHx8IG1vZGlmaWVyc01hdGNoIHx8IGhhbmRsZXIuc2hvcnRjdXQgPT09ICcqJykge1xuICAgICAgaGFuZGxlci5rZXlzID0gW107XG4gICAgICBoYW5kbGVyLmtleXMgPSBoYW5kbGVyLmtleXMuY29uY2F0KF9kb3duS2V5cyk7XG4gICAgICBpZiAoaGFuZGxlci5tZXRob2QoZXZlbnQsIGhhbmRsZXIpID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7ZWxzZSBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbEJ1YmJsZSkgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8g5aSE55CGa2V5ZG93buS6i+S7tlxuZnVuY3Rpb24gZGlzcGF0Y2goZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgYXN0ZXJpc2sgPSBfaGFuZGxlcnNbJyonXTtcbiAgbGV0IGtleSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2ggfHwgZXZlbnQuY2hhckNvZGU7XG5cbiAgLy8g6KGo5Y2V5o6n5Lu26L+H5rukIOm7mOiupOihqOWNleaOp+S7tuS4jeinpuWPkeW/q+aNt+mUrlxuICBpZiAoIWhvdGtleXMuZmlsdGVyLmNhbGwodGhpcywgZXZlbnQpKSByZXR1cm47XG5cbiAgLy8gR2Vja28oRmlyZWZveCnnmoRjb21tYW5k6ZSu5YC8MjI077yM5ZyoV2Via2l0KENocm9tZSnkuK3kv53mjIHkuIDoh7RcbiAgLy8gV2Via2l05bem5Y+zIGNvbW1hbmQg6ZSu5YC85LiN5LiA5qC3XG4gIGlmIChrZXkgPT09IDkzIHx8IGtleSA9PT0gMjI0KSBrZXkgPSA5MTtcblxuICAvKipcbiAgICogQ29sbGVjdCBib3VuZCBrZXlzXG4gICAqIElmIGFuIElucHV0IE1ldGhvZCBFZGl0b3IgaXMgcHJvY2Vzc2luZyBrZXkgaW5wdXQgYW5kIHRoZSBldmVudCBpcyBrZXlkb3duLCByZXR1cm4gMjI5LlxuICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNTA0MzkzNC9pcy1pdC1vay10by1pZ25vcmUta2V5ZG93bi1ldmVudHMtd2l0aC1rZXljb2RlLTIyOVxuICAgKiBodHRwOi8vbGlzdHMudzMub3JnL0FyY2hpdmVzL1B1YmxpYy93d3ctZG9tLzIwMTBKdWxTZXAvYXR0LTAxODIva2V5Q29kZS1zcGVjLmh0bWxcbiAgICovXG4gIGlmIChfZG93bktleXMuaW5kZXhPZihrZXkpID09PSAtMSAmJiBrZXkgIT09IDIyOSkgX2Rvd25LZXlzLnB1c2goa2V5KTtcbiAgLyoqXG4gICAqIEplc3QgdGVzdCBjYXNlcyBhcmUgcmVxdWlyZWQuXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG4gIFsnY3RybEtleScsICdhbHRLZXknLCAnc2hpZnRLZXknLCAnbWV0YUtleSddLmZvckVhY2goa2V5TmFtZSA9PiB7XG4gICAgY29uc3Qga2V5TnVtID0gbW9kaWZpZXJNYXBba2V5TmFtZV07XG4gICAgaWYgKGV2ZW50W2tleU5hbWVdICYmIF9kb3duS2V5cy5pbmRleE9mKGtleU51bSkgPT09IC0xKSB7XG4gICAgICBfZG93bktleXMucHVzaChrZXlOdW0pO1xuICAgIH0gZWxzZSBpZiAoIWV2ZW50W2tleU5hbWVdICYmIF9kb3duS2V5cy5pbmRleE9mKGtleU51bSkgPiAtMSkge1xuICAgICAgX2Rvd25LZXlzLnNwbGljZShfZG93bktleXMuaW5kZXhPZihrZXlOdW0pLCAxKTtcbiAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT09ICdtZXRhS2V5JyAmJiBldmVudFtrZXlOYW1lXSAmJiBfZG93bktleXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpeCBpZiBDb21tYW5kIGlzIHByZXNzZWQ6XG4gICAgICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgKi9cbiAgICAgIGlmICghKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KSkge1xuICAgICAgICBfZG93bktleXMgPSBfZG93bktleXMuc2xpY2UoX2Rvd25LZXlzLmluZGV4T2Yoa2V5TnVtKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgaWYgKGtleSBpbiBfbW9kcykge1xuICAgIF9tb2RzW2tleV0gPSB0cnVlO1xuXG4gICAgLy8g5bCG54m55q6K5a2X56ym55qEa2V55rOo5YaM5YiwIGhvdGtleXMg5LiKXG4gICAgZm9yIChjb25zdCBrIGluIF9tb2RpZmllcikge1xuICAgICAgaWYgKF9tb2RpZmllcltrXSA9PT0ga2V5KSBob3RrZXlzW2tdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFhc3RlcmlzaykgcmV0dXJuO1xuICB9XG5cbiAgLy8g5bCGIG1vZGlmaWVyTWFwIOmHjOmdoueahOS/rumlsOmUrue7keWumuWIsCBldmVudCDkuK1cbiAgZm9yIChjb25zdCBlIGluIF9tb2RzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfbW9kcywgZSkpIHtcbiAgICAgIF9tb2RzW2VdID0gZXZlbnRbbW9kaWZpZXJNYXBbZV1dO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2pheXdjamxvdmUvaG90a2V5cy9wdWxsLzEyOVxuICAgKiBUaGlzIHNvbHZlcyB0aGUgaXNzdWUgaW4gRmlyZWZveCBvbiBXaW5kb3dzIHdoZXJlIGhvdGtleXMgY29ycmVzcG9uZGluZyB0byBzcGVjaWFsIGNoYXJhY3RlcnMgd291bGQgbm90IHRyaWdnZXIuXG4gICAqIEFuIGV4YW1wbGUgb2YgdGhpcyBpcyBjdHJsK2FsdCttIG9uIGEgU3dlZGlzaCBrZXlib2FyZCB3aGljaCBpcyB1c2VkIHRvIHR5cGUgzrwuXG4gICAqIEJyb3dzZXIgc3VwcG9ydDogaHR0cHM6Ly9jYW5pdXNlLmNvbS8jZmVhdD1rZXlib2FyZGV2ZW50LWdldG1vZGlmaWVyc3RhdGVcbiAgICovXG4gIGlmIChldmVudC5nZXRNb2RpZmllclN0YXRlICYmICEoZXZlbnQuYWx0S2V5ICYmICFldmVudC5jdHJsS2V5KSAmJiBldmVudC5nZXRNb2RpZmllclN0YXRlKCdBbHRHcmFwaCcpKSB7XG4gICAgaWYgKF9kb3duS2V5cy5pbmRleE9mKDE3KSA9PT0gLTEpIHtcbiAgICAgIF9kb3duS2V5cy5wdXNoKDE3KTtcbiAgICB9XG4gICAgaWYgKF9kb3duS2V5cy5pbmRleE9mKDE4KSA9PT0gLTEpIHtcbiAgICAgIF9kb3duS2V5cy5wdXNoKDE4KTtcbiAgICB9XG4gICAgX21vZHNbMTddID0gdHJ1ZTtcbiAgICBfbW9kc1sxOF0gPSB0cnVlO1xuICB9XG5cbiAgLy8g6I635Y+W6IyD5Zu0IOm7mOiupOS4uiBgYWxsYFxuICBjb25zdCBzY29wZSA9IGdldFNjb3BlKCk7XG4gIC8vIOWvueS7u+S9leW/q+aNt+mUrumDvemcgOimgeWBmueahOWkhOeQhlxuICBpZiAoYXN0ZXJpc2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzdGVyaXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXN0ZXJpc2tbaV0uc2NvcGUgPT09IHNjb3BlICYmIChldmVudC50eXBlID09PSAna2V5ZG93bicgJiYgYXN0ZXJpc2tbaV0ua2V5ZG93biB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGFzdGVyaXNrW2ldLmtleXVwKSkge1xuICAgICAgICBldmVudEhhbmRsZXIoZXZlbnQsIGFzdGVyaXNrW2ldLCBzY29wZSwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGtleSDkuI3lnKggX2hhbmRsZXJzIOS4rei/lOWbnlxuICBpZiAoIShrZXkgaW4gX2hhbmRsZXJzKSkgcmV0dXJuO1xuICBjb25zdCBoYW5kbGVyS2V5ID0gX2hhbmRsZXJzW2tleV07XG4gIGNvbnN0IGtleUxlbiA9IGhhbmRsZXJLZXkubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleUxlbjsgaSsrKSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJyAmJiBoYW5kbGVyS2V5W2ldLmtleWRvd24gfHwgZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBoYW5kbGVyS2V5W2ldLmtleXVwKSB7XG4gICAgICBpZiAoaGFuZGxlcktleVtpXS5rZXkpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gaGFuZGxlcktleVtpXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNwbGl0S2V5XG4gICAgICAgIH0gPSByZWNvcmQ7XG4gICAgICAgIGNvbnN0IGtleVNob3J0Y3V0ID0gcmVjb3JkLmtleS5zcGxpdChzcGxpdEtleSk7XG4gICAgICAgIGNvbnN0IF9kb3duS2V5c0N1cnJlbnQgPSBbXTsgLy8g6K6w5b2V5b2T5YmN5oyJ6ZSu6ZSu5YC8XG4gICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwga2V5U2hvcnRjdXQubGVuZ3RoOyBhKyspIHtcbiAgICAgICAgICBfZG93bktleXNDdXJyZW50LnB1c2goY29kZShrZXlTaG9ydGN1dFthXSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfZG93bktleXNDdXJyZW50LnNvcnQoKS5qb2luKCcnKSA9PT0gX2Rvd25LZXlzLnNvcnQoKS5qb2luKCcnKSkge1xuICAgICAgICAgIC8vIOaJvuWIsOWkhOeQhuWGheWuuVxuICAgICAgICAgIGV2ZW50SGFuZGxlcihldmVudCwgcmVjb3JkLCBzY29wZSwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGhvdGtleXMoa2V5LCBvcHRpb24sIG1ldGhvZCkge1xuICBfZG93bktleXMgPSBbXTtcbiAgY29uc3Qga2V5cyA9IGdldEtleXMoa2V5KTsgLy8g6ZyA6KaB5aSE55CG55qE5b+r5o236ZSu5YiX6KGoXG4gIGxldCBtb2RzID0gW107XG4gIGxldCBzY29wZSA9ICdhbGwnOyAvLyBzY29wZem7mOiupOS4umFsbO+8jOaJgOacieiMg+WbtOmDveacieaViFxuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50OyAvLyDlv6vmjbfplK7kuovku7bnu5HlrproioLngrlcbiAgbGV0IGkgPSAwO1xuICBsZXQga2V5dXAgPSBmYWxzZTtcbiAgbGV0IGtleWRvd24gPSB0cnVlO1xuICBsZXQgc3BsaXRLZXkgPSAnKyc7XG4gIGxldCBjYXB0dXJlID0gZmFsc2U7XG4gIGxldCBzaW5nbGUgPSBmYWxzZTsgLy8g5Y2V5LiqY2FsbGJhY2tcblxuICAvLyDlr7nkuLrorr7lrprojIPlm7TnmoTliKTmlq1cbiAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBtZXRob2QgPSBvcHRpb247XG4gIH1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb24pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGlmIChvcHRpb24uc2NvcGUpIHNjb3BlID0gb3B0aW9uLnNjb3BlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKG9wdGlvbi5lbGVtZW50KSBlbGVtZW50ID0gb3B0aW9uLmVsZW1lbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAob3B0aW9uLmtleXVwKSBrZXl1cCA9IG9wdGlvbi5rZXl1cDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChvcHRpb24ua2V5ZG93biAhPT0gdW5kZWZpbmVkKSBrZXlkb3duID0gb3B0aW9uLmtleWRvd247IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAob3B0aW9uLmNhcHR1cmUgIT09IHVuZGVmaW5lZCkgY2FwdHVyZSA9IG9wdGlvbi5jYXB0dXJlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHR5cGVvZiBvcHRpb24uc3BsaXRLZXkgPT09ICdzdHJpbmcnKSBzcGxpdEtleSA9IG9wdGlvbi5zcGxpdEtleTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChvcHRpb24uc2luZ2xlID09PSB0cnVlKSBzaW5nbGUgPSB0cnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH1cbiAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSBzY29wZSA9IG9wdGlvbjtcblxuICAvLyDlpoLmnpzlj6rlhYHorrjljZXkuKpjYWxsYmFja++8jOWFiHVuYmluZFxuICBpZiAoc2luZ2xlKSB1bmJpbmQoa2V5LCBzY29wZSk7XG5cbiAgLy8g5a+55LqO5q+P5Liq5b+r5o236ZSu6L+b6KGM5aSE55CGXG4gIGZvciAoOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IGtleXNbaV0uc3BsaXQoc3BsaXRLZXkpOyAvLyDmjInplK7liJfooahcbiAgICBtb2RzID0gW107XG5cbiAgICAvLyDlpoLmnpzmmK/nu4TlkIjlv6vmjbfplK7lj5blvpfnu4TlkIjlv6vmjbfplK5cbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEpIG1vZHMgPSBnZXRNb2RzKF9tb2RpZmllciwga2V5KTtcblxuICAgIC8vIOWwhumdnuS/rumlsOmUrui9rOWMluS4uumUrueggVxuICAgIGtleSA9IGtleVtrZXkubGVuZ3RoIC0gMV07XG4gICAga2V5ID0ga2V5ID09PSAnKicgPyAnKicgOiBjb2RlKGtleSk7IC8vICrooajnpLrljLnphY3miYDmnInlv6vmjbfplK5cblxuICAgIC8vIOWIpOaWrWtleeaYr+WQpuWcqF9oYW5kbGVyc+S4re+8jOS4jeWcqOWwsei1i+S4gOS4quepuuaVsOe7hFxuICAgIGlmICghKGtleSBpbiBfaGFuZGxlcnMpKSBfaGFuZGxlcnNba2V5XSA9IFtdO1xuICAgIF9oYW5kbGVyc1trZXldLnB1c2goe1xuICAgICAga2V5dXAsXG4gICAgICBrZXlkb3duLFxuICAgICAgc2NvcGUsXG4gICAgICBtb2RzLFxuICAgICAgc2hvcnRjdXQ6IGtleXNbaV0sXG4gICAgICBtZXRob2QsXG4gICAgICBrZXk6IGtleXNbaV0sXG4gICAgICBzcGxpdEtleSxcbiAgICAgIGVsZW1lbnRcbiAgICB9KTtcbiAgfVxuICAvLyDlnKjlhajlsYBkb2N1bWVudOS4iuiuvue9ruW/q+aNt+mUrlxuICBpZiAodHlwZW9mIGVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdykge1xuICAgIGlmICghZWxlbWVudEV2ZW50TWFwLmhhcyhlbGVtZW50KSkge1xuICAgICAgY29uc3Qga2V5ZG93bkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZXZlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdy5ldmVudDtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKGV2ZW50LCBlbGVtZW50KTtcbiAgICAgIH07XG4gICAgICBjb25zdCBrZXl1cExpc3RlbnIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBldmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93LmV2ZW50O1xuICAgICAgICBkaXNwYXRjaChldmVudCwgZWxlbWVudCk7XG4gICAgICAgIGNsZWFyTW9kaWZpZXIoZXZlbnQpO1xuICAgICAgfTtcbiAgICAgIGVsZW1lbnRFdmVudE1hcC5zZXQoZWxlbWVudCwge1xuICAgICAgICBrZXlkb3duTGlzdGVuZXIsXG4gICAgICAgIGtleXVwTGlzdGVucixcbiAgICAgICAgY2FwdHVyZVxuICAgICAgfSk7XG4gICAgICBhZGRFdmVudChlbGVtZW50LCAna2V5ZG93bicsIGtleWRvd25MaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICBhZGRFdmVudChlbGVtZW50LCAna2V5dXAnLCBrZXl1cExpc3RlbnIsIGNhcHR1cmUpO1xuICAgIH1cbiAgICBpZiAoIXdpbkxpc3RlbmRGb2N1cykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgIF9kb3duS2V5cyA9IFtdO1xuICAgICAgfTtcbiAgICAgIHdpbkxpc3RlbmRGb2N1cyA9IHtcbiAgICAgICAgbGlzdGVuZXIsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH07XG4gICAgICBhZGRFdmVudCh3aW5kb3csICdmb2N1cycsIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXIoc2hvcnRjdXQpIHtcbiAgbGV0IHNjb3BlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnYWxsJztcbiAgT2JqZWN0LmtleXMoX2hhbmRsZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgY29uc3QgZGF0YUxpc3QgPSBfaGFuZGxlcnNba2V5XS5maWx0ZXIoaXRlbSA9PiBpdGVtLnNjb3BlID09PSBzY29wZSAmJiBpdGVtLnNob3J0Y3V0ID09PSBzaG9ydGN1dCk7XG4gICAgZGF0YUxpc3QuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEubWV0aG9kKSB7XG4gICAgICAgIGRhdGEubWV0aG9kKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyDplIDmr4Hkuovku7YsdW5iaW5k5LmL5ZCO5Yik5patZWxlbWVudOS4iuaYr+WQpui/mOaciemUruebmOW/q+aNt+mUru+8jOWmguaenOayoeacieenu+mZpOebkeWQrFxuZnVuY3Rpb24gcmVtb3ZlS2V5RXZlbnQoZWxlbWVudCkge1xuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKF9oYW5kbGVycykuZmxhdCgpO1xuICBjb25zdCBmaW5kaW5kZXggPSB2YWx1ZXMuZmluZEluZGV4KF9yZWY0ID0+IHtcbiAgICBsZXQge1xuICAgICAgZWxlbWVudDogZWxcbiAgICB9ID0gX3JlZjQ7XG4gICAgcmV0dXJuIGVsID09PSBlbGVtZW50O1xuICB9KTtcbiAgaWYgKGZpbmRpbmRleCA8IDApIHtcbiAgICBjb25zdCB7XG4gICAgICBrZXlkb3duTGlzdGVuZXIsXG4gICAgICBrZXl1cExpc3RlbnIsXG4gICAgICBjYXB0dXJlXG4gICAgfSA9IGVsZW1lbnRFdmVudE1hcC5nZXQoZWxlbWVudCkgfHwge307XG4gICAgaWYgKGtleWRvd25MaXN0ZW5lciAmJiBrZXl1cExpc3RlbnIpIHtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZW1lbnQsICdrZXl1cCcsIGtleXVwTGlzdGVuciwgY2FwdHVyZSk7XG4gICAgICByZW1vdmVFdmVudChlbGVtZW50LCAna2V5ZG93bicsIGtleWRvd25MaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICBlbGVtZW50RXZlbnRNYXAuZGVsZXRlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuICBpZiAodmFsdWVzLmxlbmd0aCA8PSAwIHx8IGVsZW1lbnRFdmVudE1hcC5zaXplIDw9IDApIHtcbiAgICAvLyDnp7vpmaTmiYDmnInnmoTlhYPntKDkuIrnmoTnm5HlkKxcbiAgICBjb25zdCBldmVudEtleXMgPSBPYmplY3Qua2V5cyhlbGVtZW50RXZlbnRNYXApO1xuICAgIGV2ZW50S2V5cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAga2V5ZG93bkxpc3RlbmVyLFxuICAgICAgICBrZXl1cExpc3RlbnIsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH0gPSBlbGVtZW50RXZlbnRNYXAuZ2V0KGVsKSB8fCB7fTtcbiAgICAgIGlmIChrZXlkb3duTGlzdGVuZXIgJiYga2V5dXBMaXN0ZW5yKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50KGVsLCAna2V5dXAnLCBrZXl1cExpc3RlbnIsIGNhcHR1cmUpO1xuICAgICAgICByZW1vdmVFdmVudChlbCwgJ2tleWRvd24nLCBrZXlkb3duTGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICBlbGVtZW50RXZlbnRNYXAuZGVsZXRlKGVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyDmuIXnqbogZWxlbWVudEV2ZW50TWFwXG4gICAgZWxlbWVudEV2ZW50TWFwLmNsZWFyKCk7XG4gICAgLy8g5riF56m6IF9oYW5kbGVyc1xuICAgIE9iamVjdC5rZXlzKF9oYW5kbGVycykuZm9yRWFjaChrZXkgPT4gZGVsZXRlIF9oYW5kbGVyc1trZXldKTtcbiAgICAvLyDnp7vpmaR3aW5kb3fkuIrnmoRmb2N1c+ebkeWQrFxuICAgIGlmICh3aW5MaXN0ZW5kRm9jdXMpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGlzdGVuZXIsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH0gPSB3aW5MaXN0ZW5kRm9jdXM7XG4gICAgICByZW1vdmVFdmVudCh3aW5kb3csICdmb2N1cycsIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgIHdpbkxpc3RlbmRGb2N1cyA9IG51bGw7XG4gICAgfVxuICB9XG59XG5jb25zdCBfYXBpID0ge1xuICBnZXRQcmVzc2VkS2V5U3RyaW5nLFxuICBzZXRTY29wZSxcbiAgZ2V0U2NvcGUsXG4gIGRlbGV0ZVNjb3BlLFxuICBnZXRQcmVzc2VkS2V5Q29kZXMsXG4gIGdldEFsbEtleUNvZGVzLFxuICBpc1ByZXNzZWQsXG4gIGZpbHRlcixcbiAgdHJpZ2dlcixcbiAgdW5iaW5kLFxuICBrZXlNYXA6IF9rZXlNYXAsXG4gIG1vZGlmaWVyOiBfbW9kaWZpZXIsXG4gIG1vZGlmaWVyTWFwXG59O1xuZm9yIChjb25zdCBhIGluIF9hcGkpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfYXBpLCBhKSkge1xuICAgIGhvdGtleXNbYV0gPSBfYXBpW2FdO1xuICB9XG59XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc3QgX2hvdGtleXMgPSB3aW5kb3cuaG90a2V5cztcbiAgaG90a2V5cy5ub0NvbmZsaWN0ID0gZGVlcCA9PiB7XG4gICAgaWYgKGRlZXAgJiYgd2luZG93LmhvdGtleXMgPT09IGhvdGtleXMpIHtcbiAgICAgIHdpbmRvdy5ob3RrZXlzID0gX2hvdGtleXM7XG4gICAgfVxuICAgIHJldHVybiBob3RrZXlzO1xuICB9O1xuICB3aW5kb3cuaG90a2V5cyA9IGhvdGtleXM7XG59XG5cbmV4cG9ydCB7IGhvdGtleXMgYXMgZGVmYXVsdCB9O1xuIl0sIm5hbWVzIjpbImRlbGF5IiwiY2FsbGJhY2siLCJvcHRpb25zIiwiX3JlZiIsIl9yZWYkbm9UcmFpbGluZyIsIm5vVHJhaWxpbmciLCJfcmVmJG5vTGVhZGluZyIsIm5vTGVhZGluZyIsIl9yZWYkZGVib3VuY2VNb2RlIiwiZGVib3VuY2VNb2RlIiwidW5kZWZpbmVkIiwidGltZW91dElEIiwiY2FuY2VsbGVkIiwibGFzdEV4ZWMiLCJjbGVhckV4aXN0aW5nVGltZW91dCIsImNsZWFyVGltZW91dCIsImNhbmNlbCIsIl9yZWYyIiwiX3JlZjIkdXBjb21pbmdPbmx5IiwidXBjb21pbmdPbmx5Iiwid3JhcHBlciIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmd1bWVudHNfIiwiQXJyYXkiLCJfa2V5Iiwic2VsZiIsImVsYXBzZWQiLCJEYXRlIiwibm93IiwiZXhlYyIsImFwcGx5IiwiY2xlYXIiLCJzZXRUaW1lb3V0IiwiX3JlZiRhdEJlZ2luIiwiYXRCZWdpbiIsInRocm90dGxlIiwiVHlwZVJlZ2lzdHJ5IiwiaW5pdGlhbCIsInJlZ2lzdGVyZWRUeXBlcyIsInR5cGUiLCJpdGVtIiwicmVnaXN0ZXIiLCJLZXlFeHRyYWN0b3JzIiwicmVnaXN0ZXJEZWZhdWx0IiwiZWwiLCJnZXRBdHRyaWJ1dGUiLCJJbnB1dFJlYWRlcnMiLCJ2YWx1ZSIsImNoZWNrZWQiLCJnZXRTZWxlY3RWYWx1ZSIsImVsZW0iLCJvcHRpb24iLCJpIiwiaW5kZXgiLCJzZWxlY3RlZEluZGV4Iiwib25lIiwidmFsdWVzIiwibWF4Iiwic2VsZWN0ZWQiLCJkaXNhYmxlZCIsInBhcmVudE5vZGUiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwiS2V5QXNzaWdubWVudFZhbGlkYXRvcnMiLCJrZXlTcGxpdHRlciIsImtleSIsIm1hdGNoZXMiLCJtYXRjaCIsImxhc3RLZXkiLCJpbmRleE9mIiwicG9wIiwiZ2V0RWxlbWVudFR5cGUiLCJ0eXBlQXR0ciIsImdldElucHV0RWxlbWVudHMiLCJlbGVtZW50IiwicHJvdG90eXBlIiwiZmlsdGVyIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJteVR5cGUiLCJleHRyYWN0b3IiLCJrZXlFeHRyYWN0b3JzIiwiZ2V0IiwiaWRlbnRpZmllciIsImZvdW5kSW5JbmNsdWRlIiwiaW5jbHVkZSIsImZvdW5kSW5FeGNsdWRlIiwiZXhjbHVkZSIsImZvdW5kSW5JZ25vcmVkIiwicmVqZWN0IiwiaWdub3JlZFR5cGVzIiwic2VsZWN0b3IiLCJhc3NpZ25LZXlWYWx1ZSIsIm9iaiIsImtleWNoYWluIiwic2hpZnQiLCJpc0FycmF5Iiwic2VyaWFsaXplIiwiZGF0YSIsImRlZmF1bHRLZXlTcGxpdHRlciIsImlucHV0UmVhZGVycyIsImtleUFzc2lnbm1lbnRWYWxpZGF0b3JzIiwiZm9yRWFjaCIsImtleUV4dHJhY3RvciIsImlucHV0UmVhZGVyIiwidmFsaWRLZXlBc3NpZ25tZW50IiwiSW5wdXRXcml0ZXJzIiwiaW5kZXRlcm1pbmF0ZSIsInRvU3RyaW5nIiwic2V0U2VsZWN0VmFsdWUiLCJtYWtlQXJyYXkiLCJhcnIiLCJyZXQiLCJvcHRpb25TZXQiLCJzZXRBdHRyaWJ1dGUiLCJrZXlKb2luZXIiLCJwYXJlbnRLZXkiLCJjaGlsZEtleSIsImZsYXR0ZW5EYXRhIiwiZmxhdERhdGEiLCJkZWZhdWx0S2V5Sm9pbmVyIiwia2V5TmFtZSIsImhhc093blByb3BlcnR5IiwiaGFzaCIsImFzc2lnbiIsImRlc2VyaWFsaXplIiwiZm9ybSIsImZsYXR0ZW5lZERhdGEiLCJpbnB1dFdyaXRlcnMiLCJpbnB1dFdyaXRlciJdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5IQVNIX1JFRl82OGEyZDVlN2JiYWQyOTcwLmpzLm1hcCJ9
