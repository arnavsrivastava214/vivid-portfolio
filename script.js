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

    // Form submission (you'll need to implement the actual form submission logic)
    const contactForm = document.getElementById("contact-form")
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        // Implement your form submission logic here
        alert("Form submitted! (This is a placeholder action)")
    })
})



