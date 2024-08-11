<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="navbar">
    <nav>
      <RouterLink to="/">Products</RouterLink> |
      <RouterLink to="/cart">Cart</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>