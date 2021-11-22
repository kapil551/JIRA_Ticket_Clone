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

let removeBtn = document.querySelector(".remove-btn");
// console.log(removeBtn);

let addFlag = false;
let removeFlag = false;

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

// handle ticket removal --> If the ticket remove functionality is enabled then remove the modal ticket on which the user double clicks.
let handleModalTicketsRemoval = (allModalTickets) => {

    allModalTickets.forEach((modalTicket, index) => {
        // console.log(modalTicket);
        modalTicket.addEventListener("dblclick", (event) => {

            // removeFlag --> true , remove ticket enabled --> remove newModalTicket
            // removeFlag --> false, remove ticket disabled
            if(removeFlag === true) {

                modalTicket.remove();
            }

        });
    });
    
}

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
        /*
        Generating unique ticket id's for every new modal ticket

            - Google Search : short id unpkg script
            
                https://www.npmjs.com/package/shortid-dist?activeTab=readme
        */
        createNewTicket(modalTicketCurrentPriorityColor, shortid(), modalContainerTextArea.value);

        // After creating a new ticket
        modalContainer.style.display = "none";
        modalContainerTextArea.value = "";
        addFlag = false;
    }
}

let createNewTicket = (currentPriorityColor, uniqueTicketId, textAreaValue) => {
    console.log("creating a new ticket...");
    
    let newModalTicketColor = "";
    console.log(currentPriorityColor);

    console.log(uniqueTicketId);

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
    newDivForTicket.setAttribute("class", "ticket-cont h-52 w-64 bg-gray-200");

    // DOM Implementation and Manipulation - applying priority coloring to a new modal ticket
    // create a new modal ticket with the current priority color
    newDivForTicket.innerHTML = `
        <div class="ticket-color h-4 ${newModalTicketColor}"></div>
        <div class="ticket-id h-8 p-2"> ${uniqueTicketId} </div>
        <div class="task-area h-32 p-2">
            ${textAreaValue}
        </div>
        <div class="ticket-lock flex items-center justify-end pr-4 mt-1 text-xl text-gray-500">
            <i class="fas fa-lock"></i>
        </div>
    `

    // append this new ticket div as a child of the div with class "main-cont" 
    mainContainerDiv.appendChild(newDivForTicket);

        
    let allModalTickets = document.querySelectorAll(".ticket-cont");
    console.log(allModalTickets);
    handleModalTicketsRemoval(allModalTickets);

}

// Task - When the use clicks on the addBtn, then the modal container should
// appear, otherwise it should remain disapear.
addBtn.addEventListener("click", ModalContainerHandler);

// Task - adding remove ticket functionality, when the user clicks on the remove button for the first time 
// the ticket remove functionality should enable and when the user again clicks on the remove button then the 
// ticket remove functionality should disable
removeBtn.addEventListener("click", (event) => {

    // removeFlag --> true , remove ticket enabled
    // removeFlag --> false, remove ticket disabled
    removeFlag = !removeFlag; // toggle

    if(removeFlag === false) {
        console.log("remove ticket is disabled");
    }
    else {
        console.log("remove ticket is enabled");
    }
});

// Task - add some logic to create a new ticket through DOM in html
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
modalContainer.addEventListener("keydown", (event) => {CreateNewTicketHandler(event)});