#!/usr/bin/env bash

# find filename on https://go.dev/dl/
GO_FILE_NAME="go1.19.3.darwin-arm64.tar.gz"

# usage:
# chmod u+x install_go.sh
# sudo ./install_go.sh

mkdir /tmp/downloads
sudo wget https://golang.org/dl/$GO_FILE_NAME -P /tmp/downloads
sudo tar -C /usr/local -xzf /tmp/downloads/$GO_FILE_NAME

echo 'export GOROOT="/usr/local/go"' >> $HOME/.zshrc
echo 'export GOPATH="$HOME/dev/go"' >> $HOME/.zshrc
echo 'export PATH="$GOPATH/bin:$GOROOT/bin:$PATH"' >> $HOME/.zshrc