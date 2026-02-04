import { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

type AudioState = 'IDLE' | 'FLOW' | 'BUILDING';

export function useAudio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false); // <--- NEW: Master Switch
  const [status, setStatus] = useState<AudioState>('IDLE');
  
  // Refs to hold the audio players
  const drumsRef = useRef<Howl | null>(null);
  const bassRef = useRef<Howl | null>(null);
  const melodyRef = useRef<Howl | null>(null);

  // 1. Initialize Audio
  useEffect(() => {
    drumsRef.current = new Howl({ src: ['/drums.mp3'], loop: true, volume: 0 });
    bassRef.current = new Howl({ src: ['/bass.mp3'], loop: true, volume: 0 });
    melodyRef.current = new Howl({ src: ['/melody.mp3'], loop: true, volume: 0 });

    drumsRef.current.once('load', () => setIsLoaded(true));

    return () => {
      drumsRef.current?.unload();
      bassRef.current?.unload();
      melodyRef.current?.unload();
    };
  }, []);

  // 2. THE BRIDGE: Poll the API every second
  // UPDATED: Now respects the 'isEnabled' switch
  useEffect(() => {
    if (!isEnabled) return; // <--- IF PAUSED, STOP LISTENING TO SPY

    const interval = setInterval(async () => {
        try {
            const res = await fetch('/api/status');
            const data = await res.json();
            
            // Only update if status actually changed
            if (data.status && (data.status === 'FLOW' || data.status === 'IDLE')) {
                setStatus((prev) => (prev !== data.status ? data.status : prev));
            }
        } catch (e) {
            console.error("Polling error", e);
        }
    }, 1000); 

    return () => clearInterval(interval);
  }, [isEnabled]); // Re-run when switch toggles

  // 3. The DJ Logic: Crossfade based on status
  useEffect(() => {
    if (!isLoaded) return;
    
    const drums = drumsRef.current;
    const bass = bassRef.current;
    const melody = melodyRef.current;
    const FADE = 2000; 

    if (!drums || !bass || !melody) return;

    // Ensure playing (silently if needed)
    if (!drums.playing()) {
        drums.play(); bass.play(); melody.play();
    }

    // --- NEW: MASTER PAUSE LOGIC ---
    if (!isEnabled) {
        // If Paused, fade everything to 0
        drums.fade(drums.volume(), 0, 500);
        bass.fade(bass.volume(), 0, 500);
        melody.fade(melody.volume(), 0, 500);
        return; 
    }

    console.log("Audio Engine Switching to:", status);

    if (status === 'IDLE') {
        // IDLE: Quiet, just melody
        drums.fade(drums.volume(), 0, FADE);
        bass.fade(bass.volume(), 0, FADE);
        melody.fade(melody.volume(), 0.5, FADE);
    } 
    else if (status === 'FLOW') {
        // FLOW: Full Power
        drums.fade(drums.volume(), 1.0, FADE);
        bass.fade(bass.volume(), 1.0, FADE);
        melody.fade(melody.volume(), 1.0, FADE);
    }
    else if (status === 'BUILDING') {
        // BUILDING: Tension
        drums.fade(drums.volume(), 0.2, 500);
        bass.fade(bass.volume(), 1.0, 500);
        melody.fade(melody.volume(), 0, 500);
    }
  }, [status, isLoaded, isEnabled]);

  // 4. Helper Controls (Updated for Toggle)
  
  // REPLACED 'startAudio' with 'toggleAudio'
  const toggleAudio = () => {
    if (Howler.ctx.state === 'suspended') {
        Howler.ctx.resume();
    }
    setIsEnabled((prev) => !prev);
  };

  const setGlobalVolume = (vol: number) => {
    Howler.volume(vol);
  };

  const restart = () => {
    drumsRef.current?.seek(0);
    bassRef.current?.seek(0);
    melodyRef.current?.seek(0);
  }

  // Return 'isPlaying' (which is just isEnabled) and 'toggleAudio'
  return { status, isPlaying: isEnabled, toggleAudio, setGlobalVolume, restart };
}