#!/bin/bash

if [ "$CI_BRANCH" == 'master' ]; then
	echo 'master branch detected'
	echo "setting deployed app to $ReleaseAppName"
	appName=$ReleaseAppName
	appVersion=$ReleaseAppVersion
else
	echo 'non-master branch detected'
	echo "setting deployed app to $ReleaseAppName"
	appName=$DevAppName
	appVersion=$DevAppVersion
fi

cp sample.app.yaml app.yaml

sed -i -e 's/^application:.*$/application: '"$appName"'/g' app.yaml
sed -i -e 's/^version:.*$/version: '"$appVersion"'/g' app.yaml

cat app.yaml
