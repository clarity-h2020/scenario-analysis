'use strict';

if (typeof $ === 'undefined') {
    var $ = jQuery;
}
if (typeof $ === 'undefined') {
    var $ = window.jQuery;
}

window.Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
        // Using once() to apply the mcdaIFrameBehavior effect when you want to run just one function.
        $(window, context).once('mcdaIFrameBehavior').each(function () {
            console.log('onAttach');
            var connectCount = 0;
            // for some unknown the reason angular directive controler of the embedded child iframe
            // does not recieve the event when it's not fired from the onConnect method.
            var mcdaApp = window.seamless(document.getElementById('mcda'),
                    {onConnect: function () {
                            // FIXME: for some unknown reasin, onConnect is called if no child fram has activiliy connected
                            // by invokinf seamless.connect() resulting in the onConnect function called twice!
                            if(connectCount === 1) { 
                                var currentNodeId = window.location.pathname.split('/').pop();
                                mcdaApp.send({
                                    nodeId: currentNodeId
                                });
                            } else {
                                console.log('pre/re connection #:' + connectCount);
                            }
                            connectCount++;
                        }});
        });
    }
};