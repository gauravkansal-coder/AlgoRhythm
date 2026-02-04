This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🎵 AlgoRhythm: The Code-Reactive Music Engine

> **"Don't just write code. Feel the flow."**

AlgoRhythm is an intelligent, bio-adaptive music dashboard designed for developers. It monitors your coding activity in real-time and dynamically remixes music to match your mental state—fading into the background when you're thinking, and dropping the beat when you're in the "Flow State."


## 🚀 Features

* **🧠 Flow Detection Engine:** Uses a custom "Spy" script to monitor your keystrokes and coding velocity (WPM) in real-time.
* **🎛️ Adaptive Audio Mixing:** Seamlessly crossfades between 3 audio stems (Drums, Bass, Melody) based on your activity level using `Howler.js`.
    * **IDLE Mode:** Ambient melody for deep thinking.
    * **FLOW Mode:** Full-spectrum audio with driving drums and bass for high-output coding.
* **📊 Visual Feedback Loop:** A real-time audio visualizer and "Coin Mining" gamification system that rewards you for sustained focus.
* **🔌 Universal Compatibility:** Works with VS Code, IntelliJ, Sublime Text, or any text editor via our Universal Spy script.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (React + TypeScript)
* **Styling:** Tailwind CSS + Shadcn UI
* **Audio Engine:** [Howler.js](https://howlerjs.com/)
* **State Management:** React Hooks (`useAudio`, `useState`)
* **Backend:** Next.js API Routes (Serverless)

---

## ⚡ Quick Start Guide

Follow these steps to get the engine running on your local machine.

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone [https://github.com/gauravkansal-coder/algorhythm.git](https://github.com/gauravkansal-coder/algorhythm.git)
cd algorhythm
npm install
2. Audio Setup (Important!)
You need 3 audio stem files in the public/ folder for the mixing to work.

Option A (Quick Test): Copy any MP3 file you have, paste it 3 times, and rename them to:

drums.mp3

bass.mp3

melody.mp3

Option B (Pro): Download 3 separate stems (Drum loop, Bass line, Synth pad) for the full layering effect.

3. Run the Dashboard
Start the Next.js development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

4. Activate the "Spy" 🕵️
To make the music react to your code, you need to run the watcher script. Open a new terminal window in your project folder and run:

Bash
node spy.js
How to trigger the Flow State:

Go to the Dashboard and click Play.

Open VS Code (or any editor) inside the project folder.

Start typing and Save your file (Ctrl + S).

Magic: The music will intensify as the spy detects your activity!

🔮 Future Roadmap
We are building the ultimate developer companion. Here is what's coming next:

1. 🧠 AI Genre Selection
Instead of one track, AlgoRhythm will analyze what you are coding.

Python/Data Science: Triggers Lo-Fi / Chill beats.

Rust/C++: Triggers High-Tempo Drum & Bass.

CSS/HTML: Triggers Upbeat Synthwave.

2. 🔌 Native VS Code Extension
We will replace the node spy.js script with a verified VS Code Extension. This will allow for:

Real-time keystroke tracking (no need to save!).

Integrated "Pause/Play" controls directly in the VS Code status bar.

3. 🌐 Spotify Integration
Connect your Premium Spotify account to remix your own playlists based on your coding speed, using the Spotify Web Playback SDK.

4. 🏆 "Streak" Gamification
Compete with friends on the "Flow Leaderboard." Earn badges for maintaining the Flow State for 1+ hours without interruption.

🤝 Contributing
Contributions are welcome! If you're a musician who wants to donate stems or a dev who wants to improve the audio engine:

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request