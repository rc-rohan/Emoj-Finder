/* implement the MVC architecture */
/*
  ! add the modal popup
*/

const result = document.querySelector(".search-result"),
  inputField = document.querySelector(".search-input input"),
  completeList = document.querySelector(".show-all-list");

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
  if(input.length!==0){
    getSearchedEmoji(input);
  }else{
    /* when blank input field show only the face emoji list */
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

function getSearchedEmoji(input = "face") {
  const filteredData = filterResponse(input, response);
  console.log(filteredData);
  if (filteredData.length === 0) {
    console.log("alert");
    showAlert();
  }
  renderData(filteredData);
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

completeList.addEventListener("click",  () => {

    /* display the entore respose list */
  renderData(response);
  console.log(response)
});

function clearAlert(){

  const currAlert = document.querySelector('.alert-popup');
  console.log(currAlert);
  if(currAlert){
    currAlert.remove();
  }
}
function showAlert() {
  clearAlert();
  const alert = document.createElement('div');
  alert.className = "alert-popup"
  alert.innerHTML = "<p>&#x26A0; Username doesn't exists</p>";
  const searchEl = document.querySelector(".search-input");
  searchEl.insertAdjacentElement("afterbegin",alert);
  setTimeout(clearAlert,1000);
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
  result.innerHTML = markup;
}

// result.addEventListener("click", (e) => {
//   const element = e.target.closest(".emoji-details");
//   const id = element.id;
//   const data = response[id];
//   console.log(data);
//   const popup = document.querySelector(".modal");
//   const markup = `
//         <div class="popup">
//             <div class="emoji-character">${data.character}</div>
//             <hr>
//             <div class="emoji-details">
//                 <div class="emoji-name"><small>Name: </small><small>${data.unicodeName}</small></div>
//                 <div class="emoji-code"><small>Code: </small><small>${data.codePoint}</small></div>
//                 <div class="emoji-group"><small>Group: </small><small>${data.group}</small></div>
//                 <div class="emoji-sub-group"><small>Sub-Group: </small><small>${data.subGroup}</small></div>
//             </div>
//         </div>
//   `;
//   popup.insertAdjacentHTML("afterbegin",markup);
//   const bgColor = document.querySelector('.modal');
//   bgColor.style.background = "rgba(86, 101, 115,.8   )";
//   bgColor.style.height = "100vh";
// });
