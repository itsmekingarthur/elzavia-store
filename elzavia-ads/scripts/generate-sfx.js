const fs = require("fs");
const path = require("path");

function writeString(view, offset, str) {
  for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
}

function generateWav(frequency, durationSec, sampleRate = 44100, type = "sine", envelope = "none") {
  const numSamples = Math.floor(sampleRate * durationSec);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * blockAlign;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const buffer = Buffer.alloc(totalSize);

  const view = {
    setUint8(offset, val) { buffer.writeUInt8(val, offset); },
    setUint16(offset, val, littleEndian) {
      if (littleEndian) buffer.writeUInt16LE(val, offset);
      else buffer.writeUInt16BE(val, offset);
    },
    setUint32(offset, val, littleEndian) {
      if (littleEndian) buffer.writeUInt32LE(val, offset);
      else buffer.writeUInt32BE(val, offset);
    },
    setInt16(offset, val, littleEndian) {
      if (littleEndian) buffer.writeInt16LE(val, offset);
      else buffer.writeInt16BE(val, offset);
    },
  };

  // WAV header
  writeString(view, 0, "RIFF");
  view.setUint32(4, totalSize - 8, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  // Audio data
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let value = 0;

    if (type === "sine") {
      value = Math.sin(2 * Math.PI * frequency * t);
    } else if (type === "square") {
      value = Math.sin(2 * Math.PI * frequency * t) >= 0 ? 0.5 : -0.5;
    } else if (type === "sawtooth") {
      value = 2 * ((frequency * t) % 1) - 1;
    } else if (type === "chord") {
      value =
        Math.sin(2 * Math.PI * frequency * t) * 0.3 +
        Math.sin(2 * Math.PI * frequency * 1.25 * t) * 0.2 +
        Math.sin(2 * Math.PI * frequency * 1.5 * t) * 0.15;
    } else if (type === "softchord") {
      value =
        Math.sin(2 * Math.PI * frequency * t) * 0.4 +
        Math.sin(2 * Math.PI * frequency * 2.01 * t) * 0.15;
    } else if (type === "vibrato") {
      const vibrato = 1 + Math.sin(2 * Math.PI * 5 * t) * 0.015;
      value = Math.sin(2 * Math.PI * frequency * vibrato * t);
    } else if (type === "crystal") {
      const vib = 1 + Math.sin(2 * Math.PI * 4 * t) * 0.01;
      value =
        Math.sin(2 * Math.PI * frequency * vib * t) * 0.5 +
        Math.sin(2 * Math.PI * frequency * 3.01 * vib * t) * 0.1;
    } else if (type === "shimmer") {
      const env = Math.max(0, 1 - t / durationSec);
      value =
        Math.sin(2 * Math.PI * frequency * t) * 0.3 * env +
        Math.sin(2 * Math.PI * (frequency * 2.5) * t) * 0.08 * env +
        Math.sin(2 * Math.PI * (frequency * 4.2) * t) * 0.04 * env;
    } else if (type === "noise") {
      value = Math.random() * 2 - 1;
    } else if (type === "sweep") {
      const sweepFreq = frequency + (frequency * 2 * t) / durationSec;
      value = Math.sin(2 * Math.PI * sweepFreq * t);
    }

    // Apply envelope
    if (envelope === "fadein") {
      value *= Math.min(1, t / 0.05);
    } else if (envelope === "fadeout") {
      value *= Math.max(0, 1 - t / durationSec);
    } else if (envelope === "perc") {
      const amp = Math.max(0, 1 - t / (durationSec * 0.3));
      value *= amp;
    } else if (envelope === "both") {
      const fadeIn = Math.min(1, t / 0.02);
      const fadeOut = Math.max(0, 1 - t / durationSec);
      value *= fadeIn * fadeOut;
    } else if (envelope === "smooth") {
      const fadeIn = Math.min(1, t / 0.01);
      const fadeOut = Math.max(0, 1 - t / (durationSec));
      value *= fadeIn * Math.max(0.1, fadeOut);
    }

    const intValue = Math.max(-32768, Math.min(32767, Math.floor(value * 0.35 * 32767)));
    view.setInt16(headerSize + i * 2, intValue, true);
  }

  return buffer;
}

const sfxDir = path.join(__dirname, "..", "public", "sfx");

const sounds = [
  // Elegant air swoosh for transitions
  { file: "swoosh.wav", freq: 180, dur: 0.35, type: "sweep", env: "smooth" },
  // Soft gentle tap for element appears
  { file: "pop.wav", freq: 350, dur: 0.08, type: "sine", env: "perc" },
  // Warm soft confirmation tone (NOT a harsh ding)
  { file: "ding.wav", freq: 220, dur: 0.15, type: "softchord", env: "perc" },
  // Subtle button click
  { file: "click.wav", freq: 600, dur: 0.06, type: "sine", env: "perc" },
  // Deep air whoosh for scene transitions
  { file: "whoosh.wav", freq: 120, dur: 0.5, type: "sweep", env: "smooth" },
  // Crystal resonance - elegant, warm, like a singing bowl
  { file: "chime.wav", freq: 432, dur: 0.8, type: "crystal", env: "fadeout" },
  // Gentle sparkle - replaced the annoying brighding
  { file: "brighding.wav", freq: 800, dur: 0.45, type: "shimmer", env: "fadeout" },
  // Deep soft thump for impacts
  { file: "thud.wav", freq: 55, dur: 0.12, type: "sine", env: "perc" },
];

for (const s of sounds) {
  const buf = generateWav(s.freq, s.dur, 44100, s.type, s.env);
  fs.writeFileSync(path.join(sfxDir, s.file), buf);
  console.log(`Generated ${s.file} (${(buf.length / 1024).toFixed(1)} KB)`);
}

console.log("\nAll SFX regenerated with elegant sounds!");
