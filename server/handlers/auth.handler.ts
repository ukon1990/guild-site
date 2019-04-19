import * as http from 'request';
import {BLIZZARD} from '../secrets';
import {APIGatewayEvent, Callback} from 'aws-lambda';
import {Response} from '../utils/response.util';

export class AuthHandler {
  public getAccessToken(event: APIGatewayEvent, callback: Callback): void {
    const body = JSON.parse(event.body),
      region = body.region,
      code = body.code,
      redirectURI = body.redirectURI;

    http.get(`https://${
        region
        }.battle.net/oauth/token?grant_type=authorization_code&client_id=${
        BLIZZARD.CLIENT_ID
        }&client_secret=${
        BLIZZARD.CLIENT_SECRET
        }&code=${
        code
        }&redirect_uri=${
        redirectURI
        }`,
      (err, response, body) => {
        Response.send(JSON.parse(body), callback);

      });
  }
}
