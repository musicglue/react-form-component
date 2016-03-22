import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import jsdom from 'jsdom';
import React from 'react';

chai.use(chaiEnzyme());

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

propagateToGlobal(win);
