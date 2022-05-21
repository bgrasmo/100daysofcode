const TodosApp = {
  data() {
    return {
      todos: [],
      enteredTodoText: '',
      editedTodoId: null
    };
  },
  methods: {
    saveTodo(event) {
      event.preventDefault();

      if (this.editedTodoId) {
        const todoIndex = this.todos.findIndex((todoItem) => {
          return todoItem.id === this.editedTodoId;
        });

        const updatedTodoItem = {
          id: this.todos[todoIndex].id,
          text: this.enteredTodoText
        }

        this.todos[todoIndex] = updatedTodoItem;
        this.editedTodoId = null;
      } else {
        const newTodo = {
          text: this.enteredTodoText,
          id: new Date().toISOString()
        };
        this.todos.push(newTodo);
      }
      

      this.enteredTodoText = '';
    },
    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find((todoItem) => {
        return todoItem.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter((todoItem) => {
        return todoItem.id !== todoId;
      });
    }
  }
};

Vue.createApp(TodosApp).mount('#todos-app');