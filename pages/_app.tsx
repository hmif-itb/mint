import React from 'react';
import { Provider } from 'react-redux';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withRedux from 'next-redux-wrapper';
import { AnyAction, Store } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from '../helpers/theme';
import { initStore } from '../redux';
import { MintState } from '../redux/types';

export interface MintAppProps {
  store: Store<MintState, AnyAction> & { __persistor: any };
}

export interface MintAppContext extends AppContext {
  store: Store<MintState, AnyAction> & { __persistor: any };
}

class MintApp extends App<MintAppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Head>
          <title>Mint by HMIF Tech</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,700,900&display=swap" rel="stylesheet" />

          <style jsx global>
            {`
              .font-black {
                font-weight: 900 !important;
              }
            `}
          </style>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <PersistGate loading={null} persistor={store.__persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default withRedux(initStore, { debug: false })(MintApp);
