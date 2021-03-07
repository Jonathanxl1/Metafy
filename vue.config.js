module.exports = {
  transpileDependencies: ["vuetify"],
  "/": process.env.NODE_ENV === 'production'
    ? '/Metafy/'
    : '/'
};
