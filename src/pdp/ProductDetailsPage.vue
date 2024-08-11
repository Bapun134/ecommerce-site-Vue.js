<!-- src/components/ProductDetailsPage.vue -->
<script setup>
import { useRoute } from 'vue-router';
import { useFetchData } from '../composables/useFetchData';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

const route = useRoute();
const productId = route.params.id;

const { data: product, error, loading } = useFetchData(`https://fakestoreapi.com/products/${productId}`);

const getProductQty = (product) => {
    const item = cartStore.cart.find(item => item.id === product.id);
    return item ? item.qty : 0;
};

</script>


<template>
    <div class="product-details" v-if="!loading && !error">
        <div class="container">
            <div class="product-image">
                <img :src="product.image" :alt="product.title" />
            </div>
            <div class="product-info">
                <h1>{{ product.title }}</h1>
                <p class="price">$ {{ product.price.toFixed(2) }}</p>
                <p class="description">{{ product.description }}</p>

                <div v-if="cartStore.cart.find(item => item.id === product.id)">
                    <button @click="cartStore.delCart(product)">-</button>
                    <span>{{ getProductQty(product) }}</span>
                    <button @click="cartStore.addCart(product)">+</button>
                </div>

                <button v-else @click="cartStore.addCart(product)">Add to Cart</button>
            </div>
        </div>
    </div>

    <div v-else-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
</template>



<style scoped>
.product-details {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    gap: 20px;
}

.product-image {
    flex: 1;
    max-width: 500px;
}

.product-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
    flex: 2;
}

.product-info h1 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.product-info .price {
    font-size: 1.5rem;
    color: #e91e63;
    margin-bottom: 20px;
}

.product-info .description {
    font-size: 1rem;
    color: #333;
    margin-bottom: 20px;
}

.back-button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #0056b3;
}
</style>