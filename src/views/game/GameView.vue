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

    console.log("unity canvas", unityCanvas.value)

    // 1. Initialize the unity configuration
    unityContext = new UnityWebgl({
        loaderUrl: "Build/WEBGL.loader.js",
        dataUrl: "Build/WEBGL.data",
        frameworkUrl: "Build/WEBGL.framework.js",
        codeUrl: "Build/WEBGL.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "UnityWebgl",
        productVersion: "0.1",
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
    width: 80%;
    height: 80%;
}
</style>