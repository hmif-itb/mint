import React from 'react';
import { MintReduxComponent, MintState } from '../redux/types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReCAPTCHA from 'react-google-recaptcha';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { createStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import Box from '@material-ui/core/Box/Box';
import { eventLogger } from '../helpers/eventlogger';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClose?: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

interface MyState {
  recaptchaValue?: string;
  email: string;
  sendingEmail: boolean;
}

interface OwnProps {
  onClose: () => void;
  onSent: () => void;
  open: boolean;
}

type MyProps = MintReduxComponent & OwnProps;

class SendMailDialog extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      email: '',
      sendingEmail: false
    };
  }

  render() {
    return (
      <Dialog onClose={this.state.sendingEmail ? undefined : () => this.props.onClose()} open={this.props.open}>
        <DialogTitle onClose={this.state.sendingEmail ? undefined : () => this.props.onClose()}>
          Kirim Ringkasan via Email
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Kirimkan ringkasan <i>mock interview</i> dan catatan interviewer ke interviewee via email!
          </Typography>
          <Box mt={2}>
            <TextField
              label="Alamat Email"
              variant="outlined"
              fullWidth
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              error={!this.emailValid && !!this.state.email}
              helperText={!this.emailValid && !!this.state.email ? 'Alamat email salah' : ''}
            />
          </Box>
          <Box mt={2}>
            <ReCAPTCHA
              sitekey={process.env.recaptchaSiteKey || ''}
              onChange={(value) => this.setState({ recaptchaValue: value || '' })}
            />
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.recaptchaValue || !this.emailValid || !!this.state.sendingEmail}
              style={{
                width: '100%',
                textTransform: 'none'
              }}
              onClick={() => this.attemptSendEmail()}
            >
              Kirim Email
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  get emailValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  attemptSendEmail() {
    const { sessionId } = this.props.state.session;
    const { notesContent } = this.props.state.interviewPage;

    if (!!sessionId && !!this.state.recaptchaValue) {
      this.setState({ sendingEmail: true });
      eventLogger
        .sendMail(sessionId, this.state.email, notesContent, this.state.recaptchaValue || '')
        .then(() => {
          this.props.onSent();
        })
        .catch((e) => {
          console.error('Error sending email', e);
          // TODO show error
        })
        .finally(() => {
          this.setState({ sendingEmail: false });
        });
    }
  }
}

export default connect((state: MintState) => ({ state }))(SendMailDialog);
