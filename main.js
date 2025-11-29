// JavaScript educativo: interacción mínima y comentada para estudiantes
// DEMON SLAYER EDITION — ampliado sin romper el código del maestro

document.addEventListener('DOMContentLoaded', function(){
  
  
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  const showHintBtn = document.getElementById('showHint');

  
  const currentTheme = localStorage.getItem('animelab-theme');
  if (currentTheme === 'light') {
    body.classList.add('light');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', function(){
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
  });

  
  navToggle.addEventListener('click', function(){
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
  });

  
  window.openLightbox = function(src){
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = "hidden";
  };

  window.closeLightbox = function(e){
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.getElementById('lightboxImg').src = '';
      document.body.style.overflow = "";
    }
  };

  document.addEventListener('keydown', (ev)=>{
    if (ev.key === "Escape") {
      const box = document.getElementById('lightbox');
      box.style.display = 'none';
      document.getElementById('lightboxImg').src = '';
      document.body.style.overflow = "";
    }
  });

  
  window.showProfile = function(name){
    const bio = {
      'Sakura': 'Sakura — ninja aprendiz. Habilidad: poda elemental.',
      'Ryu': 'Ryu — piloto de mecha. Habilidad: tácticas defensivas.',
      'Luna': 'Luna — astrónoma hechicera. Habilidad: manipulación gravitatoria.'
    };
    const message = bio[name] || 'Perfil no encontrado';
    alert(message);
  };


  
  const dsCharacters = {
    tanjiro: {
      img: "assets/images/tanjiro.jpg",
      name: "Tanjiro Kamado",
      bio: "Un cazador noble con la respiración del agua.",
      fact: "Tiene un olfato extremadamente desarrollado."
    },
    nezuko: {
      img: "assets/images/nezuko.jpg",
      name: "Nezuko Kamado",
      bio: "Convertida en demonio, pero conserva su humanidad.",
      fact: "Puede encogerse dentro de una caja."
    },
    zenitsu: {
      img: "assets/images/zenitsu.jpg",
      name: "Zenitsu Agatsuma",
      bio: "Cazador con respiración del rayo. Temeroso pero increíblemente fuerte al desmayarse.",
      fact: "Su técnica favorita: 'Primer estilo — Ikazuchi no Koi'."
    }
  };

  const modal = document.getElementById('characterModal');
  const modalImg = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalBio = document.getElementById('modalBio');
  const modalFact = document.getElementById('modalFact');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.character;
      const p = dsCharacters[id];
      if (!p) return;

      modalImg.src = p.img;
      modalName.textContent = p.name;
      modalBio.textContent = p.bio;
      modalFact.textContent = p.fact;

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener('click', () =>{
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = "";
  });

  modal.addEventListener('click', (e)=>{
    if (e.target === modal){
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = "";
    }
  });

  
  document.querySelectorAll('.read-more').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      alert("Aquí iría la noticia completa (simulado para el proyecto).");
    });
  });

  
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(ev){
    ev.preventDefault();

    const nameI = document.getElementById('name');
    const emailI = document.getElementById('email');
    const msgI = document.getElementById('message');
    const feedback = document.getElementById('formFeedback');

    let ok = true;

    function mark(field, condition){
      field.classList.remove('error','success');
      if (condition){ field.classList.add('success'); }
      else{ field.classList.add('error'); ok = false; }
    }

    mark(nameI, nameI.value.trim().length > 2);
    mark(emailI, /^\S+@\S+\.\S+$/.test(emailI.value));
    mark(msgI, msgI.value.trim().length >= 5);

    if (!ok){
      feedback.textContent = "Por favor corrige los campos marcados en rojo.";
      feedback.style.color = "#ff4d4d";
      return;
    }

    feedback.textContent = "Mensaje enviado (simulado). ¡Gracias!";
    feedback.style.color = "#37d97c";
    form.reset();
  });

  
  const aboutToggle = document.getElementById('aboutToggle');
  const aboutContent = document.getElementById('aboutContent');

  if (aboutToggle){
    aboutToggle.addEventListener('click', ()=>{
      aboutContent.classList.toggle('hidden');
    });
  }

  
  showHintBtn.addEventListener('click', function(){
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Pista: revisa css/style.css para encontrar variables y layout. Revisa js/main.js para ver eventos.';
    document.querySelector('.hero').appendChild(hint);
    setTimeout(()=> hint.remove(), 6000);
  });

  
  document.querySelectorAll('.card, .thumb, .news-card').forEach((el,i)=>{
    el.style.animation = `fadeUp .6s ${(i*0.1)}s both`;
  });
 
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');

  let isPlaying = false;

  if(musicBtn){
    musicBtn.addEventListener('click', () => {
      if (!isPlaying) {
        bgMusic.play();
        musicBtn.textContent = "⏸️ Pausar música";
        isPlaying = true;
      } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Música";
        isPlaying = false;
      }
    });
  }

});   
