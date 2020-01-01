import React from 'react';
import { Editor, createEditorState } from 'medium-draft';
import { convertToRaw } from 'draft-js';
import 'medium-draft/lib/index.css';
import { stateToHTML } from 'draft-js-export-html';

import mediumDraftImporter from 'medium-draft/lib/importer';

import NoSSR from 'react-no-ssr';
import Box from "@material-ui/core/Box/Box";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from "@material-ui/icons/Close";

export default class InterviewerNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(convertToRaw(mediumDraftImporter(this.props.value)))
    };

    this.refsEditor = React.createRef();
  }

  onChange(editorState) {
    this.setState({ editorState });
    const content = stateToHTML(editorState.getCurrentContent());

    this.props.onChange(InterviewerNote.isContentActuallyEmpty(content) ? '' : content);
  }

  static isContentActuallyEmpty(content) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    return !tmp.innerText;
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { editorState } = this.state;
    return (
        <>
          <style>
            {`
            .md-RichEditor-root {
              background: none !important;
              padding: 0;
            }
            .DraftEditor-root {
              padding: 0 16px 0 16px;
              max-height: calc(100vh - 48px);
              overflow-y: auto;
              border-top: 1px solid #00000011;
            }
            `}
          </style>
          <Toolbar variant="dense" disableElevation style={{paddingLeft: '16px', paddingRight: '16px'}}>
            <Typography variant="h6" color="inherit" style={{fontWeight: 'bold'}}>
              Interviewer's Note
            </Typography>
            <Box style={{flexGrow: 1}} />
            <Box mr={-2}>
              <IconButton onClick={() => this.handleClose()}>
                <CloseIcon/>
              </IconButton>
            </Box>
          </Toolbar>
          <NoSSR>
            <Editor
                style={{padding: '8px', backgroundColor: 'transparent'}}
                ref={this.refsEditor}
                editorState={editorState}
                onChange={(editorState) => this.onChange(editorState)}
                sideButtons={[]}
            />
          </NoSSR>
        </>
    );
  }
}
