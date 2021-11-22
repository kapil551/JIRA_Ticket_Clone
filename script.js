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

// fontawsome lock-open icon --> <i class="fas fa-lock-open"></i>
let unlockClass = "fa-lock-open";
// fontawesome lock icon --> <i class="fas fa-lock"></i>
let lockClass = "fa-lock";

let addFlag = false;
let removeFlag = false;

let toolboxColors = document.querySelectorAll(".color");
// console.log(toolboxColors);

// array of objects to access every modal ticket
let modalTicketsArr = [];

/*

Adding Ticket Filter functionality

    When the user "clicks" on a particular color from toolbox colors then It should display only those tickets having that
    ticket color

    When the user ""double clicks" on any color from toolbox colors then display all tickets.
*/
for(let i = 0; i < toolboxColors.length; i++) {

    // filter ticket on "click"
    toolboxColors[i].addEventListener("click", (event) => {

        let filterColor = toolboxColors[i].classList[0];
        console.log(filterColor);

        // filter tickets based on filterColor
        let filteredModalTicketsArr = modalTicketsArr.filter((eachTicketObject, index) => {

            return eachTicketObject.currentPriorityColor === filterColor;
        });

        // remove already displayed tickets from DOM
        let allAlreadyDisplayedTickets = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allAlreadyDisplayedTickets.length; i++) {

            allAlreadyDisplayedTickets[i].remove();
        }

        // display the filtered tickets
        filteredModalTicketsArr.forEach((eachTicketObject, index) => {

            createNewTicket(eachTicketObject.currentPriorityColor, eachTicketObject.textAreaValue, eachTicketObject.uniqueTicketId);
        })

    });

    // display all tickets on "double click"
    toolboxColors[i].addEventListener("dblclick", (event) => {

        // remove already displayed tickets from DOM
        let allAlreadyDisplayedTickets = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allAlreadyDisplayedTickets.length; i++) {

            allAlreadyDisplayedTickets[i].remove();
        }

        // display all tickets
        modalTicketsArr.forEach((eachTicketObject, index) => {

            createNewTicket(eachTicketObject.currentPriorityColor, eachTicketObject.textAreaValue, eachTicketObject.uniqueTicketId);
        })

    });
}


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
let handleModalTicketsRemoval = (modalTicket, modalTicketUniqueID) => {

    // console.log(modalTicket);
    modalTicket.addEventListener("dblclick", (event) => {

        // removeFlag --> true , remove ticket enabled --> remove newModalTicket
        // removeFlag --> false, remove ticket disabled
        if(removeFlag === true) {

            // get the modal ticket index
            let modalTicketIndex = modalTicketsArr.findIndex((eachTicketObject, index) => {

                return eachTicketObject.uniqueTicketId === modalTicketUniqueID;
            });
            console.log(modalTicketIndex);

            // Modify the data in localStorage (remove ticket)
            modalTicketsArr.splice(modalTicketIndex, 1);
            localStorage.setItem("jira_tickets", JSON.stringify(modalTicketsArr)); 

            modalTicket.remove(); // remove from DOM

        }

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
        createNewTicket(modalTicketCurrentPriorityColor, modalContainerTextArea.value);

        addFlag = false;
        // After creating a new ticket --> reset modal to default state
        resetModalToDefaultState();
    }
}

// After creating a new ticket --> reset modal to default state
let resetModalToDefaultState = () => {

    modalContainer.style.display = "none";
    modalContainerTextArea.value = "";
    modalTicketCurrentPriorityColor = priorityColors[priorityColors.length - 1]; // "black" is the default priority color.
    allPriorityColors.forEach((eachColor, index) => {
        eachColor.classList.remove("border-4", "border-white");
    });

    allPriorityColors[allPriorityColors.length - 1].classList.add("border-4", "border-white");
    
}

 /* Adding a ticket lock and unlock functionality

    If the ticket is locked then unlock it when the user clicks on it, and if the ticket is unlocked then lock it again when the user clicks on it again.
*/
let handleModalTicketsLockAndUnlock = (modalTicket, modalTicketUniqueID) => {

    let ticketLockElem = modalTicket.querySelector(".ticket-lock");
    // console.log(ticketLockElem);
    let ticketLock = ticketLockElem.children[0];
    // console.log(ticketLock);
    let ticketTaskArea = modalTicket.querySelector(".task-area");
    // console.log(ticketTaskArea);

    ticketLock.addEventListener("click", (event) => {
        console.log(ticketLock);
        
        // if ticket is locked
        if(ticketLock.classList.contains(lockClass)) {
            
            // then unlock it
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        }
        // else ticket is unlocked
        else {
            // then lock it
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }

        // get the modal ticket index
        let modalTicketIndex = modalTicketsArr.findIndex((eachTicketObject, index) => {

            return eachTicketObject.uniqueTicketId === modalTicketUniqueID;
        });
        console.log(modalTicketIndex);

        // Modify the data in localStorage (update ticket task)
        modalTicketsArr[modalTicketIndex].textAreaValue = ticketTaskArea.innerText;
        localStorage.setItem("jira_tickets", JSON.stringify(modalTicketsArr)); 
    });

}

/*
    Change the modal ticket color priority

        When the user clicks on the modal ticket color then it should change the color to the next priority color
*/
let handleModalTicketsPriorityColorChange = (modalTicket, modalTicketUniqueID) => {

    let ticketColorDiv = modalTicket.querySelector(".ticket-color");
   
    ticketColorDiv.addEventListener("click", (event) => {

        console.log(ticketColorDiv);
        let currentTicketColorString = ticketColorDiv.classList[2];
        // console.log(currentTicketColorString);

        let currentTicketColorStringToArray = currentTicketColorString.split("-");
        // console.log(currentTicketColorStringToArray)

        let currentTicketColor = currentTicketColorStringToArray[1];
        // console.log(currentTicketColor);

        // get the index of the current ticket color from the priorityColors array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        let indexOfCurrentTicketColor = priorityColors.findIndex((color) => {

            return currentTicketColor === color;
        });

        console.log(currentTicketColor, indexOfCurrentTicketColor);
        indexOfCurrentTicketColor++; // go to the next color in priorityColors array
        let indexOfnewTicketColor = indexOfCurrentTicketColor % priorityColors.length; // also handle out of bound indexes

        let newTicketColor = priorityColors[indexOfnewTicketColor];
        console.log(newTicketColor, indexOfnewTicketColor);

        if(currentTicketColor === "black") {

            ticketColorDiv.classList.remove(`bg-${currentTicketColor}`);

            if(newTicketColor === "black") {

                ticketColorDiv.classList.add(`bg-${newTicketColor}`);
            }
            else {
                ticketColorDiv.classList.add(`bg-${newTicketColor}-500`);
            }

        }
        else {

            ticketColorDiv.classList.remove(`bg-${currentTicketColor}-500`);

            if(newTicketColor === "black") {

                ticketColorDiv.classList.add(`bg-${newTicketColor}`);
            }
            else {
                ticketColorDiv.classList.add(`bg-${newTicketColor}-500`);
            }

        }

        // get the modal ticket index
        let modalTicketIndex = modalTicketsArr.findIndex((eachTicketObject, index) => {

            return eachTicketObject.uniqueTicketId === modalTicketUniqueID;
        });
        console.log(modalTicketIndex);

        // Modify the data in localStorage (priority color change)
        modalTicketsArr[modalTicketIndex].currentPriorityColor = newTicketColor;
        localStorage.setItem("jira_tickets", JSON.stringify(modalTicketsArr)); 
    })
}

let createNewTicket = (currentPriorityColor, textAreaValue, uniqueTicketId) => {
    console.log("creating a new ticket...");
    
    // new ticket ka uniqueID undefined aaye ga toh uske liye shortid() se uniqueID generate karo
    /*
        if(uniqueTicketId === undefined) {
        let uniqueID = shortid();
        }
        else {
        let uniqueID = uniqueTicketId
        }

    */
    let uniqueID = uniqueTicketId || shortid();
    console.log(uniqueID);

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
    newDivForTicket.setAttribute("class", "ticket-cont h-52 w-64 bg-gray-200");

    // DOM Implementation and Manipulation - applying priority coloring to a new modal ticket
    // create a new modal ticket with the current priority color
    newDivForTicket.innerHTML = `
        <div class="ticket-color h-4 ${newModalTicketColor}"></div>
        <div class="ticket-id h-8 p-2"> ${uniqueID} </div>
        <div class="task-area h-32 p-2 outline-none">
            ${textAreaValue}
        </div>
        <div class="ticket-lock flex items-center justify-end pr-4 mt-1 text-xl text-gray-500">
            <i class="fas fa-lock"></i>
        </div>
    `

    // append this new ticket div as a child of the div with class "main-cont" 
    mainContainerDiv.appendChild(newDivForTicket);

    // Create an object of new modal ticket and push it to modalTicketsArr
    // only push the newly created modal ticket to the modalTicketsArr
    console.log(uniqueTicketId);
    if(uniqueTicketId === undefined) {
        modalTicketsArr.push({
            currentPriorityColor,
            uniqueTicketId: uniqueID,
            textAreaValue
        });

        // create a local storage named "jira_tickets"
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
        // stored data is always in key-value pairs which should be a string i.e JSON format for objects.
        localStorage.setItem("jira_tickets", JSON.stringify(modalTicketsArr)); 
    }
    

    let allModalTickets = document.querySelectorAll(".ticket-cont");
    console.log(allModalTickets);
    handleModalTicketsRemoval(newDivForTicket, uniqueID);

    /* Adding a ticket lock and unlock functionality

        If the ticket is locked then unlock it when the user clicks on it, and if the ticket is unlocked then lock it again when the user clicks on it again.
    */
    handleModalTicketsLockAndUnlock(newDivForTicket, uniqueID);

    /*
        Change the modal ticket color priority

            When the user clicks on the modal ticket color then it should change the color to the next priority color
    */
    handleModalTicketsPriorityColorChange(newDivForTicket, uniqueID);

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