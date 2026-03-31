<template>
  <header class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="container navbar-inner">
      <div class="navbar-logos">
        <a href="https://www.lrytas.lt/" target="_blank" rel="noopener" class="lrytas-logo-link">
          <img
            :src="(isScrolled || menuOpen) ? '/lrytas_logo_1_pagrindinis_RGB.png' : '/LR logo baltas tusciaviduris.png'"
            alt="Lrytas"
            class="lrytas-logo"
          />
        </a>
        <a href="#hero" class="navbar-logo">
          <span class="logo-icon">🌿</span>
          <span class="logo-text">Alergijų <strong>Kalendorius</strong></span>
        </a>
      </div>

      <!-- Desktop nav -->
      <nav class="navbar-links">
        <a href="#types">Rūšys ir simptomai</a>
        <a href="#calendar">Kalendorius</a>
        <a href="#quiz">Testas</a>
        <a href="#info">Apie alergijas</a>
        <a href="#quiz" class="btn btn-primary btn-sm">Pasitikrink →</a>
      </nav>

      <button class="hamburger" @click="toggleMenu" :class="{ active: menuOpen }" aria-label="Meniu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- Mobile menu overlay – teleported to body to avoid stacking context issues -->
  <Teleport to="body">
    <nav class="mobile-overlay" :class="{ open: menuOpen }">
      <a href="#types" @click="closeMenu">Rūšys ir simptomai</a>
      <a href="#calendar" @click="closeMenu">Kalendorius</a>
      <a href="#quiz" @click="closeMenu">Testas</a>
      <a href="#info" @click="closeMenu">Apie alergijas</a>
      <a href="#quiz" class="btn btn-primary" @click="closeMenu">Pasitikrink →</a>
    </nav>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)
const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}
const onScroll = () => { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 16px 0;
  transition: background 0.3s, box-shadow 0.3s, padding 0.3s;
}
.navbar.scrolled,
.navbar.menu-open {
  background: rgba(250, 253, 246, 0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 2px 20px rgba(42,80,42,0.08);
  padding: 10px 0;
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-logos {
  display: flex;
  align-items: center;
  gap: 16px;
}
.lrytas-logo-link {
  display: flex;
  align-items: center;
}
.lrytas-logo {
  height: 36px;
  width: auto;
  transition: opacity 0.3s;
}
.lrytas-logo:hover { opacity: 0.8; }
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  color: var(--color-text-dark);
}
.logo-icon { font-size: 22px; }
.logo-text { color: var(--color-text-dark); }
.logo-text strong { color: var(--color-green-500); }

/* Desktop nav */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.navbar-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-mid);
  transition: color var(--transition);
}
.navbar-links a:hover { color: var(--color-green-500); }

/* Nescrolled + menu uždarytas – balti tekstai */
.navbar:not(.scrolled):not(.menu-open) .logo-text { color: #fff; }
.navbar:not(.scrolled):not(.menu-open) .logo-text strong { color: #a8e6a8; }
.navbar:not(.scrolled):not(.menu-open) .navbar-links a:not(.btn) { color: rgba(255,255,255,0.85); }
.navbar:not(.scrolled):not(.menu-open) .navbar-links a:not(.btn):hover { color: #fff; }

.btn-sm { padding: 10px 20px; font-size: 14px; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-dark);
  border-radius: 2px;
  transition: all 0.3s;
}
.navbar:not(.scrolled):not(.menu-open) .hamburger span { background: #fff; }
.hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .navbar-links { display: none; }
}
</style>

<!-- Mobile overlay – global styles needed because Teleport renders outside component DOM -->
<style>
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 100vh;
  height: 100dvh;
  background: rgba(250,253,246,0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 98;
  overflow-y: auto;
}
.mobile-overlay.open {
  display: flex;
}
.mobile-overlay a {
  font-size: 20px;
  font-weight: 500;
  color: #111;
  text-decoration: none;
  transition: color 0.2s;
}
.mobile-overlay a:not(.btn):hover { color: #16a34a; }
</style>
