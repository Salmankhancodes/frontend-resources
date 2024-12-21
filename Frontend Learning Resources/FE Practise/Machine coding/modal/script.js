const state = {
  allImagesData: [],
  displayImages: [],
  limit: 6,
  currentPage: 1,
  filterData: [],
  activeSlide: 0
}

const getContainer = () => {
  return document.querySelector('.container')
}

const navBar = () => {
  const navBar = document.createElement('div')
  navBar.setAttribute('class', 'nav-bar')

  const searchInput = document.createElement('input')
  searchInput.setAttribute('class', 'search-input')

  const searchBtn = document.createElement('button')
  searchBtn.setAttribute('class', 'search-btn')
  searchBtn.textContent = 'Search'

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value
    state.currentPage = 1
    if (!query) {
      state.filterData = state.allImagesData
    } else state.filterData = state.allImagesData.filter((image) => {
      return image.author.toLowerCase() === query.toLowerCase()
    })
    prepareDataForRender(state.filterData)
    resetUIData()
  })


  const sortBox = document.createElement('select')
  sortBox.setAttribute('class', 'sort-dropdown')

  const sortOptions = ['asc', 'desc']
  sortOptions.forEach((option) => {
    const opt = document.createElement('option')
    opt.value = option
    opt.innerText = option
    sortBox.appendChild(opt)
  })
  sortBox.addEventListener('change', (e) => {
    const selectedValue = e.target.value
    state.filterData = state.filterData.sort((a, b) => selectedValue === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author))
    paginate(state.currentPage)
  })

  navBar.appendChild(searchInput)
  navBar.appendChild(searchBtn)
  navBar.appendChild(sortBox)
  return navBar
}

const addImagesToCarouesl = () => {
  const frame = document.querySelector('.frame')
  const slideIndicators = document.querySelector('.slide-indicator-container')
  state.displayImages.forEach((image, index) => {
    const imgContainer = document.createElement('img')
    imgContainer.setAttribute('class', 'slider')
    imgContainer.setAttribute('src', image.download_url)
    imgContainer.style.left = `${index * 100}%`
    frame.appendChild(imgContainer)

    const indicator = document.createElement('div')
    indicator.setAttribute('class', 'indicator')
    slideIndicators.appendChild(indicator)
  })
}

const updateCarousel = (activeSlide) => {
  const allImages = document.querySelectorAll('.slider')
  allImages.forEach((image) => {
    image.style.transform = `translate(-${parseInt(activeSlide) * 100}%)`
  })
  const allIndicators = document.querySelectorAll('.indicator')
  allIndicators.forEach((indicator, index) => {
    index === activeSlide
      ? indicator.classList.add('active')
      : indicator.classList.remove('active')
  })
}

const productContainer = () => {
  const productsContainer = document.createElement('div')
  productsContainer.setAttribute('class', 'products-container')

  productsContainer.addEventListener('click', (e) => {
    const currentId = e.target.getAttribute('image-id')
    if (!currentId) return
    const modal = document.querySelector('.modal-base')
    modal.style.display = 'block'
    state.activeSlide = parseInt(currentId)
    addImagesToCarouesl()
    updateCarousel(state.activeSlide)
  })
  return productsContainer
}

const paginationContainer = () => {
  const paginationContainer = document.createElement('div')
  paginationContainer.setAttribute('class', 'pagination-container')
  return paginationContainer
}

const modalContainer = (childComponent) => {
  const modalBase = document.createElement('div')
  modalBase.setAttribute('class', 'modal-base')

  const modalContent = document.createElement('div')
  modalContent.setAttribute('class', 'modal-content')

  const closeBtn = document.createElement('span')
  closeBtn.setAttribute('class', 'modal-close-button')
  closeBtn.innerText = 'x'
  closeBtn.addEventListener('click', () => {
    modalBase.style.display = 'none'
    document.querySelector('.slide-indicator-container').innerHTML = ''
    const frame = document.querySelector('.frame')
    const children = frame.children
    for (let i = children.length - 1; i >= 2; i--) {
      frame.removeChild(children[i])
    }
  })
  if (childComponent) modalContent.appendChild(childComponent)
  modalBase.appendChild(closeBtn)
  modalBase.appendChild(modalContent)
  return modalBase
}
const createButton = (buttonName, className) => {
  const btn = document.createElement('button')
  btn.setAttribute('class', `btn ${className}`)
  btn.innerText = buttonName
  return btn
}
const carouselComponent = () => {
  const carouselContainer = document.createElement('div')
  carouselContainer.setAttribute('class', 'carousel-container')
  const frame = document.createElement('div')
  const slideIndicators = document.createElement('div')
  slideIndicators.setAttribute('class', 'slide-indicator-container')
  frame.setAttribute('class', 'frame')
  const prevBtn = createButton('< PREV', 'prev-btn')
  const nextBtn = createButton('NEXT >', 'next-btn')

  prevBtn.addEventListener('click', () => {
    state.activeSlide--
    state.activeSlide = state.activeSlide < 0 ? state.displayImages.length - 1 : state.activeSlide
    updateCarousel(state.activeSlide)
  })

  nextBtn.addEventListener('click', () => {
    state.activeSlide++
    state.activeSlide = state.activeSlide === state.displayImages.length ? 0 : state.activeSlide
    updateCarousel(state.activeSlide)
  })


  carouselContainer.appendChild(frame)
  carouselContainer.querySelector('.frame').appendChild(prevBtn)
  carouselContainer.querySelector('.frame').appendChild(nextBtn)
  carouselContainer.appendChild(slideIndicators)
  return carouselContainer
}

const createUIElements = () => {
  const container = getContainer()
  const nav = navBar()
  const productList = productContainer()
  const pagination = paginationContainer()
  const carousel = carouselComponent()
  const modal = modalContainer(carousel)

  container.appendChild(modal)
  container.appendChild(nav)
  container.appendChild(productList)
  container.appendChild(pagination)
}

const fetchData = async () => {
  try {
    const jsonData = await fetch('https://picsum.photos/v2/list')
    const data = await jsonData.json()
    state.allImagesData = JSON.parse(JSON.stringify([...data.map(d => d)]))
    state.filterData = JSON.parse(JSON.stringify([...data.map(d => d)]))
    state.displayImages = JSON.parse(JSON.stringify([...data.map(d => d)]))
    prepareDataForRender(state.filterData)
    resetUIData()
  } catch (error) {
    console.log("can't fetch data", error)
  }
}

const paginate = (newPage) => {
  state.currentPage = newPage
  const end = state.limit * state.currentPage
  const start = end - state.limit
  state.displayImages = state.filterData.slice(start, end)
  resetUIData()
}

const prepareDataForRender = () => {
  const paginationContainer = document.querySelector('.pagination-container')
  paginationContainer.innerHTML = ''
  paginate(state.currentPage)
  const totalPage = Math.ceil(state.filterData.length / state.limit)
  console.log(totalPage)
  for (let i = 1; i <= totalPage; i++) {
    const btn = document.createElement('button')
    btn.setAttribute('paginate-id', i)
    btn.setAttribute('class', 'paginate-btn')
    if (i === 1) {
      btn.classList.add('active')
    }
    btn.innerText = i
    paginationContainer.appendChild(btn)
  }

  paginationContainer.addEventListener('click', (e) => {
    const paginateId = e.target.getAttribute('paginate-id')
    if (paginateId) {
      state.currentPage = paginateId
      const allPaginationBtns = document.querySelectorAll('.paginate-btn')
      allPaginationBtns.forEach((btn, idx) => {

        if (idx + 1 === parseInt(paginateId)) {
          btn.classList.add('active')
        }
        else {
          btn.classList.remove('active')
        }
      })
      paginate(paginateId)
    }
  })
}

const resetUIData = () => {
  const productsContainer = document.querySelector('.products-container');
  productsContainer.innerHTML = ''
  state.displayImages.forEach((image, idx) => {
    const card = document.createElement('div')
    const img = document.createElement('img')
    card.setAttribute('class', 'card')
    card.appendChild(img)
    img.setAttribute('class', 'image-card')
    img.setAttribute('src', image.download_url)
    img.setAttribute('image-id', idx)
    img.setAttribute('title', image.author)
    productsContainer.appendChild(card)
  })
}

function init() {
  createUIElements()
  fetchData()
}
init()