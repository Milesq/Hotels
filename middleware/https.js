// eslint-disable-next-line
export default ({ req: { headers: { referer: address } }, isDev, redirect }) => {
  // this line is execute on client side, referer is undefined
  if (!isDev
    && /^http/.test(address)) {
    redirect(address.replace('http', 'https'));
  }
};
