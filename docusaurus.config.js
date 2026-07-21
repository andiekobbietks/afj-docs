// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AFJ Cardiff Design System',
  tagline: 'Component library, icon library, and UI mockups — eng/product/marketing handoff',
  favicon: 'img/favicon.ico',

  url: 'https://andiekobbietks.github.io',
  baseUrl: '/afj-docs/',

  organizationName: 'andiekobbietks',
  projectName: 'afj-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'AFJ Cardiff',
        logo: {
          alt: 'AFJ Cardiff Logo',
          src: 'img/favicon-32x32.png',
        },
        items: [
          { type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs' },
          { href: 'https://github.com/andiekobbietks/afj-docs', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} AFJ Cardiff.`,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
