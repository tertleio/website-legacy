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
        { footer: './components/footer.hbs' },
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
