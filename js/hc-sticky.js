function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}
/*!
 * HC-Sticky
 * =========
 * Version: 2.2.3
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
/*!
 * HC-Sticky
 * =========
 * Version: 2.2.3
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
! function(t, e) {
    "use strict";
    if ("object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports)) {
        if (!t.document) throw new Error("HC-Sticky requires a browser to run.");
        module.exports = e(t)
    } else "function" == typeof define && define.amd ? define("hcSticky", [], e(t)) : e(t)
}("undefined" != typeof window ? window : this, function(_) {
    "use strict";
    var U = {
            top: 0,
            bottom: 0,
            bottomEnd: 0,
            innerTop: 0,
            innerSticker: null,
            stickyClass: "sticky",
            stickTo: null,
            followScroll: !0,
            responsive: null,
            mobileFirst: !1,
            onStart: null,
            onStop: null,
            onBeforeResize: null,
            onResize: null,
            resizeDebounce: 100,
            disable: !1,
            queries: null,
            queryFlow: "down"
        },
        Y = function(t, e, o) {
            console.warn("%cHC Sticky:%c " + o + "%c '" + t + "'%c is now deprecated and will be removed. Use%c '" + e + "'%c instead.", "color: #fa253b", "color: default", "color: #5595c6", "color: default", "color: #5595c6", "color: default")
        },
        $ = _.document,
        Q = function(i) {
            var o = this,
                f = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            if ("string" == typeof i && (i = $.querySelector(i)), !i) return !1;
            f.queries && Y("queries", "responsive", "option"), f.queryFlow && Y("queryFlow", "mobileFirst", "option");
            var p = {},
                u = Q.Helpers,
                s = i.parentNode;
            "static" === u.getStyle(s, "position") && (s.style.position = "relative");
            var r, l, a, c, d, y, m, g, h, b, v, S, w, k, E, x, L, T, j, O = function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    u.isEmptyObject(t) && !u.isEmptyObject(p) || (p = Object.assign({}, U, p, t))
                },
                t = function() {
                    return p.disable
                },
                e = function() {
                    var t, e = p.responsive || p.queries;
                    if (e) {
                        var o = _.innerWidth;
                        if (t = f, (p = Object.assign({}, U, t || {})).mobileFirst)
                            for (var n in e) n <= o && !u.isEmptyObject(e[n]) && O(e[n]);
                        else {
                            var i = [];
                            for (var s in e) {
                                var r = {};
                                r[s] = e[s], i.push(r)
                            }
                            for (var l = i.length - 1; 0 <= l; l--) {
                                var a = i[l],
                                    c = Object.keys(a)[0];
                                o <= c && !u.isEmptyObject(a[c]) && O(a[c])
                            }
                        }
                    }
                },
                C = {
                    css: {},
                    position: null,
                    stick: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                        u.hasClass(i, p.stickyClass) || (!1 === z.isAttached && z.attach(), C.position = "fixed", i.style.position = "fixed", i.style.left = z.offsetLeft + "px", i.style.width = z.width, void 0 === t.bottom ? i.style.bottom = "auto" : i.style.bottom = t.bottom + "px", void 0 === t.top ? i.style.top = "auto" : i.style.top = t.top + "px", i.classList ? i.classList.add(p.stickyClass) : i.className += " " + p.stickyClass, p.onStart && p.onStart.call(i, Object.assign({}, p)))
                    },
                    release: function() {
                        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                        if (t.stop = t.stop || !1, !0 === t.stop || "fixed" === C.position || null === C.position || !(void 0 === t.top && void 0 === t.bottom || void 0 !== t.top && (parseInt(u.getStyle(i, "top")) || 0) === t.top || void 0 !== t.bottom && (parseInt(u.getStyle(i, "bottom")) || 0) === t.bottom)) {
                            !0 === t.stop ? !0 === z.isAttached && z.detach() : !1 === z.isAttached && z.attach();
                            var e = t.position || C.css.position;
                            C.position = e, i.style.position = e, i.style.left = !0 === t.stop ? C.css.left : z.positionLeft + "px", i.style.width = "absolute" !== e ? C.css.width : z.width, void 0 === t.bottom ? i.style.bottom = !0 === t.stop ? "" : "auto" : i.style.bottom = t.bottom + "px", void 0 === t.top ? i.style.top = !0 === t.stop ? "" : "auto" : i.style.top = t.top + "px", i.classList ? i.classList.remove(p.stickyClass) : i.className = i.className.replace(new RegExp("(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), p.onStop && p.onStop.call(i, Object.assign({}, p))
                        }
                    }
                },
                z = {
                    el: $.createElement("div"),
                    offsetLeft: null,
                    positionLeft: null,
                    width: null,
                    isAttached: !1,
                    init: function() {
                        for (var t in z.el.className = "sticky-spacer", C.css) z.el.style[t] = C.css[t];
                        z.el.style["z-index"] = "-1";
                        var e = u.getStyle(i);
                        z.offsetLeft = u.offset(i).left - (parseInt(e.marginLeft) || 0), z.positionLeft = u.position(i).left, z.width = u.getStyle(i, "width")
                    },
                    attach: function() {
                        s.insertBefore(z.el, i), z.isAttached = !0
                    },
                    detach: function() {
                        z.el = s.removeChild(z.el), z.isAttached = !1
                    }
                },
                n = function() {
                    var t, e, o, n;
                    C.css = (t = i, e = u.getCascadedStyle(t), o = u.getStyle(t), n = {
                        height: t.offsetHeight + "px",
                        left: e.left,
                        right: e.right,
                        top: e.top,
                        bottom: e.bottom,
                        position: o.position,
                        display: o.display,
                        verticalAlign: o.verticalAlign,
                        boxSizing: o.boxSizing,
                        marginLeft: e.marginLeft,
                        marginRight: e.marginRight,
                        marginTop: e.marginTop,
                        marginBottom: e.marginBottom,
                        paddingLeft: e.paddingLeft,
                        paddingRight: e.paddingRight
                    }, e.float && (n.float = e.float || "none"), e.cssFloat && (n.cssFloat = e.cssFloat || "none"), o.MozBoxSizing && (n.MozBoxSizing = o.MozBoxSizing), n.width = "auto" !== e.width ? e.width : "border-box" === n.boxSizing || "border-box" === n.MozBoxSizing ? t.offsetWidth + "px" : o.width, n), z.init(), r = !(!p.stickTo || !("document" === p.stickTo || p.stickTo.nodeType && 9 === p.stickTo.nodeType || "object" === _typeof(p.stickTo) && p.stickTo instanceof("undefined" != typeof HTMLDocument ? HTMLDocument : Document))), l = p.stickTo ? r ? $ : "string" == typeof p.stickTo ? $.querySelector(p.stickTo) : p.stickTo : s, E = (T = function() {
                        var t = i.offsetHeight + (parseInt(C.css.marginTop) || 0) + (parseInt(C.css.marginBottom) || 0),
                            e = (E || 0) - t;
                        return -1 <= e && e <= 1 ? E : t
                    })(), c = (L = function() {
                        return r ? Math.max($.documentElement.clientHeight, $.body.scrollHeight, $.documentElement.scrollHeight, $.body.offsetHeight, $.documentElement.offsetHeight) : l.offsetHeight
                    })(), d = r ? 0 : u.offset(l).top, y = p.stickTo ? r ? 0 : u.offset(s).top : d, m = _.innerHeight, x = i.offsetTop - (parseInt(C.css.marginTop) || 0), a = p.innerSticker ? "string" == typeof p.innerSticker ? $.querySelector(p.innerSticker) : p.innerSticker : null, g = isNaN(p.top) && -1 < p.top.indexOf("%") ? parseFloat(p.top) / 100 * m : p.top, h = isNaN(p.bottom) && -1 < p.bottom.indexOf("%") ? parseFloat(p.bottom) / 100 * m : p.bottom, b = a ? a.offsetTop : p.innerTop ? p.innerTop : 0, v = isNaN(p.bottomEnd) && -1 < p.bottomEnd.indexOf("%") ? parseFloat(p.bottomEnd) / 100 * m : p.bottomEnd, S = d - g + b + x
                },
                N = _.pageYOffset || $.documentElement.scrollTop,
                H = 0,
                R = function() {
                    E = T(), c = L(), w = d + c - g - v, k = m < E;
                    var t, e = _.pageYOffset || $.documentElement.scrollTop,
                        o = u.offset(i).top,
                        n = o - e;
                    j = e < N ? "up" : "down", H = e - N, S < (N = e) ? w + g + (k ? h : 0) - (p.followScroll && k ? 0 : g) <= e + E - b - (m - (S - b) < E - b && p.followScroll && 0 < (t = E - m - b) ? t : 0) ? C.release({
                        position: "absolute",
                        bottom: y + s.offsetHeight - w - g
                    }) : k && p.followScroll ? "down" === j ? n + E + h <= m + .9 ? C.stick({
                        bottom: h
                    }) : "fixed" === C.position && C.release({
                        position: "absolute",
                        top: o - g - S - H + b
                    }) : Math.ceil(n + b) < 0 && "fixed" === C.position ? C.release({
                        position: "absolute",
                        top: o - g - S + b - H
                    }) : e + g - b <= o && C.stick({
                        top: g - b
                    }) : C.stick({
                        top: g - b
                    }) : C.release({
                        stop: !0
                    })
                },
                A = !1,
                B = !1,
                I = function() {
                    A && (u.event.unbind(_, "scroll", R), A = !1)
                },
                q = function() {
                    null !== i.offsetParent && "none" !== u.getStyle(i, "display") ? (n(), c <= E ? I() : (R(), A || (u.event.bind(_, "scroll", R), A = !0))) : I()
                },
                F = function() {
                    i.style.position = "", i.style.left = "", i.style.top = "", i.style.bottom = "", i.style.width = "", i.classList ? i.classList.remove(p.stickyClass) : i.className = i.className.replace(new RegExp("(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)", "gi"), " "), C.css = {}, !(C.position = null) === z.isAttached && z.detach()
                },
                M = function() {
                    F(), e(), t() ? I() : q()
                },
                D = function() {
                    p.onBeforeResize && p.onBeforeResize.call(i, Object.assign({}, p)), M(), p.onResize && p.onResize.call(i, Object.assign({}, p))
                },
                P = p.resizeDebounce ? u.debounce(D, p.resizeDebounce) : D,
                W = function() {
                    B && (u.event.unbind(_, "resize", P), B = !1), I()
                },
                V = function() {
                    B || (u.event.bind(_, "resize", P), B = !0), e(), t() ? I() : q()
                };
            this.options = function(t) {
                return t ? p[t] : Object.assign({}, p)
            }, this.refresh = M, this.update = function(t) {
                O(t), f = Object.assign({}, f, t || {}), M()
            }, this.attach = V, this.detach = W, this.destroy = function() {
                W(), F()
            }, this.triggerMethod = function(t, e) {
                "function" == typeof o[t] && o[t](e)
            }, this.reinit = function() {
                Y("reinit", "refresh", "method"), M()
            }, O(f), V(), u.event.bind(_, "load", M)
        };
    if (void 0 !== _.jQuery) {
        var n = _.jQuery,
            i = "hcSticky";
        n.fn.extend({
            hcSticky: function(e, o) {
                return this.length ? "options" === e ? n.data(this.get(0), i).options() : this.each(function() {
                    var t = n.data(this, i);
                    t ? t.triggerMethod(e, o) : (t = new Q(this, e), n.data(this, i, t))
                }) : this
            }
        })
    }
    return _.hcSticky = _.hcSticky || Q, Q
}),
function(c) {
    "use strict";
    var t = c.hcSticky,
        f = c.document;
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(t, e) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var o = Object(t), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (null != i)
                    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (o[s] = i[s])
            }
            return o
        },
        writable: !0,
        configurable: !0
    }), Array.prototype.forEach || (Array.prototype.forEach = function(t) {
        var e, o;
        if (null == this) throw new TypeError("this is null or not defined");
        var n = Object(this),
            i = n.length >>> 0;
        if ("function" != typeof t) throw new TypeError(t + " is not a function");
        for (1 < arguments.length && (e = arguments[1]), o = 0; o < i;) {
            var s;
            o in n && (s = n[o], t.call(e, s, o, n)), o++
        }
    });
    var e = function() {
            var t = f.documentElement,
                e = function() {};

            function n(t) {
                var e = c.event;
                return e.target = e.target || e.srcElement || t, e
            }
            t.addEventListener ? e = function(t, e, o) {
                t.addEventListener(e, o, !1)
            } : t.attachEvent && (e = function(e, t, o) {
                e[t + o] = o.handleEvent ? function() {
                    var t = n(e);
                    o.handleEvent.call(o, t)
                } : function() {
                    var t = n(e);
                    o.call(e, t)
                }, e.attachEvent("on" + t, e[t + o])
            });
            var o = function() {};
            return t.removeEventListener ? o = function(t, e, o) {
                t.removeEventListener(e, o, !1)
            } : t.detachEvent && (o = function(e, o, n) {
                e.detachEvent("on" + o, e[o + n]);
                try {
                    delete e[o + n]
                } catch (t) {
                    e[o + n] = void 0
                }
            }), {
                bind: e,
                unbind: o
            }
        }(),
        r = function(t, e) {
            return c.getComputedStyle ? e ? f.defaultView.getComputedStyle(t, null).getPropertyValue(e) : f.defaultView.getComputedStyle(t, null) : t.currentStyle ? e ? t.currentStyle[e.replace(/-\w/g, function(t) {
                return t.toUpperCase().replace("-", "")
            })] : t.currentStyle : void 0
        },
        l = function(t) {
            var e = t.getBoundingClientRect(),
                o = c.pageYOffset || f.documentElement.scrollTop,
                n = c.pageXOffset || f.documentElement.scrollLeft;
            return {
                top: e.top + o,
                left: e.left + n
            }
        };
    t.Helpers = {
        isEmptyObject: function(t) {
            for (var e in t) return !1;
            return !0
        },
        debounce: function(n, i, s) {
            var r;
            return function() {
                var t = this,
                    e = arguments,
                    o = s && !r;
                clearTimeout(r), r = setTimeout(function() {
                    r = null, s || n.apply(t, e)
                }, i), o && n.apply(t, e)
            }
        },
        hasClass: function(t, e) {
            return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
        },
        offset: l,
        position: function(t) {
            var e = t.offsetParent,
                o = l(e),
                n = l(t),
                i = r(e),
                s = r(t);
            return o.top += parseInt(i.borderTopWidth) || 0, o.left += parseInt(i.borderLeftWidth) || 0, {
                top: n.top - o.top - (parseInt(s.marginTop) || 0),
                left: n.left - o.left - (parseInt(s.marginLeft) || 0)
            }
        },
        getStyle: r,
        getCascadedStyle: function(t) {
            var e, o = t.cloneNode(!0);
            o.style.display = "none", Array.prototype.slice.call(o.querySelectorAll('input[type="radio"]')).forEach(function(t) {
                t.removeAttribute("name")
            }), t.parentNode.insertBefore(o, t.nextSibling), o.currentStyle ? e = o.currentStyle : c.getComputedStyle && (e = f.defaultView.getComputedStyle(o, null));
            var n = {};
            for (var i in e) !isNaN(i) || "string" != typeof e[i] && "number" != typeof e[i] || (n[i] = e[i]);
            if (Object.keys(n).length < 3)
                for (var s in n = {}, e) isNaN(s) || (n[e[s].replace(/-\w/g, function(t) {
                    return t.toUpperCase().replace("-", "")
                })] = e.getPropertyValue(e[s]));
            if (n.margin || "auto" !== n.marginLeft ? n.margin || n.marginLeft !== n.marginRight || n.marginLeft !== n.marginTop || n.marginLeft !== n.marginBottom || (n.margin = n.marginLeft) : n.margin = "auto", !n.margin && "0px" === n.marginLeft && "0px" === n.marginRight) {
                var r = t.offsetLeft - t.parentNode.offsetLeft,
                    l = r - (parseInt(n.left) || 0) - (parseInt(n.right) || 0),
                    a = t.parentNode.offsetWidth - t.offsetWidth - r - (parseInt(n.right) || 0) + (parseInt(n.left) || 0) - l;
                0 !== a && 1 !== a || (n.margin = "auto")
            }
            return o.parentNode.removeChild(o), o = null, n
        },
        event: e
    }
}(window);