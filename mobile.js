document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
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