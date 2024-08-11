<!-- src/components/Cart.vue -->
<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

// Computed property to calculate the total price
const totalPrice = computed(() => {
  return cartStore.cart.reduce((total, item) => total + (item.price * item.qty), 0);
});
</script>

<template>
  <div>
    <h1>Cart</h1>
    <div v-if="cartStore.cart.length === 0">Your cart is empty.</div>
    <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
      <img :src="item.image" :alt="item.title" />
      <div class="item-details">
        <h2>{{ item.title }}</h2>
        <p>Price: {{ item.price.toFixed(2) }} USD</p>
        <p>Total: {{ (item.price * item.qty).toFixed(2) }} USD</p>

        <div class="quantity-controls">
          <button @click="cartStore.delCart(item)">-</button>
          <p>{{ item.qty }}</p>
          <button @click="cartStore.addCart(item)">+</button>
        </div>
      </div>
    </div>
    
    <!-- Display the total price -->
    <div class="total-price">
      <h2>Sub Price: {{ totalPrice.toFixed(2) }} USD</h2>
    </div>
    <button>Checkout</button>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 16px;
}

.cart-item img {
  max-width: 100px;
  margin-right: 16px;
}

.item-details {
  flex: 1;
}

.item-details h2 {
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls button {
  margin: 0 8px;
}

.total-price {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
