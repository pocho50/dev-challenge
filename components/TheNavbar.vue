<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'

const { siteName } = useAppConfig();

const isDark = useDark({
  attribute: 'data-theme',
});
const toggleDark = useToggle(isDark)
</script>
<template>

  <div class="navbar bg-base-100 shadow-md">
    <div class="container mx-auto">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">{{
            siteName
        }}</NuxtLink>
      </div>
      <!-- Right Side -->
      <div class="flex-none">
        <AppButton :icon="true" @click="toggleDark()">
          <component :is="isDark ? MoonIcon : SunIcon" class="h-6 w-6" />
        </AppButton>

        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost btn-circle">
            <ShoppingCartIcon class="h-6 w-6" />

          </button>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
