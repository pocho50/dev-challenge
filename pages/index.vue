<template>
    <div>
        <SearchForm @@search="handleSearch" :airports="airports" :loading="loading" />
        <Package v-for="pack in getPackages" :package="pack" :key="pack.id" :passengers="passengers" />
    </div>
</template> 

<script setup lang="ts">
import type Search from '@/types/Search'

const passengers = ref(1)
const loading = ref(false)
const { getPackages, fetchPackages, airports } = await usePackages();

const handleSearch = async (newSearch: Search) => {

    passengers.value = newSearch.passengers
    loading.value = true

    setTimeout(() => {
        fetchPackages(newSearch)
        loading.value = false
    }, 20);

}


</script>
