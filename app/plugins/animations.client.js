export default defineNuxtPlugin((nuxtApp) => {
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

  const observeFadeUps = () => {
    document.querySelectorAll('.fade-up').forEach((el, i) => {
      const delay = el.style.getPropertyValue('--delay') || `${i * 0.06}s`
      el.style.transitionDelay = delay
      observer.observe(el)
    })
  }

  nuxtApp.hook('page:finish', observeFadeUps)
  observeFadeUps()
})
