document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            galleryCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');

            // Close other items
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
        });
    });

    // Excellence Card Toggles
    const excCards = document.querySelectorAll('.excellence-card');
    excCards.forEach(card => {
        const toggle = card.querySelector('.exc-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                card.classList.toggle('active');

                // Toggle text
                const toggleText = toggle.firstChild;
                if (card.classList.contains('active')) {
                    toggleText.textContent = 'Hide Details ';
                } else {
                    toggleText.textContent = 'View Details ';
                }
            });
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.feature-card, .service-item, .team-card, .crm-step, .green-item').forEach(el => {
        el.classList.add('reveal-fade');
        observer.observe(el);
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Oops! Something went wrong. Please try again later.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // Sticky Header & Back to Top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Map Marker Interactivity (Optional visual tweak)
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.animation = 'none';
            marker.style.transform = 'scale(1.5)';
        });
        marker.addEventListener('mouseleave', () => {
            marker.style.animation = 'pulse 2s infinite';
            marker.style.transform = 'scale(1)';
        });
    });
});
