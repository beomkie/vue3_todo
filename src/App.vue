<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name: 'Home'}">
      Gorgeous
    </router-link>
  
    
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{name: 'Todos'}">
            Todos
          </router-link>
        </li>
      </ul>
  </div>
</nav>
  <div class="container">
    <router-view />
  </div>
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
</template>

<script>
import Toast from '@/components/toastAlert.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },
  setup() {
    const {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
        } = useToast();

    return {
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
    }
  }
  
} 
</script>

<style>

</style>