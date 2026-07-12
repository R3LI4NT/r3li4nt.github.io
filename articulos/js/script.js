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
    const closeBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('active');
            modalImg.src = img.src;
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
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
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
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '✓ Copiado al portapapeles';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '✓ Copiado al portapapeles';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('.nav-link, .footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
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

document.addEventListener('DOMContentLoaded', () => {
    restoreCategoryState();
    initGlobalSearch();
    initImageModal();
    initCustomModals();
    initSmoothScroll();
    initKeyboardShortcuts();
    updateInitialCount();
});