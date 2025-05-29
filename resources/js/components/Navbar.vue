<template>
 <nav
  class="fixed w-full top-0 left-0 bg-white shadow-sm border-b border-gray-100 z-50"
  role="navigation"
  aria-label="Primary Navigation"
>
  <div class="max-w-7xl mx-auto px-5 py-2 flex justify-between items-center">
    <!-- Logo -->
    <RouterLink 
      to="/"
      class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent select-none"
    >
      MyApp
    </RouterLink>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center space-x-8">
      <div class="flex space-x-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 text-gray-600 hover:text-indigo-600 font-medium rounded-lg transition-all duration-200"
          :class="{
            'text-indigo-600 font-semibold': $route.path === link.to,
            'hover:bg-gray-50': $route.path !== link.to,
          }"
          active-class="text-indigo-600 font-semibold"
        >
          {{ link.text }}
        </RouterLink>
      </div>

      <div class="h-6 border-l border-gray-200 ml-4"></div>

      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        aria-label="Logout"
        class="ml-4 px-3 py-1.5 font-medium text-red-600 rounded-lg hover:text-red-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
      >
        Logout
      </button>

      <RouterLink
        v-else
        to="/login"
        class="ml-4 px-3 py-1.5 text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium"
      >
        Login
      </RouterLink>
    </div>

    <!-- Mobile Toggle -->
    <button
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen.toString()"
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
      class="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Mobile Menu -->
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 -translate-y-2"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      id="mobile-menu"
      class="md:hidden bg-white border-t border-gray-100 shadow-lg"
    >
      <div class="px-2 pt-2 pb-4 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="isOpen = false"
          class="block px-4 py-3 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-colors"
          :class="{ 'text-indigo-600 bg-indigo-50': $route.path === link.to }"
        >
          {{ link.text }}
        </RouterLink>

        <button
          v-if="isAuthenticated"
          @click="() => { handleLogout(); isOpen = false }"
          class="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Logout
        </button>

        <RouterLink
          v-else
          to="/login"
          @click="isOpen = false"
          class="block px-4 py-3 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 font-medium text-center hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </transition>
</nav>

</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const isOpen = ref(false);
const router = useRouter();
const { isAuthenticated, logout } = useAuth();

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/users', text: 'Users' },
  { to: '/about', text: 'About' },
];

function handleLogout() {
  logout();
  router.push({ name: "login" });
}
</script>