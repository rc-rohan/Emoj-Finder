// import Emoji from "./Emoji";

const result = document.querySelector(".search-result"),
  inputField = document.querySelector(".search-input input"),
  completeList = document.querySelector(".show-all-list");

var response = [];

inputField.addEventListener("keyup", () => {
  console.log(inputField.value);
  input = inputField.value;
  if (input !== "") {
    getEmoji(input);
  }
});
window.addEventListener("load", () => {
  getEmoji();
});
completeList.addEventListener("click", async () => {
  const emoji = await fetch(
    `https://emoji-api.com/emojis?access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238`
  );

  const allEmoji = await emoji.json();
  response = [...allEmoji];
  console.log(allEmoji);
  renderData(allEmoji);
});

async function getEmoji(input = "face") {
  const emoji = await fetch(
    `https://emoji-api.com/emojis?search=${input}&access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238`
  );

  const emojiResponse = await emoji.json();
  response = [...emojiResponse]
  console.log(emojiResponse);
  renderData(emojiResponse);
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


function renderData(response) {
  let markup = ``;
  response.forEach((el,index) => {
    markup += `
           <div class="emoji-details"  id="${index}">
             <div class="emoji-icon">${el.character}</div>
             <div class="name">${el.unicodeName}</div>
          </div>
    `;
  });
  result.innerHTML = markup;
}
