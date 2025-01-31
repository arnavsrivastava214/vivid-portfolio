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
    const phModal = document.getElementById("phReviewModal")
    const phOpenModalBtn = document.getElementById("phOpenReviewModal")
    const phCloseBtn = document.querySelector(".ph_modal_close")
    const phStars = document.querySelectorAll(".ph_star")
    const phSubmitReviewBtn = document.getElementById("phSubmitReview")
    const phReviewsContainer = document.getElementById("phReviewsContainer")
    const phAverageRatingElement = document.getElementById("phAverageRating")
  
    let phCurrentRating = 0
  
    phOpenModalBtn.onclick = () => (phModal.style.display = "block")
    phCloseBtn.onclick = () => (phModal.style.display = "none")
  
    window.onclick = (event) => {
      if (event.target == phModal) {
        phModal.style.display = "none"
      }
    }
  
    phStars.forEach((star) => {
      star.addEventListener("mouseover", () => {
        const rating = Number.parseInt(star.getAttribute("data-rating"))
        phHighlightStars(rating)
      })
  
      star.addEventListener("mouseout", () => {
        phHighlightStars(phCurrentRating)
      })
  
      star.addEventListener("click", () => {
        phCurrentRating = Number.parseInt(star.getAttribute("data-rating"))
        phHighlightStars(phCurrentRating)
      })
    })
  
    function phHighlightStars(rating) {
      phStars.forEach((star) => {
        const starRating = Number.parseInt(star.getAttribute("data-rating"))
        if (starRating <= rating) {
          star.classList.add("active")
        } else {
          star.classList.remove("active")
        }
      })
    }
  
    phSubmitReviewBtn.addEventListener("click", () => {
      const phReviewText = document.getElementById("phReviewText").value
      const phReviewerName = document.getElementById("phReviewerName").value
      if (phCurrentRating > 0 && phReviewText.trim() !== "") {
        const phReview = {
          rating: phCurrentRating,
          text: phReviewText,
          name: phReviewerName || "Anonymous",
          date: new Date().toISOString(),
          id: Date.now(), // Unique identifier for each review
        }
        phSaveReview(phReview)
        phDisplayReview(phReview)
        phUpdateAverageRating()
        phResetModal()
        phModal.style.display = "none"
      } else {
        alert("Please provide both a rating and a review.")
      }
    })
  
    function phSaveReview(review) {
      const phReviews = JSON.parse(localStorage.getItem("phReviews")) || []
      phReviews.push(review)
      localStorage.setItem("phReviews", JSON.stringify(phReviews))
    }
  
    function phDisplayReview(review) {
      const phReviewElement = document.createElement("div")
      phReviewElement.classList.add("ph_review_item")
      phReviewElement.dataset.id = review.id
      phReviewElement.innerHTML = `
              <div class="ph_review_stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
              <div class="ph_review_text">${review.text}</div>
              <div class="ph_review_author">- ${review.name}</div>
              <div class="ph_review_date">${new Date(review.date).toLocaleDateString()}</div>
          `
      phReviewsContainer.insertBefore(phReviewElement, phReviewsContainer.firstChild)
    }
  
    function phResetModal() {
      phCurrentRating = 0
      phHighlightStars(0)
      document.getElementById("phReviewText").value = ""
      document.getElementById("phReviewerName").value = ""
    }
  
    function phUpdateAverageRating() {
      const phReviews = JSON.parse(localStorage.getItem("phReviews")) || []
      if (phReviews.length === 0) {
        phAverageRatingElement.style.display = "none"
        return
      }
  
      const phTotalRating = phReviews.reduce((sum, review) => sum + review.rating, 0)
      const phAverageRating = phTotalRating / phReviews.length
      const phRoundedRating = Math.round(phAverageRating * 10) / 10
  
      phAverageRatingElement.style.display = "block"
      phAverageRatingElement.querySelector(".ph_avg_stars").innerHTML =
        "★".repeat(Math.round(phAverageRating)) + "☆".repeat(5 - Math.round(phAverageRating))
      phAverageRatingElement.querySelector(".ph_avg_value").textContent = phRoundedRating.toFixed(1)
      phAverageRatingElement.querySelector(".ph_total_reviews").textContent =
        `(${phReviews.length} review${phReviews.length !== 1 ? "s" : ""})`
    }
  
    function phLoadReviews() {
      const phReviews = JSON.parse(localStorage.getItem("phReviews")) || []
      phReviews.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
      phReviewsContainer.innerHTML = "" // Clear existing reviews
      phReviews.forEach((review) => phDisplayReview(review))
      phUpdateAverageRating()
    }
  
    phLoadReviews()
  
    setInterval(phLoadReviews, 30000)
  
    window.addEventListener("storage", (event) => {
      if (event.key === "phReviews") {
        phLoadReviews()
      }
    })
  })
  

