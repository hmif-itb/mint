import React from 'react';
import Container from '@material-ui/core/Container/Container';
import Box from '@material-ui/core/Box/Box';
import ReplayIcon from '@material-ui/icons/Replay';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { SessionSummary } from '../helpers/types';
import VerticalCenter from './VerticalCenter';
import { InterviewSessionData, MintReduxComponent, MintState } from '../redux/types';
import { connect } from 'react-redux';
import { default as ProportionChart, ProportionChartItem } from './ProportionChart';
import SendMailDialog from './SendMailDialog';

interface OwnProps {
  onReset: () => void;
  interviewSessionData: InterviewSessionData;
  sessionSummary: SessionSummary;
}

interface MyState {
  sendmailDialogOpen: boolean;
}

type MyProps = OwnProps & MintReduxComponent;

class InterviewFinished extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      sendmailDialogOpen: false
    };
  }

  static secondsToHms(d: number): string {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    return h > 0
      ? `${('00' + h).slice(-2)}:${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`
      : `${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`;
  }

  render() {
    const { sessionSummary, onReset, state } = this.props;

    const timeElapsedSummary = sessionSummary.sectionTuples.map((sectionTuple) => {
      return {
        title: `${sectionTuple.sectionTitle}`,
        value: sectionTuple.timeElapsed
      } as ProportionChartItem;
    });

    return (
      <div>
        <Container maxWidth="xs">
          <VerticalCenter>
            <Box>
              <Typography variant="h4" color="primary" style={{ fontWeight: 900 }}>
                Kalian keren!
              </Typography>
              <p>
                Kalian telah menyelesaikan <i>mock interview</i> kali ini! Kami harap kamu dan teman kamu bisa mendapat
                hasil yang terbaik dalam pencarian tempat magang/kerja kalian.
              </p>
              <p>Tetap semangat!</p>
              <Box mt={3}>
                Waktu:
                <Typography variant="h5" style={{ fontWeight: 900 }}>
                  {InterviewFinished.secondsToHms(sessionSummary.timeElapsed)}
                </Typography>
              </Box>
              <Box mt={3}>
                <ProportionChart series={timeElapsedSummary} />
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    width: '100%',
                    textTransform: 'none'
                  }}
                  disableElevation
                  onClick={() => this.setState({ sendmailDialogOpen: true })}
                >
                  Kirim Ringkasan via Email &nbsp;
                  <EmailIcon fontSize="inherit" />
                </Button>
              </Box>
              <Box mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    width: '100%',
                    textTransform: 'none'
                  }}
                  disableElevation
                  onClick={onReset}
                >
                  Ulangi &nbsp;
                  <ReplayIcon fontSize="inherit" />
                </Button>
              </Box>
            </Box>
          </VerticalCenter>
        </Container>
        <SendMailDialog
          onClose={() => this.setState({ sendmailDialogOpen: false })}
          onSent={() => this.onEmailSent()}
          open={this.state.sendmailDialogOpen}
        />
      </div>
    );
  }

  onEmailSent() {}
}

export default connect((state: MintState) => ({ state }))(InterviewFinished);
