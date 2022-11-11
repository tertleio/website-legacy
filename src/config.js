defaultVars = {
  userType: 'founder',
  logoSrc: './assets/logo.svg',
  primaryCtaTxt: 'Sign Up',
  primaryCtaLink: 'https://app.tertle.io/join',
  secondaryCtaTxt: 'Login',
  secondaryCtaLink: 'https://app.tertle.io/login',
};

const config = [
  {
    page: 'home',
    prebuild: {
      read: [
        './components/header.hbs',
        './pages/index.hbs',
        './components/footer.hbs',
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: ['./layouts/default.hbs'],
      vars: {
        title: 'Tertle - Co-Founder Matching',
        canonical: 'https://tertle.io',
        header: '',
        page: '',
        footer: '',
      },
    },
    write: '../public/index.html',
  },
  {
    page: 'blog',
    prebuild: {
      read: [
        './components/header.hbs',
        './pages/blog/blog.hbs',
        './components/footer.hbs',
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: ['./layouts/default.hbs'],
      vars: {
        title: 'Tertle Blog | Co-Founder Matching',
        canonical: 'https://tertle.io/blog',
        header: '',
        page: '',
        footer: '',
      },
    },
    write: '../public/blog/index.html',
  },
  {
    page: 'post',
    prebuild: {
      read: [
        './components/header.hbs',
        './pages/blog/1.hbs',
        './components/footer.hbs',
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: ['./layouts/default.hbs'],
      vars: {
        title:
          'Tertle - Top 15 Questions to Ask a Potential Co-founder | Co-Founder Matching',
        canonical:
          'https://tertle.io/blog/top-15-questions-to-ask-a-potential-co-founder',
        header: '',
        page: '',
        footer: '',
      },
    },
    write:
      '../public/blog/top-15-questions-to-ask-a-potential-co-founder/index.html',
  },
];

module.exports = config;

// function getVarsFor(page) {
//   console.log('page', page);
//   switch (page) {
//     case 'home':
//       return {
//         idx: null,
//         userType: 'founder',
//         logoSrc: './assets/logo.svg',
//         primaryCtaTxt: 'Sign Up',
//         primaryCtaLink: 'https://app.tertle.io/join',
//         secondaryCtaTxt: 'Login',
//         secondaryCtaLink: 'https://app.tertle.io/login',
//         showFooterVisual: false,
//         useModal: false,
//       };
//     case 'founders':
//       return {
//         idx: 1,
//         userType: 'founder',
//         logoSrc: './assets/logo.svg',
//         primaryCtaTxt: 'Get Started',
//         primaryCtaLink: 'https://app.tertle.io/join',
//         secondaryCtaTxt: 'Login',
//         secondaryCtaLink: 'https://app.tertle.io/login',
//         showFooterVisual: false,
//         useModal: false,
//       };
//     // case 'investors':
//     //   return {
//     //     idx: 2,
//     //     logoSrc: './assets/logo.svg',
//     //     primaryCtaTxt: 'Join Waitlist',
//     //     primaryCtaLink: null,
//     //     secondaryCtaTxt: 'For Founders',
//     //     secondaryCtaLink: './founders.html',
//     //     showFooterVisual: false,
//     //     useModal: true,
//     //   };
//     case 'contractors':
//       return {
//         idx: 2,
//         userType: 'contractor',
//         logoSrc: './assets/logo.svg',
//         primaryCtaTxt: 'Join Waitlist',
//         primaryCtaLink: null,
//         secondaryCtaTxt: 'For Hirers',
//         secondaryCtaLink: `${window.location.origin}/src/pages/hirers.html`,
//         showFooterVisual: true,
//         useModal: true,
//       };
//     case 'hirers':
//       return {
//         idx: 3,
//         userType: 'hirer',
//         logoSrc: './assets/logo.svg',
//         primaryCtaTxt: 'Join Waitlist',
//         primaryCtaLink: null,
//         secondaryCtaTxt: 'For Contractors',
//         secondaryCtaLink: `${window.location.origin}/src/pages/contractors.html`,
//         showFooterVisual: false,
//         useModal: true,
//       };
//     default:
//       return {
//         idx: null,
//         userType: 'founder',
//         logoSrc: './assets/logo.svg',
//         primaryCtaTxt: 'Find Co-founders',
//         primaryCtaLink: 'https://app.tertle.io/join',
//         secondaryCtaTxt: 'Login',
//         secondaryCtaLink: 'https://app.tertle.io/login',
//         showFooterVisual: false,
//         useModal: false,
//       };
//   }
// }
