<script lang="ts">
	import { onMount } from 'svelte';
	import { load } from '$lib/services/load'
	import type { Client } from '$lib/types/Client';

	let clients: Client[] = [];
	let isLoading = true;

	onMount(async () => {
		try {
			const response = await load();
			clients = response.body;
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<div class="loading-spinner" />
{:else}
	<div class="grid">
		{#each clients as client (client.id)}
			<div class="card">
				<button class="collapsible">{client.brand} {client.model}</button>
				<div class="content">
					<p><strong>Client ID:</strong> {client.id}</p>
					<p><strong>Odometer Readings:</strong> {client.odometer_readings.join(', ')}</p>
					<div class="wheel-pairs">
						<div class="pair">
							<h4>Pair 1</h4>
							<p><strong>Tire Model:</strong> {client.wheel_pairs.pair1.tire_model.name}</p>
						</div>
						<div class="pair">
							<h4>Pair 2</h4>
							<p><strong>Tire Model:</strong> {client.wheel_pairs.pair2.tire_model.name}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.loading-spinner {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 5px solid #ccc;
		border-top-color: #333;
		animation: spinner 0.8s linear infinite;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
		justify-items: center;
		align-items: center;
		margin: 1rem;
	}

	.card {
		width: 100%;
		background-color: #f1f1f1;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.collapsible {
		width: 100%;
		text-align: left;
		background-color: #e0e0e0;
		padding: 0.5rem;
		border: none;
		outline: none;
		transition: background-color 0.3s;
		cursor: pointer;
	}

	.collapsible:hover {
		background-color: #ccc;
	}

	.content {
		display: none;
		padding: 1rem 0;
	}

	.content p {
		margin: 0.5rem 0;
	}

	.pair {
		margin-top: 1rem;
	}
</style>
