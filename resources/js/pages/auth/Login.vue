<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4"
  >
    <main
      class="w-full max-w-md bg-white rounded-xl shadow-xl p-10"
      role="main"
      aria-labelledby="login-title"
    >
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img
          src="../../../assets/Laravel.svg"
          alt="MyApp Logo"
          class="h-12 w-auto"
          aria-hidden="true"
        />
      </div>

      <h1
        id="login-title"
        class="text-3xl font-semibold text-gray-900 mb-8 text-center select-none font-sans tracking-tight"
      >
        Sign in to your account
      </h1>

      <form @submit.prevent="loginUser" class="space-y-6" novalidate>
        <div>
          <label
            for="email"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email address
          </label>
          <div class="relative">
            <input
              v-model.trim="email"
              id="email"
              type="email"
              autocomplete="email"
              required
              :class="[
                'w-full rounded-md border px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition',
                emailError ? 'border-red-500' : 'border-gray-300',
              ]"
              @blur="validateEmail"
              aria-describedby="email-error"
            />
            <svg
              class="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14v7"
              />
            </svg>
          </div>
          <p
            v-if="emailError"
            id="email-error"
            class="text-red-600 mt-1 text-sm select-none"
            role="alert"
          >
            {{ emailError }}
          </p>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Password
          </label>
          <div class="relative">
            <input
              v-model.trim="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              autocomplete="current-password"
              required
              :class="[
                'w-full rounded-md border px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition',
                passwordError ? 'border-red-500' : 'border-gray-300',
              ]"
              @blur="validatePassword"
              aria-describedby="password-error"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-2 top-2/4 -translate-y-2/4 text-indigo-600 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p
            v-if="passwordError"
            id="password-error"
            class="text-red-600 mt-1 text-sm select-none"
            role="alert"
          >
            {{ passwordError }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-md py-3 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex justify-center items-center space-x-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span>Signing in...</span>
          </span>
          <span v-else>Sign In</span>
        </button>

        <p
          v-if="error"
          class="text-center text-red-600 text-sm mt-3 select-none"
          role="alert"
        >
          {{ error }}
        </p>
      </form>

      <p class="mt-8 text-center text-gray-600 text-sm select-none font-sans">
        Don’t have an account?
        <RouterLink
          to="/register"
          class="text-indigo-600 font-semibold hover:underline"
        >
          Register here
        </RouterLink>
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useAuth } from "@/composables/useAuth";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const error = ref("");
const emailError = ref("");
const passwordError = ref("");

const router = useRouter();
const { login } = useAuth();

function validateEmail() {
  if (!email.value) {
    emailError.value = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = "Please enter a valid email.";
  } else {
    emailError.value = "";
  }
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = "Password is required.";
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters.";
  } else {
    passwordError.value = "";
  }
}

async function loginUser() {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) return;

  loading.value = true;
  error.value = "";

  try {
    const response = await axios.post("/api/login", {
      email: email.value,
      password: password.value,
    });

    login(response.data.access_token);
    router.push({ name: "home" });
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to login.";
  } finally {
    loading.value = false;
  }
}
</script>

<style>
/* Optional: Use a font like Inter from Google Fonts for a professional look */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>
