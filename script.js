// searching song from Input 
function searchSong(){
const findSong =   document.getElementById('inputLyrics').value;
if (findSong) {
    fetch(' https://api.lyrics.ovh/suggest/'+findSong)
.then (response => response.json())
.then (data => {
    data = data.data.slice(0,10);
    display(data);
    
})
}
else{
    alert('Can not Find.Try again!');
}
}

 function  display(id){
// document.getElementById('song-title').innerText = id.title;
const songResult = document.getElementById('add-div');
songResult.innerHTML ='';
for (let i = 0; i < id.length; i++) {
    const element = id[i];
    const result = document.createElement('p');
     result.innerHTML =
          `<div class="single-result row align-items-center my-3 p-3">
          <div class="col-md-2 col-sm-2 "><img src="${element.album.cover}" alt=""></div> 
          <div class="col-md-6 col-sm-6"><h4 class="lyrics-name" >
          ${element.title}
        </h4> <p class="author lead"> ${element.album.title} By <span>${element.artist.name}</span></p>
        </div> 
        <div class="col-md-4 col-sm-4 text-md-right text-center"> <button class="btn btn-success" onclick="getLyrics('${element.artist.name}','${element.title}','${element.title}','${element.artist.name}')";>Get Lyrics</button> </div> </div> </div>`;
        songResult.appendChild(result); 
        }
       
}


// get lyrics
function getLyrics(artist,title,songTitle,artistName) {
        fetch (`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data=>{
            const lyricsResult = document.getElementById('add-div');
            lyricsResult.style.display = 'none';
        
            const lyricsPart = document.getElementById('lyrics-part');
            lyricsPart.style.display = 'block';
        
            const lyrics = document.createElement('p')
            lyrics.innerHTML = ` <div class= "text-center lyrics-text-white">
            <button class="btn go-back text-white" onclick="goBack()"> &lsaquo; go back</button>
            <h3>${songTitle}</h3>
            <h5>${artistName}</h5>
            <br>
            <pre>${data.lyrics}</pre>

            <button class="btn go-back text-white" onclick="goBack()"> &lsaquo; go back</button>
            </div>`;
            lyricsPart.appendChild(lyrics);
            document.getElementById('inputLyrics').value ='';
        })
    }

function goBack(){
    const lyricsResult = document.getElementById('add-div');
            lyricsResult.style.display = 'block';
        
            const lyricsPart = document.getElementById('lyrics-part');
            lyricsPart.style.display = 'none';

}

