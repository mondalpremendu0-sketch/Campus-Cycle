document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Form Submission (Prevent Default for Demo)
    const ctaForm = document.querySelector('.cta-form');
    if(ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = ctaForm.querySelector('input[type="email"]');
            if(emailInput.value) {
                // Simulate success
                const btn = ctaForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Joined!';
                btn.style.backgroundColor = '#059669'; // Darker green
                emailInput.value = '';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // --- APP INTERACTIVITY ---
    
    const landingView = document.getElementById('landing-view');
    const appView = document.getElementById('app-view');
    const roleModal = document.getElementById('role-modal');
    const openModalBtns = document.querySelectorAll('.open-role-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const roleSelectBtns = document.querySelectorAll('.role-select');
    const backToHomeBtn = document.getElementById('back-to-home');
    
    const buyerSection = document.getElementById('buyer-section');
    const sellerSection = document.getElementById('seller-section');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // 5. Modal Logic
    if(openModalBtns.length > 0) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                roleModal.classList.add('active');
            });
        });
    }
    
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            roleModal.classList.remove('active');
        });
    }
    
    // Optional: Close modal on outside click
    if(roleModal) {
        roleModal.addEventListener('click', (e) => {
            if (e.target === roleModal) {
                roleModal.classList.remove('active');
            }
        });
    }
    
    // 6. Role Selection & View Switching
    if(roleSelectBtns.length > 0) {
        roleSelectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedRole = btn.getAttribute('data-role');
                roleModal.classList.remove('active');
                
                // Hide landing, show app
                landingView.style.display = 'none';
                appView.style.display = 'block';
                window.scrollTo(0, 0);
                
                // Switch to correct section
                switchRoleView(selectedRole);
            });
        });
    }
    
    // Back to Home
    if(backToHomeBtn) {
        backToHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            appView.style.display = 'none';
            landingView.style.display = 'block';
            window.scrollTo(0, 0);
        });
    }
    
    // 7. Role Toggle within App
    if(toggleBtns.length > 0) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                switchRoleView(target);
            });
        });
    }
    
    function switchRoleView(role) {
        // Update toggle buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.toggle-btn[data-target="${role}"]`);
        if(activeBtn) activeBtn.classList.add('active');
        
        // Update sections
        if (role === 'buyer') {
            buyerSection.style.display = 'block';
            sellerSection.style.display = 'none';
        } else {
            buyerSection.style.display = 'none';
            sellerSection.style.display = 'block';
        }
    }
    
    // 8. Buyer Search Filter
    const searchInput = document.getElementById('buyer-search');
    const categoryFilter = document.querySelector('.category-filter');
    const itemCards = document.querySelectorAll('.item-card');
    
    function filterItems() {
        if(!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase();
        // Just simple text search on the card for now
        itemCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if(searchInput) {
        searchInput.addEventListener('input', filterItems);
    }
    
    // 9. Seller Image Upload Preview
    const imageInput = document.getElementById('item-image');
    const uploadContainer = document.getElementById('upload-container');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImgBtn = document.getElementById('remove-img');
    
    if(uploadContainer && imageInput) {
        uploadContainer.addEventListener('click', (e) => {
            if(e.target !== removeImgBtn && e.target.closest('.btn-remove') !== removeImgBtn) {
                imageInput.click();
            }
        });
        
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    uploadPlaceholder.style.display = 'none';
                    uploadPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
        
        removeImgBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            imageInput.value = '';
            previewImg.src = '';
            uploadPreview.style.display = 'none';
            uploadPlaceholder.style.display = 'block';
        });
    }
    
    // 10. Seller Form Submission
    const sellerForm = document.getElementById('seller-form');
    const formSuccess = document.getElementById('form-success');
    
    if(sellerForm) {
        sellerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate (basic HTML5 validation is already in place via 'required' attributes)
            
            // Show success message
            formSuccess.style.display = 'block';
            
            // Reset form
            sellerForm.reset();
            
            // Reset image
            if(imageInput) {
                imageInput.value = '';
                previewImg.src = '';
                uploadPreview.style.display = 'none';
                uploadPlaceholder.style.display = 'block';
            }
            
            // Hide success message after 4 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 4000);
        });
    }
});
