import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => { 
    const store = useStore();
    const showToast = computed(() => store.state.showToast);
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const triggerToast = (message, type) => {
            store.dispatch('triggerToast', message, type)
        };

    
    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    }
}