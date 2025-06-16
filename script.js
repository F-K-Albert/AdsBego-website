// Make sure galleryImages is available globally or imported via <script> in HTML
// Remove the CommonJS require for browser compatibility
// const { galleryImages } = require("./galleryImages");

// Replace the URL below with your WhatsApp or social media page link
// const joinUsUrl = "https://wa.me/0594166010"; // Example WhatsApp link

// Assuming your button has an id="joinUsBtn"
document.getElementById("joinUsBtn").addEventListener("click", function() {
    window.open(joinUsUrl, "_blank");
});

// Menu toggle functionality
  function toggleMenu() {
  var menu = document.getElementById('menuList');
       menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
        // Optional: Hide menu when clicking outside
        document.addEventListener('click', function(event) {
            var menu = document.getElementById('menuList');
            var icon = document.querySelector('.menu-icon');
            if (!menu.contains(event.target) && !icon.contains(event.target)) {
                menu.style.display = 'none';
            }
        });



//  Join Us button functionality
        document.getElementById('joinUsBtn').addEventListener('click', function() {
            alert('Thank you for your interest in joining us!');
            window.location.href = 'JoinUs.html';
        });
   
        
// Create gallery container
const galleryContainer = document.createElement("div");
galleryContainer.style.display = "flex";
galleryContainer.style.justifyContent = "center";
galleryContainer.style.alignItems = "center";
galleryContainer.style.gap = "10px";
galleryContainer.style.border = "8px solid orange";
galleryContainer.style.padding = "16px";
galleryContainer.style.background = "linear-gradient(45deg, #ff9800, #fff3e0)";
galleryContainer.style.width = "max-content";
galleryContainer.style.height = "max-content";

// Add images to gallery
galleryImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery Image";
    img.style.width = "150px";
    img.style.height = "150px"; // Make image square
    img.style.objectFit = "cover";
    img.style.boxShadow = "0 0 20px 5px orange";
    img.style.borderRadius = "8px";
    galleryContainer.appendChild(img);
});

// Adjust galleryContainer to be square
const totalWidth = galleryImages.length * 150 + (galleryImages.length - 1) * 10 + 32; // images + gaps + padding
galleryContainer.style.width = totalWidth + "px";
galleryContainer.style.height = totalWidth + "px";

// Append gallery to the element with id="partners-frame"
const partnersFrame = document.getElementById("partners-frame");
if (partnersFrame) {
    partnersFrame.appendChild(galleryContainer);
}

// after signing up mesage
const signupForm = document.querySelector('form[action="/signup"][method="post"]');
if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Optionally, you can send the form data via AJAX here

        // Show thank you message
        const thankYouMsg = document.createElement("div");
        thankYouMsg.textContent = "Thank you for signing up. Our team will reach out to you.";
        thankYouMsg.style.marginTop = "16px";
        thankYouMsg.style.padding = "12px";
        thankYouMsg.style.background = "#fff3e0";
        thankYouMsg.style.border = "2px solid orange";
        thankYouMsg.style.borderRadius = "8px";
        thankYouMsg.style.color = "#ff9800";
        signupForm.replaceWith(thankYouMsg);
    });
}

// Add a click event listener to the "Join Us" button
// to redirect to the WhatsApp link
document.getElementById("joinUsBtn").addEventListener("click", function() {
    window
        .open(joinUsUrl, "_blank");
    // Optionally, you can show a message or perform other actions here
    alert("Thank you for your interest in joining us! You will be redirected to WhatsApp.");
});


// // ask question
//         // Current year for footer
//         document.getElementById('currentYear').textContent = new Date().getFullYear();
        
//         // Form submission handling
//         document.getElementById('contactForm').addEventListener('submit', function(e) {
//             e.preventDefault();
//             // Simulate form submission
//             document.getElementById('formSuccess').style.display = 'flex';
//             setTimeout(function() {
//                 document.getElementById('formSuccess').style.display = 'none';
//                 document.getElementById('contactForm').reset();
//             }, 3000);
//         });
        
//         // Toggle business hours
//         function toggleHours() {
//             const content = document.getElementById('hoursContent');
//             const toggle = document.getElementById('hoursToggle');
//             if (content.style.maxHeight) {
//                 content.style.maxHeight = null;
//                 toggle.textContent = '+';
//             } else {
//                 content.style.maxHeight = content.scrollHeight + 'px';
//                 toggle.textContent = '-';
//             }
//         }
        
//         // Card tilt effect
//         function tiltCard(card) {
//             card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05)';
//             card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
//         }
        
//         function resetCard(card) {
//             card.style.transform = '';
//             card.style.boxShadow = '';
//         }
        
//         // Copy to clipboard function
//         function copyToClipboard(text) {
//             navigator.clipboard.writeText(text).then(function() {
//                 alert('Copied to clipboard: ' + text);
//             }, function() {
//                 alert('Could not copy text');
//             });
//         }
        
//         // Show loading animation
//         window.addEventListener('load', function() {
//             document.getElementById('loader').style.display = 'none';
//         });
        
//         // Back to top button
//         window.onscroll = function() {
//             if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//                 document.getElementById('backToTop').style.display = 'block';
//             } else {
//                 document.getElementById('backToTop').style.display = 'none';
//             }
//         };
        
//         function scrollToTop() {
//             window.scrollTo({top: 0, behavior: 'smooth'});
//         }
        
//         // Typewriter effect
//         function typeWriter() {
//             const element = document.querySelector('.typewriter');
//             const text = element.textContent;
//             element.textContent = '';
//             let i = 0;
//             function typing() {
//                 if (i < text.length) {
//                     element.textContent += text.charAt(i);
//                     i++;
//                     setTimeout(typing, 50);
//                 }
//             }
//             typing();
//         }
        
//         // Initialize animations when page loads
//         window.onload = function() {
//             typeWriter();
//             document.querySelector('.welcome-message').style.opacity = '1';
//         };