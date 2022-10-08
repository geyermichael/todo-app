export default {
  props: { id: { type: Number, required: false } },
  data() {
    return {
      title: '',
      description: '',
    };
  },
  template: `
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Neues Todo erstellen</p>
                <button v-on:click="$emit('close')" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label class="label">Titel</label>
                <div class="control">
                  <input v-model="title" class="input" type="text" placeholder="Ein Todo Titel">
                </div>
              </div>
              <div class="field">
                <label class="label">Beschreibung</label>
                <div class="control">
                <textarea v-model="description" class="textarea" placeholder="Eine Todo Beschreibung..."></textarea>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
                <button v-on:click="createTodo" class="button is-success">Todo erstellen</button>
                <button v-on:click="$emit('close')" class="button">Abbrechen</button>
            </footer>
        </div>
    </div>
  `,
  methods: {
    async createTodo() {
      const data = {
        title: this.title,
        description: this.description,
        dueDate: new Date().toISOString().slice(0, 10),
      };

      if (!data.title) return;

      try {
        await fetch('/api/v1/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        this.$emit('close');
      } catch (error) {
        console.error(error);
      }
    },

    async fetchTodos(id) {
      try {
        const res = await fetch(`/api/v1/todos${id}`);
        const data = await res.json();
      } catch (error) {}
    },
    mounted() {
      if (this.id) {
        this.fetchTodos(this.id);
      }
    },
  },
};
