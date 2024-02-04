<template>
    <h1>To-Do page</h1>
    <div v-if="loading">
        loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control"
                        >
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                            class="btn"
                            type="button"
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"
                            @click="toggleTodoStatus"
                        >
                        {{todo.completed ? 'completed' : 'Incomplete'}}
                        </button>
                    </div>
                </div>
            </div>

        </div>
        
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!todoUpdated"
            >
            Save
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveTodolistPage"
        >
            Cancel</button>
    </form>
    <toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed, onUnmounted } from 'vue';
import isequal from 'lodash/isEqual';
import toast from '@/components/toastAlert.vue'

export default {
    components: {
        toast,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const timeout = ref(null);
        const todoId = route.params.id;

        onUnmounted(() => {
            clearTimeout(timeout.value);
        })

        const getTodo = async() => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
                loading.value = false;
            } catch(error) {
                console.log(error);
                triggerToast('Something went wrong', 'danger');
            }
        };

        const todoUpdated = computed (() => {
            return ! isequal(todo.value, originalTodo.value)
        })

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveTodolistPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        getTodo();        

        const triggerToast = (message, type) => {
            toastMessage.value = message;
            toastAlertType.value = type;
            showToast.value = true;
            timeout.value = setTimeout(() => {
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value =false;                
            }, 5000)
        }

        const onSave = async() => {
            try {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed,
            });

            originalTodo.value = {...res.data};
            triggerToast('Successfully saved!');
            } catch(error) {
                console.log(error);
                triggerToast('Something went wrong', 'danger');
            }
            
        }

        return {
            loading,
            todo,
            getTodo,
            toggleTodoStatus,
            moveTodolistPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
        }
    }
}
</script>

<style>

</style>