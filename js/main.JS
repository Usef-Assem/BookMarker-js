var websiteName = document.getElementById("siteName");
var websiteUrl = document.getElementById("url");
var currentSite = 0;
var webSites = [];
if (localStorage.getItem('website') != null) {
    webSites = JSON.parse(localStorage.getItem('website'))
    display(webSites)
}

function checkAndAddSite() {
    if (websiteName.value.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a website name!',
            footer: 'Website name cannot be empty'
        });
    } else {
        addSite();
    }
}

function addSite() {
    if (validate() == true) {
        var sites = {
            name: websiteName.value,
            sitesUrl: websiteUrl.value,
        }
        if (!duplicate()) {
            webSites.push(sites);
        } else{ 
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The URL is already exsist !',
            footer: 'URl must be unique'
        })}
        
        localStorage.setItem("website", JSON.stringify(webSites))
        console.log(webSites);
        display(webSites)
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The URL is not valid!',
            footer: 'URl example : https://www.instagram.com'
        })
    }
}
function display() {
    var temp = "";
    for (var i = 0; i < webSites.length; i++) {
        temp += `<tr>
        <td> `+ i + ` </td>
        <td> `+ webSites[i].name + ` </td>
        <div class ="mb-2">
        <td> <button onclick="visitUrl(`+ i + `)" class="btn btn-warning btn-sm px-4 py-2"><i class="fa-regular fa-eye" style="color: #ffffff;"></i> <span class = "px-2">Visit</span></button> </td>
        <td> <button onclick="deleteSite(`+ i + `)" class="btn btn-danger btn-sm px-3 py-2"> <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i> <span class = "px-2">Delete</span></button> </td>
        </div>
    </tr>`
    }
    document.getElementById("tablebody").innerHTML = temp;
}
function deleteSite(index) {
    webSites.splice(index, 1)
    localStorage.setItem("website", JSON.stringify(webSites));
    display()
}
function visitUrl(index) {
    currentSite = webSites[index].sitesUrl;
    window.location.href = currentSite
}

function validate() {
    var regex = /^(https:\/\/)(www\.)[A-z][a-z0-9]{3,15}(\.com)$/
    if (regex.test(websiteUrl.value) == true) {
        return true;
    } else {
        return false;
    }
}

function duplicate() {
    let duplicated = false;
    for (let i = 0; i < webSites.length; i++) {
        if (webSites[i].sitesUrl == websiteUrl.value) {
            duplicated = true
        }

    }

    return duplicated
}
