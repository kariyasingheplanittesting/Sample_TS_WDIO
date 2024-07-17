import { binding, given } from 'cucumber-tsflow';
import AutomationSimApi from 'src/api/AutomationSimApi';
import { ISimPayload } from 'src/model/ISimPayLoad';
import { URI_SIM_ENV } from 'config/APIConfig';
import { DataTable } from '@wdio/cucumber-framework';

@binding()
export default class ApiTestSteps {
  private readonly API_STATUS = 'status/';

  private readonly API_ABORT = `abort/${URI_SIM_ENV}`;

  private readonly API_SAVE = `save/${URI_SIM_ENV}`;

  private readonly API_CLEAR_ALL_SCORING = `clearallscoring/${URI_SIM_ENV}`;

  private readonly API_PREP_REFRESH = `prepandrefresh/${URI_SIM_ENV}`;

  private readonly API_START = `start/${URI_SIM_ENV}`;

  // all valid status are ...'abortComplete', 'clearScoringComplete', 'prepAndRefreshComplete' and 'startComplete'
  @given(/^there is no data available$/, undefined, 800000)
  public async giveThereIsNoDataAvailable() {
    await AutomationSimApi.requestPost(this.API_ABORT);
    // Wait until the abort task is completed
    await AutomationSimApi.getStatus(this.API_STATUS, 'abortComplete');
    await AutomationSimApi.requestPost(this.API_CLEAR_ALL_SCORING);
    // Wait until the clear scoring task is completed
    await AutomationSimApi.getStatus(this.API_STATUS, 'clearScoringComplete');
  }

  @given(/^scheduled matches have started$/, undefined, 800000)
  public async scheduledMatchesHasStarted(table: DataTable) {
    const tableData = table.hashes();
    const simData: ISimPayload = tableData[0] as ISimPayload;

    const prePayloadSIM: ISimPayload = {
      to: Number(simData.to),
      from: Number(simData.from),
      speed: simData.speed,
      pauseTimestamp1: Number(simData.pauseTimestamp1),
      pauseTimestamp2: Number(simData.pauseTimestamp2),
      pauseTimestamp3: Number(simData.pauseTimestamp3),
      fromDraw: simData.fromDraw,
      fromDrawDay: simData.fromDrawDay
    };

    await AutomationSimApi.requestPost(this.API_SAVE, prePayloadSIM);
    await AutomationSimApi.requestPost(this.API_PREP_REFRESH);
    // Wait until the prep and refresh task is completed
    await AutomationSimApi.getStatus(this.API_STATUS, 'prepAndRefreshComplete');
    await AutomationSimApi.requestPost(this.API_START);
    // Wait until the start simulator task is completed
    await AutomationSimApi.getStatus(this.API_STATUS, 'startComplete');
  }
}
