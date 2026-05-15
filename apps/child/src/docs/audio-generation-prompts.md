# 🤖 Audio Generation Prompts (Corujinha)

Use este guia para gerar os assets de áudio da Corujinha usando ferramentas de IA (como **ElevenLabs SFX**, **Stable Audio**, **MyEdit** ou **AudioLDM**).

---

## 🔘 1. UI & Sistema (Cliques e Feedbacks)
*Estes sons devem ser curtos (< 0.5s), limpos e satisfatórios.*

| Som | Prompt Sugerido (Inglês funciona melhor) |
| :--- | :--- |
| **button_click** | "A soft, organic UI click sound, like a small wooden button being pressed, high quality, clean, no reverb." |
| **xp_gain** | "A short, rising magical chime, sparkling gold dust sound, positive reinforcement, light and airy." |
| **success_pop** | "A cute organic bubble pop, satisfying, soft, minimal, for child app interface." |

---

## 🦉 2. Mentor Signatures (Aparição e Falas)
*Sons que tocam quando o mentor aparece ou o balão de fala abre.*

### ⚡ Bolt (Energia e Rapidez)
*   **Prompt:** "A quick electric static spark, followed by a soft whoosh of wind, energetic, high pitch, magical, friendly."
*   **Nome do Arquivo:** `mentor_appear_bolt.mp3`

### 🌿 Gaia (Natureza e Acolhimento)
*   **Prompt:** "Sound of dry leaves rustling softly, combined with a gentle wooden rattle, organic, earthy, warm, nature-inspired."
*   **Nome do Arquivo:** `mentor_appear_gaia.mp3`

### ✨ Lumi (Luz e Partículas)
*   **Prompt:** "A soft crystal chime, shimmering light particles sound, ethereal, celestial, very soft fade-in, magical."
*   **Nome do Arquivo:** `mentor_appear_lumi.mp3`

### 📖 Bubo (Sabedoria e Ancestralidade)
*   **Prompt:** "Deep hollow wooden sound, like a heavy old book opening, followed by a very low frequency magical hum, wise, ancient."
*   **Nome do Arquivo:** `mentor_appear_bubo.mp3`

---

## 🌲 3. Atmosfera e Ambiente (Loops)
*Sons de fundo contínuos.*

*   **Forest Day:** "Ambient forest sounds for a child's game, singing birds in the distance, soft wind through leaves, peaceful, cozy fantasy, no loops, high quality."
*   **Forest Night:** "Soft crickets chirping at night, distant hooting owl, calm breeze, magical nocturnal forest atmosphere, relaxing, minimal."

---

## 🏆 4. Sacred Moments (Conquistas)
*Sons para o Ninho e Evoluções.*

*   **nest_evolution:** "A grand magical orchestration of chimes and a soft choir 'ah', sense of growth, wonder, achievement, high quality, 2 seconds long."

---

## 🛠️ Ferramentas Recomendadas
1.  **[ElevenLabs SFX](https://elevenlabs.io/audio-native):** Excelente para efeitos curtos de UI e assinaturas de mentores.
2.  **[Stable Audio](https://stableaudio.com/):** Ótimo para loops de ambiente e atmosferas.
3.  **[MyEdit (Cyberlink)](https://myedit.online/en/audio-editor/ai-sfx-generator):** Gerador de SFX muito preciso para cliques e pops.

---
> **Dica:** Após gerar, tente converter para `.wav` se quiser a menor latência possível para sons de clique, ou mantenha em `.mp3` (128kbps) para economizar dados no PWA.
