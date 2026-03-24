<template>
  <div id="app-root">
    <NavBar />
    <main>
      <HeroSection />
      <AllergyTypes />
      <AllergyCalendar />
      <AllergyQuiz />
      <InfoSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AllergyTypes from './components/AllergyTypes.vue'
import AllergyCalendar from './components/AllergyCalendar.vue'
import InfoSection from './components/InfoSection.vue'
import AllergyQuiz from './components/AllergyQuiz.vue'
import FooterSection from './components/FooterSection.vue'

onMounted(() => {
  // Scroll-triggered fade-up animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  )

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    const delay = el.style.getPropertyValue('--delay') || `${i * 0.06}s`
    el.style.transitionDelay = delay
    observer.observe(el)
  })
})
</script>

<style>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }
</style>
