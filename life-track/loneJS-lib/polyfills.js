var _POLYFILL_INCLUDED = false;

(()=>{
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    console.log('No Polyfill needed for this browser')
  } else {
    console.log('*** Webcomponents Polyfill needed for this browser ***')
    _POLYFILL_INCLUDED = true
    var e = document.createElement('script');
    e.src = 'loneJS-lib/bower_components/webcomponentsjs/webcomponents-lite.js';
    document.getElementsByTagName('head')[0].appendChild(e);
    var e2 = document.createElement('script');
    e2.src = 'loneJS-lib/bower_components/document-register-element/build/document-register-element.js';
    document.getElementsByTagName('head')[0].appendChild(e2);
  }
})()
