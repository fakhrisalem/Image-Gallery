    const slides = document.getElementById('slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides; 
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    function createDots() {
        const pagination = document.getElementById('pagination');
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(i));
            pagination.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    document.getElementById('next').addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    document.getElementById('prev').addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    document.getElementById('slider').addEventListener('mouseover', stopAutoSlide);
    document.getElementById('slider').addEventListener('mouseout', startAutoSlide);

    createDots();
    startAutoSlide();

  
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextSlide();
        }
        if (touchEndX > touchStartX) {
            prevSlide();
        }
    }

    document.getElementById('slider').addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    });

    document.getElementById('slider').addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });