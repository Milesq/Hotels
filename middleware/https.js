export default ({ req: { headers: { referer: address } }, isDev, redirect }) => {
  if (!isDev
    && /^http/.test(address)) {
    redirect(address.replace('http', 'https'));
  }
};
