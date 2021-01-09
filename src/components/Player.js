import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from './../util';


const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setSongs, setCurrentSong}) => {
    //use effect
    useEffect(() => {
            const newSongs = songs.map((song) => {
              if (song.id === currentSong.id) {
                return {
                  ...song,
                  active: true,
                };
              } else {
                return {
                  ...song,
                  active: false,
                };
              }
            });
            setSongs(newSongs);
    }, [currentSong]);
     //event handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            //! changes to the opposite
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    
    const getTime = (time) => {
        return(
            //from stackoverflow
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "forward") {
            setCurrentSong(songs[(currentIndex +1) % songs.length]);
        } if (direction === "back") {
            if((currentIndex -1) % songs.length === -1) {
                setCurrentSong(songs[songs.length-1]);
                playAudio(isPlaying, audioRef);
                return; 
            }
            setCurrentSong(songs[(currentIndex -1 % songs.length )]);
        }
        playAudio(isPlaying, audioRef);
    }
    
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler}
                    type="range" />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} 
                onClick={() => skipTrackHandler("back")} />
                <FontAwesomeIcon className="play" onClick={playSongHandler} size="2x"
                
                //Tertiary opperator   
                icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}
                onClick={() => skipTrackHandler("forward")} />
            </div>
            
        </div>
    );
};

export default Player;