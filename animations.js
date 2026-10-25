/* دار صوفيا — الحركات والأشكال. حمّليه بعد script.js (بيحمّل animations.css لوحده) */
(function () {
    const me = document.currentScript;
    // تحميل ملف الـ CSS تلقائيًا من نفس مكان السكريبت
    if (me && !document.querySelector('link[href*="animations.css"]')) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = me.src.replace('animations.js', 'animations.css');
        document.head.appendChild(l);
    }

    // ---- شريط التقدّم + ظل الهيدر ----
    const bar = document.createElement('div');
    bar.className = 'sf-progress';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(bar));
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const max = document.documentElement.scrollHeight - innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ')';
            const h = document.querySelector('.main-header');
            if (h) h.classList.toggle('sf-scrolled', scrollY > 10);
            ticking = false;
        });
    }
    addEventListener('scroll', onScroll, { passive: true });

    // ---- طيران المنتج للسلة ----
    function flyToCart(srcImg) {
        const btn = document.querySelector('.cart-icon-btn .fa-bag-shopping');
        const cartBtn = btn && btn.closest('.cart-icon-btn');
        if (cartBtn) { cartBtn.classList.remove('sf-shake'); void cartBtn.offsetWidth; cartBtn.classList.add('sf-shake'); }
        document.querySelectorAll('#cartCount').forEach(b => { b.classList.remove('sf-bump'); void b.offsetWidth; b.classList.add('sf-bump'); });
        if (!srcImg || !cartBtn) return;
        const a = srcImg.getBoundingClientRect(), b = cartBtn.getBoundingClientRect();
        if (!a.width) return;
        const fly = document.createElement('img');
        fly.src = srcImg.currentSrc || srcImg.src;
        fly.className = 'sf-fly';
        fly.style.cssText = 'width:90px;height:90px;left:' + (a.left + a.width / 2 - 45) + 'px;top:' + (a.top + a.height / 2 - 45) + 'px;';
        document.body.appendChild(fly);
        const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
        requestAnimationFrame(() => requestAnimationFrame(() => {
            fly.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.12) rotate(360deg)';
            fly.style.opacity = '.4';
        }));
        setTimeout(() => fly.remove(), 900);
    }
    if (typeof window.addToCart === 'function') {
        const original = window.addToCart;
        window.addToCart = function (id) {
            original.apply(this, arguments);
            flyToCart(document.querySelector('.product-card[data-id="' + id + '"] .product-img img') || document.getElementById('ppImg'));
        };
    }

    // ---- الشريط العلوي: بيتحرك بـ Web Animations (شغّال من غير اعتماد على CSS) ----
    function buildTicker() {
        const wrap = document.querySelector('.announcement-bar .container');
        if (!wrap) return;
        const bar = wrap.closest('.announcement-bar');
        const icons = ['fa-truck-fast', 'fa-hand-holding-dollar', 'fa-rotate'];
        const items = [...wrap.querySelectorAll('span')].map((s, i) => ({ text: s.textContent.trim(), icon: icons[i] || 'fa-star', hot: /الدفع/.test(s.textContent) }));
        if (!items.length) return;
        bar.style.cssText += ';overflow:hidden;padding:0';
        wrap.style.cssText += ';display:block;max-width:none;padding:0';
        const ticker = document.createElement('div');
        ticker.style.cssText = 'display:flex;width:max-content;direction:ltr;will-change:transform';
        const add = () => items.forEach(it => {
            const t = document.createElement('div');
            t.className = 'sf-tick' + (it.hot ? ' sf-hot' : '');
            t.style.cssText = 'direction:rtl;display:inline-flex;align-items:center;gap:10px;white-space:nowrap;padding:11px 34px;font-weight:700;font-size:.95rem';
            t.innerHTML = '<i class="fa-solid ' + it.icon + '"></i><span></span>';
            t.lastChild.textContent = it.text;
            ticker.appendChild(t);
        });
        wrap.textContent = '';
        wrap.appendChild(ticker);
        add();
        let guard = 0;
        while (ticker.scrollWidth < innerWidth * 1.3 && guard++ < 20) add();   // نكرر لحد ما يغطي الشاشة
        const half = ticker.scrollWidth;
        ticker.innerHTML += ticker.innerHTML;                                   // نسخة تانية للّفّ من غير فجوة
        const anim = ticker.animate(
            [{ transform: 'translateX(' + (-half) + 'px)' }, { transform: 'translateX(0px)' }],
            { duration: half / 70 * 1000, iterations: Infinity, easing: 'linear' }
        );
        bar.addEventListener('mouseenter', () => anim.pause());
        bar.addEventListener('mouseleave', () => anim.play());
    }

    // ---- جزيئات: أوراق ونجوم وفقاعات ----
    function particles(section, count, colors) {
        if (!section) return;
        const box = document.createElement('div');
        box.className = 'sf-particles';
        box.setAttribute('aria-hidden', 'true');
        const rnd = (a, b) => a + Math.random() * (b - a);
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            const kind = ['leaf', 'star', 'bubble', 'leaf', 'star'][i % 5];
            p.className = 'sf-p ' + kind;
            if (kind === 'leaf') p.innerHTML = '<i class="fa-solid ' + (i % 2 ? 'fa-leaf' : 'fa-spa') + '"></i>';
            if (kind === 'star') p.textContent = '✦';
            const size = kind === 'bubble' ? rnd(14, 38) : kind === 'star' ? rnd(14, 28) : rnd(18, 32);
            p.style.cssText = '--x:' + rnd(2, 96) + '%;--y:' + rnd(4, 90) + '%;--s:' + size + 'px;--t:' + rnd(kind === 'star' ? 2.5 : 9, kind === 'star' ? 5 : 17) + 's;--d:' + rnd(0, 9) + 's';
            if (colors) p.style.setProperty('--c', colors[i % colors.length]);
            box.appendChild(p);
        }
        section.insertBefore(box, section.firstChild);
    }

    // ---- ريبل على الضغط ----
    document.addEventListener('click', e => {
        const el = e.target.closest('.btn, .btn-add');
        if (!el) return;
        const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height);
        const s = document.createElement('span');
        s.className = 'sf-ripple';
        s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px';
        el.appendChild(s);
        setTimeout(() => s.remove(), 650);
    });

    document.addEventListener('DOMContentLoaded', () => {
        buildTicker();
        onScroll();

        // أشكال حوالين صورة الهيرو
        const art = document.querySelector('.hero-art');
        if (art) {
            ['sf-blob', 'sf-ring', 'sf-ring2'].forEach(c => { const d = document.createElement('div'); d.className = c; art.insertBefore(d, art.firstChild); });
            ['', 'o2'].forEach(c => { const o = document.createElement('div'); o.className = 'sf-orbit ' + c; o.innerHTML = '<i></i>'; art.appendChild(o); });
        }
        particles(document.querySelector('.hero-section'), 22);
        particles(document.querySelector('.why'), 16);
        particles(document.querySelector('.cta'), 12);

        // خط دهبي بيتمدّد تحت العناوين
        document.querySelectorAll('.section-title h2').forEach(h => { const l = document.createElement('span'); l.className = 'sf-line'; h.after(l); });

        // زرار واتساب عايم
        let num = '';
        try { num = typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : ''; } catch (e) {}
        if (num && !document.querySelector('.sf-fab')) {
            const f = document.createElement('a');
            f.className = 'sf-fab'; f.href = 'https://wa.me/' + num; f.target = '_blank'; f.rel = 'noopener'; f.setAttribute('aria-label', 'واتساب');
            f.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
            document.body.appendChild(f);
        }

        // كروت المنتجات بتظهر بالتتابع
        const grid = document.getElementById('productsGrid');
        if (grid && 'IntersectionObserver' in window) {
            const cards = [...grid.querySelectorAll('.product-card')];
            cards.forEach(c => c.classList.add('sf-pre'));
            const io = new IntersectionObserver(entries => {
                entries.filter(e => e.isIntersecting).forEach((e, i) => {
                    e.target.style.setProperty('--sf-d', (i * 0.09) + 's');
                    e.target.classList.remove('sf-pre'); e.target.classList.add('sf-in');
                    io.unobserve(e.target);
                });
            }, { threshold: .12 });
            cards.forEach(c => io.observe(c));
            const boxes = document.getElementById('categoryBoxes');
            if (boxes) boxes.addEventListener('click', () => setTimeout(() => {
                let i = 0;
                cards.forEach(c => {
                    c.classList.remove('sf-pre', 'sf-in', 'sf-pop');
                    if (c.classList.contains('is-hidden')) return;
                    void c.offsetWidth;
                    c.style.setProperty('--sf-d', (i++ * 0.06) + 's');
                    c.classList.add('sf-pop');
                });
            }, 0));
        }
    });
})();

// ============ شاشة الترحيب + الأشكال الإضافية ============
(function () {
    function splash() {
        if (!document.querySelector('.hero-section')) return;                   // الصفحة الرئيسية فقط
        try { if (sessionStorage.getItem('sf_splash')) return; sessionStorage.setItem('sf_splash', '1'); } catch (e) {}
        const s = document.createElement('div');
        s.className = 'sf-splash';
        s.innerHTML = '<div class="sf-s-circles"><i></i><i></i><i></i></div>' +
            '<div class="sf-s-logo"><svg viewBox="0 0 200 200"><circle class="sf-s-ring" cx="100" cy="100" r="92"/></svg><img src="images/logo.png" alt="" onerror="this.remove()"></div>' +
            '<div class="sf-s-name"><span>دار</span><span>صوفيا</span></div>' +
            '<div class="sf-s-tag">عناية طبيعية ✦ مصنوعة بحب</div>';
        document.body.appendChild(s);
        document.body.classList.add('sf-wait');
        document.documentElement.style.overflow = 'hidden';
        let done = false;
        function finish() {
            if (done) return; done = true;
            s.classList.add('sf-out');
            document.body.classList.remove('sf-wait');
            document.documentElement.style.overflow = '';
            setTimeout(() => s.remove(), 1000);
        }
        s.addEventListener('click', finish);                                     // الضغط يتخطّاها
        setTimeout(finish, 2900);
    }
    if (document.body) splash(); else document.addEventListener('DOMContentLoaded', splash);

    document.addEventListener('DOMContentLoaded', () => {
        // موجات متحركة فوق وتحت قسم "ليه دار صوفيا"
        const why = document.querySelector('.why');
        if (why) ['top', 'bottom'].forEach(pos => {
            const w = document.createElement('div');
            w.innerHTML = '<svg class="sf-wave ' + pos + '" viewBox="0 0 2400 60" preserveAspectRatio="none"><path d="M0 0 H2400 V20 C2100 70 1800 -20 1500 20 C1200 60 900 -20 600 20 C300 60 150 0 0 20 Z"/></svg>';
            why.appendChild(w.firstChild);
        });

        // أشكال عايمة (دواير، حلقات، نقط، معيّنات) في الأقسام
        function shapes(section, list) {
            if (!section) return;
            list.forEach(([type, css]) => { const d = document.createElement('div'); d.className = 'sf-shape ' + type; d.style.cssText = css; section.appendChild(d); });
        }
        shapes(document.querySelector('.cats-section'), [
            ['blob', '--w:260px;top:-70px;left:-60px'], ['ring', '--w:120px;top:40px;right:6%'],
            ['dots', 'bottom:10px;right:-20px'], ['diamond', '--w:46px;bottom:60px;left:8%']
        ]);
        shapes(document.querySelector('.products-section'), [
            ['blob', '--w:320px;top:30%;right:-120px;--t:18s'], ['dots', 'top:20px;left:10px'],
            ['ring', '--w:90px;bottom:80px;left:5%'], ['diamond', '--w:38px;top:12%;right:12%'], ['blob', '--w:180px;bottom:-60px;left:30%']
        ]);

        // ختم دوّار على صورة الهيرو
        const art = document.querySelector('.hero-art');
        if (art) {
            const b = document.createElement('div');
            b.className = 'sf-badge';
            b.innerHTML = '<svg viewBox="0 0 120 120"><defs><path id="sfc" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"/></defs><text><textPath href="#sfc">100% NATURAL ✦ DAR SOFIA ✦</textPath></text></svg><i class="fa-solid fa-leaf"></i>';
            art.appendChild(b);
        }
    });
})();
