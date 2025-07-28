const tabs = document.querySelectorAll('.tab');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Event Listeners
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        renderTasks();
    });
});

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});

taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        const index = e.target.dataset.index;
        tasks[index].completed = e.target.checked;
        saveTasks();
        renderTasks();
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});

deleteAllBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

// Save to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Tasks based on Tab
function renderTasks() {
    const activeTab = document.querySelector('.tab.active').dataset.tab;
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (activeTab === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (activeTab === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.index = index;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(task.text));

        li.appendChild(label);

        if (activeTab === 'completed') {
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '🗑';
            deleteBtn.className = 'delete-btn';
            deleteBtn.dataset.index = index;
            li.appendChild(deleteBtn);
        }

        taskList.appendChild(li);
    });

    deleteAllBtn.style.display = (activeTab === 'completed' && filteredTasks.length > 0) ? 'inline-block' : 'none';
}

// Initialize render
renderTasks();
