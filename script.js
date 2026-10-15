const $ = id => document.getElementById(id);
const hearts = $('hearts'), emojis = ['💗','💖','🌸','✨','💛','🌷'];

// Floating background hearts
for (let i = 0; i < 18; i++) {
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = emojis[i % emojis.length];
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = 16 + Math.random() * 26 + 'px';
  h.style.animationDuration = 9 + Math.random() * 10 + 's';
  h.style.animationDelay = -Math.random() * 15 + 's';
  hearts.appendChild(h);
}

// The "No" button dodges, with kinder and kinder messages
const lines = ['Are you sure? 🥺','Think about it again…','I made you a letter!','Please? I\'ll bring flowers 🌹','The button is shy, try Yes 😄'];
let dodges = 0;
function dodge() {
  const box = document.querySelector('.btns').getBoundingClientRect();
  const no = $('no');
  const x = Math.random() * (box.width - no.offsetWidth - 10);
  const y = Math.random() * (box.height - no.offsetHeight);
  no.style.left = x + 'px';
  no.style.top = y + 'px';
  no.style.transform = 'none';
  $('hint').textContent = lines[dodges++ % lines.length];
  const yes = $('yes');
  yes.style.fontSize = Math.min(1.25 + dodges * 0.08, 1.9) + 'rem';
}
$('no').addEventListener('mouseenter', dodge);
$('no').addEventListener('touchstart', e => { e.preventDefault(); dodge(); }, {passive:false});
$('no').addEventListener('click', dodge);

// Yes → confetti
function confetti() {
  const colors = ['💖','🌸','✨','💛','🎉','🌷','💜'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    c.textContent = colors[i % colors.length];
    c.style.left = Math.random() * 100 + 'vw';
    c.style.fontSize = 16 + Math.random() * 22 + 'px';
    c.style.animationDuration = 2.5 + Math.random() * 3 + 's';
    c.style.animationDelay = Math.random() * 1.2 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7500);
  }
}
$('yes').addEventListener('click', () => { $('win').classList.add('on'); confetti(); $('close').focus(); });
$('close').addEventListener('click', () => $('win').classList.remove('on'));