let form = document.getElementById('demo-form');
let formFieldNames = ['name', 'comments'];

form.addEventListener('submit', (event) => {
    let flag = 0;
    event.preventDefault();

    for(let elementIndex = 0; elementIndex < formFieldNames.length; elementIndex++){
        if(!document.forms['demo-form'][formFieldNames[elementIndex]].value){
            flag = 1;
            alert('All fields are compulsory');
            document.forms['demo-form'][formFieldNames[elementIndex]].focus();
            break;
        }
    }

    if(flag == 0 && !document.forms['demo-form']['gender'].value){
        flag = 1;
        alert('All fields are compulsory');
        document.forms['demo-form']['gender'][0].focus();
    }

    if(flag == 0){
        alert('FORM SUBMITTED SUCCESSFULLY');
    }
})