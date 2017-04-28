! function(e, t) {
    "function" == typeof define && define.amd ? define("smoothScroll", t(e)) : "object" == typeof exports ? module.exports = t(e) : e.smoothScroll = t(e)
}(window || this, function(e) {
    "use strict";
    var t, n, o, r = {},
        c = !!document.querySelector && !!e.addEventListener,
        a = {
            speed: 500,
            easing: "easeInOutCubic",
            offset: 0,
            updateURL: !0,
            callbackBefore: function() {},
            callbackAfter: function() {}
        },
        u = function(e, t, n) {
            if ("[object Object]" === Object.prototype.toString.call(e))
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e);
            else
                for (var r = 0, c = e.length; c > r; r++) t.call(n, e[r], r, e)
        },
        i = function(e, t) {
            var n = {};
            return u(e, function(t, o) {
                n[o] = e[o]
            }), u(t, function(e, o) {
                n[o] = t[o]
            }), n
        },
        l = function(e, t) {
            for (var n = t.charAt(0); e && e !== document; e = e.parentNode)
                if ("." === n) {
                    if (e.classList.contains(t.substr(1))) return e
                } else if ("#" === n) {
                if (e.id === t.substr(1)) return e
            } else if ("[" === n && e.hasAttribute(t.substr(1, t.length - 2))) return e;
            return !1
        },
        s = function(e) {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
        },
        f = function(e) {
            for (var t, n = String(e), o = n.length, r = -1, c = "", a = n.charCodeAt(0); ++r < o;) {
                if (t = n.charCodeAt(r), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                c += t >= 1 && 31 >= t || 127 == t || 0 === r && t >= 48 && 57 >= t || 1 === r && t >= 48 && 57 >= t && 45 === a ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(r) : "\\" + n.charAt(r)
            }
            return c
        },
        d = function(e, t) {
            var n;
            return "easeInQuad" === e && (n = t * t), "easeOutQuad" === e && (n = t * (2 - t)), "easeInOutQuad" === e && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e && (n = t * t * t), "easeOutCubic" === e && (n = --t * t * t + 1), "easeInOutCubic" === e && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e && (n = t * t * t * t), "easeOutQuart" === e && (n = 1 - --t * t * t * t), "easeInOutQuart" === e && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e && (n = t * t * t * t * t), "easeOutQuint" === e && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), n || t
        },
        h = function(e, t, n) {
            var o = 0;
            if (e.offsetParent)
                do o += e.offsetTop, e = e.offsetParent; while (e);
            return o = o - t - n, o >= 0 ? o : 0
        },
        m = function() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
        },
        p = function(e) {
            return e && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(e) : {}
        },
        v = function(t, n) {
            history.pushState && (n || "true" === n) && history.pushState(null, null, [e.location.protocol, "//", e.location.host, e.location.pathname, e.location.search, t].join(""))
        };
    r.animateScroll = function(t, n, r) {
        var c = i(c || a, r || {}),
            u = p(t ? t.getAttribute("data-options") : null);
        c = i(c, u), n = "#" + f(n.substr(1));
        var l = "#" === n ? document.documentElement : document.querySelector(n),
            g = e.pageYOffset;
        o || (o = document.querySelector("[data-scroll-header]"));
        var b, y, S, O = null === o ? 0 : s(o) + o.offsetTop,
            I = h(l, O, parseInt(c.offset, 10)),
            L = I - g,
            w = m(),
            E = 0;
        v(n, c.updateURL);
        var H = function(o, r, a) {
                var u = e.pageYOffset;
                (o == r || u == r || e.innerHeight + u >= w) && (clearInterval(a), l.focus(), c.callbackAfter(t, n))
            },
            A = function() {
                E += 16, y = E / parseInt(c.speed, 10), y = y > 1 ? 1 : y, S = g + L * d(c.easing, y), e.scrollTo(0, Math.floor(S)), H(S, I, b)
            },
            k = function() {
                c.callbackBefore(t, n), b = setInterval(A, 16)
            };
        0 === e.pageYOffset && e.scrollTo(0, 0), k()
    };
    var g = function(e) {
            var n = l(e.target, "[data-scroll]");
            n && "a" === n.tagName.toLowerCase() && (e.preventDefault(), r.animateScroll(n, n.hash, t))
        },
        b = function() {
            n || (n = setTimeout(function() {
                n = null, headerHeight = null === o ? 0 : s(o) + o.offsetTop
            }, 66))
        };
    return r.destroy = function() {
        t && (document.removeEventListener("click", g, !1), e.removeEventListener("resize", b, !1), t = null, n = null, o = null)
    }, r.init = function(n) {
        c && (r.destroy(), t = i(a, n || {}), o = document.querySelector("[data-scroll-header]"), document.addEventListener("click", g, !1), o && e.addEventListener("resize", b, !1))
    }, r
}),
function() {
    var e, t, n, o, r, c, a, u, i, l, s, f, d, h;
    for (smoothScroll.init(), s = document.querySelector(".fixed-header"), f = document.querySelector(".fixed-header"), f.addEventListener("click", function() {
            return s.className += " opened"
        }), n = 600, t = "shown", e = document.querySelector(".fixed-header"), r = function() {
            return window.scrollY > n ? e.classList.add(t) : e.classList.remove(t)
        }, a = document.querySelectorAll("body > section"), u = document.querySelectorAll(".fixed-header [data-anchor]"), i = {}, d = 0, h = a.length; h > d; d++) c = a[d], i[c.id] = c.offsetTop - c.scrollTop + c.clientTop + c.clientHeight;
    o = function() {
        var e, t, n;
        n = window.scrollY + screen.height / 3;
        for (e in i)
            if (t = i[e], t > n) return e
    }, l = function() {
        var e, t, n, r, c;
        for (e = o(), c = [], n = 0, r = u.length; r > n; n++) t = u[n], c.push(t.dataset.anchor === e ? t.classList.add("current") : t.classList.remove("current"));
        return c
    }, window.addEventListener("scroll", function() {
        return r(), l()
    })
}.call(this);
