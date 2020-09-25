const result = document.querySelector(".search-result");

fetchStickers();
async function fetchStickers() {
  const emoji = await fetch(
    "https://emoji-api.com/emojis?access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238"
  );

  const emojiResponse = await emoji.json();
  console.log(emojiResponse);
  renderData(emojiResponse);
}
function renderData(response) {
  let markup=``;
  response.forEach((el)=>{
     markup += `
           <div class="emoji-details">
             <div class="emoji-icon">${el.character}</div>
             <div class="name">${el.unicodeName}</div>
          </div>
    `;
  })
  // for(let i=0;i<1793;i++){
  //     markup += `
  //         <div class="emoji-details">
  //           <div class="emoji-icon">${response[i].character}</div>
  //           <div class="name">${response[i].unicodeName}</div>
  //         </div>
  //     `;
  // }
  result.innerHTML = markup;
}
