import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import {Response} from '../utils/response.util';
import {BLIZZARD} from '../secrets';
import {AuthHandler} from '../handlers/auth.handler';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const region = 'eu';
  if (event.httpMethod === 'POST') {
    new AuthHandler()
      .getAccessToken(event, callback);
  } else {
    Response.error(callback, {message: 'Unsupported method'});
  }
};
