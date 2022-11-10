<script setup lang="ts">
import Airport from '@/types/Airport';

defineProps<{
    modelValue: string,
    airports: Airport[]
}>()

defineEmits(['update:modelValue'])

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
                    {{ airport.PROVINCIA }}, {{ airport.CIUDAD }}
                </option>
            </select>
        </div>
    </div>
</template>