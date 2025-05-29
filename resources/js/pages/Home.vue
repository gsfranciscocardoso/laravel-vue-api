<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('Loading...')

onMounted(async () => {
  try {
    const res = await axios.get('/api/ping')
    message.value = res.data.message
  } catch (err) {
    console.error('API call failed:', err)
    message.value = 'Error loading API'
  }
})
</script>

<template>
    <h1>API Response: {{ message }}</h1>
</template>
