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
  
  
  
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }
    })
  })

  document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector(".main-image")
    const thumbnails = document.querySelectorAll(".thumbnail")
    const prevButton = document.querySelector(".prev-button")
    const nextButton = document.querySelector(".next-button")
  
    let currentIndex = 0
    let intervalId
    let isPaused = false
  
    function updateMainImage(index) {
      mainImage.classList.add("fade-out")
      setTimeout(() => {
        mainImage.src = thumbnails[index].src
        mainImage.classList.remove("fade-out")
      }, 500)
  
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index)
      })
    }
  
    function showNext() {
      currentIndex = (currentIndex + 1) % thumbnails.length
      updateMainImage(currentIndex)
    }
  
    function showPrev() {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length
      updateMainImage(currentIndex)
    }
  
    function startAutoSlide() {
      intervalId = setInterval(() => {
        if (!isPaused) {
          showNext()
        }
      }, 2000)
    }
  
    function stopAutoSlide() {
      clearInterval(intervalId)
    }
  
    function pauseAutoSlide() {
      isPaused = true
      setTimeout(() => {
        isPaused = false
      }, 5000) // Resume auto-slide after 5 seconds of inactivity
    }
  
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        currentIndex = index
        updateMainImage(currentIndex)
        pauseAutoSlide()
      })
    })
  
    prevButton.addEventListener("click", () => {
      showPrev()
      pauseAutoSlide()
    })
  
    nextButton.addEventListener("click", () => {
      showNext()
      pauseAutoSlide()
    })
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        showPrev()
        pauseAutoSlide()
      }
      if (e.key === "ArrowRight") {
        showNext()
        pauseAutoSlide()
      }
    })
  
    let touchStartX = 0
    let touchEndX = 0
  
    mainImage.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })
  
    mainImage.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  
    function handleSwipe() {
      if (touchEndX < touchStartX) {
        showNext()
        pauseAutoSlide()
      }
      if (touchEndX > touchStartX) {
        showPrev()
        pauseAutoSlide()
      }
    }
  
    startAutoSlide()
  
    document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
      isPaused = true
    })
  
    document.querySelector(".carousel-container").addEventListener("mouseleave", () => {
      isPaused = false
    })
  })
  
  

