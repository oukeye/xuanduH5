import {getTrackIdFromCookie} from '../utils/logic/isLogin'
import axios from 'axios';

export default function ({req, next}) {
  if (process.server && axios.defaults) {
    let trackId = getTrackIdFromCookie(req);

    if (axios && axios.defaults) {
      if (trackId) {
        axios.defaults.headers['trackId'] = trackId;
      }
    }
  }
}
