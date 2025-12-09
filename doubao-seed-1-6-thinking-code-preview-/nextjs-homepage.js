// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// Search functionality (Cmd/Ctrl + K)
const searchInput = document.querySelector('.search-box input');

document.addEventListener('keydown', (e) => {
    // Check for Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('a, button, input');

focusableElements.forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (element.tagName === 'A') {
                // Allow default link behavior
                return;
            }
            e.preventDefault();
            element.click();
        }
    });
});

// Parallax effect for background elements
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled >= heroTop && scrolled <= heroTop + heroHeight) {
            const scrollFraction = (scrolled - heroTop) / heroHeight;

            // Move circles with parallax effect
            const circle1 = document.querySelector('.circle-1');
            const circle2 = document.querySelector('.circle-2');

            if (circle1) {
                circle1.style.transform = `translateY(${scrollFraction * 50}px)`;
            }

            if (circle2) {
                circle2.style.transform = `translateY(-${scrollFraction * 50}px)`;
            }
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe hero content elements for staggered animation
const heroElements = document.querySelectorAll('.hero-content > *');
heroElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Add smooth hover effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .deploy-btn, .learn-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            ripple.style.opacity = '0';
            ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }, 10);
    });
});

// Handle window resize
let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 968) {
            navMenu.classList.remove('active');

            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }

        // Update parallax position
        updateParallax();
    }, 250);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter egg
console.log('%c🚀 Next.js', 'font-size: 30px; font-weight: bold; color: #fff;');
console.log('%cThe React Framework for the Web', 'font-size: 14px; color: rgba(255, 255, 255, 0.8);');
console.log('%c\nTry: npx create-next-app@latest', 'font-size: 12px; font-family: monospace; color: rgba(255, 255, 255, 0.6);');