import {HttpClientUtil} from "@libs/util";
import {BlizzardApiAuthService} from "@libs/services/blizzard-api-auth.service";

export class BlizzardService<T> {
  // https://eu.api.blizzard.com/data/wow/guild/draenor/a-murder-of-crows?namespace=profile-eu&locale=en_GB&access_token=EUMrPGghvNHZG5qqzFn8bTSWq2zhzDQSNl
  baseEndpoint = '';
  http: HttpClientUtil;
  apiAuth: BlizzardApiAuthService;

  constructor() {
    this.http = new HttpClientUtil();
    this.apiAuth = new BlizzardApiAuthService();
  }

  get(path: string) {
    await this.
    return this.http.get<T>(`${this.baseEndpoint}${path}`);
  }
}
