<template>
    <view class="user pb-14 box-border px-4">
        个人中心
        <view class="mt-3 text-sm" v-for="item in list" :key="item.id">{{ item.title }}</view>
    </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const list = computed(() => userStore.list)
userStore.getApiData()
</script>

<style>
.user {
}
</style>
