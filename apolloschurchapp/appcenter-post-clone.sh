#!/usr/bin/env bash

npx @apollosproject/apollos-cli secrets -d $ENCRYPTION_SECRET

# Make sure ReactNativeConfig picks up values from prod env file.
cp .env.shared .env

# install cocoapods
echo "Uninstalling all CocoaPods versions"
sudo gem uninstall cocoapods --all --executables

COCOAPODS_VER=$(sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock)

echo "Installing CocoaPods version $COCOAPODS_VER"
sudo gem install cocoapods -v "$COCOAPODS_VER"

node ./scripts/get-introspection-data.js
