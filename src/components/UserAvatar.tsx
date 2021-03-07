import React from "react";

import style from "./UserAvatar.module.less";

interface UserAvatarProps {
  userAvatar: ApiTypes.UserAvatarDto;
  alt?: string;
  placeholder?: boolean;
  imageSize?: number;
  size?: string;
  onError?: () => void;
}

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

function getAvatarUrl(avatar: ApiTypes.UserAvatarDto, size: number) {
  switch (avatar.type) {
    case "gravatar":
      return `${ensureTrailingSlash("https://s.gravatar.com")}avatar/${
        avatar.key
      }?size=${size}&default=404`;
    case "qq":
      let sizeParam: number;
      if (size <= 40) sizeParam = 1;
      else if (size <= 100) sizeParam = 3;
      else if (size <= 140) sizeParam = 4;
      else sizeParam = 5;
      return `https://q1.qlogo.cn/g?b=qq&nk=${avatar.key}&s=${sizeParam}`;
    case "github":
      return `https://github.com/${avatar.key}.png?size=${size}`;
  }
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const imageSize =
    props.imageSize ||
    {
      mini: 35,
      tiny: 80,
      small: 150,
      medium: 300,
      large: 450,
      big: 600,
      huge: 800,
      massive: 960,
    }[props.size] ||
    80;

  const url = getAvatarUrl(
    props.userAvatar,
    Math.ceil(window.devicePixelRatio * imageSize),
  );

  return (
    <img
      className={[
        style.avatar,
        imageSize < 220 ? style.small : style.large,
      ].join(" ")}
      src={url}
      alt={props.alt}
    />
  );
};

export default UserAvatar;
