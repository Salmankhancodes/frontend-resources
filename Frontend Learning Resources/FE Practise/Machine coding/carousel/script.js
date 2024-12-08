// document.addEventListener('DOMContentLoaded', () => {
const imagesArray = [
  'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
  'https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
  'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM',
  'https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI',
  'https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g',
  'https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU',
]
const createCarousel = (imagesArray) => {
  // create carousel frame
  const container = document.querySelector('.carousel-container')
  const frame = document.createElement('div')
  const slideIndicators = document.createElement('div')
  slideIndicators.setAttribute('class', 'slide-indicator-container')
  frame.setAttribute('class', 'frame')
  // adding sliders to frame
  imagesArray.forEach((image, index) => {
    const imgContainer = document.createElement('img')
    imgContainer.setAttribute('class', 'slider')
    imgContainer.setAttribute('src', image)
    // put sliders in consecutive position
    imgContainer.style.left = `${index * 100}%`
    frame.appendChild(imgContainer)

    const indicator = document.createElement('div')
    indicator.setAttribute('class', 'indicator')
    slideIndicators.appendChild(indicator)
  })
  slideIndicators.firstChild?.classList?.add('active')
  container.appendChild(frame)
  container.appendChild(slideIndicators)
  return container
}
const createButton = (buttonName, className) => {
  const btn = document.createElement('button')
  btn.setAttribute('class', `btn ${className}`)
  btn.innerText = buttonName
  return btn
}
const updateCarousel = (activeSlide) => {
  const allImages = document.querySelectorAll('img')
  allImages.forEach((image) => {
    image.style.transform = `translate(-${activeSlide * 100}%)`
  })
  const allIndicators = document.querySelectorAll('.indicator')
  allIndicators.forEach((indicator, index) => {
    index === activeSlide
      ? indicator.classList.add('active')
      : indicator.classList.remove('active')
  })
}
function carouselComponent(imagesData, activeSlide) {
  const container = createCarousel(imagesData)
  const prevBtn = createButton('< PREV', 'prev-btn')
  const nextBtn = createButton('NEXT >', 'next-btn')

  prevBtn.addEventListener('click', () => {
    activeSlide--
    activeSlide = activeSlide < 0 ? imagesData.length - 1 : activeSlide
    updateCarousel(activeSlide)
  })

  nextBtn.addEventListener('click', () => {
    activeSlide++
    activeSlide = activeSlide === imagesData.length ? 0 : activeSlide
    updateCarousel(activeSlide)
  })
  container.querySelector('.frame').appendChild(prevBtn)
  container.querySelector('.frame').appendChild(nextBtn)
  updateCarousel(activeSlide)
}

carouselComponent(imagesArray, 0)
