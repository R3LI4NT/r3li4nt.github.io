document.addEventListener('DOMContentLoaded', function() {
    // 1. Boot Sequence
    const bootTerminal = document.getElementById('boot-terminal');
    const mainContent = document.getElementById('main-content');
    let bootComplete = false;

    
    const bootSequence = async () => {
        await delay(500);
        typeTerminalText();
        
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !bootComplete) {
                skipBoot();
            }
        });

        
        setTimeout(() => {
            if (!bootComplete) completeBoot();
        }, 4000);
    };

    const typeTerminalText = () => {
        const lines = document.querySelectorAll('.terminal-text');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 500);
        });
    };

    const completeBoot = () => {
        bootComplete = true;
        bootTerminal.style.opacity = '0';
        bootTerminal.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            bootTerminal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            initializeApp();
        }, 500);
    };

    const skipBoot = () => {
        if (bootComplete) return;
        bootComplete = true;
        completeBoot();
    };

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    
    const initializeApp = () => {
        initNavigation();
        initMatrixRain();
        initScrollEffects();
        initAnimations();
        initThemeToggle();
        initBackToTop();
        initCopyButtons();
        initCounters();
        initMobileMenu();
        initGlitchEffects();
        initSkillBars();
    };

    
    const initNavigation = () => {
        const nav = document.querySelector('.floating-nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    
    const initMatrixRain = () => {
        const canvas = document.createElement('canvas');
        const container = document.getElementById('matrix-background');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        container.appendChild(canvas);
        
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        let animationId;
        
        const draw = () => {
            
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
            
            drops.forEach((y, i) => {
                
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                
                const x = i * fontSize;
                ctx.fillText(text, x, y * fontSize);
                
                
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                
                drops[i]++;
            });
        };
        
        const animate = () => {
            draw();
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', handleResize);
        
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    };

    
    const initScrollEffects = () => {
        
        const fadeSections = document.querySelectorAll('.fade-section');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        fadeSections.forEach(section => fadeObserver.observe(section));
    };

    
    const initAnimations = () => {
        
        setInterval(() => {
            const glitchElements = document.querySelectorAll('.glitch');
            glitchElements.forEach(el => {
                if (Math.random() > 0.7) {
                    el.style.animation = 'none';
                    setTimeout(() => {
                        el.style.animation = 'glitch 0.3s';
                    }, 10);
                }
            });
        }, 3000);
        
        
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
        
        
        const floatingElements = document.querySelectorAll('.about-card, .skill-category, .project-card');
        floatingElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'transform 0.3s ease-out';
            });
        });
    };

    
    const initThemeToggle = () => {
        const toggleBtn = document.getElementById('themeToggle');
        let currentTheme = 'red';
        
        const themes = {
            red: {
                primary: '#ff003c',
                secondary: '#00ff41',
                accent: '#00d9ff'
            },
            blue: {
                primary: '#0088ff',
                secondary: '#00ffdd',
                accent: '#ff00aa'
            },
            purple: {
                primary: '#9d00ff',
                secondary: '#00ff9d',
                accent: '#ffd700'
            },
            green: {
                primary: '#00ff41',
                secondary: '#ff003c',
                accent: '#0088ff'
            }
        };
        
        toggleBtn.addEventListener('click', () => {
            const themeKeys = Object.keys(themes);
            const currentIndex = themeKeys.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themeKeys.length;
            currentTheme = themeKeys[nextIndex];
            const theme = themes[currentTheme];
            
            
            document.documentElement.style.setProperty('--primary', theme.primary);
            document.documentElement.style.setProperty('--secondary', theme.secondary);
            document.documentElement.style.setProperty('--accent', theme.accent);
            
            
            const icons = ['fa-palette', 'fa-moon', 'fa-sun', 'fa-bolt'];
            toggleBtn.innerHTML = `<i class="fas ${icons[nextIndex]}"></i>`;
            
            
            toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 150);
        });
    };

    
    const initBackToTop = () => {
        const backBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        });
        
        backBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    
    const initCopyButtons = () => {
        const copyBtn = document.getElementById('copyToxId');
        if (!copyBtn) return;
        
        copyBtn.addEventListener('click', async () => {
            const keyElement = document.querySelector('.pgp-key');
            const text = keyElement.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(text);
                
                
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.background = '#00ff41';
                copyBtn.style.color = '#000';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
                
                
                showNotification('TOX ID copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                showNotification('Failed to copy. Please copy manually.', true);
            }
        });
    };

    
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const value = Math.floor(easeOut * target);
                
                counter.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
    };

   
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-menu');
        const menuLines = document.querySelectorAll('.menu-line');
        
        if (!menuToggle) return;
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            
            if (navMenu.classList.contains('active')) {
                menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                menuLines[1].style.opacity = '0';
                menuLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
        
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
        
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
    };

    
    const initGlitchEffects = () => {
        
        setInterval(() => {
            const elements = document.querySelectorAll('.glass');
            if (elements.length > 0 && Math.random() > 0.8) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                const originalBorder = randomElement.style.border;
                
                randomElement.style.border = '1px solid #ff003c';
                randomElement.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.5)';
                
                setTimeout(() => {
                    randomElement.style.border = originalBorder;
                    randomElement.style.boxShadow = '';
                }, 100);
            }
        }, 5000);
    };

    
    const initSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = `${level}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    };

    
    const showNotification = (message, isError = false) => {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isError ? '#ff003c' : '#00ff41'};
            color: #000;
            padding: 15px 25px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .nav-link.active {
            color: var(--primary) !important;
            background: rgba(var(--primary-rgb), 0.1) !important;
        }
    `;
    document.head.appendChild(style);

    
    bootSequence();
});
