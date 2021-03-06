import React from 'react';
import Container from '@material-ui/core/Container/Container';
import Box from '@material-ui/core/Box/Box';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import VerticalCenter from './VerticalCenter';
import { InterviewSessionData } from '../redux/types';

interface MyProps {
  onBack: () => void;
  onProceed: () => void;
  interviewSessionData: InterviewSessionData;
}

class InterviewConfirm extends React.Component<MyProps> {
  render() {
    const { interviewSessionData, onBack, onProceed } = this.props;

    return (
      <div>
        <Container maxWidth="xs">
          <VerticalCenter>
            <Box ml={-2}>
              <IconButton aria-label="delete" size="medium" color="primary" onClick={onBack}>
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography variant="h5" color="primary" style={{ fontWeight: 600 }}>
              Sebelum kita mulai
            </Typography>
            <p>
              <b>{interviewSessionData.interviewerName || interviewSessionData.interviewerNim}</b> akan berperan sebagai
              pewawancara yang mewawancarai{' '}
              <b>{interviewSessionData.intervieweeName || interviewSessionData.intervieweeNim}</b> pada wawancara{' '}
              <b>{interviewSessionData.interview.title}</b>.
            </p>
            <p>
              Sebelum memulai wawancara, lihat terlebih dahulu resume/CV milik{' '}
              {interviewSessionData.intervieweeName || interviewSessionData.intervieweeNim}.
            </p>
            <p>
              <i>Mock interview</i> ini terdiri dari beberapa bagian, yang akan ditampilkan satu persatu. Baca dan ikuti
              instruksi yang ditampilkan pada layar. Tolong diingat bahwa instruksi hanya bersifat sebagai pedoman saja,
              kamu diperbolehkan untuk menanyakan atau melakukan hal di luar instruksi tersebut.
            </p>
            <p>Yang terpenting, lakukan peran masing-masing, dan selamat bersenang-senang!</p>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: '100%',
                  textTransform: 'none'
                }}
                disableElevation
                onClick={onProceed}
              >
                Lanjut &nbsp;
                <ArrowForwardIcon fontSize="inherit" />
              </Button>
            </Box>
          </VerticalCenter>
        </Container>
      </div>
    );
  }
}

export default InterviewConfirm;
