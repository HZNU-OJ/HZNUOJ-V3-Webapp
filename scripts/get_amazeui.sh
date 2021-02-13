#! /bin/bash

set -x

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)

echo $SHELL_FOLDER

cd $SHELL_FOLDER/../public

[ -d amazeui ] && rm -rf amazeui
[ -d jquery ] && rm -rf jquery

git clone -b release https://github.com/Dup4/amazeui.git --depth=1
rm -rf amazeui/.git

mkdir jquery

cd jquery
wget https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
wget https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.map