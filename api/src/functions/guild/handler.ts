import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import {GuildService} from "@functions/guild/guild.service";

export const getGuild = middyfy(async ({pathParameters}): Promise<ValidatedEventAPIGatewayProxyEvent<any>> => {
  const {
    region,
    realm,
    guild
  } = pathParameters;
  let result;
  await new GuildService(region).getGuild(realm, guild)
    .then(res => result = formatJSONResponse(res))
    .catch(err => result = formatJSONResponse(err))
  return result;
});
