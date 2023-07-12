import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `colors`,
    siteUrl: `https://www.codedbyjessica.com/colours`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Poppins`,
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Colours`,
				short_name: `Colours`,
				start_url: `/colours`,
				// background_color: `#FFFFFF`,
				// theme_color: `#000000`,
				display: `standalone`,
				icon: `static/favicon-16X16.png`,
				// icons: [
				//   {
				// 	src: `static/images/favicon/XIAFLEX-PD-Favicon-16X16.png`,
				// 	sizes: `16x16`,
				// 	type: `image/png`,
				//   }
				// ],
			  },
		},
  ]
};

export default config;
