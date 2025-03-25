openModal();

function openModal(){
    const helpElems=document.querySelectorAll(".help, .bird");
    console.log(helpElems);
    // const birdsElems=document.querySelectorAll(".bird");
    // console.log(birdsElems);
    const modals=document.querySelectorAll(".modal");

    helpElems.forEach(help => {
        help.addEventListener("click", () => {
            const modalId=help.getAttribute("data-modal");
            document.getElementById(modalId).style.display="flex";
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal")) {
                modal.style.display = "none";
            }
        });
    } );
}