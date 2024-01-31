<template>
  <div class="container">
    <h2>To Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText"
      search="Type New To do"
      >
      <hr />
    <TodoSimpleForm @add-todo="addTodo"/>
    
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList 
    :todos="filteredTodos" 
    @toggle-todo="toggleTodo" 
    @delete-todo="deleteTodo"
    />
  </div>
  
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    
    const addTodo = (todo) => {
      //데이터베이스에 투두를 저장하기
      axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed,
      })
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);      
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
  

    // const greeting = (name) => {
    //   return 'Hello, ' + name;
    // };

    // const greet = greeting(name);

    return {
      addTodo,
      todos,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
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