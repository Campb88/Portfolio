document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById('sliderWrapper');
    const slides = wrapper.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');

    if (!wrapper || !nextBtn || !prevBtn || slides.length === 0) {
        console.warn("Slider not initialized — missing elements.");
        return;
    }

    let currentIndex = 0;

    function showSlide(index) {
        const slideWidth = wrapper.offsetWidth;
        wrapper.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    }

    function scrollNext() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        } else {
            currentIndex = 0;
            showSlide(currentIndex);
            wrapper.scrollTo({ left: 0, behavior: 'smooth' }); // skip animation on reset
        }
    }

    function scrollPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    let autoScroll = setInterval(scrollNext, 4000);

    function resetAutoplay() {
        clearInterval(autoScroll);
        autoScroll = setInterval(scrollNext, 4000);
    }

    nextBtn.addEventListener('click', () => {
        scrollNext();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        scrollPrev();
        resetAutoplay();
    });

    // Resize observer to reset scroll when window changes
    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });
});
