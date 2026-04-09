// Mr Juicy — interactive layer
// 1) mobile nav toggle
// 2) scroll reveal animations

document.addEventListener('DOMContentLoaded', () => {
  // mobile nav
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.burger-icon');
  if (btn) btn.addEventListener('click', () => nav.classList.toggle('open'));

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
});
