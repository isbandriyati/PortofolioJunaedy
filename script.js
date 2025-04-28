// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const cursor = document.getElementById('cursor-fx');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const projectNumbers = document.querySelectorAll('.project-number');
    const projectItems = document.querySelectorAll('.project-item');
    const skillsSlider = document.querySelector('.skills-slider');
    
    let isNavigating = false;
    
    // ===== CURSOR EFFECT =====
    function updateCursor(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
    
    function createAura(e) {
        const aura = document.createElement('div');
        aura.className = 'aura-effect';
        document.body.appendChild(aura);
        
        aura.style.left = `${e.clientX}px`;
        aura.style.top = `${e.clientY}px`;
        
        // Random size for the aura
        const size = Math.random() * 80 + 50;
        aura.style.width = `${size}px`;
        aura.style.height = `${size}px`;
        
        // Fade in
        setTimeout(() => {
            aura.style.opacity = '0.8';
        }, 10);
        
        // Fade out and remove
        setTimeout(() => {
            aura.style.opacity = '0';
            setTimeout(() => {
                aura.remove();
            }, 300);
        }, 300);
    }
    
    document.addEventListener('mousemove', updateCursor);
    
    document.addEventListener('click', (e) => {
        cursor.classList.add('active');
        createAura(e);
        
        setTimeout(() => {
            cursor.classList.remove('active');
        }, 300);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    // ===== NAVBAR =====
    // Toggle navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('active');
    });
    
    // Close navbar when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
        
        // Update active menu item on scroll
        if (!isNavigating) {
            updateActiveNavOnScroll();
        }
    });
    
    // ===== SCROLL SPY =====
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            isNavigating = true;
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isNavigating = false;
            }, 1000);
        });
    });
    
    // ===== PROJECTS =====
    projectNumbers.forEach(number => {
        number.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // Update active project number
            projectNumbers.forEach(num => num.classList.remove('active'));
            this.classList.add('active');
            
            // Show the relevant project
            projectItems.forEach(item => {
                item.classList.remove('active');
            });
            
            const targetProject = document.getElementById(`project-${projectId}`);
            targetProject.classList.add('active');
        });
    });
    
    // ===== SKILLS SLIDER =====
    // Clone the skills elements for infinite scroll effect
    const skillsItems = document.querySelectorAll('.skill-icon');
    const skillsItemsArray = Array.from(skillsItems);
    
    skillsItemsArray.forEach(item => {
        const clone = item.cloneNode(true);
        skillsSlider.appendChild(clone);
    });
    
    // Add particles to sections
    function addParticles() {
        const particleSections = [
            document.querySelector('#home'),
            document.querySelector('#about'),
            document.querySelector('#skills'),
            document.querySelector('#projects'),
            document.querySelector('#contact')
        ];
        
        particleSections.forEach(section => {
            if (!section) return;
            
            const particles = document.createElement('div');
            particles.className = 'particles';
            section.appendChild(particles);
            
            // Add random particles
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 30 + 5;
                
                // Random animation delay
                const delay = Math.random() * 10;
                
                particle.style.left = `${left}%`;
                particle.style.top = `${top}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.animationDelay = `${delay}s`;
                
                particles.appendChild(particle);
            }
        });
    }
    
    // Add animation classes to elements when they become visible
    function addScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll(
            '.about-text p, .about-stats .stat-item, .project-image, .project-info, .contact-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize functions
    addParticles();
    addScrollAnimations();
    
    // Preloader (remove after loading)
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});

// Modify the aura effect to use an image
const auraEffect = document.querySelector('.aura-effect');

document.addEventListener('mousemove', (e) => {
    auraEffect.style.left = e.clientX + 'px';
    auraEffect.style.top = e.clientY + 'px';
    auraEffect.style.transition = 'left 0.1s, top 0.1s';
});

// Keep the same event listeners for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        auraEffect.style.opacity = '1';
        auraEffect.style.width = '100px';
        auraEffect.style.height = '100px';
    });
    
    element.addEventListener('mouseleave', () => {
        auraEffect.style.opacity = '0';
        auraEffect.style.width = '60px';
        auraEffect.style.height = '60px';
    });
});