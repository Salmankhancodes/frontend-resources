document.addEventListener('DOMContentLoaded', () => {
    const imagesArray = [
        'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
        'https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4',
        'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM',
        'https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI',
        'https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g',
        'https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU'
    ]
    let counter = 0;
    const container = document.querySelector('.container');

    const frame = document.createElement('div');
    frame.setAttribute('class', 'frame');

    const prevBtn = document.createElement('button')
    const nextBtn = document.createElement('button')

    prevBtn.innerText = 'PREV';
    nextBtn.innerText = 'NEXT';

    imagesArray.forEach((image) => {
        const imgContainer = document.createElement('img')
        imgContainer.setAttribute('class', 'slider')
        imgContainer.setAttribute('src', image);
        frame.appendChild(imgContainer);
    });

    container.appendChild(frame);
    container.appendChild(prevBtn)
    container.appendChild(nextBtn)

    const updateCarousel = () => {
        allImages.forEach((image) => {
            image.style.transform = `translate(-${counter * 100}%)`
        });
    }
    const allImages = document.querySelectorAll('img')
    allImages.forEach((image, index) => {
        image.style.left = `${index * 100}%`
    })

    prevBtn.addEventListener('click', () => {
        counter--;
        counter = counter < 0 ? allImages.length - 1 : counter;
        updateCarousel();
    })

    nextBtn.addEventListener('click', () => {
        counter++;
        counter = counter === allImages.length ? 0 : counter;
        updateCarousel();
    })
})