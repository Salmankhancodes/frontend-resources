document.addEventListener('DOMContentLoaded', () => {

    const createStars = (number, container) => {
        for (let i = 0; i < number; i++) {
            const star = document.createElement('div')
            star.setAttribute('class', 'star')
            star.setAttribute('data-id', i)
            container.appendChild(star)
        }
    }

    const colorStars = (element, className) => {
        const id = element.target.getAttribute('data-id')
        const allStars = document.querySelectorAll('.star')
        allStars.forEach((star) => star.classList.remove(className))
        allStars.forEach((star, idx) => {
            if (id !== null && idx <= id) {
                star.classList.add(className)
            }
        })
    }

    const container = document.querySelector('.star-rating-container')
    const starBox = document.createElement('div')
    starBox.setAttribute('class', 'star-box')
    createStars(3, starBox)
    container.appendChild(starBox)
    starBox.addEventListener('click', (e) => {
        colorStars(e, 'selected')
    })
    starBox.addEventListener('mouseover', (e) => {
        colorStars(e, 'hover')
    })
})