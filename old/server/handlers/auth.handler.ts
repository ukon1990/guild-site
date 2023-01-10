import * as http from 'request';
import * as btoa from 'btoa';
import {BLIZZARD} from '../secrets';
import {APIGatewayEvent, Callback} from 'aws-lambda';
import {Response} from '../utils/response.util';

export class AuthHandler {
  getAccessToken(event: APIGatewayEvent, callback: Callback): void {
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

  checkToken(event: APIGatewayEvent, callback: Callback): void {
    const body = JSON.parse(event.body),
      region = body.region,
      token = body.token;
    AuthHandler.verifyToken(region, token)
      .then(response =>
        Response.send(response, callback))
      .catch(error =>
        Response.error(callback, error));

  }

  static verifyToken(region: string, token: string): Promise<any> {
    return new Promise<any>(((resolve, reject) =>
      http.get(
        `https://${region}.battle.net/oauth/check_token?token=${token}`, (error, response, body) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(body);
        })));
  }
}
