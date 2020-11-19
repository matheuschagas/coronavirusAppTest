import {GEOLOCATION_API, GEOLOCATION_API_KEY} from '@env';
import axios from 'axios';
export class GeolocationService {
  static async getAddress({lat, lon}) {
    let url = `${GEOLOCATION_API}/reverse?access_key=${GEOLOCATION_API_KEY}&query=${
      lat + ',' + lon
    }`;
    let response = await axios.get(url);
    return response.data.data[0];
  }

  static async getCoordinates(address) {
    let url = `${GEOLOCATION_API}/forward?access_key=${GEOLOCATION_API_KEY}&query=${address}`;
    let response = await axios.get(url);
    console.log(response.data.data[0]);
    return response.data.data[0];
  }
}
