<script setup>
import { useFetchData } from '../composables/useFetchData';
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const { data: products, error, loading } = useFetchData('https://fakestoreapi.com/products');
const cartStore = useCartStore();

const viewDetails = (productId) => {
  //navigate
  router.push(`/product/${productId}`);
};

const getProductQty = (product) => {
  const item = cartStore.cart.find(item => item.id === product.id);
  return item ? item.qty : 0;
};

</script>

<template>
  <div>
    <h1>Product Listing</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>

    <div v-if="!loading && !error">
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.title"/>
          <h2>{{ product.title ? product.title.slice(0, 50) : 'No Title Available' }}</h2>
          <p>{{ product.description ? product.description.slice(0, 100) : 'No Description Available' }}</p>
          <p>$ {{ product.price }}</p>
          
          <button @click="viewDetails(product.id)">View Details</button>
          
          <div v-if="cartStore.cart.find(item => item.id === product.id)">
            <button @click="cartStore.delCart(product)">-</button>
            <span>{{ getProductQty(product) }}</span>
            <button @click="cartStore.addCart(product)">+</button>
          </div>

          <button v-else @click="cartStore.addCart(product)">Add to Cart</button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
}

.product-card button {
  margin: 8px 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-card button:first-of-type {
  background-color: #007bff;
  color: #fff;
}

.product-card button:last-of-type {
  background-color: #28a745;
  color: #fff;
}

.product-card span {
  margin: 0 8px;
}
</style>
