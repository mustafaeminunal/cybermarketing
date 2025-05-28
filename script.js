document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenuBtn = document.querySelector('.close-menu');
    const body = document.body;
    
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }

    // Mobile Feed Button Click Handler
    const mobileFeedBtn = document.querySelector('.mobile-feed-btn');
    if (mobileFeedBtn) {
        mobileFeedBtn.addEventListener('click', function() {
            // Close the mobile menu first
            closeMobileMenu();
            // Redirect to the feed page or open feed modal
            // You can customize this based on your feed functionality
            window.location.href = 'meet-the-cats.html#feed';
        });
    }

    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
        
        if (mobileNav.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuButton) {
            toggleMobileMenu();
        }
    });

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Impact Map Initialization
    const impactMap = document.getElementById('impact-map');
    if (impactMap) {
        // Center map on Romania
        const map = L.map('impact-map').setView([45.9432, 24.9668], 7);
        
        // Add OpenStreetMap tiles with a custom style
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom markers
        const shelterIcon = L.divIcon({
            className: 'custom-marker shelter-marker',
            html: '<i class="fas fa-home"></i>',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const feedingIcon = L.divIcon({
            className: 'custom-marker feeding-marker',
            html: '<i class="fas fa-bowl-food"></i>',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const successIcon = L.divIcon({
            className: 'custom-marker success-marker',
            html: '<i class="fas fa-star"></i>',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Sample data for Romania
        const locations = [
            {
                type: 'shelter',
                lat: 44.4268,
                lng: 26.1025,
                name: 'București Cat Haven',
                stats: {
                    cats: 25,
                    mealsToday: 75
                }
            },
            {
                type: 'shelter',
                lat: 46.7712,
                lng: 23.6236,
                name: 'Cluj-Napoca Rescue Center',
                stats: {
                    cats: 18,
                    mealsToday: 54
                }
            },
            {
                type: 'feeding',
                lat: 45.7489,
                lng: 21.2087,
                name: 'Timișoara Park Station',
                stats: {
                    cats: 12,
                    mealsToday: 36
                }
            },
            {
                type: 'feeding',
                lat: 47.1585,
                lng: 27.6014,
                name: 'Iași Central Station',
                stats: {
                    cats: 15,
                    mealsToday: 45
                }
            },
            {
                type: 'success',
                lat: 45.6427,
                lng: 25.5887,
                name: 'Brașov Success Story',
                story: 'Found forever homes for an entire colony of 8 cats'
            },
            {
                type: 'success',
                lat: 44.1812,
                lng: 28.6411,
                name: 'Constanța Beach Cats',
                story: 'Rehabilitated and homed 12 beach strays'
            },
            {
                type: 'feeding',
                lat: 45.4384,
                lng: 28.0580,
                name: 'Galați Riverside Station',
                stats: {
                    cats: 10,
                    mealsToday: 30
                }
            },
            {
                type: 'shelter',
                lat: 45.7489,
                lng: 27.1858,
                name: 'Focșani Cat Sanctuary',
                stats: {
                    cats: 20,
                    mealsToday: 60
                }
            }
        ];

        // Add markers to map
        locations.forEach(location => {
            let icon;
            let popupContent;

            switch (location.type) {
                case 'shelter':
                    icon = shelterIcon;
                    popupContent = `
                        <div class="map-popup">
                            <h3>${location.name}</h3>
                            <p>🐱 ${location.stats.cats} cats</p>
                            <p>🍽️ ${location.stats.mealsToday} meals today</p>
                            <button class="primary-btn">View Details</button>
                        </div>
                    `;
                    break;
                case 'feeding':
                    icon = feedingIcon;
                    popupContent = `
                        <div class="map-popup">
                            <h3>${location.name}</h3>
                            <p>🐱 ${location.stats.cats} cats</p>
                            <p>🍽️ ${location.stats.mealsToday} meals today</p>
                            <button class="primary-btn">Feed Cats Here</button>
                        </div>
                    `;
                    break;
                case 'success':
                    icon = successIcon;
                    popupContent = `
                        <div class="map-popup">
                            <h3>${location.name}</h3>
                            <p>✨ ${location.story}</p>
                            <button class="primary-btn">Read Story</button>
                        </div>
                    `;
                    break;
            }

            L.marker([location.lat, location.lng], { icon })
                .bindPopup(popupContent)
                .addTo(map);
        });

        // Add custom styles for map markers
        const style = document.createElement('style');
        style.textContent = `
            .custom-marker {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                color: var(--text-light);
            }
            .shelter-marker {
                background: var(--primary);
            }
            .feeding-marker {
                background: var(--secondary);
            }
            .success-marker {
                background: var(--accent);
            }
            .map-popup {
                text-align: center;
                padding: 10px;
            }
            .map-popup h3 {
                margin-bottom: 5px;
            }
            .map-popup p {
                margin-bottom: 5px;
            }
            .map-popup button {
                margin-top: 10px;
            }
        `;
        document.head.appendChild(style);

        // Map Filters
        const filterBtns = document.querySelectorAll('.map-controls .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Add filter logic here
            });
        });

        // Time Range Filter
        const timeRange = document.getElementById('timeRange');
        timeRange?.addEventListener('change', (e) => {
            // Add time range filter logic here
        });
    }

    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });

            // Toggle current FAQ item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Add filter functionality here
        });
    });

    // Cat Search
    const searchInput = document.querySelector('.cat-search');
    let searchTimeout;

    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            // Add search functionality here
        }, 300);
    });

    // Feed Buttons
    const feedBtns = document.querySelectorAll('.feed-btn');
    feedBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const catCard = btn.closest('.cat-card');
            const catName = catCard.querySelector('h3').textContent;
            
            try {
                btn.disabled = true;
                btn.textContent = 'Processing...';
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = `Thank you for feeding ${catName}! Redirecting to live feed...`;
                catCard.appendChild(successMsg);
                
                // Redirect to live feed (simulate)
                setTimeout(() => {
                    // Replace with actual live feed URL
                    // window.location.href = `/live-feed/${catName}`;
                    btn.disabled = false;
                    btn.textContent = 'Feed Me! ($2)';
                    successMsg.remove();
                }, 3000);
            } catch (error) {
                console.error('Error processing feed request:', error);
                btn.disabled = false;
                btn.textContent = 'Feed Me! ($2)';
            }
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            emailInput.value = '';
            submitBtn.textContent = 'Subscribed!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }, 2000);
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
        }
    });

    // Load More Cats
    const loadMoreBtn = document.querySelector('.load-more button');
    let page = 1;

    loadMoreBtn?.addEventListener('click', async () => {
        try {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'Loading...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Add more cat cards here
            page++;
            
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More Cats';
        } catch (error) {
            console.error('Error loading more cats:', error);
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More Cats';
        }
    });
}); 