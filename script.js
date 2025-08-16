// Dynamic Footer Year Calculator
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerYearElement = document.querySelector('footer .text span');
    
    if (footerYearElement) {
        // Replace the year in the footer text
        const footerText = footerYearElement.innerHTML;
        const updatedText = footerText.replace(/\d{4}/, currentYear);
        footerYearElement.innerHTML = updatedText;
    }
}

// Dynamic Experience Calculator (Improved)
function updateExperience() {
    const startDate = new Date('2023-01-01'); // Starting from 2023
    const currentDate = new Date();
    
    // Calculate total months difference
    const yearDiff = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();
    const totalMonths = yearDiff * 12 + monthDiff;
    
    const experienceElement = document.querySelector('.experience .num');
    const experienceTextElement = document.querySelector('.experience .exp');
    
    if (experienceElement && experienceTextElement) {
        if (totalMonths >= 12) {
            const years = Math.floor(totalMonths / 12);
            const remainingMonths = totalMonths % 12;
            
            if (remainingMonths === 0) {
                experienceElement.textContent = years;
                experienceTextElement.innerHTML = `Year${years > 1 ? 's' : ''} Of<br> Experience`;
            } else {
                experienceElement.textContent = `${years}.${remainingMonths}`;
                experienceTextElement.innerHTML = `Years Of<br> Experience`;
            }
        } else {
            experienceElement.textContent = totalMonths;
            experienceTextElement.innerHTML = `Month${totalMonths > 1 ? 's' : ''} Of<br> Experience`;
        }
    }
}

// Update both footer year and experience on page load
document.addEventListener('DOMContentLoaded', function() {
    updateFooterYear();
    updateExperience();
    
    // Update experience every month (more efficient)
    setInterval(updateExperience, 30 * 24 * 60 * 60 * 1000); // Check every 30 days
});

// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
let val;

window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
    scrollBtn.style.opacity = "1";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.opacity = "0";
    setTimeout(() => {
      if(document.documentElement.scrollTop <= 20) {
        scrollBtn.style.display = "none";
      }
    }, 300);
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
    scrollBtn.style.pointerEvents = "auto";
  });
}

// Add loading animation for skills
window.addEventListener('load', function() {
    const skillBoxes = document.querySelectorAll('.skills-details .box');
    skillBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add smooth animations for contact elements
window.addEventListener('load', function() {
    const infoItems = document.querySelectorAll('.info-item');
    const contactForm = document.querySelector('.contact-form');
 
    contactForm.style.transform = 'translateY(0)';   
    infoItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });
    
    setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'translateY(0)';
    }, 800);
});

// Add form interaction effects
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const submitBtn = document.querySelector('.submit-btn');
    const contactForm = document.getElementById('contactForm');
    
    // Add focus effects to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Enhanced form submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const staticSubject = 'Contacting Sujjal Khadka'; // Static subject
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Create mailto link with static subject
            const mailtoLink = `mailto:sujjalboi09@gmail.com?subject=${encodeURIComponent(staticSubject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Add loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email...';
            submitBtn.style.background = 'linear-gradient(135deg, #64748b, #475569)';
            submitBtn.disabled = true;
            
            // Open email client using window.open to avoid hash navigation issues
            setTimeout(() => {
                try {
                    // Try to open the mailto link
                    const emailWindow = window.open(mailtoLink, '_blank');
                    
                    // Check if the email client opened successfully
                    if (emailWindow) {
                        // Email client opened successfully
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Opened!';
                        submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                        
                        // Clear form
                        contactForm.reset();
                    } else {
                        // Fallback: try direct navigation
                        window.location.href = mailtoLink;
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Opened!';
                        submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                        contactForm.reset();
                    }
                } catch (error) {
                    // If window.open fails, try direct navigation
                    window.location.href = mailtoLink;
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Opened!';
                    submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                    contactForm.reset();
                }
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = 'linear-gradient(135deg, #183153, #0E2431)';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
});

// Add hover effects for info items
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll reveal animation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > sectionTop - window.innerHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Add smooth animations for project cards
window.addEventListener('load', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add hover effects for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for tech tags
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
