let addBtn = document.querySelector(".add-btn");
// console.log(addBtn);
let modalContainer = document.querySelector(".modal-cont");
// console.log(modalContainer);
let modalContainerTextArea = document.querySelector(".textarea-cont");
// console.log(modalContainerTextArea);
let mainContainerDiv = document.querySelector(".main-cont");
// console.log(mainContainerDiv);

let addFlag = false;

// when the user clicks on the add button then show the modal container,
// and when the user again clicks on the add button then again hide the modal container.
const ModalContainerHandler = () => {
    // Display modal
    // Generate ticket

    // addFlag, true ==> display modal container
    // addFlag, false ==> make the modal container disappear
    addFlag = !addFlag;

    if(addFlag === true) {
        // display modal container
        modalContainer.style.display = "flex";
    }
    else {
        // make the modal container disappear
        modalContainer.style.display = "none";
    }


}

let CreateNewTicketHandler = (event) => {
    // console.log(event.key);

    let currentPressedKey = event.key;

    // create a new ticket only when the user presses on "Shift" key inside the textarea of modal container
    if(currentPressedKey === "Shift") {
        
        // Create a new ticket
        createNewTicket();

        // After creating a new ticket
        modalContainer.style.display = "none";
        modalContainerTextArea.value = "";
        addFlag = false;
    }
}

let createNewTicket = () => {
    console.log("creating a new ticket...");

    // create a new div element
    let newDivForTicket = document.createElement("div");
    newDivForTicket.setAttribute("class", "ticket-cont");
    newDivForTicket.innerHTML = `
        <div class="ticket-color"></div>
            <div class="ticket-id">#sample_id</div>
            <div class="task-area">
                Lorem ipsum dolor sit amet consectetur adipisicing elit 
                Ad ea, recusandae vitae perspiciatis tempora accusamus.
        </div>
    `

    // append this new ticket div as a child of the div with class "main-cont" 
    mainContainerDiv.appendChild(newDivForTicket);
}

// Task - When the use clicks on the addBtn, then the modal container should
// appear, otherwise it should remain disapear.
addBtn.addEventListener("click", ModalContainerHandler);

// Task - add some logic to create a new ticket through DOM in html
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
modalContainer.addEventListener("keydown", (event) => {CreateNewTicketHandler(event)});