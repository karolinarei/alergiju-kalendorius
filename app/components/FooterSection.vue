<template>
  <footer class="footer">
    <div class="footer-wave">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 40 C480 80 960 0 1440 40 L1440 0 L0 0 Z" fill="var(--color-bg)"/>
      </svg>
    </div>
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">🌿 Alergijų<strong>Kalendorius</strong></span>
        <p>Informacinis projektas apie sezonines alergijas Lietuvoje. Naudokite kaip orientacinę priemonę.</p>
        <div class="footer-disclaimer">
          ⚠️ Šis puslapis nėra medicininė konsultacija. Visada kreipkitės į gydytoją.
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Navigacija</h4>
          <a href="#hero">Pradžia</a>
          <a href="#types">Rūšys ir simptomai</a>
          <a href="#calendar">Kalendorius</a>
          <a href="#quiz">Testas</a>
          <a href="#info">Apie alergijas</a>
        </div>
        <div class="footer-col footer-col--text">
          <p>Daugiau apie alergijas, jų sukėlėjus ir gydymą skaitykite <a href="https://www.lrytas.lt/" target="_blank" rel="noopener" class="footer-lrytas-link"><strong>lrytas.lt</strong></a></p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>© {{ year }} Lrytas. Alergijų Kalendorius.</span>
        <span class="footer-credit">Sukurta su 🌿 pavasariniu entuziazmu</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: linear-gradient(160deg, #1a3a1a 0%, #2d5a2d 100%);
  color: rgba(255,255,255,0.75);
  position: relative;
}
.footer-wave {
  height: 80px;
  overflow: hidden;
}
.footer-wave svg { width: 100%; height: 100%; }
.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 60px;
  padding: 48px 0;
  align-items: start;
}
.footer-brand { display: flex; flex-direction: column; gap: 14px; }
.footer-logo {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
.footer-logo strong { color: #a8e6a8; }
.footer-brand p { font-size: 14px; line-height: 1.6; }
.footer-disclaimer {
  font-size: 14px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-sm);
  line-height: 1.5;
}
.footer-links { display: flex; gap: 40px; }
.footer-col { display: flex; flex-direction: column; gap: 12px; }
.footer-col h4 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a8e6a8;
}
.footer-col a {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  transition: color var(--transition);
}
.footer-col a:hover { color: #fff; }
.footer-col--text p {
  font-size: 17px;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
}
.footer-lrytas-link {
  color: #fbbf24;
}
.footer-lrytas-link:hover { color: #fef08a; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 20px 0;
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.footer-credit { color: rgba(255,255,255,0.4); }

@media (max-width: 900px) {
  .footer-inner { grid-template-columns: 1fr; gap: 36px; }
  .footer-links { flex-wrap: wrap; gap: 28px; }
}
@media (max-width: 600px) {
  .footer-bottom-inner { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
