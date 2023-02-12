function createSlider(selector) {
    const root = document.querySelector(selector)
    const sliderWrapper = root.querySelector('.slider-wrapper')
    const sliderPaginationEle = root.querySelector('.slider-pagination')
    const prevBtn = root.querySelector('.slider-button-prev')
    const nextBtn = root.querySelector('.slider-button-next')

    const slideArrEle = Array.from(root.querySelectorAll('.slide'))

    const sliderPaginationArrEle = slideArrEle.map((slide, index) => {
        const circle = document.createElement('span')
        circle.className = 'circle'
        circle.dataset.index = index
        return circle
    })
    sliderPaginationEle.append(...sliderPaginationArrEle)

    let activeIndex = 0

    function moveToSlide(index) {
        if (index < 0) {
            index = slideArrEle.length - 1
        } else if (index >= slideArrEle.length) {
            index = 0
        }
        if (activeIndex === index) {
            return
        }
        if (timer) {
            clearTimeout(timer)
            timer = setTimeout(nextSlide, 3000)
        }
        sliderPaginationArrEle[activeIndex].classList.remove('active')
        sliderPaginationArrEle[index].classList.add('active')
        activeIndex = index
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`
    }
    nextBtn.addEventListener('click', nextSlide)
    prevBtn.addEventListener('click', e => moveToSlide(activeIndex - 1))
    sliderPaginationEle.addEventListener('click', e => {
        const target = e.target
        if (target.classList.contains('circle')) {
            const index = Number(target.dataset.index)
            moveToSlide(index)
        }
    })
    function nextSlide() {
        moveToSlide(activeIndex + 1)
    }
    let timer = setTimeout(nextSlide, 3000)
}
createSlider('#slider-1')
createSlider('#slider-2')