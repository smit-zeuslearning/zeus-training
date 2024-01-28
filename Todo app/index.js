// calculate height of the navbar
let navbarWrapper = document.getElementById('navbar');

// Calculate width of the sidebar
let sidebarWrapper = document.getElementById('sidebar');
sidebarWrapper.style.top = `${navbarWrapper.clientHeight}px`;

// Set margin-left for the content div
let contetnWrapper = document.getElementById('content');
contetnWrapper.style.marginLeft = `${sidebarWrapper.clientWidth}px`

// Toggle side bar
let hambuer = document.getElementById('hamburger')
hambuer.addEventListener('click', () => {
    sidebarWrapper.style.display === 'none'
        ? sidebarWrapper.style.display = ''
        : sidebarWrapper.style.display = 'none'
})

// if click anywhere out side of the sidebar then hide the sidebar
document.addEventListener('click', (event) => {
    if (sidebarWrapper.style.display !== 'none') {
        if (!sidebarWrapper.contains(event.target) && event.target.id != 'hamburger') {
            sidebarWrapper.style.display = 'none';
        }
    }
})