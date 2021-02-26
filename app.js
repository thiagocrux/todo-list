let todos = [];

let DOM = {
  list: document.querySelector('.list'),
  input: document.querySelector('.input'),
  addButton: document.querySelector('.add-new-task'),
  deleteButton: document.querySelector('.delete'),
  checkButton: document.querySelector('.check'),
  deleteAllButton: document.querySelector('.delete-all'),
};

const createItem = (el) => {
  const markup = `
		<li class="list-item">
				<p class="todo">${el.todo}</p>
				<div class="buttons-container">
						<button class="delete button hide">
								<i class="large material-icons">clear</i>
						</button>
						<button class="checkbox button">
							${
                el.done === false
                  ? '<i class="large material-icons">check_box_outline_blank</i>'
                  : '<i class="large material-icons">check_box</i>'
              }
						</button>
				</div>
		</li>
	`;

  DOM.list.insertAdjacentHTML('beforeend', markup);
};

const renderItems = () => todos.forEach((el) => createItem(el));

const getInput = () => DOM.input.value;

const clearInput = () => (DOM.input.value = '');

const customizeLineBackground = () =>
  document.querySelectorAll('.list-item').forEach((el, i) => {
    return i % 2 === 0
      ? el.classList.add('custom-item-background-1')
      : el.classList.add('custom-item-background-2');
  });

const customizeTodos = () => {
  const allTodos = document.querySelectorAll('.todo');

  allTodos.forEach((el, i) =>
    todos[i].done ? el.classList.add('checked') : el.classList.remove('checked')
  );
};

const clearUI = () => (DOM.list.innerHTML = '');

const updateUI = () => {
  clearUI();
  clearInput();
  renderItems();
  customizeTodos();
  customizeLineBackground();
};

// TODO: Implement this method
const toggleTodo = (todo, todoIndex, todoToBeChecked) => {
  if (todo.isSameNode(todoToBeChecked)) {
    {
      todos[todoIndex].done = !todos[todoIndex].done;
      updateUI();
    }
  }
};

const deleteTodo = (todo, todoIndex, todoToBeDeleted) => {
  if (todo.isSameNode(todoToBeChecked)) {
    {
      todos.splice(todoIndex, 1);
      updateUI();
    }
  }
};

DOM.addButton.addEventListener('click', () => {
  if (DOM.input.value !== '') {
    todos.push({
      todo: getInput(),
      done: false,
    });

    updateUI();
    clearInput();
    DOM.input.focus();
  } else {
    console.log('Erro: Não é possível adicionar tarefas em branco.');
  }
});

DOM.input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && DOM.input.value !== '') {
    e.preventDefault();

    todos.push({
      todo: getInput(),
      done: false,
    });

    updateUI();
    DOM.input.focus();
  } else {
    console.log('Erro: Não é possível adicionar tarefas em branco.');
  }
});

DOM.list.addEventListener('click', (e) => {
  const allListItems = document.querySelectorAll('.list-item');
  const checkbox = e.target.closest('.checkbox');
  const deleteButton = e.target.closest('.delete');

  if (checkbox) {
    const listItemToBeChecked = checkbox.parentNode.parentNode;
    allListItems.forEach((el, i) => toggleTodo(el, i, listItemToBeChecked));
  } else if (deleteButton) {
    const listItemToBeRemoved = deleteButton.parentNode.parentNode;
    allListItems.forEach((el, i) => deleteTodo(el, i, listItemToBeRemoved));
  }
});

DOM.deleteAllButton.addEventListener('click', () => {
  todos = [];
  updateUI();
  DOM.input.focus();
});

DOM.list.addEventListener('mouseover', (e) => {
  const listItem = e.target.closest('.list-item');

  if (listItem) {
    listItem.children[0].classList.toggle('hover');
    listItem.children[1].children[0].classList.toggle('hide');
  }
});

DOM.list.addEventListener('mouseout', (e) => {
  const listItem = e.target.closest('.list-item');

  if (listItem) {
    listItem.children[0].classList.toggle('hover');
    listItem.children[1].children[0].classList.toggle('hide');
  }
});
