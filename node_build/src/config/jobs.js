/* eslint global-require: 0  */

export const JOBS = [
  {
    title: 'Private Consultant',
    employer: 'Miramar, FL',
    dates: 'January 2018 - Present',
    description: 'Freelance Quickbase & Web Developer',
    details: [
      'While looking for a full-time job, I am working on short-term freelance projects. '
      + 'I am also spending time learning new javascript libraries and developing sample '
      + 'projects with them.',
      {
        title: 'Develop personal projects to grow my programming skills.',
        list: [
          'Build applications using the React, Vue, and D3 JavaScript libraries.',
          'Create Node.js applications using the Express web framework.',
          'Develop a React application using the Next.js framework for server-side rendering (SSR).',
          'Connect projects to MongoDB & SQLite databases using Mongoose & Sequelize ORM/ODM.',
          'Create a blog using Gatsby static site generator & Netlify CMS Git based content manager.',
        ],
      },
      'Work on QuickBase freelance projects providing application updates and administration.',
    ],
    image: require('../img/code.png'),
    errimg: 'https://cdn.pixabay.com/photo/2016/07/30/17/19/code-1557582_960_720.jpg',
  },
  {
    title: 'Application Developer',
    employer: 'FourBlocks LLC - Doral, FL',
    dates: 'July 2013 - December 2017',
    description: 'Aplication Developer - QuickBase Cloud Database',
    details: [
      'FourBlocks LLC is a company that provides services to other companies under the '
      + 'same ownership group. My position develops and supports applications used by construction '
      + 'and industrial equipment dealerships in Central & South America and the Caribbean.',
      {
        title: 'Developed CRM Applications using QuickBase cloud database.',
        list: [
          'Defined fields and relationships for tables.',
          'Created forms for creating, viewing, and editing records.',
          'Designed table and graphical reports to highlight key customer data.',
        ],
      },
      {
        title: 'Created an application to display records as printable proforma invoices.',
        list: [
          'Developed on QuickBase using HTML, CSS, JavaScript, jQuery, XML, REST, and AJAX.',
          'Designed a template invoice and filled in the details stored in 2 separate tables.',
        ],
      },
      {
        title: 'Created applications to handle GPS data from customer machines.',
        list: [
          'Developed on QuickBase using HTML, CSS, JavaScript, jQuery, jQuery UI, JSON, REST, and AJAX.',
          'Designed code to allow GPS data to be imported into machine records on a button click.',
          'Created an app to display machine usage data for a date selected from a calendar widget.',
          'Developed a report to display weekly machine usage and expected maintenance dates.',
        ],
      },
    ],
    image: require('../img/libramont34.png'),
    errimg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/20140728_libramont34.JPG/320px-20140728_libramont34.JPG',
  },
  {
    title: 'Private Consultant',
    employer: 'Indianapolis, IN',
    dates: 'January 2007 - June 2013',
    description: 'PC and Home Network Technical Support',
    details: [
      'During this period, I was working on my MBA & attempting a career change to finance. '
      + 'I stayed involved in technology by providing technical support to friends, family, '
      + '& classmates.',
      {
        title: 'Installed and maintained Windows systems.',
        list: [
          'Ensured application of OS & program security updates and debugged registry errors & DLL issues.',
        ],
      },
      'Installed, configured, and secured wireless home networks.',
    ],
    image: require('../img/computer_pc.png'),
    errimg: 'https://pngimg.com/uploads/computer_pc/computer_pc_PNG7706.png',
  },
  {
    title: 'Staff Software Engineer',
    subtitle: 'Engineering & Technology Services',
    employer: 'IBM - East Fishkill, NY',
    dates: 'February 2004 - November 2007',
    description: 'Software Engineer - Microelectronics Services',
    details: [
      'The Engineering & Technology Services group was part of IBM\'s Microelectronics '
      + 'division. It provided services in circuit design, testing, and fabrication. '
      + 'My position involved creating assebbly language testcases & developing simulation '
      + 'software.',
      {
        title: 'Designed a logic simulator to verify the statistical randomness of a random number generator.',
        list: [
          'Developed on AIX and Linux using C, Ksh, & AWK.',
          'Created the simulator and scripts to parse the circuit outputs to calculate statistical values.',
          'Generated a report of the statistical data and plots of the local means for several input values.',
        ],
      },
      {
        title: 'Member of a team that developed an app to characterize circuit performance in various scenarios.',
        list: [
          'Developed on AIX using C, C++, PERL, & Tcl.',
          'Created code to extract circuit specifications from library files to be used in a SPICE simulation.',
          'Designed scripts to parse input parameters and make calls to each piece of the application.',
        ],
      },
      {
        title: 'Wrote test cases to verify the custom PowerPC processor design used in the Xbox 360.',
        list: [
          'Selected assembly instructions executed and memory areas accessed to test specific cases.',
          'Debugged failing test cases and gathered error data to report failures to circuit design teams.',
        ],
      },
      {
        title: 'Assisted in developing a program to verify fabricated wafers on an Advantest '
                + '(formerly Agilent) test system.',
        list: [
          'The test program verified electrical conductivity and functionality of each chip on the wafer.',
          'Followed ITAR procedures as these chips were designed for a possible military use.',
        ],
      },
      {
        title: 'Administered AIX and Red Hat Enterprise Linux workstations for the department.',
        list: [
          'Installed applications and system updates.',
          'Configured system settings (network, file systems, X Windows).',
        ],
      },
    ],
    image: require('../img/chip_wafer.png'),
    errimg: 'https://c1.staticflickr.com/5/4289/35053537405_872707aaf2_q_d.jpg',
  },
  {
    title: 'Staff Software Engineer',
    subtitle: 'z/OS Software Development',
    employer: 'IBM - Poughkeepsie, NY',
    dates: 'March 2001 - January 2004',
    description: 'Software Developer - z/OS Components',
    details: [
      'z/OS is an operating system for IBM z series mainframes. My position developed components '
      + 'of the operating system. zFS was being developed as the high-performance replacement '
      + 'for the HFS UNIX file system. The Language Environment C runtime libraries provide the '
      + 'standard functions for programs written in C. My work with the C runtime libraries '
      + 'primarily focused on the functions providing file access to data sets.',
      {
        title: 'Modified the zFS file system to improve the reliability & usability.',
        list: [
          'Updated code to minimize functionality loss after an error while maintaining data integrity.',
          'Added additional functionality to the zfsadm file system administration tool.',
        ],
      },
      {
        title: 'Modified z/OS Language Environment C runtime libraries to take advantage of 64-bit hardware.',
        list: [
          'Updated code to support 64-bit without affecting how existing 31-bit applications ran.',
        ],
      },
    ],
    image: require('../img/mainframe_panel.png'),
    errimg: 'https://www.ibm.com/blogs/systems/wp-content/uploads/2018/02/mainframe-panel-2.jpg',
  },
  {
    title: 'Software Engineer',
    subtitle: 'z/OS Technical Support',
    employer: 'IBM - Poughkeepsie, NY',
    dates: 'June 1997 - February 2001',
    description: 'z/OS Language Environment Level 2 Support',
    details: [
      'z/OS Level 2 support provides phone &amp; electronic technical support for z/OS customers. '
      + 'Level 1 support takes the initial call from customers, and after searching for known '
      + 'issues, passes it on to Level 2. Level 2 then works with the customer to gather diagnostic '
      + 'data and resolve the issue as IBM defect, third-party defect, or customer error.',
      {
        title: 'Provided support for the Language Environment component of z/OS.',
        list: [
          'Supported applications written in C, C++, COBOL, PL/I, and FORTRAN.',
          'Assisted customers in gathering diagnostic data & replicated issues locally when possible.',
          'Became a subject matter expert on problems involving the TCP/IP DNS resolver.',
          'Provided late shift support for Mountain &amp; Pacific time and was on call for 24-hour support.',
          'Mentored new hires on adapting to z/OS from the UNIX systems they were used to in college.',
        ],
      },
      {
        title: 'Served as department workstation coordinator.',
        list: [
          'Upgraded PCs to the new Windows build & assisted users migrating to Lotus Notes for email.',
        ],
      },
    ],
    image: require('../img/mainframe_repair.png'),
    errimg: 'https://c1.staticflickr.com/5/4340/36367958994_811bd295fc_q_d.jpg',
  },
];
