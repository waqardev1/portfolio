const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const TIMELINE_URL = 'data/timeline.json';

function loadTheme(){
  const t = localStorage.getItem('theme') || 'light';
  if(t==='dark') document.body.classList.add('dark');
}
function toggleTheme(){
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
themeToggle && themeToggle.addEventListener('click', toggleTheme);
loadTheme();

// Fetch timeline data and render
async function renderTimeline(){
  try{
    const res = await fetch(TIMELINE_URL);
    const data = await res.json();
    const list = document.getElementById('timeline-list');
    data.forEach(ev=>{
      const item = document.createElement('article');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <span class="year">${ev.year}</span>
            <h4>${ev.class} — ${ev.subject}</h4>
          </div>
          <button class="expand-btn" aria-expanded="false">Details</button>
        </div>
        <p class="short">${ev.shortSummary}</p>
        <div class="details" hidden>
          <p><strong>Institution:</strong> ${ev.institution || '—'}</p>
          <p><strong>Outcome:</strong> ${ev.measurableOutcome || '—'}</p>
          <p><strong>Methods:</strong> ${ev.methods ? ev.methods.join('; ') : '—'}</p>
          <p><strong>Problems solved:</strong> ${ev.problemsSolved ? ev.problemsSolved.join('; ') : '—'}</p>
          <blockquote>${ev.studentQuote || ''}</blockquote>
        </div>
      `;
      const btn = item.querySelector('.expand-btn');
      const details = item.querySelector('.details');
      btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        details.hidden = expanded;
      });
      list.appendChild(item);
    });
  }catch(e){console.error('timeline load error',e)}
}
renderTimeline();

// Mobile drawer toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileClose = document.getElementById('mobile-close');
if(menuToggle && mobileDrawer){
  menuToggle.addEventListener('click', ()=>{
    const open = mobileDrawer.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.setAttribute('aria-hidden', String(!open));
  });
}
if(mobileClose){
  mobileClose.addEventListener('click', ()=>{ mobileDrawer.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); mobileDrawer.setAttribute('aria-hidden','true'); });
}

// Header shrink on scroll + active link detection
const header = document.getElementById('site-header');
const navLinks = document.querySelectorAll('.main-nav a');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 40) header.classList.add('shrink'); else header.classList.remove('shrink');
  // active link
  const fromTop = window.scrollY + 80;
  navLinks.forEach(link=>{
    const section = document.querySelector(link.getAttribute('href'));
    if(section){
      if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
        link.classList.add('active');
      } else link.classList.remove('active');
    }
  });
});

// Basic contact form handling (uses Formspree if configured, else mailto fallback)
const form = document.getElementById('contact-form');
form && form.addEventListener('submit', async (ev)=>{
  ev.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  // Try Formspree
  const endpoint = ''; // set to your Formspree endpoint if available
  if(endpoint){
    try{
      const r = await fetch(endpoint, {method:'POST', body: formData});
      if(r.ok) alert('Message sent — thank you!'); else alert('Send failed, try emailing directly');
    }catch(err){alert('Send failed, try emailing directly')}
  }else{
    // mailto fallback
    const subject = encodeURIComponent('Tutoring inquiry from ' + (payload.name || '')); 
    const body = encodeURIComponent(`Email: ${payload.email}\nPhone: ${payload.phone || ''}\n\n${payload.message}`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  }
});
