#! bin/sh

apt-get update
apt-get upgrade

apt-get -y install wget
apt-get -y install vim
apt-get -y install curl
apt-get -y install git

# 사내 proxy server ssl 이슈 제거
# https://pinedance.github.io/blog/2017/11/02/how-to-bypass-SSL
git config --global http.sslVerify false
echo insecure >> ~/.curlrc
echo check-certificate=off >> ~/.wgetrc
#conda config --set ssl_verify false
