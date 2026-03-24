<template>
  <section id="info" class="info-section">
    <div class="info-bg-pattern" aria-hidden="true"></div>
    <div class="container">
      <div class="section-header fade-up">
        <div class="section-label">Sužinok daugiau</div>
        <h2 class="section-title">Apie sezonines alergijas</h2>
        <p class="section-desc">Viskas, ką reikia žinoti apie žiedadulkių alergijas Lietuvoje</p>
      </div>

      <!-- Tips strip -->
      <div class="tips-strip fade-up">
        <h3 class="tips-title">Kasdieniai patarimai alergiškiems</h3>
        <div class="tips-text-row">
          <span class="tip-icon">💊</span>
          <p class="tips-text">
            <a href="https://www.opexa.lt/" target="_blank" rel="noopener" class="tips-link">20 mg N10 tabletės</a>
            vartojamos šienligės (kuriai būdingi simptomai yra čiaudulys, niežulys, sloga, užgulta nosis, paraudusios ir ašarojančios akys) ir kitų alerginio rinito formų simptomų slopinimui. Jos taip pat gali būti vartojamos niežtinčių odos išbėrimų (pūkšlių arba dilgėlinės) gydymui.
          </p>
        </div>
        <div class="tips-list">
          <div v-for="tip in tips" :key="tip.text" class="tip-item">
            <span class="tip-icon">{{ tip.icon }}</span>
            <span>{{ tip.text }}</span>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card big fade-up">
          <div class="info-card-icon">🌿</div>
          <h3>Kas yra polinozė?</h3>
          <p>Polinozė – tai sezoninė alerginė liga, kurią sukelia augalų žiedadulkės. Lietuvoje ji paplitusi ir gali pasireikšti nuo vasario (lazdynas, alksnis) iki rugsėjo (kietis).</p>
          <p>Simptomai: čiaudulys, nosies niežulys, ašarojančios akys, nosies užgulimas, kartais – astmos priepuoliai.</p>
        </div>
        <div class="info-card fade-up" style="--delay: 0.1s">
          <div class="info-card-icon">🧬</div>
          <h3>Kodėl atsiranda alergija?</h3>
          <p>Alerginė reakcija atsiranda, kai imuninė sistema klaidingai identifikuoja nekenksmingas žiedadulkes kaip grėsmę ir gamina antikūnus.</p>
        </div>
        <div class="info-card fade-up" style="--delay: 0.15s">
          <div class="info-card-icon">🌡️</div>
          <h3>Klimato kaita ir alergija</h3>
          <p>Dėl klimato kaitos žiedadulkių sezonai ilgėja, o jų koncentracija ore – didėja. Tai reiškia ilgesnį ir intensyvesnį alergijų sezoną.</p>
        </div>
        <div class="info-card fade-up" style="--delay: 0.2s">
          <div class="info-card-icon">💊</div>
          <h3>Gydymas ir profilaktika</h3>
          <p>Antihistamininiai vaistai, nosies purškalai, akių lašai. Imunoterapija – efektyviausias ilgalaikis sprendimas. Visada konsultuokitės su gydytoju.</p>
        </div>
        <div class="info-card fade-up" style="--delay: 0.25s">
          <div class="info-card-icon">🏠</div>
          <h3>Buitis ir alergija</h3>
          <p>Aukšto žiedadulkių sezono metu – daugiau laiko namuose, langai uždaryti, oro valytuvas. Pareinant iš lauko – persirengti, nusiplauti plaukus.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tips = [
  { icon: '🌅', text: 'Žiedadulkių pikas – 6–10 val. ryto. Venkite lauko šiuo metu.' },
  { icon: '🌬️', text: 'Vėjuotomis dienomis žiedadulkių ore – 10x daugiau.' },
  { icon: '🌧️', text: 'Po lietaus žiedadulkių koncentracija mažėja – geras laikas pasivaikščioti.' },
  { icon: '😎', text: 'Akiniai nuo saulės apsaugo akis nuo žiedadulkių.' },
  { icon: '🧴', text: 'Nosies purškalas su fiziologiniu tirpalu padeda išvalyti žiedadulkes.' },
  { icon: '📱', text: 'Stebėkite žiedadulkių prognozę – planuokite veiklą iš anksto.' },
]
</script>

<style scoped>
.info-section {
  position: relative;
  padding: 100px 0;
  background: var(--color-green-50);
  overflow: hidden;
}
.info-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 50%, rgba(82, 196, 82, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.06) 0%, transparent 40%);
  pointer-events: none;
}
.section-header { text-align: center; margin-bottom: 56px; }
.section-title {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.section-desc { font-size: 17px; color: var(--color-text-light); }

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.info-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
  animation-delay: var(--delay, 0s);
}
.info-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.info-card.big { grid-column: span 2; }
.info-card.accent {
  background: linear-gradient(135deg, #1a3a1a, #2d5a2d);
  border-color: transparent;
  color: #fff;
}
.info-card-icon { font-size: 32px; margin-bottom: 14px; }
.info-card h3 {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 10px;
}
.info-card.accent h3 { color: #a8e6a8; }
.info-card p {
  font-size: 14px;
  color: var(--color-text-mid);
  line-height: 1.7;
  margin-bottom: 10px;
}
.info-card.accent p { color: rgba(255,255,255,0.75); }
.stat-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.stat-list li {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  gap: 8px;
}
.stat-list li span { font-weight: 700; color: #a8e6a8; }

/* Tips */
.tips-strip {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 32px 36px;
  border: 1.5px solid var(--color-border);
  margin-bottom: 40px;
}
.tips-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 16px;
}
.tips-text-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
}
.tips-text {
  font-size: 15px;
  color: var(--color-text-mid);
  line-height: 1.75;
}
.tips-link {
  font-weight: 700;
  color: var(--color-green-600);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.tips-link:hover { color: var(--color-green-500); }
.tips-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text-mid);
  line-height: 1.5;
}
.tip-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }

@media (max-width: 900px) {
  .info-grid { grid-template-columns: 1fr 1fr; }
  .info-card.big { grid-column: span 2; }
  .tips-list { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .info-section { padding: 70px 0; }
  .info-grid { grid-template-columns: 1fr; }
  .info-card.big { grid-column: span 1; }
  .tips-list { grid-template-columns: 1fr; }
}
</style>
