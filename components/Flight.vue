<script setup lang="ts">
import type Flight from '@/types/Flight';
import { CalendarDaysIcon } from '@heroicons/vue/24/outline';
const props = defineProps<{
    flight: Flight,
    type: string
}>()

</script>

<template>
    <div>
        <span class="font-semibold">{{ type }}</span> |
        <CalendarDaysIcon class="h-6 w-6 inline" /> {{ $d($getDate(flight.date), 'short') }} <br>
        {{ flight.origin }} - {{ flight.destination }}

    </div>
</template>