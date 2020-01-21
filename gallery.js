/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

function Gallery(gallery) {
  if (!gallery) throw new Error("No Gallery Found!");

  // select the elements we need
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    if (modal.matches(".open")) return;
    modal.classList.add("open");

    gallery.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  }

  function closeModal() {
    modal.classList.remove("open");
    gallery.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPrevImage);
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") return closeModal();
    if (e.key === "ArrowRight") return showNextImage();
    if (e.key === "ArrowLeft") return showPrevImage();
  }

  function showImage(el) {
    if (!el) return;
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  gallery.addEventListener("click", function(e) {
    console.log(e.target);
    if (e.target.matches("img")) {
      showImage(e.target);
    }
  });

  images.forEach(function(item) {
    item.addEventListener("keyup", e => {
      if (e.key === "Enter") showImage(e.currentTarget);
    });
  });

  modal.addEventListener("click", function(e) {
    // it means user clicked on outside modal, not inside modal
    // b/c we listen for outside modal
    if (e.currentTarget === e.target) {
      closeModal();
    }
  });
}

// Use it on the page
const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
