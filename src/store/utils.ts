import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilsStore = defineStore('utils', () => {
    const tabBarIndex = ref(0)
    function setTabBarIndex(idx: number) {
        tabBarIndex.value = idx
    }
    return {
        tabBarIndex,
        setTabBarIndex
    }
})
