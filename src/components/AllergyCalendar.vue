<template>
  <section id="calendar" class="calendar-section">
    <div class="container">
      <div class="section-header fade-up">
        <div class="section-label">Sezonas</div>
        <h2 class="section-title">Žiedadulkių kalendorius</h2>
        <p class="section-desc">
          Pilnas Lietuvos alergenų kalendorius. Pasirink mėnesį arba žiūrėk visų augalų sezonus iš karto.
        </p>
      </div>

      <!-- View toggle -->
      <div class="view-toggle fade-up">
        <button :class="{ active: view === 'month' }" @click="view = 'month'">
          <span>📅</span> Pagal mėnesį
        </button>
        <button :class="{ active: view === 'timeline' }" @click="view = 'timeline'">
          <span>📊</span> Visi augalai
        </button>
      </div>

      <!-- MONTH VIEW -->
      <Transition name="fade-view" mode="out-in">
        <div v-if="view === 'month'" key="month">
          <!-- Month tabs -->
          <div class="month-tabs">
            <button
              v-for="m in activeMonths"
              :key="m.index"
              class="month-tab"
              :class="{ active: selectedMonth === m.index, current: m.index === currentMonth }"
              @click="selectedMonth = m.index"
            >
              <span class="month-name">{{ m.name }}</span>
              <span class="month-count">{{ getPlantsForMonth(m.index).length }}</span>
            </button>
          </div>

          <!-- Plants for selected month -->
          <Transition name="slide-month" mode="out-in">
            <div :key="selectedMonth" class="month-content">
              <div class="month-summary">
                <h3 class="month-title">{{ activeMonths.find(m => m.index === selectedMonth)?.name }}</h3>
                <span class="month-total-badge">
                  {{ getPlantsForMonth(selectedMonth).length }} augal{{ getPlantsForMonth(selectedMonth).length === 1 ? 'as' : 'ai' }}
                </span>
                <span v-if="selectedMonth === currentMonth" class="now-badge">⚡ Dabar</span>
              </div>

              <div v-for="cat in categories" :key="cat.id" class="category-block">
                <template v-if="getPlantsByCategory(selectedMonth, cat.id).length > 0">
                  <div class="category-header">
                    <span class="cat-icon">{{ cat.icon }}</span>
                    <span class="cat-name">{{ cat.name }}</span>
                    <span class="cat-count">{{ getPlantsByCategory(selectedMonth, cat.id).length }}</span>
                  </div>
                  <div class="plants-chips">
                    <span
                      v-for="plant in getPlantsByCategory(selectedMonth, cat.id)"
                      :key="plant.name"
                      class="plant-chip"
                      :class="'chip-' + cat.id"
                      :title="plant.name"
                    >
                      {{ plant.name }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </Transition>
        </div>

        <!-- TIMELINE VIEW -->
        <div v-else key="timeline" class="timeline-view">
          <!-- Category filter -->
          <div class="cat-filter">
            <button
              v-for="cat in [{ id: 'all', name: 'Visi', icon: '🌿' }, ...categories]"
              :key="cat.id"
              class="cat-filter-btn"
              :class="{ active: filterCat === cat.id }"
              @click="filterCat = cat.id"
            >
              {{ cat.icon }} {{ cat.name }}
            </button>
          </div>

          <div class="timeline-table">
            <!-- Header -->
            <div class="tl-header">
              <div class="tl-plant-col">Augalas</div>
              <div class="tl-months-row">
                <div v-for="m in activeMonths" :key="m.index" class="tl-month-head" :class="{ current: m.index === currentMonth }">
                  {{ m.short }}
                </div>
              </div>
            </div>
            <!-- Rows -->
            <div
              v-for="(plant, pi) in filteredPlants"
              :key="plant.name"
              class="tl-row"
              :class="{ 'tl-row-alt': pi % 2 === 1 }"
            >
              <div class="tl-plant-col">
                <span class="tl-cat-dot" :class="'dot-' + plant.category"></span>
                <span class="tl-plant-name">{{ plant.name }}</span>
              </div>
              <div class="tl-months-row">
                <div
                  v-for="m in activeMonths"
                  :key="m.index"
                  class="tl-cell"
                  :class="{
                    'tl-cell-active': plant.months.includes(m.index),
                    'tl-cell-current': m.index === currentMonth && plant.months.includes(m.index),
                    ['tl-cell-' + plant.category]: plant.months.includes(m.index)
                  }"
                  :title="plant.months.includes(m.index) ? plant.name + ' aktyvus ' + m.name : ''"
                >
                  <span v-if="plant.months.includes(m.index)" class="tl-dot"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="legend">
            <span class="legend-title">Kategorija:</span>
            <div v-for="cat in categories" :key="cat.id" class="legend-item">
              <span class="legend-dot" :class="'dot-' + cat.id"></span>
              {{ cat.name }}
            </div>
            <div class="legend-item"><span class="legend-dot dot-current-month"></span>Einamas mėnuo</div>
          </div>
        </div>
      </Transition>
      <div class="calendar-disclaimer fade-up">
        <p>Augalų žydėjimo kalendoriuje pateikiama bendrinė žydėjimo informacija, paremta Lietuvos pulmonoligų draugijos, Šiaulių universiteto sudarytais kalendoriais.</p>
        <p>Augalų žydėjimo laikas gali kisti, atsižvelgiant į oro temperatūrą, drėgmę. Informacija parengta pagal Gamtos tyrimų centro ir VU Botanikos sodo specialistų rekomendacijas. Augalų aprašymai parengti pagal Visuotinės lietuvių enciklopedijos, VU Botanikos sodo, Gamtos tyrimų centro, JAV maisto ir vaistų administracijos, theplantslist.org, Ž.Lazdauskaitės „Pavasarį žydintys augalai" pateiktą informaciją.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentMonth = new Date().getMonth()
const view = ref('month')
const filterCat = ref('all')

// Only months with data (0-indexed)
const activeMonths = [
  { index: 1, name: 'Vasaris',   short: 'Vas' },
  { index: 2, name: 'Kovas',     short: 'Kov' },
  { index: 3, name: 'Balandis',  short: 'Bal' },
  { index: 4, name: 'Gegužė',    short: 'Geg' },
  { index: 5, name: 'Birželis',  short: 'Bir' },
  { index: 6, name: 'Liepa',     short: 'Lie' },
  { index: 7, name: 'Rugpjūtis', short: 'Rug' },
  { index: 8, name: 'Rugsėjis',  short: 'Rgs' },
]

// Default to current month if in season, else April
const defaultMonth = activeMonths.find(m => m.index === currentMonth)?.index ?? 3
const selectedMonth = ref(defaultMonth)

const categories = [
  { id: 'tree',  name: 'Medžiai ir krūmai', icon: '🌳' },
  { id: 'grass', name: 'Žolės ir javai',    icon: '🌾' },
  { id: 'weed',  name: 'Žolynai ir piktžolės', icon: '🌿' },
]

// Master plant list: name, category, months[]
const plants = [
  // Trees & Shrubs
  { name: 'Alksnis',           category: 'tree',  months: [1, 2, 3, 4] },
  { name: 'Lazdynas',          category: 'tree',  months: [1, 2, 3] },
  { name: 'Blindė',            category: 'tree',  months: [2, 3] },
  { name: 'Gluosnis',          category: 'tree',  months: [2, 3] },
  { name: 'Guoba',             category: 'tree',  months: [2, 3] },
  { name: 'Kadagys',           category: 'tree',  months: [2, 3] },
  { name: 'Ąžuolas',           category: 'tree',  months: [3, 4, 5] },
  { name: 'Beržas',            category: 'tree',  months: [3, 4] },
  { name: 'Bukas',             category: 'tree',  months: [3, 4] },
  { name: 'Drebulė',           category: 'tree',  months: [3, 4] },
  { name: 'Ieva',              category: 'tree',  months: [3, 4] },
  { name: 'Klevas',            category: 'tree',  months: [3, 4, 5] },
  { name: 'Tuopa',             category: 'tree',  months: [3, 4, 5] },
  { name: 'Uosis',             category: 'tree',  months: [3, 4] },
  { name: 'Baltažiedė robinija', category: 'tree', months: [4, 5] },
  { name: 'Eglė',              category: 'tree',  months: [4] },
  { name: 'Kaštonas',          category: 'tree',  months: [4] },
  { name: 'Platanas',          category: 'tree',  months: [4] },
  { name: 'Pušis',             category: 'tree',  months: [4, 5, 6] },
  { name: 'Šermukšnis',        category: 'tree',  months: [4, 5] },
  { name: 'Jazminas',          category: 'tree',  months: [5] },
  { name: 'Liepa',             category: 'tree',  months: [5, 6, 7] },
  { name: 'Šeivamedis',        category: 'tree',  months: [5, 6] },

  // Grasses & Cereals
  { name: 'Miglė',             category: 'grass', months: [3, 4, 5, 6, 7, 8] },
  { name: 'Dirsė',             category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Eraičinas',         category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Gelsvoji visgė',    category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Gyslotis',          category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Motiejukas',        category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Pašiaušėlis',       category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Poavižė',           category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Rugys',             category: 'grass', months: [4, 5] },
  { name: 'Šunažolė',          category: 'grass', months: [4, 5, 6] },
  { name: 'Žilė',              category: 'grass', months: [4, 5, 6, 7, 8] },
  { name: 'Avižuolė',          category: 'grass', months: [5, 6] },
  { name: 'Aviža',             category: 'grass', months: [5, 6] },
  { name: 'Kietavarpė',        category: 'grass', months: [5, 6, 7, 8] },
  { name: 'Kvietys',           category: 'grass', months: [5] },
  { name: 'Miežis',            category: 'grass', months: [5, 6, 7] },
  { name: 'Smilga',            category: 'grass', months: [5, 6, 7] },
  { name: 'Svidrė',            category: 'grass', months: [5, 6, 7] },
  { name: 'Varputis',          category: 'grass', months: [5, 6, 7] },
  { name: 'Vilnūnė',           category: 'grass', months: [5, 6, 7] },

  // Weeds & Herbs
  { name: 'Garšva',            category: 'weed',  months: [2, 3] },
  { name: 'Šalpusnis',         category: 'weed',  months: [2, 3] },
  { name: 'Balanda',           category: 'weed',  months: [4, 5, 6, 7, 8] },
  { name: 'Dilgėlė',           category: 'weed',  months: [4, 5, 6, 7, 8] },
  { name: 'Kiaulpienė',        category: 'weed',  months: [4] },
  { name: 'Kanapė',            category: 'weed',  months: [6, 7] },
  { name: 'Kietis',            category: 'weed',  months: [6, 7] },
  { name: 'Kukurūzas',         category: 'weed',  months: [6, 7] },
  { name: 'Pelynas',           category: 'weed',  months: [6, 7] },
  { name: 'Rykštenė',          category: 'weed',  months: [7, 8] },
]

const getPlantsForMonth = (mi) => plants.filter(p => p.months.includes(mi))

const getPlantsByCategory = (mi, catId) =>
  plants.filter(p => p.months.includes(mi) && p.category === catId)

const filteredPlants = computed(() =>
  filterCat.value === 'all' ? plants : plants.filter(p => p.category === filterCat.value)
)
</script>

<style scoped>
.calendar-section {
  padding: 100px 0;
  background: var(--color-bg);
}

.section-header { text-align: center; margin-bottom: 36px; }
.section-title {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.section-desc { font-size: 17px; color: var(--color-text-light); max-width: 560px; margin: 0 auto; }

/* View toggle */
.view-toggle {
  display: flex;
  gap: 6px;
  background: var(--color-green-100);
  border-radius: 100px;
  padding: 4px;
  width: fit-content;
  margin: 0 auto 36px;
}
.view-toggle button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border-radius: 100px;
  border: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-mid);
  cursor: pointer;
  transition: all var(--transition);
}
.view-toggle button.active {
  background: var(--color-white);
  color: var(--color-green-600);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

/* ── MONTH VIEW ─────────────────────────────────────────── */

.month-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 28px;
  scrollbar-width: none;
}
.month-tabs::-webkit-scrollbar { display: none; }

.month-tab {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--transition);
  font-family: var(--font-sans);
}
.month-tab:hover { border-color: var(--color-green-400); }
.month-tab.active {
  background: var(--color-green-500);
  border-color: var(--color-green-500);
  box-shadow: 0 4px 16px rgba(58,170,58,0.25);
}
.month-tab.current:not(.active) { border-color: var(--color-yellow-400); }
.month-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-mid);
  transition: color var(--transition);
}
.month-tab.active .month-name { color: #fff; }
.month-count {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  background: var(--color-green-50);
  border-radius: 100px;
  padding: 1px 7px;
  transition: all var(--transition);
}
.month-tab.active .month-count {
  background: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
}

.month-content {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
.month-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.month-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text-dark);
}
.month-total-badge {
  font-size: 14px;
  font-weight: 600;
  background: var(--color-green-100);
  color: var(--color-green-600);
  padding: 4px 12px;
  border-radius: 100px;
}
.now-badge {
  font-size: 14px;
  font-weight: 700;
  background: var(--color-yellow-100);
  color: #b45309;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--color-yellow-200);
}

.category-block { margin-bottom: 24px; }
.category-block:last-child { margin-bottom: 0; }
.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.cat-icon { font-size: 16px; }
.cat-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-mid);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.cat-count {
  font-size: 11px;
  font-weight: 700;
  background: var(--color-border);
  color: var(--color-text-light);
  padding: 1px 8px;
  border-radius: 100px;
}

.plants-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.plant-chip {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  transition: transform var(--transition), box-shadow var(--transition);
  cursor: default;
}
.plant-chip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}
.chip-tree {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
.chip-grass {
  background: #fef9c3;
  color: #854d0e;
  border: 1px solid #fef08a;
}
.chip-weed {
  background: #ffedd5;
  color: #9a3412;
  border: 1px solid #fed7aa;
}

/* ── TIMELINE VIEW ──────────────────────────────────────── */

.timeline-view {}

.cat-filter {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.cat-filter-btn {
  padding: 8px 16px;
  border-radius: 100px;
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-mid);
  cursor: pointer;
  transition: all var(--transition);
}
.cat-filter-btn:hover { border-color: var(--color-green-400); }
.cat-filter-btn.active {
  background: var(--color-green-500);
  border-color: var(--color-green-500);
  color: #fff;
}

.timeline-table {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  overflow-x: auto;
}

.tl-header,
.tl-row {
  display: flex;
  align-items: center;
  min-width: 560px;
}
.tl-header {
  background: var(--color-green-50);
  border-bottom: 1.5px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 2;
}
.tl-plant-col {
  width: 200px;
  flex-shrink: 0;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-right: 1px solid var(--color-border);
}
.tl-months-row {
  display: flex;
  flex: 1;
}
.tl-month-head {
  flex: 1;
  text-align: center;
  padding: 10px 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-light);
  letter-spacing: 0.04em;
  position: relative;
}
.tl-month-head.current {
  color: var(--color-green-600);
  font-weight: 800;
}
.tl-month-head.current::after {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 4px; height: 4px;
  background: var(--color-yellow-400);
  border-radius: 50%;
}

.tl-row {
  border-bottom: 1px solid var(--color-green-50);
  transition: background var(--transition);
}
.tl-row:last-child { border-bottom: none; }
.tl-row:hover { background: var(--color-green-50); }
.tl-row-alt { background: #fafcfa; }
.tl-row-alt:hover { background: var(--color-green-50); }

.tl-plant-col .tl-cat-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-tree    { background: #22c55e; }
.dot-grass   { background: #eab308; }
.dot-weed    { background: #f97316; }
.dot-current-month { background: var(--color-yellow-400); border: 2px solid #d97706; width: 12px; height: 12px; }

.tl-plant-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tl-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 4px;
  position: relative;
}
.tl-cell-active.tl-cell-tree  { background: rgba(34, 197, 94, 0.12); }
.tl-cell-active.tl-cell-grass { background: rgba(234, 179, 8, 0.12); }
.tl-cell-active.tl-cell-weed  { background: rgba(249, 115, 22, 0.12); }
.tl-cell-current {
  outline: 2px solid var(--color-yellow-400);
  outline-offset: -2px;
  border-radius: 4px;
}
.tl-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  display: block;
  flex-shrink: 0;
}
.tl-cell-tree  .tl-dot { background: #22c55e; }
.tl-cell-grass .tl-dot { background: #eab308; }
.tl-cell-weed  .tl-dot { background: #f97316; }

/* Legend */
.legend {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 20px;
}
.legend-title { font-size: 14px; font-weight: 600; color: var(--color-text-light); }
.legend-item { display: flex; align-items: center; gap: 7px; font-size: 14px; color: var(--color-text-mid); }
.legend-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Disclaimer */
.calendar-disclaimer {
  margin-top: 36px;
  padding: 20px 24px;
  background: var(--color-green-50);
  border-left: 3px solid var(--color-green-400);
  border-radius: var(--radius-md);
}
.calendar-disclaimer p {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: 8px;
}
.calendar-disclaimer p:last-child { margin-bottom: 0; }

/* Transitions */
.fade-view-enter-active, .fade-view-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-view-enter-from { opacity: 0; transform: translateY(8px); }
.fade-view-leave-to  { opacity: 0; transform: translateY(-8px); }

.slide-month-enter-active, .slide-month-leave-active { transition: opacity 0.2s, transform 0.2s; }
.slide-month-enter-from { opacity: 0; transform: translateX(20px); }
.slide-month-leave-to  { opacity: 0; transform: translateX(-20px); }

@media (max-width: 768px) {
  .calendar-section { padding: 70px 0; }
  .tl-plant-col { width: 130px; }
  .tl-plant-name { font-size: 11px; }
  .month-content { padding: 20px 16px; }
}
</style>
