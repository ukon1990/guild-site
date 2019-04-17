# WAH AWS Lambda backend service

## Setup
In order to run this project's backend you will need to create a secrets.ts file in this directory.
The secrets.ts has to look like this, with the variables set:
```.ts
export const BLIZZARD = {
    CLIENT_ID: 'your client id',
    CLIENT_SECRET: 'your client secret',
    ACCESS_TOKEN: ''
};

export const DATABASE_CREDENTIALS = {
    SCHEMA: 'schema name',
    URI: 'db URI',
    USERNAME: 'username',
    PASSWORD: 'password',
};
```

You also need to install serverless by running `npm i -g serverless`. In order to deploy the lambda functions, you need to have aws-cli set up on your development computer.

Once that is done. Do `npm i` to install any dependencies and you're good to go.

### Blizzard API details
Register over at https://develop.battle.net.
Once that is done, you can get the access key by following this url with the correct client id and secret:
`https://eu.battle.net/oauth/token?grant_type=client_credentials&client_id={{bnet_client_id}}&client_secret={{bnet_client_secret}}&scope=wow.profile`

## The database
#### Create table statements
##### Item table
```
CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(100) NOT NULL DEFAULT 'inv_scroll_03',
  `itemLevel` int(11) DEFAULT NULL,
  `itemClass` int(11) DEFAULT '0',
  `itemSubClass` int(11) DEFAULT '0',
  `quality` int(11) NOT NULL DEFAULT '0',
  `itemSpells` mediumtext,
  `itemSource` mediumtext,
  `buyPrice` int(20) DEFAULT '0',
  `sellPrice` int(20) DEFAULT '0',
  `itemBind` int(2) DEFAULT '0',
  `minFactionId` int(20) DEFAULT '0',
  `minReputation` int(20) DEFAULT '0',
  `isDropped` tinyint(4) NOT NULL DEFAULT '0',
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `item_name_locale` (
  `id` int(11) NOT NULL,
  `en_GB` varchar(100) DEFAULT NULL,
  `en_US` varchar(100) DEFAULT NULL,
  `de_DE` varchar(100) DEFAULT NULL,
  `es_ES` varchar(100) DEFAULT NULL,
  `es_MX` varchar(100) DEFAULT NULL,
  `fr_FR` varchar(100) DEFAULT NULL,
  `it_IT` varchar(100) DEFAULT NULL,
  `pl_PL` varchar(100) DEFAULT NULL,
  `pt_PT` varchar(100) DEFAULT NULL,
  `pt_BR` varchar(100) DEFAULT NULL,
  `ru_RU` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_items_locale_items_idx` (`id`),
  CONSTRAINT `fk_items_locale_items` FOREIGN KEY (`id`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

##### Pet table
```
CREATE TABLE `pets` (
  `speciesId` int(11) NOT NULL,
  `petTypeId` int(11) DEFAULT NULL,
  `creatureId` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`speciesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `pet_name_locale` (
  `speciesId` int(11) NOT NULL,
  `en_GB` varchar(100) DEFAULT NULL,
  `en_US` varchar(100) DEFAULT NULL,
  `de_DE` varchar(100) DEFAULT NULL,
  `es_ES` varchar(100) DEFAULT NULL,
  `es_MX` varchar(100) DEFAULT NULL,
  `fr_FR` varchar(100) DEFAULT NULL,
  `it_IT` varchar(100) DEFAULT NULL,
  `pl_PL` varchar(100) DEFAULT NULL,
  `pt_PT` varchar(100) DEFAULT NULL,
  `pt_BR` varchar(100) DEFAULT NULL,
  `ru_RU` varchar(100) DEFAULT NULL,
  UNIQUE KEY `speciesId_UNIQUE` (`speciesId`),
  KEY `fk_pet_name_locale_pets1_idx` (`speciesId`),
  CONSTRAINT `fk_pet_name_locale_pets1` FOREIGN KEY (`speciesId`) REFERENCES `pets` (`speciesId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

##### Recipe table
```
CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `json` mediumtext NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `recipe_name_locale` (
  `id` int(11) NOT NULL,
  `en_GB` varchar(100) DEFAULT NULL,
  `en_US` varchar(100) DEFAULT NULL,
  `de_DE` varchar(100) DEFAULT NULL,
  `es_ES` varchar(100) DEFAULT NULL,
  `es_MX` varchar(100) DEFAULT NULL,
  `fr_FR` varchar(100) DEFAULT NULL,
  `it_IT` varchar(100) DEFAULT NULL,
  `pl_PL` varchar(100) DEFAULT NULL,
  `pt_PT` varchar(100) DEFAULT NULL,
  `pt_BR` varchar(100) DEFAULT NULL,
  `ru_RU` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_recipe_name_locale_recipes1_idx` (`id`),
  CONSTRAINT `fk_recipe_name_locale_recipes1` FOREIGN KEY (`id`) REFERENCES `recipes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

## Running the server
You serve the server for development by using the following command:
```
serverless offline start
```
This command will reload the server every time you save changes to one of it's files.

## Deploying to AWS API Gateway and Lambda
To deploy to multiple regions, the easiest way is to just update the deploy.sh script with the regions, you wish to deploy to. And do `sh deploy.sh` in the terminal.
Atlernatively, if you use windows, run `serverless deploy -r eu-west-2` manually or create your own script.

This will then upload everything to AWS, and set up the API Gateway etc and output the endpoint url's.