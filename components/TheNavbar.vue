<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/CartStore';

const { siteName } = useAppConfig();

const cartStore = useCartStore()

const isDark = useDark({
  attribute: 'data-theme',
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

        <div class="dropdown dropdown-end">
          <AppButton :icon="true">
            <ShoppingCartIcon class="h-6 w-6" />
            <span v-show="!cartStore.isEmpty" class="badge badge-sm badge-info absolute right-px top-px">{{
                cartStore.count
            }}</span>
          </AppButton>
          <ul v-if="!cartStore.isEmpty" tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96">
            <li v-for="pack in cartStore.packages" :key="pack.id" class="flex flex-row justify-between">
              <div class="flex-auto">{{ pack.passengers }} x</div>
              <div class="flex-auto">{{ pack.destination.province }}, {{ pack.destination.city }} <br> {{
                  $d($getDate(pack.outwardFlight.date), 'short')
              }}</div>
              <div class="flex-auto">{{ $n(pack.totalPrice, 'currency') }}</div>

            </li>
            <li class="flex flex-row justify-end border-t-2 border-base-300 ">
              <div>
                <strong>{{ $t('Total') }}: {{ $n(cartStore.total, 'currency') }}</strong>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <select class="select w-20 max-w-xs" v-model="$i18n.locale">
        <option value="es-AR">ES</option>
        <option value="en-US">EN</option>

      </select>
    </div>
  </div>
</template>
