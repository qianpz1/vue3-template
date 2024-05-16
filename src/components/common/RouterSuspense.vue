<template>
    <router-view v-slot="{ Component, route  }">
        {{ cacheComponent(Component) }}
        <template v-if="Component">
            <transition :name="route .meta.transition || 'fade'">
                <keep-alive :include="alives">
                    <suspense timeout="0">
                        <template #default>
                            <div :key="route .path">
                                <component :is="Component || previousComponent"></component>
                            </div>
                        </template>
                        <template #fallback>
                            <Loading></Loading>
                        </template>
                    </suspense>
                </keep-alive>
            </transition>
        </template>
    </router-view>
</template>
<script setup lang="ts">
import Loading from '@/components/common/Loading.vue'
const route = useRoute()
const alives = ref<string[]>([])
const previousComponent = ref<Component|null>(null)

function cacheComponent(component: Component) {
    previousComponent.value = component || previousComponent.value;
}

watch(() => route.path, () => {
  const { name, meta } = route
  const temp = name?.toString()
  if (temp && meta?.keepAlive && !alives.value.includes(temp)) {
    alives.value.push(temp)
  }
})
</script>