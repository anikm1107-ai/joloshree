// js/main.js - Shared JavaScript for Joloshree Restaurant Website

// ========== HERO VIDEO AUTOPLAY FIX ==========
document.addEventListener('DOMContentLoaded', function() {
    // Ensure hero video plays on home page
    const heroVideo = document.getElementById('heroBgVideo');
    if (heroVideo) {
        heroVideo.play().catch(e => {
            console.log("Video autoplay prevented. User interaction needed.");
            // Add click-to-play on body if autoplay fails
            document.body.addEventListener('click', function playOnce() {
                heroVideo.play();
                document.body.removeEventListener('click', playOnce);
            }, { once: true });
        });
    }
});

// ========== LOADING SCREEN ANIMATION ==========
// This runs only on index.html (loading screen)
const loadingScreen = document.getElementById('loadingScreen');
if (loadingScreen) {
    const loadingText = document.querySelector('.loading-text');
    const messages = ["🌊 casting off...", "🐟 tide welcomes you", "⛵ setting sail to Joloshree", "🌿 river whispers", "🍽️ floating kitchen ready"];
    let idx = 0;
    
    setInterval(() => {
        if (loadingText) {
            loadingText.innerHTML = `⟡ ${messages[idx % messages.length]} ⟡`;
            idx++;
        }
    }, 800);
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = "home.html";
    }, 3000);
}

// ========== BOOKING FORM VALIDATION (if on booking page) ==========
const bookingForm = document.getElementById('bookingForm');
const toast = document.getElementById('toastMsg');

if (bookingForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    function showMessage(msg, isError = false) {
        if (!toast) return;
        toast.style.backgroundColor = isError ? '#a1423a' : '#1d6d63';
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('bookingDate').value;
        const persons = document.getElementById('persons').value;
        const diningLocation = document.querySelector('input[name="diningLocation"]:checked')?.value;
        
        // Validation
        if (!name.trim()) {
            showMessage("Please enter your name", true);
            return;
        }
        if (!phone.trim()) {
            showMessage("Phone number is required", true);
            return;
        }
        if (!email.trim() || !email.includes('@')) {
            showMessage("Enter a valid email address", true);
            return;
        }
        if (!date) {
            showMessage("Select your booking date", true);
            return;
        }
        
        // Save to localStorage
        const bookingRecord = {
            name: name,
            phone: phone,
            email: email,
            date: date,
            persons: persons,
            location: diningLocation || "Inside Restaurant",
            timestamp: new Date().toISOString()
        };
        
        let bookings = JSON.parse(localStorage.getItem('joloshree_bookings') || '[]');
        bookings.push(bookingRecord);
        localStorage.setItem('joloshree_bookings', JSON.stringify(bookings));
        
        showMessage(`✨ Bon Voyage ${name.split(' ')[0]}! Your table for ${persons} on ${date} is reserved. ✨`);
        
        // Reset form
        bookingForm.reset();
        document.getElementById('persons').value = "2";
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
            window.location.href = "home.html";
        }, 2000);
    });
}

// ========== IMAGE SLIDER (if on booking page with slider) ==========
const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (sliderImage && prevBtn && nextBtn) {
    // All 11 images with mixed extensions
    const images = [
        "images/s1.jpg",
        "images/s2.jpg",
        "images/s3.jpeg",
        "images/s4.jpg",
        "images/s5.jpg",
        "images/s6.jpeg",
        "images/s7.jpeg",
        "images/s8.jpeg",
        "images/s9.jpeg",
        "images/s10.jpeg",
        "images/s11.jpeg"
    ];
    
    let currentIndex = 0;
    const totalImages = images.length;
    const sliderDots = document.getElementById('sliderDots');
    const imageCounter = document.getElementById('imageCounter');
    
    function updateSlider() {
        sliderImage.src = images[currentIndex];
        if (imageCounter) {
            imageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
        // Update active dot
        if (sliderDots) {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
    }
    
    // Create dots
    if (sliderDots) {
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            sliderDots.appendChild(dot);
        }
    }
    
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard arrow support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
    
    updateSlider();
}

// ========== SMOOTH SCROLLING (optional) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "#/" && href !== "") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========== CONSOLE LOG FOR DEBUGGING ==========
console.log("Joloshree - The Rivière Habitat website loaded successfully! 🚢");