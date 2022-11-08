<script setup lang="ts">
import type Package from '@/types/Package';
import { useCartStore } from '@/stores/CartStore';
const props = defineProps<{
    package: Package,
    passengers: number
}>()

const cartStore = useCartStore()

const handleAddToCart = () => {
    if (availability.value > 0) {
        cartStore.addPackage(props.package);
    }
}

const availability = computed(() => {
    const packItem = cartStore.packages.find((pack: Package) => pack.id === props.package.id)

    if (packItem) {
        return props.package.availability - packItem.passengers
    }
    return props.package.availability
})

</script>

<template>
    <div class="border border-base-300 card my-5 bg-base-300 ">
        <div class="card-body">
            <div class="flex flex-col md:flex-row">
                <Flight type="Outward flight" :flight="package.outwardFlight" class="flex-auto md:w-2/6" />
                <Flight type="Return flight" :flight="package.returnFlight" class="flex-auto md:w-2/6 " />
                <div class="flex-auto md:w-1/6 ">{{ package.totalDays }} {{ $t('days') }}</div>
                <div class="flex-auto md:w-1/6 ">
                    {{ $t('Price') }}: {{ $n(package.totalPrice, 'currency') }} <br>
                    {{ $t('Passengers') }}: {{ passengers }} <br>
                    <strong>{{ $t('Total') }}: {{ $n(passengers * package.totalPrice, 'currency') }}</strong> <br>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div class="flex-auto md:w-5/6">
                    <span class="text-accent-focus font-semibold">{{ $t('Destination') }}:</span>
                    {{ package.destination.province }},
                    {{ package.destination.city }}
                </div>
                <div class="flex-auto md:w-1/6">
                    <AppButton class="btn-primary btn-sm block mt-3"
                        :disabled="!availability || availability < props.passengers" @click="handleAddToCart()">
                        {{ $t('Add to cart') }}
                    </AppButton>
                    <hr class="my-3" />
                    <strong> {{ $t('Availability') }}: {{ availability }}</strong>
                </div>
            </div>

        </div>
    </div>
</template>