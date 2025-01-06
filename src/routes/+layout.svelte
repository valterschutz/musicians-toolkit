<script>
	import '../app.css';

	let selected = $state('');
	let { children } = $props();
</script>

<div class="w-full h-full flex flex-col items-center gap-6">
	<div class="h-14 w-full flex flex-row justify-around items-center">
		<a
			href="notes"
			class="text-3xl text-center font-bold font-sans underline"
			class:text-white={selected !== 'notes'}
			class:text-teal-200={selected === 'notes'}
			onclick={() => (selected = 'notes')}>Notes</a
		>
		<a
			href="chords"
			class="text-3xl text-center font-bold font-sans underline"
			class:text-white={selected !== 'chords'}
			class:text-teal-200={selected === 'chords'}
			onclick={() => (selected = 'chords')}>Chords</a
		>
	</div>
	{@render children()}
</div>
