document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  let imagesData = []
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
    const carouselContainer = document.querySelector('.carousel-container')
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
    carouselContainer.appendChild(frame)
    carouselContainer.appendChild(slideIndicators)
    return carouselContainer
  }
  const createButton = (buttonName, className) => {
    const btn = document.createElement('button')
    btn.setAttribute('class', `btn ${className}`)
    btn.innerText = buttonName
    return btn
  }
  const updateCarousel = (activeSlide) => {
    const allImages = document.querySelectorAll('.slider')
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
    const carouselContainer = createCarousel(imagesData)
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
    carouselContainer.querySelector('.frame').appendChild(prevBtn)
    carouselContainer.querySelector('.frame').appendChild(nextBtn)
    updateCarousel(activeSlide)
  }
  // display on UI as cards
  const updateUI = function () {
    const productsContainer = document.createElement('div')
    productsContainer.setAttribute('class', 'products-container')
    imagesData.forEach((image, idx) => {
      const card = document.createElement('div')
      const img = document.createElement('img')
      card.setAttribute('class', 'card')
      card.appendChild(img)
      img.setAttribute('class', 'image-card')
      img.setAttribute('src', image)
      card.addEventListener('click', () => {
        const modal = document.querySelector('.modal-base')
        modal.style.display = 'block'
        carouselComponent(imagesData, idx)
      })
      productsContainer.appendChild(card)
    })
    container.appendChild(productsContainer)
  }
  // get images from api
  const getImagesData = async function () {
    try {
      const jsonData = await fetch('https://picsum.photos/v2/list')
      const data = await jsonData.json()
      imagesData.push(...data.map((d) => d.download_url))
      console.log(imagesData)
      updateUI()
    } catch (error) {
      imagesData = imagesArray
      updateUI()
      console.log("can't fetch data", error)
    }
  }
  const removecaro = () => {
    const doc = document.querySelector('.carousel-container')
    doc.innerHTML = ''
    // doc.forEach((ele) => ele.remove())
    // console.log(doc)
  }

  const createModalUI = function () {
    const modalBase = document.createElement('div')
    const modalContent = document.createElement('div')
    const carouselContainer = document.createElement('div')
    carouselContainer.setAttribute('class', 'carousel-container')
    const closeBtn = document.createElement('span')
    closeBtn.setAttribute('class', 'modal-close-button')
    closeBtn.innerText = 'x'
    closeBtn.addEventListener('click', () => {
      modalBase.style.display = 'none'
      removecaro()
    })
    modalContent.setAttribute('class', 'modal-content')
    modalContent.appendChild(carouselContainer)
    modalBase.appendChild(closeBtn)
    modalBase.appendChild(modalContent)
    modalBase.setAttribute('class', 'modal-base')
    container.appendChild(modalBase)
  }

  function init() {
    getImagesData()
    createModalUI()
  }
  init()
})
