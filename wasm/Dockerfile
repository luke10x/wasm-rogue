FROM luke10x/webcurses:latest AS wasm-build-stage

# RUN apt-get update && apt-get install -y ncurses-dev build-essential wget

WORKDIR /opt

RUN wget http://rogue.rogueforge.net/files/rogue5.4/rogue5.4.4-src.tar.gz

RUN tar xvzf rogue5.4.4-src.tar.gz

WORKDIR /opt/rogue5.4.4

# This is required because the files in rogue distribution is old
# and ./configure even suggests update it
RUN wget -O config.guess http://savannah.gnu.org/cgi-bin/viewcvs/*checkout*/config/config/config.guess

RUN emconfigure ./configure

# All Emscripten related customizations will be overriden in this file
COPY extern.h extern.h 

RUN emmake make \
  CFLAGS+=" -g -O2 " \
  CPPFLAGS=" -include unistd.h" \
  LIBS=" -lncurses --preload-file /opt/terminfo@/home/web_user/.terminfo \
    -s ASYNCIFY \
    -s EMULATE_FUNCTION_POINTER_CASTS=1 \
    -s ASSERTIONS=2" \
  PROGRAM="rogue.js"
RUN emmake make \
  CFLAGS+=" -g -O2 " \
  CPPFLAGS=" -include unistd.h" \
  LIBS=" -lncurses --preload-file /opt/terminfo@/home/web_user/.terminfo \
    -s ASYNCIFY \
    -s EMULATE_FUNCTION_POINTER_CASTS=1 \
    -s ASSERTIONS=2" \
  PROGRAM="rogue2.js"

