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
    // changeTodo: function () {
    //     let position = document.querySelector('#position');
    //     let changeTodoButton = document.querySelector('.changeTodoButton');
    //     todosList.changeTodo(position.value, changeTodoButton.value);
    //     position.value = '';
    //     changeTodoButton.value = '';
    //     view.displayTodos();
    // },
    updateTodo: function(position, newText) {
        console.log(position, newText);
        todosList.changeTodo(position, newText);
        view.displayTodos();
    },
    deleteTodo: function (position) {
        todosList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        todosList.toggleCompleted(position);
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
            let todoContent = document.createElement("p");
            
            todoContent.addEventListener('dblclick', function(e) {
                let editmode = view.createChangeTodos(i);
                todoContent.textContent = "";
                todoContent.appendChild(editmode);
            });

            let checkButton = document.createElement("button");
            checkButton.className = "checkButton";
            let todo = todosList.todos[i];

            if(todo.completed === true){
                checkButton.textContent = "✔";
                todoContent.style.textDecoration = "line-through";
                todoContent.style.color = "lightgrey"
            } else {
                checkButton.textContent = " "
            }
            todoLi.id = i;
            todoContent.textContent = todo.todoText;

            todoLi.appendChild(checkButton);
            todoLi.insertBefore(checkButton, todoLi.childNodes[0]);
            todoLi.appendChild(todoContent);
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

    createChangeTodos: function (position) {
        let input = document.createElement("input");
        input.className = "changeTodo";

        input.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                let value = event.target.value;
                handler.updateTodo(position, value);
            }
        });
        return input;
    },
    setUpEventListener: function () {
        let todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            let elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handler.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            if (elementClicked.className === 'checkButton') {
                handler.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }

        });
    },
};
view.setUpEventListener();


