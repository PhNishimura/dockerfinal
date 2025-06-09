<template>
  <div class="container">
    <header>
      <h1>🏪 Concord Supplies</h1>
      <p>Sistema de Papelaria</p>
    </header>

    <main>
      <section class="users-section">
        <h2>👥 Usuários</h2>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="users-grid">
          <div v-for="user in users" :key="user.id" class="user-card">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </section>

      <section class="items-section">
        <h2>📝 Itens de Papelaria</h2>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="items-grid">
          <div v-for="item in items" :key="item.id" class="item-card">
            <h3>{{ item.name }}</h3>
            <p class="price">R$ {{ item.price.toFixed(2) }}</p>
          </div>
        </div>
      </section>

      <section class="purchases-section">
        <h2>🛒 Compras Realizadas</h2>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="purchases-list">
          <div v-for="purchase in purchases" :key="purchase.id" class="purchase-card">
            <div class="purchase-info">
              <strong>{{ purchase.User?.name || 'Usuário não encontrado' }}</strong>
              <span>comprou {{ purchase.quantity }}x {{ purchase.Item?.name || 'Item não encontrado' }}</span>
            </div>
            <div class="purchase-total">
              R$ {{ ((purchase.Item?.price || 0) * purchase.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>Backend Status: <span :class="backendStatus">{{ backendStatus }}</span></p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const items = ref([])
const purchases = ref([])
const loading = ref(true)
const error = ref(null)
const backendStatus = ref('Conectando...')

const API_BASE = import.meta.env.PROD ? 'http://localhost:3001' : 'http://localhost:3001'

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    
    // Teste de conexão com backend
    await axios.get(`${API_BASE}/`)
    backendStatus.value = 'Conectado ✅'
    
    // Carrega dados
    const [usersRes, itemsRes, purchasesRes] = await Promise.all([
      axios.get(`${API_BASE}/users`),
      axios.get(`${API_BASE}/items`),
      axios.get(`${API_BASE}/purchases`)
    ])
    
    users.value = usersRes.data
    items.value = itemsRes.data
    purchases.value = purchasesRes.data
    
  } catch (err) {
    console.error('Erro ao carregar dados:', err)
    error.value = 'Erro ao conectar com o backend. Verifique se o servidor está rodando.'
    backendStatus.value = 'Desconectado ❌'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

header h1 {
  margin: 0;
  font-size: 2.5rem;
}

header p {
  margin: 10px 0 0 0;
  opacity: 0.9;
}

main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

section {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

section h2 {
  margin: 0 0 20px 0;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  background: #fee;
  color: #c33;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #fcc;
}

.users-grid, .items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.user-card, .item-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: transform 0.2s;
}

.user-card:hover, .item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.user-card h3, .item-card h3 {
  margin: 0 0 10px 0;
  color: #495057;
}

.user-card p, .item-card p {
  margin: 0;
  color: #6c757d;
}

.price {
  font-weight: bold;
  color: #28a745 !important;
  font-size: 1.1rem;
}

.purchases-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.purchase-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.purchase-info strong {
  color: #495057;
}

.purchase-total {
  font-weight: bold;
  color: #28a745;
  font-size: 1.1rem;
}

footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

footer .Conectado {
  color: #28a745;
}

footer .Desconectado {
  color: #dc3545;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .users-grid, .items-grid {
    grid-template-columns: 1fr;
  }
  
  .purchase-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>