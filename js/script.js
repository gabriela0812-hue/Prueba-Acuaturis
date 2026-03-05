document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navLinks) navLinks.classList.remove('active'); // Close menu on click

            // Reset icon
            if (mobileBtn) {
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Language Switching Logic
    const langSelector = document.getElementById('language-selector');

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
                // Check if element contains HTML (like the hero title with span)
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Save selected language to localStorage
        localStorage.setItem('selectedLang', lang);
    }

    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }

    // Initialize language from localStorage or default to 'es'
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    if (savedLang !== 'es') {
        updateLanguage(savedLang);
    }

    // Set the selector to the correct value
    if (langSelector) {
        langSelector.value = savedLang;
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    // Elements that trigger the lightbox
    const galleryContainer = document.querySelector('.gallerySwiper');
    const visionImagesContainer = document.querySelector('.vision-images');

    // Function to open lightbox with an image source
    function openLightbox(imgElement) {
        if (lightbox && lightboxImg && imgElement && imgElement.src) {
            lightbox.style.display = "block";
            lightboxImg.src = imgElement.src;
            lightboxImg.alt = imgElement.alt || ''; // Accesibilidad: pasar el alt también
        }
    }

    // Listener for Gallery Images (index.html)
    if (galleryContainer) {
        galleryContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.swiper-slide');
            if (!item) return;

            // Get src from the real <img> tag
            const img = item.querySelector('img');
            openLightbox(img);
        });
    }

    // Listener for Vision Images (quienes-somos.html)
    if (visionImagesContainer) {
        visionImagesContainer.addEventListener('click', (e) => {
            // Find if the clicked element or its parent is the image card
            const imgCard = e.target.closest('.vision-img-card');
            if (!imgCard) return;

            // Get the image element inside the card
            const img = imgCard.querySelector('img');
            openLightbox(img);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (lightbox) lightbox.style.display = "none";
        });
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
});

