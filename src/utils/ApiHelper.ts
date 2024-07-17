import axios, { AxiosBasicCredentials } from 'axios';
import { setTimeout } from 'timers/promises';
import { BASE_URI_SIM } from 'config/APIConfig';

class ApiHelper {
  private headers = {};

  private authDetails: AxiosBasicCredentials = {
    username: '',
    password: ''
  };

  private body = {};

  private response = {};

  public async setHeaders(contentType: string) {
    this.headers = {
      'Content-Type': contentType
    };
  }

  public async setBasicAuthentication() {
    this.authDetails = {
      username: process.env.API_USER_NAME,
      password: process.env.API_PASSWORD
    };
  }

  public async setBody<Type>(payLoad: Type) {
    this.body = payLoad;
  }

  public async get(url: string) {
    try {
      const response = await axios
        .get(`${BASE_URI_SIM}${url}`, {
          headers: this.headers,
          auth: this.authDetails
        })
        .then((res) => res.data);

      return response;
    } catch (err) {
      return err;
    }
  }

  public async post(url: string) {
    try {
      const response = await axios
        .post(`${BASE_URI_SIM}${url}`, this.body, {
          headers: this.headers,
          auth: this.authDetails
        })
        .then((res) => res.data);

      return response;
    } catch (err) {
      return err;
    }
  }

  public async getResponse() {
    return this.response;
  }

  public async pollUntil(
    requestCallBack: () => Promise<any>,
    conditionCallBack: (res: any) => boolean
  ) {
    const responseData = await requestCallBack();
    const conditionResponse = conditionCallBack(responseData);
    if (!conditionResponse) {
      await setTimeout(5000);
      await this.pollUntil(requestCallBack, conditionCallBack);
    } else {
      this.response = responseData;
    }
  }
}

export default new ApiHelper();
