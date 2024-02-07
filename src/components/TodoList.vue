<template>
  <!-- <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-3"
    > -->
    <List
      :items="todos"  
    >
      <template #default="{ item, index }">
        <div 
          class="card-body p-2 d-flex align-items-center"
          style="cursor:pointer"
          @click="moveToPage(item.id)"
        >
          <div class="flex-grow-1">
            <input 
            class="ml-2 mr-2"
            style="cursor:pointer"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop          
            >
            <span :class="{ todo: item.completed }">
            {{ item.subject }}
            </span>
          </div>
          <div>
            <button 
            class="btn btn-danger btn -sm"
            @click.stop="openModal(item.id)"
            >
            <!-- .stop을 통해서 이벤트 버블링을 막을 수 있음. 자바스크립트는 타고 올라감 -->
              Delete
            </button>
          </div>
        </div>
      </template>
    </List>

    <!-- </div> -->
    <Modal 
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo"
    />
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from '@/components/ListCom.vue';

export default {
    components:{
      Modal,
      List,
    },
    props: {
        todos: {
            type: Array,
            required: true

        }
    },
    emits: ['toggle-Todo', 'delete-todo'],
    setup(props, { emit }) {
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);
        const toggleTodo=(index, event) => {
            emit('toggle-Todo', index, event.target.checked);
        };

        const openModal = (id) => {
          todoDeleteId.value = id;
          showModal.value = true;
        };

        const closeModal = () => {
          todoDeleteId.value = null;
          showModal.value = false;
        };

        const deleteTodo = () => {
            emit('delete-todo', todoDeleteId.value);
            showModal.value = false;
            todoDeleteId.value = null;
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
            showModal,
            openModal,
            closeModal,
        }
    }

}
</script>

<style>

</style>