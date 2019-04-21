import {APIGatewayEvent, Callback} from 'aws-lambda';

const zlib = require('zlib');

export class Response {
  public static async send(body: any, callback: Callback) {
    const gzip = zlib.createGzip();
    zlib.gzip(this.getStringValue(body), (error, buffer) => {
      console.log('get', error, buffer);
      callback(null, {
        statusCode: 200,
        body: buffer.toString('base64'),
        isBase64Encoded: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          'Character-Encoding': 'UTF8'
        }
      });
    });
  }

  private static getStringValue(body: any) {
    return typeof body === 'string' ? body : JSON.stringify(body);
  }

  public static error(callback: Callback, error?, event?: APIGatewayEvent): any {
    if (error) {
      console.error(error);
    }
    return Response.send({
      statusCode: 500,
      error: error ? error : 'Malormed request',
      event: event && event.requestContext.stage === 'dev' ? event : undefined
    }, callback);
  }
}

/*
curl -X POST https://eu.battle.net/oauth/token -u a71249eda6654bd9862a981ae3f6e649:EFK8lDLVcVqBE3eFzrcJSJJ4jLj7Stfk -d redirect_uri=https://guild.jonaskf.net -d scope=wow.profile -d grant_type=authorization_code -d code=EUUPZKEMKHUTCJIGPCHF1VIHSDUDCIF6XR
*/
