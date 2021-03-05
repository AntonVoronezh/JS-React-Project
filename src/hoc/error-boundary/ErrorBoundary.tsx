// @ts-ignore
import React, { Component, Fragment } from "react";
import * as Sentry from "@sentry/browser";

import { ErrorIndicator } from "../../components/elements";

interface IState {
  hasError: boolean;
  eventId: null | string | number;
}

interface IProps {
  cgildren: any;
}

class ErrorBoundary extends Component<IProps, IState> {
  state = {
    hasError: false,
    eventId: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <ErrorIndicator />
          <button
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report feedback
          </button>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
