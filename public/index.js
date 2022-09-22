"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context2, once) {
        this.fn = fn;
        this.context = context2;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context2, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context2 || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i = 0, l = handlers.length, ee2 = new Array(l); i < l; i++) {
          ee2[i] = handlers[i].fn;
        }
        return ee2;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once)
              this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args)
                  for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context2) {
        return addListener(this, event, fn, context2, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context2) {
        return addListener(this, event, fn, context2, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context2, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context2 || listeners.context === context2)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context2 && listeners[i].context !== context2) {
              events.push(listeners[i]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // node_modules/rbush/rbush.min.js
  var require_rbush_min = __commonJS({
    "node_modules/rbush/rbush.min.js"(exports, module) {
      !function(t, i) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = t || self).RBush = i();
      }(exports, function() {
        "use strict";
        function t(t2, r2, e2, a2, h2) {
          !function t3(n2, r3, e3, a3, h3) {
            for (; a3 > e3; ) {
              if (a3 - e3 > 600) {
                var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
                t3(n2, r3, m2, c2, h3);
              }
              var p2 = n2[r3], d2 = e3, x = a3;
              for (i(n2, e3, r3), h3(n2[a3], p2) > 0 && i(n2, e3, a3); d2 < x; ) {
                for (i(n2, d2, x), d2++, x--; h3(n2[d2], p2) < 0; )
                  d2++;
                for (; h3(n2[x], p2) > 0; )
                  x--;
              }
              0 === h3(n2[e3], p2) ? i(n2, e3, x) : i(n2, ++x, a3), x <= r3 && (e3 = x + 1), r3 <= x && (a3 = x - 1);
            }
          }(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
        }
        function i(t2, i2, n2) {
          var r2 = t2[i2];
          t2[i2] = t2[n2], t2[n2] = r2;
        }
        function n(t2, i2) {
          return t2 < i2 ? -1 : t2 > i2 ? 1 : 0;
        }
        var r = function(t2) {
          void 0 === t2 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
        };
        function e(t2, i2, n2) {
          if (!n2)
            return i2.indexOf(t2);
          for (var r2 = 0; r2 < i2.length; r2++)
            if (n2(t2, i2[r2]))
              return r2;
          return -1;
        }
        function a(t2, i2) {
          h(t2, 0, t2.children.length, i2, t2);
        }
        function h(t2, i2, n2, r2, e2) {
          e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
          for (var a2 = i2; a2 < n2; a2++) {
            var h2 = t2.children[a2];
            o(e2, t2.leaf ? r2(h2) : h2);
          }
          return e2;
        }
        function o(t2, i2) {
          return t2.minX = Math.min(t2.minX, i2.minX), t2.minY = Math.min(t2.minY, i2.minY), t2.maxX = Math.max(t2.maxX, i2.maxX), t2.maxY = Math.max(t2.maxY, i2.maxY), t2;
        }
        function s(t2, i2) {
          return t2.minX - i2.minX;
        }
        function l(t2, i2) {
          return t2.minY - i2.minY;
        }
        function f(t2) {
          return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
        }
        function u(t2) {
          return t2.maxX - t2.minX + (t2.maxY - t2.minY);
        }
        function m(t2, i2) {
          return t2.minX <= i2.minX && t2.minY <= i2.minY && i2.maxX <= t2.maxX && i2.maxY <= t2.maxY;
        }
        function c(t2, i2) {
          return i2.minX <= t2.maxX && i2.minY <= t2.maxY && i2.maxX >= t2.minX && i2.maxY >= t2.minY;
        }
        function p(t2) {
          return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
        }
        function d(i2, n2, r2, e2, a2) {
          for (var h2 = [n2, r2]; h2.length; )
            if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
              var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
              t(i2, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
            }
        }
        return r.prototype.all = function() {
          return this._all(this.data, []);
        }, r.prototype.search = function(t2) {
          var i2 = this.data, n2 = [];
          if (!c(t2, i2))
            return n2;
          for (var r2 = this.toBBox, e2 = []; i2; ) {
            for (var a2 = 0; a2 < i2.children.length; a2++) {
              var h2 = i2.children[a2], o2 = i2.leaf ? r2(h2) : h2;
              c(t2, o2) && (i2.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
            }
            i2 = e2.pop();
          }
          return n2;
        }, r.prototype.collides = function(t2) {
          var i2 = this.data;
          if (!c(t2, i2))
            return false;
          for (var n2 = []; i2; ) {
            for (var r2 = 0; r2 < i2.children.length; r2++) {
              var e2 = i2.children[r2], a2 = i2.leaf ? this.toBBox(e2) : e2;
              if (c(t2, a2)) {
                if (i2.leaf || m(t2, a2))
                  return true;
                n2.push(e2);
              }
            }
            i2 = n2.pop();
          }
          return false;
        }, r.prototype.load = function(t2) {
          if (!t2 || !t2.length)
            return this;
          if (t2.length < this._minEntries) {
            for (var i2 = 0; i2 < t2.length; i2++)
              this.insert(t2[i2]);
            return this;
          }
          var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === n2.height)
              this._splitRoot(this.data, n2);
            else {
              if (this.data.height < n2.height) {
                var r2 = this.data;
                this.data = n2, n2 = r2;
              }
              this._insert(n2, this.data.height - n2.height - 1, true);
            }
          else
            this.data = n2;
          return this;
        }, r.prototype.insert = function(t2) {
          return t2 && this._insert(t2, this.data.height - 1), this;
        }, r.prototype.clear = function() {
          return this.data = p([]), this;
        }, r.prototype.remove = function(t2, i2) {
          if (!t2)
            return this;
          for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
            if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
              var f2 = e(t2, h2.children, i2);
              if (-1 !== f2)
                return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
            }
            a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
          }
          return this;
        }, r.prototype.toBBox = function(t2) {
          return t2;
        }, r.prototype.compareMinX = function(t2, i2) {
          return t2.minX - i2.minX;
        }, r.prototype.compareMinY = function(t2, i2) {
          return t2.minY - i2.minY;
        }, r.prototype.toJSON = function() {
          return this.data;
        }, r.prototype.fromJSON = function(t2) {
          return this.data = t2, this;
        }, r.prototype._all = function(t2, i2) {
          for (var n2 = []; t2; )
            t2.leaf ? i2.push.apply(i2, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
          return i2;
        }, r.prototype._build = function(t2, i2, n2, r2) {
          var e2, h2 = n2 - i2 + 1, o2 = this._maxEntries;
          if (h2 <= o2)
            return a(e2 = p(t2.slice(i2, n2 + 1)), this.toBBox), e2;
          r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
          var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
          d(t2, i2, n2, l2, this.compareMinX);
          for (var f2 = i2; f2 <= n2; f2 += l2) {
            var u2 = Math.min(f2 + l2 - 1, n2);
            d(t2, f2, u2, s2, this.compareMinY);
            for (var m2 = f2; m2 <= u2; m2 += s2) {
              var c2 = Math.min(m2 + s2 - 1, u2);
              e2.children.push(this._build(t2, m2, c2, r2 - 1));
            }
          }
          return a(e2, this.toBBox), e2;
        }, r.prototype._chooseSubtree = function(t2, i2, n2, r2) {
          for (; r2.push(i2), !i2.leaf && r2.length - 1 !== n2; ) {
            for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i2.children.length; o2++) {
              var s2 = i2.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
              u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
            }
            i2 = h2 || i2.children[0];
          }
          var m2, c2;
          return i2;
        }, r.prototype._insert = function(t2, i2, n2) {
          var r2 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r2, this.data, i2, e2);
          for (a2.children.push(t2), o(a2, r2); i2 >= 0 && e2[i2].children.length > this._maxEntries; )
            this._split(e2, i2), i2--;
          this._adjustParentBBoxes(r2, e2, i2);
        }, r.prototype._split = function(t2, i2) {
          var n2 = t2[i2], r2 = n2.children.length, e2 = this._minEntries;
          this._chooseSplitAxis(n2, e2, r2);
          var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
          o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i2 ? t2[i2 - 1].children.push(o2) : this._splitRoot(n2, o2);
        }, r.prototype._splitRoot = function(t2, i2) {
          this.data = p([t2, i2]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
        }, r.prototype._chooseSplitIndex = function(t2, i2, n2) {
          for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i2; p2 <= n2 - i2; p2++) {
            var d2 = h(t2, 0, p2, this.toBBox), x = h(t2, p2, n2, this.toBBox), v = (e2 = d2, a2 = x, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x);
            v < m2 ? (m2 = v, r2 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p2);
          }
          return r2 || n2 - i2;
        }, r.prototype._chooseSplitAxis = function(t2, i2, n2) {
          var r2 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
          this._allDistMargin(t2, i2, n2, r2) < this._allDistMargin(t2, i2, n2, e2) && t2.children.sort(r2);
        }, r.prototype._allDistMargin = function(t2, i2, n2, r2) {
          t2.children.sort(r2);
          for (var e2 = this.toBBox, a2 = h(t2, 0, i2, e2), s2 = h(t2, n2 - i2, n2, e2), l2 = u(a2) + u(s2), f2 = i2; f2 < n2 - i2; f2++) {
            var m2 = t2.children[f2];
            o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
          }
          for (var c2 = n2 - i2 - 1; c2 >= i2; c2--) {
            var p2 = t2.children[c2];
            o(s2, t2.leaf ? e2(p2) : p2), l2 += u(s2);
          }
          return l2;
        }, r.prototype._adjustParentBBoxes = function(t2, i2, n2) {
          for (var r2 = n2; r2 >= 0; r2--)
            o(i2[r2], t2);
        }, r.prototype._condense = function(t2) {
          for (var i2 = t2.length - 1, n2 = void 0; i2 >= 0; i2--)
            0 === t2[i2].children.length ? i2 > 0 ? (n2 = t2[i2 - 1].children).splice(n2.indexOf(t2[i2]), 1) : this.clear() : a(t2[i2], this.toBBox);
        }, r;
      });
    }
  });

  // node_modules/sat/SAT.js
  var require_SAT = __commonJS({
    "node_modules/sat/SAT.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define["amd"]) {
          define(factory);
        } else if (typeof exports === "object") {
          module["exports"] = factory();
        } else {
          root["SAT"] = factory();
        }
      })(exports, function() {
        "use strict";
        var SAT = {};
        function Vector3(x, y) {
          this["x"] = x || 0;
          this["y"] = y || 0;
        }
        SAT["Vector"] = Vector3;
        SAT["V"] = Vector3;
        Vector3.prototype["copy"] = Vector3.prototype.copy = function(other) {
          this["x"] = other["x"];
          this["y"] = other["y"];
          return this;
        };
        Vector3.prototype["clone"] = Vector3.prototype.clone = function() {
          return new Vector3(this["x"], this["y"]);
        };
        Vector3.prototype["perp"] = Vector3.prototype.perp = function() {
          var x = this["x"];
          this["x"] = this["y"];
          this["y"] = -x;
          return this;
        };
        Vector3.prototype["rotate"] = Vector3.prototype.rotate = function(angle) {
          var x = this["x"];
          var y = this["y"];
          this["x"] = x * Math.cos(angle) - y * Math.sin(angle);
          this["y"] = x * Math.sin(angle) + y * Math.cos(angle);
          return this;
        };
        Vector3.prototype["reverse"] = Vector3.prototype.reverse = function() {
          this["x"] = -this["x"];
          this["y"] = -this["y"];
          return this;
        };
        Vector3.prototype["normalize"] = Vector3.prototype.normalize = function() {
          var d = this.len();
          if (d > 0) {
            this["x"] = this["x"] / d;
            this["y"] = this["y"] / d;
          }
          return this;
        };
        Vector3.prototype["add"] = Vector3.prototype.add = function(other) {
          this["x"] += other["x"];
          this["y"] += other["y"];
          return this;
        };
        Vector3.prototype["sub"] = Vector3.prototype.sub = function(other) {
          this["x"] -= other["x"];
          this["y"] -= other["y"];
          return this;
        };
        Vector3.prototype["scale"] = Vector3.prototype.scale = function(x, y) {
          this["x"] *= x;
          this["y"] *= typeof y != "undefined" ? y : x;
          return this;
        };
        Vector3.prototype["project"] = Vector3.prototype.project = function(other) {
          var amt = this.dot(other) / other.len2();
          this["x"] = amt * other["x"];
          this["y"] = amt * other["y"];
          return this;
        };
        Vector3.prototype["projectN"] = Vector3.prototype.projectN = function(other) {
          var amt = this.dot(other);
          this["x"] = amt * other["x"];
          this["y"] = amt * other["y"];
          return this;
        };
        Vector3.prototype["reflect"] = Vector3.prototype.reflect = function(axis) {
          var x = this["x"];
          var y = this["y"];
          this.project(axis).scale(2);
          this["x"] -= x;
          this["y"] -= y;
          return this;
        };
        Vector3.prototype["reflectN"] = Vector3.prototype.reflectN = function(axis) {
          var x = this["x"];
          var y = this["y"];
          this.projectN(axis).scale(2);
          this["x"] -= x;
          this["y"] -= y;
          return this;
        };
        Vector3.prototype["dot"] = Vector3.prototype.dot = function(other) {
          return this["x"] * other["x"] + this["y"] * other["y"];
        };
        Vector3.prototype["len2"] = Vector3.prototype.len2 = function() {
          return this.dot(this);
        };
        Vector3.prototype["len"] = Vector3.prototype.len = function() {
          return Math.sqrt(this.len2());
        };
        function Circle2(pos, r) {
          this["pos"] = pos || new Vector3();
          this["r"] = r || 0;
          this["offset"] = new Vector3();
        }
        SAT["Circle"] = Circle2;
        Circle2.prototype["getAABBAsBox"] = Circle2.prototype.getAABBAsBox = function() {
          var r = this["r"];
          var corner = this["pos"].clone().add(this["offset"]).sub(new Vector3(r, r));
          return new Box(corner, r * 2, r * 2);
        };
        Circle2.prototype["getAABB"] = Circle2.prototype.getAABB = function() {
          return this.getAABBAsBox().toPolygon();
        };
        Circle2.prototype["setOffset"] = Circle2.prototype.setOffset = function(offset) {
          this["offset"] = offset;
          return this;
        };
        function Polygon(pos, points) {
          this["pos"] = pos || new Vector3();
          this["angle"] = 0;
          this["offset"] = new Vector3();
          this.setPoints(points || []);
        }
        SAT["Polygon"] = Polygon;
        Polygon.prototype["setPoints"] = Polygon.prototype.setPoints = function(points) {
          var lengthChanged = !this["points"] || this["points"].length !== points.length;
          if (lengthChanged) {
            var i2;
            var calcPoints = this["calcPoints"] = [];
            var edges = this["edges"] = [];
            var normals = this["normals"] = [];
            for (i2 = 0; i2 < points.length; i2++) {
              var p1 = points[i2];
              var p2 = i2 < points.length - 1 ? points[i2 + 1] : points[0];
              if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
                points.splice(i2, 1);
                i2 -= 1;
                continue;
              }
              calcPoints.push(new Vector3());
              edges.push(new Vector3());
              normals.push(new Vector3());
            }
          }
          this["points"] = points;
          this._recalc();
          return this;
        };
        Polygon.prototype["setAngle"] = Polygon.prototype.setAngle = function(angle) {
          this["angle"] = angle;
          this._recalc();
          return this;
        };
        Polygon.prototype["setOffset"] = Polygon.prototype.setOffset = function(offset) {
          this["offset"] = offset;
          this._recalc();
          return this;
        };
        Polygon.prototype["rotate"] = Polygon.prototype.rotate = function(angle) {
          var points = this["points"];
          var len = points.length;
          for (var i2 = 0; i2 < len; i2++) {
            points[i2].rotate(angle);
          }
          this._recalc();
          return this;
        };
        Polygon.prototype["translate"] = Polygon.prototype.translate = function(x, y) {
          var points = this["points"];
          var len = points.length;
          for (var i2 = 0; i2 < len; i2++) {
            points[i2]["x"] += x;
            points[i2]["y"] += y;
          }
          this._recalc();
          return this;
        };
        Polygon.prototype._recalc = function() {
          var calcPoints = this["calcPoints"];
          var edges = this["edges"];
          var normals = this["normals"];
          var points = this["points"];
          var offset = this["offset"];
          var angle = this["angle"];
          var len = points.length;
          var i2;
          for (i2 = 0; i2 < len; i2++) {
            var calcPoint = calcPoints[i2].copy(points[i2]);
            calcPoint["x"] += offset["x"];
            calcPoint["y"] += offset["y"];
            if (angle !== 0) {
              calcPoint.rotate(angle);
            }
          }
          for (i2 = 0; i2 < len; i2++) {
            var p1 = calcPoints[i2];
            var p2 = i2 < len - 1 ? calcPoints[i2 + 1] : calcPoints[0];
            var e = edges[i2].copy(p2).sub(p1);
            normals[i2].copy(e).perp().normalize();
          }
          return this;
        };
        Polygon.prototype["getAABBAsBox"] = Polygon.prototype.getAABBAsBox = function() {
          var points = this["calcPoints"];
          var len = points.length;
          var xMin = points[0]["x"];
          var yMin = points[0]["y"];
          var xMax = points[0]["x"];
          var yMax = points[0]["y"];
          for (var i2 = 1; i2 < len; i2++) {
            var point = points[i2];
            if (point["x"] < xMin) {
              xMin = point["x"];
            } else if (point["x"] > xMax) {
              xMax = point["x"];
            }
            if (point["y"] < yMin) {
              yMin = point["y"];
            } else if (point["y"] > yMax) {
              yMax = point["y"];
            }
          }
          return new Box(this["pos"].clone().add(new Vector3(xMin, yMin)), xMax - xMin, yMax - yMin);
        };
        Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function() {
          return this.getAABBAsBox().toPolygon();
        };
        Polygon.prototype["getCentroid"] = Polygon.prototype.getCentroid = function() {
          var points = this["calcPoints"];
          var len = points.length;
          var cx = 0;
          var cy = 0;
          var ar = 0;
          for (var i2 = 0; i2 < len; i2++) {
            var p1 = points[i2];
            var p2 = i2 === len - 1 ? points[0] : points[i2 + 1];
            var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
            cx += (p1["x"] + p2["x"]) * a;
            cy += (p1["y"] + p2["y"]) * a;
            ar += a;
          }
          ar = ar * 3;
          cx = cx / ar;
          cy = cy / ar;
          return new Vector3(cx, cy);
        };
        function Box(pos, w, h) {
          this["pos"] = pos || new Vector3();
          this["w"] = w || 0;
          this["h"] = h || 0;
        }
        SAT["Box"] = Box;
        Box.prototype["toPolygon"] = Box.prototype.toPolygon = function() {
          var pos = this["pos"];
          var w = this["w"];
          var h = this["h"];
          return new Polygon(new Vector3(pos["x"], pos["y"]), [
            new Vector3(),
            new Vector3(w, 0),
            new Vector3(w, h),
            new Vector3(0, h)
          ]);
        };
        function Response() {
          this["a"] = null;
          this["b"] = null;
          this["overlapN"] = new Vector3();
          this["overlapV"] = new Vector3();
          this.clear();
        }
        SAT["Response"] = Response;
        Response.prototype["clear"] = Response.prototype.clear = function() {
          this["aInB"] = true;
          this["bInA"] = true;
          this["overlap"] = Number.MAX_VALUE;
          return this;
        };
        var T_VECTORS = [];
        for (var i = 0; i < 10; i++) {
          T_VECTORS.push(new Vector3());
        }
        var T_ARRAYS = [];
        for (var i = 0; i < 5; i++) {
          T_ARRAYS.push([]);
        }
        var T_RESPONSE = new Response();
        var TEST_POINT = new Box(new Vector3(), 1e-6, 1e-6).toPolygon();
        function flattenPointsOn(points, normal, result) {
          var min = Number.MAX_VALUE;
          var max = -Number.MAX_VALUE;
          var len = points.length;
          for (var i2 = 0; i2 < len; i2++) {
            var dot = points[i2].dot(normal);
            if (dot < min) {
              min = dot;
            }
            if (dot > max) {
              max = dot;
            }
          }
          result[0] = min;
          result[1] = max;
        }
        function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
          var rangeA = T_ARRAYS.pop();
          var rangeB = T_ARRAYS.pop();
          var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
          var projectedOffset = offsetV.dot(axis);
          flattenPointsOn(aPoints, axis, rangeA);
          flattenPointsOn(bPoints, axis, rangeB);
          rangeB[0] += projectedOffset;
          rangeB[1] += projectedOffset;
          if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
            T_VECTORS.push(offsetV);
            T_ARRAYS.push(rangeA);
            T_ARRAYS.push(rangeB);
            return true;
          }
          if (response) {
            var overlap = 0;
            if (rangeA[0] < rangeB[0]) {
              response["aInB"] = false;
              if (rangeA[1] < rangeB[1]) {
                overlap = rangeA[1] - rangeB[0];
                response["bInA"] = false;
              } else {
                var option1 = rangeA[1] - rangeB[0];
                var option2 = rangeB[1] - rangeA[0];
                overlap = option1 < option2 ? option1 : -option2;
              }
            } else {
              response["bInA"] = false;
              if (rangeA[1] > rangeB[1]) {
                overlap = rangeA[0] - rangeB[1];
                response["aInB"] = false;
              } else {
                var option1 = rangeA[1] - rangeB[0];
                var option2 = rangeB[1] - rangeA[0];
                overlap = option1 < option2 ? option1 : -option2;
              }
            }
            var absOverlap = Math.abs(overlap);
            if (absOverlap < response["overlap"]) {
              response["overlap"] = absOverlap;
              response["overlapN"].copy(axis);
              if (overlap < 0) {
                response["overlapN"].reverse();
              }
            }
          }
          T_VECTORS.push(offsetV);
          T_ARRAYS.push(rangeA);
          T_ARRAYS.push(rangeB);
          return false;
        }
        SAT["isSeparatingAxis"] = isSeparatingAxis;
        function voronoiRegion(line, point) {
          var len2 = line.len2();
          var dp = point.dot(line);
          if (dp < 0) {
            return LEFT_VORONOI_REGION;
          } else if (dp > len2) {
            return RIGHT_VORONOI_REGION;
          } else {
            return MIDDLE_VORONOI_REGION;
          }
        }
        var LEFT_VORONOI_REGION = -1;
        var MIDDLE_VORONOI_REGION = 0;
        var RIGHT_VORONOI_REGION = 1;
        function pointInCircle(p, c) {
          var differenceV = T_VECTORS.pop().copy(p).sub(c["pos"]).sub(c["offset"]);
          var radiusSq = c["r"] * c["r"];
          var distanceSq = differenceV.len2();
          T_VECTORS.push(differenceV);
          return distanceSq <= radiusSq;
        }
        SAT["pointInCircle"] = pointInCircle;
        function pointInPolygon(p, poly) {
          TEST_POINT["pos"].copy(p);
          T_RESPONSE.clear();
          var result = testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
          if (result) {
            result = T_RESPONSE["aInB"];
          }
          return result;
        }
        SAT["pointInPolygon"] = pointInPolygon;
        function testCircleCircle(a, b, response) {
          var differenceV = T_VECTORS.pop().copy(b["pos"]).add(b["offset"]).sub(a["pos"]).sub(a["offset"]);
          var totalRadius = a["r"] + b["r"];
          var totalRadiusSq = totalRadius * totalRadius;
          var distanceSq = differenceV.len2();
          if (distanceSq > totalRadiusSq) {
            T_VECTORS.push(differenceV);
            return false;
          }
          if (response) {
            var dist = Math.sqrt(distanceSq);
            response["a"] = a;
            response["b"] = b;
            response["overlap"] = totalRadius - dist;
            response["overlapN"].copy(differenceV.normalize());
            response["overlapV"].copy(differenceV).scale(response["overlap"]);
            response["aInB"] = a["r"] <= b["r"] && dist <= b["r"] - a["r"];
            response["bInA"] = b["r"] <= a["r"] && dist <= a["r"] - b["r"];
          }
          T_VECTORS.push(differenceV);
          return true;
        }
        SAT["testCircleCircle"] = testCircleCircle;
        function testPolygonCircle(polygon, circle, response) {
          var circlePos = T_VECTORS.pop().copy(circle["pos"]).add(circle["offset"]).sub(polygon["pos"]);
          var radius = circle["r"];
          var radius2 = radius * radius;
          var points = polygon["calcPoints"];
          var len = points.length;
          var edge = T_VECTORS.pop();
          var point = T_VECTORS.pop();
          for (var i2 = 0; i2 < len; i2++) {
            var next = i2 === len - 1 ? 0 : i2 + 1;
            var prev = i2 === 0 ? len - 1 : i2 - 1;
            var overlap = 0;
            var overlapN = null;
            edge.copy(polygon["edges"][i2]);
            point.copy(circlePos).sub(points[i2]);
            if (response && point.len2() > radius2) {
              response["aInB"] = false;
            }
            var region = voronoiRegion(edge, point);
            if (region === LEFT_VORONOI_REGION) {
              edge.copy(polygon["edges"][prev]);
              var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
              region = voronoiRegion(edge, point2);
              if (region === RIGHT_VORONOI_REGION) {
                var dist = point.len();
                if (dist > radius) {
                  T_VECTORS.push(circlePos);
                  T_VECTORS.push(edge);
                  T_VECTORS.push(point);
                  T_VECTORS.push(point2);
                  return false;
                } else if (response) {
                  response["bInA"] = false;
                  overlapN = point.normalize();
                  overlap = radius - dist;
                }
              }
              T_VECTORS.push(point2);
            } else if (region === RIGHT_VORONOI_REGION) {
              edge.copy(polygon["edges"][next]);
              point.copy(circlePos).sub(points[next]);
              region = voronoiRegion(edge, point);
              if (region === LEFT_VORONOI_REGION) {
                var dist = point.len();
                if (dist > radius) {
                  T_VECTORS.push(circlePos);
                  T_VECTORS.push(edge);
                  T_VECTORS.push(point);
                  return false;
                } else if (response) {
                  response["bInA"] = false;
                  overlapN = point.normalize();
                  overlap = radius - dist;
                }
              }
            } else {
              var normal = edge.perp().normalize();
              var dist = point.dot(normal);
              var distAbs = Math.abs(dist);
              if (dist > 0 && distAbs > radius) {
                T_VECTORS.push(circlePos);
                T_VECTORS.push(normal);
                T_VECTORS.push(point);
                return false;
              } else if (response) {
                overlapN = normal;
                overlap = radius - dist;
                if (dist >= 0 || overlap < 2 * radius) {
                  response["bInA"] = false;
                }
              }
            }
            if (overlapN && response && Math.abs(overlap) < Math.abs(response["overlap"])) {
              response["overlap"] = overlap;
              response["overlapN"].copy(overlapN);
            }
          }
          if (response) {
            response["a"] = polygon;
            response["b"] = circle;
            response["overlapV"].copy(response["overlapN"]).scale(response["overlap"]);
          }
          T_VECTORS.push(circlePos);
          T_VECTORS.push(edge);
          T_VECTORS.push(point);
          return true;
        }
        SAT["testPolygonCircle"] = testPolygonCircle;
        function testCirclePolygon(circle, polygon, response) {
          var result = testPolygonCircle(polygon, circle, response);
          if (result && response) {
            var a = response["a"];
            var aInB = response["aInB"];
            response["overlapN"].reverse();
            response["overlapV"].reverse();
            response["a"] = response["b"];
            response["b"] = a;
            response["aInB"] = response["bInA"];
            response["bInA"] = aInB;
          }
          return result;
        }
        SAT["testCirclePolygon"] = testCirclePolygon;
        function testPolygonPolygon(a, b, response) {
          var aPoints = a["calcPoints"];
          var aLen = aPoints.length;
          var bPoints = b["calcPoints"];
          var bLen = bPoints.length;
          for (var i2 = 0; i2 < aLen; i2++) {
            if (isSeparatingAxis(a["pos"], b["pos"], aPoints, bPoints, a["normals"][i2], response)) {
              return false;
            }
          }
          for (var i2 = 0; i2 < bLen; i2++) {
            if (isSeparatingAxis(a["pos"], b["pos"], aPoints, bPoints, b["normals"][i2], response)) {
              return false;
            }
          }
          if (response) {
            response["a"] = a;
            response["b"] = b;
            response["overlapV"].copy(response["overlapN"]).scale(response["overlap"]);
          }
          return true;
        }
        SAT["testPolygonPolygon"] = testPolygonPolygon;
        return SAT;
      });
    }
  });

  // node_modules/detect-collisions/dist/model.js
  var require_model = __commonJS({
    "node_modules/detect-collisions/dist/model.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Types = exports.SATVector = exports.Response = exports.RBush = void 0;
      var rbush_1 = __importDefault(require_rbush_min());
      Object.defineProperty(exports, "RBush", { enumerable: true, get: function() {
        return rbush_1.default;
      } });
      var sat_1 = require_SAT();
      Object.defineProperty(exports, "Response", { enumerable: true, get: function() {
        return sat_1.Response;
      } });
      Object.defineProperty(exports, "SATVector", { enumerable: true, get: function() {
        return sat_1.Vector;
      } });
      var Types;
      (function(Types2) {
        Types2["Ellipse"] = "Ellipse";
        Types2["Line"] = "Line";
        Types2["Circle"] = "Circle";
        Types2["Box"] = "Box";
        Types2["Point"] = "Point";
        Types2["Polygon"] = "Polygon";
      })(Types = exports.Types || (exports.Types = {}));
    }
  });

  // node_modules/poly-decomp/src/index.js
  var require_src = __commonJS({
    "node_modules/poly-decomp/src/index.js"(exports, module) {
      module.exports = {
        decomp: polygonDecomp,
        quickDecomp: polygonQuickDecomp,
        isSimple: polygonIsSimple,
        removeCollinearPoints: polygonRemoveCollinearPoints,
        removeDuplicatePoints: polygonRemoveDuplicatePoints,
        makeCCW: polygonMakeCCW
      };
      function lineInt(l1, l2, precision) {
        precision = precision || 0;
        var i = [0, 0];
        var a1, b1, c1, a2, b2, c2, det;
        a1 = l1[1][1] - l1[0][1];
        b1 = l1[0][0] - l1[1][0];
        c1 = a1 * l1[0][0] + b1 * l1[0][1];
        a2 = l2[1][1] - l2[0][1];
        b2 = l2[0][0] - l2[1][0];
        c2 = a2 * l2[0][0] + b2 * l2[0][1];
        det = a1 * b2 - a2 * b1;
        if (!scalar_eq(det, 0, precision)) {
          i[0] = (b2 * c1 - b1 * c2) / det;
          i[1] = (a1 * c2 - a2 * c1) / det;
        }
        return i;
      }
      function lineSegmentsIntersect(p1, p2, q1, q2) {
        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];
        var da = q2[0] - q1[0];
        var db = q2[1] - q1[1];
        if (da * dy - db * dx === 0) {
          return false;
        }
        var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx);
        var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy);
        return s >= 0 && s <= 1 && t >= 0 && t <= 1;
      }
      function triangleArea(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
      }
      function isLeft(a, b, c) {
        return triangleArea(a, b, c) > 0;
      }
      function isLeftOn(a, b, c) {
        return triangleArea(a, b, c) >= 0;
      }
      function isRight(a, b, c) {
        return triangleArea(a, b, c) < 0;
      }
      function isRightOn(a, b, c) {
        return triangleArea(a, b, c) <= 0;
      }
      var tmpPoint1 = [];
      var tmpPoint2 = [];
      function collinear(a, b, c, thresholdAngle) {
        if (!thresholdAngle) {
          return triangleArea(a, b, c) === 0;
        } else {
          var ab = tmpPoint1, bc = tmpPoint2;
          ab[0] = b[0] - a[0];
          ab[1] = b[1] - a[1];
          bc[0] = c[0] - b[0];
          bc[1] = c[1] - b[1];
          var dot = ab[0] * bc[0] + ab[1] * bc[1], magA = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]), magB = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]), angle = Math.acos(dot / (magA * magB));
          return angle < thresholdAngle;
        }
      }
      function sqdist(a, b) {
        var dx = b[0] - a[0];
        var dy = b[1] - a[1];
        return dx * dx + dy * dy;
      }
      function polygonAt(polygon, i) {
        var s = polygon.length;
        return polygon[i < 0 ? i % s + s : i % s];
      }
      function polygonClear(polygon) {
        polygon.length = 0;
      }
      function polygonAppend(polygon, poly, from, to) {
        for (var i = from; i < to; i++) {
          polygon.push(poly[i]);
        }
      }
      function polygonMakeCCW(polygon) {
        var br = 0, v = polygon;
        for (var i = 1; i < polygon.length; ++i) {
          if (v[i][1] < v[br][1] || v[i][1] === v[br][1] && v[i][0] > v[br][0]) {
            br = i;
          }
        }
        if (!isLeft(polygonAt(polygon, br - 1), polygonAt(polygon, br), polygonAt(polygon, br + 1))) {
          polygonReverse(polygon);
          return true;
        } else {
          return false;
        }
      }
      function polygonReverse(polygon) {
        var tmp = [];
        var N = polygon.length;
        for (var i = 0; i !== N; i++) {
          tmp.push(polygon.pop());
        }
        for (var i = 0; i !== N; i++) {
          polygon[i] = tmp[i];
        }
      }
      function polygonIsReflex(polygon, i) {
        return isRight(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1));
      }
      var tmpLine1 = [];
      var tmpLine2 = [];
      function polygonCanSee(polygon, a, b) {
        var p, dist, l1 = tmpLine1, l2 = tmpLine2;
        if (isLeftOn(polygonAt(polygon, a + 1), polygonAt(polygon, a), polygonAt(polygon, b)) && isRightOn(polygonAt(polygon, a - 1), polygonAt(polygon, a), polygonAt(polygon, b))) {
          return false;
        }
        dist = sqdist(polygonAt(polygon, a), polygonAt(polygon, b));
        for (var i = 0; i !== polygon.length; ++i) {
          if ((i + 1) % polygon.length === a || i === a) {
            continue;
          }
          if (isLeftOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i + 1)) && isRightOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i))) {
            l1[0] = polygonAt(polygon, a);
            l1[1] = polygonAt(polygon, b);
            l2[0] = polygonAt(polygon, i);
            l2[1] = polygonAt(polygon, i + 1);
            p = lineInt(l1, l2);
            if (sqdist(polygonAt(polygon, a), p) < dist) {
              return false;
            }
          }
        }
        return true;
      }
      function polygonCanSee2(polygon, a, b) {
        for (var i = 0; i !== polygon.length; ++i) {
          if (i === a || i === b || (i + 1) % polygon.length === a || (i + 1) % polygon.length === b) {
            continue;
          }
          if (lineSegmentsIntersect(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i), polygonAt(polygon, i + 1))) {
            return false;
          }
        }
        return true;
      }
      function polygonCopy(polygon, i, j, targetPoly) {
        var p = targetPoly || [];
        polygonClear(p);
        if (i < j) {
          for (var k = i; k <= j; k++) {
            p.push(polygon[k]);
          }
        } else {
          for (var k = 0; k <= j; k++) {
            p.push(polygon[k]);
          }
          for (var k = i; k < polygon.length; k++) {
            p.push(polygon[k]);
          }
        }
        return p;
      }
      function polygonGetCutEdges(polygon) {
        var min = [], tmp1 = [], tmp2 = [], tmpPoly = [];
        var nDiags = Number.MAX_VALUE;
        for (var i = 0; i < polygon.length; ++i) {
          if (polygonIsReflex(polygon, i)) {
            for (var j = 0; j < polygon.length; ++j) {
              if (polygonCanSee(polygon, i, j)) {
                tmp1 = polygonGetCutEdges(polygonCopy(polygon, i, j, tmpPoly));
                tmp2 = polygonGetCutEdges(polygonCopy(polygon, j, i, tmpPoly));
                for (var k = 0; k < tmp2.length; k++) {
                  tmp1.push(tmp2[k]);
                }
                if (tmp1.length < nDiags) {
                  min = tmp1;
                  nDiags = tmp1.length;
                  min.push([polygonAt(polygon, i), polygonAt(polygon, j)]);
                }
              }
            }
          }
        }
        return min;
      }
      function polygonDecomp(polygon) {
        var edges = polygonGetCutEdges(polygon);
        if (edges.length > 0) {
          return polygonSlice(polygon, edges);
        } else {
          return [polygon];
        }
      }
      function polygonSlice(polygon, cutEdges) {
        if (cutEdges.length === 0) {
          return [polygon];
        }
        if (cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length === 2 && cutEdges[0][0] instanceof Array) {
          var polys = [polygon];
          for (var i = 0; i < cutEdges.length; i++) {
            var cutEdge = cutEdges[i];
            for (var j = 0; j < polys.length; j++) {
              var poly = polys[j];
              var result = polygonSlice(poly, cutEdge);
              if (result) {
                polys.splice(j, 1);
                polys.push(result[0], result[1]);
                break;
              }
            }
          }
          return polys;
        } else {
          var cutEdge = cutEdges;
          var i = polygon.indexOf(cutEdge[0]);
          var j = polygon.indexOf(cutEdge[1]);
          if (i !== -1 && j !== -1) {
            return [
              polygonCopy(polygon, i, j),
              polygonCopy(polygon, j, i)
            ];
          } else {
            return false;
          }
        }
      }
      function polygonIsSimple(polygon) {
        var path = polygon, i;
        for (i = 0; i < path.length - 1; i++) {
          for (var j = 0; j < i - 1; j++) {
            if (lineSegmentsIntersect(path[i], path[i + 1], path[j], path[j + 1])) {
              return false;
            }
          }
        }
        for (i = 1; i < path.length - 2; i++) {
          if (lineSegmentsIntersect(path[0], path[path.length - 1], path[i], path[i + 1])) {
            return false;
          }
        }
        return true;
      }
      function getIntersectionPoint(p1, p2, q1, q2, delta) {
        delta = delta || 0;
        var a1 = p2[1] - p1[1];
        var b1 = p1[0] - p2[0];
        var c1 = a1 * p1[0] + b1 * p1[1];
        var a2 = q2[1] - q1[1];
        var b2 = q1[0] - q2[0];
        var c2 = a2 * q1[0] + b2 * q1[1];
        var det = a1 * b2 - a2 * b1;
        if (!scalar_eq(det, 0, delta)) {
          return [(b2 * c1 - b1 * c2) / det, (a1 * c2 - a2 * c1) / det];
        } else {
          return [0, 0];
        }
      }
      function polygonQuickDecomp(polygon, result, reflexVertices, steinerPoints, delta, maxlevel, level) {
        maxlevel = maxlevel || 100;
        level = level || 0;
        delta = delta || 25;
        result = typeof result !== "undefined" ? result : [];
        reflexVertices = reflexVertices || [];
        steinerPoints = steinerPoints || [];
        var upperInt = [0, 0], lowerInt = [0, 0], p = [0, 0];
        var upperDist = 0, lowerDist = 0, d = 0, closestDist = 0;
        var upperIndex = 0, lowerIndex = 0, closestIndex = 0;
        var lowerPoly = [], upperPoly = [];
        var poly = polygon, v = polygon;
        if (v.length < 3) {
          return result;
        }
        level++;
        if (level > maxlevel) {
          console.warn("quickDecomp: max level (" + maxlevel + ") reached.");
          return result;
        }
        for (var i = 0; i < polygon.length; ++i) {
          if (polygonIsReflex(poly, i)) {
            reflexVertices.push(poly[i]);
            upperDist = lowerDist = Number.MAX_VALUE;
            for (var j = 0; j < polygon.length; ++j) {
              if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j - 1))) {
                p = getIntersectionPoint(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j - 1));
                if (isRight(polygonAt(poly, i + 1), polygonAt(poly, i), p)) {
                  d = sqdist(poly[i], p);
                  if (d < lowerDist) {
                    lowerDist = d;
                    lowerInt = p;
                    lowerIndex = j;
                  }
                }
              }
              if (isLeft(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j + 1)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))) {
                p = getIntersectionPoint(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j + 1));
                if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), p)) {
                  d = sqdist(poly[i], p);
                  if (d < upperDist) {
                    upperDist = d;
                    upperInt = p;
                    upperIndex = j;
                  }
                }
              }
            }
            if (lowerIndex === (upperIndex + 1) % polygon.length) {
              p[0] = (lowerInt[0] + upperInt[0]) / 2;
              p[1] = (lowerInt[1] + upperInt[1]) / 2;
              steinerPoints.push(p);
              if (i < upperIndex) {
                polygonAppend(lowerPoly, poly, i, upperIndex + 1);
                lowerPoly.push(p);
                upperPoly.push(p);
                if (lowerIndex !== 0) {
                  polygonAppend(upperPoly, poly, lowerIndex, poly.length);
                }
                polygonAppend(upperPoly, poly, 0, i + 1);
              } else {
                if (i !== 0) {
                  polygonAppend(lowerPoly, poly, i, poly.length);
                }
                polygonAppend(lowerPoly, poly, 0, upperIndex + 1);
                lowerPoly.push(p);
                upperPoly.push(p);
                polygonAppend(upperPoly, poly, lowerIndex, i + 1);
              }
            } else {
              if (lowerIndex > upperIndex) {
                upperIndex += polygon.length;
              }
              closestDist = Number.MAX_VALUE;
              if (upperIndex < lowerIndex) {
                return result;
              }
              for (var j = lowerIndex; j <= upperIndex; ++j) {
                if (isLeftOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))) {
                  d = sqdist(polygonAt(poly, i), polygonAt(poly, j));
                  if (d < closestDist && polygonCanSee2(poly, i, j)) {
                    closestDist = d;
                    closestIndex = j % polygon.length;
                  }
                }
              }
              if (i < closestIndex) {
                polygonAppend(lowerPoly, poly, i, closestIndex + 1);
                if (closestIndex !== 0) {
                  polygonAppend(upperPoly, poly, closestIndex, v.length);
                }
                polygonAppend(upperPoly, poly, 0, i + 1);
              } else {
                if (i !== 0) {
                  polygonAppend(lowerPoly, poly, i, v.length);
                }
                polygonAppend(lowerPoly, poly, 0, closestIndex + 1);
                polygonAppend(upperPoly, poly, closestIndex, i + 1);
              }
            }
            if (lowerPoly.length < upperPoly.length) {
              polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
              polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
            } else {
              polygonQuickDecomp(upperPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
              polygonQuickDecomp(lowerPoly, result, reflexVertices, steinerPoints, delta, maxlevel, level);
            }
            return result;
          }
        }
        result.push(polygon);
        return result;
      }
      function polygonRemoveCollinearPoints(polygon, precision) {
        var num = 0;
        for (var i = polygon.length - 1; polygon.length > 3 && i >= 0; --i) {
          if (collinear(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1), precision)) {
            polygon.splice(i % polygon.length, 1);
            num++;
          }
        }
        return num;
      }
      function polygonRemoveDuplicatePoints(polygon, precision) {
        for (var i = polygon.length - 1; i >= 1; --i) {
          var pi = polygon[i];
          for (var j = i - 1; j >= 0; --j) {
            if (points_eq(pi, polygon[j], precision)) {
              polygon.splice(i, 1);
              continue;
            }
          }
        }
      }
      function scalar_eq(a, b, precision) {
        precision = precision || 0;
        return Math.abs(a - b) <= precision;
      }
      function points_eq(a, b, precision) {
        return scalar_eq(a[0], b[0], precision) && scalar_eq(a[1], b[1], precision);
      }
    }
  });

  // node_modules/detect-collisions/dist/bodies/polygon.js
  var require_polygon = __commonJS({
    "node_modules/detect-collisions/dist/bodies/polygon.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Polygon = void 0;
      var poly_decomp_1 = require_src();
      var sat_1 = require_SAT();
      var model_1 = require_model();
      var utils_1 = require_utils();
      var Polygon = class extends sat_1.Polygon {
        constructor(position, points, options) {
          super((0, utils_1.ensureVectorPoint)(position), (0, utils_1.ensurePolygonPoints)(points));
          this.convexPolygons = [];
          this.padding = 0;
          this.type = model_1.Types.Polygon;
          this.scaleVector = { x: 1, y: 1 };
          if (!(points === null || points === void 0 ? void 0 : points.length)) {
            throw new Error("No points in polygon");
          }
          (0, utils_1.extendBody)(this, options);
          this.updateAABB();
        }
        get x() {
          return this.pos.x;
        }
        set x(x) {
          var _a;
          this.pos.x = x;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        get y() {
          return this.pos.y;
        }
        set y(y) {
          var _a;
          this.pos.y = y;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        get scaleX() {
          return this.scaleVector.x;
        }
        get scaleY() {
          return this.scaleVector.y;
        }
        get scale() {
          return this.scaleVector.x;
        }
        set scale(scale) {
          this.setScale(scale);
        }
        getConvex() {
          return this.points.length > 2 ? (0, poly_decomp_1.quickDecomp)(this.calcPoints.map(utils_1.mapVectorToArray)) : [];
        }
        setPoints(points) {
          super.setPoints(points);
          this.updateIsConvex();
          this.pointsBackup = (0, utils_1.clonePointsArray)(points);
          return this;
        }
        updateConvexPolygons(convex = this.getConvex()) {
          convex.forEach((points, index) => {
            if (!this.convexPolygons[index]) {
              this.convexPolygons[index] = new sat_1.Polygon();
            }
            this.convexPolygons[index].pos.x = this.x;
            this.convexPolygons[index].pos.y = this.y;
            this.convexPolygons[index].setPoints((0, utils_1.ensurePolygonPoints)(points.map(utils_1.mapArrayToVector)));
          });
          this.convexPolygons.length = convex.length;
        }
        setPosition(x, y) {
          var _a;
          this.pos.x = x;
          this.pos.y = y;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        setScale(x, y = x) {
          this.scaleVector.x = x;
          this.scaleVector.y = y;
          this.points.forEach((point, i) => {
            point.x = this.pointsBackup[i].x * x;
            point.y = this.pointsBackup[i].y * y;
          });
          super.setPoints(this.points);
        }
        getAABBAsBBox() {
          const { pos, w, h } = this.getAABBAsBox();
          return {
            minX: pos.x,
            minY: pos.y,
            maxX: pos.x + w,
            maxY: pos.y + h
          };
        }
        updateAABB(bounds = this.getAABBAsBBox()) {
          (0, utils_1.updateAABB)(this, bounds);
        }
        draw(context2) {
          const points = [...this.calcPoints, this.calcPoints[0]];
          points.forEach((point, index) => {
            const toX = this.x + point.x;
            const toY = this.y + point.y;
            const prev = this.calcPoints[index - 1] || this.calcPoints[this.calcPoints.length - 1];
            if (!index) {
              if (this.calcPoints.length === 1) {
                context2.arc(toX, toY, 1, 0, Math.PI * 2);
              } else {
                context2.moveTo(toX, toY);
              }
            } else if (this.calcPoints.length > 1) {
              if (this.isTrigger) {
                const fromX = this.x + prev.x;
                const fromY = this.y + prev.y;
                (0, utils_1.dashLineTo)(context2, fromX, fromY, toX, toY);
              } else {
                context2.lineTo(toX, toY);
              }
            }
          });
        }
        getCentroidWithoutRotation() {
          const angle = this.angle;
          this.setAngle(0);
          const centroid = this.getCentroid();
          this.setAngle(angle);
          return centroid;
        }
        center() {
          if (this.isCentered) {
            return;
          }
          const { x, y } = this.getCentroidWithoutRotation();
          this.translate(-x, -y);
          this.pos.x += x;
          this.pos.y += y;
          this.isCentered = true;
          this.pointsBackup = (0, utils_1.clonePointsArray)(this.points);
        }
        rotate(angle) {
          super.rotate(angle);
          this.pointsBackup = (0, utils_1.clonePointsArray)(this.points);
          return this;
        }
        updateIsConvex() {
          const convex = this.getConvex();
          this.isConvex = convex.length <= 1;
        }
      };
      exports.Polygon = Polygon;
    }
  });

  // node_modules/detect-collisions/dist/bodies/line.js
  var require_line = __commonJS({
    "node_modules/detect-collisions/dist/bodies/line.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Line = void 0;
      var sat_1 = require_SAT();
      var model_1 = require_model();
      var polygon_1 = require_polygon();
      var Line = class extends polygon_1.Polygon {
        constructor(start, end, options) {
          super(start, [
            { x: 0, y: 0 },
            { x: end.x - start.x, y: end.y - start.y }
          ], options);
          this.type = model_1.Types.Line;
          this.isConvex = true;
          if (this.calcPoints.length === 1 || !end) {
            console.error({ start, end });
            throw new Error("No end point for line provided");
          }
        }
        get start() {
          return {
            x: this.x + this.calcPoints[0].x,
            y: this.y + this.calcPoints[0].y
          };
        }
        get end() {
          return {
            x: this.x + this.calcPoints[1].x,
            y: this.y + this.calcPoints[1].y
          };
        }
        getCentroid() {
          return new sat_1.Vector((this.end.x - this.start.x) / 2, (this.end.y - this.start.y) / 2);
        }
        updateIsConvex() {
        }
      };
      exports.Line = Line;
    }
  });

  // node_modules/detect-collisions/dist/utils.js
  var require_utils = __commonJS({
    "node_modules/detect-collisions/dist/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getBounceDirection = exports.ensureConvexPolygons = exports.mapArrayToVector = exports.mapVectorToArray = exports.intersectLinePolygon = exports.intersectLineLine = exports.intersectLineCircle = exports.dashLineTo = exports.clonePointsArray = exports.checkAInB = exports.updateAABB = exports.extendBody = exports.clockwise = exports.distance = exports.ensurePolygonPoints = exports.ensureVectorPoint = exports.createBox = exports.createEllipse = void 0;
      var sat_1 = require_SAT();
      var line_1 = require_line();
      function createEllipse(radiusX, radiusY = radiusX, step = 1) {
        const steps = Math.PI * Math.hypot(radiusX, radiusY) * 2;
        const length = Math.max(8, Math.ceil(steps / Math.max(1, step)));
        return Array.from({ length }, (_, index) => {
          const value = index / length * 2 * Math.PI;
          const x = Math.cos(value) * radiusX;
          const y = Math.sin(value) * radiusY;
          return new sat_1.Vector(x, y);
        });
      }
      exports.createEllipse = createEllipse;
      function createBox(width, height) {
        return [
          new sat_1.Vector(0, 0),
          new sat_1.Vector(width, 0),
          new sat_1.Vector(width, height),
          new sat_1.Vector(0, height)
        ];
      }
      exports.createBox = createBox;
      function ensureVectorPoint(point = {}) {
        return point instanceof sat_1.Vector ? point : new sat_1.Vector(point.x || 0, point.y || 0);
      }
      exports.ensureVectorPoint = ensureVectorPoint;
      function ensurePolygonPoints(points) {
        if (!points) {
          throw new Error("No points array provided");
        }
        const polygonPoints = points.map(ensureVectorPoint);
        return clockwise(polygonPoints) ? polygonPoints.reverse() : polygonPoints;
      }
      exports.ensurePolygonPoints = ensurePolygonPoints;
      function distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
      }
      exports.distance = distance;
      function clockwise(points) {
        let sum = 0;
        for (let i = 0; i < points.length; i++) {
          const v1 = points[i];
          const v2 = points[(i + 1) % points.length];
          sum += (v2.x - v1.x) * (v2.y + v1.y);
        }
        return sum > 0;
      }
      exports.clockwise = clockwise;
      function extendBody(body, options) {
        body.isStatic = !!(options === null || options === void 0 ? void 0 : options.isStatic);
        body.isTrigger = !!(options === null || options === void 0 ? void 0 : options.isTrigger);
        body.padding = (options === null || options === void 0 ? void 0 : options.padding) || 0;
        if (options === null || options === void 0 ? void 0 : options.center) {
          body.center();
        }
        body.setAngle((options === null || options === void 0 ? void 0 : options.angle) || 0);
      }
      exports.extendBody = extendBody;
      function updateAABB(body, bounds) {
        body.minX = bounds.minX - body.padding;
        body.minY = bounds.minY - body.padding;
        body.maxX = bounds.maxX + body.padding;
        body.maxY = bounds.maxY + body.padding;
      }
      exports.updateAABB = updateAABB;
      function checkAInB(a, b) {
        const insideX = a.minX >= b.minX && a.maxX <= b.maxX;
        const insideY = a.minY >= b.minY && a.maxY <= b.maxY;
        return insideX && insideY;
      }
      exports.checkAInB = checkAInB;
      function clonePointsArray(points) {
        return Array.from(points, (_, index) => points[index].clone());
      }
      exports.clonePointsArray = clonePointsArray;
      function dashLineTo(context2, fromX, fromY, toX, toY, dash = 2, gap = 4) {
        const xDiff = toX - fromX;
        const yDiff = toY - fromY;
        const arc = Math.atan2(yDiff, xDiff);
        const offsetX = Math.cos(arc);
        const offsetY = Math.sin(arc);
        let posX = fromX;
        let posY = fromY;
        let dist = Math.hypot(xDiff, yDiff);
        while (dist > 0) {
          const step = Math.min(dist, dash);
          context2.moveTo(posX, posY);
          context2.lineTo(posX + offsetX * step, posY + offsetY * step);
          posX += offsetX * (dash + gap);
          posY += offsetY * (dash + gap);
          dist -= dash + gap;
        }
      }
      exports.dashLineTo = dashLineTo;
      function intersectLineCircle(line, circle) {
        const v1 = { x: line.end.x - line.start.x, y: line.end.y - line.start.y };
        const v2 = { x: line.start.x - circle.pos.x, y: line.start.y - circle.pos.y };
        const b = (v1.x * v2.x + v1.y * v2.y) * -2;
        const c = (v1.x * v1.x + v1.y * v1.y) * 2;
        const d = Math.sqrt(b * b - (v2.x * v2.x + v2.y * v2.y - circle.r * circle.r) * c * 2);
        if (isNaN(d)) {
          return [];
        }
        const u1 = (b - d) / c;
        const u2 = (b + d) / c;
        const results = [];
        if (u1 <= 1 && u1 >= 0) {
          results.push({ x: line.start.x + v1.x * u1, y: line.start.y + v1.y * u1 });
        }
        if (u2 <= 1 && u2 >= 0) {
          results.push({ x: line.start.x + v1.x * u2, y: line.start.y + v1.y * u2 });
        }
        return results;
      }
      exports.intersectLineCircle = intersectLineCircle;
      function intersectLineLine(line1, line2) {
        const dX = line1.end.x - line1.start.x;
        const dY = line1.end.y - line1.start.y;
        const determinant = dX * (line2.end.y - line2.start.y) - (line2.end.x - line2.start.x) * dY;
        if (determinant === 0) {
          return null;
        }
        const lambda = ((line2.end.y - line2.start.y) * (line2.end.x - line1.start.x) + (line2.start.x - line2.end.x) * (line2.end.y - line1.start.y)) / determinant;
        const gamma = ((line1.start.y - line1.end.y) * (line2.end.x - line1.start.x) + dX * (line2.end.y - line1.start.y)) / determinant;
        if (!(lambda >= 0 && lambda <= 1) || !(gamma >= 0 && gamma <= 1)) {
          return null;
        }
        return { x: line1.start.x + lambda * dX, y: line1.start.y + lambda * dY };
      }
      exports.intersectLineLine = intersectLineLine;
      function intersectLinePolygon(line, polygon) {
        return polygon.calcPoints.map((to, index) => {
          const from = index ? polygon.calcPoints[index - 1] : polygon.calcPoints[polygon.calcPoints.length - 1];
          const side = new line_1.Line({ x: from.x + polygon.pos.x, y: from.y + polygon.pos.y }, { x: to.x + polygon.pos.x, y: to.y + polygon.pos.y });
          return intersectLineLine(line, side);
        }).filter((test) => !!test);
      }
      exports.intersectLinePolygon = intersectLinePolygon;
      function mapVectorToArray({ x, y }) {
        return [x, y];
      }
      exports.mapVectorToArray = mapVectorToArray;
      function mapArrayToVector([x, y]) {
        return { x, y };
      }
      exports.mapArrayToVector = mapArrayToVector;
      function ensureConvexPolygons(body) {
        if (body.isConvex) {
          return [body];
        }
        body.updateConvexPolygons();
        return body.convexPolygons;
      }
      exports.ensureConvexPolygons = ensureConvexPolygons;
      function getBounceDirection(body, collider) {
        const v2 = new sat_1.Vector(collider.x - body.x, collider.y - body.y);
        const v1 = new sat_1.Vector(body.x - collider.x, body.y - collider.y);
        const len = v1.dot(v2.normalize()) * 2;
        return new sat_1.Vector(v2.x * len - v1.x, v2.y * len - v1.y).normalize();
      }
      exports.getBounceDirection = getBounceDirection;
    }
  });

  // node_modules/detect-collisions/dist/bodies/circle.js
  var require_circle = __commonJS({
    "node_modules/detect-collisions/dist/bodies/circle.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Circle = void 0;
      var sat_1 = require_SAT();
      var model_1 = require_model();
      var utils_1 = require_utils();
      var Circle2 = class extends sat_1.Circle {
        constructor(position, radius, options) {
          super((0, utils_1.ensureVectorPoint)(position), radius);
          this.padding = 0;
          this.angle = 0;
          this.isConvex = true;
          this.isCentered = true;
          this.type = model_1.Types.Circle;
          (0, utils_1.extendBody)(this, options);
          this.radiusBackup = radius;
          this.updateAABB();
        }
        get x() {
          return this.pos.x;
        }
        set x(x) {
          var _a;
          this.pos.x = x;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        get y() {
          return this.pos.y;
        }
        set y(y) {
          var _a;
          this.pos.y = y;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        get scale() {
          return this.r / this.radiusBackup;
        }
        set scale(scale) {
          this.setScale(scale);
        }
        get scaleX() {
          return this.scale;
        }
        get scaleY() {
          return this.scale;
        }
        setPosition(x, y) {
          var _a;
          this.pos.x = x;
          this.pos.y = y;
          (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
        }
        setScale(scale, _ignoredParameter) {
          this.r = this.radiusBackup * scale;
        }
        getAABBAsBBox() {
          return {
            minX: this.pos.x - this.r,
            minY: this.pos.y - this.r,
            maxX: this.pos.x + this.r,
            maxY: this.pos.y + this.r
          };
        }
        updateAABB(bounds = this.getAABBAsBBox()) {
          (0, utils_1.updateAABB)(this, bounds);
        }
        draw(context2) {
          const radius = this.r;
          if (this.isTrigger) {
            const max = Math.max(8, radius);
            for (let i = 0; i < max; i++) {
              const arc = i / max * 2 * Math.PI;
              const arcPrev = (i - 1) / max * 2 * Math.PI;
              const fromX = this.pos.x + Math.cos(arcPrev) * radius;
              const fromY = this.pos.y + Math.sin(arcPrev) * radius;
              const toX = this.pos.x + Math.cos(arc) * radius;
              const toY = this.pos.y + Math.sin(arc) * radius;
              (0, utils_1.dashLineTo)(context2, fromX, fromY, toX, toY);
            }
          } else {
            context2.moveTo(this.pos.x + radius, this.pos.y);
            context2.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
          }
        }
        setAngle(angle) {
          this.angle = angle;
        }
        center() {
        }
      };
      exports.Circle = Circle2;
    }
  });

  // node_modules/detect-collisions/dist/bodies/ellipse.js
  var require_ellipse = __commonJS({
    "node_modules/detect-collisions/dist/bodies/ellipse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Ellipse = void 0;
      var model_1 = require_model();
      var utils_1 = require_utils();
      var polygon_1 = require_polygon();
      var Ellipse = class extends polygon_1.Polygon {
        constructor(position, radiusX, radiusY = radiusX, step = (radiusX + radiusY) / Math.PI, options) {
          super(position, (0, utils_1.createEllipse)(radiusX, radiusY, step), options);
          this.type = model_1.Types.Ellipse;
          this.isConvex = true;
          this._radiusX = radiusX;
          this._radiusY = radiusY;
          this._step = step;
        }
        get step() {
          return this._step;
        }
        set step(step) {
          this._step = step;
          this.setPoints((0, utils_1.createEllipse)(this._radiusX, this._radiusY, this._step));
        }
        get radiusX() {
          return this._radiusX;
        }
        set radiusX(radiusX) {
          this._radiusX = radiusX;
          this.setPoints((0, utils_1.createEllipse)(this._radiusX, this._radiusY, this._step));
        }
        get radiusY() {
          return this._radiusY;
        }
        set radiusY(radiusY) {
          this._radiusY = radiusY;
          this.setPoints((0, utils_1.createEllipse)(this._radiusX, this._radiusY, this._step));
        }
        center() {
        }
        updateIsConvex() {
        }
      };
      exports.Ellipse = Ellipse;
    }
  });

  // node_modules/detect-collisions/dist/bodies/box.js
  var require_box = __commonJS({
    "node_modules/detect-collisions/dist/bodies/box.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Box = void 0;
      var model_1 = require_model();
      var utils_1 = require_utils();
      var polygon_1 = require_polygon();
      var Box = class extends polygon_1.Polygon {
        constructor(position, width, height, options) {
          super(position, (0, utils_1.createBox)(width, height), options);
          this.type = model_1.Types.Box;
          this.isConvex = true;
          this._width = width;
          this._height = height;
        }
        get width() {
          return this._width;
        }
        set width(width) {
          this._width = width;
          this.setPoints((0, utils_1.createBox)(this._width, this._height));
        }
        get height() {
          return this._height;
        }
        set height(height) {
          this._height = height;
          this.setPoints((0, utils_1.createBox)(this._width, this._height));
        }
        updateIsConvex() {
        }
      };
      exports.Box = Box;
    }
  });

  // node_modules/detect-collisions/dist/bodies/point.js
  var require_point = __commonJS({
    "node_modules/detect-collisions/dist/bodies/point.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Point = void 0;
      var model_1 = require_model();
      var utils_1 = require_utils();
      var box_1 = require_box();
      var Point = class extends box_1.Box {
        constructor(position, options) {
          super((0, utils_1.ensureVectorPoint)(position), 1e-3, 1e-3, options);
          this.type = model_1.Types.Point;
        }
        center() {
        }
      };
      exports.Point = Point;
    }
  });

  // node_modules/detect-collisions/dist/base-system.js
  var require_base_system = __commonJS({
    "node_modules/detect-collisions/dist/base-system.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BaseSystem = void 0;
      var box_1 = require_box();
      var circle_1 = require_circle();
      var ellipse_1 = require_ellipse();
      var line_1 = require_line();
      var point_1 = require_point();
      var polygon_1 = require_polygon();
      var model_1 = require_model();
      var utils_1 = require_utils();
      var BaseSystem = class extends model_1.RBush {
        draw(context2) {
          this.all().forEach((body) => {
            body.draw(context2);
          });
        }
        drawBVH(context2) {
          [...this.all(), ...this.data.children].forEach(({ minX, maxX, minY, maxY }) => {
            polygon_1.Polygon.prototype.draw.call({
              x: minX,
              y: minY,
              calcPoints: (0, utils_1.createBox)(maxX - minX, maxY - minY)
            }, context2);
          });
        }
        createPoint(position, options) {
          const point = new point_1.Point(position, options);
          this.insert(point);
          return point;
        }
        createLine(start, end, options) {
          const line = new line_1.Line(start, end, options);
          this.insert(line);
          return line;
        }
        createCircle(position, radius, options) {
          const circle = new circle_1.Circle(position, radius, options);
          this.insert(circle);
          return circle;
        }
        createBox(position, width, height, options) {
          const box = new box_1.Box(position, width, height, options);
          this.insert(box);
          return box;
        }
        createEllipse(position, radiusX, radiusY = radiusX, step, options) {
          const ellipse = new ellipse_1.Ellipse(position, radiusX, radiusY, step, options);
          this.insert(ellipse);
          return ellipse;
        }
        createPolygon(position, points, options) {
          const polygon = new polygon_1.Polygon(position, points, options);
          this.insert(polygon);
          return polygon;
        }
      };
      exports.BaseSystem = BaseSystem;
    }
  });

  // node_modules/detect-collisions/dist/system.js
  var require_system = __commonJS({
    "node_modules/detect-collisions/dist/system.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.System = void 0;
      var sat_1 = require_SAT();
      var base_system_1 = require_base_system();
      var model_1 = require_model();
      var utils_1 = require_utils();
      var System2 = class extends base_system_1.BaseSystem {
        constructor() {
          super(...arguments);
          this.response = new model_1.Response();
        }
        updateBody(body) {
          const bounds = body.getAABBAsBBox();
          const update = bounds.minX < body.minX || bounds.minY < body.minY || bounds.maxX > body.maxX || bounds.maxY > body.maxY;
          if (!update) {
            return;
          }
          this.remove(body);
          body.updateAABB(bounds);
          this.insert(body);
        }
        remove(body, equals) {
          body.system = void 0;
          return super.remove(body, equals);
        }
        insert(body) {
          body.system = this;
          return super.insert(body);
        }
        update() {
          this.all().forEach((body) => {
            if (!body.isStatic) {
              this.updateBody(body);
            }
          });
        }
        separate() {
          this.checkAll((response) => {
            if (response.a.isTrigger) {
              return;
            }
            response.a.x -= response.overlapV.x;
            response.a.y -= response.overlapV.y;
            this.updateBody(response.a);
          });
        }
        checkOne(body, callback) {
          if (body.isStatic) {
            return;
          }
          this.getPotentials(body).forEach((candidate) => {
            if (this.checkCollision(body, candidate)) {
              callback(this.response);
            }
          });
        }
        checkAll(callback) {
          this.all().forEach((body) => {
            this.checkOne(body, callback);
          });
        }
        getPotentials(body) {
          return this.search(body).filter((candidate) => candidate !== body);
        }
        checkCollision(body, candidate) {
          this.response.clear();
          let result = false;
          const state = {
            collides: false
          };
          if (body.type === model_1.Types.Circle) {
            if (candidate.type === model_1.Types.Circle) {
              result = (0, sat_1.testCircleCircle)(body, candidate, this.response);
            } else {
              result = (0, utils_1.ensureConvexPolygons)(candidate).reduce((collidedAtLeastOnce, convexCandidate) => {
                state.collides = (0, sat_1.testCirclePolygon)(body, convexCandidate, this.response);
                return this.collided(state) || collidedAtLeastOnce;
              }, false);
            }
          } else if (candidate.type === model_1.Types.Circle) {
            result = (0, utils_1.ensureConvexPolygons)(body).reduce((collidedAtLeastOnce, convexBody) => {
              state.collides = (0, sat_1.testPolygonCircle)(convexBody, candidate, this.response);
              return this.collided(state) || collidedAtLeastOnce;
            }, false);
          } else if (!body.isConvex || !candidate.isConvex) {
            const convexBodies = (0, utils_1.ensureConvexPolygons)(body);
            const convexCandidates = (0, utils_1.ensureConvexPolygons)(candidate);
            result = convexBodies.reduce((reduceResult, convexBody) => convexCandidates.reduce((collidedAtLeastOnce, convexCandidate) => {
              state.collides = (0, sat_1.testPolygonPolygon)(convexBody, convexCandidate, this.response);
              return this.collided(state) || collidedAtLeastOnce;
            }, false) || reduceResult, false);
          } else {
            result = (0, sat_1.testPolygonPolygon)(body, candidate, this.response);
          }
          if (state.collisionVector) {
            this.response.overlapV = state.collisionVector;
            this.response.overlapN = this.response.overlapV.clone().normalize();
            this.response.overlap = this.response.overlapV.len();
          }
          if (!body.isConvex || !candidate.isConvex) {
            this.response.a = body;
            this.response.b = candidate;
          }
          if (!body.isConvex && !candidate.isConvex) {
            this.response.aInB = (0, utils_1.checkAInB)(body, candidate);
            this.response.bInA = (0, utils_1.checkAInB)(candidate, body);
          } else if (!body.isConvex) {
            this.response.aInB = (0, utils_1.checkAInB)(body, candidate);
            this.response.bInA = !!state.bInA;
          } else if (!candidate.isConvex) {
            this.response.aInB = !!state.aInB;
            this.response.bInA = (0, utils_1.checkAInB)(candidate, body);
          }
          return result;
        }
        raycast(start, end, allowCollider = () => true) {
          let minDistance = Infinity;
          let result = null;
          const ray = this.createLine(start, end);
          const colliders = this.getPotentials(ray).filter((potential) => allowCollider(potential) && this.checkCollision(ray, potential));
          this.remove(ray);
          colliders.forEach((collider) => {
            const points = collider.type === model_1.Types.Circle ? (0, utils_1.intersectLineCircle)(ray, collider) : (0, utils_1.intersectLinePolygon)(ray, collider);
            points.forEach((point) => {
              const pointDistance = (0, utils_1.distance)(start, point);
              if (pointDistance < minDistance) {
                minDistance = pointDistance;
                result = { point, collider };
              }
            });
          });
          return result;
        }
        collided(state) {
          if (state.collides) {
            if (typeof state.collisionVector === "undefined") {
              state.collisionVector = new model_1.SATVector();
            }
            state.collisionVector.add(this.response.overlapV);
          }
          state.aInB = state.aInB || this.response.aInB;
          state.bInA = state.bInA || this.response.bInA;
          this.response.clear();
          return state.collides;
        }
      };
      exports.System = System2;
    }
  });

  // node_modules/detect-collisions/dist/index.js
  var require_dist = __commonJS({
    "node_modules/detect-collisions/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_model(), exports);
      __exportStar(require_circle(), exports);
      __exportStar(require_ellipse(), exports);
      __exportStar(require_polygon(), exports);
      __exportStar(require_box(), exports);
      __exportStar(require_point(), exports);
      __exportStar(require_line(), exports);
      __exportStar(require_system(), exports);
      __exportStar(require_utils(), exports);
    }
  });

  // src/balls/index.ts
  var import_eventemitter3 = __toESM(require_eventemitter3());

  // src/engine/ecs/World.ts
  var World = class {
    constructor() {
      this.systems = [];
      this.entities = [];
      this.addSystem = (system) => {
        if (this.systems.find((p) => p.name === system.name)) {
          throw new Error(`System with name: ${system.name} already exist`);
        }
        this.systems.push(system);
      };
      this.addEntity = (entity) => {
        if (this.entities.find((p) => p.name === entity.name)) {
          throw new Error(`Entity with name: ${entity.name} already exist`);
        }
        this.entities.push(entity);
        window.ee.emit("debug", { key: "entities", value: this.entities.length });
      };
      this.execute = (dt) => {
        this.systems.forEach((system) => system.execute(dt));
      };
    }
    removeEntity(entity) {
      this.entities = this.entities.filter((p) => p.name !== entity.name);
    }
  };

  // src/engine/ecs/Entity.ts
  var Entity = class {
    constructor(name) {
      this.components = [];
      this.name = name;
    }
    hasComponent(name) {
      return this.components.some((p) => p.name === name);
    }
    getComponent(name) {
      return this.components.find((p) => p.name === name);
    }
    addComponent(component) {
      if (this.components.find((p) => p.name === component.name)) {
        throw new Error(`Component with name: ${component.name} already exist`);
      }
      this.components.push(component);
    }
  };

  // src/engine/ecs/Component.ts
  var Component = class {
    constructor(name) {
      this.name = name;
    }
  };

  // src/engine/ecs/System.ts
  var System = class {
    constructor(name, world2) {
      this.name = name;
      this.world = world2;
    }
    execute(dt) {
    }
  };

  // src/engine/Vector.ts
  var _Vector = class {
    constructor(x, y) {
      this.distance = (b) => {
        return Math.hypot(b.x - this.x, b.y - this.y);
      };
      this.x = x;
      this.y = y;
    }
    magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
      return this.scale(1 / this.magnitude());
    }
    add(b) {
      return new _Vector(this.x + b.x, this.y + b.y);
    }
    subtract(b) {
      return new _Vector(this.x - b.x, this.y - b.y);
    }
    scale(kx, ky = kx) {
      return new _Vector(this.x * kx, this.y * ky);
    }
    dot(b) {
      return this.x * b.x + this.y * b.y;
    }
    equalTo(b) {
      return this.x === b.x && this.y === b.y;
    }
  };
  var Vector = _Vector;
  Vector.ZERO = new _Vector(0, 0);

  // src/engine/InputManager.ts
  var InputManager = class {
    constructor() {
      this.keysDown = /* @__PURE__ */ new Map();
      this.mappedKeys = ["F1", "F2", "F3", "F4", "F5"];
      this.listen();
    }
    listen() {
      const { ee: ee2 } = window;
      ["keydown", "keyup"].forEach((eventName) => {
        window.addEventListener(eventName, (event) => {
          if (event instanceof KeyboardEvent) {
            const { code, type } = event;
            if (this.mappedKeys.find((p) => p === code)) {
              event.preventDefault();
            }
            if (this.keysDown.has(code) && type === "keydown") {
              return;
            }
            if (type === "keydown") {
              this.keysDown.set(code, true);
            } else if (type === "keyup") {
              this.keysDown.delete(code);
            }
          }
        });
      });
      window.addEventListener("keyup", (event) => {
        ee2.emit("keyup", event);
      });
    }
  };

  // src/engine/DebugSystem.ts
  var DebugSystem = class extends System {
    constructor(world2) {
      super("debug", world2);
      this.display = true;
      this.items = [
        { key: "entities", value: 0 }
      ];
      const { ee: ee2 } = window;
      ee2.on("keyup", (e) => {
        if (e.code === "KeyK") {
          this.display = !this.display;
        }
      });
      ee2.on("debug", ({ key, value }) => {
        const existingItem = this.items.find((p) => p.key === key);
        existingItem ? existingItem.value = value : this.items.push({ key, value });
      });
    }
    execute(dt) {
      if (!this.display) {
        return;
      }
      const { context: context2 } = window;
      context2.fillStyle = "#000000";
      context2.font = "bold 12px Courier New";
      this.items.forEach((item, index) => {
        context2.fillText(`${item.key}: ${item.value}`, 10, 15 * index + 15);
      });
    }
  };

  // src/engine/GameLoopManager.ts
  var GameLoopManager = class {
    constructor(loop, dt = 1 / 60) {
      this.times = [];
      this.fps = 0;
      this.total = 0;
      this.accumulatedTime = 0;
      this.lastTime = 0;
      this.loopProxy = (time) => {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1e3) {
          this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.total += dt;
        this.accumulatedTime += (time - this.lastTime) / 1e3;
        while (this.accumulatedTime > dt) {
          loop(dt);
          this.accumulatedTime -= dt;
        }
        this.lastTime = time;
        requestAnimationFrame(this.loopProxy);
      };
    }
    start() {
      requestAnimationFrame(this.loopProxy);
    }
  };

  // src/balls/components/MovementComponent.ts
  var MovementComponent = class extends Component {
    constructor(velocity = Vector.ZERO, acceleration = 500) {
      super("movement");
      this.direction = Vector.ZERO;
      this.velocity = velocity;
      this.acceleration = acceleration;
    }
  };

  // src/balls/components/TransformComponent.ts
  var TransformComponent = class extends Component {
    constructor(position, size) {
      super("transform");
      this.position = position;
      this.size = size;
    }
  };

  // src/balls/entities/PlayerEntity.ts
  var Player = class extends Entity {
    constructor() {
      super("player");
      this.addComponent(new TransformComponent(new Vector(100, 100), 16));
      this.addComponent(new MovementComponent());
    }
  };

  // src/balls/systems/CollisionSystem.ts
  var import_detect_collisions = __toESM(require_dist());
  var CollisionSystem = class extends System {
    constructor(world2) {
      super("collision", world2);
      this.physics = new import_detect_collisions.System();
    }
    execute(dt) {
      const { entities } = this.world;
      const _entities = entities.filter((p) => p.hasComponent("transform"));
      _entities.forEach((current) => {
        const currentTransform = current.getComponent("transform");
        const others = _entities.filter((p) => p.name !== current.name);
        others.forEach((target) => {
          const targetTransform = target.getComponent("transform");
          if (this.physics.checkCollision(
            new import_detect_collisions.Circle(currentTransform.position, currentTransform.size),
            new import_detect_collisions.Circle(targetTransform.position, targetTransform.size)
          )) {
            const currentMovement = current.getComponent("movement");
            if (currentMovement) {
              currentMovement.velocity.x = currentMovement.velocity.x + this.physics.response.overlapV.x * -1;
              currentMovement.velocity.y = currentMovement.velocity.y + this.physics.response.overlapV.y * -1;
            }
          }
        });
      });
    }
  };

  // src/balls/systems/MovementSystem.ts
  var MovementSystem = class extends System {
    constructor(world2) {
      super("movement", world2);
    }
    execute(dt) {
      const { entities } = this.world;
      const { canvas: canvas2 } = window;
      entities.filter((p) => p.hasComponent("movement")).forEach((entity) => {
        const { position } = entity.getComponent("transform");
        const { velocity } = entity.getComponent("movement");
        position.x += velocity.x;
        position.y += velocity.y;
        if (position.x > canvas2.width) {
          position.x = 0;
        }
        if (position.x < 0) {
          position.x = canvas2.width;
        }
        if (position.y > canvas2.height) {
          position.y = 0;
        }
        if (position.y < 0) {
          position.y = canvas2.height;
        }
      });
    }
  };

  // src/balls/systems/PlayerInputSystem.ts
  var InputSystem = class extends System {
    constructor(world2) {
      super("player-input", world2);
    }
    execute(dt) {
      const { input: input2, ee: ee2 } = window;
      const { entities } = this.world;
      const player2 = entities.find((p) => p.name === "player");
      if (!player2) {
        return;
      }
      const { velocity, acceleration, direction } = player2.getComponent("movement");
      if (input2.keysDown.has("KeyD")) {
        direction.x = 1;
      } else if (input2.keysDown.has("KeyA")) {
        direction.x = -1;
      } else {
        direction.x = 0;
      }
      if (input2.keysDown.has("KeyS")) {
        direction.y = 1;
      } else if (input2.keysDown.has("KeyW")) {
        direction.y = -1;
      } else {
        direction.y = 0;
      }
      if (direction.x !== 0) {
        velocity.x = acceleration * dt * direction.x;
      }
      if (direction.y !== 0) {
        velocity.y = acceleration * dt * direction.y;
      }
      ee2.emit("debug", {
        key: "direction",
        value: `x: ${direction.x}, y: ${direction.y}`
      });
      ee2.emit("debug", {
        key: "velocity",
        value: `x: ${velocity.x}, y: ${velocity.y}`
      });
      ee2.emit("debug", {
        key: "acceleration",
        value: acceleration
      });
    }
  };

  // src/balls/systems/RenderSystem.ts
  var RenderSystem = class extends System {
    constructor(world2) {
      super("render", world2);
    }
    drawVelocity(context2, entity) {
      const { position } = entity.getComponent("transform");
      const movement = entity.getComponent("movement");
      if (!movement) {
        return;
      }
      const { velocity } = movement;
      if (velocity.x === 0 && velocity.y === 0) {
        return;
      }
      const velocityText = `${velocity.x.toFixed(1)},${velocity.y.toFixed(1)}`;
      context2.fillStyle = "#0000ff";
      context2.fillText(velocityText, position.x, position.y - 2);
      context2.beginPath();
      context2.moveTo(position.x, position.y);
      context2.lineTo(position.x + velocity.x * 10, position.y + velocity.y * 10);
      context2.stroke();
    }
    execute(dt) {
      const { entities } = this.world;
      const { context: context2, canvas: canvas2 } = window;
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
      entities.filter((p) => p.hasComponent("transform")).forEach((entity) => {
        const { position, size } = entity.getComponent("transform");
        if (entity.name === "player") {
          context2.fillStyle = "#ffcccc";
          context2.beginPath();
          context2.arc(position.x, position.y, size, 0, Math.PI * 2, true);
          context2.fill();
        } else {
          context2.fillStyle = "#ffffff";
          context2.beginPath();
          context2.arc(position.x, position.y, size, 0, Math.PI * 2, true);
          context2.fill();
        }
        this.drawVelocity(context2, entity);
      });
    }
  };

  // src/engine/utils/index.ts
  function getRandom(max, min = 0) {
    return Math.random() * (max - min) + min;
  }
  function getRandomInt(max, min = 0, inclusive = true) {
    if (inclusive) {
      min = Math.ceil(min);
      max = Math.floor(max);
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // src/balls/systems/SpawnerSystem.ts
  var SpawnerSystem = class extends System {
    constructor(world2) {
      super("ball-spawner", world2);
      const { ee: ee2 } = window;
      ee2.on("keyup", (e) => {
        if (e.code === "KeyQ") {
          this.spawnBall();
        }
      });
    }
    spawnBall() {
      const { entities } = this.world;
      const { canvas: canvas2 } = window;
      const ballCount = entities.filter((p) => p.name.startsWith("ball-")).length;
      if (ballCount >= 10) {
        return;
      }
      const ball = new Entity(`B${entities.length}`);
      ball.addComponent(
        new TransformComponent(
          new Vector(getRandomInt(canvas2.width), getRandomInt(canvas2.height)),
          16
        )
      );
      ball.addComponent(
        new MovementComponent(new Vector(getRandom(1, -1), getRandom(5, -5)))
      );
      this.world.addEntity(ball);
    }
  };

  // src/balls/index.ts
  var canvas = document.getElementById("canvas");
  if (!canvas) {
    throw new Error("No canvas found!");
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.canvas = canvas;
  var context = canvas.getContext("2d");
  if (!context) {
    throw new Error("No context found!");
  }
  window.context = context;
  var ee = new import_eventemitter3.EventEmitter();
  window.ee = ee;
  var input = new InputManager();
  window.input = input;
  var world = new World();
  world.addSystem(new RenderSystem(world));
  world.addSystem(new CollisionSystem(world));
  world.addSystem(new SpawnerSystem(world));
  world.addSystem(new MovementSystem(world));
  world.addSystem(new InputSystem(world));
  world.addSystem(new DebugSystem(world));
  var player = new Player();
  world.addEntity(player);
  var gameLoopManager = new GameLoopManager((dt) => {
    world.execute(dt);
  });
  gameLoopManager.start();
})();
/** @preserve SAT.js - Version 0.9.0 - Copyright 2012 - 2021 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */
