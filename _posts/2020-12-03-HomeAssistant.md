---

layout: post
title: "HomeAssistant"
date: 2020-12-03
tags: [android, python]

---

# install

```bash
apk add libjpeg zlib libwebp python3-dev jpeg-dev ffmpeg
pip install wheel pillow sqlalchemy aiohttp_cors asn1crypto
pip install homeassistant
apk add --no-cache py-cryptography

rm -rf .pyenv/versions/3.8.6/lib/python3.8/site-packages/cryptography
ln -s /usr/lib/python3.7/site-packages/cryptography .pyenv/versions/3.8.6/lib/python3.8/site-packages
```

```
hass --daemon
```

```
localhost:8123
```

```
hass --script check_config
```


# Integrations

## Homekit

## Samsung Smart TV

```yaml
wake_on_lan:

samsungtv:
  - host: 192.168.0.103
    turn_on_action:
      - service: wake_on_lan.send_magic_packet
        data:
          mac: D9:4D:C9:8A:FC:06
```

## Xbox


# Helpers

# Icon
```
hass:icon-name
```

> https://cdn.materialdesignicons.com/5.3.45/