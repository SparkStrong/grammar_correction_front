import React from 'react';
import { connect } from 'react-redux';

class EnsureLoggedInContainer extends React.Component {
    componentDidMount() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            location.href = '/login';
        }
    }

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return null;
        }

        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user,
    }
}


export default connect(mapStateToProps)(EnsureLoggedInContainer);