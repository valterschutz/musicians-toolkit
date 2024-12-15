<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';
	import { scale, fade } from 'svelte/transition';

	let generatedNums = $state([]);
	let numberOfNums = $state(5);

	function generateRandomNums() {
		// Generate 5 random numbers between 1 and 12, with no duplicates
		generatedNums = _.sampleSize(_.range(1, 13), numberOfNums);
	}

	// Map each number 1-12 to a letter
	const d = {
		1: 'C',
		2: 'C#',
		3: 'D',
		4: 'D#',
		5: 'E',
		6: 'F',
		7: 'F#',
		8: 'G',
		9: 'G#',
		10: 'A',
		11: 'A#',
		12: 'B'
	};

	const notes = $derived(generatedNums.map((num) => d[num]));
</script>

<div class="w-[332px] flex flex-col items-center gap-6">
	<div class="w-full flex flex-row justify-between items-center">
		<button
			class="hover:bg-teal-600 bg-teal-500 text-white text-3xl p-2 rounded-md cursor-pointer"
			onclick={generateRandomNums}
		>
			Generate
		</button>
		<input
			class="p-2 w-[80px] text-3xl rounded-md"
			type="number"
			max="12"
			bind:value={numberOfNums}
		/>
		<p class="text-3xl text-indigo-100">notes</p>
	</div>
	<ul class="flex flex-wrap gap-2 w-full">
		{#each notes as note, idx}
			<li
				class="transition-all rounded-md w-[60px] h-[60px] bg-indigo-700 text-indigo-100 flex justify-center items-center"
				key={idx}
				transition:fade
			>
				<p class="text-3xl cursor-default">{note}</p>
			</li>
		{/each}
	</ul>
</div>
