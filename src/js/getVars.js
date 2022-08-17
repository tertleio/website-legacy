function getVarsFor(page) {
  switch (page) {
    case 'founders':
      return {
        idx: 1,
        logoSrc: './assets/logo.svg',
        primaryCtaTxt: 'Get Started',
        primaryCtaLink: 'https://app.tertle.io/join',
        secondaryCtaTxt: 'Login',
        secondaryCtaLink: 'https://app.tertle.io/login',
        showFooterVisual: false,
        useModal: false,
      };
    // case 'investors':
    //   return {
    //     idx: 2,
    //     logoSrc: './assets/logo.svg',
    //     primaryCtaTxt: 'Join Waitlist',
    //     primaryCtaLink: null,
    //     secondaryCtaTxt: 'For Founders',
    //     secondaryCtaLink: './founders.html',
    //     showFooterVisual: false,
    //     useModal: true,
    //   };
    case 'contractors':
      return {
        idx: 2,
        logoSrc: './assets/logo.svg',
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: null,
        secondaryCtaTxt: 'For Hirers',
        secondaryCtaLink: '',
        showFooterVisual: true,
        useModal: true,
      };
    case 'hirers':
      return {
        idx: 3,
        logoSrc: './assets/logo.svg',
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: null,
        secondaryCtaTxt: 'For Contractors',
        secondaryCtaLink: '',
        showFooterVisual: false,
        useModal: true,
      };
    default:
      console.log(`Invalid pagename arg: '${page}'`);
  }
}

export default getVarsFor;
