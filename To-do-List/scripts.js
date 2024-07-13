document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('roll-task').addEventListener('click', rollTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = createTaskItem(taskText);
    document.getElementById('tasks').appendChild(taskItem);
    taskInput.value = '';

    updateRollTaskButtonVisibility();
    updateRollTaskLabel();
}

function updateRollTaskButtonVisibility() {
    const tasksList = document.getElementById('tasks');
    const rollTaskButton = document.getElementById('roll-task');
    
    rollTaskButton.style.display = tasksList.children.length > 0 ? 'inline-block' : 'none';
}

function rollTask() {
    const tasksList = document.getElementById('tasks');
    const taskItems = Array.from(tasksList.children);

    if (taskItems.length === 0) {
        return; 
    }

    const randomIndex = Math.floor(Math.random() * taskItems.length);
    const selectedTask = taskItems[randomIndex];

    document.getElementById('r-task').textContent = selectedTask.querySelector('span').textContent;

    highlightTask(selectedTask);
}

function highlightTask(taskElement) {
    const highlightedTask = document.querySelector('.highlighted');
    if (highlightedTask) {
        highlightedTask.classList.remove('highlighted');
    }

    taskElement.classList.add('highlighted');
}

function createTaskItem(taskText) {
    const li = document.createElement('li');

    li.addEventListener('click', handleItemClick);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskCompletion);

    const span = document.createElement('span');
    span.textContent = taskText;
    span.addEventListener('click', handleItemClick);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

function handleItemClick(event) {
    const li = event.currentTarget;
    const clickedElement = event.target;

    if (clickedElement.tagName === 'BUTTON' && clickedElement.textContent === 'Delete') {
        return;
    }

    const highlightedTasks = document.querySelectorAll('.highlighted');
    highlightedTasks.forEach(task => task.classList.remove('highlighted'));

    li.classList.add('highlighted');
    
    updateRollTaskLabelWithTask(li);
}

function updateRollTaskLabelWithTask(taskElement) {
    const rollTaskLabel = document.getElementById('r-task');
    rollTaskLabel.textContent = taskElement.querySelector('span').textContent;
}

function deleteTask(event) {
    const li = event.target.parentElement;
    li.remove();
    updateRollTaskButtonVisibility();
    updateRollTaskLabel();
}

function toggleTaskCompletion(event) {
    const li = event.target.parentElement;
    const ul = li.parentElement;
    const isCompleted = event.target.checked;

    li.classList.toggle('completed', isCompleted);

    if (isCompleted) {
        document.getElementById('completed').appendChild(li);
        li.classList.remove('highlighted');
    } else {
        document.getElementById('tasks').appendChild(li);
    }
    updateRollTaskButtonVisibility();
    updateRollTaskLabel();
}

function updateRollTaskLabel() {
    const tasksList = document.getElementById('tasks');
    const remainingTasks = tasksList.children.length;

    const rollTaskLabel = document.getElementById('r-task');

    const highlightedTask = document.querySelector('.highlighted');

    if (!highlightedTask) {
        if (remainingTasks > 0) {
            rollTaskLabel.textContent = 'Click "Re-roll task" to roll a new task';
        } else {
            rollTaskLabel.textContent = 'Please add a task';
        }
    }
}
