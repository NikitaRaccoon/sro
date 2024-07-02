$(document).ready(function () {

    let  lastScroll = 0;
    let header = document.querySelector('.header');
    let body = document.querySelector('body')

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('visibe')

    window.addEventListener('scroll', () => {

        if(scrollPosition() > 200) {

            header.classList.add('scrolled')
            body.style.paddingTop = header.offsetHeight + 'px'

            if(scrollPosition() > lastScroll ) {

                header.classList.remove('visible')
                
            } else if (scrollPosition() < lastScroll ) {
                
                header.classList.add('visible')
    
            }
            
        } else if (scrollPosition() > 200 && !containHide) {

            header.classList.remove('scrolled')
            body.style.paddingTop = 0 + 'px'

        } else if (scrollPosition() === 0 || scrollPosition() === header.offsetHeight) {
            header.classList.remove('scrolled')
            body.style.paddingTop = 0 + 'px'
        }
        lastScroll = scrollPosition();
    })


    AOS.init({
        // offset: 220, 
    });

    $(".selector").select2({
        minimumResultsForSearch: -1,
        width: "100%",
        placeholder: function(){
            $(this).data('placeholder');
        }
    });

    $(".selector").on("select2:open", function () {
        var optionsContainer = $(".select2-results__options").get(0);

        setTimeout(function () {
            new SimpleBar(optionsContainer);
        }, 0);
    });

    let ww = $(window).width()

    let heroAccountSlider = new Swiper ('.hero__account-slider.swiper', {
        slidesPerView: 'auto',
        spaceBetween: ww > 991 ? 24 : 10,
    })

    let mainPageNewsSlider = new Swiper ('.news__slider.swiper', {
        slidesPerView: 'auto',
        spaceBetween: ww > 991 ? 24 : 10,
    })


    $(document).on('click', '.header__search-btn', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('opened')
        if(ww<991) {
            $('.header__account').toggleClass('opened')
        }
    }) 
    $(document).on('click', function(e){
        if($(e.target).closest('.header__search').length === 0){
            $('.header__search').removeClass('opened')
        }
    }) 

    $(document).on('click', 'header.header .header__burger', function(e){
        e.preventDefault()
        $(this).toggleClass('opened')
        $('body').toggleClass('outer-mobile-menu')
    })

    $(document).on('click', '.personal-header .header__burger', function(e){
        e.preventDefault()
        $(this).toggleClass('opened')
        $('body').toggleClass('inner-mobile-menu')
    })

    $(document).on('click', '.faq__item-btn', function(e){
        e.preventDefault()
        $(this).parent().toggleClass('closed')
        $(this).siblings('.faq__item-answer').slideToggle()
    })

    if(ww > 991) {
        $(document).on('scroll', function(e){
            $('.faq__item').each(function(i){
                if($('.faq__title').offset().top >= $(this).offset().top) {
                    $(this).children('.faq__item-answer').slideDown();
                }
            })
        })
    }

    $(document).on('click', '.footer__section-btn', function(e){
        e.preventDefault();
        $(this).closest('.footer__section').toggleClass('opened')
        $(this).closest('.footer__section').find('.footer__section-list').slideToggle()
    })

    $(document).on('click', '.first-level > li a', function(e) {
        e.preventDefault();
        $(this).toggleClass('opened')
        $(this).siblings('.second-level-wrapper').slideToggle()
    })
    $(document).on('click', '.second-level > li a', function(e) {
        e.preventDefault();
        $(this).siblings('.third-level-wrapper').slideToggle()
    })

    $(document).on('click', '[data-year]', function(e){
        e.preventDefault()
        $('[data-year]').removeClass('active')
        $(this).addClass('active')
    })

    // file upload

    let filesPull = [];
    let dropArea = document.querySelectorAll(".drop-area");
    let inputFile = document.getElementById('personal-area-candidate-file');

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.forEach((el) =>
            el.addEventListener(eventName, preventDefaults, false)
        );
    });
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.forEach(function (el) {
            el.addEventListener(eventName, highlight, false);
        });
    });
    ["dragleave", "drop"].forEach((eventName) => {
        dropArea.forEach(function (el) {
            el.addEventListener(eventName, unhighlight, false);
        });
    });
    function highlight(e) {
        this.classList.add("highlight");
    }
    function unhighlight(e) {
        this.classList.remove("highlight");
    }

    if($('.drop-area').length) {
        dropArea.forEach(function (el) {
            el.addEventListener("drop", handleDrop, false);
        });
    
        inputFile.addEventListener('change', handleDrop1, false)
    }


    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        if (files) {
            this.classList.add("uploaded");
            [...files].forEach((el) => filesPull.push(el));
            filesPull.forEach((el, index) => {
                this.querySelector('.file-name span').innerText = el.name;
                filesPull = [];
            });
        }
    }
    function handleDrop1() {
        let files = this.files;
        let fileName = [...files][0].name
        if (files) {
            dropArea[0].classList.add("uploaded");
            document.querySelector('.file-name span').innerText = fileName;
            filesPull = [];
        }
    }

    $(document).on('click', '.file-name a', function(e) {
        e.preventDefault()
        $('.drop-area').removeClass('uploaded')
        $('.drop-area').find('input').val('')
    })

    if($(window).width() < 768 && $('.contacts').length) {
        $('.contacts__show-more').on('click', function(e){  
            let blockType = $(this).attr('data-type')
            $(this).toggleClass('opened')
            e.preventDefault()
            $(`[data-block=${blockType}]`).slideToggle()  
        })
        
        $('.contacts__staff-item').each(function(i){
            if(i > 2) {
                $(this).appendTo('.contacts__staff-mobile-wrapper .contacts__staff')
            }
        })

        $('.contacts__requisites-item').each(function(i){
            if(i > 2) {
                $(this).appendTo('.contacts__requisites-mobile-wrapper .contacts__requisites-grid')
            }
        })

        
    }

    !function () { var s, i, c, a, o = { frameRate: 150, animationTime: 500, stepSize: 100, pulseAlgorithm: !0, pulseScale: 4, pulseNormalize: 1, accelerationDelta: 50, accelerationMax: 3, keyboardSupport: !0, arrowScroll: 50, fixedBackground: !0, excluded: "" }, p = o, u = !1, d = !1, n = { x: 0, y: 0 }, f = !1, m = document.documentElement, l = [], h = /^Mac/.test(navigator.platform), w = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 }, v = { 37: 1, 38: 1, 39: 1, 40: 1 }; function y() { if (!f && document.body) { f = !0; var e = document.body, t = document.documentElement, o = window.innerHeight, n = e.scrollHeight; if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0; else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) { var r, a = document.createElement("div"); a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function () { r = r || setTimeout(function () { u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null) }, 500) }, setTimeout(c, 10), Y("resize", c); if ((i = new R(c)).observe(e, { attributes: !0, childList: !0, characterData: !1 }), m.offsetHeight <= o) { var l = document.createElement("div"); l.style.clear = "both", e.appendChild(l) } } p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll") } } var b = [], g = !1, r = Date.now(); function S(d, f, m) { if (function (e, t) { e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0) }(f, m), 1 != p.accelerationMax) { var e = Date.now() - r; if (e < p.accelerationDelta) { var t = (1 + 50 / e) / 2; 1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t) } r = Date.now() } if (b.push({ x: f, y: m, lastX: f < 0 ? .99 : -.99, lastY: m < 0 ? .99 : -.99, start: Date.now() }), !g) { var o = q(), h = d === o || d === document.body; null == d.$scrollBehavior && function (e) { var t = M(e); if (null == B[t]) { var o = getComputedStyle(e, "")["scroll-behavior"]; B[t] = "smooth" == o } return B[t] }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto"); var w = function (e) { for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) { var a = b[r], l = t - a.start, i = l >= p.animationTime, c = i ? 1 : l / p.animationTime; p.pulseAlgorithm && (c = F(c)); var s = a.x * c - a.lastX >> 0, u = a.y * c - a.lastY >> 0; o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--) } h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null)) }; j(w, d, 0), g = !0 } } function e(e) { f || y(); var t = e.target; if (e.defaultPrevented || e.ctrlKey) return !0; if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0; var o = -e.wheelDeltaX || e.deltaX || 0, n = -e.wheelDeltaY || e.deltaY || 0; h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40); var r = z(t); return r ? !!function (e) { if (!e) return; l.length || (l = [e, e, e]); e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function () { try { localStorage.SS_deltaBuffer = l.join(",") } catch (e) { } }, 1e3); var t = 120 < e && P(e), o = !P(120) && !P(100) && !t; return e < 50 || o }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", { value: window.frameElement }), parent.wheel(e)) } function x(e) { var t = e.target, o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar; document.body.contains(s) || (s = document.activeElement); var n = /^(button|submit|radio|checkbox|file|color|image)$/i; if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function (e) { var t = e.target, o = !1; if (-1 != document.URL.indexOf("www.youtube.com/watch")) do { if (o = t.classList && t.classList.contains("html5-video-controls")) break } while (t = t.parentNode); return o }(e) || t.isContentEditable || o) return !0; if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0; if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0; var r = 0, a = 0, l = z(s); if (!l) return !d || !W || parent.keydown(e); var i = l.clientHeight; switch (l == document.body && (i = window.innerHeight), e.keyCode) { case w.up: a = -p.arrowScroll; break; case w.down: a = p.arrowScroll; break; case w.spacebar: a = -(e.shiftKey ? 1 : -1) * i * .9; break; case w.pageup: a = .9 * -i; break; case w.pagedown: a = .9 * i; break; case w.home: l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop; break; case w.end: var c = l.scrollHeight - l.scrollTop - i; a = 0 < c ? 10 + c : 0; break; case w.left: r = -p.arrowScroll; break; case w.right: r = p.arrowScroll; break; default: return !0 }S(l, r, a), e.preventDefault(), C() } function t(e) { s = e.target } var k, D, M = (k = 0, function (e) { return e.uniqueID || (e.uniqueID = k++) }), E = {}, T = {}, B = {}; function C() { clearTimeout(D), D = setInterval(function () { E = T = B = {} }, 1e3) } function H(e, t, o) { for (var n = o ? E : T, r = e.length; r--;)n[M(e[r])] = t; return t } function z(e) { var t = [], o = document.body, n = m.scrollHeight; do { var r = (!1 ? E : T)[M(e)]; if (r) return H(t, r); if (t.push(e), n === e.scrollHeight) { var a = O(m) && O(o) || X(m); if (d && L(m) || !d && a) return H(t, q()) } else if (L(e) && X(e)) return H(t, e) } while (e = e.parentElement) } function L(e) { return e.clientHeight + 10 < e.scrollHeight } function O(e) { return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y") } function X(e) { var t = getComputedStyle(e, "").getPropertyValue("overflow-y"); return "scroll" === t || "auto" === t } function Y(e, t, o) { window.addEventListener(e, t, o || !1) } function A(e, t, o) { window.removeEventListener(e, t, o || !1) } function N(e, t) { return e && (e.nodeName || "").toLowerCase() === t.toLowerCase() } if (window.localStorage && localStorage.SS_deltaBuffer) try { l = localStorage.SS_deltaBuffer.split(",") } catch (e) { } function K(e, t) { return Math.floor(e / t) == e / t } function P(e) { return K(l[0], e) && K(l[1], e) && K(l[2], e) } var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) { window.setTimeout(e, o || 1e3 / 60) }, R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, q = ($ = document.scrollingElement, function () { if (!$) { var e = document.createElement("div"); e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e); var t = document.body.scrollTop; document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e) } return $ }); function V(e) { var t; return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize } function F(e) { return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e)) } var I = window.navigator.userAgent, _ = /Edge/.test(I), W = /chrome/i.test(I) && !_, U = /safari/i.test(I) && !_, G = /mobile/i.test(I), J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I), Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)), Z = (W || U || J) && !G, ee = !1; try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function () { ee = !0 } })) } catch (e) { } var te = !!ee && { passive: !1 }, oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"; function ne(e) { for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t]) } oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function () { i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y) }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () { return ne }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne }();
})

