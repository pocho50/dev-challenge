<template>
    <div>
        <SearchForm @@search="handleSearch" :loading="loading" />
        <FilterByDestination v-if="totalCount > 0" v-model="destination" />
        <Package v-for="pack in getPackages" :package="pack" :key="pack.id" :passengers="passengers" />
        <Alert v-show="showMsg" :msg="showMsg" :type="'alert-info'" />

        <div class="flex justify-center">
            <AppButton @click="page++" v-if="remainingItems"> {{ $t('Load more') }} </AppButton>
        </div>
    </div>
</template> 

<script setup lang="ts">
import type Search from '@/types/Search'

const passengers = ref(1)
const loading = ref(false)

const { getPackages,
    fetchPackages,
    page,
    remainingItems,
    destination,
    totalCount } = await usePackages();

const activeSearch = ref(false)

const handleSearch = async (newSearch: Search) => {

    passengers.value = newSearch.passengers
    loading.value = true
    destination.value = ''

    setTimeout(() => {
        fetchPackages(newSearch)
        loading.value = false
        activeSearch.value = true
    }, 20);

}

const showMsg = computed(() => {
    return getPackages.value.length === 0 && activeSearch.value !== false
        ? 'No results'
        : ''
})

</script>
