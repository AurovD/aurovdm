let but = document.querySelector(".navbar");
but.addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
});


for (let box of document.querySelectorAll('.bottom')) {
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true && !entries[0].target.classList.contains("fadeInBottom")) {
            entries[0].target.classList += " fadeInBottom";
        }

    }, {threshold: [0.8]});
    observer.observe(box);
}
for (let box of document.querySelectorAll('.left')) {
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true && !entries[0].target.classList.contains("fadeInLeft")) {
            entries[0].target.classList += " fadeInLeft";
        }

    }, {threshold: [0.8]});
    observer.observe(box);
}
for (let box of document.querySelectorAll('.right')) {
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true && !entries[0].target.classList.contains("fadeInLeft")) {
            entries[0].target.classList += " fadeInRight";
        }

    }, {threshold: [0.8]});
    observer.observe(box);
}
// let projects = document.querySelectorAll(".projects-items");
// let plashka= document.querySelectorAll(".plashka");
// projects.forEach((pr, i) => {
//     pr.addEventListener("click", (event) => {
//         location.replace(`/${plashka[i].innerText}`);
//     })
// });

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

document.addEventListener('DOMContentLoaded', () => {

    let toTopBtn = document.querySelector('.btnToTop');
    const screenHeight = window.innerHeight
    window.onscroll = function () {
        if (window.pageYOffset > screenHeight) {
            toTopBtn.style.display = 'block'
        } else {
            toTopBtn.style.display = 'none'
        }
    }
    toTopBtn.addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});

