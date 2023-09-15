const input = document.querySelector('.tasks_input_text');
const tasksList = document.querySelector('.tasks_list');
const tasks = [];

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks.push(...JSON.parse(storedTasks));
  renderTasks();
}

input.addEventListener('change', () => {
  let inputValue = input.value;
  let inputValueString = inputValue.toString();

  if (inputValue === '') return;
  if (inputValueString.length > 25) return;

  tasks.push(inputValue);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  input.value = '';
});

function renderTasks() {
  tasksList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('tasks_list_item');
    taskItem.innerHTML = `<p>${tasks[i]}</p><button class="delete">X</button>`;
    tasksList.appendChild(taskItem);

    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      tasks.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === ' ') e.preventDefault();
  if (input.value.length === 25) e.preventDefault();
});

