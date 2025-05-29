<template>
    <Teleport to="body"> 
        <div class="fixed inset-0 w-full z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" >
            <dialog open ref="modalRef"
                class="m-auto w-full max-w-md rounded-xl shadow-2xl bg-white p-6 animate-fade-in" @click.self="close">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ user?.id ? 'Edit User' : 'Create User' }}
                    </h2>
                    <button @click="close" class="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="submitForm" class="space-y-5">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Name</label>
                        <input v-model="form.name" type="text"
                            class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="John Doe" required />
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input v-model="form.email" type="email"
                            class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="user@example.com" required />
                    </div>

                    <div v-if="!user?.id">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <div class="relative">
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-10"
                                placeholder="••••••••" required />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <!-- <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> -->
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="!user?.id">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Password Confirmation </label>
                        <div class="relative">
                            <input v-model="form.password_confirmation" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-10"
                                placeholder="••••••••" required />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Role</label>
                        <select v-model="form.role"
                            class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem_1.25rem]"
                            required>
                            <option value="" disabled selected>Select a role</option>
                            <option v-for="role in roles" :key="role" :value="role" class="capitalize">
                                {{ role }}
                            </option>
                        </select>
                    </div>

                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" @click="close"
                            class="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-5 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            :disabled="isSubmitting">
                            <span v-if="!isSubmitting">
                                {{ user?.id ? 'Update' : 'Create' }}
                            </span>
                            <span v-else class="flex items-center">
                                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Processing...
                            </span>
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
    user: {
        type: Object,
        default: () => null
    },
    roles: {
        type: Array,
        default: () => ['admin', 'user'],
    },
})

const emit = defineEmits(['close', 'saved'])

const modalRef = ref(null)
const showPassword = ref(false)
const isSubmitting = ref(false)

const form = reactive({
    name: '',
    email: '',
    password: '',
    role: '',
})

const isOpen = ref(false) 

watch(
    () => props.user,
    (user) => {
        form.name = user?.name || ''
        form.email = user?.email || ''
        form.password_confirmation = user?.password_confirmation || ''
        form.role = user?.role || props.roles[0]
        form.password = ''
    },
    { immediate: true }
)

function open() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
    emit('close')
}
async function submitForm() {
    try {
        isSubmitting.value = true
        if (props.user?.id) {
            await axios.put(`/api/users/${props.user.id}`, form)
        } else {
            await axios.post('/api/users', form)
        }
        emit('saved')
        close()
    } catch (err) {
        console.error('Failed to submit user form:', err)
        // You could add error state handling here
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => open())
</script>

