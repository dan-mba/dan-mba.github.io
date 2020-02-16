/*
 * Tabs/WorkTab.js
 *
 * The WorlTab component is displayed on the /experience route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardHeader, CardActions, CardContent, Collapse, IconButton,
  Typography, Avatar, Grid, List, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toggleJob } from '../redux/actions/work';
import { LItem } from '../util/ListItems';
import styles from './WorkTabStyles';

import codeImg from '../img/code.png';
import fourImg from '../img/libramont34.png';
import pcImg from '../img/computer_pc.png';
import waferImg from '../img/chip_wafer.png';
import panelImg from '../img/mainframe_panel.png';
import repairImg from '../img/mainframe_repair.png';


const Job = ({ title, subtitle, employer, location, start, end, errimg, img,
  children, description, classes, expanded, index, dispatch }) => (
    <Grid item sm={12} lg={10}>
      <Card>
        <CardHeader
          className={classes.header}
          classes={{
            title: classes.title,
            subheader: classes.subheader,
            avatar: classes.avatarRoot,
            content: classes.content,
          }}
          avatar={(
            <Avatar
              alt={title}
              src={img}
              data-img={errimg}
              className={classes.avatar}
            />
          )}
          title={!subtitle ? title : (
            <span>
              {title}
              <br />
              {subtitle}
            </span>
          )}
          titleTypographyProps={{ variant: 'h5' }}
          subheader={(
            <span>
              {employer}
              {employer === '' ? '' : ' - '}
              {location}
              <br />
              {`${start} - ${end}`}
            </span>
          )}
          subheaderTypographyProps={{ variant: 'h5' }}
        />
        <CardActions>
          <Typography variant="h5" className={classes.jobDescription}>
            {description}
          </Typography>
          <IconButton
            className={!expanded ? classes.expand : classes.expandOpen}
            onClick={() => dispatch(toggleJob(index))}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {children}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
);

Job.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  employer: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  errimg: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const WorkTab = ({ classes, expanded, dispatch }) => (
  <Grid container spacing={2} justify="center" className={classes.root}>
    <Job
      title="Private Consultant"
      employer=""
      location="Miramar, FL"
      start="January 2018"
      end="Present"
      description="Freelance QuickBase &amp; Web Developer"
      img={codeImg}
      errimg="https://cdn.pixabay.com/photo/2016/07/30/17/19/code-1557582_960_720.jpg"
      classes={classes}
      index={5}
      expanded={expanded[5]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        While looking for a full-time job, I am working on short-term freelance projects.
        I am also spending time learning new javascript libraries and developing sample
        projects with them.
      </Typography>
      <Typography variant="body1">
        Develop personal projects to grow my programming skills.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Build applications using the React, Vue, and D3 JavaScript libraries.
        </LItem>
        <LItem>Create Node.js applications using the Express web framework.</LItem>
        <LItem>
          Develop a React application using the Next.js framework for server-side rendering (SSR).
        </LItem>
        <LItem>
          Connect projects to MongoDB & SQLite databases using Mongoose & Sequelize ORM/ODM.
        </LItem>
        <LItem>
          Create a blog using Gatsby static site generator & Netlify CMS Git based content manager.
        </LItem>
      </List>
      <Typography variant="body1">
        Work on QuickBase freelance projects providing application updates and administration.
      </Typography>
    </Job>
    <Job
      title="Application Developer"
      employer="FourBlocks LLC"
      location="Doral, FL"
      start="July 2013"
      end="December 2017"
      description="Aplication Developer - QuickBase Cloud Database"
      img={fourImg}
      errimg="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/20140728_libramont34.JPG/320px-20140728_libramont34.JPG"
      classes={classes}
      index={4}
      expanded={expanded[4]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        FourBlocks LLC is a company that provides services to other companies under the
        same ownership group. My position develops and supports applications used by construction
        and industrial equipment dealerships in Central &amp; South America and the Caribbean.
      </Typography>
      <Typography variant="body1">
        Developed CRM Applications using QuickBase cloud database.
      </Typography>
      <List className={classes.list}>
        <LItem>Defined fields and relationships for tables.</LItem>
        <LItem>Created forms for creating, viewing, and editing records.</LItem>
        <LItem>Designed table and graphical reports to highlight key customer data.</LItem>
      </List>
      <Typography variant="body1">
        Created an application to display records as printable proforma invoices.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Developed on QuickBase using HTML, CSS, JavaScript, jQuery, XML, REST, and AJAX.
        </LItem>
        <LItem>
          Designed a template invoice and filled in the details stored in 2 separate tables.
        </LItem>
      </List>
      <Typography variant="body1">
        Created applications to handle GPS data from customer machines.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Developed on QuickBase using HTML, CSS, JavaScript, jQuery, jQuery UI, JSON, REST, and
          AJAX.
        </LItem>
        <LItem>
          Designed code to allow GPS data to be imported into machine records on a button click.
        </LItem>
        <LItem>
          Created an app to display machine usage data for a date selected from a calendar widget.
        </LItem>
        <LItem>
          Developed a report to display weekly machine usage and expected maintenance dates.
        </LItem>
      </List>
    </Job>
    <Job
      title="Private Consultant"
      employer=""
      location="Indianapolis, IN"
      start="January 2007"
      end="June 2013"
      description="PC and Home Network Technical Support"
      img={pcImg}
      errimg="https://pngimg.com/uploads/computer_pc/computer_pc_PNG7706.png"
      classes={classes}
      index={3}
      expanded={expanded[3]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        During this period, I was working on my MBA &amp; attempting a career change to finance.
        I stayed involved in technology by providing technical support to friends, family,
        &amp; classmates.
      </Typography>
      <Typography variant="body1">
        Installed and maintained Windows systems.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Ensured application of OS &amp; program security updates and debugged registry errors
          &amp; DLL issues.
        </LItem>
      </List>
      <Typography variant="body1">
        Installed, configured, and secured wireless home networks.
      </Typography>
    </Job>
    <Job
      title="Staff Software Engineer"
      subtitle="Engineering &amp; Technology Services"
      employer="IBM"
      location="East Fishkill, NY"
      start="February 2004"
      end="November 2007"
      description="Software Engineer - Microelectronics Services"
      img={waferImg}
      errimg="https://c1.staticflickr.com/5/4289/35053537405_872707aaf2_q_d.jpg"
      classes={classes}
      index={2}
      expanded={expanded[2]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        The Engineering &amp; Technology Services group was part of IBM&amos;s Microelectronics
        division. It provided services in circuit design, testing, and fabrication.
        My position involved creating assebbly language testcases &amp; developing simulation
        software.
      </Typography>
      <Typography variant="body1">
        Designed a logic simulator to verify the statistical randomness of a random number
        generator.
      </Typography>
      <List className={classes.list}>
        <LItem>Developed on AIX and Linux using C, Ksh, &amp; AWK.</LItem>
        <LItem>
          Created the simulator and scripts to parse the circuit outputs to calculate statistical
          values.
        </LItem>
        <LItem>
          Generated a report of the statistical data and plots of the local means for several
          input values.
        </LItem>
      </List>
      <Typography variant="body1">
        Member of a team that developed an app to characterize circuit performance in various
        scenarios.
      </Typography>
      <List className={classes.list}>
        <LItem>Developed on AIX using C, C++, PERL, &amp; Tcl.</LItem>
        <LItem>
          Created code to extract circuit specifications from library files to be used in a
          SPICE simulation.
        </LItem>
        <LItem>
          Designed scripts to parse input parameters and make calls to each piece of the
          application.
        </LItem>
      </List>
      <Typography variant="body1">
        Wrote test cases to verify the custom PowerPC processor design used in the Xbox 360.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Selected assembly instructions executed and memory areas accessed to test specific
          cases.
        </LItem>
        <LItem>
          Debugged failing test cases and gathered error data to report failures to circuit
          design teams.
        </LItem>
      </List>
      <Typography variant="body1">
        Assisted in developing a program to verify fabricated wafers on an Advantest
        (formerly Agilent) test system.
      </Typography>
      <List className={classes.list}>
        <LItem>
          The test program verified electrical conductivity and functionality of each chip
          on the wafer.
        </LItem>
        <LItem>
          Followed ITAR procedures as these chips were designed for a possible military use.
        </LItem>
      </List>
      <Typography variant="body1">
        Administered AIX and Red Hat Enterprise Linux workstations for the department.
      </Typography>
      <List className={classes.list}>
        <LItem>Installed applications and system updates.</LItem>
        <LItem>Configured system settings (network, file systems, X Windows).</LItem>
      </List>
    </Job>
    <Job
      title="Staff Software Engineer"
      subtitle="z/OS Software Development"
      employer="IBM"
      location="Poughkeepsie, NY"
      start="March 2001"
      end="January 2004"
      description="Software Developer - z/OS Components"
      img={panelImg}
      errimg="https://www.ibm.com/blogs/systems/wp-content/uploads/2018/02/mainframe-panel-2.jpg"
      classes={classes}
      index={1}
      expanded={expanded[1]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        z/OS is an operating system for IBM z series mainframes.
        My position developed components of the operating system.
        zFS was being developed as the high-performance replacement for the HFS UNIX file system.
        The Language Environment C runtime libraries provide the standard functions for programs
        written in C. My work with the C runtime libraries primarily focused on the functions
        providing file access to data sets.
      </Typography>
      <Typography variant="body1">
        Modified the zFS file system to improve the reliability &amp; usability.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Updated code to minimize functionality loss after an error while maintaining data
          integrity.
        </LItem>
        <LItem>Added additional functionality to the zfsadm file system administration tool.</LItem>
      </List>
      <Typography variant="body1">
        Modified z/OS Language Environment C runtime libraries to take advantage of 64-bit hardware.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Updated code to support 64-bit without affecting how existing 31-bit applications ran.
        </LItem>
      </List>
    </Job>
    <Job
      title="Software Engineer"
      subtitle="z/OS Technical Support"
      employer="IBM"
      location="Poughkeepsie, NY"
      start="June 1997"
      end="February 2001"
      description="z/OS Language Environment Level 2 Support"
      img={repairImg}
      errimg="https://c1.staticflickr.com/5/4340/36367958994_811bd295fc_q_d.jpg"
      classes={classes}
      index={0}
      expanded={expanded[0]}
      dispatch={dispatch}
    >
      <Typography variant="body1" paragraph>
        z/OS Level 2 support provides phone &amp; electronic technical support for z/OS customers.
        Level 1 support takes the initial call from customers, and after searching for known
        issues, passes it on to Level 2. Level 2 then works with the customer to gather diagnostic
        data and resolve the issue as IBM defect, third-party defect, or customer error.
      </Typography>
      <Typography variant="body1">
        Provided support for the Language Environment component of z/OS.
      </Typography>
      <List className={classes.list}>
        <LItem>Supported applications written in C, C++, COBOL, PL/I, and FORTRAN.</LItem>
        <LItem>
          Assisted customers in gathering diagnostic data &amp; replicated issues locally when
          possible.
        </LItem>
        <LItem>Became a subject matter expert on problems involving the TCP/IP DNS resolver.</LItem>
        <LItem>
          Provided late shift support for Mountain &amp; Pacific time and was on call for 24-hour
          support.
        </LItem>
        <LItem>
          Mentored new hires on adapting to z/OS from the UNIX systems they were used to in college.
        </LItem>
      </List>
      <Typography variant="body1">
        Served as department workstation coordinator.
      </Typography>
      <List className={classes.list}>
        <LItem>
          Upgraded PCs to the new Windows build &amp; assisted users migrating to Lotus Notes
          for email.
        </LItem>
      </List>
    </Job>
  </Grid>
);

WorkTab.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((store) => store.work)(withStyles(styles)(WorkTab));
