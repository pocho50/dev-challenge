<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <button class="btn" :class="icon ? 'btn-ghost btn-circle' : ''">
    <slot></slot>
  </button>
</template>
