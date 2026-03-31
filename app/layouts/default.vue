<template>
  <div id="app-root">
    <NavBar />
    <main>
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

<style>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }
</style>
