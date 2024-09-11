import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import YouTube from 'react-youtube';

import './App.css'

function App() {
  const API_URL = 'https://api.themoviedb.org/3'
  const API_KEY = 'a3e8ee7fc1bb17b4c6581324b0cd34c6'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original/'

//VARIABLES DE ESTADO 
const [movies , setMovies]= useState([])
const [searchKey, setSearchKey]= useState("")
const [trailer, setTrailer] = useState(null);
const [movie, setMovie]= useState({tittle : "loading  peliculas"});
const [playing, setPlaying]= useState(false);


//esta funcion realiza la peticion por GET a la api
const fetchMovies = async(searchKey)=>{
  const type =searchKey ? "search" : "discover";
  const {data: {results},

} = await axios.get(`${API_URL}/${type}/movie`,{
  params: {
    api_key : API_KEY,
    query: searchKey,
  },



});
setMovies(results)
setMovie(results[0])
};



useEffect(()=>{
  fetchMovies();
},[])

  return (
    <div>
      
      {/* contenedor que va mostra poster de peliculas */ }
      <div className='container mt-3'>
        <div className="row">
          {movies.map((movie)=>(
            <div key={movie.id} className='col-md-4 mb-3'>
              <img src={`${URL_IMAGE + movie.poster_path}`} alt='' height={600} width="100%"></img>
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


export default App;
