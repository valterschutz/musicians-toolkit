<script lang="ts">
	import { strings, fingers, positions, positionKey, type Position } from './theory';

	let {
		selectedKeys,
		correctKeys,
		revealed,
		onToggle
	}: {
		selectedKeys: Set<string>;
		correctKeys: Set<string>;
		revealed: boolean;
		onToggle: (position: Position) => void;
	} = $props();

	const width = 300;
	const height = 420;
	const nutY = 30;
	const neckBottomY = 400;
	const topWidth = 130;
	const bottomWidth = 220;
	const centerX = width / 2;
	// open, finger 1, 2, 3, 4
	const rowYs = [55, 125, 195, 265, 335];

	function widthAt(pointY: number) {
		const t = (pointY - nutY) / (neckBottomY - nutY);
		return topWidth + (bottomWidth - topWidth) * t;
	}

	function stringX(index: number, pointY: number) {
		const w = widthAt(pointY);
		const left = centerX - w / 2;
		return left + ((index + 0.5) * w) / strings.length;
	}

	const neckTopLeft = centerX - widthAt(nutY) / 2;
	const neckTopRight = centerX + widthAt(nutY) / 2;
	const neckBottomLeft = centerX - widthAt(neckBottomY) / 2;
	const neckBottomRight = centerX + widthAt(neckBottomY) / 2;

	function markerState(position: Position) {
		const key = positionKey(position);
		const isSelected = selectedKeys.has(key);
		const isCorrect = correctKeys.has(key);
		if (!revealed) return isSelected ? 'selected' : 'idle';
		if (isSelected && isCorrect) return 'correct';
		if (isSelected && !isCorrect) return 'wrong';
		if (!isSelected && isCorrect) return 'missed';
		return 'idle';
	}

	const filledClasses: Record<string, string> = {
		idle: 'bg-indigo-900',
		selected: 'bg-teal-500',
		correct: 'bg-green-500',
		wrong: 'bg-red-500',
		missed: 'bg-amber-500'
	};

	const openClasses: Record<string, string> = {
		idle: 'bg-transparent border-indigo-100',
		selected: 'bg-teal-500 border-teal-500',
		correct: 'bg-green-500 border-green-500',
		wrong: 'bg-red-500 border-red-500',
		missed: 'bg-amber-500 border-amber-500'
	};
</script>

<div class="relative" style="width: {width}px; height: {height}px;">
	<svg {width} {height} viewBox="0 0 {width} {height}" class="absolute inset-0">
		<path
			d="M {neckTopLeft} {nutY} L {neckTopRight} {nutY} L {neckBottomRight} {neckBottomY} L {neckBottomLeft} {neckBottomY} Z"
			fill="#3b2418"
		/>
		<line
			x1={neckTopLeft}
			y1={nutY}
			x2={neckTopRight}
			y2={nutY}
			stroke="#1a0f08"
			stroke-width="6"
		/>
		{#each strings as _string, i}
			<line
				x1={stringX(i, nutY)}
				y1={nutY}
				x2={stringX(i, neckBottomY)}
				y2={neckBottomY}
				stroke="#cbd5e1"
				stroke-width="1.5"
			/>
		{/each}
	</svg>

	{#each strings as string, sIdx}
		{#each fingers as finger, fIdx}
			{@const position = positions.find((p) => p.string === string && p.finger === finger)}
			{@const rowY = rowYs[fIdx]}
			{@const x = stringX(sIdx, rowY)}
			{@const state = markerState(position as Position)}
			<button
				class="absolute rounded-full transition-colors cursor-pointer outline-none focus:ring-4 {finger ===
				0
					? `size-6 border-4 ${openClasses[state]}`
					: `size-6 ${filledClasses[state]}`}"
				style="left: {x}px; top: {rowY}px; transform: translate(-50%, -50%);"
				aria-label="{string} string, {finger === 0 ? 'open' : `finger ${finger}`}"
				onclick={() => onToggle(position as Position)}
			></button>
		{/each}
	{/each}
	{#each strings as string, sIdx}
		<p
			class="absolute text-white text-sm"
			style="left: {stringX(sIdx, nutY)}px; top: {nutY - 24}px; transform: translateX(-50%);"
		>
			{string}
		</p>
	{/each}
</div>
