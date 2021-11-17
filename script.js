let addBtn = document.querySelector(".add-btn");
// console.log(addBtn);
let modalContainer = document.querySelector(".modal-cont");
// console.log(modalContainer);

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

// Task - When the use clicks on the addBtn, then the modal container should
// appear, otherwise it should remain disapear.
addBtn.addEventListener("click", ModalContainerHandler);