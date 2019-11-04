export const getRedirectTo = (type,header) => {
  let path = ''
  if(type === 'dashen') {
    path += 'dashen'
  }else {
    path += 'laoban'
  }
  if(!header) {
    path += '_info'
  }
  return path
}