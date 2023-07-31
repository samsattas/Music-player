class Player{
    constructor(){
        this.files = [];
        this.songs = [];
        this.playlists = [];
        this.isPlaying = true;
        this.currentPlaylist = 0;
        this.nowPlayingPlaylist = 0;
    }

    getCurrentPlaylist(){
        return this.currentPlaylist;
    }

    getNowPlayingPlaylist(){
        return this.nowPlayingPlaylist;
    }

    getSongs(){
        return this.songs;
    }

    getPlaylists(){
        return this.playlists;
    }

    getFiles(){
        return this.files;
    }

    getIsPlaying(){
        return this.isPlaying;
    }


    setPlaylists(playlists){
        this.playlists = playlists;
    }

    setSongs(songs){
        this.songs = songs;
    }

    setCurrentPlaylist(cpl){
        this.currentPlaylist = cpl;
    }

    setNowPlayingPlaylist(nppl){
        this.nowPlayingPlaylist = nppl;
    }

    

    listen(){
        if(dist(mouseX,mouseY,640, 665)<40){// play or pause
            if(this.isPlaying){
                this.playPlaylist();
            }else{
                this.pausePlaylist();
            }
        }else if(dist(mouseX,mouseY,565, 690)<30){// Go back
            this.backPlaylist();
        }else if(dist(mouseX,mouseY,710,690)<25){// Go next
            this.nextPlaylist();
        }
    }

    addFile(file){
        this.files.push(file);
    }

    addFileName(file){
        this.files.push(file.name);
    }

    addSong(file){
        this.songs.push(file);
    }

    setVolume(vol){
        this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].setVolume(vol/400)
    }

    getCurrentTime(){
        let time = this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].currentTime();
        return time;
    }

    getSongDuration(){
        return this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].duration();
    }

    getFinalDuration(sd){
        let duration = sd;
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;

        seconds+='';
        let aux = seconds.split('');
        let output = '';
        for(let i in aux){
            if(aux[i] == '.'){
                break;
            }else{
                if(seconds<10 ){
                    output+='0';
                }
                output+=aux[i];
            }
        }

       return ( minutes+':'+output);
    }

    modifySong(time){
        if(this.allLoaded()){
            this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].jump(time);
        }
    }

    allLoaded(){
        let aux = true
        for(let i in this.songs){
            if(!this.songs[i].isLoaded()){
                aux = false;
            }
        }
        return aux;
    }

    
    addPlaylist(songList){
        this.playlists.push(songList);
    }

    playPlaylist(){
        this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].play();
        this.isPlaying = false;
    }

    pausePlaylist(){
        this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].pause();
        this.isPlaying = true;
    }

    nextPlaylist(){
        this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].stop();
        if(this.nowPlayingPlaylist == this.playlists[this.currentPlaylist].length-1){
            this.nowPlayingPlaylist = 0;
        }else{
            this.nowPlayingPlaylist++;
        }
        this.isPlaying = true;
        this.playPlaylist();
    }

    backPlaylist(){
        this.songs[this.playlists[this.currentPlaylist][this.nowPlayingPlaylist]].stop();
        if(this.nowPlayingPlaylist == 0){
            this.nowPlayingPlaylist = this.playlists[this.currentPlaylist].length-1;
        }else{
            this.nowPlayingPlaylist--;
        }
        this.isPlaying = true;
        this.playPlaylist();
    }
}