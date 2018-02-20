const todosList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, newTodoText){
        this.todos[position].todoText = newTodoText;
        // this.displayTodo();
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        let todo = this.todos[position];
        console.log(todo, position, todo.completed);
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        let totalTotos = this.todos.length;
        let completedTodos = 0;
        for(let i = 0; i < totalTotos; i++){
            if(this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        if(totalTotos === completedTodos){
            for (let i = 0; i < totalTotos; i++){
                this.todos[i].completed = false;
            }
        }
        else {
            for (let i = 0; i < totalTotos; i++){
                this.todos[i].completed = true;
            }
        }
    }
};

const handler = {
    addTodo: function () {
        let addTodoTextInput = document.querySelector("#addTodoTextInput");
        todosList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function () {
        let position = document.querySelector('#position');
        let changeTodoButton = document.querySelector('#changeTodoButton');
        todosList.changeTodo(position.value, changeTodoButton.value);
        position.value = '';
        changeTodoButton.value = '';
        view.displayTodos();
    },
    deleteTodo: function (position) {
        todosList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        // let togglePosition = document.getElementById('togglePosition');
        todosList.toggleCompleted(position);
        // togglePosition.value = '';
        view.displayTodos();
    },
    toggleAll: function () {
        todosList.toggleAll();
        view.displayTodos();
    }
};

const view = {
    displayTodos: function () {
        let todosUl = document.querySelector("ul");
        todosUl.innerHTML = '';
        for(let i = 0; i < todosList.todos.length; i++) {
            let todoLi = document.createElement("li");
            let todoTextWithCompletion = '';
            let todo = todosList.todos[i];

            if(todo.completed === true){
                todoTextWithCompletion = "(X) " + todo.todoText;
            } else {
                todoTextWithCompletion = "( ) " + todo.todoText;
            }
            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createToggleCompletedButton());
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function () {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = ' X ';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListener: function () {
        let todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            let elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handler.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    },
    createToggleCompletedButton: function () {
        let toggleCompletedButton = document.createElement('span');
        toggleCompletedButton.textContent = ' * ';
        toggleCompletedButton.className = 'completed';
        return toggleCompletedButton;
    },
    setUpToggleCompleted: function () {
        let todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            let elementClicked = event.target;
            if (elementClicked.className === 'completed') {
                handler.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
        })
    }
};
view.setUpEventListener();
view.setUpToggleCompleted();

