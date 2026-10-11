(function(){
  const cfg = window.SITE_CONFIG || {};
  document.querySelectorAll('[data-config]').forEach(function(link){
    const key = link.getAttribute('data-config');
    const value = cfg[key];
    if (key === 'whatsappNumber' && typeof value === 'string' && value.trim()) {
      const digits = value.replace(/\D/g, '');
      if (digits) { link.href = 'https://wa.me/' + digits; link.target = '_blank'; link.rel = 'noopener'; link.classList.remove('is-unavailable'); return; }
    }
    if (typeof value === 'string' && value.trim()) {
      link.href = value.trim(); link.target = '_blank'; link.rel = 'noopener'; link.classList.remove('is-unavailable');
    } else {
      link.classList.add('is-unavailable');
      link.setAttribute('aria-label', link.textContent.trim() + ' — يحتاج إضافة الرابط في config.js');
      link.addEventListener('click', function(event){ event.preventDefault(); const hint = document.getElementById('config-hint'); if (hint) { hint.textContent = 'الرابط الخاص بـ ' + link.textContent.trim() + ' لسه مش مضاف. أضيفيه في ملف config.js لتفعيل الزر.'; hint.scrollIntoView({behavior:'smooth',block:'center'}); } else { window.location.href = 'index.html#contact'; } });
    }
  });
  document.querySelectorAll('#year').forEach(function(el){el.textContent = new Date().getFullYear();});
  const otherToggle = document.getElementById('other-occasions-toggle');
  const otherOccasions = document.getElementById('other-occasions');
  const soonMessage = document.getElementById('soon-message');
  if (otherToggle && otherOccasions) {
    otherToggle.addEventListener('click', function(){
      const isOpen = !otherOccasions.hidden;
      otherOccasions.hidden = isOpen;
      otherToggle.setAttribute('aria-expanded', String(!isOpen));
      if (soonMessage) soonMessage.hidden = true;
    });
    otherOccasions.querySelectorAll('.occasion-soon').forEach(function(button){
      button.addEventListener('click', function(){
        if (soonMessage) {
          soonMessage.textContent = 'Soon — قريبًا ♥️';
          soonMessage.hidden = false;
        }
      });
    });
  }
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.invitation-card');
  filters.forEach(function(button){button.addEventListener('click',function(){
    const filter = button.getAttribute('data-filter');
    filters.forEach(function(b){b.classList.toggle('active',b===button);});
    cards.forEach(function(card){card.classList.toggle('hidden-card',filter!=='all' && card.getAttribute('data-type')!==filter);});
  });});
})();
