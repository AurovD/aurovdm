let form = document.forms[0];
let textarea = document.querySelector("textarea");

const adding = async (body) => {
    try {
        const res = await fetch(form.action, {
            method: form.method,
            headers: {
                "Accept": "application/json",
                'enctype': 'multipart/form-data'
            },
            body: body
        });
        const data = await res.json();
        console.log(data)
    } catch (err) {
        throw new Error(err);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let body = {};
    body.description = textarea.value;
    for (let i = 0, length = form.elements.length; i < length; i++) {
        const el = form.elements[i];
        if (el.name && el.name !== "imgs") {
            body[el.name] = el.value;
        }
    }
    let fd = new FormData();
    Array.from(form.imgs.files).forEach((file) => {
        fd.append('imgs', file)
    })
    for (let k in body) {
        fd.append(k, typeof body[k] === "string" ? body[k] : JSON.stringify(body[k]));
    }
    adding(fd)
})