<template>
    <nut-tabbar
        @tab-switch="tabSwitch"
        v-model="selected"
        :unactive-color="color"
        :active-color="selectedColor"
    >
        <nut-tabbar-item v-for="item in list" :key="item.text" :tab-title="item.text">
            <template #icon>
                <view class="iconfont" :class="item.icon"></view>
            </template>
        </nut-tabbar-item>
    </nut-tabbar>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { useUtilsStore } from '@/store'
import { computed, onMounted, reactive, ref } from 'vue'

const utileStore = useUtilsStore()
const selected = computed({
    get() {
        return utileStore.tabBarIndex
    },
    set(idx) {
        utileStore.setTabBarIndex(idx)
    }
})

const color = '#333333'
const selectedColor = '#FC592E'
const list = reactive([
    {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: 'icon-shouye-weixuanzhongx'
    },
    // {
    //   pagePath: '/pages/cate/index',
    //   text: '分类'
    // },
    // {
    //   pagePath: '/pages/cart/index',
    //   text: '购物车'
    // },
    {
        pagePath: '/pages/user/index',
        text: '个人中心',
        icon: 'icon-wode-weixuanzhongx'
    }
])

const tabSwitch = (item: Record<'pagePath', string>, index: number) => {
    selected.value = index
    const url = list[index].pagePath
    Taro.switchTab({ url })
}
</script>
<script lang="ts">
export default {
    options: {
        addGlobalClass: true
    }
}
</script>
<style lang="less">
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
    background-color: rgba(0, 0, 0, 0.33);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
}

.tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.tab-bar-item cover-image {
    width: 54px;
    height: 54px;
}

.tab-bar-item cover-view {
    font-size: 20px;
}
.iconfont {
    font-size: 50px;
}
</style>
