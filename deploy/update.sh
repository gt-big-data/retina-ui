#!/bin/bash
#Update webserver by pulling from Github
while true; do
  read -p "Do you want to stop the node server?" yn
  case $yn in
    [Yy]* ) stopBool="true"; break;;
    [Nn]* ) stopBool="false"; break;;
    * ) echo "Type y or n";;
  esac
done
echo ""
if [ "$stopBool" = "true" ]; then
  #stop the node server
  result=`ps -aux | grep node`
  echo "List of node processes"
  echo "$result"
  echo "Enter process ID to kill"
  read killID
  echo "You entered $killID"
  kill $killID
  echo ""
fi
echo "Pulling from Github"
git pull
echo "Restarting node server"
nohup node web &
wait ${!}
echo "Done updating"
