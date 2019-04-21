import * as http from 'request';
import * as btoa from 'btoa';
import {BLIZZARD} from '../secrets';
import {APIGatewayEvent, Callback} from 'aws-lambda';
import {Response} from '../utils/response.util';

export class AuthHandler {
  public getAccessToken(event: APIGatewayEvent, callback: Callback): void {
    const body = JSON.parse(event.body),
      region = body.region,
      code = body.code,
      redirectURI = body.redirectURI;

    http.post({
      headers: {
        Authorization: `Basic ${btoa(`${BLIZZARD.CLIENT_ID}:${BLIZZARD.CLIENT_SECRET}`)}`,
        Origin: redirectURI,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: `https://${region}.battle.net/oauth/token`,
      form: {
        code: code,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code',
        scope: 'wow.profile'
      }
    },
      (err, response, body) => {
        Response.send(body, callback);

      });
  }
}
