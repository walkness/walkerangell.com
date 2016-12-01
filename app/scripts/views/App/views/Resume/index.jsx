import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import { monthNames } from '../../../../../../data';

import PageHeader from '../../components/PageHeader';


const Company = ({ title, link }) => {
  let inner = title;
  if (link) {
    if (link.startsWith('http')) {
      inner = <a href={link} target='_blank' rel='noopener noreferrer'>{title}</a>;
    } else {
      inner = <Link to={link}>{title}</Link>;
    }
  }
  return (
    <h3 className='company'>
      { inner }
    </h3>
  );
};

Company.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

const experience = [
  {
    company: 'Nearby Supply',
    link: '/development/#nearbysupply',
    location: 'Brooklyn, New York',
    startDate: new Date(2015, 2, 29),
    endDate: null,
    roles: [
      {
        title: 'Founder',
        body: require('./content/nearbysupply/index.md'), // eslint-disable-line global-require
      },
    ],
  },
  {
    company: 'Freelance Developer and Technology Consultant',
    location: 'Brooklyn, New York',
    startDate: new Date(2014, 7, 6),
    endDate: null,
    roles: [
      {
        title: 'Consultant for various web and information technology projects',
      },
    ],
  },
  {
    company: 'Neuberger Berman',
    link: 'http://www.nb.com/',
    location: 'New York, New York',
    startDate: new Date(2011, 7, 5),
    endDate: new Date(2014, 7, 3),
    roles: [
      {
        title: 'Private Equity Analyst, <a href="http://www.nb.com/pages/public/en-us/private-equity.aspx" target="_blank">NB Alternatives</a>',
        body: require('./content/neuberger/index.md'), // eslint-disable-line global-require
      },
      {
        title: 'Private Equity Intern, <a href="http://www.nb.com/pages/public/en-us/private-equity.aspx" target="_blank">NB Alternatives</a>',
      },
    ],
  },
  {
    company: 'Palamon Capital Partners',
    link: 'http://www.palamon.com/',
    location: 'London, England',
    startDate: new Date(2009, 8, 1),
    endDate: new Date(2009, 9, 20),
    periodDisplay: 'Summer 2009',
    roles: [
      {
        title: 'Intern, Research',
      },
    ],
  },
  {
    company: 'Oaktree Capital Management',
    link: 'https://www.oaktreecapital.com/',
    location: 'London, England',
    startDate: new Date(2009, 6, 15),
    endDate: new Date(2009, 7, 20),
    periodDisplay: 'Summer 2009',
    roles: [
      {
        title: 'Intern, <a href="https://www.oaktreecapital.com/strategies/corporate-debt/european-high-yield-bonds" target="_blank">European High Yield</a>',
      },
    ],
  },
  {
    company: 'Castlelake (f/k/a TPG Credit Management)',
    link: 'https://www.castlelake.com/',
    location: 'Minneapolis, Minnesota',
    startDate: new Date(2008, 6, 1),
    endDate: new Date(2008, 9, 20),
    periodDisplay: 'Summer 2008',
    roles: [
      {
        title: 'Intern',
      },
    ],
  },
];

const education = [
  {
    name: 'University of St Andrews',
    link: 'https://www.st-andrews.ac.uk/',
    degree: 'Master of Arts with Honours (2:1), <a href="http://www.st-andrews.ac.uk/courses/route/UAHFFECSFEC/" target="_blank">Financial Economics</a>',
  },
];

const skills = [
  { name: 'Advanced MS Office (with VBA)' },
  { name: 'HTML, CSS/Sass, JavaScript/ES6, PHP, Python/Django, Swift' },
  { name: 'SQL (Access, MySQL, and PostgreSQL)' },
  { name: 'Server administration (Linux and Apache)' },
  { name: 'Amazon Web Services' },
  { name: 'Networking (routing, switching, firewall)' },
  { name: 'Adobe Creative Suite' },
];

const other = [
  {
    key: 'Interests',
    content: 'Photography, professional audio production, economics, philosophy, guitar, travel, food', // eslint-disable-line max-len
  },
  {
    key: 'Licenses',
    content: 'FINRA Series 7, NASAA Series 66 (Uniform Combined State Law)',
  },
];

const formattedDate = (date) => {
  if (date instanceof Date) {
    return `${monthNames[date.getMonth() - 1]} ${date.getFullYear()}`;
  }
  return date;
};

const Resume = () => (
  <div className='container resume'>

    <Helmet title='Résumé' />

    <PageHeader title='Résumé' />

    <article className='content'>

      <section id='experience'>
        <h2>Experience</h2>

        <ul>
          { experience.map((item, i) => (
            <li key={i}>
              <Company title={item.company} link={item.link} />

              <div className='location'>{item.location}</div>

              { item.periodDisplay ?
                <div className='period'>{item.periodDisplay}</div>
              :
                <div className='period'>

                  <span className='start-date'>
                    {formattedDate(item.startDate)}
                  </span>&nbsp;&mdash;&nbsp;

                  <span className='end-date'>
                    {item.endDate ? formattedDate(item.endDate) : 'Present'}
                  </span>

                </div>
              }

              <ul className='roles'>
                { item.roles.map((role, j) => (
                  <li key={j}>
                    <h4 className='title' dangerouslySetInnerHTML={{ __html: role.title }} />
                    { role.body ?
                      <div className='body' dangerouslySetInnerHTML={{ __html: role.body }} />
                    : null }
                  </li>
                )) }
              </ul>
            </li>
          )) }
        </ul>
      </section>

      <section id='education'>
        <h2>Education</h2>
        <ul>
          { education.map((institution, i) => (
            <li key={i}>
              <h3>
                <a href={institution.link} target='_blank' rel='noopener noreferrer'>
                  {institution.name}
                </a>
              </h3>
              <div className='degree' dangerouslySetInnerHTML={{ __html: institution.degree }} />
            </li>
          )) }
        </ul>
      </section>

      <section id='skills'>
        <h2>Technical Skills</h2>
        <ul>
          { skills.map((skill, i) => (
            <li key={i}>{skill.name}</li>
          )) }
        </ul>
      </section>

      <section id='other'>
        <h2>Other</h2>
        <ul>
          { other.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{ __html: `<em>${item.key}</em>: ${item.content}` }}
            />
          )) }
        </ul>
      </section>

    </article>

  </div>
);

export default Resume;
