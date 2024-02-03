<template>
  <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-3"
    >
      <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor:pointer"
      @click="moveToPage(todo.id)"
      >
        <div class="form-check flex-grow-1">
          <input 
          class=form-check-input 
          style="cursor:pointer"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop          
          >
          <label 
            class="form-check-label"
            :class="{ todo: todo.completed }"
          >
          {{ todo.subject }}
        </label>
        </div>
        <div>
          <button 
          class="btn btn-danger btn -sm"
          @click.stop="deleteTodo(index)"
          >
          <!-- .stop을 통해서 이벤트 버블링을 막을 수 있음. 자바스크립트는 타고 올라감 -->
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    props: {
        todos: {
            type: Array,
            required: true

        }
    },
    emits: ['toggle-Todo', 'delete-todo'],
    setup(props, { emit }) {
        const router = useRouter();
        const toggleTodo=(index, event) => {
            emit('toggle-Todo', index, event.target.checked);
        };

        const deleteTodo=(index) => {
            emit('delete-todo', index);
        };

        const moveToPage=(todoId) => {
          console.log(todoId);
          
          //id값을 통해서 해당 Todo page로 이동하는 방법
          // router.push('/todos/'+todoId); 
          router.push({
            //이름을 통해서 구현하는 방법, 이 방법이 조금 더 유리
            name: 'Todo',
            params: {
              id: todoId
            }
          });
        }
        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
        }
    }

}
</script>

<style>

</style>