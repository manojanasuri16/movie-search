import './App.css';
import {useState,useEffect} from 'react';

function App() {
  let [movieinfo,setMovieinfo]=useState(null);  
  let [title,setTitle]=useState("the avengers");

  useEffect(() => {   
    /* 
    let apikey='3af5f78d';    
    let url="https://www.omdbapi.com/?t="+title+"&apikey="+apikey;
    
    fetch(url)
      .then((response)=>response.json())
      .then((movie)=>{
        console.log(movie)
        setMovieinfo(movie)
      })
      .catch((err)=>{
        console.log(err);
      })*/
      getMovieData();
    },[])
  
  const readTitle=(value)=>{    
    setTitle(value);
  }

  const getMovieData=()=>{
    let apikey='3af5f78d';    
    let url="https://www.omdbapi.com/?t="+title+"&apikey="+apikey;
    
    fetch(url)
      .then((response)=>response.json())
      .then((movie)=>{        
        setMovieinfo(movie)
      })
      .catch((err)=>{
        console.log(err);
      })    
  }
  
  return (
    <div className="App">
      <div className="container">              
        <div className="padd">
          <h1>Movie Search</h1>          
        </div>

        <div className="input-group">
            <input 
              type="text" 
              placeholder="Enter Movie Name" 
              className="search-field"
              onChange={(event)=>{readTitle(event.target.value)}}
              >
            </input>            
            <button className="btn" onClick={getMovieData}>Get Movie</button>
        </div>

        {
          movieinfo?.Error===undefined?(
            <div className="movie">
              <div className="poster">
                <img 
                  className="poster-img" 
                  src={movieinfo?.Poster}
                  alt="Movie Poster"
                >              
                </img>
              </div>
              <div className="details">
                <div className="padd">
                  <h1>{movieinfo?.Title}</h1>
                  <p><strong>Genre</strong>:{movieinfo?.Genre}</p>
                  <p><strong>Directed By</strong>:{movieinfo?.Director}</p>
                  <p><strong>Plot</strong>:{movieinfo?.Plot}</p>
                  <p><strong>Cast</strong>:{movieinfo?.Cast}</p>
                  <p><strong>Box Office</strong>:{movieinfo?.BoxOffice}</p>
                  <p><strong>Language</strong>:{movieinfo?.Language}</p>
                  <p><strong>Release Date</strong>:{movieinfo?.Released}</p>
                  <p><strong>Run Time</strong>:{movieinfo?.Runtime}</p>
                  <div className="ratings">                
                    {
                      movieinfo?.Ratings.map((rating,index)=>(
                        <div key={index}>
                          <strong>{rating.Source}</strong>
                          <h3>{rating.Value}</h3>
                        </div>                
                      ))
                    }

                    {/* <div>
                      <strong>{movieinfo?.Ratings[0].Source}</strong>
                      <span className="ratings-count">{movieinfo?.Ratings[0].Value}</span>
                      </div> */}
                  </div>
                </div>                      
              </div>
            </div>        
          ):
          <h1>Movie Not Found</h1>
        }                    
      </div>
    </div>
  );
}


export default App;
