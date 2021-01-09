import React, {useState, useRef} from 'react';
//import styles
import './styles/app.scss';
//components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/nav';

import data from "./data";

function App() {
   //ref 
   const audioRef = useRef(null);
    
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0});
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHander = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //if names are the same (duration), no need for duration = duration
    setSongInfo({...songInfo, currentTime: current, duration})
};

  return (
    <div className="App">
      <Nav 
      libraryStatus={libraryStatus}
      setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo} 
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        setSongs={setSongs}
        audioRef={audioRef} 
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio ref={audioRef} 
            //starts playing as soon as song loaded 
            onLoadedMetadata={timeUpdateHander} 
            onTimeUpdate={timeUpdateHander} 
            src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
