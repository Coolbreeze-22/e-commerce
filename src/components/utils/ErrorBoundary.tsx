import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("❌ Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 style={{ textAlign: "center", marginTop: "400px" }}>
          Something went wrong.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
