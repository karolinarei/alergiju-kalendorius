<template>
  <section id="hero" class="hero">
    <!-- Nuotrauka dešinėje – absoliutus, per visą aukštį -->
    <div class="hero-image-wrap">
      <div class="hero-image"></div>
      <!-- Gradientų sluoksniai: kairė sulieja su hero fonu, apačia sulieja su wave -->
      <div class="hero-image-fade-left"></div>
      <div class="hero-image-fade-top"></div>
      <div class="hero-image-fade-bottom"></div>
    </div>

    <!-- Floating pollen particles -->
    <div class="pollen-field" aria-hidden="true">
      <span v-for="p in pollens" :key="p.id" class="pollen" :style="p.style">{{ p.emoji }}</span>
    </div>

    <div class="container hero-content">
      <!-- Kairė: tekstas -->
      <div class="hero-text fade-up">
<h1 class="hero-title">
          Alergijų<br />
          <em class="hero-highlight">Kalendorius</em>
        </h1>
        <p class="hero-desc">
          Alerginėmis ligomis serga 1 iš 4 europiečių ir jos yra dažniausios lėtinės ligos šiame regione – nuo jų Europoje kenčia per 60 mln. žmonių. Ateityje alergijų turės kone kiekvienas. Kviečiame susipažinti su galimais alergenais, alergijų simptomais ir visa aktualiausia informacija alergiškiems žmonėms.
        </p>
        <div class="hero-actions">
          <a href="#quiz" class="btn btn-primary">Pasitikrink dabar</a>
          <a href="#calendar" class="btn btn-ghost">Žiūrėti kalendorių</a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">~30%</span>
            <span class="stat-label">lietuvių serga alergija</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">6–10 val.</span>
            <span class="stat-label">ryto žiedadulkių pikas</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">II–IX mėn.</span>
            <span class="stat-label">pagrindinis sezonas</span>
          </div>
        </div>
      </div>

      <!-- Dešinė: pollen kortelė ant nuotraukos -->
      <div class="hero-visual fade-up" style="--delay: 0.2s">
        <div class="hero-card">
          <div class="hero-card-header">
            <span class="badge-live"></span>
            <span>Aktyvūs žiedadulkių šaltiniai</span>
          </div>
          <div class="pollen-gauge-list">
            <div v-for="item in activeItems" :key="item.name" class="pollen-row">
              <div class="pollen-info">
                <span class="pollen-name">{{ item.name }}</span>
                <div class="pollen-bar-track">
                  <div class="pollen-bar-fill" :style="{ width: item.level + '%', background: item.color }"></div>
                </div>
              </div>
              <span class="pollen-tag" :style="{ color: item.color, background: item.bg }">{{ item.label }}</span>
            </div>
          </div>
          <div class="hero-card-month">📅 {{ currentMonthName }}</div>
        </div>
      </div>
    </div>

    <div class="hero-wave">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="#fafdf6"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const currentMonth = new Date().getMonth()
const monthNames = ['Sausis','Vasaris','Kovas','Balandis','Gegužė','Birželis','Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis']
const currentMonthName = monthNames[currentMonth]

const pollenData = {
  'Lazdynas': { icon: '🌰', data: [10,60,80,20,0,0,0,0,0,0,0,0], high: '#d97706', highBg:'rgba(254,243,199,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Alksnis':  { icon: '🌲', data: [5,50,85,30,0,0,0,0,0,0,0,0],  high: '#d97706', highBg:'rgba(254,243,199,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Beržas':   { icon: '🍃', data: [0,0,30,90,60,0,0,0,0,0,0,0],  high: '#ef4444', highBg:'rgba(254,226,226,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Varpiniai':{ icon: '🌾', data: [0,0,0,10,60,90,70,20,0,0,0,0],high: '#ef4444', highBg:'rgba(254,226,226,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Gysločiai':{ icon: '🌿', data: [0,0,0,5,40,70,60,30,10,0,0,0],high: '#f59e0b', highBg:'rgba(254,243,199,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Kietis':   { icon: '🌱', data: [0,0,0,0,5,20,60,85,40,5,0,0], high: '#ef4444', highBg:'rgba(254,226,226,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
  'Pušis':    { icon: '🌲', data: [0,0,0,10,70,40,0,0,0,0,0,0],  high: '#d97706', highBg:'rgba(254,243,199,0.9)', low:'#86efac', lowBg:'rgba(240,253,244,0.9)' },
}

const activeItems = computed(() => {
  return Object.entries(pollenData)
    .map(([name, d]) => {
      const level = d.data[currentMonth]
      let label, color, bg
      if (level >= 60)      { label = 'Aukštas';   color = '#ef4444'; bg = 'rgba(254,226,226,0.9)' }
      else if (level >= 20) { label = 'Vidutinis'; color = '#f97316'; bg = 'rgba(255,237,213,0.9)' }
      else                  { label = 'Žemas';     color = '#16a34a'; bg = 'rgba(240,253,244,0.9)' }
      return { name, icon: d.icon, level, label, color, bg }
    })
    .filter(i => i.level > 0)
    .sort((a, b) => b.level - a.level)
    .slice(0, 4)
})

const pollens = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: ['🌼','✿','❀','🌸','💛','🍃'][i % 6],
  style: {
    left: Math.random() * 55 + '%',   // tik kairėje pusėje
    top: Math.random() * 100 + '%',
    fontSize: (12 + Math.random() * 18) + 'px',
    animationDelay: (Math.random() * 6) + 's',
    animationDuration: (8 + Math.random() * 8) + 's',
    opacity: 0.5,
  }
}))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(145deg, #1a3a1a 0%, #2d5a2d 45%, #3d7a3d 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
}

/* ── Nuotrauka ─────────────────────────────────────────── */
.hero-image-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-image: url('/hero-pollen.jpg');
  background-size: cover;
  background-position: center center;
}

/* Kairė – sulieja nuotrauką su žaliu fonu */
.hero-image-fade-left {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    #2d5a2d 0%,
    rgba(45,90,45,0.92) 8%,
    rgba(45,90,45,0.6) 22%,
    rgba(45,90,45,0.25) 42%,
    rgba(45,90,45,0.05) 65%,
    transparent 100%
  );
}

/* Viršus – švelnus tamsėjimas */
.hero-image-fade-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 30%;
  background: linear-gradient(
    to bottom,
    rgba(26,58,26,0.7) 0%,
    transparent 100%
  );
}

/* Apačia – sulieja su wave */
.hero-image-fade-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(
    to top,
    #2a5c2a 0%,
    rgba(42,92,42,0.85) 25%,
    transparent 100%
  );
}

/* ── Pollen particles ───────────────────────────────────── */
.pollen-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.pollen {
  position: absolute;
  animation: float linear infinite;
}
@keyframes float {
  0%   { transform: translateY(0) rotate(0deg); }
  50%  { transform: translateY(-28px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

/* ── Layout ─────────────────────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* ── Tekstas ────────────────────────────────────────────── */
.hero-text .section-label {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.2);
  color: #a8e6a8;
}
.hero-title {
  font-size: clamp(40px, 5vw, 68px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}
.hero-highlight {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: #a8e6a8;
}
.hero-desc {
  font-size: 18px;
  color: rgba(255,255,255,0.82);
  max-width: 460px;
  margin-bottom: 36px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.stat { display: flex; flex-direction: column; }
.stat-num   { font-size: 22px; font-weight: 700; color: #fff; }
.stat-label { font-size: 14px; color: rgba(255,255,255,0.6); }
.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.2); }

/* ── Pollen kortelė ─────────────────────────────────────── */
.hero-visual { animation-delay: var(--delay, 0s); }

.hero-card {
  background: rgba(15, 30, 15, 0.45);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow:
    0 24px 60px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.08);
}
.hero-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255,255,255,0.65);
  margin-bottom: 20px;
}
.badge-live {
  width: 8px; height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse-live 2s infinite;
}
@keyframes pulse-live {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
}
.pollen-gauge-list { display: flex; flex-direction: column; gap: 16px; }
.pollen-row        { display: flex; align-items: center; gap: 12px; }
.pollen-icon       { font-size: 20px; flex-shrink: 0; }
.pollen-info       { flex: 1; min-width: 0; }
.pollen-name {
  font-size: 14px; font-weight: 500;
  color: rgba(255,255,255,0.92);
  display: block; margin-bottom: 5px;
}
.pollen-bar-track {
  height: 6px;
  background: rgba(255,255,255,0.12);
  border-radius: 3px;
  overflow: hidden;
}
.pollen-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
}
.pollen-tag {
  font-size: 11px; font-weight: 700;
  padding: 3px 10px;
  border-radius: 100px;
  flex-shrink: 0;
}
.hero-card-month {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  text-align: center;
}

/* ── Wave ───────────────────────────────────────────────── */
.hero-wave {
  position: absolute;
  bottom: -2px; left: 0; right: 0;
  height: 80px;
  z-index: 3;
}
.hero-wave svg { width: 100%; height: 100%; }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero { padding-top: 100px; }
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-image { width: 100%; opacity: 0.35; background-position: center center; }
  .hero-image-fade-left {
    width: 100%;
    background: linear-gradient(to right, #2d5a2d 20%, rgba(45,90,45,0.5) 60%, rgba(45,90,45,0.3) 100%);
  }
}
@media (max-width: 600px) {
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .hero-stats { gap: 16px; }
  .stat-num { font-size: 18px; }
}
</style>
