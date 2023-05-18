<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Client } from '$lib/types/Client';

	let clients: Client[] = [
		{
			id: 'ABC-123',
			brand: 'Ford',
			model: 'Ford_One',
			odometer_readings: [12000, 24000, 36000],
			wheel_pairs: {
				pair1: { brand_name: 'BrandA', model_name: 'Model1' },
				pair2: { brand_name: 'BrandB', model_name: 'Model2' }
			}
		},
		{
			id: 'AB 123 CD',
			brand: 'Fiat',
			model: 'Fiat_One',
			odometer_readings: [5000, 10000, 15000],
			wheel_pairs: {
				pair1: { brand_name: 'BrandC', model_name: 'Model3' },
				pair2: { brand_name: 'BrandD', model_name: 'Model4' }
			}
		}
	];

	let colorPalette = [
		{ name: 'Red', shades: ['#FF0000', '#CC0000', '#990000', '#660000', '#330000'] },
		{ name: 'Orange', shades: ['#FFA500', '#CC7A00', '#995C00', '#663D00', '#331F00'] },
		{ name: 'Yellow', shades: ['#FFFF00', '#CCCC00', '#999900', '#666600', '#333300'] },
		{ name: 'Green', shades: ['#008000', '#006600', '#004C00', '#003300', '#001900'] },
		{ name: 'Blue', shades: ['#0000FF', '#0000CC', '#000099', '#000066', '#000033'] },
		{ name: 'Indigo', shades: ['#4B0082', '#3E0069', '#310050', '#230037', '#16001E'] },
		{ name: 'Violet', shades: ['#EE82EE', '#C869C8', '#A350A3', '#7D377D', '#562056'] },
		{ name: 'Brown', shades: ['#A52A2A', '#853F3F', '#653030', '#461E1E', '#270D0D'] },
		{ name: 'Gray', shades: ['#808080', '#666666', '#4C4C4C', '#333333', '#191919'] },
		{ name: 'Black', shades: ['#000000', '#000000', '#000000', '#000000', '#000000'] }
	];

	let selectedColor = '';

	const navigateToResource = (shade: string): void => {
		goto(`/resource/${shade.replace('#', '')}`);
	};

	let currentColorName = 'White';
	let currentPageColor = 'White';

	function changeColor(name: string, color: string) {
		currentColorName = name;
		currentPageColor = color;
		document.body.style.backgroundColor = color;
	}

	function handleKeydown(event: KeyboardEvent, name: string, color: string) {
		if (event.key === 'Enter') {
			changeColor(name, color);
		}
	}
</script>

<div class="container">
	<!-- {#each clients as car}
		<div>
			{car.id}
			{car.brand}
		</div>
	{/each} -->

	{#each colorPalette as palette}
		{#each palette.shades as shade}
			<div
				class="color"
				style="background-color: {shade};"
				tabindex="-1"
				on:click={() => changeColor(palette.name, shade)}
				on:keydown={(e) => handleKeydown(e, palette.name, shade)}
			>
				{shade}
			</div>
		{/each}
	{/each}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 5px;
		justify-items: center;
		width: max-content;
		margin: 0 auto;
		padding: 5px;
	}
	.color {
		width: 100px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
