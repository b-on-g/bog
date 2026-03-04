// --- stores/user.ts ---
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')
  const loading = ref(false)

  async function fetchUser() {
    loading.value = true
    try {
      const res = await api.getUser()
      name.value = res.name
      email.value = res.email
    } finally {
      loading.value = false
    }
  }

  return { name, email, loading, fetchUser }
})

// --- components/Profile.vue ---
<script setup>
const store = useUserStore()

onMounted(() => {
  store.fetchUser()
})

watch(
  () => store.name,
  (newName) => {
    document.title = `Profile — ${newName}`
  }
)
</script>

<template>
  <input v-model="store.name" />
  <input v-model="store.email" />
</template>
