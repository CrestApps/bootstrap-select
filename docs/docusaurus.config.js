const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

const baseUrl = process.env.DOCUSAURUS_BASE_URL || '/';
const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

function withBaseUrl (assetPath) {
  return normalizedBaseUrl + assetPath.replace(/^\/+/, '');
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'bootstrap-select',
  tagline: 'A dependency-free, vanilla JavaScript select plugin for Bootstrap 5+.',
  favicon: 'img/logo.svg',
  url: process.env.DOCUSAURUS_URL || 'https://bootstrap-select.crestapps.com',
  baseUrl: normalizedBaseUrl,
  organizationName: 'CrestApps',
  projectName: 'crestapps-bootstrap-select',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw'
    }
  },

  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js',
      defer: true
    },
    {
      src: withBaseUrl('dist/js/bootstrap-select.min.js'),
      defer: true
    }
  ],

  stylesheets: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
    withBaseUrl('dist/css/bootstrap-select.min.css')
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true
      }
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/CrestApps/crestapps-bootstrap-select/tree/main/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Latest',
              path: ''
            }
          }
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'bootstrap-select',
        logo: {
          alt: 'CrestApps Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            label: 'Docs',
            position: 'left'
          },
          {
            to: '/docs/examples',
            label: 'Examples',
            position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true
          },
          {
            href: 'https://github.com/CrestApps/crestapps-bootstrap-select',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/'
              },
              {
                label: 'Examples',
                to: '/docs/examples'
              },
              {
                label: 'Options',
                to: '/docs/options'
              },
              {
                label: 'Methods',
                to: '/docs/methods'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Issues',
                href: 'https://github.com/CrestApps/crestapps-bootstrap-select/issues'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/CrestApps/crestapps-bootstrap-select'
              },
              {
                label: 'CrestApps',
                href: 'https://crestapps.com'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CrestApps bootstrap-select.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
