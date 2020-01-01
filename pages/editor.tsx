import React from 'react';
import InterviewerNote from "../components/InterviewerNote";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Grid from "@material-ui/core/Grid/Grid";

interface MyState {
    notesContent: string;
    notesOpen: boolean;
}

export default class EditorPage extends React.Component<any, MyState> {
    state = {
        notesContent: '',
        notesOpen: true
    };

    render() {
        return (
            <>
                { this.state.notesOpen && (
                    <Hidden smDown>
                        <Grid item md={3} style={{
                            backgroundColor: '#fff8e1',
                            position: 'fixed',
                            height: '100vh',
                            minWidth: `${(3 / 12) * 100}%`,
                            right: 0,
                            borderLeft: '1px solid #00000011'
                        }}>
                            <InterviewerNote
                                value={this.state.notesContent}
                                onChange={(notesContent: string) => this.setState({ notesContent })}
                            />
                        </Grid>
                    </Hidden>
                ) }
            </>
        );
    }
}
