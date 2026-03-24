<template>
  <section id="quiz" class="quiz-section">
    <div class="quiz-bg-blob quiz-blob-1" aria-hidden="true"></div>
    <div class="quiz-bg-blob quiz-blob-2" aria-hidden="true"></div>

    <div class="container">
      <div class="section-header fade-up">
        <div class="section-label">Testas</div>
        <h2 class="section-title">Alergijų Detektyvas</h2>
        <p class="section-desc">10 klausimų, kurie padės suprasti, ar tavo simptomai gali būti susiję su alergija.</p>
      </div>

      <div class="quiz-wrapper fade-up">
        <!-- Intro screen -->
        <Transition name="fade-slide">
          <div v-if="phase === 'intro'" class="quiz-card intro-card" key="intro">
            <div class="intro-illustration">
              <div class="intro-circles">
                <span>🔍</span>
                <span class="float-1">🌼</span>
                <span class="float-2">🤧</span>
                <span class="float-3">🌿</span>
              </div>
            </div>
            <h3>Ar tu alergijų detektyvas?</h3>
            <p>Atsakyk į 10 trumpų klausimų ir sužinok, kokia tikimybė, kad tavo simptomai – alerginiai. <strong>Tai nėra medicininė diagnozė</strong> – tik linksmas savianalizės įrankis.</p>
            <div class="intro-meta">
              <span>📋 10 klausimų</span>
              <span>⏱️ ~2 minutės</span>
              <span>🎯 3 rezultatai</span>
            </div>
            <button class="btn btn-primary btn-lg" @click="startQuiz">
              Pradėti tyrimą
            </button>
          </div>
        </Transition>

        <!-- Quiz screen -->
        <Transition name="fade-slide">
          <div v-if="phase === 'quiz'" class="quiz-card" key="quiz">
            <!-- Progress -->
            <div class="quiz-progress">
              <div class="progress-meta">
                <span class="progress-label">Klausimas {{ currentQ + 1 }} iš {{ questions.length }}</span>
                <span class="progress-score">{{ score }} tšk.</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
              </div>
              <div class="progress-steps">
                <div
                  v-for="(_, i) in questions"
                  :key="i"
                  class="progress-step"
                  :class="{
                    done: i < currentQ,
                    current: i === currentQ,
                  }"
                ></div>
              </div>
            </div>

            <!-- Question -->
            <Transition :name="transitionName" mode="out-in">
              <div :key="currentQ" class="question-area">
                <div class="question-number">{{ currentQ + 1 }}.</div>
                <h3 class="question-text">{{ questions[currentQ].q }}</h3>
                <div class="answers-list">
                  <button
                    v-for="(ans, ai) in questions[currentQ].answers"
                    :key="ai"
                    class="answer-btn"
                    :class="{
                      selected: selectedAnswer === ai,
                      confirmed: answered && selectedAnswer === ai,
                    }"
                    @click="selectAnswer(ai)"
                    :disabled="answered"
                  >
                    <span class="answer-letter">{{ ['A','B','C'][ai] }}</span>
                    <span class="answer-text">{{ ans.text }}</span>
                    <span v-if="answered && selectedAnswer === ai" class="answer-check">✓</span>
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Next button -->
            <div class="quiz-footer">
              <button
                class="btn btn-primary"
                :disabled="!answered"
                @click="nextQuestion"
              >
                {{ currentQ < questions.length - 1 ? 'Kitas klausimas →' : 'Žiūrėti rezultatą 🎯' }}
              </button>
            </div>
          </div>
        </Transition>

        <!-- Result screen -->
        <Transition name="fade-slide">
          <div v-if="phase === 'result'" class="quiz-card result-card" key="result">
            <div class="result-confetti" aria-hidden="true">
              <span v-for="c in confetti" :key="c.id" class="confetti-dot" :style="c.style">{{ c.e }}</span>
            </div>
            <div class="result-icon">{{ result.icon }}</div>
            <div class="result-badge" :class="result.badgeClass">{{ result.range }}</div>
            <h3 class="result-title">{{ result.title }}</h3>
            <p class="result-desc">{{ result.desc }}</p>
            <div class="result-score-display">
              <span class="result-score-num">{{ score }}</span>
              <span class="result-score-max">/ 20 taškų</span>
            </div>
            <div class="result-bar-track">
              <div class="result-bar-fill" :style="{ width: (score / 20 * 100) + '%', background: result.color }"></div>
            </div>
            <div class="result-actions">
              <a href="#calendar" class="btn btn-primary">{{ result.cta }}</a>
              <button class="btn btn-outline" @click="restart">
                🔄 Pakartoti testą
              </button>
            </div>
            <div class="result-disclaimer">
              * Šis testas yra informacinis. Tikslią diagnozę gali nustatyti tik gydytojas alergologas.
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const phase = ref('intro') // 'intro' | 'quiz' | 'result'
const currentQ = ref(0)
const score = ref(0)
const selectedAnswer = ref(null)
const answered = ref(false)
const transitionName = ref('slide-left')

const questions = [
  {
    q: 'Kas nutinka, kai prasideda pavasaris?',
    answers: [
      { text: 'Nieko – gyvenimas kaip gyvenimas 🌿', pts: 0 },
      { text: 'Prasideda čiaudulys, ašaros, nosies niežulys 🤧', pts: 1 },
      { text: 'Mano nosis pradeda sezoninį streiką 😄', pts: 2 },
    ]
  },
  {
    q: 'Ar dažnai čiaudi be aiškios priežasties?',
    answers: [
      { text: 'Retai arba niekada', pts: 0 },
      { text: 'Kartais, ypač lauke, kai žiedadulkės „puola"', pts: 1 },
      { text: 'Taip, mano čiaudulys turi savo ritmą', pts: 2 },
    ]
  },
  {
    q: 'Kaip tavo kūnas reaguoja į dulkes ar gyvūnų kailį?',
    answers: [
      { text: 'Niekaip – galiu apkabinti katę ir gyventi toliau 😌', pts: 0 },
      { text: 'Prasideda niežulys, čiaudulys ar nosies „drama" 🤧', pts: 1 },
      { text: 'Užtenka vieno pūkelio ir mano organizmas jau spaudžia panikos mygtuką 😄', pts: 2 },
    ]
  },
  {
    q: 'Ar tavo akys linkusios ašaroti ar parausti be aiškios priežasties?',
    answers: [
      { text: 'Ne – akys ramios kaip ežeras 😌', pts: 0 },
      { text: 'Taip, kartais parausta ar pradeda ašaroti 👀', pts: 1 },
      { text: 'Taip, kartais atrodo, kad dalyvauju emocingoje dramoje be jokios priežasties 😄', pts: 2 },
    ]
  },
  {
    q: 'Ar tavo šeimoje yra alergiškų žmonių?',
    answers: [
      { text: 'Ne', pts: 0 },
      { text: 'Taip', pts: 1 },
      { text: 'Mes galėtume įkurti alergikų klubą', pts: 2 },
    ]
  },
  {
    q: 'Kaip jautiesi būdamas gamtoje žydėjimo metu?',
    answers: [
      { text: 'Puikiai 🌼', pts: 0 },
      { text: 'Kartais atsiranda nemalonių simptomų', pts: 1 },
      { text: 'Gamta graži… bet pavojinga 😅', pts: 2 },
    ]
  },
  {
    q: 'Ar tau būna užgulusi ar varvanti nosis be peršalimo?',
    answers: [
      { text: 'Ne', pts: 0 },
      { text: 'Taip, kartais', pts: 1 },
      { text: 'Mano nosis turi savo gyvenimą', pts: 2 },
    ]
  },
  {
    q: 'Ar esi kada nors vartojęs vaistus nuo alergijos?',
    answers: [
      { text: 'Ne', pts: 0 },
      { text: 'Taip, kartais', pts: 1 },
      { text: 'Taip, jie mano sezono draugai', pts: 2 },
    ]
  },
  {
    q: 'Ar pastebi, kad simptomai kartojasi tuo pačiu metų laiku?',
    answers: [
      { text: 'Ne', pts: 0 },
      { text: 'Taip', pts: 1 },
      { text: 'Taip, galiu kalendorių derinti pagal savo nosį', pts: 2 },
    ]
  },
  {
    q: 'Kaip apibūdintum savo santykį su žiedadulkėmis?',
    answers: [
      { text: 'Neutralus', pts: 0 },
      { text: 'Sudėtingas', pts: 1 },
      { text: 'Tai tikra drama', pts: 2 },
    ]
  },
]

const results = [
  {
    range: '0–5 taškų',
    title: 'Pavasario draugas 🌿',
    icon: '🌿',
    desc: 'Puiku! Tavo simptomai nekelia didelio susirūpinimo. Žiedadulkių sezonas – tau tiesiog gražus metų laikas. Tačiau stebėk save – alergija gali atsirasti bet kada.',
    cta: 'Žiūrėti kalendorių →',
    color: '#22c55e',
    badgeClass: 'badge-green',
  },
  {
    range: '6–12 taškų',
    title: 'Atsargus stebėtojas 👀',
    icon: '👀',
    desc: 'Hmm, kai kurie simptomai kelia klausimų. Gali būti, kad tam tikrų augalų žiedadulkės tave erzina. Verta stebėti save žiedadulkių sezono metu ir pasitarti su gydytoju.',
    cta: 'Sužinok daugiau →',
    color: '#f59e0b',
    badgeClass: 'badge-yellow',
  },
  {
    range: '13–20 taškų',
    title: 'Alergijų ekspertas (nenoromis) 🤧',
    icon: '🤧',
    desc: 'Tavo atsakymai rodo ryškius alergijos požymius. Tikėtina, kad žiedadulkės turi įtakos tavo gyvenimo kokybei. Rekomenduojame konsultuotis su alergologu – pagalba yra!',
    cta: 'Kreipkis į specialistą →',
    color: '#ef4444',
    badgeClass: 'badge-red',
  },
]

const result = computed(() => {
  if (score.value <= 5) return results[0]
  if (score.value <= 12) return results[1]
  return results[2]
})

const progressPct = computed(() => ((currentQ.value) / questions.length) * 100)

const confetti = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  e: ['🌼','✿','🌸','💛','🌿','❀'][i % 6],
  style: {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    fontSize: (14 + Math.random() * 16) + 'px',
    animationDelay: (Math.random() * 2) + 's',
    opacity: 0.2 + Math.random() * 0.3,
  }
}))

const startQuiz = () => {
  phase.value = 'quiz'
  currentQ.value = 0
  score.value = 0
  selectedAnswer.value = null
  answered.value = false
}

const selectAnswer = (ai) => {
  if (answered.value) return
  selectedAnswer.value = ai
  score.value += questions[currentQ.value].answers[ai].pts
  answered.value = true
}

const nextQuestion = () => {
  if (currentQ.value < questions.length - 1) {
    transitionName.value = 'slide-left'
    currentQ.value++
    selectedAnswer.value = null
    answered.value = false
  } else {
    phase.value = 'result'
  }
}

const restart = () => {
  phase.value = 'intro'
  currentQ.value = 0
  score.value = 0
  selectedAnswer.value = null
  answered.value = false
}
</script>

<style scoped>
.quiz-section {
  position: relative;
  padding: 100px 0;
  background: var(--color-yellow-50);
  overflow: hidden;
}
.quiz-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.quiz-blob-1 {
  width: 500px; height: 500px;
  background: rgba(82, 196, 82, 0.1);
  top: -100px; right: -100px;
}
.quiz-blob-2 {
  width: 400px; height: 400px;
  background: rgba(251, 191, 36, 0.15);
  bottom: 0; left: -100px;
}
.section-header { text-align: center; margin-bottom: 48px; }
.section-title {
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}
.section-desc { font-size: 17px; color: var(--color-text-light); max-width: 500px; margin: 0 auto; }

.quiz-wrapper {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}

.quiz-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: 40px;
  box-shadow: var(--shadow-lg);
  border: 1.5px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

/* Intro */
.intro-card { text-align: center; }
.intro-illustration {
  margin: 0 auto 28px;
  width: 120px; height: 120px;
}
.intro-circles {
  position: relative;
  width: 120px; height: 120px;
  background: var(--color-green-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}
.intro-circles span { position: absolute; }
.float-1 { top: 0; right: 0; font-size: 24px; animation: float-sm 3s ease-in-out infinite; }
.float-2 { bottom: 0; left: 0; font-size: 22px; animation: float-sm 3.5s ease-in-out infinite reverse; }
.float-3 { bottom: 0; right: 10px; font-size: 20px; animation: float-sm 4s ease-in-out infinite; }
@keyframes float-sm {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.intro-card h3 {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 12px;
}
.intro-card p {
  font-size: 15px;
  color: var(--color-text-mid);
  line-height: 1.7;
  margin-bottom: 24px;
}
.intro-meta {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.intro-meta span {
  font-size: 14px;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-lg { padding: 16px 36px; font-size: 16px; }

/* Progress */
.quiz-progress { margin-bottom: 32px; }
.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.progress-label { font-size: 14px; font-weight: 600; color: var(--color-text-mid); }
.progress-score { font-size: 14px; font-weight: 700; color: var(--color-green-500); }
.progress-track {
  height: 6px;
  background: var(--color-green-100);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-green-400), var(--color-green-500));
  border-radius: 3px;
  transition: width 0.4s ease;
}
.progress-steps {
  display: flex;
  gap: 4px;
}
.progress-step {
  flex: 1;
  height: 3px;
  background: var(--color-green-100);
  border-radius: 2px;
  transition: background 0.3s;
}
.progress-step.done { background: var(--color-green-400); }
.progress-step.current { background: var(--color-yellow-400); }

/* Question */
.question-area { padding-bottom: 8px; }
.question-number {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-green-400);
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.question-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 24px;
  line-height: 1.4;
}
.answers-list { display: flex; flex-direction: column; gap: 10px; }
.answer-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition);
  font-family: var(--font-sans);
}
.answer-btn:hover:not(:disabled) {
  border-color: var(--color-green-400);
  background: var(--color-green-50);
  transform: translateX(4px);
}
.answer-btn:disabled { cursor: default; }
.answer-btn.selected {
  border-color: var(--color-green-500);
  background: var(--color-green-50);
}
.answer-btn.confirmed {
  border-color: var(--color-green-500);
  background: linear-gradient(135deg, var(--color-green-50), var(--color-green-100));
}
.answer-letter {
  width: 28px; height: 28px;
  background: var(--color-green-100);
  color: var(--color-green-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all var(--transition);
}
.answer-btn.confirmed .answer-letter {
  background: var(--color-green-500);
  color: #fff;
}
.answer-text {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-dark);
  line-height: 1.4;
}
.answer-check {
  color: var(--color-green-500);
  font-size: 16px;
  font-weight: 700;
  margin-left: auto;
}

/* Quiz footer */
.quiz-footer {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
}
.quiz-footer .btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* Result */
.result-card { text-align: center; }
.result-confetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.confetti-dot {
  position: absolute;
  animation: float-sm 4s ease-in-out infinite;
}
.result-icon { font-size: 72px; margin-bottom: 16px; line-height: 1; }
.result-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
}
.badge-green { background: #dcfce7; color: #16a34a; }
.badge-yellow { background: #fef3c7; color: #d97706; }
.badge-red { background: #fee2e2; color: #dc2626; }
.result-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}
.result-desc {
  font-size: 15px;
  color: var(--color-text-mid);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto 24px;
}
.result-score-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
}
.result-score-num { font-size: 48px; font-weight: 800; color: var(--color-text-dark); }
.result-score-max { font-size: 18px; color: var(--color-text-muted); }
.result-bar-track {
  height: 8px;
  background: var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 28px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.result-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.result-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.result-disclaimer {
  font-size: 11px;
  color: var(--color-text-muted);
  font-style: italic;
}

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(16px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-16px); }

.slide-left-enter-active, .slide-left-leave-active {
  transition: opacity 0.28s, transform 0.28s;
}
.slide-left-enter-from { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-40px); }

@media (max-width: 600px) {
  .quiz-section { padding: 70px 0; }
  .quiz-card { padding: 24px 20px; }
  .question-text { font-size: 17px; }
  .result-title { font-size: 22px; }
  .result-score-num { font-size: 36px; }
  .result-actions { flex-direction: column; align-items: stretch; }
  .result-actions .btn { text-align: center; justify-content: center; }
}
</style>
