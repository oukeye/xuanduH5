export const getTrackIdFromCookie = function (req) {
  if (!req.headers.cookie) return;
  const trackId = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('trackId='))
  if (!trackId) return
  const jwt = trackId.split('=')[1]
  return unescape(jwt)
};
