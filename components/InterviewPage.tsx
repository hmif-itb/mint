import React from 'react';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import Grid from '@material-ui/core/Grid/Grid';
import ArrowForward from '@material-ui/icons/ArrowForward';
import StopIcon from '@material-ui/icons/StopRounded';
import PauseIcon from '@material-ui/icons/PauseRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import NoteIcon from '@material-ui/icons/Note';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Hidden from '@material-ui/core/Hidden/Hidden';
import { connect } from 'react-redux';
import InterviewerNote from './InterviewerNote';
import { setInterviewPageState, usageLoggingSetTimeElapsed } from '../redux/actions';
import { InterviewSessionData, MintReduxComponent, MintState, Section } from '../redux/types';
import { SectionTuple, SessionSummary } from '../helpers/types';
import InterviewStepper from './InterviewStepper';

interface OwnProps {
  interviewSessionData: InterviewSessionData;
  onReset: () => void;
  onFinish: (sessionSummary: SessionSummary) => void;
}

type MyProps = OwnProps & MintReduxComponent;

class InterviewPage extends React.Component<MyProps> {
  timerHandle?: number;

  constructor(props: MyProps) {
    super(props);
  }

  get interviewPageState() {
    return this.props.state.interviewPage;
  }

  componentDidMount() {
    if (this.interviewPageState.timerEnabled) this.startTimer();
  }

  async setReduxState(state: {}) {
    await this.props.dispatch(setInterviewPageState(state));
  }

  attemptStop() {
    this.setReduxState({ stopDialogOpen: true });
  }

  confirmStop() {
    this.stopTimer();
    this.props.onReset();
  }

  cancelStop() {
    this.setReduxState({ stopDialogOpen: false });
  }

  async handleFinish() {
    await this.persistStepDuration();
    this.stopTimer();

    const sections = this.props.state.session.interviewSessionData?.interview.sections;
    const sectionCumulativeTime = this.props.state.usageLogging.sectionCumulativeTime;

    const sectionTuples =
      sections?.map((section: Section) => {
        const timeElapsed = sectionCumulativeTime[section.order] || 0;
        return {
          sectionTitle: `${section.title}`,
          sectionOrder: section.order,
          timeElapsed
        } as SectionTuple;
      }) || [];

    const sessionSummary: SessionSummary = {
      timeElapsed: this.interviewPageState.timeElapsed,
      sectionTuples: sectionTuples
    };

    this.props.onFinish(sessionSummary);
  }

  startTimer() {
    if (!this.timerHandle) window.clearInterval(this.timerHandle);

    this.timerHandle = window.setInterval(() => {
      this.setReduxState({
        timeElapsed: this.interviewPageState.timeElapsed + 1
      });
    }, 1000);

    this.setReduxState({ timerEnabled: true });
  }

  stopTimer() {
    if (this.timerHandle) window.clearInterval(this.timerHandle);

    this.timerHandle = undefined;

    this.setReduxState({ timerEnabled: false });
  }

  static secondsToHms(d: number): string {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    return h > 0
      ? `${`00${h}`.slice(-2)}:${`00${m}`.slice(-2)}:${`00${s}`.slice(-2)}`
      : `${`00${m}`.slice(-2)}:${`00${s}`.slice(-2)}`;
  }

  handleStepChange(activeStep: number) {
    this.persistStepDuration();
    this.setReduxState({ activeStep });
  }

  async persistStepDuration() {
    const { dispatch, interviewSessionData, state } = this.props;

    const currentActiveStep = this.interviewPageState.activeStep;
    const timeElapsed = this.interviewPageState.timeElapsed;
    const lastStepChangeTimestamp = this.interviewPageState.lastStepChangeTimestamp;

    const orderNumber = interviewSessionData.interview.sections[currentActiveStep].order;
    const prevTimeElapsed = state.usageLogging.sectionCumulativeTime[orderNumber] || 0;
    const timeDifference = timeElapsed - lastStepChangeTimestamp;
    const newTimeElapsed = prevTimeElapsed + timeDifference;

    await dispatch(usageLoggingSetTimeElapsed(orderNumber, newTimeElapsed));
    await this.setReduxState({ lastStepChangeTimestamp: timeElapsed });
  }

  render() {
    const { interviewSessionData } = this.props;
    const reduxState = this.interviewPageState;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} md={reduxState.notesOpen ? 9 : 12}>
          <div>
            <Container maxWidth="md">
              <Box mt={3}>
                <Typography variant="h3" component="span" color="primary" style={{ fontWeight: 900 }}>
                  Mint
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" component="span" color="primary">
                  by HMIF Tech
                </Typography>
              </Box>
              <Box mt={3}>
                <Button
                  disableElevation
                  variant="contained"
                  startIcon={<StopIcon />}
                  style={{
                    backgroundColor: '#ef5350',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                  onClick={() => this.attemptStop()}
                >
                  Stop
                </Button>
                {reduxState.timerEnabled && (
                  <Button
                    disableElevation
                    variant="contained"
                    startIcon={<PauseIcon />}
                    style={{
                      backgroundColor: '#ff7043',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      marginLeft: '8px'
                    }}
                    onClick={() => this.stopTimer()}
                  >
                    Pause
                  </Button>
                )}
                {!reduxState.timerEnabled && (
                  <Button
                    disableElevation
                    variant="contained"
                    startIcon={<PlayIcon />}
                    style={{
                      backgroundColor: '#1e88e5',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      marginLeft: '8px'
                    }}
                    onClick={() => this.startTimer()}
                  >
                    Play
                  </Button>
                )}
                <Hidden smDown>
                  {!reduxState.notesOpen && (
                    <Button
                      disableElevation
                      variant="contained"
                      startIcon={<NoteIcon />}
                      style={{
                        backgroundColor: '#00bcd4',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        marginLeft: '8px'
                      }}
                      onClick={() =>
                        this.setReduxState({
                          notesOpen: true
                        })
                      }
                    >
                      Show Note
                    </Button>
                  )}
                </Hidden>
              </Box>
              <Box mt={4}>
                <Grid container spacing={3}>
                  <Grid item>
                    <div style={{ color: '#545454' }}>Waktu</div>
                    <Box mt={0}>
                      <Typography variant="subtitle1" style={{ fontWeight: 900 }}>
                        {InterviewPage.secondsToHms(reduxState.timeElapsed)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <div style={{ color: '#545454' }}>Interview</div>
                    <Box mt={0}>
                      <Typography variant="subtitle1" style={{ fontWeight: 900 }}>
                        {this.props.interviewSessionData.interview.title}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <div style={{ color: '#545454' }}>Partisipan</div>
                    <Box mt={0}>
                      <Typography variant="subtitle1" component="span" style={{ fontWeight: 900 }}>
                        {interviewSessionData.interviewerName || interviewSessionData.interviewerNim}
                      </Typography>
                      &nbsp;
                      <ArrowForward fontSize="inherit" />
                      &nbsp;
                      <Typography variant="subtitle1" component="span" style={{ fontWeight: 900 }}>
                        {interviewSessionData.intervieweeName || interviewSessionData.intervieweeNim}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={3} mb={4}>
                <InterviewStepper
                  onFinish={() => this.handleFinish()}
                  interviewSessionData={this.props.interviewSessionData}
                  interviewPaused={!reduxState.timerEnabled}
                  activeStep={reduxState.activeStep}
                  onStepChange={(step: number) => this.handleStepChange(step)}
                />
              </Box>
            </Container>
            <Dialog
              open={reduxState.stopDialogOpen}
              onClose={() => this.cancelStop()}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Sudahi sesi mock interview?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Kamu akan kembali ke layar utama, dan progressmu akan terhapus.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                  onClick={() => this.cancelStop()}
                  color="default"
                >
                  Tidak
                </Button>
                <Button
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                  onClick={() => this.confirmStop()}
                  color="default"
                  autoFocus
                >
                  Ya
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        {reduxState.notesOpen && (
          <Hidden smDown>
            <Grid
              item
              md={3}
              style={{
                backgroundColor: '#fff8e1',
                position: 'fixed',
                height: '100vh',
                minWidth: `${(3 / 12) * 100}%`,
                right: 0,
                borderLeft: '1px solid #00000011'
              }}
            >
              <InterviewerNote
                value={reduxState.notesContent}
                onChange={(notesContent: string) => this.setReduxState({ notesContent })}
                onClose={() => this.setReduxState({ notesOpen: false })}
              />
            </Grid>
          </Hidden>
        )}
      </Grid>
    );
  }
}

export default connect((state: MintState) => ({ state }))(InterviewPage);
