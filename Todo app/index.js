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

addTaskButton.addEventListener('click', () => {
    storeLocalData(
        {
            id: id++,
            text: addTaskInput.value,
            completed: false
        }
    );
    addTaskInput.value = "";

    console.log('local Data: ')
    console.log(localStorage.getItem('ToDoListData'))
});

// Dummy data for the task
let taskListData = [
    {
        text: "Wake up This is task list 1",
        completed: false
    },
    {
        text: 'Get ready This is task list 2',
        completed: true
    },
    {
        text: 'Go to the office - This is task list 3',
        completed: false
    },
    {
        text: 'Come back to the home - This is task list 4',
        completed: true
    }
];

// Store the data in the local storage
function storeLocalData(dataEntry) {
    let localData = localStorage.getItem('ToDoListData'); 
    if(localData == null){
        let temp = []
        localStorage.setItem('ToDoListData', temp.push(JSON.stringify(dataEntry)))
    }else{
        localData.forEach
        console.log('data type')
        console.log(typeof(JSON.parse(localData)))
        console.log('data')
        console.log(localData)
        localStorage.setItem('ToDoListData', localData.push(JSON.stringify(dataEntry)));
    }
}
// storeLocalData();

// localStorage.setItem('ToDoListData', taskListData);
console.log('Getting data from the local storage');
console.log((localStorage.getItem('ToDoListData')))

// JS markup to add and remove task list dynamically
let taskContainer = document.getElementById('task-container');

let JSMarkup = `
    <ul>
        ${taskListData.map((element) => {
    return `
                    <li 
                        class='${element.completed ? "completed-task" : ""}'
                    >
                        ${element.completed
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
        }
                        ${element.text
        }
                    </li>
                `
}).join("")
    }
    </ul>
`
taskContainer.innerHTML = JSMarkup;

// On icon click change the task status


{/* <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            Task 1
        </li>
        <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            Task 2
        </li>
        <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            Task 3
        </li>
        <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            Task 4
        </li> */}