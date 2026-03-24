# Alergijų Kalendorius – Komponentų struktūra
> Naudok šį dokumentą kaip Figma komponentų kūrimo gidą

---

## Puslapio struktūra (vienas po kito)

```
NavBar
└── HeroSection
└── AllergyCalendar
└── InfoSection
└── AllergyQuiz
└── FooterSection
```

---

## 1. NavBar

**Tipas:** Fixed, top: 0, z-index: 100
**Plotis:** 100% (max-width container: 1160px)
**Aukštis:** 64px (scroll: 56px)

### Būsenos
| Būsena | Fonas | Shadow |
|--------|-------|--------|
| Default (viršuje) | Skaidrus | Nėra |
| Scrolled | rgba(250,253,246, 0.92) + blur(16px) | shadow-sm |

### Elementai (flex, space-between)
```
[Logo] ←→ [Nav links] [CTA button]
```

**Logo:**
- Ikona: 🌿 (22px)
- Tekstas: „Alergijų**Kalendorius**" – regular + bold
- Spalva: text-dark / green-500 (bold dalis)

**Nav links (gap: 32px):**
- Kalendorius
- Apie alergijas
- Testas
- Mygtukas: „Pasitikrink →" (btn-primary, padding: 10×20)

**Mobile (≤768px):** Hamburger (3 linijos → X), fullscreen overlay meniu

---

## 2. HeroSection

**Aukštis:** min 100vh
**Fonas:** Gradientas – #1a3a1a → #2d5a2d → #3d7a3d
**Layout:** 2 kolonos (1fr 1fr), gap: 80px, align: center

### 2a. Hero tekstas (kairė kolona)
```
[Section label badge]
[H1: Alergijų / *Kalendorius* (italic serif)]
[Aprašymo tekstas, max-width: 460px]
[2 mygtukai: Primary + Outline]
[Stats juosta: 3 skaičiai su divider'iais]
```

**Section label badge:**
- Fonas: rgba(255,255,255, 0.12)
- Border: rgba(255,255,255, 0.2)
- Tekstas: #a8e6a8
- Padding: 6×14, radius: full

**H1:**
- „Alergijų" – 68px, weight 800, balta
- „Kalendorius" – 68px, Lora italic, #a8e6a8
- Letter-spacing: -0.02em

**Mygtukai (gap: 12px):**
- Primary: bg green-500, balta, shadow žalia
- Ghost: bg rgba(255,255,255,0.15), blur, border rgba(255,255,255,0.3)

**Stats (3 vnt., flex, gap: 24px):**
- Skaičius: 22px bold balta
- Etiketė: 14px rgba(255,255,255,0.6)
- Divider: 1px × 36px rgba(255,255,255,0.2)

### 2b. Hero kortelė (dešinė kolona)
```
Kortelė: glassmorphism
├── Header: [● live] "Aktyvūs žiedadulkių šaltiniai"
├── 4 × Pollen row:
│   ├── Ikona (emoji, 20px)
│   ├── [Augalo pavadinimas + progress bar]
│   └── [Level badge: Aukštas / Vidutinis / Žemas]
└── Footer: "📅 [Mėnesio pavadinimas]"
```

**Pollen row progress bar:**
- Track: rgba(255,255,255,0.15), aukštis 6px
- Fill: spalva pagal lygį (raudona/geltona/žalia)

**Level badge spalvos:**
- Aukštas: #fee2e2 / #dc2626
- Vidutinis: #fef3c7 / #d97706
- Žemas: #dcfce7 / #16a34a

**Wave divider apačioje** – balta, SVG path

---

## 3. AllergyCalendar

**Fonas:** color-bg (#fafdf6)
**Padding:** 100px 0

### View Toggle
```
[Kapsulė: 2 mygtukai]
├── 📅 Pagal mėnesį (default aktyvus)
└── 📊 Visi augalai
```
- Fonas: green-100
- Aktyvus: baltas, shadow-sm, green-600

### 3a. Mėnesio rodinys

**Month tabs (8 vnt., scroll horizontal):**
```
[Vasaris 2] [Kovas 8] [Balandis 17] ... [Rugsėjis 12]
```
Kiekvienas tab:
- Mėnesio pavadinimas (14px bold)
- Skaičius kortelė (augalų kiekis)
- Aktyvus: green-500 bg, baltas tekstas
- Einamas mėnuo: geltona border

**Mėnesio turinys (kortelė):**
- Padding: 32px
- Border-radius: xl (32px)
- Shadow: md

```
[Mėnesio pavadinimas H3] [X augalai badge] [⚡ Dabar?]

🌳 MEDŽIAI IR KRŪMAI (X)
[chip] [chip] [chip] ...

🌾 ŽOLĖS IR JAVAI (X)
[chip] [chip] [chip] ...

🌿 ŽOLYNAI IR PIKTŽOLĖS (X)
[chip] [chip] [chip] ...
```

**Plant chip:**
- Padding: 6×14, radius: full
- Tree: bg #dcfce7, tekstas #15803d, border #bbf7d0
- Grass: bg #fef9c3, tekstas #854d0e, border #fef08a
- Weed: bg #ffedd5, tekstas #9a3412, border #fed7aa

### 3b. Visi augalai (timeline)

**Category filter (4 mygtukai):** Visi / Medžiai / Žolės / Piktžolės

**Lentelė:**
```
┌──────────────┬───┬───┬───┬───┬───┬───┬───┬───┐
│ Augalas      │Vas│Kov│Bal│Geg│Bir│Lie│Rug│Rgs│
├──────────────┼───┼───┼───┼───┼───┼───┼───┼───┤
│ ● Alksnis    │ ● │ ● │ ● │ ● │   │   │   │   │
│ ● Beržas     │   │   │ ● │ ● │   │   │   │   │
│ ...          │   │   │   │   │   │   │   │   │
└──────────────┴───┴───┴───┴───┴───┴───┴───┴───┘
```
- Augalo kolona: 200px (kategorijos taškas + vardas)
- Aktyvi ląstelė: spalvotas taškas + spalvotas fonas
- Einamas mėnuo: geltona outline

---

## 4. InfoSection

**Fonas:** green-50 (#f0faf0)
**Padding:** 100px 0
**Layout:** 3 kolonų grid

### Kortelių tipai

**Didelė kortelė (span 2):**
```
[Ikona 32px]
[H3 antraštė]
[2 × paragrafas]
```

**Standartinė kortelė:**
```
[Ikona 32px]
[H3 antraštė]
[Paragrafas]
```

**Akcentinė kortelė (tamsiai žalia):**
- Fonas: linear-gradient(135deg, #1a3a1a, #2d5a2d)
- Tekstas: balta
- Sąrašas su žaliomis reikšmėmis (#a8e6a8)

**Kortelių bendra stilistika:**
- Border-radius: lg (24px)
- Border: 1.5px solid border-default
- Padding: 28px
- Shadow: sm
- Hover: translateY(-3px) + shadow-md

### Tips juosta (apačioje)
```
[H3] "Kasdieniai patarimai alergiškiems 🌸"
[3 kolonų grid – 6 patarimai]
  [emoji] Patarimo tekstas
```

---

## 5. AllergyQuiz

**Fonas:** yellow-50 (#fffbeb)
**Padding:** 100px 0
**Quiz kortelė:** max-width 680px, centered, border-radius xl

### 5a. Intro ekranas
```
[Iliustracija – apskritimas su 🔍 + floating emoji]
[H3 pavadinimas]
[Aprašymas]
[Meta: 📋 10 klausimų · ⏱️ ~2 minutės · 🎯 3 rezultatai]
[Mygtukas: "Pradėti tyrimą 🔍" – primary, lg]
```

### 5b. Klausimo ekranas
```
[Progress section]
├── [Klausimas X iš 10] ←→ [X taškų]
├── [Progress bar – žalia, h:6px]
└── [10 step dots: done/current/todo]

[Klausimas]
├── [Numeris: "1." – green-400]
├── [Klausimo tekstas – 20px bold]
└── [3 × Answer button]

[Kitas mygtukas – right-aligned, disabled kol nepasirinkta]
```

**Answer button:**
- Border: 1.5px solid border-default
- Border-radius: md (16px)
- Padding: 16×18
- Struktūra: [A/B/C ratas] [Tekstas] [✓ icon]
- Hover: border green-400, bg green-50, translateX(4px)
- Pasirinktas: border green-500, bg green gradient

**A/B/C ratas:**
- Default: bg green-100, spalva green-600
- Selected: bg green-500, balta

### 5c. Rezultato ekranas
```
[Confetti emoji fone]
[Ikona 72px]
[Badge: "X–Y taškų" – spalvotas]
[H3 pavadinimas]
[Aprašymas]
[Score: "X / 20 taškų" + progress bar]
[2 mygtukai: CTA + "🔄 Pakartoti testą"]
[Disclaimer – italic, muted]
```

**Badge spalvos pagal rezultatą:**
- 0–5: #dcfce7 / #16a34a (žalia)
- 6–12: #fef3c7 / #d97706 (geltona)
- 13–20: #fee2e2 / #dc2626 (raudona)

---

## 6. FooterSection

**Fonas:** Gradientas – #1a3a1a → #2d5a2d
**Layout:** 2 kolonos (1.5fr 2fr)

**Wave divider viršuje** – išgaubtas, page-bg spalvos

```
[Logo + aprašymas + disclaimer]    [3 × link kolona]
                                   ├── Navigacija
                                   ├── Šaltiniai
                                   └── Lrytas+

─────────────────────────────────────────────────────
© 2025 Lrytas+. Alergijų Kalendorius.    Made with 🌿
```

---

## Mygtukai (Button variants)

| Variantas | Fonas | Tekstas | Shadow |
|-----------|-------|---------|--------|
| Primary | green-500 | Balta | žalia 30% |
| Outline | Skaidrus | green-500 | Nėra |
| Yellow | yellow-400 | #1a1a1a | geltona 30% |
| Ghost | rgba(255,255,255,0.15)+blur | Balta | Nėra |

**Visi mygtukai:** border-radius full, padding 14×28, 15px semibold
**Hover:** translateY(-1px), stipresnis shadow
**Active:** scale(0.97)

---

## Spalvų sistema (greita nuoroda)

```
Pagrindinės:
  🟢 green-500 #3aaa3a   – CTA, aktyvūs elementai
  🟡 yellow-400 #fbbf24  – Akcentai, dabartinis mėnuo
  ⚪ white #ffffff        – Kortelių fonai

Kategorijų spalvos:
  🌳 Medžiai  #22c55e (žalia)
  🌾 Žolės    #eab308 (geltona)
  🌿 Piktžolės #f97316 (oranžinė)

Tekstai:
  ⬛ dark  #1a2e1a  – Antraštės
  ▪️ mid   #3d5c3d  – Body tekstas
  ◾ light #6b8f6b  – Pagalbinis
  ◽ muted #9ab09a  – Placeholders
```

---

## Figma kūrimo tvarka (rekomenduojama)

1. **Pradėk nuo Tokens** – importuok `tokens.json` per Tokens Studio plugin
2. **Sukurk spalvų stilius** iš tokenų
3. **Sukurk tipografijos stilius** (H1–H4, Body, Label, Caption)
4. **Sukurk base komponentus:** Button (4 variantai), Badge/Chip, Progress bar
5. **Sudėk sekcijas** viena po kitos (Hero → Calendar → Info → Quiz → Footer)
6. **Sukurk Auto Layout** kiekvienai sekcijai
7. **Responsyviniai variantai:** Desktop (1440px) → Tablet (768px) → Mobile (375px)
