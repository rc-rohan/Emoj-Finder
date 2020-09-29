/* implement the MVC architecture */

const searchResult = document.querySelector(".search-result"),
  inputField = document.querySelector(".search-input input"),
  completeList = document.querySelector(".show-all-list"),
  modalElement = document.querySelector(".modal");

var response = [];
window.addEventListener("load", async () => {
  // showLoader()
  await getAPIdata();
  // removeLoader();
  getSearchedEmoji();
});

inputField.addEventListener("keyup", () => {
  console.log(inputField.value);
  input = inputField.value;
  if (input.length !== 0) {
    getSearchedEmoji(input);
  } else {
    getSearchedEmoji();
  }
});

async function getAPIdata() {
  const emoji = await fetch(
    `https://emoji-api.com/emojis?access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238`
  );
  const emojiResponse = await emoji.json();
  response = [...emojiResponse];
  console.log(emojiResponse);
}

function getSearchedEmoji(input = "smileys-emotion") {
  const filteredData = filterResponse(input, response);
  console.log(filteredData);
  if (filteredData.length === 0) {
    showAlert();
  } else {
    renderData(filteredData);
  }
}

function filterResponse(input, response) {
  console.log(input);
  return response.filter((emoji) => {
    const regexp = new RegExp(input, "gi");
    return (
      emoji.slug.match(regexp) ||
      emoji.group.match(regexp) ||
      emoji.unicodeName.match(regexp) ||
      emoji.subGroup.match(regexp)
    );
  });
}

completeList.addEventListener("click", () => {
  renderData(response);
});

function clearAlert() {
  const currAlert = document.querySelector(".alert-popup");
  console.log(currAlert);
  if (currAlert) {
    currAlert.remove();
  }
}
function showAlert() {
  clearAlert();
  const alert = document.createElement("div");
  alert.className = "alert-popup";
  alert.innerHTML = "<p>&#x26A0; Emoji doesn't exists</p>";
  const alertDiv = document.querySelector(".alert");
  alertDiv.insertAdjacentElement("afterbegin", alert);
  setTimeout(clearAlert, 1000);
}

function renderData(response) {
  let markup = ``;
  response.forEach((el, index) => {
    markup += `
           <div class="emoji-details"  id="${index}">
             <div class="emoji-icon">${el.character}</div>
             <div class="name">${el.unicodeName}</div>
          </div>
    `;
  });
  searchResult.innerHTML = markup;
}

document.querySelector(".modal").addEventListener("click", (e) => {
  const cancelBtn = e.target.closest(".cancel-btn");
  if (cancelBtn) {
    modalElement.innerHTML = "";
    modalElement.style.height = "initial";
    modalElement.style.width = "initial";
    modalElement.style.background = "initial";
  }
});
searchResult.addEventListener("click", (e) => {
  const element = e.target.closest(".emoji-details");
  if (element) {
    const id = element.id;
    const data = response[id];
    const popup = document.querySelector(".modal");
    const markup = `
        <div class="popup">
          <button class="cancel-btn">&#x2717;</button>
            <div class="emoji-character">${data.character}</div>
            <hr>
            <div class="emoji-details">
                <div class="emoji-name"><small>Name: </small><small>${data.unicodeName}</small></div>
                <div class="emoji-code"><small>Code: </small><small>${data.codePoint}</small></div>
                <div class="emoji-group"><small>Group: </small><small>${data.group}</small></div>
                <div class="emoji-sub-group"><small>Sub-Group: </small><small>${data.subGroup}</small></div>
            </div>
        </div>
  `;
    popup.insertAdjacentHTML("afterbegin", markup);
    modalElement.style.height = "100%";
    modalElement.style.width = "100%";
    modalElement.style.background = "rgba(66, 73, 73 ,0.5)";
  }
});
