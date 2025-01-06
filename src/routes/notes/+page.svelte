<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';
	import { scale, fade } from 'svelte/transition';

	let generatedNums = $state([]);
	let numberOfNums = $state(1);
	let sharpsIncluded = $state(false);
	let flatsIncluded = $state(false);

	function generateRandomNums() {
		// Generate 5 random numbers between 1 and 12, with no duplicates
		generatedNums = _.sampleSize(_.range(1, notesArr.length), numberOfNums);
	}

	const normalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
	const flatNotes = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
	const sharpNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];

	// Depending on the user's selection (sharpsIncluded, flatsIncluded), merge the notes arrays
	const notesArr = $derived(
		sharpsIncluded && flatsIncluded
			? [...normalNotes, ...flatNotes, ...sharpNotes]
			: sharpsIncluded
				? [...normalNotes, ...sharpNotes]
				: flatsIncluded
					? [...normalNotes, ...flatNotes]
					: normalNotes
	);

	const notes = $derived(generatedNums.map((num) => notesArr[num]));
</script>

<div class="flex flex-col items-center gap-6 p-2 w-[348px]">
	<div>
		<label for="flats" class="text-white text-2xl mr-2">Include flats?</label>
		<input id="flats" type="checkbox" class="size-5" bind:checked={flatsIncluded} />
	</div>
	<div>
		<label for="sharps" class="text-white text-2xl mr-2">Include sharps?</label>
		<input id="sharps" type="checkbox" class="size-5" bind:checked={sharpsIncluded} />
	</div>
	<div class="w-full flex flex-row justify-between items-start gap-4">
		<button
			class="hover:bg-teal-600 bg-teal-500 text-white text-2xl p-2 rounded-md cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
			onclick={generateRandomNums}
		>
			Generate
		</button>
		<div class="flex flex-col items-center gap-4">
			<input type="number" class="text-2xl p-2 w-[75px]" bind:value={numberOfNums} />
		</div>
		<p class="text-3xl text-indigo-100">notes</p>
	</div>
	<input type="range" min="1" max={notesArr.length} bind:value={numberOfNums} class="w-4/5" />
	<ul class="flex flex-wrap gap-2 w-full">
		{#each notes as note, idx}
			<li
				class="transition-all rounded-md w-[60px] h-[60px] bg-indigo-700 text-indigo-100 flex justify-center items-center"
				transition:fade
			>
				<p class="text-3xl cursor-default">{note}</p>
			</li>
		{/each}
	</ul>
</div>
