<script lang="ts">
	let { step, accidental }: { step: number; accidental: boolean } = $props();

	const width = 220;
	const height = 340;
	const topLineY = 120;
	const lineSpacing = 20;
	const noteX = 150;

	// Step 8 is the top line (F5); each step moves half a line-spacing.
	function y(s: number) {
		return topLineY + (8 - s) * (lineSpacing / 2);
	}

	function ledgerSteps(s: number): number[] {
		const steps: number[] = [];
		if (s <= -2) {
			const nearest = s % 2 === 0 ? s : s + 1;
			for (let l = -2; l >= nearest; l -= 2) steps.push(l);
		} else if (s >= 10) {
			const nearest = s % 2 === 0 ? s : s - 1;
			for (let l = 10; l <= nearest; l += 2) steps.push(l);
		}
		return steps;
	}

	const staffLines = [0, 1, 2, 3, 4].map((i) => topLineY + i * lineSpacing);
	const ledgers = $derived(ledgerSteps(step));
	const noteY = $derived(y(step));
</script>

<svg viewBox="0 0 {width} {height}" {width} {height} class="text-indigo-100">
	<g stroke="currentColor" stroke-width="1.5">
		{#each staffLines as lineY}
			<line x1="20" y1={lineY} x2={width - 20} y2={lineY} />
		{/each}
	</g>

	<!-- treble clef -->
	<g fill="none" stroke="#facc15" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
		<circle cx="60" cy="83" r="15" />
		<path d="M 48 95 C 38 108, 88 120, 82 150 C 78 168, 64 172, 60 180" />
		<circle cx="68" cy="182" r="18" />
		<path d="M 60 198 C 54 210, 40 216, 42 228" />
		<circle cx="52" cy="232" r="9" />
	</g>

	{#each ledgers as ledgerY}
		<line
			x1={noteX - 16}
			x2={noteX + 16}
			y1={y(ledgerY)}
			y2={y(ledgerY)}
			stroke="currentColor"
			stroke-width="1.5"
		/>
	{/each}

	{#if accidental}
		<text x={noteX - 28} y={noteY + 7} font-size="26" fill="currentColor">♯</text>
	{/if}

	<ellipse
		cx={noteX}
		cy={noteY}
		rx="11"
		ry="8"
		transform="rotate(-20 {noteX} {noteY})"
		fill="currentColor"
	/>
</svg>
