<template>
    <!-- Search Flight Form -->
    <div>
        <div class="p-4">
            <div class="card w-full bg-base-content text-primary-content">
                <div class="card-body">
                    <form>
                        <h2 class="card-title mb-3">{{ $t('Flights') }}</h2>
                        <div class="flex  flex-wrap  flex-row mt-3 gap-x-2.5 ">
                            <div class="grow ">

                                <label class="label">
                                    <span class="label-text text-white">{{ $t('Origin') }}</span>
                                </label>
                                <select class="select w-full text-base-content">
                                    <option v-for="airport in airports" :key="airport.IATA">
                                        {{ getAirportInfo(airport) }}
                                    </option>
                                </select>

                            </div>
                            <div class="shrink ">
                                <label class="label">
                                    <span class="label-text text-white">{{ $t('Passengers') }}</span>
                                </label>
                                <vue-number-input class="text-base-content" size="large" :model-value="1" :min="1"
                                    inline center controls></vue-number-input>
                            </div>
                            <div class="flex-auto ">
                                <label class="label">
                                    <span class="label-text text-white">{{ $t('Budget') }} ({{ $t('optional')
                                    }})</span>
                                </label>
                                <input type="number" :placeholder="$t('Budget')"
                                    class="text-base-content input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="card-actions justify-end mt-3">
                            <button class="btn">{{ $t('Search') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import type Airport from '@/types/Airport'
import VueNumberInput from '@chenfengyuan/vue-number-input';
const { data: airports } = await useFetch('/api/airports');

const getAirportInfo = (airport: Airport) => {
    return `${airport.PROVINCIA}, ${airport.CIUDAD} - ${airport.AEROPUERTO}`
}
</script>
