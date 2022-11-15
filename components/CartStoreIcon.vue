<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore'
import { ShoppingCartIcon, XCircleIcon } from '@heroicons/vue/24/outline/index'
import type Package from '@/types/Package';

const cartStore = useCartStore()

const removeToCart = (pack: Package) => {
    cartStore.removePackage(pack)
}

</script>
<template>
    <div class="dropdown dropdown-end static md:relative">
        <AppButton :icon="true" class="relative">
            <ShoppingCartIcon class="h-6 w-6" />
            <span v-show="!cartStore.isEmpty" class="badge badge-sm badge-info absolute right-px top-px">{{
                    cartStore.count
            }}</span>
        </AppButton>
        <ul v-if="!cartStore.isEmpty" tabindex="0" class="dropdown-content p-4 shadow bg-base-100 rounded-box w-auto ">
            <li v-for="pack in cartStore.packages" :key="pack.id" class="flex flex-row items-center py-2 flex-nowrap">
                <div class="flex-none p-1 w-auto md:w-8">{{ pack.passengers }} x</div>
                <div class="flex-none  p-1 w-auto md:w-44">{{ pack.destination.province }}, {{ pack.destination.city }}
                    <br> {{
                            $d($getDate(pack.outwardFlight.date), 'short')
                    }}
                </div>
                <div class="flex-none p-1 w-auto md:w-24">{{ $n(pack.totalPrice, 'currency') }}</div>
                <div class="flex-none p-1 w-auto md:w-20">
                    <AppButton :icon="true">
                        <XCircleIcon class="h-6 w-6 text-error" @click.stop="removeToCart(pack)" />
                    </AppButton>
                </div>

            </li>
            <li class="flex flex-row justify-between border-t-2 border-base-300 py-2">
                <div>
                    <NuxtLink to="/cart" class="btn btn-primary btn-sm">
                        {{ $t('View cart') }}
                    </NuxtLink>
                </div>
                <div>

                    <strong>{{ $t('Total') }}: {{ $n(cartStore.total, 'currency') }}</strong>
                </div>
            </li>
        </ul>
    </div>
</template>