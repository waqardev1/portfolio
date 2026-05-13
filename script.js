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
