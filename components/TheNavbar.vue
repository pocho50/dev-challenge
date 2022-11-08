<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const { siteName } = useAppConfig();

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'business',
  valueLight: 'autumn'
});
const toggleDark = useToggle(isDark)
</script>
<template>

  <div class="navbar bg-base-100 shadow-md">
    <div class="container mx-auto">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">
          {{ siteName }}
        </NuxtLink>
      </div>
      <!-- Right Side -->
      <div class="flex-none">
        <AppButton :icon="true" @click="toggleDark()">
          <component :is="isDark ? MoonIcon : SunIcon" class="h-6 w-6" />
        </AppButton>

        <CartStoreIcon />
      </div>
      <select class="select w-20 max-w-xs" v-model="$i18n.locale">
        <option value="es-AR">ES</option>
        <option value="en-US">EN</option>

      </select>
    </div>
  </div>
</template>
