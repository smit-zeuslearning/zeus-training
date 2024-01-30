// Set sidebar, navbar, content div height and width
let navbarWrapper = document.getElementById('navbar');
let sidebarWrapper = document.getElementById('sidebar');
let contetnWrapper = document.getElementById('content');

// Set dimentions of element on screen size change
window.addEventListener('resize', () => {
    setHeightWidth();
})

function setHeightWidth() {
    sidebarWrapper.style.top = `${navbarWrapper.clientHeight}px`;
    sidebarWrapper.style.height = `${window.innerHeight - navbarWrapper.clientHeight}px`;
    contetnWrapper.style.marginLeft = `${sidebarWrapper.clientWidth}px`;
    contetnWrapper.style.height = sidebarWrapper.style.height;
}
setHeightWidth();

// Toggle side bar
let hambuer = document.getElementById('hamburger')
hambuer.addEventListener('click', () => {
    sidebarWrapper.style.display === 'none'
        ? sidebarWrapper.style.display = ''
        : sidebarWrapper.style.display = 'none'
})

// if click anywhere out side of the sidebar then hide the sidebar
document.addEventListener('click', (event) => {
    if (sidebarWrapper.style.display !== 'none' && window.screen.width <= 768) {
        if (!sidebarWrapper.contains(event.target) && event.target.id != 'hamburger') {
            sidebarWrapper.style.display = 'none';
        }
    }
});

// Onclick chage the sidebar links bg color
let sidebarUl = document.getElementById('sidebar-links');
let sidebarLinks = document.querySelectorAll('#sidebar-links li');

sidebarUl.addEventListener('click', (event) => {
    event.stopPropagation();
    removeBgColor();
    event.target.classList.add('active-sidebar');
});

function removeBgColor() {
    sidebarLinks.forEach(li => {
        li.classList.remove('active-sidebar');
    })
}

// Set the today's date
let month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var today = new Date();
today = days[today.getDay()] + ", " + today.getDate() + " " + month_names[today.getMonth()];

let dateSpan = document.getElementById('date');
dateSpan.innerText = today;

// Onclick add the task to the local storage
let addTaskButton = document.getElementById('add-task-button');
let addTaskInput = document.getElementById('add-task-input');

// Unique identity generator
let id = 0;
function generateUID() {
    dt = new Date()
    UID = "" + dt.getTime() + dt.getDate() + (dt.getMonth() + 1) + dt.getFullYear();
    return UID
}

// Store the data in the local storage
function storeLocalData(dataEntry) {
    let localData = localStorage.getItem('ToDoListData');
    if (localData == null) {
        localStorage.setItem('ToDoListData', JSON.stringify({ [dataEntry.id]: dataEntry }));
    } else {
        let dt = JSON.parse(localStorage.getItem('ToDoListData'));
        dt[dataEntry.id] = dataEntry;
        localStorage.setItem('ToDoListData', JSON.stringify(dt));
    }
}

// JS markup to add and remove task list dynamically
let taskContainer = document.getElementById('task-list');

function renderTaskList(data) {
    let JSMarkup = Object.values(data).map((element) => {
        return `
            <li 
                id = '${element.id}'
                class='${element.completed ? "completed-task" : ""}'
            >
                <span>
                    ${element.completed
                ? `<svg class='task-status' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
                : `<svg class='task-status' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
            }
                    ${element.text}
                </span>

                <span>
                    <svg class='task-edit-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                    <svg class='task-delete-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </span>

            </li>
        `
    }).join("")
    return JSMarkup;
}

// Initially render existing task list
if (localStorage.getItem('ToDoListData')) {
    taskContainer.innerHTML = renderTaskList(JSON.parse(localStorage.getItem('ToDoListData')));
}

// Update the task list value
function updateTaskListValue(updatedData) {
    let data = JSON.parse(localStorage.getItem('ToDoListData'));
    data[updatedData.id] = updatedData;
    localStorage.setItem('ToDoListData', JSON.stringify(data));
    taskContainer.innerHTML = renderTaskList(data);
}

// Add task to the local storage
addTaskButton.addEventListener('click', () => {
    if (addTaskInput.value != '') {

        let listId = addTaskInput.getAttribute('listID');
        if (listId) {
            console.log('list id is available')
            let listObj = {
                id: listId,
                text: addTaskInput.value,
                completed: false
            }
            updateTaskListValue(listObj)
            addTaskInput.removeAttribute('listId');
            addTaskInput.value = '';
        } else {
            console.log('list id is not available')
            let listObj = {
                id: generateUID(),
                text: addTaskInput.value,
                completed: false
            }
            storeLocalData(listObj);
            taskContainer.insertAdjacentHTML('beforeend', renderTaskList({ [listObj.id]: listObj }));
            addTaskInput.value = "";
        }
    }
});

console.log('list id is: ' + addTaskInput.getAttribute('listID'))

// Change the status of the element in storage
function flipTaskChange(id) {
    data = JSON.parse(localStorage.getItem('ToDoListData'));
    data[id].completed = !data[id].completed
    localStorage.setItem('ToDoListData', JSON.stringify(data));
    taskContainer.innerHTML = renderTaskList(data);
}

// Delete the task
function deleteTask(id) {
    data = JSON.parse(localStorage.getItem('ToDoListData'));
    delete data[id];
    localStorage.setItem('ToDoListData', JSON.stringify(data));
    taskContainer.innerHTML = renderTaskList(data);
}

// On Click chaneg the task status
taskContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-status')) {
        flipTaskChange(event.target.parentElement.parentElement.id);
    }

    if (event.target.classList.contains('task-delete-button')) {
        deleteTask(event.target.parentElement.parentElement.id);
    }

    if (event.target.classList.contains('task-edit-button')) {
        let dataID = event.target.parentElement.parentElement.id;
        addTaskInput.setAttribute('listId', dataID);
        addTaskInput.value = JSON.parse(localStorage.getItem('ToDoListData'))[event.target.parentElement.parentElement.id].text;
        cancelEditButton.style.display = 'flex';
    }
})

// Cancel the editing
let cancelEditButton = document.getElementById('cancel-edit-button');
cancelEditButton.addEventListener('click', () => {
    addTaskInput.removeAttribute('listId');
    addTaskInput.value = '';
    cancelEditButton.style.display = 'none';
})
