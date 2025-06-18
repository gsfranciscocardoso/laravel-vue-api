<template>
  <div>
    <Navbar v-if="isAuthenticated" />
    <main v-if="isAuthenticated" class="pt-20 mt-3 md:pt-14 max-w-7xl mx-auto px-4 "> <!-- padding top = 3rem -->
      <router-view />
    </main>
    <div v-else> 
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()
</script>
