var bookmarkName = document.getElementById("bookmarkName");
var bookmarkLink = document.getElementById("bookmarkLink");
var tableBody = document.getElementById("tableBody");
var page = document.getElementById("page");
var errorMessage = document.getElementById("errorMessage");
var closeError = document.getElementById("closeError");
var body = document.querySelector("body");
var sitesList = [];

displaySites();

function addSite() {
  var site;
  if (validateInputs(bookmarkName) && validateInputs(bookmarkLink)) {
    site = {
      bookmarkName: bookmarkName.value,
      bookmarkLink: bookmarkLink.value,
    };
    sitesList.push(site);
    localStorage.setItem("sites", JSON.stringify(sitesList));
    clearInputs();
    displaySites();
  } else {
    page.classList.add("page-blured");
    errorMessage.classList.remove("d-none");
    body.style.overflow = "hidden";
  }
}

function closeErrorWindow() {
  page.classList.remove("page-blured");
  errorMessage.classList.add("d-none");
  body.style.overflow = "auto";
}
function clearInputs() {
  bookmarkName.value = null;
  bookmarkLink.value = null;
  bookmarkName.classList.remove("is-valid");
  bookmarkLink.classList.remove("is-valid");
}

function displaySites() {
  if (localStorage.getItem("sites")) {
    sitesList = JSON.parse(localStorage.getItem("sites"));
  }
  var box = "";
  for (i = 0; i < sitesList.length; i++) {
    box += `
    <tr>
            <td>${i + 1}</td>
            <td>${sitesList[i].bookmarkName}</td>
            <td>
              <a class="btn visit-btn" href="${
                sitesList[i].bookmarkLink
              }" target="_blank">
                <span><i class="fa-solid fa-eye pe-2"></i></span>
                Visit
              </a>
            </td>
            <td>
              <a class="btn delete-btn" onclick="deleteSite(${i})">
                <span><i class="fa-solid fa-trash-can"></i></span>
                Delete
              </a>
            </td>
          </tr>`;
  }
  tableBody.innerHTML = box;
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sitesList));
  displaySites();
}

function validateInputs(element) {
  var text = element.value;
  var regex = {
    bookmarkName: /.{3,}/,
    bookmarkLink:
      /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/i,
  };
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
