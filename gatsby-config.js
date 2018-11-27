require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Ways you can support the freeCodeCamp.org nonprofit',
    siteUrl: 'https://donate.freecodecamp.org'
  },
  proxy: {
    prefix: '/unauthenticated',
    url: 'http://localhost:3000'
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Lato:400,400i,500']
      }
    },
    'gatsby-plugin-sitemap'
  ]
};
