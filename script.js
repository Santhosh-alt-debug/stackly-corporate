// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Show success message
        alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
        
        // Reset form
        this.reset();
    });
}

// Smooth scrolling for anchor links (only on main page)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip buttons that should go to 404
        if (anchor.getAttribute('href') === '404.html') return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    // Get the hash from URL
    const hash = window.location.hash;
    
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(hash);
        }
    } else {
        // If no hash, scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });
    }
});

// Update active navigation link
function updateActiveNavLink(targetId) {
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active-link');
    });
    
    // Add active class to current link
    const currentLink = document.querySelector(`nav ul li a[href="${targetId}"]`);
    if (currentLink) {
        currentLink.classList.add('active-link');
    }
}

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--primary-color)';
            header.style.backdropFilter = 'none';
        }
    }
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Company logo refresh functionality
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        if (this.getAttribute('href') === 'index.html') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });
    
    // Add hover effect
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Footer logo refresh functionality
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
    });
    
    // Add hover effect
    footerLogo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    footerLogo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Handle 404 navigation from About and Services Learn More buttons
document.querySelectorAll('a[href="404.html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow normal navigation to 404 page
        console.log('Navigating to 404 page from:', this.textContent);
        // No need to prevent default - let it go to 404.html
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Stackly website loaded successfully!');
    
    // Set initial active nav link based on URL hash
    if (window.location.hash) {
        updateActiveNavLink(window.location.hash);
    }
    
    // Handle 404 page back button
    if (window.location.pathname.includes('404.html')) {
        console.log('On 404 page');
    }
});