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
    let phReviews = []
  
    // Simulated initial reviews
    const phInitialReviews = [
      {
        id: 1,
        rating: 5,
        text: "Amazing photographer! Captured our wedding beautifully.",
        name: "Emily",
        date: "2023-05-15T10:30:00Z",
      },
      {
        id: 2,
        rating: 4,
        text: "Great work on our family portraits. Very professional.",
        name: "Michael",
        date: "2023-06-02T14:45:00Z",
      },
      {
        id: 3,
        rating: 5,
        text: "Incredible landscape shots. Truly talented!",
        name: "Sarah",
        date: "2023-06-10T09:15:00Z",
      },
    ]
  
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
          id: Date.now(),
          rating: phCurrentRating,
          text: phReviewText,
          name: phReviewerName || "Anonymous",
          date: new Date().toISOString(),
        }
        phSimulateReviewSubmission(phReview)
        phResetModal()
        phModal.style.display = "none"
      } else {
        alert("Please provide both a rating and a review.")
      }
    })
  
    function phSimulateReviewSubmission(review) {
      setTimeout(() => {
        phReviews.unshift(review)
        phDisplayReview(review)
        phUpdateAverageRating()
      }, 500)
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
  
    function phLoadInitialReviews() {
      setTimeout(() => {
        phReviews = [...phInitialReviews]
        phReviews.forEach((review) => phDisplayReview(review))
        phUpdateAverageRating()
      }, 1000)
    }
  
    function phSimulateFetchNewReviews() {
      setInterval(() => {
        if (Math.random() < 0.3) {
          const newReview = {
            id: Date.now(),
            rating: Math.floor(Math.random() * 5) + 1,
            text: "This is a simulated review from another user.",
            name: "Simulated User",
            date: new Date().toISOString(),
          }
          phReviews.unshift(newReview)
          phDisplayReview(newReview)
          phUpdateAverageRating()
        }
      }, 30000)
    }
  
    phLoadInitialReviews()
    phSimulateFetchNewReviews()
  })
  
  

