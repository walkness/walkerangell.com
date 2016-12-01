module.exports = {

  name: 'Walker Angell',

  description: '',

  social: {
    facebook: {
      title: 'Facebook',
      link: 'https://www.facebook.com/wfangell',
    },
    linkedin: {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/wangell',
    },
  },

  development: {

    sectionTitle: 'Development',

    projects: {
      nearbysupply: {
        name: 'Nearby Supply',
        link: 'http://nearby.supply/',
        screenshot: 'development/nearbysupply',
        launchDate: null,
        primaryColor: [240, 85, 69],
        technologies: ['ios', 'react', 'django', 'sass'],
        hosting: ['aws'],
      },
      idj: {
        name: 'Ivone, Devine & Jensen',
        link: 'http://www.idjllp.com/',
        screenshot: 'development/idj',
        launchDate: new Date(2016, 7, 1),
        primaryColor: [42, 75, 94],
        technologies: ['react', 'sass'],
        hosting: ['aws'],
      },
      chargerville: {
        name: 'Chargerville',
        link: 'https://chargerville.com/',
        screenshot: 'development/chargerville',
        launchDate: new Date(2016, 5, 13),
        primaryColor: [0, 99, 157],
        technologies: ['react', 'django', 'sass'],
        hosting: ['aws'],
      },
      nbngroup: {
        name: 'The NBN Group',
        link: 'http://nothingbutnav.com/',
        screenshot: 'development/nbngroup',
        launchDate: new Date(2015, 11, 24),
        primaryColor: [28, 154, 212],
        technologies: ['craft', 'jquery', 'sass'],
        hosting: ['webfaction', 'aws'],
      },
      personal: {
        name: 'Personal Site',
        link: 'http://walkerangell.com/',
        screenshot: 'development/personal',
        launchDate: new Date(2014, 10, 30),
        primaryColor: [118, 54, 9],
        technologies: ['react', 'sass'],
        hosting: ['aws'],
      },
      forinstants: {
        name: 'For Instants',
        link: 'https://walkandalie.com/',
        screenshot: 'development/forinstants',
        launchDate: new Date(2010, 9, 27),
        primaryColor: [52, 60, 39],
        technologies: ['wordpress', 'jquery', 'sass'],
        hosting: ['linode', 'aws'],
      },
    },

    products: {
      website: {title: 'Website'},
      webapp: {title: 'Web Application'},
      ios: {title: 'iOS Application'},
    },

    technologies: {
      react: {
        title: 'React',
        link: 'https://facebook.github.io/react/',
      },
      django: {
        title: 'Django',
        link: 'https://www.djangoproject.com/',
      },
      wordpress: {
        title: 'WordPress',
        link: 'https://wordpress.org/',
      },
      craft: {
        title: 'Craft CMS',
        link: 'https://craftcms.com/',
      },
      sass: {
        title: 'Sass',
        link: 'http://sass-lang.com/',
      },
      ios: {
        title: 'iOS',
        link: 'https://developer.apple.com/library/ios/navigation/',
      },
      jquery: {
        title: 'jQuery',
        link: 'https://jquery.com/',
      },
    },

    languages: {
      js: {title: 'JavaScript'},
      swift: {title: 'Swift 2'},
      php: {title: 'PHP'},
      python: {title: 'Python'},
    },

    hosting: {
      aws: {
        title: 'Amazon Web Services',
        link: 'https://aws.amazon.com/',
      },
      linode: {
        title: 'Linode',
        link: 'https://www.linode.com/',
      },
      webfaction: {
        title: 'Webfaction',
        link: 'https://www.webfaction.com/',
      },
    },
  },

  photography: {

    sectionTitle: 'Photography',

    portfolio: require('./portfolio'),
  },

  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

}
