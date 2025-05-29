// composables/useAuth.js
import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('access_token') || null)
const roles = ref(JSON.parse(localStorage.getItem('roles') || '[]'))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  function login(accessToken, userRoles = []) {
    token.value = accessToken
    roles.value = userRoles
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('roles', JSON.stringify(userRoles))
  }

  function logout() {
    token.value = null
    roles.value = []
    localStorage.removeItem('access_token')
    localStorage.removeItem('roles')
  }

  function hasRole(role) {
    return roles.value.includes(role)
  }

  function hasAnyRole(roleList) {
    return roleList.some(role => roles.value.includes(role))
  }

  return { 
    token,
    roles,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasAnyRole
  }
}
