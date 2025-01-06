<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';
	import { scale, fade } from 'svelte/transition';

	const notes = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
	// TODO: check if these are correct
	const chordsPerKey = {
		C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
		G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
		D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
		A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
		E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
		B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
		'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'],
		Db: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
		Ab: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
		Eb: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
		Bb: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
		F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim']
	};

	const numeralMap = {
		1: 'I',
		2: 'ii',
		3: 'iii',
		4: 'IV',
		5: 'V',
		6: 'vi',
		7: 'vii°'
	};

	let chosenKey = $state('C');
	let numChords = $state(1);
	let generatedNums = $state([]);
	let realNums = $derived(generatedNums.concat(1));
	let realChords = $derived(realNums.map((num) => chordsPerKey[chosenKey][num - 1]));
	let showChords = $state(false);
</script>

<div class="flex flex-col items-center gap-6 p-2 w-[348px]">
	<div class="flex flex-col items-center gap-2">
		<p class="text-white text-2xl">Choose a key:</p>
		<ul class="flex flex-wrap gap-2 w-full">
			{#each notes as note}
				<button
					class="text-2xl text-white rounded-md w-[60px] h-[60px] flex justify-center items-center cursor-pointer focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
					class:bg-red-700={chosenKey === note}
					class:bg-red-900={chosenKey !== note}
					onclick={() => {
						chosenKey = note;
					}}
				>
					{note}
				</button>
			{/each}
		</ul>
	</div>
	<div class="flex flex-row gap-6 items-center justify-between">
		<button
			class="hover:bg-teal-600 bg-teal-500 text-white text-2xl p-2 rounded-md cursor-pointer outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
			onclick={() => {
				generatedNums = _.sampleSize(_.range(2, 8), numChords - 1);
				console.log(generatedNums);
			}}
		>
			Generate
		</button>
		<input type="number" class="text-2xl p-2 w-[75px]" bind:value={numChords} min="1" max="7" />
		<span class="text-2xl text-white">chords</span>
	</div>
	<input type="range" min="1" max="7" bind:value={numChords} class="w-4/5" />
	<ul class="flex flex-wrap gap-2 w-full">
		{#each realNums as num}
			<li
				class="transition-all rounded-md w-[60px] h-[60px] bg-indigo-700 text-indigo-100 flex justify-center items-center"
				transition:fade
			>
				<p class="text-3xl cursor-default">{numeralMap[num]}</p>
			</li>
		{/each}
	</ul>
	<div class="flex flex-row items-center gap-2">
		<label for="showChords" class="text-2xl text-white">Show chords?</label>
		<input id="showChords" class="size-5" type="checkbox" bind:checked={showChords} />
	</div>
	{#if showChords}
		<ul class="flex flex-wrap gap-2 w-full">
			{#each realChords as chord}
				<li
					class="transition-all rounded-md w-[105px] h-[60px] bg-indigo-700 text-indigo-100 flex justify-center items-center"
					transition:fade
				>
					<p class="text-3xl cursor-default">{chord}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>
