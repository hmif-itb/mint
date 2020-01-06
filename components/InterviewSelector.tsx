import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';
import TextField from '@material-ui/core/TextField/TextField';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import { PacmanLoader } from 'react-spinners';
import { contentLoader } from '../helpers/contentloader';
import { resolveNim } from '../helpers/nimresolver';
import { MintReduxComponent, MintState, Interview, InterviewSessionData } from '../redux/types';
import VerticalCenter from './VerticalCenter';

interface MyState {
  interviews: Interview[];
  selectedInterview: string;
  interviewerNim: string;
  intervieweeNim: string;
  loading: boolean;
}

interface OwnProps {
  onProceed: (interviewSessionData: InterviewSessionData) => void;
}

type MyProps = OwnProps & MintReduxComponent;

class InterviewSelector extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      interviews: [],
      selectedInterview: '',
      interviewerNim: '',
      intervieweeNim: '',
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    contentLoader
      .loadInterviews()
      .then((interviews) => {
        this.setState({
          interviews
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  submitForm() {
    if (this.state.interviewerNim.length !== 8) {
      return;
    }

    if (this.state.intervieweeNim.length !== 8) {
      return;
    }

    const interview = this.state.interviews.find((interview) => interview.id === this.state.selectedInterview);

    if (!interview) {
      return;
    }

    const finalInterview = InterviewSelector.randomizeInterviewSections(interview);

    this.setState({ loading: true });
    this.loadInterviewData(finalInterview)
      .then((interviewSessionData) => {
        this.props.onProceed(interviewSessionData);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  async loadInterviewData(interview: Interview): Promise<InterviewSessionData> {
    const interviewerName = await resolveNim(this.state.interviewerNim);
    const intervieweeName = await resolveNim(this.state.intervieweeNim);
    const finalInterview = await contentLoader.loadInterview(interview);

    return {
      interviewerNim: this.state.interviewerNim,
      intervieweeNim: this.state.intervieweeNim,
      interviewerName,
      intervieweeName,
      interview: finalInterview
    };
  }

  static randomizeInterviewSections(interview: Interview) {
    const sections = interview.sections.map((section) => {
      const pickedContent = section.contents[Math.floor(Math.random() * section.contents.length)]; // Pick random link
      return { ...section, contents: [pickedContent] };
    });

    const newInterview = { ...interview };

    newInterview.sections = sections;
    return newInterview;
  }

  render() {
    return (
      <div>
        <Container maxWidth="xs">
          {this.state.loading && (
            <VerticalCenter centerOnMobile>
              <Box display="flex" alignItems="center" justifyContent="center">
                <PacmanLoader color="#FFC300" />
              </Box>
            </VerticalCenter>
          )}
          {!this.state.loading && (
            <VerticalCenter>
              <Box>
                <Box>
                  <Typography variant="h3" component="span" color="primary" style={{ fontWeight: 900 }}>
                    Mint
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5" component="span" color="primary">
                    by HMIF Tech
                  </Typography>
                </Box>
                <Box>
                  <p>
                    Sebuah alat bantu untuk melaksanakan <i>mock interview</i> dengan teman-teman.
                  </p>
                </Box>
                <Box mt={3}>
                  <b>Apa NIM kamu?</b>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={this.state.interviewerNim}
                    onChange={(event) =>
                      this.setState({
                        interviewerNim: event.target.value as string
                      })
                    }
                  />
                </Box>
                <Box mt={3}>
                  <b>Apa NIM teman kamu yang diwawancara?</b>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={this.state.intervieweeNim}
                    onChange={(event) =>
                      this.setState({
                        intervieweeNim: event.target.value as string
                      })
                    }
                  />
                </Box>
                <Box mt={3}>
                  <b>Tipe interview</b>
                  <Box mt={1}>
                    <Select
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={this.state.selectedInterview}
                      onChange={(event) => {
                        this.setState({
                          selectedInterview: event.target.value as string
                        });
                      }}
                    >
                      {this.state.interviews.map((interview, i) => (
                        <MenuItem value={interview.id} key={i}>
                          {interview.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      width: '100%',
                      textTransform: 'none'
                    }}
                    disableElevation
                    onClick={() => this.submitForm()}
                  >
                    Lanjut
                  </Button>
                </Box>
              </Box>
            </VerticalCenter>
          )}
        </Container>
      </div>
    );
  }
}

export default connect((state: MintState) => ({ state }))(InterviewSelector);
