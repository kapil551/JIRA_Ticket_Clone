let addBtn = document.querySelector(".add-btn");
// console.log(addBtn);
let modalContainer = document.querySelector(".modal-cont");
// console.log(modalContainer);
let modalContainerTextArea = document.querySelector(".textarea-cont");
// console.log(modalContainerTextArea);
let mainContainerDiv = document.querySelector(".main-cont");
// console.log(mainContainerDiv);
let allPriorityColors = document.querySelectorAll(".priority-color");
// console.log(allPriorityColors);

let priorityColors = ["pink", "blue", "green", "black"];
let modalTicketCurrentPriorityColor = priorityColors[priorityColors.length - 1]; // "black" is the default priority color.
// console.log(modalTicketCurrentPriorityColor);


let addFlag = false;

// Event listener for modal ticket priority coloring
allPriorityColors.forEach((color, index) => {
    // console.log(color);
    color.addEventListener("click", (event) => {
        // console.log(`modal ticket priority color is ${color.classList[0]}`);

        // remove border from the previously selected priority color
        allPriorityColors.forEach((eachColor, index) => {
            eachColor.classList.remove("border-4", "border-white");
        })

        // add border to the currently selected priority color
        color.classList.add("border-4", "border-white");

        // update the modalTicket Current Priority Color
        modalTicketCurrentPriorityColor = color.classList[0];
        // console.log(modalTicketCurrentPriorityColor);
    });

});

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
    // console.log(currentPressedKey);

    // create a new ticket only when the user presses on "Shift" key inside the textarea of modal container
    if(currentPressedKey === "Alt") {
        
        // Create a new ticket
        // DOM Implementation and Manipulation - applying priority coloring to a new modal ticket
        // create a new modal ticket with the current priority color
        createNewTicket(modalTicketCurrentPriorityColor);

        // After creating a new ticket
        modalContainer.style.display = "none";
        modalContainerTextArea.value = "";
        addFlag = false;
    }
}

let createNewTicket = (currentPriorityColor) => {
    console.log("creating a new ticket...");
    
    let newModalTicketColor = "";
    console.log(currentPriorityColor);
    
    if(currentPriorityColor === "black") {
        newModalTicketColor = `bg-${currentPriorityColor}`;
    }
    else {
        newModalTicketColor = `bg-${currentPriorityColor}-500`;
    }

    // create a new div element
    /*
        THis is the div that, I want to create.
        <div class="ticket-cont h-48 w-64 bg-gray-200">
            <div class="ticket-color h-4 bg-pink-500"></div>
            <div class="ticket-id h-8 p-2">#sample_id</div>
            <div class="task-area h-5/6 p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit 
                Ad ea, recusandae vitae perspiciatis tempora accusamus.
            </div>

        </div>
     */
    let newDivForTicket = document.createElement("div");
    newDivForTicket.setAttribute("class", "ticket-cont h-48 w-64 bg-gray-200");

    // DOM Implementation and Manipulation - applying priority coloring to a new modal ticket
    // create a new modal ticket with the current priority color
    newDivForTicket.innerHTML = `
        <div class="ticket-color h-4 ${newModalTicketColor}"></div>
        <div class="ticket-id h-8 p-2">#sample_id</div>
        <div class="task-area h-5/6 p-2">
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