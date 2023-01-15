import {handlerPath} from '@libs/handler-resolver';

export default {
  getCharacter: {
    handler: `${handlerPath(__dirname)}/handler.getCharacter`,
    events: [
      {
        http: {
          method: 'get',
          path: 'character/{region}/{realm}/{character}',
          request: {},
        },
      },
    ],
  }
}
;
