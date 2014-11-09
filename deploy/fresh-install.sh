#!/bin/bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install git curl
git clone https://github.com/gt-big-data/retina-ui.git
sudo su && source iptables.conf && exit
curl https://raw.githubusercontent.com/creationix/nvm/v0.17.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.10
nvm use 0.10
nohup node web &
