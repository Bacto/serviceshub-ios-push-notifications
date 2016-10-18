'use strict';

import suspend from 'suspend';
import joi from 'joi';
import apn from 'apn';

module.exports = {
  config: {
    validate: {
      payload: {
        key: joi.string().required(),
        keyId: joi.string().alphanum().required(),
        teamId: joi.string().alphanum().required(),
        sandbox: joi.boolean().required(),
        deviceToken: joi.string().alphanum().required(),
        topic: joi.string().required(),
        message: joi.string(),
        badge: joi.number(),
        sound: joi.string(),
        payload: joi.object(),
        expiry: joi.number(),
        async: joi.boolean()
      }
    }
  },

  handler: suspend(function*(request, reply) {
    const { key, keyId, teamId, sandbox, deviceToken, message, badge, sound, payload, topic, expiry, async } = request.payload;

    if (async) {
      reply({ result: 'ok' });
    }

    const apnProvider = new apn.Provider({
      token: {
        key: new Buffer('-----BEGIN PRIVATE KEY-----\n' + key + '\n-----END PRIVATE KEY-----'),
        keyId,
        teamId
      },
      production: !sandbox
    });

    const notification = new apn.Notification();

    notification.topic = topic;
    notification.expiry = Math.floor(Date.now() / 1000) + (expiry || 60 * 60);
    notification.badge = badge;
    notification.sound = sound || '';
    notification.alert = message || '';
    notification.payload = payload || {};

    const result = yield apnProvider.send(notification, deviceToken);

    if (!async) {
      reply(result);
    }
  })
};
