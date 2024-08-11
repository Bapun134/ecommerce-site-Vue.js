// src/composables/useFetchData.js
import { ref } from 'vue';
import axios from 'axios';

export function useFetchData(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, error, loading };
}
