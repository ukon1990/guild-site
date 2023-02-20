import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {PlayableClassService} from "@functions/playable-class/playable-class.service";

export const getPlayableClass = middyfy(async ({pathParameters}): Promise<ValidatedEventAPIGatewayProxyEvent<any>> => {
  const {
    region,
  } = pathParameters;
  let result;
  await new PlayableClassService(region).getClasses()
    .then(res => result = formatJSONResponse(res))
    .catch(err => result = formatJSONResponse(err))
  return result;
});
