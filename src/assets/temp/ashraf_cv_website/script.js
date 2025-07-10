// Language Toggle Functionality
const langToggle = document.getElementById('lang-toggle');
const body = document.body;
const html = document.documentElement;

// Arabic and English content
const content = {
    ar: {
        title: "أشرف أحمد العلي - السيرة الذاتية",
        name: "أشرف أحمد العلي",
        nav: {
            about: "عني",
            experience: "الخبرات",
            education: "التعليم",
            gallery: "الصور",
            achievements: "الإنجازات",
            projects: "المشاريع",
            hobbies: "الهوايات",
            contact: "التواصل"
        },
        hero: {
            title: "أشرف أحمد العلي",
            description: "خبير في العلاقات العامة والتواصل المؤسسي، متخصص في التسويق والاستثمار الرياضي، وعضو فعال في المسؤولية الاجتماعية والتطوير المجتمعي",
            cta: "تعرف علي أكثر"
        },
        sections: {
            about: "عني",
            experience: "الخبرات العلمية",
            education: "التعليم",
            gallery: "الصور والفيديوهات",
            achievements: "الإنجازات والشهادات",
            projects: "المشاريع",
            hobbies: "الهوايات",
            contact: "معلومات التواصل"
        },
        langBtn: "English"
    },
    en: {
        title: "Ashraf Ahmed Al-Ali - CV",
        name: "Ashraf Ahmed Al-Ali",
        nav: {
            about: "About",
            experience: "Experience",
            education: "Education",
            gallery: "Gallery",
            achievements: "Achievements",
            projects: "Projects",
            hobbies: "Hobbies",
            contact: "Contact"
        },
        hero: {
            title: "Ashraf Ahmed Al-Ali",
            description: "Expert in Public Relations and Corporate Communication, specialized in Sports Marketing and Investment, and an active member in Social Responsibility and Community Development",
            cta: "Learn More About Me"
        },
        sections: {
            about: "About Me",
            experience: "Professional Experience",
            education: "Education",
            gallery: "Photos & Videos",
            achievements: "Achievements & Certificates",
            projects: "Projects",
            hobbies: "Hobbies",
            contact: "Contact Information"
        },
        langBtn: "العربية"
    }
};

let currentLang = 'ar';

// Typing animation texts
const typingTexts = {
    ar: [
        "العلاقات العامة والتواصل المؤسسي",
        "متخصص التسويق والاستثمار الرياضي",
        "ممثل العلاقات العامة لدى شركة الأحساء للسياحة والترفيه",
        "عضو مجلس إدارة جمعية سند للمسؤولية الاجتماعية",
        "مدير العلاقات العامة والتواصل المؤسسي في جمعية سند"
    ],
    en: [
        "Public Relations and Corporate Communication",
        "Sports Marketing and Investment Specialist",
        "Public Relations Representative at Al-Ahsa Tourism and Entertainment Company",
        "Board Member of Sanad Association for Social Responsibility",
        "Public Relations and Corporate Communication Manager at Sanad Association"
    ]
};

// Language toggle function
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
    if (currentLang === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        body.setAttribute('dir', 'ltr');
    } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        body.setAttribute('dir', 'rtl');
    }
    
    updateContent();
    startTypingAnimation();
}

// Update content based on language
function updateContent() {
    const currentContent = content[currentLang];
    
    // Update title
    document.title = currentContent.title;
    
    // Update navigation
    document.querySelector('.logo h1').textContent = currentContent.name;
    langToggle.textContent = currentContent.langBtn;
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const navKeys = Object.keys(currentContent.nav);
    navLinks.forEach((link, index) => {
        if (navKeys[index]) {
            link.textContent = currentContent.nav[navKeys[index]];
        }
    });
    
    // Update hero section
    document.querySelector('.hero-title').textContent = currentContent.hero.title;
    document.querySelector('.hero-description').textContent = currentContent.hero.description;
    document.querySelector('.cta-button').textContent = currentContent.hero.cta;
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionKeys = Object.keys(currentContent.sections);
    sectionTitles.forEach((title, index) => {
        if (sectionKeys[index]) {
            title.textContent = currentContent.sections[sectionKeys[index]];
        }
    });
}

// Typing animation
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentTexts = typingTexts[currentLang];
    const currentText = currentTexts[typingIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % currentTexts.length;
    }
    
    setTimeout(typeText, typingSpeed);
}

function startTypingAnimation() {
    typingIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typeText();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery filtering
function initGalleryFiltering() {
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Achievements filtering
function initAchievementsFiltering() {
    const filterBtns = document.querySelectorAll('.achievements-filters .filter-btn');
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            achievementItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    updateContent();
    startTypingAnimation();
    
    // Initialize event listeners
    langToggle.addEventListener('click', toggleLanguage);
    initSmoothScrolling();
    initGalleryFiltering();
    initAchievementsFiltering();
    initScrollAnimations();
    
    // Add active nav link highlighting on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

