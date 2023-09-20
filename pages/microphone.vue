<script setup>

const level = ref(0);


 onMounted(()=> {
     navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
})
  .then(function(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);
    scriptProcessor.onaudioprocess = function() {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const arraySum = array.reduce((a, value) => a + value, 0);
      const average = arraySum / array.length;

      level.value = Math.round(average);

    };
  })
  .catch(function(err) {
    /* handle the error */
    console.error(err);
  });
 })
</script>
<template>
    <div :class="{'bg-red-400':level === 0, 'bg-green-400':level > 0}">
        <div class=" text-center" style="font-size:200px">
             <span class="rotate-90 inline-block" v-if="level > 0">:)</span>
        <span v-else class="rotate-90 inline-block">:(</span>
        </div>
    </div>


</template>