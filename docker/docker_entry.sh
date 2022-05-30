#! /bin/sh

set -e -x

UI_PATH="/app/ui/dist"
EXPORT_PATH="/app/export"
EXPORT_UI_PATH="${EXPORT_PATH}/ui"

if [ -z "${PUBLIC_PATH}" ]; then
  PUBLIC_PATH=""
fi

sed -i "s|__PUBLIC_PATH__|${PUBLIC_PATH}|g" /app/ui/dist/*.html
sed -i "s|__PUBLIC_PATH__|${PUBLIC_PATH}|g" /app/ui/dist/*.js

if [ -n "${__API_ENDPOINT__}" ]; then
  sed -i "s|__API_ENDPOINT__|\"${__API_ENDPOINT__}\"|g" /app/ui/dist/*.html
fi

if [ -n "${DEFAULT_TITLE}" ]; then
  sed -i "s|__DEFAULT_TITLE__|\"${DEFAULT_TITLE}\"|g" /app/ui/dist/*.html
fi

if [ -n "${BAIDU_ANALYTICS_ID}" ]; then
  sed -i "s|__BAIDU_ANALYTICS_ID__|\"${BAIDU_ANALYTICS_ID}\"|g" /app/ui/dist/*.html
fi

if [ -n "${GOOGLE_ANALYTICS_ID}" ]; then
  sed -i "s|__GOOGLE_ANALYTICS_ID__|\"${GOOGLE_ANALYTICS_ID}\"|g" /app/ui/dist/*.html
fi

if [ -d "${EXPORT_UI_PATH}" ]; then
  cp -a "${UI_PATH}"/* "${EXPORT_UI_PATH}"/
fi

if [ X"${1}" = X"primary" ]; then
  cd /app/ui
  exec npm run start
else
  exec "${@}"
fi
