document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 'aeroplane-over-neutral-milk-hotel',
            image: 'pic/covers/Aeroplane-Over-Neutral-Milk-Hotel.png',
            name: 'Neutral Milk Hotel - In The Aeroplane Over The Sea (LP)',
            price: '4000 ₽',
            oldPrice: null,
            link: 'products/aeroplane-over-neutral-milk-hotel.html',
            category: 'Инди/Альтернатива'
        },
        {
            id: 'diary-sunny-day',
            image: 'pic/covers/Diary-Sunny-Day.png',
            name: 'Sunny Day Real Estate - Diary (2LP)',
            price: '6000 ₽',
            oldPrice: null,
            link: 'products/diary-sunny-day.html',
            category: 'Инди/Альтернатива'
        },
        {
            id: 'in-rainbows-radiohead',
            image: 'pic/covers/In-Rainbows-Radiohead.png',
            name: 'Radiohead - In Rainbows (LP)',
            price: '5000 ₽',
            oldPrice: null,
            link: 'products/in-rainbows-radiohead.html',
            category: 'Инди/Альтернатива'
        },
        {
            id: 'twin-fantasy-car-seat-headrest',
            image: 'pic/covers/Twin-Fantasy-Car-Seat-Headrest.png',
            name: 'Car Seat Headrest - Twin Fantasy (Mirror to Mirror) (2LP)',
            price: '6000 ₽',
            oldPrice: '7800 ₽',
            link: 'products/twin-fantasy-car-seat-headrest.html',
            category: 'Инди/Альтернатива'
        },
        {
            id: 'definitely-maybe-oasis',
            image: 'pic/covers/Definitely-Maybe-Oasis.png',
            name: 'Oasis - Definitely Maybe (2LP)',
            price: '4800 ₽',
            oldPrice: null,
            link: 'products/definitely-maybe-oasis.html',
            category: 'Музыка для драки с братом'
        },
        {
            id: 'whats-the-story-oasis',
            image: 'pic/covers/Whats-The-Story-Oasis.png',
            name: 'Oasis - (What\'s The Story) Morning Glory? (2LP)',
            price: '4600 ₽',
            oldPrice: null,
            link: 'products/whats-the-story-oasis.html',
            category: 'Музыка для драки с братом'
        },
        {
            id: 'be-here-now-oasis',
            image: 'pic/covers/Be-Here-Now-Oasis.png',
            name: 'Oasis - Be Here Now (2LP)',
            price: '5000 ₽',
            oldPrice: null,
            link: 'products/be-here-now-oasis.html',
            category: 'Музыка для драки с братом'
        },
        {
            id: 'live-at-knebworth-oasis',
            image: 'pic/covers/Live-At-Knebworth-Oasis.png',
            name: 'Oasis - Live At Knebworth (3LP)',
            price: '4800 ₽',
            oldPrice: null,
            link: 'products/live-at-knebworth-oasis.html',
            category: 'Музыка для драки с братом'
        }
    ];

    function createProductElement(product) {
        return `
            <li class="glide__slide">
                <a href="${product.link}">
                    <img class="product__image" 
                         alt="${product.name}" 
                         src="${product.image}" 
                         height="200" 
                         width="200"/>
                    <div class="slide__name">${product.name}</div>
                </a>
                <div class="product__price">${product.price}</div>
            </li>
        `;
    }

    function initializeProductSlider(productsToShow = products) {
        const slidesContainer = document.querySelector('.glide__slides');

        if (!slidesContainer) {
            console.error('Slides container not found');
            return;
        }

        slidesContainer.innerHTML = '';

        productsToShow.forEach(product => {
            slidesContainer.innerHTML += createProductElement(product);
        });

        if (typeof Glide !== 'undefined') {
            try {
                const glide = new Glide('.product-slider', {
                    type: 'carousel',
                    startAt: 0,
                    perView: 4,
                    gap: 15,
                    breakpoints: {
                        992: { perView: 3 },
                        768: { perView: 2 },
                    },
                });
                glide.mount();
            } catch (error) {
                console.error('Glide initialization error:', error);
            }
        } else {
            console.error('Glide library not loaded');
        }
    }

    initializeProductSlider();
});