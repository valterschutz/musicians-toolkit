<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';
	import NoteStaff from './NoteStaff.svelte';
	import Fingerboard from './Fingerboard.svelte';
	import { positions, positionKey, pitchKey, uniquePitches, type Position } from './theory';

	let currentPitch = $state(_.sample(uniquePitches) as Position);
	let selectedKeys = $state<Set<string>>(new Set());
	let revealed = $state(false);

	const correctPositions = $derived(
		positions.filter((p) => pitchKey(p) === pitchKey(currentPitch))
	);
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
		currentPitch = _.sample(
			uniquePitches.filter((p) => pitchKey(p) !== pitchKey(currentPitch))
		) as Position;
		selectedKeys = new Set();
		revealed = false;
	}
</script>

<div class="flex flex-col items-center gap-6 p-2 w-[348px]">
	<p class="text-white text-2xl">Where is this note?</p>
	<NoteStaff step={currentPitch.step} accidental={currentPitch.accidental} />

	<Fingerboard {selectedKeys} {correctKeys} {revealed} onToggle={toggleSelection} />

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
