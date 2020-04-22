let todos = [];

let DOM = {
    list: document.querySelector('.list'),
    input: document.querySelector('.input'),
    addButton: document.querySelector('.add-new-task'),
    deleteButton: document.querySelector('.delete'),
    checkButton: document.querySelector('.check'),
    deleteAllButton: document.querySelector('.delete-all'),
};

/***** FUNÇÕES *****/

/* Função que cria o template dos itens da lista de tarefas. */

const createItem = (el) => {
    const markup = `
        <li class="list-item">
            <p class="todo">${el.todo}</p>
            <div class="buttons-container">
                <button class="checkbox button">
                    ${el.done === false ? '<i class="large material-icons">check_box_outline_blank</i>' : '<i class="large material-icons">check_box</i>'}
                </button>
                <button class="delete button hide">
                    <i class="large material-icons">clear</i>
                </button>
            </div>
        </li>
    `; 
    
    DOM.list.insertAdjacentHTML('beforeend', markup);
}

/* Função que renderiza os itens na tela. */

const renderItems = () => {
    todos.forEach((el) => {
        createItem(el);
    });
};

/* Função que recebe o valor do input. */

const getInput = () => DOM.input.value;

/* Função que limpa o valor do input. */

const clearInput = () => DOM.input.value = '';

/* Customiza as linhas, diferenciando-as por cores. */

const customizeLines = () => {
    document.querySelectorAll('.list-item').forEach((el, i) => {
        if (i % 2 === 0) {
            el.classList.add('custom-item-background-1');
        } else {
            el.classList.add('custom-item-background-2');
        }
    });
};

/* Função que customiza as tarefas, diferenciando-as por checagem. */

const customizeTodos = () => {
    const allTodos = document.querySelectorAll('.todo');

    allTodos.forEach((el, i) => {
        if (todos[i].done) {
            el.classList.add('checked');
        }
        else {
            el.classList.remove('checked');
        }
    });
}

/* Função que limpa a interface do usuário, evitando itens duplicados. */

const clearUI = () => DOM.list.innerHTML = '';

/* Função que adiciona os itens à interface do usuário. */

const updateUI = () => {
    // Limpa as entradas anteriores da interface do usuário.
    clearUI();

    // Adiciona todos itens à interface de usuário.
    renderItems();
    
    // Personaliza o estilo das tarefas caso elas estejam marcadas ou não.
    customizeTodos();

    // Personaliza/alterna as cores das linhas da lista de tarefas.
    customizeLines();

    // Devolve o foco ao input.
    DOM.input.focus();
};

/***** EVENT LISTENTERS *****/

/* Adiciona uma nova tarefa ao clicar no botão. */

DOM.addButton.addEventListener('click', () => {
    if (DOM.input.value !== '') {
        todos.push({
            todo: getInput(),
            done: false,
        });
    
        updateUI();

        clearInput();
    } else {
        console.log('Erro: Não é possível adicionar tarefas em branco.');
    }
});

/* Adiciona uma nova tarefa ao apertar no ENTER. */

DOM.input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && DOM.input.value !== '') {
        e.preventDefault();

        todos.push({
            todo: getInput(),
            done: false,
        });
    
        updateUI();

        clearInput();
    } else {
        console.log('Erro: Não é possível adicionar tarefas em branco.');
    }
});

/* Delegação de eventos para o ícone de exclusão e para a caixa de seleção. */

DOM.list.addEventListener('click', (e) => {
    const allListItems = document.querySelectorAll('.list-item');
    const checkbox = e.target.closest('.checkbox');
    const deleteButton = e.target.closest('.delete');

    // Ao clicar na caixa de seleção...
    if (checkbox) {
        const listItemToBeChecked = checkbox.parentNode.parentNode;
        
        allListItems.forEach((el, i) => {
            if (el.isSameNode(listItemToBeChecked)) {{
                todos[i].done = !todos[i].done;
                updateUI();
            }}
        });
    }
    // Ao clicar no botão de deletar...
    else if (deleteButton) {
        const listItemToBeRemoved = deleteButton.parentNode.parentNode;
        
        allListItems.forEach((el, i) => {
            if (el.isSameNode(listItemToBeRemoved)) {{
                todos.splice(i, 1);
                updateUI();
            }}
        });
    }
});

/* Exclui todas as tarefas ao clicar no botão. */

DOM.deleteAllButton.addEventListener('click', () => {
    todos = [];
    updateUI();
});

/* Mostra o ícone de exclusão de uma tarefa específica ao colocar o cursor sobre a linha desta tarefa. */

DOM.list.addEventListener('mouseover', (e) => {
    const listItem = e.target.closest('.list-item');
    
    if (listItem) {
        listItem.children[1].children[1].classList.toggle('hide');
    }
});

/* Esconde o ícone de exclusão de uma tarefa específica ao retirar o cursor da linha desta tarefa. */

DOM.list.addEventListener('mouseout', (e) => {
    const listItem = e.target.closest('.list-item');

    if (listItem) {
        listItem.children[1].children[1].classList.toggle('hide');
    }
});
