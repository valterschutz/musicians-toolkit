export type Position = {
	string: string;
	finger: number;
	letter: string;
	accidental: boolean;
	octave: number;
	step: number;
};

const letterOffset: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };

// Diatonic steps from E4 (the bottom line of the treble staff), one step per staff position.
function diatonicStep(letter: string, octave: number): number {
	return octave * 7 + letterOffset[letter] - (4 * 7 + letterOffset['E']);
}

export const strings = ['G', 'D', 'A', 'E'];
export const fingers = [0, 1, 2, 3, 4];

// Canonical first-position pattern: each finger a diatonic step above the previous.
const pattern: Record<string, { letter: string; accidental: boolean; octave: number }[]> = {
	G: [
		{ letter: 'G', accidental: false, octave: 3 },
		{ letter: 'A', accidental: false, octave: 3 },
		{ letter: 'B', accidental: false, octave: 3 },
		{ letter: 'C', accidental: false, octave: 4 },
		{ letter: 'D', accidental: false, octave: 4 }
	],
	D: [
		{ letter: 'D', accidental: false, octave: 4 },
		{ letter: 'E', accidental: false, octave: 4 },
		{ letter: 'F', accidental: true, octave: 4 },
		{ letter: 'G', accidental: false, octave: 4 },
		{ letter: 'A', accidental: false, octave: 4 }
	],
	A: [
		{ letter: 'A', accidental: false, octave: 4 },
		{ letter: 'B', accidental: false, octave: 4 },
		{ letter: 'C', accidental: true, octave: 5 },
		{ letter: 'D', accidental: false, octave: 5 },
		{ letter: 'E', accidental: false, octave: 5 }
	],
	E: [
		{ letter: 'E', accidental: false, octave: 5 },
		{ letter: 'F', accidental: true, octave: 5 },
		{ letter: 'G', accidental: true, octave: 5 },
		{ letter: 'A', accidental: false, octave: 5 },
		{ letter: 'B', accidental: false, octave: 5 }
	]
};

export const positions: Position[] = strings.flatMap((string) =>
	fingers.map((finger) => {
		const { letter, accidental, octave } = pattern[string][finger];
		return { string, finger, letter, accidental, octave, step: diatonicStep(letter, octave) };
	})
);

export function pitchKey(p: { letter: string; accidental: boolean; octave: number }): string {
	return `${p.letter}${p.accidental ? '#' : ''}${p.octave}`;
}

export function positionKey(p: { string: string; finger: number }): string {
	return `${p.string}-${p.finger}`;
}

export const uniquePitches = Array.from(new Map(positions.map((p) => [pitchKey(p), p])).values());
