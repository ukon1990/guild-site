import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {CharacterService} from "@functions/character/character.service";

export const getCharacter = middyfy(async ({pathParameters}): Promise<ValidatedEventAPIGatewayProxyEvent<any>> => {
  const {
    region,
    realm,
    character
  } = pathParameters;
  let result;
  await new CharacterService(region).getCharacter(realm, character)
    .then(res => result = formatJSONResponse(res))
    .catch(err => result = formatJSONResponse(err))
  return result;
});
