<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const message = ref('Loading...')

onMounted(async () => {
  const res = await axios.get('/api/ping')
  message.value = res.data.message
})
</script>

<template>
  <h1>API Response About: {{ message }}</h1>
</template>