// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

/* Hero Background 3D Scroll Parallax */
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    // Move background vertically at a different speed than scroll to create depth
    heroSection.style.backgroundPosition = `center ${50 + scrollPos * 0.1}%`;
});

/* 3D Tilt Effect for Cards */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});


// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});


// Scroll Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Glitch Text Effect
const glitchText = document.querySelector('.glitch');
const titles = ['CS Engineer', 'Problem Solver', 'Full Stack Dev'];
let titleIndex = 0;

function changeTitle() {
    glitchText.style.opacity = '0';
    setTimeout(() => {
        titleIndex = (titleIndex + 1) % titles.length;
        glitchText.textContent = titles[titleIndex];
        glitchText.setAttribute('data-text', titles[titleIndex]);
        glitchText.style.opacity = '1';
    }, 500);
}

setInterval(changeTitle, 3000);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        Object.assign(navLinks.style, {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '80px',
            left: '0',
            width: '100%',
            background: 'rgba(13, 13, 18, 0.95)',
            padding: '2rem',
            textAlign: 'center'
        });
    } else {
        navLinks.style = '';
    }
});

// Contact Form Handling
const form = document.getElementById('contact-form');
const result = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.style.display = 'block';
        result.innerHTML = "Sending...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Thanks for connecting with Musaib! 🚀";
                    result.style.color = "#00cec9"; // Success color
                    form.reset();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                result.style.color = "red";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
            });
    });
}
