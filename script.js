document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none"
    }, 2000)

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            })
        })
    })

    const darkModeToggle = document.getElementById("darkModeToggle")
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
    })

    const modal = document.querySelector(".modal")
    const modalImg = document.querySelector(".modal-content")
    const modalClose = document.querySelector(".modal-close")
    const galleryItems = document.querySelectorAll(".gallery-item img")

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            modal.style.display = "flex"
            modalImg.src = item.src
        })
    })

    modalClose.addEventListener("click", () => {
        modal.style.display = "none"
    })

    // GSAP Animations
    gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.5 })
    gsap.from(".gallery-item", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: ".gallery", start: "top 80%" },
    })
    gsap.from(".about-content", {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: { trigger: ".about", start: "top 80%" },
    })
    gsap.from(".about-image", { opacity: 0, x: 50, duration: 1, scrollTrigger: { trigger: ".about", start: "top 80%" } })
    gsap.from(".contact form", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: { trigger: ".contact", start: "top 80%" },
    })

 
})

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
    const navItems = document.querySelectorAll(".nav-links li a")
    const breadcrumb = document.querySelector(".breadcrumb span")
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        breadcrumb.textContent = item.textContent
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  
  
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })
  
  

