<script setup lang="ts">
import useAirports from '@/composables/useAirports';

defineProps<{
    modelValue: string
}>()

defineEmits(['update:modelValue'])

const { airports, getAirportInfo } = await useAirports()

</script>

<template>
    <div class="flex flex-row justify-end items-center mt-5">
        <div class="mr-3">
            <strong>{{ $t('Filter by destination') }}:</strong>
        </div>
        <div>
            <select :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
                class="inline select select-bordered w-full text-base-content">
                <option value="">{{ $t('All') }}</option>
                <option :value="airport.IATA" v-for="airport in airports" :key="airport.IATA">
                    {{ getAirportInfo(airport) }}
                </option>
            </select>
        </div>
    </div>
</template>