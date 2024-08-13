(function getCurrentYear(){
    const p = document.querySelector('.js-current-year');
    p.textContent = `© ${new Date().getFullYear()} — Copyright`
})()

// animating getting started section
document.querySelectorAll('.js-getting-started .js-step-guide').forEach(guideBtn =>{
    guideBtn.addEventListener('mouseenter', ()=>{
        document.querySelectorAll('.js-lg-phone-container .phone.screen').forEach(guideImg =>{
            guideImg.classList.remove('phone-enabled')
        })
        document.querySelector(`.js-lg-phone-container .phone.screen.${guideBtn.dataset.item}`).classList.add('phone-enabled')
    })
})

// animating the why section description
document.querySelectorAll('.js-why-section .js-single-why-description').forEach(reasonText =>{
    reasonText.addEventListener('mouseenter', ()=>{
        document.querySelectorAll('.js-why-section .reason-guide').forEach(reasonGuide =>{
            reasonGuide.classList.remove('reason-active');
        })

        document.querySelector(`.js-why-section .reason-guide.${reasonText.dataset.item}`).classList.add('reason-active');
    })

    reasonText.addEventListener('mouseleave', ()=>{
        document.querySelectorAll('.js-why-section .reason-guide').forEach(reasonGuide =>{
            reasonGuide.classList.remove('reason-active');
        })

        document.querySelector(`.js-why-section .reason-guide.first`).classList.add('reason-active');
    })
})




// animating the getting started sm cards and changing the colors when clicked
const carouselElems = document.querySelectorAll('.js-getting-started-sm .js-getting-started-carousel .js-carousel');
const sections = [ ]
carouselElems.forEach(elem =>{
    sections.push(elem.getAttribute('href'));
})
console.log(sections)

carouselElems.forEach( carousel =>{
    carousel.addEventListener('click', ()=>{
        carouselElems.forEach(elem =>{
            elem.classList.remove('carousel-active');
        })
        carousel.classList.add('carousel-active');
    })
})


let startX, endX, currentIndex = 0;
// assign event listener for the swipe gesture
document.querySelector('.js-all-getting-started').addEventListener('touchstart', (event)=>{
    startX = event.touches[0].clientX;
});
document.querySelector('.js-all-getting-started').addEventListener('touchend', (event)=>{
    endX = event.changedTouches[0].clientX;
    handleSwipe();        
})

function handleSwipe(){
    const delta = 60;
    if(startX - endX > delta){
        onSwipe('left')
    }else if (endX - startX > delta)
        onSwipe('right')
}

function onSwipe(direction){
    if(direction === 'left' && sections.length - 1){
        currentIndex++;
    }else if(direction === 'right' && currentIndex > 0){
        currentIndex--;
    }
    window.location.hash = sections[currentIndex]
    updateActiveCarousel();
}

function updateActiveCarousel(){
    carouselElems.forEach(elem => {
        elem.classList.remove('carousel-active');
    });

    const currentElem = document.querySelector(`a[href='${sections[currentIndex]}']`)
    if(currentElem){
        currentElem.classList.add('carousel-active')
    }
}



// links to navigate to
document.querySelectorAll('.js-navigate-to-login').forEach(navigator =>{
    navigator.addEventListener('click', ()=>{window.location.href = 'login.html'})
})

const carouselElements = [
    `    <div class="vc-container">
    <img class="provider-img" src="./static/assets/users/provider-1.jpg" alt="service provider image">
</div>
`,
    `    <div class="vc-container">
    <img class="provider-img" src="./static/assets/users/provider-2.jpg" alt="service provider image">
    </div>
    `,
    `    <div class="vc-container">
    <img class="provider-img" src="./static/assets/users/provider-3.jpg" alt="service provider image">
    </div>
    `,
    `    <div class="vc-container">
    <img class="provider-img" src="./static/assets/users/provider-4.jpg" alt="service provider image">
    </div>
    `
]
