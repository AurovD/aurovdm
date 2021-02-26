let burger = document.querySelector(".burger");
let navList = document.querySelector(".navList");
burger.addEventListener("click", function() {
    this.classList.toggle("active");
    if (navList.style.maxHeight) {
        navList.style.maxHeight = null;
    } else {
        navList.style.maxHeight = navList.scrollHeight + "px";
    }
});


function getFade(className, direction) {
    for (let box of document.querySelectorAll(`.${direction}`)) {
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting === true && !entries[0].target.classList.contains(`${className}`)) {
                entries[0].target.classList += ` ${className}`;
            }

        }, {threshold: [0.8]});
        observer.observe(box);
    }
}

getFade("fadeInBottom", "bottom" );
getFade("fadeInLeft", "left" );
getFade("fadeInRight", "right" );

let certs = document.querySelectorAll(".cert-img");
let podlozhka = document.querySelector(".podlozhka");
certs.forEach((cert, index) => {
    cert.addEventListener("click", (event) => {
        podlozhka.style.display = "block";
        let img = document.createElement("img");
        img.classList = "podlozhka-img";
        img.setAttribute("src",`${cert.getAttribute("src")}`);
        img.setAttribute("alt",`${cert.getAttribute("alt")}`);
        podlozhka.appendChild(img);
    })
});



podlozhka.addEventListener("click", (event) => {
    podlozhka.style.display = 'none';
    let img = document.querySelectorAll(".podlozhka-img");
    img.forEach((img) => {
            img.remove();
    })
})
let topBtn = document.querySelector('.btnToTop');
if(topBtn) {
    document.addEventListener('DOMContentLoaded', () => {
        const screenHeight = window.innerHeight;
        window.onscroll = function () {
            if (window.scrollY > screenHeight) {
                topBtn.style.display = 'block'
            } else {
                topBtn.style.display = 'none'
            }
        }
        topBtn.addEventListener('click', function () {
            window.scrollBy({
                top: -document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    });
}

