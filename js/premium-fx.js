/**
 * Premium FX Library - BTI TEX 2026
 * Handles advanced interactions: Custom Cursor, Magnetic Buttons, Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMagneticElements();
    initScrollReveal();
    initParallax();
    initMouseGlow();
    initThemeToggle();
});

/**
 * Theme Toggle Logic
 */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    });

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, overwrite: true });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15, overwrite: true });
    });

    document.querySelectorAll('a, button, .interactive, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
            gsap.to(follower, { scale: 1.5, opacity: 0.3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
            gsap.to(follower, { scale: 1, opacity: 0.6, duration: 0.3 });
        });
    });
}

/**
 * 3D Parallax Effect for Product Images
 */
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        document.querySelectorAll('.parallax-img').forEach(img => {
            img.style.transform = `translate3d(${x}px, ${y}px, 0) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`;
        });
    });
}

/**
 * Mouse Tracking Glow Effect for Bento Items
 */
function initMouseGlow() {
    document.querySelectorAll('.bento-item, .valve-feature-block').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * Magnetic Button Effect
 */
function initMagneticElements() {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((mag) => {
        mag.addEventListener('mousemove', (e) => {
            const rect = mag.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            mag.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        mag.addEventListener('mouseleave', () => {
            mag.style.transform = 'translate(0px, 0px)';
        });
    });
}

/**
 * Simple Intersection Observer for Reveal Animations
 */
function initScrollReveal() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}
