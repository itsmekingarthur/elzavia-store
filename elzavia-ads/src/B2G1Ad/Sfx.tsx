import { Audio, staticFile } from "remotion";

// Sound effects that play once
const sfxMap = {
  swoosh: staticFile("sfx/swoosh.wav"),
  pop: staticFile("sfx/pop.wav"),
  ding: staticFile("sfx/ding.wav"),
  click: staticFile("sfx/click.wav"),
  whoosh: staticFile("sfx/whoosh.wav"),
  chime: staticFile("sfx/chime.wav"),
  brighding: staticFile("sfx/brighding.wav"),
  thud: staticFile("sfx/thud.wav"),
} as const;

type SfxName = keyof typeof sfxMap;

export function Sfx({ name, from = 0 }: { name: SfxName; from?: number }) {
  return <Audio src={sfxMap[name]} />;
  // We don't trim/delay here; parent handles timing via Sequence
}

export { sfxMap };
