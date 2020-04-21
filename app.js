let todos = [
    {
        todo: 'Estudar para a apresentação de quinta.',
        done: false,
    },
    {
        todo: 'Terminar o curso de JavaScript.',
        done: false,
    },
    {
        todo: 'Arrumar a cozinha e fazer o almoço.',
        done: false,
    },
];

let DOM = {
    list: document.querySelector('.list'),
    input: document.querySelector('.input'),
    addButton: document.querySelector('.add-new-task'),
    deleteButton: document.querySelector('.delete'),
    checkButton: document.querySelector('.check'),
    allCheckButtons: document.querySelectorAll('.check'),
};

/***** FUNÇÕES *****/

/* Função de inicialização */

const init = () => {
    updateUI();
    clearInput();
};

/* Função que cria o template dos itens da lista de tarefas. */

const createItem = (el) => {
    const markup = `
        <li class="list-item">
            <p class="todo">${el.todo}</p>
            <div class="buttons-container">
                <button class="checkbox button">
                    ${el.done === false ? '<i class="large material-icons">check_box_outline_blank</i>' : '<i class="large material-icons">check_box</i>'}
                </button>
                <button class="delete button hide" onClick="deleteItem">
                    <i class="large material-icons">clear</i>
                </button>
            </div>
        </li>
    `; 
    
    DOM.list.insertAdjacentHTML('beforeend', markup);
}

const deleteItem = (el) => {
    
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

/* Função que limpa a interface do usuário, evitando itens duplicados. */

const clearUI = () => DOM.list.innerHTML = '';

/* Função que adiciona os itens à interface do usuário. */

const updateUI = () => {
    // Limpa as entradas anteriores da interface do usuário.
    clearUI();

    // Adiciona todos itens à interface de usuário.
    renderItems();
    
    // Personaliza/alterna as cores das linhas da lista de tarefas.
    customizeLines();
};



init();

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

DOM.list.addEventListener('click', (e) => {
    const allListItems = document.querySelectorAll('.list-item');
    const listItem = e.target.closest('.list-item');
    const checkbox = e.target.closest('.checkbox');
    const deleteButton = e.target.closest('.delete');

    if (checkbox) {
        console.log('A checkbox was clicked.');
        listItem.children[0].classList.toggle('checked');
    }
    else if (deleteButton) {
        const listItemToBeRemoved = deleteButton.parentNode.parentNode;
        console.log('A delete button was clicked.');
        
        allListItems.forEach((el, i) => {
            if (el.isSameNode(listItemToBeRemoved)) {{
                console.log(`Deleting the task of index ${i}`);
                todos.pop(todos[i]);
                updateUI();
            }}
        });
    }
});