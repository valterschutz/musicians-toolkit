<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';

	type Position = { string: string; finger: number; note: string };

	const strings = ['G', 'D', 'A', 'E'];
	const fingers = [0, 1, 2, 3, 4];

	// Canonical first-position pattern: each finger a diatonic step above the previous.
	const notesByString: Record<string, string[]> = {
		G: ['G', 'A', 'B', 'C', 'D'],
		D: ['D', 'E', 'F#', 'G', 'A'],
		A: ['A', 'B', 'C#', 'D', 'E'],
		E: ['E', 'F#', 'G#', 'A', 'B']
	};

	const positions: Position[] = strings.flatMap((string) =>
		fingers.map((finger) => ({ string, finger, note: notesByString[string][finger] }))
	);

	const uniqueNotes = _.uniq(positions.map((p) => p.note));

	function positionKey(position: Position) {
		return `${position.string}-${position.finger}`;
	}

	let currentNote = $state(_.sample(uniqueNotes) as string);
	let selectedKeys = $state<Set<string>>(new Set());
	let revealed = $state(false);

	const correctPositions = $derived(positions.filter((p) => p.note === currentNote));
	const correctKeys = $derived(new Set(correctPositions.map(positionKey)));

	function toggleSelection(position: Position) {
		if (revealed) return;
		const key = positionKey(position);
		const next = new Set(selectedKeys);
		if (next.has(key)) {
			next.delete(key);
		} else {
			next.add(key);
		}
		selectedKeys = next;
	}

	function reveal() {
		revealed = true;
	}

	function nextNote() {
		currentNote = _.sample(uniqueNotes.filter((n) => n !== currentNote)) as string;
		selectedKeys = new Set();
		revealed = false;
	}

	function dotClasses(position: Position) {
		const key = positionKey(position);
		const isSelected = selectedKeys.has(key);
		const isCorrect = correctKeys.has(key);

		if (!revealed) {
			return isSelected ? 'bg-teal-500' : 'bg-indigo-900';
		}
		if (isSelected && isCorrect) return 'bg-green-500';
		if (isSelected && !isCorrect) return 'bg-red-500';
		if (!isSelected && isCorrect) return 'bg-amber-500';
		return 'bg-indigo-900';
	}
</script>

<div class="flex flex-col items-center gap-6 p-2 w-[348px]">
	<p class="text-white text-2xl">Where is this note?</p>
	<div
		class="rounded-md w-[80px] h-[80px] bg-indigo-700 text-indigo-100 flex justify-center items-center"
	>
		<p class="text-4xl cursor-default">{currentNote}</p>
	</div>

	<div class="flex flex-row justify-center gap-6 w-full">
		{#each strings as string}
			<div class="flex flex-col items-center gap-4">
				<p class="text-white text-xl">{string}</p>
				<div class="flex flex-col gap-4">
					{#each fingers as finger}
						{@const position = { string, finger, note: notesByString[string][finger] }}
						<button
							class="rounded-full size-10 transition-colors cursor-pointer outline-none focus:ring-4 {dotClasses(
								position
							)}"
							aria-label="{string} string, finger {finger}"
							onclick={() => toggleSelection(position)}
						></button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	{#if !revealed}
		<button
			class="hover:bg-teal-600 bg-teal-500 text-white text-2xl p-2 rounded-md cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
			onclick={reveal}
		>
			Reveal
		</button>
	{:else}
		<button
			class="hover:bg-teal-600 bg-teal-500 text-white text-2xl p-2 rounded-md cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
			onclick={nextNote}
		>
			Next
		</button>
	{/if}
</div>
