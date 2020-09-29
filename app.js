/* implement the MVC architecture */
/*
  ! add the modal popup
*/

const result = document.querySelector(".search-result"),
  inputField = document.querySelector(".search-input input"),
  completeList = document.querySelector(".show-all-list");

var response = [];

inputField.addEventListener("keyup", () => {
  console.log(inputField.value);
  input = inputField.value;
  getSearchedEmoji(input);
});

window.addEventListener("load", async () => {
  // showLoader()
  await getEmoji();
  // removeLoader();
  getSearchedEmoji();
});

async function getEmoji() {
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
    alert("Emoji Does't exists");
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

completeList.addEventListener("click", async () => {
  const emoji = await fetch(
    `https://emoji-api.com/emojis?access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238`
  );
  const allEmoji = await emoji.json();
  response = [...allEmoji];
  console.log(response);
  renderData(allEmoji);
});

function showAlert() {
  

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
