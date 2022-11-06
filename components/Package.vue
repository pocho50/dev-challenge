<script setup lang="ts">
import type Package from '@/types/Package';
const props = defineProps<{
    package: Package,
    passengers: number
}>()

</script>

<template>
    <div class="border border-base-300 card my-5 bg-base-100 ">
        <div class="card-body">
            <div class="flex flex-col md:flex-row">
                <Flight type="Outward flight" :flight="package.outwardFlight" class="flex-auto grow " />
                <Flight type="Return flight" :flight="package.returnFlight" class="flex-auto grow " />
                <div class="flex-auto ">{{ package.totalDays }} dias</div>
                <div class="flex-auto ">
                    Price: {{ $n(package.totalPrice, 'currency') }} <br>
                    {{ $t('Passengers') }}: {{ passengers }} <br>
                    <strong>Total: {{ $n(passengers * package.totalPrice, 'currency') }}</strong>
                </div>

            </div>
            <div>
                <span class="text-accent-focus font-semibold">Destino:</span>
                {{ package.destination.province }},
                {{ package.destination.city }}

            </div>

        </div>
    </div>
</template>