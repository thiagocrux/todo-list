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

init();

let allItems = document.querySelectorAll('.list-item');
let allTodos = document.querySelectorAll('.todo');
let allDeleteButtons = document.querySelectorAll('.delete');
let allCheckboxButtons = document.querySelectorAll('.checkbox');

allItems.forEach((el, i) => {
    el.addEventListener('mouseover', () => {
        allDeleteButtons[i].classList.remove('hide');
    });
    
    el.addEventListener('mouseout', () => {
        allDeleteButtons[i].classList.add('hide');
    });
})
