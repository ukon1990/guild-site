import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import {CharacterHandler} from '../handlers/character.handler';
import {Response} from '../utils/response.util';
import {BLIZZARD} from '../secrets';

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const region = 'eu';
  const baseUrl = `https://${
    region
    }.battle.net/oauth/authorize?response_type=code&client_id=${
    BLIZZARD.CLIENT_ID
  }&scope=wow.profile%20sc2.profile&redirect_uri=${
    'http://localhost:4200'
    }`;
  switch (event.httpMethod) {
    case 'POST':
      break;
    default:
      break;
  }
};
