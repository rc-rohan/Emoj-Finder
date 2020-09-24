const apikey = "069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238";
const website = "https://emoji-api.com/";

async function fetchStickers(){

    const emoji = await fetch(
            "https://emoji-api.com/emojis?access_key=069cfd5b04b4a0fb85e0cc84dec7a18fd04c2238"
    );

    const emojiResponse = await emoji.json();
    console.log(emojiResponse);

}

fetchStickers();