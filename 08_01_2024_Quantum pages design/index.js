// Toggle announcement menu on click
let hamburgermenu = document.getElementById('hamburger-drop-links');
let hamburgerIcon = document.getElementById('hamburger');
hamburgerIcon.addEventListener('click', () => {
    if(hamburgermenu.classList.contains('d-none')){
        hamburgermenu.classList.remove('d-none');
        hamburgermenu.classList.add('d-block');
        hamburgerIcon.style.fill='#FFFFFF'
    }else{
        hamburgermenu.classList.remove('d-block');
        hamburgermenu.classList.add('d-none');
        hamburgerIcon.style.fill='#3FD28B'
    }
})


// Toggle announcement menu on click
let announcementMenu = document.getElementById('announcement-menu');
let announcementIcon = document.getElementById('announcement-icon');
announcementIcon.addEventListener('click', () => {
    if(announcementMenu.classList.contains('d-none')){
        announcementMenu.classList.remove('d-none');
        announcementMenu.classList.add('d-block');
        announcementIcon.style.fill='#FFFFFF'
    }else{
        announcementMenu.classList.remove('d-block');
        announcementMenu.classList.add('d-none');
        announcementIcon.style.fill='#3FD28B'
    }
})

// Toggle notification menu
let notificationMenu = document.getElementById('notification-menu');
let notificationIcon = document.getElementById('notification-icon');
notificationIcon.addEventListener('click', () => {
    if(notificationMenu.classList.contains('d-none')){
        notificationMenu.classList.remove('d-none');
        notificationMenu.classList.add('d-block');
        notificationIcon.style.fill='#FFFFFF'
    }else{
        notificationMenu.classList.remove('d-block');
        notificationMenu.classList.add('d-none');
        notificationIcon.style.fill='#3FD28B'
    }
})