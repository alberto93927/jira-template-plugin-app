var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
            fail(e);
            return next();
          });
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}
var extendStatics, __assign, __createBinding, __setModuleDefault, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    __setModuleDefault = Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    };
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources
    };
  }
});

// node_modules/@forge/bridge/out/router/targets.js
var require_targets = __commonJS({
  "node_modules/@forge/bridge/out/router/targets.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationTarget = void 0;
    exports.NavigationTarget = {
      ContentView: "contentView",
      ContentEdit: "contentEdit",
      ContentList: "contentList",
      SpaceView: "spaceView",
      Module: "module",
      UserProfile: "userProfile",
      Dashboard: "dashboard",
      Issue: "issue",
      ProjectSettingsDetails: "projectSettingsDetails"
    };
  }
});

// node_modules/@forge/bridge/out/errors.js
var require_errors = __commonJS({
  "node_modules/@forge/bridge/out/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BridgeAPIError = void 0;
    var BridgeAPIError = class extends Error {
    };
    exports.BridgeAPIError = BridgeAPIError;
  }
});

// node_modules/@forge/bridge/out/bridge.js
var require_bridge = __commonJS({
  "node_modules/@forge/bridge/out/bridge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCallBridge = void 0;
    var errors_1 = require_errors();
    function isBridgeAvailable(bridge) {
      return !!(bridge === null || bridge === void 0 ? void 0 : bridge.callBridge);
    }
    var getCallBridge = () => {
      if (!isBridgeAvailable(window.__bridge)) {
        throw new errors_1.BridgeAPIError(`
      Unable to establish a connection with the Custom UI bridge.
      If you are trying to run your app locally, Forge apps only work in the context of Atlassian products. Refer to https://go.atlassian.com/forge-tunneling-with-custom-ui for how to tunnel when using a local development server.
    `);
      }
      return window.__bridge.callBridge;
    };
    exports.getCallBridge = getCallBridge;
  }
});

// node_modules/@forge/bridge/out/utils/index.js
var require_utils = __commonJS({
  "node_modules/@forge/bridge/out/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withRateLimiter = void 0;
    var errors_1 = require_errors();
    var withRateLimiter = (wrappedFn, maxOps, intervalInMs, exceededErrorMessage) => {
      let start = Date.now();
      let numOps = 0;
      return async (...args) => {
        const now = Date.now();
        const elapsed = now - start;
        if (elapsed > intervalInMs) {
          start = now;
          numOps = 0;
        }
        if (numOps >= maxOps) {
          throw new errors_1.BridgeAPIError(exceededErrorMessage || "Too many invocations.");
        }
        numOps = numOps + 1;
        return wrappedFn(...args);
      };
    };
    exports.withRateLimiter = withRateLimiter;
  }
});

// node_modules/@forge/bridge/out/invoke/invoke.js
var require_invoke = __commonJS({
  "node_modules/@forge/bridge/out/invoke/invoke.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeInvoke = exports.invoke = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var utils_1 = require_utils();
    var callBridge = (0, bridge_1.getCallBridge)();
    var validatePayload = (payload) => {
      if (!payload)
        return;
      if (Object.values(payload).some((val) => typeof val === "function")) {
        throw new errors_1.BridgeAPIError("Passing functions as part of the payload is not supported!");
      }
    };
    var _invoke = (functionKey, payload) => {
      if (typeof functionKey !== "string") {
        throw new errors_1.BridgeAPIError("functionKey must be a string!");
      }
      validatePayload(payload);
      return callBridge("invoke", { functionKey, payload });
    };
    exports.invoke = (0, utils_1.withRateLimiter)(_invoke, 500, 1e3 * 25, "Resolver calls are rate limited at 500req/25s");
    function makeInvoke() {
      return exports.invoke;
    }
    exports.makeInvoke = makeInvoke;
  }
});

// node_modules/@forge/bridge/out/invoke/index.js
var require_invoke2 = __commonJS({
  "node_modules/@forge/bridge/out/invoke/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_invoke(), exports);
  }
});

// node_modules/@forge/bridge/out/invoke-endpoint/invoke-endpoint.js
var require_invoke_endpoint = __commonJS({
  "node_modules/@forge/bridge/out/invoke-endpoint/invoke-endpoint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._invokeEndpointFn = exports.InvokeType = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var utils_1 = require_utils();
    var MAX_NUM_OPERATIONS = 500;
    var OPERATION_INTERVAL_SEC = 25;
    var OPERATION_INTERVAL_MS = 1e3 * OPERATION_INTERVAL_SEC;
    var InvokeType;
    (function(InvokeType2) {
      InvokeType2["REMOTE"] = "Remote";
      InvokeType2["SERVICE"] = "Container";
    })(InvokeType = exports.InvokeType || (exports.InvokeType = {}));
    var callBridge = (0, bridge_1.getCallBridge)();
    var validatePayload = (payload) => {
      if (!payload)
        return;
      if (Object.values(payload).some((val) => typeof val === "function")) {
        throw new errors_1.BridgeAPIError("Passing functions as part of the payload is not supported!");
      }
    };
    var _setupInvokeEndpointFn = (invokeType) => async (input) => {
      validatePayload(input);
      const callBridgePayload = {
        ...input,
        invokeType: `ui-${invokeType.toLowerCase()}-fetch`
      };
      const bridgeResponse = await callBridge("invoke", callBridgePayload);
      const { success, payload, error } = bridgeResponse !== null && bridgeResponse !== void 0 ? bridgeResponse : {};
      const response = { ...success ? payload : error };
      if (response && response.headers) {
        for (const header in response.headers) {
          if (Array.isArray(response.headers[header])) {
            response.headers[header] = response.headers[header].join(",");
          }
        }
      }
      return response;
    };
    var _invokeEndpointFn = (invokeType) => {
      const invokeEndpointFn = _setupInvokeEndpointFn(invokeType);
      return (0, utils_1.withRateLimiter)(invokeEndpointFn, MAX_NUM_OPERATIONS, OPERATION_INTERVAL_MS, `${invokeType} invocation calls are rate limited at ${MAX_NUM_OPERATIONS}/${OPERATION_INTERVAL_SEC}s`);
    };
    exports._invokeEndpointFn = _invokeEndpointFn;
  }
});

// node_modules/@forge/bridge/out/invoke-endpoint/invoke-remote.js
var require_invoke_remote = __commonJS({
  "node_modules/@forge/bridge/out/invoke-endpoint/invoke-remote.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invokeRemote = void 0;
    var invoke_endpoint_1 = require_invoke_endpoint();
    var invokeRemote = (input) => {
      const invokeEndpoint = (0, invoke_endpoint_1._invokeEndpointFn)(invoke_endpoint_1.InvokeType.REMOTE);
      return invokeEndpoint(input);
    };
    exports.invokeRemote = invokeRemote;
  }
});

// node_modules/@forge/bridge/out/invoke-endpoint/invoke-service.js
var require_invoke_service = __commonJS({
  "node_modules/@forge/bridge/out/invoke-endpoint/invoke-service.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invokeService = void 0;
    var invoke_endpoint_1 = require_invoke_endpoint();
    var invokeService = (input) => {
      const invokeEndpoint = (0, invoke_endpoint_1._invokeEndpointFn)(invoke_endpoint_1.InvokeType.SERVICE);
      return invokeEndpoint(input);
    };
    exports.invokeService = invokeService;
  }
});

// node_modules/@forge/bridge/out/invoke-endpoint/index.js
var require_invoke_endpoint2 = __commonJS({
  "node_modules/@forge/bridge/out/invoke-endpoint/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_invoke_remote(), exports);
    tslib_1.__exportStar(require_invoke_service(), exports);
  }
});

// node_modules/@forge/bridge/out/view/submit.js
var require_submit = __commonJS({
  "node_modules/@forge/bridge/out/view/submit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.submit = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var submit = async (payload) => {
      const success = await callBridge("submit", payload);
      if (success === false) {
        throw new errors_1.BridgeAPIError("this resource's view is not submittable.");
      }
    };
    exports.submit = submit;
  }
});

// node_modules/@forge/bridge/out/view/close.js
var require_close = __commonJS({
  "node_modules/@forge/bridge/out/view/close.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.close = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var close = async (payload) => {
      try {
        const success = await callBridge("close", payload);
        if (success === false) {
          throw new errors_1.BridgeAPIError("this resource's view is not closable.");
        }
      } catch (e) {
        throw new errors_1.BridgeAPIError("this resource's view is not closable.");
      }
    };
    exports.close = close;
  }
});

// node_modules/@forge/bridge/out/view/open.js
var require_open = __commonJS({
  "node_modules/@forge/bridge/out/view/open.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.open = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var open = async () => {
      try {
        const success = await callBridge("open");
        if (success === false) {
          throw new errors_1.BridgeAPIError("this resource's view is not openable.");
        }
      } catch (e) {
        throw new errors_1.BridgeAPIError("this resource's view is not openable.");
      }
    };
    exports.open = open;
  }
});

// node_modules/@forge/bridge/out/view/refresh.js
var require_refresh = __commonJS({
  "node_modules/@forge/bridge/out/view/refresh.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.refresh = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var refresh = async (payload) => {
      const success = await callBridge("refresh", payload);
      if (success === false) {
        throw new errors_1.BridgeAPIError("this resource's view is not refreshable.");
      }
    };
    exports.refresh = refresh;
  }
});

// node_modules/@forge/bridge/out/view/createHistory.js
var require_createHistory = __commonJS({
  "node_modules/@forge/bridge/out/view/createHistory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createHistory = void 0;
    var bridge_1 = require_bridge();
    var callBridge = (0, bridge_1.getCallBridge)();
    var createHistory = async () => {
      const history = await callBridge("createHistory");
      history.listen((location) => {
        history.location = location;
      });
      return history;
    };
    exports.createHistory = createHistory;
  }
});

// node_modules/@forge/i18n/out/constants.js
var require_constants = __commonJS({
  "node_modules/@forge/i18n/out/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FORGE_SUPPORTED_LOCALE_CODES = exports.I18N_BUNDLE_FOLDER_NAME = exports.I18N_INFO_FILE_NAME = void 0;
    exports.I18N_INFO_FILE_NAME = "i18n-info.json";
    exports.I18N_BUNDLE_FOLDER_NAME = "__LOCALES__";
    exports.FORGE_SUPPORTED_LOCALE_CODES = [
      "zh-CN",
      "zh-TW",
      "cs-CZ",
      "da-DK",
      "nl-NL",
      "en-US",
      "en-GB",
      "et-EE",
      "fi-FI",
      "fr-FR",
      "de-DE",
      "hu-HU",
      "is-IS",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "no-NO",
      "pl-PL",
      "pt-BR",
      "pt-PT",
      "ro-RO",
      "ru-RU",
      "sk-SK",
      "tr-TR",
      "es-ES",
      "sv-SE"
    ];
  }
});

// node_modules/@forge/i18n/out/translationsGetter.js
var require_translationsGetter = __commonJS({
  "node_modules/@forge/i18n/out/translationsGetter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TranslationsGetter = exports.TranslationGetterError = void 0;
    var pushIfNotExists = (array, item) => {
      if (!array.includes(item)) {
        array.push(item);
      }
    };
    var TranslationGetterError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "TranslationGetterError";
      }
    };
    exports.TranslationGetterError = TranslationGetterError;
    var TranslationsGetter = class {
      resourcesAccessor;
      i18nInfoConfig = null;
      translationResources = /* @__PURE__ */ new Map();
      constructor(resourcesAccessor) {
        this.resourcesAccessor = resourcesAccessor;
      }
      async getTranslations(locale, options = { fallback: true }) {
        const i18nInfoConfig = await this.getI18nInfoConfig();
        const { fallback } = options;
        if (!fallback) {
          let translationResource;
          if (i18nInfoConfig.locales.includes(locale)) {
            translationResource = await this.getTranslationResource(locale);
          }
          return {
            translations: translationResource ?? null,
            locale
          };
        }
        for (const targetLocale of this.getLocaleLookupOrder(locale, i18nInfoConfig)) {
          const translationResource = await this.getTranslationResource(targetLocale);
          if (translationResource) {
            return {
              translations: translationResource,
              locale: targetLocale
            };
          }
        }
        return {
          translations: null,
          locale
        };
      }
      async getTranslationsByLocaleLookupOrder(locale) {
        const i18nInfoConfig = await this.getI18nInfoConfig();
        const lookupOrder = this.getLocaleLookupOrder(locale, i18nInfoConfig);
        return await Promise.all(lookupOrder.map(async (targetLocale) => {
          const translationResource = await this.getTranslationResource(targetLocale);
          return {
            locale: targetLocale,
            translations: translationResource
          };
        }));
      }
      reset() {
        this.i18nInfoConfig = null;
        this.translationResources.clear();
      }
      async getTranslationResource(locale) {
        let resource = this.translationResources.get(locale);
        if (!resource) {
          try {
            resource = await this.resourcesAccessor.getTranslationResource(locale);
            this.translationResources.set(locale, resource);
          } catch (error) {
            if (error instanceof TranslationGetterError) {
              throw error;
            }
            throw new TranslationGetterError(`Failed to get translation resource for locale: ${locale}`);
          }
        }
        return resource;
      }
      async getI18nInfoConfig() {
        if (!this.i18nInfoConfig) {
          try {
            this.i18nInfoConfig = await this.resourcesAccessor.getI18nInfoConfig();
          } catch (error) {
            if (error instanceof TranslationGetterError) {
              throw error;
            }
            throw new TranslationGetterError("Failed to get i18n info config");
          }
        }
        return this.i18nInfoConfig;
      }
      getLocaleLookupOrder(locale, config) {
        const { locales, fallback } = config;
        const lookupOrder = [locale];
        const fallbackLocales = fallback[locale];
        if (fallbackLocales && Array.isArray(fallbackLocales) && fallbackLocales.length > 0) {
          lookupOrder.push(...fallbackLocales);
        }
        pushIfNotExists(lookupOrder, config.fallback.default);
        return lookupOrder.filter((locale2) => locales.includes(locale2));
      }
    };
    exports.TranslationsGetter = TranslationsGetter;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// node_modules/@forge/i18n/out/translationValueGetter.js
var require_translationValueGetter = __commonJS({
  "node_modules/@forge/i18n/out/translationValueGetter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTranslationValueFromContent = exports.getTranslationValue = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var get_1 = tslib_1.__importDefault(require_get());
    var getTranslationValue = (translationLookup, i18nKey, locale) => {
      const translation = translationLookup[locale];
      if (!translation) {
        return null;
      }
      return (0, exports.getTranslationValueFromContent)(translation, i18nKey);
    };
    exports.getTranslationValue = getTranslationValue;
    var getTranslationValueFromContent = (translationContent, i18nKey) => {
      let translationValue = translationContent[i18nKey];
      if (!translationValue) {
        const keyTokens = i18nKey.split(".");
        if (keyTokens.length > 1) {
          translationValue = (0, get_1.default)(translationContent, keyTokens, null);
        }
      }
      return typeof translationValue === "string" ? translationValue : null;
    };
    exports.getTranslationValueFromContent = getTranslationValueFromContent;
  }
});

// node_modules/@forge/i18n/out/translator.js
var require_translator = __commonJS({
  "node_modules/@forge/i18n/out/translator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Translator = void 0;
    var translationValueGetter_1 = require_translationValueGetter();
    var Translator = class {
      locale;
      translationsGetter;
      localeLookupOrderedTranslations = null;
      cache = /* @__PURE__ */ new Map();
      constructor(locale, translationsGetter) {
        this.locale = locale;
        this.translationsGetter = translationsGetter;
      }
      async init() {
        this.localeLookupOrderedTranslations = await this.translationsGetter.getTranslationsByLocaleLookupOrder(this.locale);
      }
      translate(i18nKey) {
        if (!this.localeLookupOrderedTranslations) {
          throw new Error("TranslationLookup not initialized");
        }
        let result = this.cache.get(i18nKey);
        if (result === void 0) {
          for (const { translations } of this.localeLookupOrderedTranslations) {
            const translationValue = (0, translationValueGetter_1.getTranslationValueFromContent)(translations, i18nKey);
            if (translationValue !== null) {
              result = translationValue;
              break;
            }
          }
          result = result ?? null;
          this.cache.set(i18nKey, result);
        }
        return result;
      }
    };
    exports.Translator = Translator;
  }
});

// node_modules/@forge/i18n/out/ensureLocale.js
var require_ensureLocale = __commonJS({
  "node_modules/@forge/i18n/out/ensureLocale.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ensureLocale = void 0;
    var constants_1 = require_constants();
    var forgeSupportedLocaleCodesSet = new Set(constants_1.FORGE_SUPPORTED_LOCALE_CODES);
    var localeFallbacks = {
      "en-UK": "en-GB",
      "nb-NO": "no-NO"
    };
    var languageToLocaleCodeMap = constants_1.FORGE_SUPPORTED_LOCALE_CODES.reduce((agg, code) => {
      const [lng] = code.split("-");
      if (!agg[lng]) {
        agg[lng] = code;
      }
      return agg;
    }, {
      nb: "no-NO",
      pt: "pt-PT"
    });
    var ensureLocale = (rawLocale) => {
      const locale = rawLocale.replace("_", "-");
      if (forgeSupportedLocaleCodesSet.has(locale)) {
        return locale;
      }
      return languageToLocaleCodeMap[locale] ?? localeFallbacks[locale] ?? null;
    };
    exports.ensureLocale = ensureLocale;
  }
});

// node_modules/@forge/i18n/out/moduleI18nHelper.js
var require_moduleI18nHelper = __commonJS({
  "node_modules/@forge/i18n/out/moduleI18nHelper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getI18nSupportedModuleEntries = void 0;
    var isObject = (value) => {
      return typeof value === "object" && value !== null && !Array.isArray(value);
    };
    var isI18nValue = (value) => {
      return typeof value?.i18n === "string";
    };
    var isConnectModuleKey = (moduleKey) => moduleKey.startsWith("connect-");
    var isCoreModuleKey = (moduleKey) => moduleKey.startsWith("core:");
    var getI18nKeysFromObject = (obj) => {
      const visited = /* @__PURE__ */ new Set();
      const visit = (value, i18nPath) => {
        if (!isObject(value) || visited.has(value)) {
          return [];
        }
        visited.add(value);
        return Object.entries(value).flatMap(([propKey, propValue]) => {
          const currentPath = [...i18nPath, propKey];
          if (isI18nValue(propValue)) {
            return [{ propertyPath: currentPath, key: propValue.i18n }];
          } else if (Array.isArray(propValue)) {
            return propValue.flatMap((item) => visit(item, currentPath));
          }
          return visit(propValue, currentPath);
        });
      };
      return visit(obj, []);
    };
    var getI18nSupportedModuleEntries = (modules) => {
      return Object.entries(modules).flatMap(([moduleKey, moduleEntries]) => {
        if (!isConnectModuleKey(moduleKey) && !isCoreModuleKey(moduleKey) && moduleEntries && Array.isArray(moduleEntries) && moduleEntries.length > 0) {
          return moduleEntries.map((moduleEntry) => [moduleEntry, moduleKey]);
        }
        return [];
      });
    };
    exports.getI18nSupportedModuleEntries = getI18nSupportedModuleEntries;
    var extractI18nKeysFromModules = (modules) => {
      const i18nKeys = /* @__PURE__ */ new Set();
      for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
        const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
        for (const { key } of i18nKeysForEntryValue) {
          i18nKeys.add(key);
        }
      }
      return i18nKeys.size > 0 ? Array.from(i18nKeys) : [];
    };
    exports.extractI18nKeysFromModules = extractI18nKeysFromModules;
    var extractI18nPropertiesFromModules = (modules) => {
      const moduleI18nProperties = [];
      for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
        const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
        for (const i18nObj of i18nKeysForEntryValue) {
          moduleI18nProperties.push({ moduleName: moduleEntry[1], ...i18nObj });
        }
      }
      return moduleI18nProperties;
    };
    exports.extractI18nPropertiesFromModules = extractI18nPropertiesFromModules;
  }
});

// node_modules/@forge/i18n/out/types.js
var require_types = __commonJS({
  "node_modules/@forge/i18n/out/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@forge/i18n/out/index.js
var require_out = __commonJS({
  "node_modules/@forge/i18n/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getI18nSupportedModuleEntries = exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getTranslationValue = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_constants(), exports);
    tslib_1.__exportStar(require_translationsGetter(), exports);
    tslib_1.__exportStar(require_translator(), exports);
    tslib_1.__exportStar(require_ensureLocale(), exports);
    var translationValueGetter_1 = require_translationValueGetter();
    Object.defineProperty(exports, "getTranslationValue", { enumerable: true, get: function() {
      return translationValueGetter_1.getTranslationValue;
    } });
    var moduleI18nHelper_1 = require_moduleI18nHelper();
    Object.defineProperty(exports, "extractI18nKeysFromModules", { enumerable: true, get: function() {
      return moduleI18nHelper_1.extractI18nKeysFromModules;
    } });
    Object.defineProperty(exports, "extractI18nPropertiesFromModules", { enumerable: true, get: function() {
      return moduleI18nHelper_1.extractI18nPropertiesFromModules;
    } });
    Object.defineProperty(exports, "getI18nSupportedModuleEntries", { enumerable: true, get: function() {
      return moduleI18nHelper_1.getI18nSupportedModuleEntries;
    } });
    tslib_1.__exportStar(require_types(), exports);
  }
});

// node_modules/@forge/bridge/out/view/getContext.js
var require_getContext = __commonJS({
  "node_modules/@forge/bridge/out/view/getContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getContext = void 0;
    var bridge_1 = require_bridge();
    var i18n_1 = require_out();
    var callBridge = (0, bridge_1.getCallBridge)();
    var getContext = async () => {
      var _a;
      const context = await callBridge("getContext");
      const locale = context === null || context === void 0 ? void 0 : context.locale;
      if (locale) {
        context.locale = (_a = (0, i18n_1.ensureLocale)(locale)) !== null && _a !== void 0 ? _a : locale;
      }
      return context;
    };
    exports.getContext = getContext;
  }
});

// node_modules/@forge/bridge/out/view/changeWindowTitle.js
var require_changeWindowTitle = __commonJS({
  "node_modules/@forge/bridge/out/view/changeWindowTitle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.changeWindowTitle = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var changeWindowTitle = async (title) => {
      try {
        await callBridge("changeWindowTitle", title);
      } catch (e) {
        throw new errors_1.BridgeAPIError("the window title wasn't changed due to error.");
      }
    };
    exports.changeWindowTitle = changeWindowTitle;
  }
});

// node_modules/@forge/bridge/out/view/theme.js
var require_theme = __commonJS({
  "node_modules/@forge/bridge/out/view/theme.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.theme = void 0;
    var bridge_1 = require_bridge();
    var callBridge = (0, bridge_1.getCallBridge)();
    exports.theme = {
      enable: () => callBridge("enableTheming")
    };
  }
});

// node_modules/@forge/bridge/out/utils/blobParser.js
var require_blobParser = __commonJS({
  "node_modules/@forge/bridge/out/utils/blobParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.blobToBase64 = exports.base64ToBlob = void 0;
    var base64ToBlob = (b64string, mimeType) => {
      if (!b64string) {
        return null;
      }
      const base64Data = b64string.includes(";base64") ? b64string.split(",")[1] : b64string;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    };
    exports.base64ToBlob = base64ToBlob;
    var blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    exports.blobToBase64 = blobToBase64;
  }
});

// node_modules/@forge/bridge/out/events/serialiseBlob.js
var require_serialiseBlob = __commonJS({
  "node_modules/@forge/bridge/out/events/serialiseBlob.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.containsSerialisedBlobs = exports.containsBlobs = exports.deserialiseBlobsInPayload = exports.serialiseBlobsInPayload = void 0;
    var blobParser_1 = require_blobParser();
    var isPlainObject = (value) => {
      if (typeof value !== "object" || value === null)
        return false;
      if (Object.prototype.toString.call(value) !== "[object Object]")
        return false;
      const proto = Object.getPrototypeOf(value);
      if (proto === null)
        return true;
      const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
    };
    var blobToBase64WithMetadata = async (blob) => {
      const base64Data = await (0, blobParser_1.blobToBase64)(blob);
      return {
        data: base64Data,
        type: blob.type
      };
    };
    var base64WithMetadataToBlob = (metadata) => {
      return (0, blobParser_1.base64ToBlob)(metadata.data, metadata.type);
    };
    var serialiseBlobsInPayload = async (payload) => {
      if (payload instanceof Blob) {
        const blobData = await blobToBase64WithMetadata(payload);
        return {
          ...blobData,
          __isBlobData: true
        };
      }
      if (Array.isArray(payload)) {
        return Promise.all(payload.map((item) => (0, exports.serialiseBlobsInPayload)(item)));
      }
      if (payload && isPlainObject(payload)) {
        const entries = await Promise.all(Object.entries(payload).map(async ([key, value]) => [key, await (0, exports.serialiseBlobsInPayload)(value)]));
        return Object.fromEntries(entries);
      }
      return payload;
    };
    exports.serialiseBlobsInPayload = serialiseBlobsInPayload;
    var deserialiseBlobsInPayload = (payload) => {
      if (payload && isPlainObject(payload) && "__isBlobData" in payload) {
        const typedData = payload;
        return base64WithMetadataToBlob({
          data: typedData.data,
          type: typedData.type
        });
      }
      if (Array.isArray(payload)) {
        return payload.map((item) => (0, exports.deserialiseBlobsInPayload)(item));
      }
      if (payload && isPlainObject(payload)) {
        const result = {};
        for (const [key, value] of Object.entries(payload)) {
          result[key] = (0, exports.deserialiseBlobsInPayload)(value);
        }
        return result;
      }
      return payload;
    };
    exports.deserialiseBlobsInPayload = deserialiseBlobsInPayload;
    var containsBlobs = (payload) => {
      if (payload instanceof Blob) {
        return true;
      }
      if (Array.isArray(payload)) {
        return payload.some((item) => (0, exports.containsBlobs)(item));
      }
      if (payload && isPlainObject(payload)) {
        return Object.values(payload).some((value) => (0, exports.containsBlobs)(value));
      }
      return false;
    };
    exports.containsBlobs = containsBlobs;
    var containsSerialisedBlobs = (payload) => {
      if (payload && isPlainObject(payload) && "__isBlobData" in payload) {
        return true;
      }
      if (Array.isArray(payload)) {
        return payload.some((item) => (0, exports.containsSerialisedBlobs)(item));
      }
      if (payload && isPlainObject(payload)) {
        return Object.values(payload).some((value) => (0, exports.containsSerialisedBlobs)(value));
      }
      return false;
    };
    exports.containsSerialisedBlobs = containsSerialisedBlobs;
  }
});

// node_modules/@forge/bridge/out/events/events.js
var require_events = __commonJS({
  "node_modules/@forge/bridge/out/events/events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.events = void 0;
    var bridge_1 = require_bridge();
    var serialiseBlob_1 = require_serialiseBlob();
    var callBridge = (0, bridge_1.getCallBridge)();
    var emit = async (event, payload) => {
      let newPayload = payload;
      if ((0, serialiseBlob_1.containsBlobs)(payload)) {
        newPayload = await (0, serialiseBlob_1.serialiseBlobsInPayload)(payload);
      }
      return callBridge("emit", { event, payload: newPayload });
    };
    var on = (event, callback) => {
      const wrappedCallback = (payload) => {
        let newPayload = payload;
        if ((0, serialiseBlob_1.containsSerialisedBlobs)(payload)) {
          newPayload = (0, serialiseBlob_1.deserialiseBlobsInPayload)(payload);
        }
        return callback(newPayload);
      };
      return callBridge("on", { event, callback: wrappedCallback });
    };
    exports.events = {
      emit,
      on
    };
  }
});

// node_modules/@forge/bridge/out/view/emitReadyEvent.js
var require_emitReadyEvent = __commonJS({
  "node_modules/@forge/bridge/out/view/emitReadyEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.emitReadyEvent = void 0;
    var events_1 = require_events();
    var view_1 = require_view();
    var EXTENSION_READY = "EXTENSION_READY";
    var emitReadyEvent = async () => {
      const context = await view_1.view.getContext();
      await events_1.events.emit(EXTENSION_READY, {
        localId: context.localId
      });
    };
    exports.emitReadyEvent = emitReadyEvent;
  }
});

// node_modules/@forge/bridge/out/view/view.js
var require_view = __commonJS({
  "node_modules/@forge/bridge/out/view/view.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.view = void 0;
    var submit_1 = require_submit();
    var close_1 = require_close();
    var open_1 = require_open();
    var refresh_1 = require_refresh();
    var createHistory_1 = require_createHistory();
    var getContext_1 = require_getContext();
    var changeWindowTitle_1 = require_changeWindowTitle();
    var theme_1 = require_theme();
    var emitReadyEvent_1 = require_emitReadyEvent();
    exports.view = {
      submit: submit_1.submit,
      close: close_1.close,
      open: open_1.open,
      refresh: refresh_1.refresh,
      createHistory: createHistory_1.createHistory,
      getContext: getContext_1.getContext,
      theme: theme_1.theme,
      changeWindowTitle: changeWindowTitle_1.changeWindowTitle,
      emitReadyEvent: emitReadyEvent_1.emitReadyEvent
    };
  }
});

// node_modules/@forge/bridge/out/view/index.js
var require_view2 = __commonJS({
  "node_modules/@forge/bridge/out/view/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_view(), exports);
  }
});

// node_modules/@forge/bridge/out/router/router.js
var require_router = __commonJS({
  "node_modules/@forge/bridge/out/router/router.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.router = void 0;
    var bridge_1 = require_bridge();
    var callBridge = (0, bridge_1.getCallBridge)();
    var getUrl = async (location) => {
      if (!(location === null || location === void 0 ? void 0 : location.target)) {
        throw new Error("target is required for getUrl");
      }
      const url = await callBridge("getUrl", location);
      if (!url) {
        throw new Error("Failed to get URL");
      }
      try {
        return new URL(url);
      } catch (error) {
        throw new Error(`Failed to parse URL: ${url} (${error})`);
      }
    };
    var navigate = (location) => {
      if (typeof location === "string") {
        return callBridge("navigate", { url: location, type: "same-tab" });
      } else {
        if (!(location === null || location === void 0 ? void 0 : location.target)) {
          throw new Error("target is required for navigation");
        }
        return callBridge("navigate", { ...location, type: "same-tab" });
      }
    };
    var open = (location) => {
      if (typeof location === "string") {
        return callBridge("navigate", { url: location, type: "new-tab" });
      } else {
        if (!(location === null || location === void 0 ? void 0 : location.target)) {
          throw new Error("target is required for navigation");
        }
        return callBridge("navigate", { ...location, type: "new-tab" });
      }
    };
    var reload = async () => callBridge("reload");
    exports.router = {
      getUrl,
      navigate,
      open,
      reload
    };
  }
});

// node_modules/@forge/bridge/out/router/index.js
var require_router2 = __commonJS({
  "node_modules/@forge/bridge/out/router/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_router(), exports);
  }
});

// node_modules/@forge/bridge/out/modal/modal.js
var require_modal = __commonJS({
  "node_modules/@forge/bridge/out/modal/modal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Modal = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var noop = () => {
    };
    var Modal = class {
      constructor(opts) {
        var _a, _b;
        this.resource = (opts === null || opts === void 0 ? void 0 : opts.resource) || null;
        this.onClose = (opts === null || opts === void 0 ? void 0 : opts.onClose) || noop;
        this.size = (opts === null || opts === void 0 ? void 0 : opts.size) || "medium";
        this.context = (opts === null || opts === void 0 ? void 0 : opts.context) || {};
        this.closeOnEscape = (_a = opts === null || opts === void 0 ? void 0 : opts.closeOnEscape) !== null && _a !== void 0 ? _a : true;
        this.closeOnOverlayClick = (_b = opts === null || opts === void 0 ? void 0 : opts.closeOnOverlayClick) !== null && _b !== void 0 ? _b : true;
      }
      async open() {
        try {
          const success = await callBridge("openModal", {
            resource: this.resource,
            onClose: this.onClose,
            size: this.size,
            context: this.context,
            closeOnEscape: this.closeOnEscape,
            closeOnOverlayClick: this.closeOnOverlayClick
          });
          if (success === false) {
            throw new errors_1.BridgeAPIError("Unable to open modal.");
          }
        } catch (err) {
          throw new errors_1.BridgeAPIError("Unable to open modal.");
        }
      }
    };
    exports.Modal = Modal;
  }
});

// node_modules/@forge/bridge/out/modal/index.js
var require_modal2 = __commonJS({
  "node_modules/@forge/bridge/out/modal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_modal(), exports);
  }
});

// node_modules/@forge/bridge/out/fetch/fetch.js
var require_fetch = __commonJS({
  "node_modules/@forge/bridge/out/fetch/fetch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.productFetchApi = void 0;
    var blobParser_1 = require_blobParser();
    var parseFormData = async (form) => {
      const parsed = {};
      for (const [key, value] of form.entries()) {
        if (key === "file") {
          const fileName = value.name;
          const fileType = value.type;
          parsed["file"] = await (0, blobParser_1.blobToBase64)(value);
          parsed["__fileName"] = fileName;
          parsed["__fileType"] = fileType;
        } else {
          parsed[key] = value;
        }
      }
      return JSON.stringify(parsed);
    };
    var parseRequest = async (init) => {
      const isFormData = (init === null || init === void 0 ? void 0 : init.body) instanceof FormData ? true : false;
      const requestBody = isFormData ? await parseFormData(init === null || init === void 0 ? void 0 : init.body) : init === null || init === void 0 ? void 0 : init.body;
      const req = new Request("", { body: requestBody, method: init === null || init === void 0 ? void 0 : init.method, headers: init === null || init === void 0 ? void 0 : init.headers });
      const headers = Object.fromEntries(req.headers.entries());
      const body = req.method !== "GET" ? await req.text() : null;
      return {
        body,
        headers: new Headers(headers),
        isMultipartFormData: isFormData
      };
    };
    var productFetchApi = (callBridge) => {
      const fetch2 = async (product, restPath, init) => {
        const { body: requestBody, headers: requestHeaders, isMultipartFormData } = await parseRequest(init);
        if (!requestHeaders.has("X-Atlassian-Token")) {
          requestHeaders.set("X-Atlassian-Token", "no-check");
        }
        const fetchPayload = {
          product,
          restPath,
          fetchRequestInit: {
            ...init,
            body: requestBody,
            headers: [...requestHeaders.entries()]
          },
          isMultipartFormData
        };
        const { body, headers, statusText, status, isAttachment } = await callBridge("fetchProduct", fetchPayload);
        const responseBody = isAttachment ? (0, blobParser_1.base64ToBlob)(body, headers["content-type"]) : body;
        return new Response(responseBody || null, { headers, status, statusText });
      };
      return {
        requestConfluence: (restPath, fetchOptions) => fetch2("confluence", restPath, fetchOptions),
        requestJira: (restPath, fetchOptions) => fetch2("jira", restPath, fetchOptions),
        requestBitbucket: (restPath, fetchOptions) => fetch2("bitbucket", restPath, fetchOptions)
      };
    };
    exports.productFetchApi = productFetchApi;
  }
});

// node_modules/@forge/bridge/out/fetch/index.js
var require_fetch2 = __commonJS({
  "node_modules/@forge/bridge/out/fetch/index.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requestBitbucket = exports.requestJira = exports.requestConfluence = void 0;
    var bridge_1 = require_bridge();
    var fetch_1 = require_fetch();
    _a = (0, fetch_1.productFetchApi)((0, bridge_1.getCallBridge)()), exports.requestConfluence = _a.requestConfluence, exports.requestJira = _a.requestJira, exports.requestBitbucket = _a.requestBitbucket;
  }
});

// node_modules/@forge/bridge/out/flag/flag.js
var require_flag = __commonJS({
  "node_modules/@forge/bridge/out/flag/flag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showFlag = void 0;
    var bridge_1 = require_bridge();
    var errors_1 = require_errors();
    var callBridge = (0, bridge_1.getCallBridge)();
    var showFlag = (options) => {
      var _a;
      if (!options.id) {
        throw new errors_1.BridgeAPIError('"id" must be defined in flag options');
      }
      const result = callBridge("showFlag", {
        ...options,
        type: (_a = options.type) !== null && _a !== void 0 ? _a : "info"
      });
      return {
        close: async () => {
          await result;
          return callBridge("closeFlag", { id: options.id });
        }
      };
    };
    exports.showFlag = showFlag;
  }
});

// node_modules/@forge/bridge/out/flag/index.js
var require_flag2 = __commonJS({
  "node_modules/@forge/bridge/out/flag/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showFlag = void 0;
    var flag_1 = require_flag();
    Object.defineProperty(exports, "showFlag", { enumerable: true, get: function() {
      return flag_1.showFlag;
    } });
  }
});

// node_modules/@forge/bridge/out/events/index.js
var require_events2 = __commonJS({
  "node_modules/@forge/bridge/out/events/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_events(), exports);
  }
});

// node_modules/@forge/bridge/out/realtime/realtime.js
var require_realtime = __commonJS({
  "node_modules/@forge/bridge/out/realtime/realtime.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.realtime = void 0;
    var bridge_1 = require_bridge();
    var callBridge = (0, bridge_1.getCallBridge)();
    var publish = (channel, payload, options) => {
      return callBridge("publishRealtimeChannel", { channelName: channel, eventPayload: payload, options });
    };
    var subscribe = (channel, callback, options) => {
      return callBridge("subscribeRealtimeChannel", { channelName: channel, onEvent: callback, options });
    };
    var publishGlobal = (channel, payload, options) => {
      return callBridge("publishRealtimeChannel", { channelName: channel, eventPayload: payload, options, isGlobal: true });
    };
    var subscribeGlobal = (channel, callback, options) => {
      return callBridge("subscribeRealtimeChannel", {
        channelName: channel,
        onEvent: callback,
        options,
        isGlobal: true
      });
    };
    exports.realtime = {
      publish,
      subscribe,
      publishGlobal,
      subscribeGlobal
    };
  }
});

// node_modules/@forge/bridge/out/realtime/productContext.js
var require_productContext = __commonJS({
  "node_modules/@forge/bridge/out/realtime/productContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jira = void 0;
    var Jira;
    (function(Jira2) {
      Jira2["Board"] = "board";
      Jira2["Issue"] = "issue";
      Jira2["Project"] = "project";
    })(Jira = exports.Jira || (exports.Jira = {}));
  }
});

// node_modules/@forge/bridge/out/realtime/index.js
var require_realtime2 = __commonJS({
  "node_modules/@forge/bridge/out/realtime/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jira = exports.realtime = void 0;
    var realtime_1 = require_realtime();
    Object.defineProperty(exports, "realtime", { enumerable: true, get: function() {
      return realtime_1.realtime;
    } });
    var productContext_1 = require_productContext();
    Object.defineProperty(exports, "Jira", { enumerable: true, get: function() {
      return productContext_1.Jira;
    } });
  }
});

// node_modules/@forge/bridge/out/i18n/index.js
var require_i18n = __commonJS({
  "node_modules/@forge/bridge/out/i18n/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTranslationFunction = exports.getTranslations = exports.resetTranslationsCache = void 0;
    var i18n_1 = require_out();
    var view_1 = require_view2();
    var frontendResourcesAccessor = {
      getI18nInfoConfig: async () => {
        const resp = await fetch(`./${i18n_1.I18N_BUNDLE_FOLDER_NAME}/${i18n_1.I18N_INFO_FILE_NAME}`);
        if (!resp.ok) {
          throw new Error("Failed to get i18n info config: " + resp.statusText);
        }
        const info = await resp.json();
        return info.config;
      },
      getTranslationResource: async (locale) => {
        const resp = await fetch(`./${i18n_1.I18N_BUNDLE_FOLDER_NAME}/${locale}.json`);
        if (!resp.ok) {
          throw new Error(`Failed to get translation resource for locale: ${locale}`);
        }
        return resp.json();
      }
    };
    var translationsGetter = new i18n_1.TranslationsGetter(frontendResourcesAccessor);
    var resetTranslationsCache = () => {
      translationsGetter.reset();
    };
    exports.resetTranslationsCache = resetTranslationsCache;
    var getTranslations = async (locale = null, options = {
      fallback: true
    }) => {
      let targetLocale = locale;
      if (!targetLocale) {
        const context = await view_1.view.getContext();
        targetLocale = context.locale;
      }
      return await translationsGetter.getTranslations(targetLocale, options);
    };
    exports.getTranslations = getTranslations;
    var createTranslationFunction = async (locale = null) => {
      let targetLocale = locale;
      if (!targetLocale) {
        const context = await view_1.view.getContext();
        targetLocale = context.locale;
      }
      const translator = new i18n_1.Translator(targetLocale, translationsGetter);
      await translator.init();
      return (i18nKey, defaultValue) => {
        var _a, _b;
        return (_b = (_a = translator.translate(i18nKey)) !== null && _a !== void 0 ? _a : defaultValue) !== null && _b !== void 0 ? _b : i18nKey;
      };
    };
    exports.createTranslationFunction = createTranslationFunction;
  }
});

// node_modules/@forge/bridge/out/index.js
var require_out2 = __commonJS({
  "node_modules/@forge/bridge/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.i18n = exports.NavigationTarget = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var targets_1 = require_targets();
    Object.defineProperty(exports, "NavigationTarget", { enumerable: true, get: function() {
      return targets_1.NavigationTarget;
    } });
    tslib_1.__exportStar(require_invoke2(), exports);
    tslib_1.__exportStar(require_invoke_endpoint2(), exports);
    tslib_1.__exportStar(require_view2(), exports);
    tslib_1.__exportStar(require_router2(), exports);
    tslib_1.__exportStar(require_modal2(), exports);
    tslib_1.__exportStar(require_fetch2(), exports);
    tslib_1.__exportStar(require_flag2(), exports);
    tslib_1.__exportStar(require_events2(), exports);
    tslib_1.__exportStar(require_realtime2(), exports);
    exports.i18n = tslib_1.__importStar(require_i18n());
  }
});

// node_modules/@forge/jira-bridge/out/bridge.js
var require_bridge2 = __commonJS({
  "node_modules/@forge/jira-bridge/out/bridge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCallBridge = void 0;
    var getCallBridge = () => {
      return window.__bridge.callBridge;
    };
    exports.getCallBridge = getCallBridge;
  }
});

// node_modules/@forge/jira-bridge/out/errors.js
var require_errors2 = __commonJS({
  "node_modules/@forge/jira-bridge/out/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERROR_TYPES = exports.ON_ERROR_ERROR = exports.GET_API_ERROR = exports.SUBSCRIBE_TO_CHANGES_ERROR = exports.ON_INIT_ERROR = exports.AppExecutionError = exports.BridgeAPIError = void 0;
    var BridgeAPIError = class extends Error {
    };
    exports.BridgeAPIError = BridgeAPIError;
    var AppExecutionError = class extends Error {
    };
    exports.AppExecutionError = AppExecutionError;
    exports.ON_INIT_ERROR = "onInitError";
    exports.SUBSCRIBE_TO_CHANGES_ERROR = "subscribeToChangesError";
    exports.GET_API_ERROR = "getApiError";
    exports.ON_ERROR_ERROR = "onErrorError";
    exports.ERROR_TYPES = [exports.ON_INIT_ERROR, exports.SUBSCRIBE_TO_CHANGES_ERROR, exports.GET_API_ERROR, exports.ON_ERROR_ERROR];
  }
});

// node_modules/@forge/jira-bridge/out/modal/issue-view.js
var require_issue_view = __commonJS({
  "node_modules/@forge/jira-bridge/out/modal/issue-view.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewIssueModal = void 0;
    var bridge_1 = require_bridge2();
    var errors_1 = require_errors2();
    var noop = () => {
    };
    var callBridge = (0, bridge_1.getCallBridge)();
    var ViewIssueModal = class {
      constructor(opts) {
        const { context, onClose = noop } = opts || {};
        if (!context || !context.issueKey) {
          throw new errors_1.BridgeAPIError("issueKey is missing in the context");
        }
        this.onClose = onClose;
        this.context = context;
      }
      async open() {
        try {
          const success = await callBridge("openIssueViewModal", {
            data: {
              onClose: this.onClose,
              context: this.context
            }
          });
          if (success === false) {
            throw new errors_1.BridgeAPIError("Unable to open issue view modal.");
          }
        } catch (err) {
          throw new errors_1.BridgeAPIError("Unable to open issue view modal.");
        }
      }
    };
    exports.ViewIssueModal = ViewIssueModal;
  }
});

// node_modules/@forge/jira-bridge/out/modal/issue-create.js
var require_issue_create = __commonJS({
  "node_modules/@forge/jira-bridge/out/modal/issue-create.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateIssueModal = void 0;
    var bridge_1 = require_bridge2();
    var errors_1 = require_errors2();
    var noop = () => {
    };
    var callBridge = (0, bridge_1.getCallBridge)();
    var CreateIssueModal = class {
      constructor(opts) {
        this.onClose = (opts === null || opts === void 0 ? void 0 : opts.onClose) || noop;
        this.context = (opts === null || opts === void 0 ? void 0 : opts.context) || {};
      }
      async open() {
        try {
          const success = await callBridge("openIssueCreateModal", {
            data: {
              onClose: this.onClose,
              context: this.context
            }
          });
          if (success === false) {
            throw new errors_1.BridgeAPIError("Unable to open issue create modal.");
          }
        } catch (err) {
          throw new errors_1.BridgeAPIError("Unable to open issue create modal.");
        }
      }
    };
    exports.CreateIssueModal = CreateIssueModal;
  }
});

// node_modules/@forge/jira-bridge/out/modal/index.js
var require_modal3 = __commonJS({
  "node_modules/@forge/jira-bridge/out/modal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_issue_view(), exports);
    tslib_1.__exportStar(require_issue_create(), exports);
  }
});

// node_modules/@forge/jira-bridge/out/workflow/onConfigure.js
var require_onConfigure = __commonJS({
  "node_modules/@forge/jira-bridge/out/workflow/onConfigure.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onConfigure = void 0;
    var bridge_1 = require_bridge2();
    var errors_1 = require_errors2();
    var callBridge = (0, bridge_1.getCallBridge)();
    async function onConfigure(onConfigureFn) {
      try {
        const success = await callBridge("setWorkflowRuleConfigurationCallback", {
          data: {
            onConfigure: onConfigureFn
          }
        });
        if (success === false) {
          throw new errors_1.BridgeAPIError("Unable to add workflow rule configuration callback.");
        }
      } catch (err) {
        throw new errors_1.BridgeAPIError("Unable to add workflow rule configuration callback.");
      }
    }
    exports.onConfigure = onConfigure;
  }
});

// node_modules/@forge/jira-bridge/out/workflow/index.js
var require_workflow = __commonJS({
  "node_modules/@forge/jira-bridge/out/workflow/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.workflowRules = void 0;
    var onConfigure_1 = require_onConfigure();
    exports.workflowRules = {
      onConfigure: onConfigure_1.onConfigure
    };
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/changesBuffer.js
var require_changesBuffer = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/changesBuffer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChangesBuffer = void 0;
    var ChangesBuffer = class {
      constructor() {
        this.formBuffer = {};
        this.screenTabsBuffer = [];
      }
      getFormChanges() {
        return this.formBuffer;
      }
      getScreenTabsChanges() {
        return this.screenTabsBuffer;
      }
      updateFieldProperty(fieldId, property, value) {
        this.formBuffer[fieldId] = {
          ...this.formBuffer[fieldId],
          [property]: value
        };
      }
      updateScreenTabProperty(screenTabsData, tabId, property, value) {
        const currentChanges = this.screenTabsBuffer.find((tab) => tab.id === tabId);
        if (currentChanges) {
          currentChanges[property] = value;
        } else {
          const currentTab = screenTabsData.find((tab) => tab.id === tabId);
          if (currentTab) {
            this.screenTabsBuffer.push({
              id: tabId,
              isVisible: currentTab.isVisible,
              isActive: currentTab.isActive,
              [property]: value
            });
          }
        }
      }
      bulkUpdateScreenTabProperty(screenTabsData, predicate, property, value) {
        screenTabsData.filter((tab) => predicate(tab.id)).forEach((tabToChange) => {
          this.updateScreenTabProperty(screenTabsData, tabToChange.id, property, value);
        });
      }
    };
    exports.ChangesBuffer = ChangesBuffer;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/apiBuilder.js
var require_apiBuilder = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/apiBuilder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiBuilder = void 0;
    var changesBuffer_1 = require_changesBuffer();
    var ApiBuilder = class {
      constructor(formData, screenTabsData) {
        this.formData = formData;
        this.screenTabsData = screenTabsData;
        this.buffer = new changesBuffer_1.ChangesBuffer();
      }
      getBuffer() {
        return this.buffer;
      }
      build() {
        const fieldApi = {
          getFieldById: (fieldId) => {
            return this.buildField(fieldId, this.formData, this.buffer);
          },
          getFields: () => {
            return Object.values(this.formData).map((field) => {
              return this.buildField(field.fieldId, this.formData, this.buffer);
            });
          }
        };
        return {
          ...fieldApi,
          getScreenTabById: (screenTabId) => {
            const screenTab = this.screenTabsData.find((tab) => tab.id === screenTabId);
            if (screenTab) {
              return this.buildScreenTab(screenTab, this.screenTabsData, this.buffer);
            }
          },
          getScreenTabs: () => {
            return this.screenTabsData.map((tab) => this.buildScreenTab(tab, this.screenTabsData, this.buffer));
          }
        };
      }
      buildField(fieldId, formData, buffer) {
        if (!Object.prototype.hasOwnProperty.call(formData, fieldId)) {
          return void 0;
        }
        const field = formData[fieldId];
        if (!field) {
          return void 0;
        }
        const fieldApi = {
          getId: () => field.fieldId,
          getType: () => field.fieldType,
          setName: (name) => {
            buffer.updateFieldProperty(fieldId, "fieldName", name);
            return fieldApi;
          },
          getName: () => {
            return field.fieldName;
          },
          setDescription: (description) => {
            buffer.updateFieldProperty(fieldId, "description", description);
            return fieldApi;
          },
          getDescription: () => {
            return field.description;
          },
          isVisible: () => field.isVisible,
          setVisible: (isVisible) => {
            buffer.updateFieldProperty(fieldId, "isVisible", isVisible);
            return fieldApi;
          },
          setValue: (value) => {
            buffer.updateFieldProperty(fieldId, "value", value);
            return fieldApi;
          },
          getValue: () => {
            return field.value;
          },
          isReadOnly: () => {
            return field.isReadOnly;
          },
          setReadOnly: (isReadOnly) => {
            buffer.updateFieldProperty(fieldId, "isReadOnly", isReadOnly);
            return fieldApi;
          },
          isRequired: () => field.isRequired,
          setRequired: (isRequired) => {
            buffer.updateFieldProperty(fieldId, "isRequired", isRequired);
            return fieldApi;
          },
          setOptionsVisibility: (options, isVisible) => {
            buffer.updateFieldProperty(fieldId, "optionsVisibility", { options, isVisible });
            return fieldApi;
          },
          getOptionsVisibility: () => {
            return field.optionsVisibility;
          }
        };
        return fieldApi;
      }
      buildScreenTab(screenTab, screenTabsData, buffer) {
        const screenTabApi = {
          getId: () => screenTab.id,
          isVisible: () => screenTab.isVisible,
          setVisible: (isVisible) => {
            buffer.updateScreenTabProperty(screenTabsData, screenTab.id, "isVisible", isVisible);
            return screenTabApi;
          },
          focus: () => {
            buffer.bulkUpdateScreenTabProperty(screenTabsData, (tabId) => tabId !== screenTab.id, "isActive", false);
            buffer.updateScreenTabProperty(screenTabsData, screenTab.id, "isActive", true);
            return screenTabApi;
          }
        };
        return screenTabApi;
      }
    };
    exports.ApiBuilder = ApiBuilder;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/getInternalAPI.js
var require_getInternalAPI = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/getInternalAPI.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInternalAPI = void 0;
    var errors_1 = require_errors2();
    var bridge_1 = require_bridge2();
    var callBridge = (0, bridge_1.getCallBridge)();
    async function getInternalAPI() {
      let logError;
      try {
        const internalAPI = await callBridge("getUiModificationsInternalAPI");
        const { actions: { getOnInitData, submit, registerFields, subscribeToChanges, onBridgeError }, data: { uiModifications, onInitChangeId } } = internalAPI;
        logError = onBridgeError;
        if (!getOnInitData || !submit || !registerFields || !uiModifications || !onInitChangeId) {
          throw new Error("onInit could not be started");
        }
        if (!subscribeToChanges) {
          throw new Error("onChange could not be started");
        }
        return internalAPI;
      } catch (err) {
        if (logError)
          logError({ error: errors_1.GET_API_ERROR, cause: err });
        throw new errors_1.BridgeAPIError("Unable to initialize UI modifications module: " + err.message);
      }
    }
    exports.getInternalAPI = getInternalAPI;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/onInit.js
var require_onInit = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/onInit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onInit = void 0;
    var apiBuilder_1 = require_apiBuilder();
    var getInternalAPI_1 = require_getInternalAPI();
    var errors_1 = require_errors2();
    async function onInit2(onInitCallback, registerOnInitFieldsCallback) {
      const { actions: { getOnInitData, submit, registerFields, onBridgeError }, data: { onInitChangeId: changeId, uiModifications } } = await (0, getInternalAPI_1.getInternalAPI)();
      try {
        let fieldsDeclared;
        const payload = {
          fieldsChanges: {},
          screenTabsChanges: [],
          changeId
        };
        try {
          fieldsDeclared = registerOnInitFieldsCallback({ uiModifications });
        } catch (error) {
          void submit({
            fieldsChanges: {},
            screenTabsChanges: [],
            changeId
          });
          throw new errors_1.AppExecutionError(error);
        }
        void registerFields({ fields: fieldsDeclared, changeId });
        const { currentFormState, currentScreenTabsState = [] } = await getOnInitData();
        const builder = new apiBuilder_1.ApiBuilder(currentFormState, currentScreenTabsState);
        try {
          await onInitCallback({ api: builder.build(), uiModifications });
        } catch (error) {
          void submit(payload);
          throw new errors_1.AppExecutionError(error);
        }
        const buffer = builder.getBuffer();
        return submit({
          fieldsChanges: buffer.getFormChanges(),
          screenTabsChanges: buffer.getScreenTabsChanges(),
          changeId
        });
      } catch (error) {
        if (onBridgeError && !(error instanceof errors_1.AppExecutionError)) {
          onBridgeError({ error: errors_1.ON_INIT_ERROR, changeId, cause: error });
        }
        throw error;
      }
    }
    exports.onInit = onInit2;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/onChange.js
var require_onChange = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/onChange.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onChange = void 0;
    var apiBuilder_1 = require_apiBuilder();
    var getInternalAPI_1 = require_getInternalAPI();
    var errors_1 = require_errors2();
    async function onChange2(onChangeCallback, registerOnChangeFieldsCallback) {
      const { actions: { submit, registerFields, subscribeToChanges, onBridgeError } } = await (0, getInternalAPI_1.getInternalAPI)();
      return subscribeToChanges(async ({ changedFieldId, changeId, currentFormState, currentScreenTabsState = [], uiModifications }) => {
        try {
          const builder = new apiBuilder_1.ApiBuilder(currentFormState, currentScreenTabsState);
          const api = builder.build();
          const fieldChange = {
            current: api.getFieldById(changedFieldId)
          };
          let fieldsDeclared;
          const payload = {
            fieldsChanges: {},
            screenTabsChanges: [],
            changeId
          };
          try {
            fieldsDeclared = registerOnChangeFieldsCallback({ uiModifications, change: fieldChange });
          } catch (error) {
            void submit(payload);
            throw new errors_1.AppExecutionError(error);
          }
          void registerFields({ fields: fieldsDeclared, changeId });
          try {
            await onChangeCallback({ uiModifications, change: fieldChange, api });
          } catch (error) {
            void submit(payload);
            throw new errors_1.AppExecutionError(error);
          }
          const buffer = builder.getBuffer();
          return submit({
            fieldsChanges: buffer.getFormChanges(),
            screenTabsChanges: buffer.getScreenTabsChanges(),
            changeId
          });
        } catch (error) {
          if (onBridgeError && !(error instanceof errors_1.AppExecutionError)) {
            onBridgeError({ error: errors_1.SUBSCRIBE_TO_CHANGES_ERROR, changeId, cause: error });
          }
          throw error;
        }
      });
    }
    exports.onChange = onChange2;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/onError.js
var require_onError = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/onError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onError = void 0;
    var getInternalAPI_1 = require_getInternalAPI();
    var errors_1 = require_errors2();
    async function onError2(errorCallback) {
      const { actions: { subscribeToErrors, onBridgeError } } = await (0, getInternalAPI_1.getInternalAPI)();
      try {
        if (!subscribeToErrors)
          return;
        if (!errorCallback) {
          throw new errors_1.AppExecutionError("errorCallback is required");
        }
        if (typeof errorCallback !== "function") {
          throw new errors_1.AppExecutionError("errorCallback should be a function");
        }
        return subscribeToErrors(({ errors }) => {
          if (errors === null || errors === void 0 ? void 0 : errors.length) {
            try {
              errorCallback({ errors });
            } catch (error) {
              throw new errors_1.AppExecutionError(error);
            }
          }
        });
      } catch (error) {
        if (onBridgeError && !(error instanceof errors_1.AppExecutionError)) {
          onBridgeError({ error: errors_1.ON_ERROR_ERROR, cause: error });
        }
        throw error;
      }
    }
    exports.onError = onError2;
  }
});

// node_modules/@forge/jira-bridge/out/ui-modifications/index.js
var require_ui_modifications = __commonJS({
  "node_modules/@forge/jira-bridge/out/ui-modifications/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uiModificationsApi = void 0;
    var onInit_1 = require_onInit();
    var onChange_1 = require_onChange();
    var onError_1 = require_onError();
    exports.uiModificationsApi = {
      onInit: onInit_1.onInit,
      onChange: onChange_1.onChange,
      onError: onError_1.onError
    };
  }
});

// node_modules/@forge/jira-bridge/out/index.js
var require_out3 = __commonJS({
  "node_modules/@forge/jira-bridge/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_modal3(), exports);
    tslib_1.__exportStar(require_workflow(), exports);
    tslib_1.__exportStar(require_ui_modifications(), exports);
  }
});

// src/uim/index.js
var import_bridge = __toESM(require_out2());
var import_jira_bridge2 = __toESM(require_out3());

// src/data/templates.js
var BUG_DESCRIPTION = {
  version: 1,
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Description",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "In the description section, you must briefly explain what you have done before facing the bug.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Steps to reproduce",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "In this section, you should describe how to reproduce the bug in step by step manner. Easy to follow steps give room to the developers to fix the issue without any chaos.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Expected result",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "What is the expected output from the application when you make an action which causes failure.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Actual result",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "What is the actual output from the application when you perform the steps to reproduce.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    }
  ]
};
var TASK_DESCRIPTION = {
  version: 1,
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Background",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "In the background section, please provide details why this change is needed.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Scope of work",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "In this section, you should describe what is the scope of work, changes that need to be made.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "Resources",
          marks: [{ type: "strong" }]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Provide any useful resources such as links to get more context for the work.",
          marks: [
            { type: "em" },
            { type: "textColor", attrs: { color: "#97a0af" } }
          ]
        }
      ]
    }
  ]
};
var TEMPLATES = [
  {
    id: "tmpl-001",
    name: "Bug Report",
    description: "Standard bug report template with sections for description, steps to reproduce, and expected vs actual results.",
    fields: {
      priority: "1",
      // Highest priority
      summary: "Bug: [SHORT DESCRIPTION HERE]",
      description: BUG_DESCRIPTION
    }
  },
  {
    id: "tmpl-002",
    name: "Feature Request",
    description: "Template for requesting new features or enhancements.",
    fields: {
      priority: "3",
      // Medium priority
      summary: "Feature: [SHORT DESCRIPTION HERE]",
      description: TASK_DESCRIPTION
    }
  },
  {
    id: "tmpl-003",
    name: "Task",
    description: "General task template for development work.",
    fields: {
      priority: "3",
      // Medium priority
      summary: "Task: [SHORT DESCRIPTION HERE]",
      description: TASK_DESCRIPTION
    }
  }
];
var getTemplateById = (templateId) => {
  return TEMPLATES.find((tmpl) => tmpl.id === templateId);
};

// src/uim/getSnapshots.js
var import_jira_bridge = __toESM(require_out3());
function getFieldData(field) {
  return {
    type: field.getType(),
    name: field.getName(),
    value: field.getValue(),
    optionsVisibility: field.getOptionsVisibility?.(),
    description: field.getDescription(),
    isVisible: field.isVisible(),
    isReadOnly: field.isReadOnly(),
    isRequired: field.isRequired?.()
  };
}
function getFieldsSnapshot({ getFields }) {
  return getFields().reduce((acc, field) => {
    acc[field.getId()] = getFieldData(field);
    return acc;
  }, {});
}
function getScreenTabsSnapshot({ getScreenTabs }) {
  return getScreenTabs?.().reduce((acc, tab) => {
    acc[tab.getId()] = {
      id: tab.getId(),
      isVisible: tab.isVisible()
    };
    return acc;
  }, {});
}
var consoleLogDataSnapshots = (api) => {
  console.log("Fields snapshot:");
  console.table(getFieldsSnapshot(api));
  console.log("Screen tabs snapshot:");
  console.table(getScreenTabsSnapshot(api));
};
var consoleLogLastUserChange = (field) => {
  console.log("Last change snapshot:");
  console.table({ [field.getId()]: getFieldData(field) });
};

// src/uim/index.js
var log = console.log;
console.log = (...args) => {
  log("[UIM]", ...args);
};
var isIssueCreate = (extension) => extension.viewType === "GIC";
import_bridge.view.getContext().then((context) => {
  const extension = context.extension;
  console.log("Extension context:", extension);
});
var { onInit, onChange, onError } = import_jira_bridge2.uiModificationsApi;
onInit(
  async ({ api }) => {
    consoleLogDataSnapshots(api);
    const { getFieldById } = api;
    const extension = (await import_bridge.view.getContext()).extension;
    if (!isIssueCreate(extension)) {
      console.log("Not a Create Issue view, skipping prefill");
      return;
    }
    try {
      const templateField = getFieldById("customfield_10058");
      const selectedTemplateId = templateField?.getValue();
      let template = null;
      if (selectedTemplateId) {
        console.log("Selected template ID:", selectedTemplateId);
        template = getTemplateById(selectedTemplateId);
        if (!template) {
          console.warn("Template not found:", selectedTemplateId);
          return;
        }
      } else {
        console.log("No template selected, using issue type default");
        const issueTypeName = extension?.issueType?.name;
        if (issueTypeName === "Bug") {
          template = getTemplateById("tmpl-001");
        } else {
          template = getTemplateById("tmpl-002");
        }
      }
      if (!template) {
        console.warn("No template could be determined");
        return;
      }
      console.log("Applying template:", template.name);
      const description = getFieldById("description");
      if (description && template.fields.description) {
        description.setValue(template.fields.description);
      }
      const summary = getFieldById("summary");
      if (summary && template.fields.summary) {
        summary.setValue(template.fields.summary);
      }
      const priority = getFieldById("priority");
      if (priority && template.fields.priority) {
        priority.setValue(template.fields.priority);
      }
    } catch (e) {
      console.error("Error during prefill initialization:", e);
    }
  },
  () => {
    return ["description", "summary", "priority", "customfield_10058"];
  }
);
onChange(
  async ({ api, change }) => {
    const { getFieldById } = api;
    const { current: currentChange } = change;
    if (!currentChange) {
      return;
    }
    consoleLogLastUserChange(currentChange);
    if (currentChange.fieldId === "customfield_10058") {
      console.log("Template field changed, re-applying prefill");
      const templateId = currentChange.value;
      if (!templateId) {
        console.log("Template cleared");
        return;
      }
      const template = getTemplateById(templateId);
      if (!template) {
        console.warn("Template not found:", templateId);
        return;
      }
      const description = getFieldById("description");
      if (description && template.fields.description) {
        description.setValue(template.fields.description);
      }
      const summary = getFieldById("summary");
      if (summary && template.fields.summary) {
        summary.setValue(template.fields.summary);
      }
      const priority = getFieldById("priority");
      if (priority && template.fields.priority) {
        priority.setValue(template.fields.priority);
      }
      console.log("Template applied:", template.name);
    }
  },
  () => {
    return ["description", "summary", "priority", "customfield_10058"];
  }
);
onError(({ errors }) => {
  console.error("Errors:", errors);
});
