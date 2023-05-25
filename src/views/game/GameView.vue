<template>
    <canvas id="unity-canvas" tabindex="-1"></canvas>
</template>


<script setup>

import {onMounted, ref} from "vue";
import UnityWebgl from "unity-webgl";

let unityContext;

const unityCanvas = ref();

onMounted(() => {

    unityCanvas.value = document.querySelector("#unity-canvas")

    const prefix = import.meta.env.VITE_UNITY_BUILD_ID;


    // 1. Initialize the unity configuration
    unityContext = new UnityWebgl({
        loaderUrl: "Build/" + prefix + ".loader.js",
        dataUrl: "Build/" + prefix + ".data",
        frameworkUrl: "Build/" + prefix + ".framework.js",
        codeUrl: "Build/" + prefix + ".wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Security Amsterdam",
        productName: "Security Amsterdam",
        productVersion: "1.0",
        matchWebGLToCanvasSize: true,
        devicePixelRatio: 1,
    });

    unityContext.setFullscreen(true)

    // 2. Append the canvas to the component
    unityContext.create(unityCanvas.value)
})

</script>




<style scoped>

#unity-canvas {
    width: 100%;
    height: 100%;
}
</style>