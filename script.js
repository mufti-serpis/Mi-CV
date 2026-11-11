// 1. Terminal Typing Effect Simulation
const typedTarget = document.getElementById('terminal-typed');
const commands = [
    'systemctl status dhcpd.service',
    'named-checkconf /etc/bind/named.conf',
    'docker compose up -d',
    'incus list --columns=ns4'
];
let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeTerminal() {
    if (!typedTarget) return;
    const currentCmd = commands[cmdIndex];
    
    if (isDeleting) {
        typedTarget.textContent = currentCmd.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTarget.textContent = currentCmd.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentCmd.length) {
        speed = 2200; // Delay before erasing
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        speed = 300;
    }

    setTimeout(typeTerminal, speed);
}

// 2. Control del Menú Desplegable Móvil
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (!mobileMenu || !menuIcon) return;

    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    }
}

// 3. Scroll Reveal Engine
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

// 4. Category Filter for Work Experience
function filterExperience(category, evt) {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.exp-card');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    cards.forEach(card => {
        if (category === 'todos') {
            card.style.display = 'block';
        } else if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 5. Clipboard Action with Toast Notification
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast-notify');
        if (!toast) return;
        toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        }, 3000);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    typeTerminal();
    setupScrollReveal();

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
});
