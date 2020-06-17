import React from 'react';
import { translate } from '@gqlapp/i18n-client-react';
import GeolocationView from '../components/GeolocationView';

class Geolocation extends React.Component {
  state = {
    currentLocation: {
      latitude: 0,
      longitude: 0
    }
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        console.log(coords);
        this.setState({
          currentLocation: {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        });
      });
    }
  }

  render() {
    return <GeolocationView currentLocation={this.state.currentLocation} {...this.props} />;
  }
}

export default translate('geolocation')(Geolocation);
