const btn = document.getElementById("btn");
const errorMessage = document.getElementById("errorMessage");
const gallery = document.getElementById("gallery");
const accessKey = 'L3LhDRhn848KleMMegNHArLFFd6xx9sxSodaHjBH100';
const getImage = async() => {
    const input = document.getElementById("input").value;
    if(input > 10 || input < 1) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Number should be between 0 and 11";
        return;
    }
   try {
    imgs = "";
    let randomPage = Math.round(Math.random() * 1000);
    btn.style.display = "none";
    errorMessage.style.display = "none";
    gallery.style.display = "block";
    gallery.innerHTML = `<img src="spinner.svg" alt="image" />`
    await fetch(`https://api.unsplash.com/photos?per_page=${input}&page=${randomPage}&client_id=${accessKey}`
    ).then((response) => response.json().then((data) =>{
        if(data) {
            data.forEach((pic) => {
                imgs += `
                <img src=${pic.urls.small} alt="image" />
                `;
                gallery.innerHTML = imgs;
                btn.style.display = "block";
            })
        }
    })
    );
    errorMessage.style.display = "none";
   } catch (error) {
    errorMessage.innerHTML = "An error occured, try again";
    errorMessage.style.display = "block";
    gallery.style.display = "none";
    btn.style.display = "block";
   }
}

btn.addEventListener("click", getImage);