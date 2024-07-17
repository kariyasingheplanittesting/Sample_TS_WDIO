/* eslint-disable no-console */
import { ISimPayload } from 'src/model/ISimPayLoad';
import ApiHelper from 'src/utils/ApiHelper';
import { URI_SIM_ENV } from 'config/APIConfig';

class AutomationSimApi {
  private readonly contentType = 'application/json';

  private statusConditionStartComplete(response: any) {
    const dataFilter = response.filter((element) => element.env === URI_SIM_ENV);
    const responseState = dataFilter[0].state.state;
    const state = responseState.trim().replace(/\s/g, '').toLowerCase();
    const msgResponse = dataFilter[0].state.msg;
    const msg = msgResponse.trim().replace(/\s/g, '').toLowerCase();
    console.log(`.....status.before.complete........${msg} ............ ${state}`);
    return !!(msg === 'eventsqueued,starting' && state === 'ready');
  }

  private statusConditionPrepareComplete(response: any) {
    const dataFilter = response.filter((element) => element.env === URI_SIM_ENV);
    const responseState = dataFilter[0].state.state;
    const state = responseState.trim().replace(/\s/g, '').toLowerCase();
    const msgResponse = dataFilter[0].state.msg;
    const msg = msgResponse.trim().replace(/\s/g, '').toLowerCase();
    console.log(`.....status.before.complete........${msg} ............ ${state}`);
    return !!(msg === 'preparecomplete' && state === 'ready');
  }

  private statusConditionAbortComplete(response: any) {
    const dataFilter = response.filter((element) => element.env === URI_SIM_ENV);
    const responseState = dataFilter[0].state.state;
    const state = responseState.trim().replace(/\s/g, '').toLowerCase();
    const msgResponse = dataFilter[0].state.msg;
    const msg = msgResponse.trim().replace(/\s/g, '').toLowerCase();
    console.log(`.....status.before.complete........${msg} ............ ${state}`);
    return !!(msgResponse === '' && state === 'empty');
  }

  private statusConditionClearingAllScoringComplete(response: any) {
    const dataFilter = response.filter((element) => element.env === URI_SIM_ENV);
    const responseState = dataFilter[0].state.state;
    const state = responseState.trim().replace(/\s/g, '').toLowerCase();
    const msgResponse = dataFilter[0].state.msg;
    const msg = msgResponse.trim().replace(/\s/g, '').toLowerCase();
    console.log(`.....status.before.complete........${msg} ............ ${state}`);
    return !!(msg === 'clearingallscoringcompleted' && state === 'ready');
  }

  public async getStatus(url: string, simOperation: string) {
    await ApiHelper.setHeaders(this.contentType);
    await ApiHelper.setBasicAuthentication();

    try {
      if (simOperation === 'abortComplete') {
        await ApiHelper.pollUntil(() => ApiHelper.get(url), this.statusConditionAbortComplete);
      }
      if (simOperation === 'clearScoringComplete') {
        await ApiHelper.pollUntil(
          () => ApiHelper.get(url),
          this.statusConditionClearingAllScoringComplete
        );
      }
      if (simOperation === 'prepAndRefreshComplete') {
        await ApiHelper.pollUntil(() => ApiHelper.get(url), this.statusConditionPrepareComplete);
      }
      if (simOperation === 'startComplete') {
        await ApiHelper.pollUntil(() => ApiHelper.get(url), this.statusConditionStartComplete);
      }

      return await ApiHelper.getResponse();
    } catch (err) {
      return err;
    }
  }

  public async requestPost(url: string, payLoad?: ISimPayload) {
    await ApiHelper.setHeaders(this.contentType);
    await ApiHelper.setBasicAuthentication();
    await ApiHelper.setBody<ISimPayload>(payLoad);
    try {
      const response = await ApiHelper.post(url);
      return response;
    } catch (err) {
      return err;
    }
  }
}
export default new AutomationSimApi();
