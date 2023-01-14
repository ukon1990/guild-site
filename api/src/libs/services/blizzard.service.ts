import {HttpClientUtil} from "@libs/util";
import {BlizzardApiAuthService} from "@libs/services/blizzard-api-auth.service";

export class BlizzardService<T> {
  // https://eu.api.blizzard.com/data/wow/guild/draenor/a-murder-of-crows?namespace=profile-eu&locale=en_GB&access_token=EUMrPGghvNHZG5qqzFn8bTSWq2zhzDQSNl
  getBaseEndpoint = () => `https://${this.region}.api.blizzard.com/data/wow`;
  http: HttpClientUtil;

  constructor(
    private region: string,
    private basePath: string,
  ) {
    this.http = new HttpClientUtil();
  }

  protected async get(path: string) {
    await BlizzardApiAuthService.getToken();
    const url = `${this.getBaseEndpoint()}/${this.basePath}/${
      path}?namespace=profile-eu&locale=en_GB&access_token=${BlizzardApiAuthService.token}`;
    return this.http.get<T>(url);
  }
}
