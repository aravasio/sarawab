<!-- src/routes/start.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
    let video;
    let canvas;
    let stream;
  
    // Start the video stream when the component mounts
    onMount(async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
      }
    });
  
    // Stop the video stream when the component is destroyed
    onDestroy(() => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
  
    async function takePicture() {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => {
        goto(`/client/${extractPlate(blob)}`);
      });
    }
  
    // ... The rest of your script remains the same ...
  </script>
  
  <video bind:this={video} width="640" height="480" autoplay></video>
  <canvas bind:this={canvas} width="640" height="480"></canvas>
  <button on:click={takePicture}>Take a picture to start</button>
  