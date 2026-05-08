document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL EFFECT ──
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        highlightNavLink();
    });

    // ── BACK TO TOP ──
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── HAMBURGER MENU ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── ACTIVE NAV LINK ──
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // ── TYPING ANIMATION ──
    const phrases = [
        'Frontend Developer.',
        'React Specialist.',
        'UI Craftsman.',
        'TypeScript Dev.',
    ];
    const typedEl = document.getElementById('typedText');
    let pIndex = 0, cIndex = 0, deleting = false;

    function type() {
        const phrase = phrases[pIndex];
        if (!deleting) {
            cIndex++;
            typedEl.textContent = phrase.slice(0, cIndex);
            if (cIndex === phrase.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            cIndex--;
            typedEl.textContent = phrase.slice(0, cIndex);
            if (cIndex === 0) {
                deleting = false;
                pIndex = (pIndex + 1) % phrases.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }
    type();

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate skill bars when section enters view
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                });
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));

    // Also trigger skill bars if they're in a revealed section
    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-bars').forEach(el => skillBarsObserver.observe(el));

    // ── CONTACT FORM ──
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            btn.textContent = 'Sent! ✓';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                btn.textContent = 'Send Message ✉';
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ── SMOOTH SCROLL for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

});
