import React, { ErrorInfo } from "react";

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: ErrorInfo | undefined;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  readonly state: IErrorBoundaryState = { error: undefined, errorInfo: undefined };

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
        process.env.NODE_ENV === "development" ? (
          <pre>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </pre>
        ) : undefined;
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;