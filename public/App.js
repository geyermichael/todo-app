import BaseControl from './components/BaseControl.js';
import BaseButton from './components/BaseButton.js';
import AddTodo from './components/AddTodoModal.js';

export default {
  components: {
    BaseControl,
    BaseButton,
    AddTodo,
  },
  data() {
    return {
      appTitle: 'Daily Todo App',
      todos: [],
      todoId: null,
      showTodoModal: false,
    };
  },
  computed: {
    today() {
      const weekday = new Date().toLocaleDateString('de-DE', {
        weekday: 'long',
      });
      const date = new Date().toLocaleDateString('de-DE');
      return `${weekday} ${date}`;
    },
  },
  methods: {
    async fetchTodos() {
      try {
        const res = await fetch('/api/v1/todos');
        const data = await res.json();
        this.todos = data.todos;
      } catch (error) {
        console.log(error);
      }
    },
    toggleTodoModal() {
      this.fetchTodos(); // fetch to see new todos
      this.showTodoModal = !this.showTodoModal;
    },
    async deleteTodo(id) {
      try {
        await fetch(`/api/v1/todos/${id}`, {
          method: 'DELETE',
        });
        this.fetchTodos(); // fetch to see new todos
      } catch (error) {}
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
