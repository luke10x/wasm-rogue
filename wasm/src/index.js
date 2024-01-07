'use strict';

import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

var term = new Terminal();
term.open(document.getElementById('terminal'));
term.focus();

const pressedKeys = []

term.onKey(e => {
  const raw = new TextEncoder().encode(e.key)
  const bytes = Array.from(raw);
  pressedKeys.push(...bytes)
});

window.Module = {
  preRun: [() => {
    ENV.TERM = 'xterm';
    FS.init(
      () => {
        if (pressedKeys.length > 0) {
          const first = pressedKeys.shift()
          return first ;
        }
        return null;
      }, 
      (input) => {
        term.write(new Uint8Array([input]))
      },
      null
    );
  }],
  postRun: [function() {}],
  printErr: (stderr) => console.error('STDERRPIPE:', stderr)
};

