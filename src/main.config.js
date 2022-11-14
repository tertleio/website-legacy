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
    name: 'post1',
    prebuild: {
      read: [
        { header: './components/header.hbs' },
        { sections: './content/1/index.md' },
        { footer: './components/footer.hbs' },
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: [{ layout: './layouts/post.hbs' }],
      vars: {
        h1: 'Top 15 Questions to Ask a Potential Co-founder',
        title:
          'Tertle - Top 15 Questions to Ask a Potential Co-founder | Co-Founder Matching',
        canonical:
          'https://tertle.io/blog/top-15-questions-to-ask-a-potential-co-founder',
        description:
          'The best questions to ask when searching for a potential co-founder.',
      },
    },
    write:
      '../public/blog/top-15-questions-to-ask-a-potential-co-founder/index.html',
  },
  {
    name: 'home',
    prebuild: {
      read: [
        { header: './components/header.hbs' },
        { sections: './sections/index.hbs' },
        { header: './components/footer.hbs' },
      ],
      vars: {
        ...defaultVars,
      },
    },
    build: {
      read: [{ layout: './layouts/default.hbs' }],
      vars: {
        title: 'Tertle - Co-Founder Matching',
        canonical: 'https://tertle.io',
        description: 'Meet like-minded co-founders and hatch a startup.',
      },
    },
    write: '../public/index.html',
  },
  {
    name: 'blog',
    prebuild: {
      read: [
        { header: './components/header.hbs' },
        { sections: './sections/blog.hbs' },
        { footer: './components/footer.hbs' },
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: [{ layout: './layouts/default.hbs' }],
      vars: {
        title: 'Tertle Blog | Co-Founder Matching',
        canonical: 'https://tertle.io/blog',
        description: 'Hear ye, tech founders - a blog about startup stuff!',
      },
    },
    write: '../public/blog/index.html',
  },
];

module.exports = config;

// function getVarsFor(name) {
//   console.log('name', name);
//   switch (name) {
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
//         secondaryCtaLink: `${window.location.origin}/src/sections/hirers.html`,
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
//         secondaryCtaLink: `${window.location.origin}/src/sections/contractors.html`,
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
