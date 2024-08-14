const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');

// Загрузка задач из localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Добавление новой задачи при нажатии Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Добавление новой задачи при нажатии на кнопку
addTaskBtn.addEventListener('click', addTask);

// Функция добавления задачи
function addTask() {
    const task = taskInput.value.trim();
    if (task === '') return;

    const li = createTaskElement(task);
    taskList.appendChild(li);

    // Очистка поля ввода
    taskInput.value = '';

    // Сохранение в localStorage
    saveTasks();
}

// Функция создания элемента задачи
function createTaskElement(task, completed = false) {
    const li = document.createElement('li');

    // Зелёная галочка
    const checkmark = document.createElement('span');
    checkmark.innerHTML = '&#10003;'; // HTML код галочки
    checkmark.className = 'checkmark';
    li.appendChild(checkmark);

    // Текст задачи
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'task-text';
    li.appendChild(taskText);

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = removeTask;
    li.appendChild(deleteBtn);

    if (completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', function(e) {
        if (e.target !== deleteBtn) {
            toggleComplete(li);
        }
    });

    return li;
}

// Функция переключения выполнения задачи
function toggleComplete(li) {
    li.classList.toggle('completed');
    saveTasks();
}

// Функция удаления задачи
function removeTask(e) {
    e.target.parentElement.remove();
    saveTasks();
}

// Функция сохранения задач в localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
}
