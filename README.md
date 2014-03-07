### Oberd MQ

Provides consistent toolkit for mobile first responsive
design.

#### Simple Mode (no-api)

By default, mq ships with the following breakpoints:

|| Name         | Min-Width     |
| ------------- |:-------------:|
| tablet        | 450px         |
| desktop       | 769px         |
| wide          | 1025px        |
| hd            | 1401px        |

When breakpoints are matched, the corresponding keys
are added to the documentElement of the page. For instance
if the viewport is 500px wide, ```tablet``` will be added
as a class.  If the viewport is 800px
wide, ```tablet``` and ```desktop``` will be available.

To enable updates on resize, call ```mq.watch()``` similar
to the example below.

````css
.tablet-stuff {
  display: none;
}
.tablet .tablet-stuff {
  display: block;
}

.desktop-stuff {
  display: none;
}
.desktop .desktop-stuff {
  display: block;
}
````

#### Javascript API

````javascript
define(function (require) {
  
  // Singleton instance
  var mq = require('oberd-media-query');

  mq.on('match', function (key) {
    ... do something on match
  });
  mq.on('unmatch', function (key) {
    ... key will be 'tablet' etc
  });

  // set custom breakpoints
  mq.breakpoints({
    'my-custom': 'screen and min-width: 2000px'
  });

  mq.watch();
});
````


#### Dependencies

Use [Require.js](http://requirejs.org/) for dependency management
using AMD with this project to make your life easier.

