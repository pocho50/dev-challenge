<script setup lang="ts">
const props = defineProps({
  loading: { type: Boolean, default: false },
  icon: { type: Boolean, default: false }
});

const btnclass = computed(() => {
  return {
    'btn-ghost btn-circle': props.icon,
    loading: props.loading
  }

})
</script>
<template>
  <button v-bind="$attrs" class="btn" :class="btnclass">
    <slot></slot>
  </button>
</template>
