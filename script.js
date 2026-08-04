/* =====================================================================
   CONGUILLÍO TREKKING JOURNAL — LOGIC
   =====================================================================
   TO ADD A NEW TRAIL/PIN: copy one of the objects in the TRAILS array
   below, give it a unique "id", and set "pin: {x, y}" as percentages
   of the MAP IMAGE itself (0,0 = top-left corner of the map, 100,100
   = bottom-right corner). Open images/park-map.jpg, estimate roughly
   where on the picture (as a % across, % down) your trailhead is, and
   use those numbers. Reload the page to see it appear.

   TO REMOVE A TRAIL: delete its whole {...} object from the array.

   Distances/times for the 20 "connector" and "circuito" routes below
   are estimated from the map's scale bar, not an official source —
   feel free to correct any of them, they're just plain numbers here.
   ===================================================================== */

const TRAILS = [
  // ---- original CONAF-listed trails ----
  { id:'sierra-nevada', name:'Sendero Sierra Nevada', zone:'Sector Lago Conguillío', km:12, duration:'5.5 h', difficulty:'media',
    pin:{x:70,y:16},
    desc:'Considerado el sendero más icónico del parque. Sube en zigzag entre bosques de araucarias y antiguas coladas de lava hasta un mirador que enfrenta al volcán Llaima con vistas al lago Conguillío.',
    highlights:['Mirador frente al volcán Llaima','Cruce de antiguos campos de lava','Bosque de araucarias milenarias'] },
  { id:'araucarias', name:'Sendero Las Araucarias', zone:'Centro del parque', km:0.8, duration:'1.5 h', difficulty:'baja',
    pin:{x:48,y:40},
    desc:'Un paseo corto y familiar hasta la Araucaria Madre, un ejemplar de más de 1.800 años de edad. Ideal para observar aves, en especial el carpintero negro.',
    highlights:['Araucaria Madre (+1.800 años)','Avistamiento de carpintero negro','Apto para toda la familia'] },
  { id:'carpinteros', name:'Sendero Los Carpinteros', zone:'Captrén → Lago Conguillío', km:8, duration:'5 h', difficulty:'baja',
    pin:{x:62,y:32},
    desc:'Conecta la Laguna Captrén con el sector del Lago Conguillío atravesando un denso bosque. En el camino se puede visitar la Araucaria Madre.',
    highlights:['Conecta dos sectores del parque','Bosque denso de coigües y araucarias','Buen avistamiento de aves'] },
  { id:'truful-truful', name:'Sendero Truful-Truful', zone:'Acceso sur (Melipeuco)', km:0.8, duration:'1.5 h', difficulty:'baja',
    pin:{x:25,y:55},
    desc:'"De salto en salto" en mapudungún. Un cañón volcánico corto que termina en un salto de agua de 20 metros sobre roca negra, con capas geológicas visibles en sus paredes.',
    highlights:['Salto de agua de 20 m','Cañón con estratos volcánicos visibles','Cerca del acceso sur, ideal de entrada o salida'] },
  { id:'laguna-arcoiris', name:'Sendero Laguna Arcoíris', zone:'Norte del parque', km:0.8, duration:'1.5 h', difficulty:'baja',
    pin:{x:38,y:13},
    desc:'Recorrido corto hasta una pequeña laguna de tonos cambiantes según la luz, rodeada de bosque nativo.',
    highlights:['Laguna de colores cambiantes','Recorrido corto y accesible','Buena parada fotográfica'] },
  { id:'laguna-captren', name:'Sendero Laguna Captrén', zone:'Acceso norte', km:1, duration:'1.5 h', difficulty:'baja',
    pin:{x:78,y:28},
    desc:'Bordea el "bosque sumergido", árboles nativos bajo el agua producto de una antigua erupción. Sendero plano, ideal para observación de aves y vistas al volcán Llaima.',
    highlights:['Bosque sumergido bajo el agua','Reflejo del volcán Llaima en días calmos','Sendero plano y bien mantenido'] },
  { id:'pastos-blancos', name:'Sendero Pastos Blancos', zone:'Sector Llaima', km:13, duration:'10 h', difficulty:'alta',
    pin:{x:46,y:74},
    desc:'Una de las rutas más extensas y exigentes del parque, con vistas amplias sobre el volcán Llaima y sus campos de lava. Recomendada para quienes ya tienen experiencia en trekking.',
    highlights:['Una de las rutas más largas del parque','Vistas extensas del volcán Llaima','Jornada completa, buena condición física necesaria'] },
  { id:'contrabandistas', name:'Sendero Los Contrabandistas', zone:'Sector Llaima', km:4, duration:'2 h caminando', difficulty:'media',
    pin:{x:72,y:36},
    desc:'Su nombre viene de los antiguos caminos usados para el contrabando hacia Argentina. Atraviesa un hermoso bosque de araucarias y es apto para recorrer en bicicleta.',
    highlights:['Antigua ruta de contrabando histórica','Apto para bicicleta','Bosque de araucarias en buen estado'] },
  { id:'volcan-llaima', name:'Ascensión Volcán Llaima', zone:'Sector Los Paraguas', km:14, duration:'8-10 h', difficulty:'alta',
    pin:{x:52,y:81},
    desc:'Ascenso técnico a la cumbre del volcán activo más importante del parque. Requiere guía, equipo de montaña y buenas condiciones climáticas.',
    highlights:['Cumbre de volcán activo','Requiere guía y equipo técnico','Vistas de 360° sobre la Araucanía Andina'] },
  { id:'malalcahuello', name:'Travesía a Malalcahuello', zone:'Conecta con Reserva Malalcahuello', km:20, duration:'2 días', difficulty:'alta',
    pin:{x:88,y:30},
    desc:'Travesía de varios días que conecta Conguillío con la Reserva Nacional Malalcahuello, atravesando distintos pisos vegetacionales y paisajes volcánicos.',
    highlights:['Travesía de dos días con campamento','Conecta dos áreas protegidas','Paisajes volcánicos variados'] },

  // ---- new connector routes ----
  { id:'arcoiris-verde', name:'Ruta Laguna Arcoíris – Laguna Verde', zone:'Sector norte', km:3, duration:'1.5 h', difficulty:'baja',
    pin:{x:36,y:14},
    desc:'Corto enlace entre dos lagunas del extremo norte del parque, a través de bosque nativo bajo.',
    highlights:['Enlaza dos lagunas cercanas','Recorrido corto y tranquilo'] },
  { id:'verde-conguillio', name:'Ruta Laguna Verde – Laguna Conguillío', zone:'Norte → centro', km:9, duration:'4 h', difficulty:'media',
    pin:{x:40,y:23},
    desc:'Desciende desde la Laguna Verde hacia el sector central del parque, terminando en las orillas del Lago Conguillío.',
    highlights:['Cambio de paisaje de laguna a lago','Buen tramo intermedio de conexión'] },
  { id:'conguillio-paraguas', name:'Ruta Laguna Conguillío – Laguna Los Paraguas', zone:'Centro → este', km:10, duration:'4.5 h', difficulty:'media',
    pin:{x:59,y:33},
    desc:'Atraviesa el bosque hacia el este del parque, conectando el lago principal con la Laguna Los Paraguas.',
    highlights:['Tramo boscoso hacia el sector este','Buena opción de día completo'] },
  { id:'paraguas-captren', name:'Ruta Laguna Los Paraguas – Laguna Captrén', zone:'Sector este', km:6, duration:'2.5 h', difficulty:'baja',
    pin:{x:75,y:31},
    desc:'Conecta dos de las lagunas del sector oriental del parque, cerca del acceso norte.',
    highlights:['Recorrido corto entre lagunas','Cercano al acceso norte'] },
  { id:'blanca-lonquimay', name:'Ruta Laguna Blanca – Volcán Lonquimay', zone:'Sector este', km:11, duration:'6 h', difficulty:'alta',
    pin:{x:83,y:45},
    desc:'Ruta de ascenso hacia la base del volcán Lonquimay, partiendo desde la Laguna Blanca.',
    highlights:['Vistas del volcán Lonquimay','Exigente, buena condición física necesaria'] },
  { id:'conguillio-sollipulli', name:'Ruta Laguna Conguillío – Volcán Sollipulli', zone:'Centro → norte', km:13, duration:'7 h', difficulty:'alta',
    pin:{x:47,y:23},
    desc:'Larga jornada hacia el sector del volcán Sollipulli, con vistas panorámicas de todo el valle central del parque.',
    highlights:['Uno de los accesos más largos al norte','Panorámicas del valle central'] },
  { id:'conguillio-sierra-nevada2', name:'Ruta Laguna Conguillío – Volcán Sierra Nevada', zone:'Centro → este', km:10, duration:'5 h', difficulty:'media',
    pin:{x:60,y:26},
    desc:'Alternativa de acceso al sector de Sierra Nevada partiendo directamente desde la orilla del lago.',
    highlights:['Acceso alternativo a Sierra Nevada','Sale directo desde el lago'] },
  { id:'conguillio-llaima', name:'Ruta Laguna Conguillío – Volcán Llaima', zone:'Centro → sur', km:12, duration:'6 h', difficulty:'alta',
    pin:{x:49,y:60},
    desc:'Conecta el lago principal con la base del volcán Llaima, cruzando antiguos campos de lava.',
    highlights:['Cruce de campos de lava','Acceso directo al volcán Llaima'] },
  { id:'escondida-cascada', name:'Ruta Laguna Escondida – Cascada Escondida', zone:'Centro-sur', km:4, duration:'2 h', difficulty:'baja',
    pin:{x:52,y:54},
    desc:'Corta caminata entre la Laguna Escondida y su cascada homónima, en un tramo bien sombreado.',
    highlights:['Cascada Escondida como destino final','Recorrido corto y sombreado'] },
  { id:'truful-laguna', name:'Ruta Cascada Truful – Laguna Truful', zone:'Sector oeste', km:3, duration:'1.5 h', difficulty:'baja',
    pin:{x:22,y:58},
    desc:'Breve tramo que conecta la Cascada Truful con la Laguna Truful, en el sector occidental del parque.',
    highlights:['Cascada y laguna en un mismo recorrido','Sector menos concurrido'] },
  { id:'truful-salto-indio', name:'Ruta Laguna Truful – Salto del Indio', zone:'Sector oeste', km:5, duration:'2.5 h', difficulty:'media',
    pin:{x:30,y:60},
    desc:'Continúa desde la Laguna Truful hacia el Salto del Indio, atravesando bosque nativo denso.',
    highlights:['Termina en el Salto del Indio','Bosque nativo denso'] },
  { id:'quinquen-conguillio', name:'Ruta Río Quinquén – Laguna Conguillío', zone:'Oeste → centro', km:8, duration:'3.5 h', difficulty:'media',
    pin:{x:35,y:37},
    desc:'Sigue el curso del Río Quinquén hacia el este hasta llegar a las orillas del lago principal.',
    highlights:['Recorrido junto al Río Quinquén','Buen acceso oeste-centro'] },
  { id:'rioconguillio-paraguas', name:'Ruta Río Conguillío – Laguna Los Paraguas', zone:'Centro → este', km:7, duration:'3 h', difficulty:'media',
    pin:{x:62,y:40},
    desc:'Bordea el Río Conguillío en dirección este hasta la Laguna Los Paraguas.',
    highlights:['Recorrido junto al río','Tramo de dificultad moderada'] },
  { id:'elverde-llaima', name:'Ruta Laguna El Verde – Volcán Llaima', zone:'Sur del parque', km:6, duration:'3 h', difficulty:'media',
    pin:{x:57,y:78},
    desc:'Conecta la Laguna El Verde con la ladera sur del volcán Llaima.',
    highlights:['Vistas cercanas del Llaima','Sector sur, menos transitado'] },
  { id:'circuito-conguillio-escondida-elverde', name:'Circuito Laguna Conguillío – Laguna Escondida – Laguna El Verde', zone:'Circuito centro-sur', km:16, duration:'8 h', difficulty:'alta',
    pin:{x:55,y:62},
    desc:'Circuito de jornada completa que enlaza tres cuerpos de agua del sector centro-sur del parque.',
    highlights:['Circuito de tres lagunas','Jornada completa, exigente'] },
  { id:'circuito-conguillio-verde-arcoiris', name:'Circuito Laguna Conguillío – Laguna Verde – Laguna Arcoíris', zone:'Circuito norte', km:14, duration:'7 h', difficulty:'media',
    pin:{x:39,y:20},
    desc:'Circuito que recorre el sector norte del parque, pasando por tres lagunas antes de retornar al punto de partida.',
    highlights:['Circuito de tres lagunas del norte','Buena opción de día completo'] },
  { id:'circuito-sierra-nevada-paraguas', name:'Circuito Volcán Sierra Nevada – Laguna Los Paraguas', zone:'Circuito este', km:9, duration:'4.5 h', difficulty:'media',
    pin:{x:72,y:23},
    desc:'Circuito por el sector este del parque, combinando vistas del volcán Sierra Nevada con la Laguna Los Paraguas.',
    highlights:['Vistas de Sierra Nevada','Circuito de dificultad moderada'] },
  { id:'circuito-lonquimay-blanca', name:'Circuito Volcán Lonquimay – Laguna Blanca', zone:'Circuito este', km:12, duration:'6 h', difficulty:'alta',
    pin:{x:85,y:52},
    desc:'Circuito exigente por el extremo este del parque, con el volcán Lonquimay como principal atractivo.',
    highlights:['Volcán Lonquimay como protagonista','Exigente, jornada larga'] },
  { id:'circuito-rioblanco-escondida', name:'Circuito Río Blanco – Laguna Escondida', zone:'Circuito centro', km:7, duration:'3 h', difficulty:'baja',
    pin:{x:44,y:57},
    desc:'Circuito corto y accesible por el sector central, siguiendo el Río Blanco hasta la Laguna Escondida.',
    highlights:['Circuito corto y accesible','Sigue el curso del Río Blanco'] },
  { id:'circuito-riopedregoso-blanca', name:'Circuito Río Pedregoso – Laguna Blanca', zone:'Circuito este', km:8, duration:'3.5 h', difficulty:'media',
    pin:{x:81,y:69},
    desc:'Circuito del sector este que combina el cauce del Río Pedregoso con la Laguna Blanca.',
    highlights:['Recorrido junto al Río Pedregoso','Termina en la Laguna Blanca'] }
];

const TOTAL_KM = TRAILS.reduce((s,t)=>s+t.km,0);
const TOTAL_TRAILS = TRAILS.length;
const PROGRESS_KEY = 'conguillio-progress-v1';
const PHOTOS_KEY = 'conguillio-photos-v1';

let progress = {};
let photos = [];

const pinLayer = document.getElementById('pinLayer');
const overlay = document.getElementById('overlay');
const cardEl = document.getElementById('card');
const toastEl = document.getElementById('toast');
const photoOverlay = document.getElementById('photoOverlay');
const photoCard = document.getElementById('photoCard');

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(()=>toastEl.classList.remove('show'), 2200);
}

/* NOTE: this uses the browser's own localStorage, which works on any
   normal website (including GitHub Pages). Progress/photos are saved
   per-browser, per-device — they don't sync between your phone and
   your computer, and clearing browser data will erase them. */

async function loadProgress(){
  try{
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    progress = raw ? JSON.parse(raw) : {};
  }catch(e){ progress = {}; }
  renderAll();
}
async function saveProgress(){
  try{
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }catch(e){ showToast('No se pudo guardar. Intenta de nuevo.'); }
}

async function loadPhotos(){
  try{
    const raw = window.localStorage.getItem(PHOTOS_KEY);
    photos = raw ? JSON.parse(raw) : [];
  }catch(e){ photos = []; }
  updateEnvelopeCount();
}
async function savePhotos(){
  try{
    const str = JSON.stringify(photos);
    if(str.length > 4.6*1024*1024){
      showToast('Se llenó el espacio de almacenamiento. Borra alguna foto antigua.');
      return false;
    }
    window.localStorage.setItem(PHOTOS_KEY, str);
    return true;
  }catch(e){ showToast('No se pudo guardar la foto (puede que el navegador se haya quedado sin espacio).'); return false; }
}

function difficultyClass(d){
  if(d==='baja') return 'diff-baja';
  if(d==='media') return 'diff-media';
  return 'diff-alta';
}

function renderMap(){
  pinLayer.style.position = 'absolute';
  pinLayer.style.inset = '0';
  pinLayer.innerHTML = '';
  TRAILS.forEach(t=>{
    const done = progress[t.id] && progress[t.id].completed;
    const btn = document.createElement('button');
    btn.className = 'map-pin-btn';
    btn.style.left = t.pin.x + '%';
    btn.style.top = t.pin.y + '%';
    btn.setAttribute('aria-label', t.name + (done ? ' (completado)' : ''));
    btn.innerHTML = `<span class="pin-head d-${t.difficulty}">${done ? '<span class="pin-check">✓</span>' : ''}</span><span class="pin-label">${t.name.replace('Sendero ','').replace('Ascensión ','').replace('Travesía a ','').replace('Ruta ','').replace('Circuito ','')}</span>`;
    btn.addEventListener('click', ()=>openCard(t.id));
    pinLayer.appendChild(btn);
  });
}

function computeStats(){
  const doneTrails = TRAILS.filter(t=>progress[t.id] && progress[t.id].completed);
  const doneKm = doneTrails.reduce((s,t)=>s+t.km,0);
  return { doneCount: doneTrails.length, doneKm, doneTrails };
}

const BADGES = [
  { id:'first', slot:'slot-first', test:(s)=>s.doneCount>=1 },
  { id:'10km', slot:'slot-10km', test:(s)=>s.doneKm>=10 },
  { id:'25km', slot:'slot-25km', test:(s)=>s.doneKm>=25 },
  { id:'half', slot:'slot-half', test:(s)=>s.doneKm>=TOTAL_KM/2 },
  { id:'volcanes', slot:'slot-volcanes', test:(s)=>['sierra-nevada','volcan-llaima'].every(id=>progress[id]&&progress[id].completed) },
  { id:'all', slot:'slot-all', test:(s)=>s.doneCount>=TOTAL_TRAILS }
];

function renderStats(){
  const s = computeStats();
  document.getElementById('statTrails').textContent = `${s.doneCount} / ${TOTAL_TRAILS}`;
  document.getElementById('statKm').textContent = `${s.doneKm.toFixed(1)} / ${TOTAL_KM.toFixed(1)}`;
  document.getElementById('tapeMaxLabel').textContent = `${TOTAL_KM.toFixed(1)} km`;

  const pctKm = Math.min(100, (s.doneKm/TOTAL_KM)*100);
  document.getElementById('tapeFill').style.width = pctKm + '%';
  document.getElementById('tapeMarker').style.left = pctKm + '%';

  BADGES.forEach(b=>{
    const el = document.getElementById(b.slot);
    if(!el) return;
    const unlocked = b.test(s);
    el.classList.toggle('unlocked', !!unlocked);
  });

  const listEl = document.getElementById('completedList');
  if(s.doneTrails.length===0){
    listEl.innerHTML = '<div class="empty-note">Sin registros aún. Toca un pin en el mapa.</div>';
  }else{
    listEl.innerHTML = s.doneTrails.map(t=>{
      const p = progress[t.id];
      const stars = '★'.repeat(p.rating||0) + '☆'.repeat(5-(p.rating||0));
      return `<div class="completed-item"><span>${t.name.replace('Sendero ','').replace('Ruta ','').replace('Circuito ','')} <span style="color:var(--gold);">${stars}</span></span><span class="stamp-mini">HECHO</span></div>`;
    }).join('');
  }
}

function renderAll(){ renderMap(); renderStats(); }

function openCard(id){
  const t = TRAILS.find(tt=>tt.id===id);
  const p = progress[id] || {completed:false};
  cardEl.innerHTML = cardTemplate(t, p);
  overlay.classList.add('open');
  wireCard(t);
}
function closeCard(){ overlay.classList.remove('open'); }
overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeCard(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ closeCard(); closePhotoModal(); } });

function cardTemplate(t, p){
  const diffClass = difficultyClass(t.difficulty);
  const statusHtml = p.completed
    ? `<div class="status-line"><span class="status-dot done"></span> <span class="stamp-done">COMPLETADO</span>${p.date ? ' — ' + formatDate(p.date) : ''}</div>`
    : `<div class="status-line"><span class="status-dot pending"></span> Todavía no explorado</div>`;
  let reviewBlock = '';
  if(p.completed){
    reviewBlock = `
      <div class="review-display" id="reviewDisplay">
        ${p.review ? '"'+escapeHtml(p.review)+'"' : '(sin notas escritas)'}
        <div class="review-meta">${'★'.repeat(p.rating||0)}${'☆'.repeat(5-(p.rating||0))} · registrado el ${formatDate(p.date)}</div>
      </div>
      <div class="btn-row">
        <button class="btn secondary" id="editBtn">Editar registro</button>
        <button class="btn danger" id="unmarkBtn">Quitar de completados</button>
      </div>`;
  }else{
    reviewBlock = `<div class="btn-row"><button class="btn" id="markBtn">Marcar como completado</button></div>`;
  }
  return `
    <button class="card-close" id="closeBtn" aria-label="Cerrar">✕</button>
    <div class="zone-tag">${t.zone}</div>
    <h2>${t.name}</h2>
    <div class="meta-row">
      <span class="meta-chip">DIST ${t.km} km</span>
      <span class="meta-chip">TIEMPO ${t.duration}</span>
      <span class="meta-chip ${diffClass}">DIFICULTAD ${t.difficulty.toUpperCase()}</span>
    </div>
    <p class="desc">${t.desc}</p>
    <ul class="highlights">${t.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>
    <hr class="divider">
    ${statusHtml}
    <div id="formArea"></div>
    ${reviewBlock}
  `;
}

function formTemplate(existing){
  const e = existing || {};
  const today = new Date().toISOString().slice(0,10);
  return `
    <div class="form-block" id="entryForm">
      <label for="dateInput">Fecha en que lo recorriste</label>
      <input type="date" id="dateInput" value="${e.date || today}" max="${today}">
      <label>Tu calificación</label>
      <div class="star-picker" id="starPicker">
        ${[1,2,3,4,5].map(n=>`<button type="button" data-val="${n}" class="${e.rating>=n?'active':''}">★</button>`).join('')}
      </div>
      <label for="reviewInput">Notas / reseña (opcional)</label>
      <textarea id="reviewInput" placeholder="¿Cómo estuvo el sendero? ¿Qué viste?">${e.review || ''}</textarea>
      <div class="btn-row">
        <button class="btn" id="saveEntryBtn">Guardar registro</button>
        <button class="btn secondary" id="cancelEntryBtn">Cancelar</button>
      </div>
    </div>`;
}

function wireCard(t){
  document.getElementById('closeBtn').addEventListener('click', closeCard);
  const markBtn = document.getElementById('markBtn');
  const editBtn = document.getElementById('editBtn');
  const unmarkBtn = document.getElementById('unmarkBtn');
  const formArea = document.getElementById('formArea');

  function showForm(){
    const existing = progress[t.id];
    formArea.innerHTML = formTemplate(existing);
    let selectedRating = existing && existing.rating ? existing.rating : 0;
    const stars = formArea.querySelectorAll('#starPicker button');
    stars.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        selectedRating = parseInt(btn.dataset.val, 10);
        stars.forEach(b=> b.classList.toggle('active', parseInt(b.dataset.val,10) <= selectedRating));
      });
    });
    document.getElementById('cancelEntryBtn').addEventListener('click', ()=>{ formArea.innerHTML=''; });
    document.getElementById('saveEntryBtn').addEventListener('click', async ()=>{
      const date = document.getElementById('dateInput').value;
      const review = document.getElementById('reviewInput').value.trim();
      progress[t.id] = { completed:true, date: date || new Date().toISOString().slice(0,10), rating: selectedRating, review };
      await saveProgress();
      renderAll();
      openCard(t.id);
      showToast('¡Sendero registrado! 🥾');
    });
  }
  if(markBtn) markBtn.addEventListener('click', showForm);
  if(editBtn) editBtn.addEventListener('click', showForm);
  if(unmarkBtn) unmarkBtn.addEventListener('click', async ()=>{
    delete progress[t.id];
    await saveProgress();
    renderAll();
    openCard(t.id);
    showToast('Sendero movido de vuelta a "por explorar".');
  });
}

function formatDate(iso){
  if(!iso) return '';
  const [y,m,d] = iso.split('-');
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d,10)} ${meses[parseInt(m,10)-1]} ${y}`;
}
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.getElementById('resetBtn').addEventListener('click', async ()=>{
  if(!confirm('¿Seguro que quieres borrar todo tu progreso registrado? Esta acción no se puede deshacer.')) return;
  progress = {};
  await saveProgress();
  renderAll();
  showToast('Progreso reiniciado.');
});

/* ================= PHOTO ENVELOPE ================= */

function updateEnvelopeCount(){
  const el = document.getElementById('envelopeCount');
  if(photos.length>0){ el.textContent = photos.length; el.classList.remove('hide'); }
  else{ el.classList.add('hide'); }
}

function resizeImage(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = (e)=>{
      const img = new Image();
      img.onload = ()=>{
        const maxW = 900;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatShortDate(iso){
  if(!iso) return '';
  const [y,m,d] = iso.split('-');
  return `${d}/${m}/${y.slice(2)}`;
}

function photoCardTemplate(){
  const grid = photos.length===0
    ? '<div class="photo-empty">Aún no subiste fotos de tus caminatas. Súbelas y aparecerán aquí como postales.</div>'
    : `<div class="photo-grid" id="photoGrid">${photos.map((p,i)=>`
        <div class="polaroid" data-idx="${i}" style="transform:rotate(${(i%2===0?-1:1)*(2+ (i%3))}deg);">
          <div class="photo-wrap">
            <img src="${p.dataUrl}" alt="Foto de trekking">
          </div>
          <span class="timestamp">${formatShortDate(p.addedAt)}</span>
          <button class="del" data-idx="${i}" aria-label="Eliminar foto">✕</button>
        </div>`).join('')}</div>`;
  return `
    <button class="card-close" id="photoCloseBtn" aria-label="Cerrar">✕</button>
    <h2>Fotos del sendero</h2>
    <label class="upload-btn">＋ Subir foto(s)
      <input type="file" id="photoInput" accept="image/*" multiple>
    </label>
    ${grid}
    <div id="lightboxArea"></div>
  `;
}

function openPhotoModal(){
  photoCard.innerHTML = photoCardTemplate();
  photoOverlay.classList.add('open');
  wirePhotoCard();
}
function closePhotoModal(){ photoOverlay.classList.remove('open'); }
photoOverlay.addEventListener('click', (e)=>{ if(e.target===photoOverlay) closePhotoModal(); });

function wirePhotoCard(){
  document.getElementById('photoCloseBtn').addEventListener('click', closePhotoModal);
  const input = document.getElementById('photoInput');
  input.addEventListener('change', async (e)=>{
    const files = Array.from(e.target.files || []);
    if(files.length===0) return;
    showToast('Subiendo foto' + (files.length>1?'s':'') + '...');
    for(const file of files){
      try{
        const dataUrl = await resizeImage(file);
        photos.push({ id: Date.now() + '-' + Math.random().toString(36).slice(2), dataUrl, addedAt: new Date().toISOString().slice(0,10) });
      }catch(err){ /* skip failed file */ }
    }
    const ok = await savePhotos();
    updateEnvelopeCount();
    photoCard.innerHTML = photoCardTemplate();
    wirePhotoCard();
    if(ok) showToast('¡Foto guardada! 📸');
  });

  document.querySelectorAll('.polaroid .del').forEach(btn=>{
    btn.addEventListener('click', async (ev)=>{
      ev.stopPropagation();
      const idx = parseInt(btn.dataset.idx, 10);
      if(!confirm('¿Eliminar esta foto?')) return;
      photos.splice(idx,1);
      await savePhotos();
      updateEnvelopeCount();
      photoCard.innerHTML = photoCardTemplate();
      wirePhotoCard();
    });
  });

  document.querySelectorAll('.polaroid').forEach(card=>{
    card.addEventListener('click', ()=>{
      const idx = parseInt(card.dataset.idx, 10);
      const p = photos[idx];
      if(!p) return;
      document.getElementById('lightboxArea').innerHTML = `<div class="lightbox-view"><img src="${p.dataUrl}" alt="Foto ampliada"></div>`;
    });
  });
}

document.getElementById('envelopeBtn').addEventListener('click', openPhotoModal);

loadProgress();
loadPhotos();
