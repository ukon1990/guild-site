import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import {Response} from '../utils/response.util';
import {AuthHandler} from '../handlers/auth.handler';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (event.httpMethod === 'POST') {
    new AuthHandler()
      .getAccessToken(event, callback);
  } else {
    Response.error(callback, {message: 'Unsupported method'});
  }
};

exports.checkTokenHandler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (event.httpMethod === 'POST') {
    new AuthHandler()
      .checkToken(event, callback);
  } else {
    Response.error(callback, {message: 'Unsupported method'});
  }
};
