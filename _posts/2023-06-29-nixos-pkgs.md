---

layout: post
title: "nixos-pkgs"
date: 2023-06-29

---

# Packages

## Gnome

### Extensions

- Vitals
- Dash to Dock

> <https://extensions.gnome.org>

## Sunshine

## ReDroid

## PCXS2

## Wayland

> <https://arewewaylandyet.com/>

### Sway


```conf
{
  programs.sway = {
    enable = true;
  };

  services.greetd = {
    enable = true;
    settings = rec {
      command = "${pkgs.sway}/bin/sway";
      user = "user";
    };
    default_session = initial_session;
  };
}
```

- `$mod + Enter` - Terminal
- `$mod + D` - dmenu

- `$mod + W` - Tabbed Layout
- `$mod + E` - Default Layout
- `$mod + S` - Stacked Layout
- `$mod + F` - FullScreen
- `$mod + H` - Split Horizontal
- `$mod + V` - Split Vertical

- `$mod + H/J/K/L` - Left/Down/Up/Right

- `$mod + R` - Resize
- `$mod + A` - Focus Parent
- `$mod + Space` - Focus Floating/Tiling

---

- `$mod + Shift + Q` - Kill Window
- `$mod + Shift + H/J/K/L` - Move Left/Down/Up/Right
- `$mod + Shift + Space` - Toggle Floating/Tiling

- `$mod + Shift + C` - Reload Config

---

- `$mod + Num` - Switch Workspace
- `$mod + Shift + Num` - Move to workspace


> <https://i3wm.org/docs/refcard.html>

#### Config

```sh
# default config
/etc/sway/config
# user config
~/.config/sway/config
```

#### Terminal

- foot - Default

#### Waybar


> <https://i3wm.org/>

### WayDroid

```sh
waydroid prop set persist.waydroid.height 1036
waydroid prop set persist.waydroid.width 640
adb shell wm size 640x1036
waydroid session stop
```

# Browser

## Firefox

- Addons
  + Tree Style Tab *(TST)*
    * `useChrome.css`
  + Vimium

> <https://github.com/MrOtherGuy/firefox-csshacks>

## Chrome

- `chrome://flags` - `Preferred Ozone platform` - `Auto`


# Input Method

## Fcitx

`fcitx5-configtool`

```js
i18n.inputMethod = {
  enabled = "fcitx5";
  fcitx5.addons = with pkgs; [
    fcitx5-chinses-addons // 拼音 双拼 五笔
    fcitx5-rime // alternative
  ];
};
```

## IBus

## Rime

# Theme

## catppuccin

> <https://github.com/catppuccin/catppuccin>

## Icons

icon path: `<home-path>/share/icons`

## Cursors

> <https://www.gnome-look.org/browse?cat=107>

# Cloudflare

## WARP

```sh
sudo warp-svc

warp-cli register
warp-cli connect
warp-cli status
```

# WiFi

- nmtui
- nmtui-connect
- nmcli
  + nmcli dev wifi list
# AppImage

```sh
nix-env -iA nixos.appimage-run

appimage-run App.AppImage
```

# KVM


# Tips

## suspend
```sh
# suspend
sudo systemctl suspend
```

## Gaming
```conf
# game
hardware.opengl = {
    enable = true;
    driSupport32Bit = true;
}
```

## List fonts
```sh
# list fonts
fc-list
```

## Sensors
```sh
# sensors
nix-shell -p lm_sensors
sensors
```
