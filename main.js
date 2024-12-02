let formSubmit = document.querySelector('.form-submit');
let formEdit = document.querySelector('.form-edit');
let tableBody = document.querySelector('.table-body');
let getFirstName = document.querySelector('.first-name');
let getLastName = document.querySelector('.last-name');
let getRollNo = document.querySelector('.roll-no');
let getFirstNameEdit = document.querySelector('.first-name-edit');
let getLastNameEdit = document.querySelector('.last-name-edit');
let getRollNoEdit = document.querySelector('.roll-no-edit');

let todoList = [];
let userEditObj;





// Events

/* Bu yerda ikkita event bor. Birinchi Form submit tugma bosilsa ishlaydi. Ikkinchi Edit tugma
bosilsa ishlaydi. Inputlarni ikkiga bo'lgan holda bajarildi. Yani Edit tugma bosilsa Form inputlar butunlay o'zgaradi
asosiy form display none bo'ladi */
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!getFirstName.value.trim() || !getLastName.value.trim() || !getRollNo.value.trim()) {
        return alert('Qiymat topilmadi!');
    }

    /* Submit tugma bosilganda, Submit inputdagi qiymatlarni o'zgaruvchilarga olib addState Funksiyaga 
    obyekt yasash uchun jo'natadi */
    let firstName = getFirstName.value.trim();
    let lastName = getLastName.value.trim();
    let rollNo = getRollNo.value.trim();

    addState(firstName, lastName, rollNo);
    setHtmlContent();



    getFirstName.value = '';
    getLastName.value = '';
    getRollNo.value = '';
    
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    let todoListItem = document.querySelector('.todo-list--item');
    let listItem = todoListItem.querySelectorAll('.listItem');


    if(!getFirstNameEdit.value.trim() || !getLastNameEdit.value.trim() || !getRollNoEdit.value.trim()) {
        return alert('Qiymat topilmadi!');
    }

    // Edit qiymatlarni obyektga o'zlashtirish
    userEditObj.firstName = getFirstNameEdit.value;
    userEditObj.lastName = getLastNameEdit.value;
    userEditObj.rollNo = getRollNoEdit.value;

    
    // Ro'yhatning firstname va lastname  textContent qiymatlariga editValuedagi qiymatlarni tenglashtiradi
    listItem[0].textContent = getFirstNameEdit.value;
    listItem[1].textContent = getLastNameEdit.value;
    listItem[2].textContent = getRollNoEdit.value;
    
    formEdit.classList.add('hidden');
    formSubmit.classList.remove('hidden');
    
    console.log(listItem);
    console.log(todoList);
    setHtmlContent();


    getFirstNameEdit.value = '';
    getLastNameEdit.value = '';
    getRollNo.value = '';
}) 


// Function

// Foctarial funksiya orqali obyek yaratish
let addState = (firstName, lastName, rollNo) => {
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        rollNo: rollNo,
        id: makeID(todoList)
    }

    todoList.push(newUser);
}
// makeContent dan kelgan html taglarni tablebody ga joylab beradi
function setHtmlContent() {
    let setHtml = '';
    todoList.forEach((item) => {
        let todoHtml = makeContent(item);
        setHtml += todoHtml;
    })
    tableBody.innerHTML = setHtml;
}
// Edit tugma bosilganda ishga tushadi
function editItem(id) {
    let userItem = todoList.find(userId => userId.id === id);

    formEdit.classList.remove('hidden');
    formSubmit.classList.add('hidden');

    // TodoList obyektdan kelgan firstName va lastName larni Edit Inputga joylayabdi
    getFirstNameEdit.value = userItem.firstName;
    getLastNameEdit.value = userItem.lastName;
    getRollNoEdit.value = userItem.rollNo;

    // TodoListdagi tanlangan obyektni userEditObj global o'zgaruvchiga tenglashtiradi
    userEditObj = userItem;

    console.log(todoList);
    console.log(id);

    formEdit.classList.remove('hidden');
    formSubmit.classList.add('hidden');
}
// O'chitish funksiyasi
function deleteItem(id) {
    let userIndex = todoList.findIndex(userId => userId.id === id);

    formEdit.classList.add('hidden');
    formSubmit.classList.remove('hidden');

    todoList.splice(userIndex, 1);
    setHtmlContent();
}  



// Assistant Function

// TodoList obyektlariga id yasash
let makeID = (todoList) => {
    if(!todoList.length) return 1;
    return todoList[todoList.length - 1].id + 1;
}
// Html content tayyorlash. Bu yerdagi Item parametr setHtmlContent() funksiyadan forEach orqali kelyabdi
function makeContent(item) {
    let todoContent = `
     <tr class="todo-list--item">
        <td class="listItem">${item.firstName}</td>
        <td class="listItem">${item.lastName}</td>
        <td class="listItem">${item.rollNo}</td>
        <td>
            <button class="btn edit-btn" onclick="editItem(${item.id})">Edit</button>
            <button class="btn remove-btn" onclick="deleteItem(${item.id})">Delete</button>
        </td>
    </tr>
    `
    
    return todoContent;
}