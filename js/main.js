document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       0. Inject Dynamic Config Data
       ========================================================================== */
    const initConfig = () => {
        if (typeof CONFIG === 'undefined') return;

        // Inject Texts
        document.querySelectorAll('[data-config]').forEach(el => {
            const key = el.getAttribute('data-config');
            if (CONFIG[key]) {
                el.textContent = CONFIG[key];
            }
        });

        // Inject WhatsApp Links
        const waLink = `https://wa.me/${CONFIG.telefone}?text=${encodeURIComponent(CONFIG.whatsappMensagem)}`;
        document.querySelectorAll('[data-wa-link]').forEach(el => {
            el.setAttribute('href', waLink);
        });

        // Inject Instagram Link
        document.querySelectorAll('[data-ig-link]').forEach(el => {
            if (CONFIG.instagramUrl) el.setAttribute('href', CONFIG.instagramUrl);
        });

        // Inject Images
        const heroImg = document.querySelector('[data-img="hero"]');
        if (heroImg && CONFIG.heroImage) {
            heroImg.style.backgroundImage = `url('${CONFIG.heroImage}')`;
            heroImg.innerHTML = ''; // Remove placeholder content
        }

        const profileImg = document.querySelector('[data-img="profile"]');
        if (profileImg && CONFIG.profileImage) {
            profileImg.style.backgroundImage = `url('${CONFIG.profileImage}')`;
            profileImg.innerHTML = ''; // Remove placeholder content
        }
    };
    
    initConfig();

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggle.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    /* ==========================================================================
       3. Close Mobile Menu on Link Click
       ========================================================================== */
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.replace('ph-x', 'ph-list');
                }
            }
        });
    });

    /* ==========================================================================
       4. Smooth Scroll Polyfill/Enhancement for Links
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
