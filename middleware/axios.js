import {getTrackIdFromCookie} from '@/utils/cookieTool'
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
