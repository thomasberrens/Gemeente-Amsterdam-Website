<template>
    <div id="unity-container"></div>
</template>

<script>
import UnityLoader from '@/assets/unity/UnityLoader.js';

export default {
    name: 'UnityComponent',
    setup() {
        const createApp = (unityContainer) => {
            const unityInstance = UnityLoader.instantiate(unityContainer, 'Build/Unity.json', { onProgress: UnityProgress });

            return Vue.createApp({
                created() {
                    // This is where you can define any methods or data that your Vue app needs
                },
            });
        };

        return {
            createApp,
        };
    },
};
</script>
