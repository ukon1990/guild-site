import {handlerPath} from '@libs/handler-resolver';

export default {
  getGuild: {
    handler: `${handlerPath(__dirname)}/handler.getGuild`,
    tags: {
      Function: 'guild-site-getGuild',
      Project: 'WAH',
    },
    events: [
      {
        http: {
          method: 'get',
          path: 'guild/{region}/{realm}/{guild}',
          request: {},
        },
      },
    ],
  }
};
