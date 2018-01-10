// @flow
import {
  PolySynth,
  Synth,
  Frequency,
  FeedbackDelay,
  Master,
  PitchShift
} from "tone";

export type NervousPoint = {|
  midi: string,
  pixelation: number,
  pitch: number
|};

type RandFunc = () => number;
// type Gen = () => RandFunc;

class Nervous {
  notes: Array<NervousPoint>;
  currentNote: string;
  synth: PolySynth;
  midiMax: number;
  midiMin: number;
  delay: FeedbackDelay;
  pitchShift: PitchShift;

  constructor(detune: number) {
    this.delay = new FeedbackDelay(0.15, 0.1).toMaster();
    this.delay.wet.value = 0.1;
    this.synth = new PolySynth(6, Synth, {
      oscillator: {
        partials: [0, 2, 3, 4]
      }
    }).connect(this.delay);
    Master.set("volume", -6);
    // this.panVol = new PanVol();
    // this.synth.chain(this.delay, this.panVol, Master);
    // this.pitchShift = new PitchShift(1).toMaster();
    this.currentNote = "";
    this.synth.set("detune", -100 * detune);
    this.midiMax = 100;
    this.midiMin = 36;
    this.notes = this.randomWalk();
  }

  boxMullerRandom(): RandFunc {
    let phase = 0;
    let RAND_MAX: number;
    let array: Uint32Array;
    let random: RandFunc;
    let x1: number;
    let x2: number;
    let w: number;
    let z: number;
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      RAND_MAX = 2 ** 32 - 1;
      array = new Uint32Array(1);
      random = () => {
        window.crypto.getRandomValues(array);
        return array[0] / RAND_MAX;
      };
    } else {
      random = Math.random;
    }

    return () => {
      if (!phase) {
        do {
          const rx1: number = random();
          const rx2: number = random();
          x1 = 2.0 * rx1 - 1.0;
          x2 = 2.0 * rx2 - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);

        w = Math.sqrt(-2.0 * Math.log(w) / w);
        z = x1 * w;
      } else {
        z = x2 * w;
      }

      phase ^= 1;
      return z;
    };
  }

  mapRange(
    v: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return Math.floor(
      (v - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    );
  }

  randomWalk(steps?: number, randFunc?: RandFunc): Array<NervousPoint> {
    const midiDelta: number = this.midiMax - this.midiMin;
    steps = steps ? steps >>> 0 : midiDelta;
    if (typeof randFunc !== "function") {
      randFunc = this.boxMullerRandom();
    }

    let points: Array<number> = [];
    let nervousPoints: Array<NervousPoint>;
    let value = 0;
    let t;

    for (t = 0; t < steps; t += 1) {
      value += randFunc();
      points.push(value);
      if (t > 1) points.push(points[t - 2]);
    }

    const max = points.reduce((a, b) => {
      return Math.max(a, b);
    });
    const min = points.reduce((a, b) => {
      return Math.min(a, b);
    });

    nervousPoints = points.map(p => ({
      midi: Frequency(
        this.mapRange(p, min, max, this.midiMin, this.midiMax),
        "midi"
      ).toNote(),
      pixelation: this.mapRange(p, min, max, 0, 25),
      pitch: this.mapRange(p, min, max, -48, 48)
    }));
    return nervousPoints;
  }

  play(note: string): void {
    // this.synth.triggerRelease(this.currentNote);
    // this.currentNote = note;
    this.synth.triggerAttackRelease(note, 0.5, undefined, 0.5);
  }

  stop(): void {
    this.synth.releaseAll();
  }
}

export default Nervous;
