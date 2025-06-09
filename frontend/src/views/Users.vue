
<template>
  <div>
    <h2>Usuários</h2>
    <ul>
      <li v-for="u in users" :key="u.id">{{ u.name }} ({{ u.email }})</li>
    </ul>

    <h2>Compras</h2>
    <ul>
      <li v-for="p in purchases" :key="p.id">
        {{ p.user?.name }} comprou {{ p.quantity }}x {{ p.item?.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const purchases = ref([])

onMounted(async () => {
  try {
    const resUsers = await axios.get('http://localhost:3001/users')
    const resPurchases = await axios.get('http://localhost:3001/purchases')
    users.value = resUsers.data
    purchases.value = resPurchases.data
  } catch (err) {
    console.error('Erro ao carregar dados:', err)
  }
})
</script>


