# 🎵 Corujinha Audio Philosophy

Este documento define a governança e a estratégia emocional do universo sonoro da Corujinha. O objetivo é criar uma **Memória Afetiva Sonora** que seja memorável, acolhedora e tecnicamente resiliente.

---

## 💎 1. Os Três Pilares

### I. Minimalismo Narrativo
O som não deve competir com a visão. O silêncio é uma ferramenta de design. Usamos o som apenas para pontuar rituais, fornecer feedback tátil ou criar atmosfera.
*   **Regra de Ouro:** "Se o som não conta uma história ou confirma uma ação, ele é ruído."

### II. Assinatura Sônica por Mentor
Cada mentor possui sua própria paleta acústica (Sonic Identity), permitindo que a criança identifique quem está falando mesmo sem olhar para a tela.
*   **Bolt:** Sons rápidos, ventos, estalos de energia, agudos vibrantes.
*   **Gaia:** Madeira, folhas secas, vento orgânico, frequências médias quentes.
*   **Lumi:** Sinos de cristal, partículas de luz, fade-ins suaves, agudos etéreos.
*   **Bubo:** Livros abrindo, graves profundos, sons ancestrais de pedra e eco.

### III. Resiliência PWA
O áudio deve ser "unlocked" na primeira interação do usuário para evitar bloqueios do iOS Safari. Usamos **Audio Pooling** para garantir latência zero (instant feedback).

---

## 🎚️ 2. Categorias e Mixagem (Hierarquia)

| Categoria | Volume | Propósito | Exemplo |
| :--- | :--- | :--- | :--- |
| **UI** | 30% | Feedback tátil de botões | `button_click` |
| **MENTOR** | 70% | Presença narrativa | `mentor_appear` |
| **AMBIENT** | 20% | Imersão e atmosfera | `forest_day` |
| **SACRED** | 80% | Momentos de evolução | `nest_evolution` |
| **REWARD** | 90% | Celebração máxima | `ceremony_gold` |

---

## 🕊️ 3. Pacing e Silêncio (Regras de Ouro)

1.  **Anti-Clutter:** Nunca toque dois sons de **REWARD** ou **SACRED** simultaneamente.
2.  **Sacred Silence:** Após uma grande recompensa, mantenha 1.5s de silêncio antes do Mentor começar a falar. Isso permite o processamento emocional.
3.  **UI Damping:** Durante a fala de um Mentor, reduza o volume dos efeitos de UI em 50%.

---

## 🛠️ 4. Padrões Técnicos

*   **Formatos:** 
    *   `.wav` ou `.ogg` para efeitos curtos de UI (menor latência).
    *   `.mp3` para músicas ambiente e falas longas.
*   **Nomenclatura:** `[efeito]_[mentor].mp3` (ex: `greeting_lumi.mp3`).
*   **Caminho:** `public/audio/effects/` e `public/audio/ambient/`.

---

> "Na Corujinha, o áudio não é um detalhe técnico, é o abraço invisível que acompanha a jornada da criança."
