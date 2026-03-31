<template>
  <section id="types" class="allergy-types-section">
    <div class="container">
      <div class="section-header fade-up">
        <h2 class="section-title">Alergijų rūšys ir simptomai</h2>
        <p class="section-desc">Skirtingos alergijos pasireiškia skirtingais simptomais – sužinok, kuriai kategorijai gali priklausyti tavo reakcija.</p>
      </div>

      <!-- Alergijų rūšys -->
      <div class="block-label-row fade-up">
        <span class="section-label">Alergijų rūšys</span>
      </div>
      <div class="types-grid">
        <!-- CARD 1: Įkvepiamos alergijos -->
        <div class="type-card fade-up" style="--delay: 0.05s">
          <div class="card-image-wrap card-image-wrap--breath">
            <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-svg">
              <!-- Side hair (drawn first, behind head) -->
              <ellipse cx="155" cy="102" rx="14" ry="26" fill="#b5742a"/>
              <ellipse cx="245" cy="102" rx="14" ry="26" fill="#b5742a"/>
              <!-- Head -->
              <circle cx="200" cy="118" r="54" fill="#fde8d4" stroke="#c8956b" stroke-width="2.5"/>
              <!-- Hair top -->
              <ellipse cx="200" cy="80" rx="54" ry="26" fill="#b5742a"/>
              <!-- Eyes closed -->
              <path d="M177 110 Q184 105 191 110" stroke="#7c5c42" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M209 110 Q216 105 223 110" stroke="#7c5c42" stroke-width="2.2" stroke-linecap="round"/>
              <!-- Nose -->
              <path d="M197 122 Q200 128 203 122" stroke="#c8956b" stroke-width="1.5" stroke-linecap="round"/>
              <!-- Blush -->
              <ellipse cx="172" cy="132" rx="10" ry="6" fill="#fca5a5" opacity="0.3"/>
              <ellipse cx="228" cy="132" rx="10" ry="6" fill="#fca5a5" opacity="0.3"/>
              <!-- Mask body -->
              <rect x="160" y="122" width="80" height="48" rx="16" fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/>
              <!-- Mask crease line -->
              <path d="M162 138 Q200 144 238 138" stroke="#93c5fd" stroke-width="1.5" fill="none"/>
              <!-- Mask ear straps -->
              <path d="M161 126 Q144 134 146 148" stroke="#93c5fd" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M239 126 Q256 134 254 148" stroke="#93c5fd" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <!-- Neck -->
              <rect x="188" y="170" width="24" height="14" rx="4" fill="#fde8d4" stroke="#c8956b" stroke-width="2"/>
              <!-- Jacket body -->
              <path d="M145 184 Q128 235 122 280 L278 280 Q272 235 255 184 Q200 196 145 184 Z" fill="#b8cce4" stroke="#7a9ab8" stroke-width="2.5"/>
              <!-- Inner shirt -->
              <path d="M174 184 Q200 192 226 184 L221 222 Q200 228 179 222 Z" fill="#f0f4ff"/>
              <!-- Jacket center seam -->
              <line x1="200" y1="192" x2="200" y2="265" stroke="#7a9ab8" stroke-width="1.5"/>
              <!-- Jacket lapels -->
              <path d="M174 184 Q164 200 168 222" stroke="#7a9ab8" stroke-width="1.5" fill="none"/>
              <path d="M226 184 Q236 200 232 222" stroke="#7a9ab8" stroke-width="1.5" fill="none"/>
              <!-- Wavy discomfort lines LEFT -->
              <path d="M130 86 Q136 79 142 86 Q148 93 154 86" stroke="#52a852" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M122 66 Q130 57 138 66 Q146 75 154 66" stroke="#52a852" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <!-- Wavy discomfort lines RIGHT -->
              <path d="M246 86 Q252 79 258 86 Q264 93 270 86" stroke="#52a852" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M246 66 Q254 57 262 66 Q270 75 278 66" stroke="#52a852" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <!-- Floating pollen particles -->
              <circle cx="104" cy="112" r="5.5" fill="#86efac" opacity="0.9"/>
              <circle cx="92"  cy="92"  r="3.5" fill="#4ade80" opacity="0.8"/>
              <circle cx="112" cy="138" r="3"   fill="#86efac" opacity="0.7"/>
              <circle cx="296" cy="112" r="5"   fill="#86efac" opacity="0.9"/>
              <circle cx="308" cy="92"  r="3.5" fill="#4ade80" opacity="0.8"/>
              <circle cx="290" cy="138" r="3"   fill="#86efac" opacity="0.7"/>
            </svg>
          </div>
          <div class="card-body">
            <h3 class="card-title">Įkvepiamos alergijos</h3>
            <p class="card-text">Įkvepiamų alergenų yra galybė. Įkvėpus jų prasideda alerginė reakcija: alerginė sloga, ašarojimas, alerginė astma, ne dėl peršalimo priežasties atsiradęs ar padažnėjęs kosulys, dusulys, padažnėję bronchinės astmos priepuoliai.</p>
          </div>
        </div>

        <!-- CARD 2: Odos alergija -->
        <div class="type-card fade-up" style="--delay: 0.1s">
          <div class="card-image-wrap card-image-wrap--skin">
            <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-svg">
              <!-- Sleeve cuff at left end -->
              <rect x="58" y="112" width="38" height="58" rx="10" fill="#b8cce4" stroke="#7a9ab8" stroke-width="2"/>
              <!-- Forearm – clean horizontal rounded shape -->
              <path d="M88 112 Q88 100 108 98 L305 98 Q326 100 328 118 L328 164 Q326 180 305 182 L108 182 Q88 180 88 168 Z" fill="#fde8d4" stroke="#c8956b" stroke-width="2.5"/>
              <!-- Rash dots – all safely within arm bounds (x: 115–295, y: 108–172) -->
              <circle cx="132" cy="122" r="9"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="160" cy="138" r="7"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="146" cy="158" r="8"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="192" cy="116" r="9"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="184" cy="150" r="7"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="220" cy="128" r="9"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="214" cy="162" r="8"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="252" cy="118" r="8"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="246" cy="152" r="10" fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <circle cx="282" cy="136" r="7"  fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <!-- Scratch marks on rash -->
              <path d="M126 112 Q138 108 150 112" stroke="#ef4444" stroke-width="2" stroke-linecap="round" fill="none"/>
              <path d="M198 108 Q210 104 222 108" stroke="#ef4444" stroke-width="2" stroke-linecap="round" fill="none"/>
              <path d="M244 142 Q256 138 268 142" stroke="#ef4444" stroke-width="2" stroke-linecap="round" fill="none"/>
              <!-- Itch wavy marks above arm -->
              <path d="M150 88 Q155 82 160 88" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M196 84 Q201 78 206 84" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M246 88 Q251 82 256 88" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            </svg>
          </div>
          <div class="card-body">
            <h3 class="card-title">Odos alergija</h3>
            <p class="card-text">Organizmas reaguoja į medžiagas aplinkoje, atsiranda bėrimai, niežulys, išsivysto alerginis kontaktinis dermatitas, alerginė kontaktinė egzema. Dažniausi alergenai: metalai, cheminės medžiagos, dažai, klijai, konservantai parabenai, įvairūs detergentai – indų plovikliai, skalbimo milteliai, naudojami buityje.</p>
          </div>
        </div>

        <!-- CARD 3: Alergija maisto produktams -->
        <div class="type-card fade-up" style="--delay: 0.15s">
          <div class="card-image-wrap card-image-wrap--food">
            <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-svg">
              <!-- FORK (center x=88) -->
              <!-- 4 tines: width=6, gap=4, total=6*4+4*3=36, start x=88-18=70 -->
              <rect x="70" y="70" width="6" height="72" rx="3" fill="#94a3b8"/>
              <rect x="80" y="70" width="6" height="72" rx="3" fill="#94a3b8"/>
              <rect x="90" y="70" width="6" height="72" rx="3" fill="#94a3b8"/>
              <rect x="100" y="70" width="6" height="72" rx="3" fill="#94a3b8"/>
              <!-- Fork collar connecting tines to handle -->
              <rect x="68" y="138" width="40" height="20" rx="5" fill="#94a3b8"/>
              <!-- Fork handle -->
              <rect x="78" y="156" width="20" height="96" rx="10" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>

              <!-- KNIFE (center x=312) -->
              <!-- Knife blade (left edge straight, right edge curves) -->
              <path d="M304 70 L304 158 L322 158 Q336 128 320 70 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
              <!-- Knife handle -->
              <rect x="302" y="158" width="20" height="96" rx="10" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>

              <!-- PLATE -->
              <!-- Plate drop shadow -->
              <ellipse cx="200" cy="220" rx="102" ry="11" fill="#d1d5db" opacity="0.45"/>
              <!-- Plate outer circle -->
              <circle cx="200" cy="178" r="90" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5"/>
              <!-- Plate inner rim -->
              <circle cx="200" cy="178" r="74" fill="white" stroke="#e2e8f0" stroke-width="1.5"/>

              <!-- FOOD (all within r=60 of center 200,178) -->
              <!-- Green salad leaf: cx=182,cy=166 dist≈21, r=24 → max 45 < 60 ✓ -->
              <ellipse cx="182" cy="166" rx="24" ry="17" fill="#bbf7d0" stroke="#4ade80" stroke-width="1.5"/>
              <!-- Tomato: cx=220,cy=162 dist≈23, r=18 → max 41 < 60 ✓ -->
              <circle cx="220" cy="162" r="18" fill="#fca5a5" stroke="#f87171" stroke-width="1.5"/>
              <!-- Bread: cx=200,cy=194 dist=16, rx=26 → max 42 < 60 ✓ -->
              <ellipse cx="200" cy="194" rx="26" ry="14" fill="#fde68a" stroke="#fbbf24" stroke-width="1.5"/>
              <!-- Small food details -->
              <ellipse cx="178" cy="162" rx="8" ry="5" fill="#86efac" opacity="0.8"/>
              <circle cx="216" cy="158" r="5" fill="#f87171" opacity="0.6"/>

              <!-- WARNING SIGN (above plate, y=15–72, plate top y=88) -->
              <circle cx="200" cy="44" r="28" fill="#fef9c3" stroke="#fbbf24" stroke-width="3"/>
              <!-- ! body -->
              <rect x="197" y="24" width="6" height="18" rx="3" fill="#f59e0b"/>
              <!-- ! dot -->
              <circle cx="200" cy="55" r="4" fill="#f59e0b"/>
            </svg>
          </div>
          <div class="card-body">
            <h3 class="card-title">Alergija maisto produktams</h3>
            <p class="card-text">Žmogaus imuninė sistema gamina antikūnius tam tikrai maisto rūšiai, šį maistą atpažįsta kaip pavojingą organizmui. Pasireiškia pykinimu, virškinimo sutrikimais, viduriavimu.</p>
          </div>
        </div>
      </div>

      <!-- Simptomai -->
      <div class="block-label-row fade-up">
        <span class="section-label">Simptomai</span>
      </div>
      <div class="symptoms-grid">
        <div class="symptom-card fade-up" style="--delay: 0.05s">
          <div class="symptom-icon">🏠</div>
          <h4 class="symptom-title">Alergija namų dulkėms</h4>
          <p class="symptom-text">akių ašarojimas, nosies išskyrų padidėjimas, astmos priepuoliai, dilgėlinė, atopinis dermatitas.</p>
        </div>

        <div class="symptom-card fade-up" style="--delay: 0.1s">
          <div class="symptom-icon">🌸</div>
          <h4 class="symptom-title">Žiedadulkių alergija</h4>
          <p class="symptom-text">nosies užgulimas, vandeningos ir gleivingos išskyros iš nosies, čiaudulys, akių perštėjimas, dusulys, sausas kosulys, bėrimai, gali pasireikšti pykinimas, vėmimas, ūmūs pilvo skausmai.</p>
        </div>

        <div class="symptom-card fade-up" style="--delay: 0.15s">
          <div class="symptom-icon">🐝</div>
          <h4 class="symptom-title">Vabzdžių sukelta alergija</h4>
          <p class="symptom-text">patinimas, paraudimas, skausmas ir niežulys. Galimos anafilaksinės reakcijos, kurios dažniausiai išsivysto praėjus penkiolikai minučių po įgėlimo. Gali pasireikšti ir hipotenzija, pykinimas, vėmimas, viduriavimas, gerklų edema, bronchospazmas, kvėpavimo sutrikimai iki šokinės būklės.</p>
        </div>

        <div class="symptom-card fade-up" style="--delay: 0.2s">
          <div class="symptom-icon">🔬</div>
          <h4 class="symptom-title">Alergija dulkių erkutėms</h4>
          <p class="symptom-text">sloga rytais, čiaudulys, ašarojančios akys, kvėpavimo sutrikimai ar egzema.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.allergy-types-section {
  padding: 100px 0;
  background: var(--color-white);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-title {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.section-desc {
  font-size: 17px;
  color: var(--color-text-light);
  max-width: 560px;
  margin: 0 auto;
}

.block-label-row {
  margin-bottom: 20px;
}

/* ── Alergijų rūšys ─────────────────────────────────────── */
.types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 56px;
}

.type-card {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
  animation-delay: var(--delay, 0s);
}
.type-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-image-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-image-wrap--breath { background: #edf7ed; }
.card-image-wrap--skin   { background: #fef3f2; }
.card-image-wrap--food   { background: #fefce8; }
.card-svg {
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}
.type-card:hover .card-svg {
  transform: scale(1.04);
}

.card-body {
  padding: 24px 28px 28px;
}
.card-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 12px;
  line-height: 1.3;
}
.card-text {
  font-size: 14px;
  color: var(--color-text-mid);
  line-height: 1.75;
}

/* ── Simptomai ──────────────────────────────────────────── */
.symptoms-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.symptom-card {
  background: var(--color-green-50);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
  animation-delay: var(--delay, 0s);
}
.symptom-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.symptom-icon {
  font-size: 28px;
  margin-bottom: 14px;
}
.symptom-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 10px;
  line-height: 1.35;
}
.symptom-text {
  font-size: 13px;
  color: var(--color-text-mid);
  line-height: 1.7;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 1024px) {
  .symptoms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .types-grid {
    grid-template-columns: 1fr 1fr;
  }
  .type-card:last-child {
    grid-column: span 2;
  }
}
@media (max-width: 600px) {
  .allergy-types-section { padding: 70px 0; }
  .types-grid { grid-template-columns: 1fr; }
  .type-card:last-child { grid-column: span 1; }
  .symptoms-grid { grid-template-columns: 1fr; }
}
</style>
