import { defineStore } from 'pinia'
import { ref } from 'vue'
import { request } from '../lib/request'

export const useUserStore = defineStore('user', () => {
    const count = ref(0)
    function setCount(num: number) {
        count.value = num
    }
    const list = ref([])
    async function getApiData() {
        const res = await request.get('http://jsonplaceholder.typicode.com/posts')
        console.log('target res', res)
        // @ts-ignore
        list.value = res
    }
    return {
        count,
        setCount,
        getApiData,
        list
    }
})
