const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const arrow = button.querySelector('.arrow');

    // Optional: close other open answers
    faqQuestions.forEach(btn => {
      const otherAnswer = btn.nextElementSibling;
      const otherArrow = btn.querySelector('.arrow');
      if (otherAnswer !== answer) {
        otherAnswer.style.display = 'none';
        otherArrow.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle clicked answer
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      arrow.style.transform = 'rotate(0deg)';
    } else {
      answer.style.display = 'block';
      arrow.style.transform = 'rotate(180deg)';
    }
  });
});
