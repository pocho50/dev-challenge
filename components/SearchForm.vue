<script setup lang="ts">
import { ref } from 'vue';
import type Airport from '@/types/Airport'
import type Search from '@/types/Search'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import useAirports from '@/composables/useAirports';

const passengers = ref(1)
const origin = ref('')
const budget = ref(null)

// events
const emit = defineEmits<{
    (e: "@search", serach: Search): void;
}>();

const props = defineProps<{
    loading?: boolean
}>()

const handleSubmit = () => {
    emit("@search", {
        passengers: passengers.value,
        origin: origin.value,
        budget: budget.value
    });
}

const { airports, getAirportInfo } = await useAirports()

onMounted(() => {
    // preseleccionamos la primera opcion
    origin.value = airports.value[0].IATA
})
</script>
<template>
    <!-- Search Flight Form -->
    <div class="card w-full bg-base-content text-primary-content shadow-xl">
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <h2 class="card-title mb-3 text-base-100">{{ $t('Flights') }}</h2>
                <div class="flex  flex-wrap  flex-row mt-3 gap-x-2.5 ">
                    <div class="grow ">

                        <label class="label">
                            <span class="label-text text-base-100">{{ $t('Origin') }}</span>
                        </label>
                        <select v-model="origin" class="select w-full text-base-content">
                            <option :value="airport.IATA" v-for="airport in airports" :key="airport.IATA">
                                {{ getAirportInfo(airport) }}
                            </option>
                        </select>

                    </div>
                    <div class="shrink ">
                        <label class="label">
                            <span class="label-text text-base-100">{{ $t('Passengers') }}</span>
                        </label>
                        <vue-number-input v-model="passengers" class="text-black" size="large" :min="1" inline center
                            controls></vue-number-input>
                    </div>
                    <div class="flex-auto ">
                        <label class="label">
                            <span class="label-text text-base-100">{{ $t('Budget') }} ({{ $t('optional')
                            }})</span>
                        </label>
                        <input type="number" min="0" v-model="budget" :placeholder="$t('Budget')"
                            class="text-base-content input input-bordered w-full" />
                    </div>
                </div>

                <div class="card-actions justify-end mt-3">
                    <AppButton :loading="loading" type="submit" class="btn-accent">
                        {{ $t('Search') }}
                    </AppButton>
                </div>
            </form>
        </div>
    </div>
</template> 

