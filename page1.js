class HorizontalPopupManager {
    constructor() {
        this.currentPopup = null;
        this.horizontalPopups = ['horizontal-popup1', 'horizontal-popup2', 'horizontal-popup3'];
        this.init();
    }

    init() {
        this.bindEvents();
        this.bindKeyboardEvents();
    }

    bindEvents() {
        document.querySelectorAll('[data-horizontal-popup]').forEach(box => {
            box.addEventListener('click', (e) => this.handleBoxClick(e));
        });

        document.querySelectorAll('.horizontal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => this.closePopup());
        });

        document.getElementById('overlay').addEventListener('click', () => this.closePopup());
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        });
    }

    handleBoxClick(e) {
        const popupId = e.currentTarget.getAttribute('data-horizontal-popup');
        this.openPopup(popupId);
    }

    openPopup(popupId) {
        if (this.currentPopup) {
            this.closePopup();
            setTimeout(() => this.actuallyOpenPopup(popupId), 400);
        } else {
            this.actuallyOpenPopup(popupId);
        }
    }

    actuallyOpenPopup(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById('overlay');

        overlay.style.display = 'block';
        popup.style.display = 'block';

        void popup.offsetWidth;

        setTimeout(() => {
            overlay.classList.add('active');
            popup.classList.add('active');
        }, 10);

        this.currentPopup = popupId;
        document.body.style.overflow = 'hidden';
    }

    closePopup() {
        if (!this.currentPopup) return;

        const popup = document.getElementById(this.currentPopup);
        const overlay = document.getElementById('overlay');

        popup.classList.remove('active');
        overlay.classList.remove('active');

        setTimeout(() => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            this.currentPopup = null;
            document.body.style.overflow = '';
        }, 500);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new HorizontalPopupManager();
});
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const arrow = button.querySelector('.arrow');


        faqQuestions.forEach(btn => {
            const otherAnswer = btn.nextElementSibling;
            const otherArrow = btn.querySelector('.arrow');
            if (otherAnswer !== answer) {
                otherAnswer.style.display = 'none';
                otherArrow.style.transform = 'rotate(0deg)';
            }
        });

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    initSmoothScrolling();
});

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();


            navLinks.forEach(l => l.classList.remove('active'));


            this.classList.add('active');

            const linkId = this.querySelector('img').id;
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;

            switch (linkId) {
                case 'homesvg':
                    scrollToSection('header', navbarHeight);
                    break;

                case 'abtus':
                    scrollToSection('.about_cse', navbarHeight);
                    break;

                case 'abtsws':
                    scrollToSection('.content-section', navbarHeight);
                    break;

                case 'contactus':
                    scrollToSection('footer', navbarHeight);
                    break;

                default:
                    window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });


    window.addEventListener('scroll', function () {
        highlightActiveSection();
    });
}

function scrollToSection(selector, offset = 0) {
    const element = document.querySelector(selector);

    if (!element) {
        console.warn(`Element "${selector}" not found`);
        return;
    }

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementTop - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function highlightActiveSection() {
    const sections = [
        { selector: 'header', linkId: 'homesvg' },
        { selector: '.about_cse', linkId: 'abtus' },
        { selector: '.content-section', linkId: 'abtsws' },
        { selector: 'footer', linkId: 'contactus' }
    ];

    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (!element) return;

        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {

            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.nav-links a img[id="${section.linkId}"]`)?.closest('a');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}