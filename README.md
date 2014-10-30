<img align="right" src="https://raw.githubusercontent.com/FacetsTechnologies/loghound/dev/v02.5.0/docs/lh-2.5.0.a2.png"></img>
# Log Hound<br/><div style="font-size: 0.5em;">Facets Technologies, Inc.</div>
Log Hound is a standalone JavaScript logging utility that allows you to log messages during execution of !JavaScript code.  The log messages are stored and are viewable via the logging user interface which allows you to search the messages using multiple cooperative criteria. Log messages can be categorized by severity and by tags that can be associated with the messages when they are logged.

Logging functions can be reached globally through the window object, and since Log Hound can be disabled globally, there's no need to have to add and remove the logging statements between development and production of your code.

## News: October 23rd 2014 (We're back!)
We are in the process of moving the project from Google Code to github.  If docs or code are missing or links are pointing to the nether regions of the 'net, they will be migrated soon.

*Next Version: 2.5*

* Moved project from google code site to github.  Mmmmmm... cool-aid!
* Fixed layout issues.  Now the interface just looks slightly horrible.
* Moved level masking buttons to second row in control panel to make way for more levels/user-added buttons.
* Added "lhRun" query string parameter control.  Just add "?lhRun=true" (or false) to turn !LogHound on or off.  Documentation will be updated for this feature shortly.

*Future Version: 3.0*

* Expand tagging feature so the interface can handle a bazillion tags, meaning:
  * Add search
  * Add ability to break interface out and make it bigger when it is.
  * Add ability to save tag groups.
* Add preference saving.
* Yes! we will add interface dragging and docking.


## Demonstration Pages
1. [Trunk](http://htmlpreview.github.io/?https://github.com/FacetsTechnologies/loghound/blob/dev/v02.5.0/src/loghound.html): Vorpal-edge code that may or may not be stable.
1. [Development](http://htmlpreview.github.io/?https://github.com/FacetsTechnologies/loghound/blob/dev/v02.5.0/src/loghound.html): The latest alpha or beta release. It will work, but things may be missing.
1. [Release](http://facets-loghound.googlecode.com/svn/tags/v2.0.1/src/main/javascript/loghound.html): Version 2.0.1 is the latest full version.

## What now?
Check out the [features](http://htmlpreview.github.io/?https://github.com/FacetsTechnologies/loghound/blob/dev/v02.5.0/docs/features.html).

Look at the [API](http://htmlpreview.github.io/?https://github.com/FacetsTechnologies/loghound/blob/dev/v02.5.0/docs/jsdoc/index.html).

Download the latest version [(2.0.1)](http://facets-loghound.googlecode.com/files/loghound-2.0.1.zip). There's an html demonstration page in the zip you can open locally in a browser to play around with it.

Use it. Here are the [instructions](https://github.com/FacetsTechnologies/loghound/blob/dev/v02.5.0/docs/installation.html).

## Help!
Are you a CSS maven?  Do you like to make things not look bad?  Do people _not_ bleed from their eyes when they see something you styled?  Then how's about taking a swing at skinning Log Hound?  We can't all be good at everything, and though we here at Facets Technologies have mad skills with code, our CSS-fu is weak.  Help us out, and you'll be helping out all of Log Hound's users who's health insurance does not cover "User Interface Eye Injury".

If you'd like to help, email us at facets.tech.inc@gmail.com

