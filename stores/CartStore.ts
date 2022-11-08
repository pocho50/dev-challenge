import { defineStore, acceptHMRUpdate } from "pinia";
import type Package from "@/types/Package";
export const useCartStore = defineStore(
  "CartStore",
  () => {
    // state
    const packages = ref<Package[] | []>([]);

    // getters
    const count = computed((): number =>
      packages.value.reduce((acc, pack: Package) => acc + pack.passengers, 0)
    );
    const isEmpty = computed(() => count.value === 0);
    const total = computed((state) => {
      return packages.value.reduce((p, pack) => pack.totalPrice + p, 0);
    });

    // actions
    function removeProducts(productIds) {
      productIds = Array.isArray(productIds) ? productIds : [productIds];
      products.value = products.value.filter(
        (p) => !productIds.includes(p.sys.id)
      );
    }

    function addPackage(pack: Package) {
      const existingPackage = packages.value.find(
        (item) => pack.id === item.id
      );
      if (existingPackage) {
        existingPackage.passengers += pack.passengers;
        existingPackage.totalPrice += pack.totalPrice;
      } else {
        packages.value.push({ ...pack });
      }
      return packages;
    }

    return {
      packages,
      count,
      isEmpty,
      total,
      removeProducts,
      addPackage,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
