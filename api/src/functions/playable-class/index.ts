import {handlerPath} from '@libs/handler-resolver';

export default {
  getPlayableClass: {
    handler: `${handlerPath(__dirname)}/handler.getPlayableClass`,
    events: [
      {
        http: {
          method: 'get',
          path: 'playable-classes/{region}',
          request: {},
        },
      },
    ],
  }
};
