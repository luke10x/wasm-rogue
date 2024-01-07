FROM ubuntu

RUN apt-get update && apt-get install -y ncurses-dev build-essential wget

WORKDIR /opt

RUN wget http://rogue.rogueforge.net/files/rogue5.4/rogue5.4.4-src.tar.gz

RUN tar xvzf rogue5.4.4-src.tar.gz

WORKDIR /opt/rogue5.4.4

# This is required because the files in rogue distribution is old and ./configure even suggests update it
RUN wget -O config.guess http://savannah.gnu.org/cgi-bin/viewcvs/*checkout*/config/config/config.guess

RUN ./configure

RUN make
