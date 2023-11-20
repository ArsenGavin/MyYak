## to run this project in dev env you need to run this command on your terminal :

> make prepare

after you need to run 

> make up

## to run this project on prod env you need this command :

## run database on prod
> docker-compose -f docker-compose-db-prod.yml --env-file ./.env.prod up -d

## run api on prod
> docker-compose -f docker-compose-api-prod.yml --env-file ./.env.prod up -d

# ===== Database Administration ===== 

To manage database with MongoDB we use MongoDB Compass,
It is like phpmyadmin for mysql, but for Mongo,

so

First you need to download a stable release like :
 - curl -sS https://downloads.mongodb.com/compass/mongodb-compass_1.26.1_amd64.deb > mongodb-compass_1.26.1_amd64.deb
 ou
 - wget https://downloads.mongodb.com/compass/mongodb-compass_1.26.1_amd64.deb
Prepare the dependency for the mongo compass :
- apt-get install libgtk2.0-0 libnotify4 libnss3 libxtst6 xdg-utils libgconf-2-4 \
    libxss1 kde-cli-tools trash-cli libglib2.0-bin gvfs-bin libsecret-1-0 \
    gnome-keyring

before to finsih you need to check everything is ok with an :
 - apt --fix-broken install

and lastly you need to install it:
 - sudo dpkg -i mongodb-compass_1.26.1_amd64.deb


if like me you are in windows using wsl2, you need to export display :
- export DISPLAY=:0.0
In my case this standard export didn't work may be due to update,
so a small workaround to get the forwarding working was :
- export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0

install a Xserver like Xming, Xlaunch(vcxsrv), or like me X410 directly from the store

and now to run it now you simply do : 
- mongodb-compass
<!-- To access database with docker in compass put this url
    mongodb://hospiroot:hospiroot@localhost:27017/?authSource=admin -->

Now GG and Enjoy !