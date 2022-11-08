<template>
    <div>
        <SearchForm @@search="handleSearch" :airports="airports" :loading="loading" />
        <Package v-for="pack in getPackages" :package="pack" :key="pack.id" :passengers="passengers" />
        <Alert v-show="msg" :msg="msg" :type="'alert-info'" />

        <div class="flex justify-center">
            <AppButton @click="page++" v-if="remainingItems"> {{ $t('Load more') }} </AppButton>
        </div>
    </div>
</template> 

<script setup lang="ts">
import type Search from '@/types/Search'

const passengers = ref(1)
const loading = ref(false)
const { getPackages, fetchPackages, airports, page, remainingItems } = await usePackages();
// page.value = 1
const msg = ref('')

const handleSearch = async (newSearch: Search) => {

    passengers.value = newSearch.passengers
    loading.value = true

    setTimeout(() => {
        fetchPackages(newSearch)
        loading.value = false
        msg.value = getPackages.value.length === 0
            ? 'No results'
            : ''
    }, 20);


}


</script>
