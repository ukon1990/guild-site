import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import {Response} from '../utils/response.util';
import {BLIZZARD} from '../secrets';
import {AuthHandler} from '../handlers/auth.handler';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const region = 'eu';
  const baseUrl = `https://${
    region
    }.battle.net/oauth/authorize?response_type=code&client_id=${
    BLIZZARD.CLIENT_ID
    }&scope=wow.profile%20sc2.profile&redirect_uri=${
    'http://localhost:4200'
    }`;
  if (event.httpMethod === 'POST') {
    new AuthHandler()
      .getAccessToken(event, callback);
  } else {
    Response.error(callback, {message: 'Unsupported method'});
  }
};
