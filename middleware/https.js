// eslint-disable-next-line
export default (ctx) => {
  if (process.server) {
    const { req: { headers: { referer: address } }, isDev, redirect } = ctx;
    if (!isDev
      && /^http/.test(address)) {
      redirect(address.replace('http', 'https'));
    }
  }
};
