const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 12, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}
createParticles();

let currentOSFilter = null;

function filterByOS(os) {
    const articles = document.querySelectorAll('main .article-item[data-os]');
    const filterBtns = document.querySelectorAll('.os-filter-btn');
    const techTags = document.querySelectorAll(`.tech-tag[data-os="${os}"]`);
    const clearBtn = document.getElementById('clearFilterBtn');
    
    if (currentOSFilter === os) {
        clearOSFilter();
        return;
    }
    
    filterBtns.forEach(btn => {
        if (btn.dataset.os === os) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.classList.remove('active-filter');
    });
    techTags.forEach(tag => tag.classList.add('active-filter'));
    
    let visibleCount = 0;
    articles.forEach(article => {
        if (article.dataset.os === os) {
            article.classList.remove('hidden-by-os');
            article.classList.add('highlight-by-os');
            visibleCount++;
        } else {
            article.classList.add('hidden-by-os');
            article.classList.remove('highlight-by-os');
        }
    });
    
    const visibleCountSpan = document.getElementById('visibleCount');
    if (visibleCountSpan) visibleCountSpan.textContent = visibleCount;
    
    if (clearBtn) clearBtn.style.display = 'inline-block';
    
    currentOSFilter = os;
}

function clearOSFilter() {
    const articles = document.querySelectorAll('main .article-item');
    const filterBtns = document.querySelectorAll('.os-filter-btn');
    const techTags = document.querySelectorAll('.tech-tag');
    const clearBtn = document.getElementById('clearFilterBtn');
    
    articles.forEach(article => {
        article.classList.remove('hidden-by-os', 'highlight-by-os');
    });
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    techTags.forEach(tag => tag.classList.remove('active-filter'));
    
    const visibleCountSpan = document.getElementById('visibleCount');
    if (visibleCountSpan) {
        visibleCountSpan.textContent = articles.length;
    }
    
    if (clearBtn) clearBtn.style.display = 'none';
    
    currentOSFilter = null;
}

function toggleCategory(header) {
    const wrapper = header.closest('.category-wrapper');
    wrapper.classList.toggle('collapsed');
    
    const id = wrapper.id;
    const isCollapsed = wrapper.classList.contains('collapsed');
    localStorage.setItem(`category_${id}`, isCollapsed);
}

function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const articles = document.querySelectorAll('main .article-link');
        
        articles.forEach(article => {
            const text = article.textContent.toLowerCase();
            const parent = article.closest('.article-item');
            
            if (text.includes(term)) {
                article.style.opacity = '1';
                article.style.background = 'rgba(0,255,157,0.1)';
                if (parent) parent.style.opacity = '1';
            } else {
                article.style.opacity = '0.3';
                article.style.background = 'none';
            }
        });
    });
}

function initImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            
            const caption = this.closest('.image-container')?.querySelector('.image-caption');
            if (caption && modalCaption) {
                modalCaption.textContent = caption.textContent.replace('🔍 click para ampliar', '').trim();
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg) return;
    
    const img = element.querySelector('img') || element;
    modal.classList.add('active');
    modalImg.src = img.src || element.src;
    
    const caption = element.querySelector('.image-caption');
    if (caption && modalCaption) {
        modalCaption.textContent = caption.textContent.replace('🔍 click para ampliar', '').trim();
    }
}

function initCustomModals() {
    const toxLink = document.getElementById('toxLink');
    const toxModal = document.getElementById('toxModal');
    
    const emailLink = document.getElementById('emailLink');
    const emailModal = document.getElementById('emailModal');
    
    const responsabilidadLink = document.getElementById('responsabilidadLink');
    const responsabilidadModal = document.getElementById('responsabilidadModal');
    
    const closeBtns = document.querySelectorAll('.modal-close');
    
    if (toxLink && toxModal) {
        toxLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            toxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (emailLink && emailModal) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            emailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (responsabilidadLink && responsabilidadModal) {
        responsabilidadLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            responsabilidadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✓ Copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('✓ Copiado al portapapeles');
    });
}

function copyCommand(command) {
    copyToClipboard(command);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function initSmoothScroll() {
    document.querySelectorAll('.nav-link, .footer-links a[href^="#"], .toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function initKeyboardShortcuts() {
    const searchInput = document.getElementById('globalSearch');
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
        
        if (e.key === 'Escape' && currentOSFilter) {
            clearOSFilter();
        }
        
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function restoreCategoryState() {
    document.querySelectorAll('.category-wrapper').forEach(wrapper => {
        const id = wrapper.id;
        const savedState = localStorage.getItem(`category_${id}`);
        
        if (savedState === null) {
            if (id !== 'hacking') {
                wrapper.classList.add('collapsed');
            }
        } else if (savedState === 'true') {
            wrapper.classList.add('collapsed');
        }
    });
}

function updateInitialCount() {
    const visibleCountSpan = document.getElementById('visibleCount');
    if (visibleCountSpan) {
        const mainArticles = document.querySelectorAll('main .article-item');
        visibleCountSpan.textContent = mainArticles.length;
    }
}


function generateTOC() {
    const headings = document.querySelectorAll('article .content-card h2');
    const tocList = document.getElementById('tocList');
    const sidebarToc = document.getElementById('sidebarToc');
    
    if (!headings.length || !tocList) return;
    
    tocList.innerHTML = '';
    if (sidebarToc) sidebarToc.innerHTML = '';
    
    headings.forEach((heading, index) => {
        const id = heading.textContent.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
        heading.id = id || `section-${index}`;
        
        const li = document.createElement('li');
        li.className = 'toc-item';
        li.innerHTML = `<a href="#${heading.id}" class="toc-link">${heading.textContent.replace('#', '').trim()}</a>`;
        tocList.appendChild(li);
        
        if (sidebarToc) {
            const sidebarLink = document.createElement('a');
            sidebarLink.href = `#${heading.id}`;
            sidebarLink.className = 'nav-link';
            sidebarLink.innerHTML = `
                <i class="fas fa-chevron-right" style="color: var(--accent-primary); font-size: 0.8rem;"></i>
                <span>${heading.textContent.replace('#', '').trim()}</span>
            `;
            sidebarToc.appendChild(sidebarLink);
        }
    });
    
    initSmoothScroll();
}

function highlightTOC() {
    const sections = document.querySelectorAll('article .content-card');
    const tocLinks = document.querySelectorAll('.toc-link, #sidebarToc .nav-link');
    
    if (!sections.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const heading = section.querySelector('h2');
                if (heading) current = heading.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initStickyTOC() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;
    
    const observer = new IntersectionObserver(
        ([e]) => {
            e.target.classList.toggle('sticky-active', e.intersectionRatio < 1);
        },
        { threshold: [1] }
    );
    
    observer.observe(toc);
}

document.addEventListener('DOMContentLoaded', () => {
    restoreCategoryState();
    initGlobalSearch();
    initImageModal();
    initCustomModals();
    initSmoothScroll();
    initKeyboardShortcuts();
    updateInitialCount();
    
    if (document.querySelector('article')) {
        generateTOC();
        highlightTOC();
        initStickyTOC();
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        document.body.classList.add('scrolling-active');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling-active');
        }, 150);
    });
});

document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Error cargando imagen:', e.target.src);
    }
}, true);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.colorScheme = 'dark';
}

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.id && !link.classList.contains('social-link')) {
            e.preventDefault();
        }
    });
});