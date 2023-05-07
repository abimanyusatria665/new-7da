import { adventureImg } from './data/data.js'

const renderImgPoint = document.getElementById('renderOutbonImg')
const modalSplideSlide = document.getElementById('modalImgSplide')
const modalImgList = document.getElementById('modalImageList')

function renderOutbondImg(imgData){

    let timeOut = 0

    // imgData.forEach((data, index) => {

    //     const galleryItem = document.createElement('a')
    //     const galleryImg = document.createElement('a')


    //     galleryItem.setAttribute('data-aos', 'fade-up')
    //     galleryItem.setAttribute('data-aos-delay', timeOut)
    //     galleryItem.setAttribute('data-bs-toggle', 'modal')
    //     galleryItem.setAttribute('data-bs-target', 'exampleModal')
    //     galleryItem.setAttribute('type', 'button')
    //     galleryItem.classList.add('gallery-grid')
    //     galleryItem.setAttribute('data-sliderid', index)
    //     galleryItem.classList.add('gallery-click')

    //     galleryImg.setAttribute('data-bs-toggle', 'modal')
    //     galleryImg.setAttribute('data-bs-target', '#exampleModal')
    //     galleryImg.setAttribute('type', 'button')
    //     galleryImg.classList.add('gallery-img')
    //     galleryImg.classList.add('h-100')
    //     galleryImg.classList.add('w-100')
    //     galleryImg.setAttribute('data-sliderid', index)
    //     galleryImg.classList.add('gallery-click')
    //     galleryImg.style.background = `url('${data.img}')`

    //     galleryItem.append(galleryImg)


    //     renderImgPoint.append(galleryItem)

    //     timeOut += 100
    // })

    imgData.forEach(data => {

       let mainDiv = document.createElement('div')

       mainDiv.setAttribute('class', 'col-md-3')
       mainDiv.setAttribute('data-aos', 'fade-up')
       mainDiv.setAttribute('data-aos-delay', timeOut)
       mainDiv.setAttribute('data-aos-duration', '1000')
       
       mainDiv.innerHTML = `
       <a
         href="${data.img}"
         class="gallery-wrap img mb-4 d-flex align-items-end justify-content-center glightbox"
         style="background-image: url(${data.img})"
       ></a>
     `
     renderImgPoint.append(mainDiv)

     timeOut += 100
    })


    

}


function renderImagesInModal(imgData){

    imgData.forEach(data => {



        const img = document.createElement('img')

        img.src = data.img

        img.classList.add('swiper-slide')
        

        modalImgList.append(img)


    })
}



function imgModalRender(activeIndex= 0){


    var swiper = new window.Swiper(".mySwiper", {initialSlide: activeIndex});

    
}





renderOutbondImg(adventureImg)

document.querySelectorAll('.gallery-click').forEach(data => {
    data.addEventListener('click', e => imgModalRender(e.target.dataset.sliderid))
})

// renderImagesInModal(outbondImg)
