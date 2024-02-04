<template>
  <div>
    <h2>To Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      search="Type New To do"
      placeholder="Search"
      >
      <hr />
    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color:red;">{{ error }}</div>
    
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList
    :todos="filteredTodos" 
    @toggle-todo="toggleTodo" 
    @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentpage !== 1" class="page-item"><a class="page-link" @click="getTodos(currentpage-1)" href="#">Previous</a></li>

        <li 
          class="page-item" 
          :class="currentpage == page ? 'active' : ''"
          v-for="page in 3" 
          :key="page"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        
        <li v-if=" numberOfPages !== currentpage" class="page-item"><a class="page-link" @click="getTodos(currentpage+1)" href="#">Next</a></li>
      </ul>
    </nav>
  </div>  
  <toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import toast from '@/components/toastAlert.vue'
import { useToast } from '@/composables/toast';


export default {
  components: {
    TodoSimpleForm,
    TodoList,
    toast,
  },
  setup() {
    const todos = ref([]);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const {
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
    } = useToast();
    // const showToast = ref(false);
    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const toastTimeout = ref(null);
    // const triggerToast = (message, type) => {
    //         toastMessage.value = message;
    //         toastAlertType.value = type;
    //         showToast.value = true;
    //         toastTimeout.value = setTimeout(() => {
    //             toastMessage.value = '';
    //             toastAlertType.value = '';
    //             showToast.value =false;                
    //         }, 5000)
    //     };

    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentpage = ref(1);

    watchEffect(() => {
      console.log(currentpage.value);
      console.log(numberOfTodos.value);
    })
        
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    // x-total-count가 헤더에 존재하지 않는 것 같음. 작동하지 않음
    const  getTodos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${currentpage.value}&_limit=${limit}`);
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
        console.log('All Headers:', res.headers);

      } catch(err) {
        error.value = 'something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    }

    getTodos();
    console.log(numberOfTodos.value);
    
    const addTodo = async (todo) => {
      //데이터베이스에 투두를 저장하기
      error.value='';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (err) {
        error.value = 'something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: checked
        });
        todos.value[index].completed = checked
      } catch(err) {
        console.log(err)
        error.value = 'something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
      }

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };
  

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.delete('http://localhost:3000/todos/' + id);
        todos.value.splice(index, 1);    

      } catch (err) {
        console.log(err);
        error.value = 'something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    })
  

    return {
      addTodo,
      todos,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      numberOfPages,
      currentpage,
      showToast,
      searchTodo,
      toastMessage,
      toastAlertType,
    }

  },

    
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>