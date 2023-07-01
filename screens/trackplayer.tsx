import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
async function fetchCurrentSongId() {
  try {
    const response = await axios.get('https://api.plaza.one/status');
    const currentSongId = response.data.song.id;
    return currentSongId;
  } catch (error) {
    console.error('Error fetching current song ID:', error);
    return null;
  }
}
const showTost = (title) => {
  ToastAndroid.show(title+' was added to playlist!!', ToastAndroid.SHORT);
};
async function fetchSongInfo(songId) {
  try {
    const response = await axios.get(`https://api.plaza.one/songs/${songId}`);
    const song = response.data;
    return song;
  } catch (error) {
    console.error('Error fetching song information:', error);
    return null;
  }
}

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  }
  finally {
    return isSetup;
  }
}
const addedSongIds = [];
export async function addTracks() {
  await TrackPlayer.add([
      {
        id: '1',
        url: require('./assets/fluidity-100-ig-edit-4558.mp3'),
        title: 'Fluidity',
        artist: 'tobylane',
        duration: 60,
      },
      {
        id: '2',
        url: require('./assets/penguinmusic-modern-chillout-future-calm-12641.mp3'),
        title: 'Modern Chillout',
        artist: 'penguinmusic',
        duration: 66,
      },
      {
        id: '3',
        url: require('./assets/powerful-beat-121791.mp3'),
        title: 'Powerful Beat',
        artist: 'penguinmusic',
        duration: 73,
      }
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  
}
async function Nightwave(){
  const currentSongId = await fetchCurrentSongId();
  if (currentSongId) {
    const currentSongInfo = await fetchSongInfo(currentSongId);
    if (addedSongIds.includes(currentSongInfo.id)) {
      return;
    }
    addedSongIds.push(currentSongInfo.id)
    if (currentSongInfo) {
      const track = {
        id: currentSongInfo.id,
        url: currentSongInfo.preview_src,
        title: currentSongInfo.title,
        artist: currentSongInfo.artist,
        duration: currentSongInfo.length,
        artwork: currentSongInfo.artwork_src,
      };
      console.log(track)

      await TrackPlayer.add(track);
      showTost(currentSongInfo.title);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }
  }
}
export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
}
setInterval(async () => {
  await Nightwave();
}, 30000);