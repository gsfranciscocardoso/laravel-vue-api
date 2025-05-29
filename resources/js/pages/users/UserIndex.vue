<template>
  <div class="max-w-5xl mx-auto p-6 bg-white rounded shadow">
    
    <UserForm v-if="showModal" :user="selectedUser" @close="showModal = false"
      @saved="fetchUsers" />
    <h1 class="text-3xl font-bold mb-6">Users</h1>

    <div class="flex justify-between items-center mb-4">
      <div >
        <button @click="fetchUsers" :disabled="loading"
          class="mx-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition">
          Refresh
        </button>
        <button  @click="openModal(null)" 
          class="mx-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 transition">
          Create User
        </button>
      </div>

      <div v-if="loading" class="text-gray-500">Loading users...</div>
      <div v-if="error" class="text-red-600">{{ error }}</div>
    </div>

    <table v-if="users.length" class="min-w-full border border-gray-200 rounded">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="py-2 px-4 border-b border-gray-300">Name</th>
          <th class="py-2 px-4 border-b border-gray-300">Email</th>
          <th class="py-2 px-4 border-b border-gray-300">Roles</th>
          <th class="py-2 px-4 border-b border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 border-b border-gray-200">
          <td class="py-3 px-4">{{ user.name }}</td>
          <td class="py-3 px-4">{{ user.email }}</td>
          <td class="py-3 px-4">
            <span v-for="role in user.roles || []" :key="role"
              class="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mr-1">
              {{ role }}
            </span>
          </td>
          <td class="p-2">
            <button @click="openModal(user)"
              class="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded mr-1 hover:bg-yellow-200 hover:text-yellow-800">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else-if="!loading" class="text-gray-600">No users found.</div>

  </div>
</template>

<script setup>
import UserForm from '@/pages/users/UserForm.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const selectedUser = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get('/api/users')
    users.value = response.data
    console.log('Fetched users:', response.data)
//     users.value = [
//   {
//     id: 1,
//     name: 'Test User',
//     email: 'test@example.com',
//     roles: ['admin', 'editor'],
//     created_at: '2025-05-16 13:55:45'
//   }
// ]
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch users'
  } finally {
    loading.value = false
  }
}
function openModal(user) {
  selectedUser.value = user
  showModal.value = true
}
function handleSaved() {
  fetchUsers()
  showModal.value = false
}
onMounted(() => {
  fetchUsers()
})
</script>
