/* ============================================
   JAVASCRIPT FOR TECHINSTITUTE WEBSITE
   ============================================ */

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeSmoothScroll();
    initializeScrollAnimations();
});

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Collect form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Simulate form submission (in real application, send to server)
                console.log('Form Data:', formData);
                
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully. We will contact you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
            }
        });
    }
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    // Name validation
    if (name.length < 3) {
        showFormMessage('error', 'Please enter a valid name (at least 3 characters).');
        return false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showFormMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phonePattern = /^[\d+\-\s()]{10,}$/;
    if (!phonePattern.test(phone)) {
        showFormMessage('error', 'Please enter a valid phone number.');
        return false;
    }
    
    // Subject validation
    if (subject === '') {
        showFormMessage('error', 'Please select a subject.');
        return false;
    }
    
    // Message validation
    if (message.length < 10) {
        showFormMessage('error', 'Please enter a message (at least 10 characters).');
        return false;
    }
    
    return true;
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.style.display = 'block';
        formMessage.className = `alert alert-${type === 'success' ? 'success' : 'danger'}`;
        formMessage.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> 
            ${message}
        `;
    }
}

function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.style.display = 'none';
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.feature-card, .course-card, .contact-item, .why-card, .mission-card, .vision-card, .contact-box'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// NAVBAR ACTIVE STATE ON SCROLL
// ============================================

window.addEventListener('load', function() {
    updateNavbarOnScroll();
});

window.addEventListener('scroll', function() {
    updateNavbarOnScroll();
});

function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// ADD TO CART / ENROLLMENT BUTTONS
// ============================================

function enrollCourse(courseName) {
    alert(`You are enrolled in ${courseName}! Check your email for further details.`);
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================

function openWhatsApp() {
    const phoneNumber = '919876543210'; // Replace with your WhatsApp number
    const message = 'Hello TechInstitute, I am interested in your courses.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// ============================================
// COUNTER ANIMATION (FOR STATISTICS)
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.justifyContent = 'center';
        backToTopButton.style.alignItems = 'center';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseover', () => {
    backToTopButton.style.transform = 'scale(1.1)';
    backToTopButton.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
});

backToTopButton.addEventListener('mouseout', () => {
    backToTopButton.style.transform = 'scale(1)';
    backToTopButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const closeButton = document.querySelector('.navbar-toggler');
            closeButton.click();
        }
    });
});

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%cWelcome to TechInstitute!', 'color: #007bff; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s learn technology together!', 'color: #764ba2; font-size: 14px;');
