import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    fontWeight:'700',
    
  },
  paper:{
    margin: '10',
    width: '100%',
    padding:'10',
  },
  mainheading: {
    textAlign: 'center',
    fontSize:'45px',
    fontFamily:'Edwardian Script ITC',
    lineHeight:'1.4',
  },
  mainheading2: {
    textAlign: 'center',
    fontSize:'30px',
    color: 'orange',
  },
  spanheading:{
    color: '#92d219',
  },
  bottomcont:{
    textAlign: 'center',
    fontSize:'30px',
    fontFamily:'Brush Script MT',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class FAQ extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography>
            <p className={classes.mainheading}>To Bring the <span className={classes.spanheading}>Change</span>… <span className={classes.spanheading}>You</span> take the <span className={classes.spanheading}>First Step</span> … 
            <br/>Rest will <span className={classes.spanheading}>Follow you</span>…</p>
            <h1 className={classes.mainheading2}>FAQ's</h1>
          </Typography>
           <h2>General</h2> 
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>1. What is EduHelp all about?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Over years an affluent broadminded NRI’s and entrepreneurs were thinking on a <strong>“Idea”</strong> that could change & solve millions of people Education expense issue through an innovative idea that flashed out in minds, that’s the <strong>birth story of “EduHelp”</strong>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>2. What is the intention of EduHelp?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              EduHelp has no intention to generate revenue or charges any of its kind from this community <strong>Help “Giver” or “Receiver”</strong> rather it’s a <strong>peer to peer helping community</strong>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>3. What is the Objective of EduHelp community?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              The one and only objective is to create a community in which peer to peer help is done to meet their expenses on their kids education
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>4. What are the mandatory things required to join this community?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Each individual is given an ID based on the mobile number and AADHAR card as mandate to connect to the EduHelp community
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <h2>Login & Start up:</h2>
        
        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>5. How to start?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              You need to have an invitation link from the sponsor to get in to this community. Once you receive the link, then update the mandatory field details and get started
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>6. How and when I will start receiving my help?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              First thing first, you need to start helping your receiver above with Rs.100 and receiver gives an confirmation on your help & you get eligible to start receiving from the below givers
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>7. How many such ID can an individual register?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Since this community is created for a good cause of supporting peer to peer helping community for educational expenses, so every individual one ID for one mobile & AADHAR number
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>8. How do I transfer my HELP amount to my RECEIVER?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              While registering itself the mandatory fields system will get the wallet details like PAYtm, Gpay, etc & bank details of every individual and fetch accordingly
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel9'} onChange={this.handleChange('panel9')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>9. If I don’t update my AADHAR details what will happen?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Your ID will be temporarily blocked until you update the mandate details
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel10'} onChange={this.handleChange('panel10')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>10. After going through the help chart I understand there are 7 levels of receivers above me, how many levels can I help immediately?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This is purely a peer to peer educational help community henceforth the system doesn’t allow you to help more than two levels above of your last received level from below Example: You have received help from level 3, so you can help up to 5th level above you
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel11'} onChange={this.handleChange('panel11')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>11. If receiver is not eligible to receive help from bottom, then what should I do?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              In such cases you can wait for line of sponsor to get eligible or you can intimate him and wait till he gets eligible or you can choose pay to the SMART SPREADERS in the Queue
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <h2>SMART Spreaders</h2>
        <ExpansionPanel expanded={expanded === 'panel12'} onChange={this.handleChange('panel12')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>12. Who is SMART SPREADERS?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Smart Spreaders are the one who takes more initiative to explain and promote “EduHelp” a good cause community to people by sponsoring many Help givers & receivers
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel13'} onChange={this.handleChange('panel13')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>13. What’s the eligible clause for a SMART SPREADER?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              To qualify for SMART SPREADER you need to sponsor 6 help givers once you join the community.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel14'} onChange={this.handleChange('panel14')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>14. How many such SMART SPEARDERS QUEUE is there?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              There are six SMART SPREADERS queue, one queue for each level
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel15'} onChange={this.handleChange('panel15')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>15. If I sponsor 6 people will I be in all level SMARTS PREADERS queue?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              No, you will be eligible only for the queue as per your current eligible receiving level. You need to get eligible in each level to get into that respective level queue and receive
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel16'} onChange={this.handleChange('panel16')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>16. How many such times I can receive in each level?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              You will be eligible for re-entry for 10 times in each level of the queue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel17'} onChange={this.handleChange('panel17')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>17. What is the benefit for a SMART SPREADER?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              SMART SPREADER gets an additional help benefit from others also wherever the missing help
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel18'} onChange={this.handleChange('panel18')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>18. What is missing help mean?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              When receiver’s are not eligible to receive from level below, but the helper can wait till line of sponsor get eligible or he can pay to "smart spreaders" according to the queue of that level
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel19'} onChange={this.handleChange('panel19')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>19. How do SMART SPREADERS receive help?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ul>
                <li>Smart Spreaders are on queue list, respective to their level and if there are missing help then the help is allocated according to the queue of SMART SPREADERS it will be assigned first in Q and order wise on a rotational basis.</li>
                <li>Once the smart spreader receives the missing help assigned to him then he reenters the queue</li>
                <li>Smart spreader gets as many re-entry of 10 times as per the level eligibility
                    <br/>Example: In Level 2 queue Smart Spreaders can reenter 10 times, it applies in other level queue</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <h2>Disputes:</h2>
        <ExpansionPanel expanded={expanded === 'panel20'} onChange={this.handleChange('panel20')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>20. If HELPER has send money & RECEIVER claims that not received then what to do?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <ul>
                <li>In the above scenario, the Helper has to send a proof of transaction or screen shot to the receiver and the admin also in disputes dashboard</li>
                <li>In such cases the helper can raise a query to the admin only after 3 workings days from the day of remittance, to wait for banking side delay or electronic errors</li>
                <li>After the query is resolved then the help confirmation will be given accordingly, till then the transaction confirmation will be mapped to temporary hold</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel21'} onChange={this.handleChange('panel21')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>21. Incase if I forgot the password?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Please use forgot password option and gets the reset link through email
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel22'} onChange={this.handleChange('panel22')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>22. In case of any feedbacks or suggestions arise whom do I contact?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              We give atmost care to go through valuable feedbacks and suggestion and implement it, only if it’s a improve, amend superior changes, will make it better quality to our community
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel23'} onChange={this.handleChange('panel23')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>23. In case of grievance and issue?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Please intimate all the grievances and issues from your registered mail ID mentioning your ID number and you valid grievances to the admin panel. You can use Disputes menu on dash board
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel24'} onChange={this.handleChange('panel24')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>24. How can I share this to a peer on mine?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              You have a referral link menu on your dashboard use that and refer to your peers
              <ul>
                <li>Web link</li>
                <li>Share on what’s app link</li>
              </ul>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel25'} onChange={this.handleChange('panel25')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>25. Should I pay income tax for the help that I receive in my account?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              As per the norms you don’t need to pay income tax, but income ratio on a case to case basis will change. So it is always better to consult your Tax consultant/Auditor for the same.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel26'} onChange={this.handleChange('panel26')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>26. If my education requirement is fulfilled and still I have excess funds I want to volunteer help in such case whom should I contact?</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              You can go to the volunteer help tab on the dashboard for the same.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <p className={classes.bottomcont}>Will get update time to time as and when users raise frequent questions 
        <br/>on the uncovered and left out topics</p>
        
        </Paper>
      </div>
    );
  }
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);