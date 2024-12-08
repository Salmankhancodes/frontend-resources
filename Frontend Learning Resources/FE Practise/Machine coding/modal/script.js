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

  const createModalUI = function () {
    const modalBase = document.createElement('div')
    const modalContent = document.createElement('div')
    const closeBtn = document.createElement('span')
    closeBtn.setAttribute('class', 'modal-close-button')
    closeBtn.innerText = 'x'
    closeBtn.addEventListener('click', () => {
      modalBase.style.display = 'none'
    })
    modalContent.setAttribute('class', 'modal-content')
    modalContent.innerHTML = modalBase.appendChild(closeBtn)
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
