function openModal() {
  const helpElems = document.querySelectorAll(".help, .bird");
  console.log(helpElems);
  // const birdsElems=document.querySelectorAll(".bird");
  // console.log(birdsElems);
  const modals = document.querySelectorAll(".modal");

  helpElems.forEach((help) => {
    help.addEventListener("click", () => {
      const modalId = help.getAttribute("data-modal");
      document.getElementById(modalId).style.display = "flex";
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        modal.style.display = "none";
      }
    });
  });
}

function drag() {
  const dragElems = document.querySelectorAll(".nest-picture");
  const treeContainer = document.querySelector(".tree-container");
  console.log(treeContainer);
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints;

  function isInsideTreeContainer(element) {
    const elementRect = element.getBoundingClientRect();
    const treeRect = treeContainer.getBoundingClientRect();

    return (
      elementRect.left >= treeRect.left &&
      elementRect.right <= treeRect.right &&
      elementRect.top >= treeRect.top &&
      elementRect.bottom <= treeRect.bottom
    );
  }

  dragElems.forEach((element) => {
    let posX = 0,
      posY = 0;
    let startX = 0,
      startY = 0;
    let isDragging = false;
    let isLocked = false;

    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag, {
      passive: false,
    });

    function startDrag(e) {
      if (isLocked) return;

      e.preventDefault();
      isDragging = true;
      element.classList.add("dragging");

      if (isTouchDevice && e.touches) {
        startX = e.touches[0].clientX - posX;
        startY = e.touches[0].clientY - posY;
      } else {
        startX = e.clientX - posX;
        startY = e.clientY - posY;
      }

      document.addEventListener("mousemove", dragElement);
      document.addEventListener("touchmove", dragElement, {
        passive: false,
      });
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);
    }

    function dragElement(e) {
      if (!isDragging || isLocked) return;
      e.preventDefault();

      if (isTouchDevice && e.touches) {
        posX = e.touches[0].clientX - startX;
        posY = e.touches[0].clientY - startY;
      } else {
        posX = e.clientX - startX;
        posY = e.clientY - startY;
      }

      element.style.transform = `translate(${posX}px, ${posY}px)`;
    }

    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      element.classList.remove("dragging");

      //   if (isInsideTreeContainer(element)) {
      //     isLocked = true;
      //     const computedStyle = window.getComputedStyle(element);
      //     const matrix = computedStyle.transform.match(/^matrix\((.+)\)$/);

      //     if (matrix) {
      //       const values = matrix[1].split(", ");
      //       const translateX = parseFloat(values[4]);
      //       const translateY = parseFloat(values[5]);

      //       element.style.transform = "none";
      //       element.style.left = `${translateX}px`;
      //       element.style.top = `${translateY}px`;
      //     }

      //     element.removeEventListener("mousedown", startDrag);
      //     element.removeEventListener("touchstart", startDrag);
      //   }

      document.removeEventListener("mousemove", dragElement);
      document.removeEventListener("touchmove", dragElement);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  openModal();
  drag();
});
