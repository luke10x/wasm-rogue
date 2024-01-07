FROM luke10x/webcurses:latest AS wasm-build-stage

# RUN apt-get update && apt-get install -y ncurses-dev build-essential wget

WORKDIR /opt

RUN wget http://rogue.rogueforge.net/files/rogue5.4/rogue5.4.4-src.tar.gz

RUN tar xvzf rogue5.4.4-src.tar.gz

WORKDIR /opt/rogue5.4.4

# This is required because the files in rogue distribution is old and ./configure even suggests update it
RUN wget -O config.guess http://savannah.gnu.org/cgi-bin/viewcvs/*checkout*/config/config/config.guess

RUN emconfigure ./configure

# These are cuasing problems
RUN sed -i 's/^#define HAVE_SETRESGID 1$/#undef HAVE_SETRESGID/' config.h
RUN sed -i 's/^#define HAVE_SETREGID 1$/#undef HAVE_SETREGID/' config.h
RUN sed -i 's/^#define HAVE_SETGID 1$/#undef HAVE_SETGID/' config.h
RUN sed -i 's/^#define HAVE_GETUID 1$/#undef HAVE_GETUID/' config.h
RUN sed -i 's/^#define HAVE_GETGID 1$/#undef HAVE_GETGID/' config.h


COPY config.h config.h 
COPY extern.h extern.h 
COPY library.js /opt/library.js

RUN emmake make \
  CFLAGS+=" -g -O2 " \
  CPPFLAGS=" -include unistd.h" \
  LIBS=" -lncursesw --preload-file /opt/terminfo@/home/web_user/.terminfo -s ASYNCIFY" \
  PROGRAM="rogue.js" && true

# FROM node

  #LIBS=" -lncursesw --js-library /opt/library.js" \
  # LIBS=" -lncursesw -s MAIN_MODULE=1yy" \
# HAVE_SETRESGID HAVE_SETREGID HAVE_SETGID
# -DHAVE_SETRESGID=0 -DHAVE_SETREGID=0 -DHAVE_SETGID=0
# RUN mkdir /opt/wasm-build
# COPY --from=wasm-build-stage /opt/rogue5.4.4/rogue.wasm /opt/wasm-build/
# COPY --from=wasm-build-stage /opt/rogue5.4.4/rogue.js   /opt/wasm-build/
 
