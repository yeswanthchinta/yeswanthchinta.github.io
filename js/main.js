"use strict";
import skillbar from "./skillbar.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });

  // Initialize skillbar animation
  skillbar();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  // Hamburger menu
  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  // Sticky header + "go to top" button
  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    const goToTop = document.querySelector("#goToTop");
    let triggerHeight = hero.offsetHeight - 170;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      goToTop.classList.remove("reveal");
    }
  });

  // Active nav link on scroll
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("active");
        });
      }
    });
  };

  // -----------------------------
  // Contact Form (Formspree)
  // -----------------------------
  const contactForm = document.querySelector(".contactForm");
  const responseBox = document.querySelector(".response");

  if (contactForm && responseBox) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const res = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (res.ok) {
          showResponse("Thank you! Your message has been sent.");
          contactForm.reset();
        } else {
          showResponse("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        showResponse("Oops! Something went wrong. Please try again.");
      }
    });

    function showResponse(message) {
      responseBox.textContent = message;
      responseBox.classList.add("open");

      setTimeout(() => {
        responseBox.classList.remove("open");
      }, 3000);
    }
  }
});
