// Device Selection and Layout Manager
class DeviceSelection {
    constructor() {
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.resumeContainer = document.getElementById('resume-container');
        this.layoutToggle = document.getElementById('layout-toggle');
        this.toggleBtn = document.getElementById('toggle-layout-btn');
        this.toggleText = document.getElementById('toggle-text');
        this.currentLayout = null;
        
        this.init();
    }
    
    init() {
        // Check if user has a saved preference
        const savedLayout = localStorage.getItem('preferred-layout');
        if (savedLayout) {
            this.hideWelcomeScreen();
            this.applyLayout(savedLayout);
            this.showLayoutToggle();
        } else {
            this.showWelcomeScreen();
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Device selection buttons
        const selectBtns = document.querySelectorAll('.select-btn');
        selectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const layout = e.target.dataset.layout;
                this.selectLayout(layout);
            });
        });
        
        // Device option cards (clickable)
        const deviceOptions = document.querySelectorAll('.device-option');
        deviceOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                if (!e.target.classList.contains('select-btn')) {
                    const layout = option.dataset.layout;
                    option.querySelector('.select-btn').click();
                }
            });
        });
        
        // Layout toggle button
        this.toggleBtn.addEventListener('click', () => {
            this.toggleLayout();
        });
        
        // Home button
        const homeBtn = document.getElementById('home-btn');
        homeBtn.addEventListener('click', () => {
            this.showWelcomeScreen();
            this.hideLayoutToggle();
        });
        
        // Add preview animations
        this.addPreviewAnimations();
    }
    
    selectLayout(layout) {
        const rememberChoice = document.getElementById('remember-preference').checked;
        
        if (rememberChoice) {
            localStorage.setItem('preferred-layout', layout);
        }
        
        // Animate selection
        this.animateSelection(layout);
        
        // Hide welcome screen after animation
        setTimeout(() => {
            this.hideWelcomeScreen();
            this.applyLayout(layout);
            this.showLayoutToggle();
        }, 800);
    }
    
    animateSelection(layout) {
        const selectedOption = document.querySelector(`[data-layout="${layout}"]`);
        const otherOption = document.querySelector(`[data-layout="${layout === 'mobile' ? 'desktop' : 'mobile'}"]`);
        
        // Highlight selected option
        selectedOption.style.transform = 'scale(1.1)';
        selectedOption.style.borderColor = 'var(--accent-color)';
        selectedOption.style.boxShadow = '0 0 30px rgba(74, 144, 226, 0.3)';
        
        // Fade out other option
        otherOption.style.opacity = '0.3';
        otherOption.style.transform = 'scale(0.9)';
        
        // Add success animation to selected button
        const btn = selectedOption.querySelector('.select-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Selected!';
        btn.style.background = '#4CAF50';
    }
    
    showWelcomeScreen() {
        this.welcomeScreen.style.display = 'flex';
        this.resumeContainer.style.display = 'none';
        
        // Reset device option animations
        this.resetDeviceOptions();
        
        // Add entrance animation
        setTimeout(() => {
            this.welcomeScreen.classList.remove('fade-out');
        }, 100);
    }
    
    hideWelcomeScreen() {
        this.welcomeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            this.welcomeScreen.style.display = 'none';
            this.resumeContainer.style.display = 'flex';
        }, 500);
    }
    
    applyLayout(layout) {
        this.currentLayout = layout;
        document.body.className = ''; // Clear existing classes
        
        if (layout === 'mobile') {
            document.body.classList.add('force-mobile');
            this.toggleText.textContent = 'Switch to Desktop';
            this.toggleBtn.querySelector('i').className = 'fas fa-laptop';
        } else {
            document.body.classList.add('force-desktop');
            this.toggleText.textContent = 'Switch to Mobile';
            this.toggleBtn.querySelector('i').className = 'fas fa-mobile-alt';
        }
        
        // Trigger layout animations
        this.triggerLayoutAnimation();
    }
    
    toggleLayout() {
        const newLayout = this.currentLayout === 'mobile' ? 'desktop' : 'mobile';
        
        // Add transition effect
        this.resumeContainer.style.transition = 'all 0.5s ease';
        this.resumeContainer.style.opacity = '0.7';
        
        setTimeout(() => {
            this.applyLayout(newLayout);
            this.resumeContainer.style.opacity = '1';
            
            // Update saved preference if user wants to remember
            if (localStorage.getItem('preferred-layout')) {
                localStorage.setItem('preferred-layout', newLayout);
            }
        }, 250);
    }
    
    showLayoutToggle() {
        this.layoutToggle.style.display = 'flex';
        setTimeout(() => {
            this.layoutToggle.style.opacity = '1';
        }, 100);
    }
    
    hideLayoutToggle() {
        this.layoutToggle.style.opacity = '0';
        setTimeout(() => {
            this.layoutToggle.style.display = 'none';
        }, 300);
    }
    
    triggerLayoutAnimation() {
        // Re-trigger entrance animations for the new layout
        const elements = document.querySelectorAll('.fade-in-left, .fade-in-right');
        elements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
    }
    
    addPreviewAnimations() {
        const deviceOptions = document.querySelectorAll('.device-option');
        
        deviceOptions.forEach(option => {
            option.addEventListener('mouseenter', () => {
                const preview = option.querySelector('.device-preview');
                preview.style.transform = 'scale(1.1)';
                preview.style.transition = 'all 0.3s ease';
                
                // Animate preview sections
                const sections = option.querySelectorAll('.preview-section, .preview-mini');
                sections.forEach((section, index) => {
                    setTimeout(() => {
                        section.style.background = 'var(--gradient)';
                        section.style.transform = 'scale(1.05)';
                    }, index * 100);
                });
            });
            
            option.addEventListener('mouseleave', () => {
                const preview = option.querySelector('.device-preview');
                preview.style.transform = 'scale(1)';
                
                // Reset preview sections
                const sections = option.querySelectorAll('.preview-section, .preview-mini');
                sections.forEach(section => {
                    section.style.background = 'var(--accent-color)';
                    section.style.transform = 'scale(1)';
                });
            });
        });
    }
    
    resetDeviceOptions() {
        const deviceOptions = document.querySelectorAll('.device-option');
        deviceOptions.forEach(option => {
            option.style.transform = 'scale(1)';
            option.style.borderColor = '';
            option.style.boxShadow = '';
            option.style.opacity = '1';
            
            // Reset button text and style
            const btn = option.querySelector('.select-btn');
            const layout = option.dataset.layout;
            if (layout === 'mobile') {
                btn.innerHTML = '<i class="fas fa-mobile-alt"></i> Choose Mobile View';
            } else {
                btn.innerHTML = '<i class="fas fa-laptop"></i> Choose Desktop View';
            }
            btn.style.background = '';
        });
    }
    
    // Method to reset welcome screen (for testing)
    resetWelcomeScreen() {
        localStorage.removeItem('preferred-layout');
        location.reload();
    }
}

// Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.init();
        this.createParticles();
        this.animate();
        this.handleResize();
    }
    
    init() {
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDark = document.documentElement.hasAttribute('data-theme');
        const particleColor = isDark ? '100, 181, 246' : '102, 126, 234';
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    const opacity = (120 - distance) / 120 * 0.2;
                    this.ctx.strokeStyle = `rgba(${particleColor}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Dark Mode Toggle
class ThemeManager {
    constructor() {
        this.themeSwitch = document.getElementById('theme-switch');
        this.init();
    }
    
    init() {
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.enableDarkMode();
            this.themeSwitch.checked = true;
        }
        
        // Listen for toggle
        this.themeSwitch.addEventListener('change', () => {
            if (this.themeSwitch.checked) {
                this.enableDarkMode();
            } else {
                this.enableLightMode();
            }
        });
    }
    
    enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    enableLightMode() {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Smooth Scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to floating contact buttons
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.section, .experience-item, .education-item, .skill-category, .cert-list li'
        );
        
        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
        
        // Add CSS for scroll animations
        this.addScrollAnimationStyles();
    }
    
    addScrollAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .section, .experience-item, .education-item, .skill-category, .cert-list li {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .experience-item:nth-child(odd) {
                transform: translateX(-20px) translateY(20px);
            }
            
            .experience-item:nth-child(even) {
                transform: translateX(20px) translateY(20px);
            }
            
            .skill-category {
                transition-delay: 0.1s;
            }
            
            .skill-category:nth-child(2) { transition-delay: 0.2s; }
            .skill-category:nth-child(3) { transition-delay: 0.3s; }
            .skill-category:nth-child(4) { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);
    }
}

// Floating Contact Buttons Animation
class FloatingButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.floating-btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach((button, index) => {
            // Add staggered animation
            button.style.animationDelay = `${index * 0.5}s`;
            
            // Add click ripple effect
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
            
            // Add hover sound effect (visual)
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1) translateY(-5px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
    
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        if (!document.head.querySelector('#ripple-style')) {
            style.id = 'ripple-style';
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Timeline Animation
class TimelineAnimation {
    constructor() {
        this.timelineDots = document.querySelectorAll('.timeline-dot');
        this.init();
    }
    
    init() {
        // Add staggered pulse animation to timeline dots
        this.timelineDots.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 0.5}s`;
            
            // Add click interaction
            dot.addEventListener('click', () => {
                this.highlightExperience(dot, index);
            });
        });
    }
    
    highlightExperience(dot, index) {
        // Remove highlight from all
        this.timelineDots.forEach(d => d.classList.remove('highlighted'));
        
        // Add highlight to clicked
        dot.classList.add('highlighted');
        
        // Add temporary highlight style
        if (!document.head.querySelector('#timeline-highlight-style')) {
            const style = document.createElement('style');
            style.id = 'timeline-highlight-style';
            style.textContent = `
                .timeline-dot.highlighted {
                    animation: highlightPulse 1s ease-in-out !important;
                    transform: scale(1.2);
                }
                
                @keyframes highlightPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(100, 181, 246, 0.7); }
                    50% { box-shadow: 0 0 0 20px rgba(100, 181, 246, 0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove highlight after animation
        setTimeout(() => {
            dot.classList.remove('highlighted');
        }, 1000);
    }
}

// Name Typing Effect
class TypingEffect {
    constructor() {
        this.nameElement = document.querySelector('.name');
        this.originalText = this.nameElement.textContent;
        this.init();
    }
    
    init() {
        // Start typing animation after page load
        setTimeout(() => {
            this.startTyping();
        }, 1500); // Delay for welcome screen
    }
    
    startTyping() {
        // Only start if resume is visible
        if (this.nameElement.offsetParent === null) {
            setTimeout(() => this.startTyping(), 500);
            return;
        }
        
        this.nameElement.textContent = '';
        this.nameElement.style.borderRight = '2px solid var(--accent-color)';
        
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < this.originalText.length) {
                this.nameElement.textContent += this.originalText[index];
                index++;
            } else {
                clearInterval(typingInterval);
                // Remove cursor after typing
                setTimeout(() => {
                    this.nameElement.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
}

// Mouse Follower Effect - REMOVED

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const deviceSelection = new DeviceSelection(); // Initialize first
    const particleBackground = new ParticleBackground();
    const themeManager = new ThemeManager();
    const smoothScroller = new SmoothScroller();
    const scrollAnimations = new ScrollAnimations();
    const floatingButtons = new FloatingButtons();
    const timelineAnimation = new TimelineAnimation();
    const typingEffect = new TypingEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Performance optimization for mobile
    if (window.innerWidth <= 768) {
        // Reduce particle count on mobile
        particleBackground.particles = particleBackground.particles.slice(0, 20);
    }
    
    // Add easter egg - Konami code
    let konamiCode = '';
    const konami = '38384040373937396665';
    
    document.addEventListener('keydown', (e) => {
        konamiCode += e.keyCode;
        if (konamiCode.length > konami.length) {
            konamiCode = konamiCode.slice(1);
        }
        
        if (konamiCode === konami) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease-in-out';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Add developer tools for testing
    window.resumeTools = {
        resetWelcome: () => deviceSelection.resetWelcomeScreen(),
        toggleLayout: () => deviceSelection.toggleLayout(),
        clearPreference: () => {
            localStorage.removeItem('preferred-layout');
            console.log('Layout preference cleared');
        }
    };
    
    console.log('🎉 Talha Hadi Resume - All animations loaded successfully!');
    console.log('💡 Try the dark mode toggle in the top right corner!');
    console.log('🎯 Hover over sections and timeline dots for interactive effects!');
    console.log('⚡ Individual timeline segments for each experience!');
    console.log('✨ Mouse follower removed - cleaner experience!');
    console.log('🚀 Device selection screen implemented!');
    console.log('🛠️ Developer tools: resumeTools.resetWelcome(), resumeTools.toggleLayout()');
}); 