<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore'
import { XCircleIcon } from '@heroicons/vue/24/outline/index'
import type Package from '@/types/Package';
const cartStore = useCartStore();

const removeToCart = (pack: Package) => {
    cartStore.removePackage(pack)
}

</script>

<template>
    <div>
        <h1 class="text-3xl mb-5 font-bold">{{ $t('Your Cart') }}</h1>
        <div class="md:flex w-full">
            <div class="md:w-3/4">
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <thead>
                            <tr>
                                <th>{{ $t('Destination') }}</th>
                                <th>{{ $t('Date') }}</th>
                                <th>{{ $t('Passengers') }}</th>
                                <th>{{ $t('Price') }}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pack in cartStore.packages" :key="pack.id">
                                <td>{{ pack.destination.province }}, {{ pack.destination.city }}</td>
                                <td>{{ $d($getDate(pack.outwardFlight.date), 'short') }}</td>
                                <td>{{ pack.passengers }}</td>
                                <td>{{ $n(pack.totalPrice, 'currency') }}</td>
                                <td>
                                    <AppButton :icon="true">
                                        <XCircleIcon class="h-6 w-6 text-error" @click="removeToCart(pack)" />
                                    </AppButton>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="md:w-1/4 pl-5">
                <div class="card bg-base-200">
                    <div class="card-body">
                        <ul>
                            <li>
                                <strong>{{ $t('Total') }}</strong>:
                                {{ $n(cartStore.total, 'currency') }}
                            </li>
                        </ul>
                        <div class="card-actions justify-end w-full">
                            <AppButton class="btn-primary w-full">
                                {{ $t('Checkout') }}
                            </AppButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>