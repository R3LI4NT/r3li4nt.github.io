// Script principal para el CV Hacker de R3LI4NT

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Boot Terminal
    const bootTerminal = document.getElementById('boot-terminal');
    const mainContent = document.getElementById('main-content');
    
    // Simular proceso de boot
    setTimeout(() => {
        bootTerminal.style.opacity = '0';
        setTimeout(() => {
            bootTerminal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            initializePage();
        }, 500);
    }, 4000);
    
    // También permitir salir con Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !bootTerminal.classList.contains('hidden')) {
            bootTerminal.style.opacity = '0';
            setTimeout(() => {
                bootTerminal.classList.add('hidden');
                mainContent.classList.remove('hidden');
                initializePage();
            }, 500);
        }
    });
    
    function initializePage() {
        // 2. Inicializar animaciones
        initAnimations();
        
        // 3. Inicializar efectos interactivos
        initInteractiveEffects();
        
        // 4. Inicializar menú móvil
        initMobileMenu();
        
        // 5. Inicializar sección malware
        initMalwareSection();
        
        // 6. Inicializar sección pentesting
        initPentestingSection();
        
        // 7. Inicializar funcionalidad PGP
        initPGPKeyCopy();
        
        // 8. Inicializar toggle de color
        initColorToggle();
        
        // 9. Crear lluvia de código
        createMatrixRain();
        
        // 10. Inicializar scroll suave
        initSmoothScroll();
        
        // 11. Inicializar contadores animados
        initAnimatedCounters();
        
        // 12. Inicializar efectos de escritura
        initTypingEffects();
        
        // 13. Inicializar animación de barras de habilidad
        initSkillBars();
        
        // 14. Inicializar efectos especiales
        initSpecialEffects();
    }
    
    function initAnimations() {
        // Añadir clase de animación a elementos cuando son visibles
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Efecto específico para tarjetas de malware
                    if (entry.target.classList.contains('malware-type')) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0)';
                            entry.target.style.opacity = '1';
                        }, 100);
                    }
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        document.querySelectorAll('.skill-category, .malware-type, .pentesting-area, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    function initInteractiveEffects() {
        // Efecto de brillo en elementos interactivos
        const interactiveElements = document.querySelectorAll('.nav-link, .tool-item, .pentest-tool');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 15px var(--primary-color)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
        
        // Efecto de parpadeo en terminal
        const terminalCursor = document.querySelector('.terminal-cursor');
        if (terminalCursor) {
            setInterval(() => {
                terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
        
        // Efecto de escritura en la terminal del hero
        const typedLines = document.querySelectorAll('.terminal-line.typed');
        typedLines.forEach((line, index) => {
            const text = line.getAttribute('data-text');
            line.textContent = '';
            
            setTimeout(() => {
                typeText(line, text, 0, 50);
            }, 1000 * index);
        });
        
        function typeText(element, text, index, speed) {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => {
                    typeText(element, text, index + 1, speed);
                }, speed);
            }
        }
    }
    
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animación de hamburguesa a X
                const bars = document.querySelectorAll('.menu-bar');
                if (navMenu.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
            
            // Cerrar menú al hacer clic en un enlace
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                });
            });
        }
    }
    
    function initMalwareSection() {
        // Efecto especial para las tarjetas de malware
        const malwareCards = document.querySelectorAll('.malware-type');
        
        malwareCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.malware-icon i');
                if (icon) {
                    icon.style.animation = 'pulse 0.5s';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 500);
                }
                
                // Resaltar características
                const features = this.querySelectorAll('.malware-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.color = '#ff003c';
                        feature.style.transform = 'translateX(5px)';
                    }, index * 100);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const features = this.querySelectorAll('.malware-features li');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.color = '';
                        feature.style.transform = '';
                    }, index * 50);
                });
            });
            
            // Efecto de parpadeo rojo aleatorio
            setInterval(() => {
                if (Math.random() > 0.9 && !card.matches(':hover')) {
                    card.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.6)';
                    setTimeout(() => {
                        if (!card.matches(':hover')) {
                            card.style.boxShadow = '';
                        }
                    }, 300);
                }
            }, 3000);
        });
    }
    
    function initPentestingSection() {
        // Animación de herramientas de pentesting
        const pentestTools = document.querySelectorAll('.pentest-tool');
        
        pentestTools.forEach((tool, index) => {
            // Retraso escalonado para animación
            tool.style.opacity = '0';
            tool.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tool.style.transition = 'all 0.5s ease-out';
                tool.style.opacity = '1';
                tool.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Efecto hover en áreas de pentesting
        const pentestAreas = document.querySelectorAll('.pentesting-area');
        
        pentestAreas.forEach(area => {
            area.addEventListener('mouseenter', function() {
                const tags = this.querySelectorAll('.skill-tag');
                tags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.05)';
                        tag.style.boxShadow = '0 0 8px rgba(255, 0, 60, 0.4)';
                    }, i * 50);
                });
            });
            
            area.addEventListener('mouseleave', function() {
                const tags = this.querySelectorAll('.skill-tag');
                tags.forEach(tag => {
                    tag.style.transform = '';
                    tag.style.boxShadow = '';
                });
            });
        });
    }
    
    function initPGPKeyCopy() {
        // Funcionalidad para copiar clave PGP
        const copyBtn = document.getElementById('copyPgpKey');
        const keyContent = document.querySelector('.key-content');
        
        if (copyBtn && keyContent) {
            copyBtn.addEventListener('click', function() {
                const textToCopy = keyContent.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback visual
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    this.style.backgroundColor = '#00ff41';
                    this.style.color = '#000';
                    this.style.borderColor = '#00ff41';
                    
                    // Mensaje temporal
                    const originalTitle = this.getAttribute('title');
                    this.setAttribute('title', '¡Clave copiada!');
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.backgroundColor = '';
                        this.style.color = '';
                        this.style.borderColor = '';
                        this.setAttribute('title', originalTitle || 'Copiar clave PGP');
                    }, 2000);
                }).catch(err => {
                    console.error('Error al copiar:', err);
                    // Fallback para navegadores antiguos
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        alert('Clave PGP copiada al portapapeles');
                    } catch (e) {
                        alert('No se pudo copiar la clave. Cópiala manualmente.');
                    }
                    document.body.removeChild(textArea);
                });
            });
        }
    }
    
    function initColorToggle() {
        // Toggle entre esquemas de color
        const colorToggle = document.getElementById('colorToggle');
        let isRedTheme = true;
        
        if (colorToggle) {
            colorToggle.addEventListener('click', function() {
                isRedTheme = !isRedTheme;
                
                if (isRedTheme) {
                    // Tema rojo (default)
                    document.documentElement.style.setProperty('--primary-color', '#ff003c');
                    document.documentElement.style.setProperty('--primary-dark', '#cc0030');
                    document.documentElement.style.setProperty('--glow-color', 'rgba(255, 0, 60, 0.7)');
                    this.innerHTML = '<i class="fas fa-palette"></i>';
                    this.style.backgroundColor = 'rgba(255, 0, 60, 0.9)';
                    
                    // Actualizar bordes de malware types
                    document.querySelectorAll('.malware-type').forEach(el => {
                        el.style.borderColor = '#ff003c';
                    });
                    
                    document.querySelectorAll('.skill-tag').forEach(el => {
                        el.style.backgroundColor = 'rgba(255, 0, 60, 0.2)';
                        el.style.borderColor = 'rgba(255, 0, 60, 0.3)';
                    });
                } else {
                    // Tema verde (alternativo)
                    document.documentElement.style.setProperty('--primary-color', '#00ff41');
                    document.documentElement.style.setProperty('--primary-dark', '#00cc33');
                    document.documentElement.style.setProperty('--glow-color', 'rgba(0, 255, 65, 0.7)');
                    this.innerHTML = '<i class="fas fa-skull"></i>';
                    this.style.backgroundColor = 'rgba(0, 255, 65, 0.9)';
                    
                    // Actualizar bordes de malware types
                    document.querySelectorAll('.malware-type').forEach(el => {
                        el.style.borderColor = '#00ff41';
                    });
                    
                    document.querySelectorAll('.skill-tag').forEach(el => {
                        el.style.backgroundColor = 'rgba(0, 255, 65, 0.2)';
                        el.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                    });
                }
                
                // Efecto de transición
                document.body.style.transition = 'all 0.5s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 500);
            });
        }
    }
    
    function createMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        
        // Caracteres estilo Matrix
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        // Configuración
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        const drops = new Array(columns).fill(1);
        
        // Crear canvas para la lluvia
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        matrixContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Dibujar la lluvia
        function drawMatrix() {
            // Fondo semitransparente para efecto de rastro
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Estilo del texto
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
            
            // Dibujar caracteres
            for (let i = 0; i < drops.length; i++) {
                // Carácter aleatorio
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Posición y
                const y = drops[i] * fontSize;
                
                // Intensidad variable
                const opacity = Math.random() * 0.5 + 0.5;
                ctx.globalAlpha = opacity;
                
                // Dibujar carácter
                ctx.fillText(text, i * fontSize, y);
                
                // Restaurar opacidad
                ctx.globalAlpha = 1;
                
                // Reiniciar gota cuando llega al fondo
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Mover gota hacia abajo
                drops[i]++;
            }
        }
        
        // Animar
        function animateMatrix() {
            drawMatrix();
            requestAnimationFrame(animateMatrix);
        }
        
        // Iniciar animación
        animateMatrix();
        
        // Redimensionar canvas cuando cambia el tamaño de la ventana
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    function initSmoothScroll() {
        // Scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
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
    }
    
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        // Observar cuando los contadores son visibles
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                counter.textContent = Math.floor(current);
            }, 16);
        }
    }
    
    function initTypingEffects() {
        // Efecto de escritura para el título
        const titleCursor = document.querySelector('.title-cursor');
        if (titleCursor) {
            setInterval(() => {
                titleCursor.style.opacity = titleCursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
        
        
        const subtitleBlink = document.querySelector('.subtitle-blink');
        if (subtitleBlink) {
            setInterval(() => {
                subtitleBlink.style.opacity = subtitleBlink.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
        
        
        const aboutTerminalLines = document.querySelectorAll('.about-terminal-line');
        aboutTerminalLines.forEach((line, index) => {
            if (index > 0) {
                const text = line.textContent;
                line.textContent = '';
                
                setTimeout(() => {
                    typeText(line, text, 0, 30);
                }, 500 * index);
            }
        });
    }
    
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Observar cuando las barras son visibles
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = `${width}%`;
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    function initSpecialEffects() {
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                const logo = document.querySelector('.nav-logo');
                if (logo) {
                    logo.style.textShadow = '2px 0 0 red, -2px 0 0 cyan';
                    logo.style.transform = 'translateX(2px)';
                    
                    setTimeout(() => {
                        logo.style.textShadow = '';
                        logo.style.transform = '';
                    }, 100);
                }
            }
        }, 3000);
        
        
        setInterval(() => {
            if (Math.random() > 0.8) {
                const scanline = document.createElement('div');
                scanline.style.position = 'fixed';
                scanline.style.top = '0';
                scanline.style.left = Math.random() * 100 + '%';
                scanline.style.width = '1px';
                scanline.style.height = '100%';
                scanline.style.background = 'linear-gradient(to bottom, transparent, var(--primary-color), transparent)';
                scanline.style.zIndex = '9999';
                scanline.style.animation = 'scanline 0.5s linear';
                scanline.style.pointerEvents = 'none';
                
                document.body.appendChild(scanline);
                
                setTimeout(() => {
                    if (scanline.parentNode) {
                        document.body.removeChild(scanline);
                    }
                }, 500);
            }
        }, 4000);
        
        setInterval(() => {
            if (Math.random() > 0.9) {
                const terminalElements = document.querySelectorAll('.terminal-line, .about-terminal-line');
                if (terminalElements.length > 0) {
                    const randomElement = terminalElements[Math.floor(Math.random() * terminalElements.length)];
                    const originalColor = randomElement.style.color;
                    randomElement.style.color = '#ff003c';
                    
                    setTimeout(() => {
                        randomElement.style.color = originalColor;
                    }, 200);
                }
            }
        }, 2000);
    }
    
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright p').forEach(el => {
        el.textContent = el.textContent.replace('2023', currentYear);
    });
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // Efecto de sonido opcional (comentado por defecto)
        /*
        const clickSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
        document.querySelectorAll('button, .nav-link').forEach(el => {
            el.addEventListener('click', () => {
                clickSound.currentTime = 0;
                clickSound.play();
            });
        });
        */
    });
});