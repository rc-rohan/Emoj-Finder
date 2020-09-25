// import Emoji from "./Emoji";

// import {Emoji} from './Emoji';
const result = document.querySelector(".search-result"),
inputField = document.querySelector(".search-input input");

inputField.addEventListener('keyup',(e)=>{
  console.log(inputField.value);
  input = inputField.value;
  if(input!==''){
    getEmoji(input);
  }

})

async function getEmoji(input) {
  const emoji = await fetch(
    `https://emoji-api.com/emojis?search=${input}&access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238`
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
  result.innerHTML = markup;
}


// const controlSearch = async (input) =>{
//   search = new Emoji(input);
//   console.log(search);
//   try {
//     result = search.getResult();
//   } catch (error) {
//     console.log(error)
//   }
// };