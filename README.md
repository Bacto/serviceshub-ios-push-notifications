# servicesHub - Send notifications to iOS apps

This is a micro service to send iOS notifications

## Get key, keyId and teamId

1. Go to https://developer.apple.com/account/ios/certificate/key

1. Create one an "APNs Auth Key" (Apple Push Notification Authentication Key).

1. Get your "keyId".

1. Download the key (.p8) and open it with textEdit.

1. Copy the content of the file **without** "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----".

    This is your "key".

1. Go to https://developer.apple.com/account/#/membership and get your "teamId"



## Send a notification

```
curl -i -X POST \
  -d "key=..." \
  -d "keyId=..." \
  -d "teamId=..." \
  -d "deviceToken=..." \
  -d "topic=..." \
  -d "message=..." \
  -d "badge=..." \
  -d "sound=..." \
  -d "payload=..." \
  -d "expiry=..." \
  -d "sandbox=[true|false]" \
  -d "async=[true|false]" \
  "http://serviceshub1.bacto.net:9094/send"
```

deviceToken: the iPhone token.

topic: your app "name", ie. com.example.app

message: the push message

badge: badge count number

sandbox: true if you're in development mode

sound: the sound of the notification

payload: an object your app will receive

expiry: time of expirations of the notification (in seconds)
