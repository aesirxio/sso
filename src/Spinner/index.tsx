import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

interface SpinnerProps {
  className?: string;
  size?: string;
}

interface SpinnerState {
  isClient: boolean;
}

class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  constructor(props: SpinnerProps) {
    super(props);
    this.state = {
      isClient: false,
    };
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    const { isClient } = this.state;

    return (
      isClient && ( // Check if the code is running on the client
        <div
          className={`${this.props.className} d-flex justify-content-center align-items-center position-fixed top-50 start-50 translate-middle w-100 h-100`}
          style={{ backgroundColor: 'rgba(255, 255, 255, 1)', zIndex: 1000 }}
        >
          <MoonLoader color={`#1ab394`} size={`${this.props.size ?? '60px'}`} />
        </div>
      )
    );
  }
}

export default Spinner;
