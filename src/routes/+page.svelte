<script lang="ts">
	import _ from 'lodash';
	import '@fontsource/risque';

	let nums = $state([1, 2, 3, 4, 5]);

	function generateRandomNums() {
		// Generate 5 random numbers between 1 and 12, with no duplicates
		nums = _.sampleSize(_.range(1, 13), 5);
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

	const notes = $derived(nums.map((num) => d[num]));
</script>

<div class="flex-center">
	<div class="content">
		<button class="gen-button" onclick={generateRandomNums}> Generate 5 random notes </button>
		<ul class="notes-ul">
			{#each notes as note, idx}
				<li class="note-li" key={idx}>
					<p class="note-p">{note}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	:global(body) {
		background-color: #1e1e2e; /* Base */
		/* color: yellow; */
		margin: 0px;
		font-family: 'Risque', serif;
		font-weight: 400;
		font-style: normal;
	}
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.gen-button {
		color: #11111b; /* Crust */
		background-color: #cba6f7; /* Mauve */
		font-size: 1.5em;
		border: 0px;
		padding: 10px;
		border-radius: 5px;
		font-family: 'Risque', serif;
	}

	.notes-ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		padding: 0;
		gap: 10px;
	}

	.note-li {
		width: 50px;
		height: 50px;
		background-color: #89dceb; /* Sky */
		color: #11111b; /* Crust */
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5em;
	}
</style>
