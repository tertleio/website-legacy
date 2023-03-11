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
        { sections: './content/1.md' },
        { footer: './components/footer.hbs' },
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: [{ layout: './layouts/post.hbs' }],
      vars: {
        h1: '15 Questions to Ask a Potential Co-Founder',
        title: '15 Questions to Ask a Potential Co-Founder - Tertle Blog',
        canonical:
          'https://tertle.io/blog/15-questions-to-ask-a-potential-co-founder',
        description:
          'Some of my favourite questions to ask when searching for a co-founder.',
        ogType: 'article',
        ogImg: 'https://tertle.io/assets/blog/co-founder_coffee-sq.jpg',
      },
    },
    write:
      '../public/blog/15-questions-to-ask-a-potential-co-founder/index.html',
  },
  {
    name: 'home',
    prebuild: {
      read: [
        { header: './components/header.hbs' },
        { sections: './sections/index.hbs' },
        { footer: './components/footer.hbs' },
      ],
      vars: { ...defaultVars },
    },
    build: {
      read: [{ layout: './layouts/default.hbs' }],
      vars: {
        title: 'Tertle - Co-Founder Matching',
        canonical: 'https://tertle.io',
        description:
          'Where solo startup founders come to meet their co-founder',
        ogImg: 'https://tertle.io/assets/features/vetted-founders[dark].jpg',
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
        title: 'Tertle Blog',
        canonical: 'https://tertle.io/blog',
        description: 'Hear ye, tech founders - a blog about startup stuff!',
        ogImg: 'https://tertle.io/assets/features/vetted-founders[dark].jpg',
      },
    },
    write: '../public/blog/index.html',
  },
];

module.exports = config;
