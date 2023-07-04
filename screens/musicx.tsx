import React, { useEffect, useState } from 'react';
import {ImageBackground,SafeAreaView,StyleSheet,Text,View,FlatList,ActivityIndicator,TouchableOpacity,Image, ScrollView} from 'react-native';
import TrackPlayer, {
    useTrackPlayerEvents,
    usePlaybackState,
    useProgress,
    Event,
    State
  } from 'react-native-track-player';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { setupPlayer, addTracks,Night } from './trackplayer';
import { Card } from 'react-native-paper';
 
  function TrackProgress() {
    const { position, duration } = useProgress(200);
  
    function format(seconds) {
      let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
      let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
  
    return(
      <View>
        <Text style={styles.trackProgress}>
          { format(position) } / { format(duration) }
        </Text>
      </View>
    );
  }
  function Header() {
    const [info, setInfo] = useState({});
    useEffect(() => {
      setTrackInfo();
    }, []);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        setTrackInfo();
      }
    });
  
    async function setTrackInfo() {
      const track = await TrackPlayer.getCurrentTrack();
      const info = await TrackPlayer.getTrack(track);
      setInfo(info);
    }
  
    return(
      <View style={styles.media}>
      <View style={styles.scanlines}>
          <View style={styles.crtEffect}>
            <Text>Now Playing:</Text>
            <Text style={styles.songTitle}>{info.title}</Text>
            <Text style={styles.artistName}>{info.artist}</Text>
          </View>
      </View>
      </View>
    );}
  function Playlist() {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);
  
    async function loadPlaylist() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }
  
    useEffect(() => {
      loadPlaylist();
    }, []);
  
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if(event.state == State.nextTrack) {
        TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
      }
    });
  
    function PlaylistItem({index, title, isCurrent}) {
  
      function handleItemPress() {
        TrackPlayer.skip(index);
      }
  
      return (
        <TouchableOpacity onPress={handleItemPress}>
          <Text
            style={{...styles.playlistItem,
              ...{backgroundColor: isCurrent ? '#666' : 'transparent'}}}>
          {title}
          </Text>
        </TouchableOpacity>
      );
    }
    async function handleShuffle() {
        let queue = await TrackPlayer.getQueue();
        await TrackPlayer.reset();
        queue.sort(() => Math.random() - 0.5);
        await TrackPlayer.add(queue);
      
        loadPlaylist()
      }
    return(
      <View>
        <View style={styles.playlist}>
          <FlatList
            data={queue}
            renderItem={({item, index}) => <PlaylistItem
                                              index={index}
                                              title={item.title}
                                              isCurrent={currentTrack == index }/>
            }
          />
        </View>
        <Controls onShuffle={handleShuffle}/>
      </View>
    );
  }
  
  function Controls({ onShuffle }) {
    const playerState = usePlaybackState();
  
    async function handlePlayPress() {
      if(await TrackPlayer.getState() == State.Playing) {
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
  
    return(
      <View style={{flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center'}}>
          <Icon.Button
            name="arrow-left"
            size={28}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToPrevious()}/>
          <Icon.Button
            name={playerState == State.Playing ? 'pause' : 'play'}
            size={28}
            backgroundColor="transparent"
            onPress={handlePlayPress}/>
          <Icon.Button
            name="arrow-right"
            size={28}
            backgroundColor="transparent"
            onPress={() => TrackPlayer.skipToNext()}/>
          <Icon.Button
            name="random"
            size={28}
            backgroundColor="transparent"
            onPress={onShuffle}/>
      </View>
    );
  }

function Music() {

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if(isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb"/>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground source={require('./assets/more.jpg')}style={styles.container}>
      
      <Card>
      <Card.Cover
              source={require('./assets/city.gif')}
              style={styles.city}
            />
      </Card>
      <Playlist/>
      <TouchableOpacity style={styles.button} onPress={Night}><Text style={styles.txt}>Nightwave Plaza Song Preview</Text></TouchableOpacity>
      <TrackProgress/>
      <Header/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems:"flex-start",
    padding: 20,
    backgroundColor: '#a8c0c8',
    
    
  },
  playlist: {
    padding:2,
    marginTop: 40,
    backgroundColor:'#FFD890',
    marginBottom: 40,
    borderRadius:20,
    height:170,
    width:380,
    position:'relative',
    textShadowColor:'black',
    borderWidth: 4,
    borderColor: '#CD853F', 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    position:'relative',
    backgroundColor: '#33334d',
    borderRadius: 8,
    marginTop:2,
    padding: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playlistItem: {
    position:'relative',
    fontSize: 18,
    color: 'black',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFD700', 
    marginVertical: 4, 
    fontWeight: 'bold',
    textShadowColor: '#CD853F', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  media: {
    flex: 1,
    position:'relative',
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    width: 380,
    height: 120,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'back',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    borderColor:'grey',
    borderWidth:6,
  },
  txt:{
    marginTop:5,
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#c1c1d7'
  },
  songTitle: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  artistName: {
    fontSize: 21,
    color: 'red',
    marginLeft: 10,
    paddingBottom:2,
    textAlign: 'center',
  },
  city:{
    height:240,
    width:380,
    
  },
  round:{
    borderRadius:30,
    flex:1,
  },
  crtEffect: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  crtOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    mixBlendMode: 'overlay',
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    mixBlendMode: 'screen',
    pointerEvents: 'none',}

});

export default Music;