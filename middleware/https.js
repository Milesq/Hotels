// export default ({ req: { headers: { referer: address } }, isDev, redirect }) => {
// if this line is execute on client side, referer is undefined
//   if (!isDev
//     && /^http/.test(address)) {
//     redirect(address.replace('http', 'https'));
//   }
// };

export default () => {
  console.log('');
};
