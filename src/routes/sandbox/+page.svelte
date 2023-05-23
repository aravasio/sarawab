<!-- src/routes/start.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let link: HTMLAnchorElement;
	let stream: MediaStream;
	let downloadLink: HTMLAnchorElement;

	onMount(async () => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			stream = await navigator.mediaDevices.getUserMedia({ video: true });
			video.srcObject = stream;
			await video.play();
		}
	});

	onDestroy(() => {
		if (stream) {
			stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
		}
	});

	async function takePicture() {
		const context = canvas.getContext('2d');
		if (context) {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(async (blob: Blob | null) => {
				if (blob) {
					const plate = await extractPlate(blob);
					goto(`/client/${plate}`);
				}
			});
		}
	}

	async function storePicture() {
		const context = canvas.getContext('2d');
		if (context) {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob((blob: Blob | null) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					link.href = url;
					link.download = 'picture.png';
					link.click();
					URL.revokeObjectURL(url); // Clean up after ourselves.
				}
			});
		}
	}

	async function saveToComputer() {
		const context = canvas.getContext('2d');
		if (context) {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob((blob: Blob | null) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					downloadLink.href = url;
					downloadLink.download = 'picture.png'; // Name of the downloaded file
					downloadLink.click(); // Programmatically click the link to start the download
					URL.revokeObjectURL(url); // Clean up by revoking the Blob URL
				}
			});
		}
	}

	function extractPlate(blob: Blob) {
		// Call your hypothetical API to recognize license plate from the picture
		// Let's assume the API responds with the recognized license plate number
		// For example, using fetch:
		return fetch('http://api.licenseplaterecognition.com', {
			method: 'POST',
			body: blob
		})
			.then((response) => response.json())
			.then((data) => {
				const plate = data.plate; // Extract plate from response
				return formatPlate(plate); // Format plate
			});
	}

	function formatPlate(plate: String) {
		// Remove spaces and validate plate format
		const formatted = plate.replace(/\s+/g, '');
		const format1 = /^[A-Z]{3}[0-9]{3}$/;
		const format2 = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
		if (format1.test(formatted) || format2.test(formatted)) {
			return formatted;
		} else {
			throw new Error('Invalid license plate format.');
		}
	}
</script>

<video bind:this={video} width="640" height="480" autoplay />
<canvas bind:this={canvas} width="640" height="480" />
<button on:click={takePicture}>Take a picture to start</button>
<button on:click={storePicture}>Store picture</button>
<a bind:this={downloadLink} style="display: none;"></a> <!-- Hidden link for downloading -->
<button on:click={saveToComputer}>Save to computer</button>