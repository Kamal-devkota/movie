const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
 let main=document.querySelector(".container");

const form=document.getElementById('form');
const search=document.getElementById("search");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let val=search.value;
    if(val!=='' && val){
       
        fetchMovies(SEARCH_API+val);
        search.value='';
    }else{
        window.location.reload();
    }
})


async function fetchMovies(url){
   fetch(url).then(data=>data.json()).then(res=>getMovies(res.results))
   
}
fetchMovies(API_URL);

function getMovies(item){
    main.innerHTML=''; //so as to empty for search when inputing data filter movies0
    console.log(item);
    item.forEach(element => {
    let div=document.createElement("div");
    div.classList.add("movie");
    div.innerHTML=`
    <img src="${IMG_PATH+element.backdrop_path}" alt="">
    <div class="movie-title-rating">
        <h3>${element.title}</h3>
        <span class="${getRatings(element.vote_average)}">${element.vote_average}</span>
    </div>
    <div class="overview">
        <p>${element.overview}</p>
    </div>

    `
    main.appendChild(div);
});
}


function getRatings(rate){
    if(rate>=8){
        return 'red';
    }
    if(rate>=5){
        return 'green'
    }else{
        return 'orange'
    }

}
