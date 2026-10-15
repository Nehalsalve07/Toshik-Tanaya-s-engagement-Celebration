// High-Fidelity Indian Festive Music Player
// Plays real authentic traditional Indian celebration songs (Ustad Bismillah Khan Shehnai wedding songs)
// with seamless fallback to Web Audio Indian Raga synthesizer.

export type IndianRagaType =
  | 'love_piano'
  | 'natarang'
  | 'shehnai_song'
  | 'mangalashtak'
  | 'shehnai_pahadi'
  | 'bansuri'
  | 'sitar'
  | 'custom';

interface NoteStep {
  note: number;
  duration: number;
  glideTo?: number;
}

class IndianFestiveSynth {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private tanpuraTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private currentTrack: IndianRagaType = 'natarang';
  private currentStep = 0;
  private manjiraCounter = 0;
  private customAudioUrl: string | null = null;

  // Base frequencies: Root tonic Sa = D4 (293.66 Hz), traditional Indian pitch
  private readonly D4 = 293.66; // Sa
  private readonly E4 = 329.63; // Re
  private readonly Fsharp4 = 369.99; // Ga
  private readonly G4 = 392.00; // Ma
  private readonly Gsharp4 = 415.30; // Tivra Ma
  private readonly A4 = 440.00; // Pa
  private readonly B4 = 493.88; // Dha
  private readonly Csharp5 = 554.37; // Ni
  private readonly D5 = 587.33; // Taar Sa
  private readonly E5 = 659.25; // Taar Re
  private readonly Fsharp5 = 739.99; // Taar Ga

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public setCustomAudio(url: string) {
    const wasPlaying = this.isPlaying;
    if (wasPlaying) {
      this.stop();
    }
    this.customAudioUrl = url;
    this.currentTrack = 'custom';
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = 0.82;
    if (wasPlaying) {
      this.play();
    }
  }

  public setTrack(track: IndianRagaType) {
    const wasPlaying = this.isPlaying;
    if (wasPlaying) {
      this.stop();
    }
    this.currentTrack = track;
    if (wasPlaying) {
      this.play();
    }
  }

  public getTrack(): IndianRagaType {
    return this.currentTrack;
  }

  public async play(): Promise<boolean> {
    this.init();

    // Check if custom audio song is provided
    if (this.currentTrack === 'custom' && this.customAudioUrl) {
      try {
        if (!this.audioElement || this.audioElement.src !== this.customAudioUrl) {
          if (this.audioElement) {
            this.audioElement.pause();
          }
          this.audioElement = new Audio(this.customAudioUrl);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.82;
        }
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        this.isPlaying = true;
        return true;
      } catch (err) {
        console.warn('Custom audio playback failed, falling back to Indian synth:', err);
        return this.startSynthPlayback();
      }
    }

    // Check if this is a recorded authentic Indian song track
    if (this.currentTrack === 'shehnai_song' || this.currentTrack === 'shehnai_pahadi') {
      try {
        const baseUrl = import.meta.env.BASE_URL.endsWith('/')
          ? import.meta.env.BASE_URL
          : `${import.meta.env.BASE_URL}/`;
        const fileName =
          this.currentTrack === 'shehnai_song'
            ? 'audio/shehnai-song.mp3'
            : 'audio/shehnai-pahadi.mp3';
        const audioSrc = `${baseUrl}${fileName}`;

        if (!this.audioElement || !this.audioElement.src.endsWith(fileName)) {
          if (this.audioElement) {
            this.audioElement.pause();
          }
          this.audioElement = new Audio(audioSrc);
          this.audioElement.loop = true;
          this.audioElement.volume = 0.78;
        }

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        this.isPlaying = true;
        return true;
      } catch (err) {
        console.warn('Real audio file playback failed, falling back to Indian synth:', err);
        return this.startSynthPlayback();
      }
    } else {
      // Synthesizer classical ragas and songs (Natarang, Mangalashtak, Bansuri, Sitar)
      if (this.audioElement) {
        this.audioElement.pause();
      }
      return this.startSynthPlayback();
    }
  }

  private async startSynthPlayback(): Promise<boolean> {
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.error('AudioContext resume error:', err);
      }
    }

    if (this.isPlaying) return true;

    this.isPlaying = true;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.68, this.ctx.currentTime + 0.8);
    this.masterGain.connect(this.ctx.destination);

    this.startTanpuraDrone();
    this.currentStep = 0;
    this.manjiraCounter = 0;
    this.scheduleNextPhrase();
    return true;
  }

  public stop() {
    this.isPlaying = false;

    // Stop real audio track if playing
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        // ignore
      }
    }

    // Stop synth timers
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.tanpuraTimer) {
      clearTimeout(this.tanpuraTimer);
      this.tanpuraTimer = null;
    }

    // Fade out synth master gain
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            this.masterGain?.disconnect();
          } catch {
            // ignore
          }
        }, 350);
      } catch {
        // ignore
      }
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return await this.play();
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  // --- Web Audio Synthesizer Ragas & Melodies ---

  private getShehnaiMelody(): NoteStep[] {
    const Sa = this.D4;
    const Re = this.E4;
    const Ga = this.Fsharp4;
    const Pa = this.A4;
    const Dha = this.B4;
    const Ni = this.Csharp5;
    const TaarSa = this.D5;

    return [
      { note: Pa, duration: 0.6, glideTo: Dha },
      { note: Dha, duration: 0.5 },
      { note: TaarSa, duration: 1.1, glideTo: Ni },
      { note: Dha, duration: 0.7 },
      { note: Pa, duration: 1.2 },
      { note: Ga, duration: 0.6, glideTo: Pa },
      { note: Pa, duration: 0.6 },
      { note: Dha, duration: 0.8 },
      { note: Pa, duration: 0.6, glideTo: Ga },
      { note: Ga, duration: 0.7, glideTo: Re },
      { note: Re, duration: 0.8, glideTo: Sa },
      { note: Sa, duration: 1.5 },
    ];
  }

  private getBansuriMelody(): NoteStep[] {
    const Sa = this.D4;
    const Re = this.E4;
    const Ga = this.Fsharp4;
    const TivraMa = this.Gsharp4;
    const Pa = this.A4;
    const Dha = this.B4;
    const Ni = this.Csharp5;
    const TaarSa = this.D5;

    return [
      { note: Ni / 2, duration: 1.0, glideTo: Re },
      { note: Re, duration: 0.8, glideTo: Ga },
      { note: Ga, duration: 1.4 },
      { note: TivraMa, duration: 0.7, glideTo: Pa },
      { note: Pa, duration: 1.3 },
      { note: Dha, duration: 0.7, glideTo: Ni },
      { note: Ni, duration: 0.9 },
      { note: TaarSa, duration: 1.8, glideTo: Ni },
      { note: Dha, duration: 0.8 },
      { note: Pa, duration: 1.2 },
      { note: TivraMa, duration: 0.7, glideTo: Ga },
      { note: Ga, duration: 1.0 },
      { note: Re, duration: 0.8, glideTo: Sa },
      { note: Sa, duration: 1.8 },
    ];
  }

  private getSitarMelody(): NoteStep[] {
    const Sa = this.D4;
    const Re = this.E4;
    const Ga = this.Fsharp4;
    const Ma = this.G4;
    const Pa = this.A4;
    const Dha = this.B4;
    const Ni = this.Csharp5;
    const TaarSa = this.D5;

    return [
      { note: Sa, duration: 0.4 },
      { note: Re, duration: 0.4, glideTo: Ga },
      { note: Ga, duration: 0.8 },
      { note: Ma, duration: 0.4 },
      { note: Pa, duration: 0.9, glideTo: Dha },
      { note: Dha, duration: 0.5 },
      { note: Ni, duration: 0.6, glideTo: TaarSa },
      { note: TaarSa, duration: 1.2 },
      { note: Ni, duration: 0.5, glideTo: Dha },
      { note: Pa, duration: 0.8 },
      { note: Ma, duration: 0.5, glideTo: Ga },
      { note: Re, duration: 0.6 },
      { note: Sa, duration: 1.4 },
    ];
  }

  private playManjiraChime() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(2850, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(5700, now);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2600, now);

    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.linearRampToValueAtTime(0.14, now + 0.015);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }

  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;

    const tanpuraNotes = [
      this.A4 / 2, // Mandra Pa (220 Hz)
      this.D4, // Madhya Sa (293.66 Hz)
      this.D4 * 1.0025, // Shimmering chorus Sa
      this.D4 / 2, // Kharja Sa (146.83 Hz)
    ];

    let stringIdx = 0;

    const pluckString = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      const freq = tanpuraNotes[stringIdx];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1050, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.8, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.002, now + 3.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.3);

      stringIdx = (stringIdx + 1) % tanpuraNotes.length;
      this.tanpuraTimer = window.setTimeout(pluckString, 1150);
    };

    pluckString();
  }

  private playInstrumentNote(step: NoteStep) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const oscPrimary = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const formantFilter = this.ctx.createBiquadFilter();

    if (this.currentTrack === 'love_piano') {
      oscPrimary.type = 'triangle';
      oscHarmonic.type = 'sine';
      formantFilter.type = 'lowpass';
      formantFilter.frequency.setValueAtTime(3400, now);
      formantFilter.Q.setValueAtTime(0.7, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.55, now + 0.015);
      noteGain.gain.exponentialRampToValueAtTime(0.14, now + 0.35);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + step.duration);
    } else if (this.currentTrack === 'bansuri') {
      oscPrimary.type = 'sine';
      oscHarmonic.type = 'triangle';
      formantFilter.type = 'lowpass';
      formantFilter.frequency.setValueAtTime(1900, now);
      formantFilter.Q.setValueAtTime(1.2, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.48, now + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + step.duration);
    } else if (this.currentTrack === 'sitar') {
      oscPrimary.type = 'sawtooth';
      oscHarmonic.type = 'triangle';
      formantFilter.type = 'bandpass';
      formantFilter.frequency.setValueAtTime(2200, now);
      formantFilter.Q.setValueAtTime(3.5, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.45, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + step.duration);
    } else {
      oscPrimary.type = 'sawtooth';
      oscHarmonic.type = 'square';
      formantFilter.type = 'bandpass';
      formantFilter.frequency.setValueAtTime(1650, now);
      formantFilter.Q.setValueAtTime(2.2, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.45, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + step.duration);
    }

    oscPrimary.frequency.setValueAtTime(step.note, now);
    oscHarmonic.frequency.setValueAtTime(step.note * 2.001, now);

    if (step.glideTo) {
      oscPrimary.frequency.exponentialRampToValueAtTime(step.glideTo, now + step.duration * 0.85);
      oscHarmonic.frequency.exponentialRampToValueAtTime(
        step.glideTo * 2.001,
        now + step.duration * 0.85
      );
    }

    oscPrimary.connect(formantFilter);
    oscHarmonic.connect(formantFilter);
    formantFilter.connect(noteGain);
    noteGain.connect(this.masterGain);

    oscPrimary.start(now);
    oscHarmonic.start(now);
    oscPrimary.stop(now + step.duration + 0.1);
    oscHarmonic.stop(now + step.duration + 0.1);
  }

  private getNatarangMelody(): NoteStep[] {
    const Sa = this.D4;
    const Re = this.E4;
    const Ga = this.Fsharp4;
    const Ma = this.G4;
    const Pa = this.A4;
    const Dha = this.B4;
    const Ni = this.Csharp5;
    const TaarSa = this.D5;
    const TaarRe = this.E5;

    // Upbeat celebratory Natarang / Lavani festive song phrases (Apsara Aali / Natarang style)
    return [
      { note: Pa, duration: 0.28 },
      { note: Dha, duration: 0.28, glideTo: Pa },
      { note: Pa, duration: 0.32 },
      { note: Ga, duration: 0.35, glideTo: Ma },
      { note: Pa, duration: 0.38 },
      { note: Dha, duration: 0.3 },
      { note: Ni, duration: 0.35, glideTo: TaarSa },
      { note: TaarSa, duration: 0.65 },
      { note: TaarRe, duration: 0.32, glideTo: TaarSa },
      { note: TaarSa, duration: 0.4 },
      { note: Ni, duration: 0.3 },
      { note: Dha, duration: 0.35, glideTo: Pa },
      { note: Pa, duration: 0.7 },
      { note: Ga, duration: 0.3 },
      { note: Re, duration: 0.3 },
      { note: Sa, duration: 0.8 },
    ];
  }

  private getMangalashtakMelody(): NoteStep[] {
    const Sa = this.D4;
    const Re = this.E4;
    const Ga = this.Fsharp4;
    const Ma = this.G4;
    const Pa = this.A4;
    const Dha = this.B4;
    const Ni = this.Csharp5;
    const TaarSa = this.D5;

    // Traditional Shubhamangal Saavdhan / Vivah invocation melody
    return [
      { note: Sa, duration: 0.7 },
      { note: Ga, duration: 0.7, glideTo: Pa },
      { note: Pa, duration: 1.1 },
      { note: Dha, duration: 0.6, glideTo: Pa },
      { note: Pa, duration: 1.0 },
      { note: Ni, duration: 0.8, glideTo: TaarSa },
      { note: TaarSa, duration: 1.6 },
      { note: Ni, duration: 0.6 },
      { note: Dha, duration: 0.7 },
      { note: Pa, duration: 1.1 },
      { note: Ma, duration: 0.6, glideTo: Ga },
      { note: Ga, duration: 0.8 },
      { note: Re, duration: 0.6, glideTo: Sa },
      { note: Sa, duration: 1.8 },
    ];
  }

  private playDholakBeat(isBass: boolean) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (isBass) {
      // Warm low Dholak bass drum (Dha / Ge)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(58, now + 0.18);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    } else {
      // Crisp treble rim strike (Ta / Na)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  private getLovePianoMelody(): NoteStep[] {
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.00;
    const A4 = 440.00;
    const B4 = 493.88;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;

    // Romantic wedding love piano composition (gentle flowing lyrical melody)
    return [
      { note: E4, duration: 0.65 },
      { note: G4, duration: 0.4 },
      { note: C5, duration: 0.85 },
      { note: B4, duration: 0.5 },
      { note: A4, duration: 0.8 },
      { note: G4, duration: 0.45 },
      { note: F4, duration: 0.4 },
      { note: E4, duration: 0.65 },
      { note: D4, duration: 0.5 },
      { note: C4, duration: 0.95 },
      { note: E4, duration: 0.4 },
      { note: G4, duration: 0.45 },
      { note: C5, duration: 0.75 },
      { note: D5, duration: 0.5 },
      { note: E5, duration: 1.1 },
      { note: D5, duration: 0.55 },
      { note: C5, duration: 0.95 },
    ];
  }

  private scheduleNextPhrase() {
    if (!this.isPlaying) return;

    let melody: NoteStep[] = [];
    if (this.currentTrack === 'love_piano') {
      melody = this.getLovePianoMelody();
    } else if (this.currentTrack === 'natarang') {
      melody = this.getNatarangMelody();
    } else if (this.currentTrack === 'mangalashtak') {
      melody = this.getMangalashtakMelody();
    } else if (this.currentTrack === 'bansuri') {
      melody = this.getBansuriMelody();
    } else if (this.currentTrack === 'sitar') {
      melody = this.getSitarMelody();
    } else {
      melody = this.getShehnaiMelody();
    }

    if (melody.length === 0) return;

    const currentStep = melody[this.currentStep];
    this.playInstrumentNote(currentStep);

    // Add rhythmic percussion
    if (this.currentTrack === 'natarang') {
      // Dholak rhythm: alternating bass and treble
      const isBassBeat = this.currentStep % 2 === 0;
      this.playDholakBeat(isBassBeat);
      if (this.currentStep % 4 === 0) {
        this.playManjiraChime();
      }
    } else {
      this.manjiraCounter = (this.manjiraCounter + 1) % 4;
      if (this.manjiraCounter === 0 || this.currentStep === 0) {
        this.playManjiraChime();
      }
    }

    this.currentStep = (this.currentStep + 1) % melody.length;

    this.timer = window.setTimeout(() => {
      this.scheduleNextPhrase();
    }, currentStep.duration * 1000 * 0.94);
  }
}

export const musicPlayer = new IndianFestiveSynth();
