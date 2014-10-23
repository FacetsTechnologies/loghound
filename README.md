<img align="right" src="https://facets-loghound.googlecode.com/svn/wiki/images/lh-2.5.0.a2.png"></img>
# Log Hound<br/><span style="font-size:9px">Facets Technologies, Inc.</span>
Log Hound is a standalone JavaScript logging utility that allows you to log messages during execution of !JavaScript code.  The log messages are stored and are viewable via the logging user interface which allows you to search the messages using multiple cooperative criteria. Log messages can be categorized by severity and by tags that can be associated with the messages when they are logged.

Logging functions can be reached globally through the window object, and since Log Hound can be disabled globally, there's no need to have to add and remove the logging statements between development and production of your code.

## News (June 3rd 2012)
*Next Version: 2.5*

* Fixed layout issues.  Now the interface just looks slightly horrible.
* Moved level masking buttons to second row in control panel to make way for more levels/user-added buttons.
* Added "lhRun" query string parameter control.  Just add "?lhRun=true" (or false) to turn !LogHound on or off.  Documentation will be updated for this feature shortly.

Functionality is next on the list per the outstanding issues for v2.5.  Alpha Release 3 is next and will probably be the last alpha release before beta starts. Don't let the Alpha moniker scare you - trunk is stable and fully functional.

## Demonstration Pages
1. [Trunk](https://facets-loghound.googlecode.com/svn/trunk/src/main/javascript/loghound.html): Vorpal-edge code that may or may not be stable.
1. [Development](http://facets-loghound.googlecode.com/svn/tags/v2.0.1/src/main/javascript/loghound.html): The latest alpha or beta release. It will work, but things may be missing.
1. [Release](http://facets-loghound.googlecode.com/svn/tags/v2.0.1/src/main/javascript/loghound.html): Version 2.0.1 is the latest full version.

## What now?
Check out the [features](https://code.google.com/p/facets-loghound/wiki/Features).

Look at the [http://facets-loghound.googlecode.com/svn/tags/v2.0.1/src/site/jsdoc/files.html API].

Download the latest version [(2.0.1)](http://facets-loghound.googlecode.com/files/loghound-2.0.1.zip). There's an html demonstration page in the zip you can open locally in a browser to play around with it.

Use it. Here are the [instructions](http://code.google.com/p/facets-loghound/wiki/Installation installation).

## Help!
Are you a CSS maven?  Do you like to make things not look bad?  Do people _not_ bleed from their eyes when they see something you styled?  Then how's about taking a swing at skinning Log Hound?  We can't all be good at everything, and though we here at Facets Technologies have mad skills with code, our CSS-fu is weak.  Help us out, and you'll be helping out all of Log Hound's users who's health insurance does not cover "User Interface Eye Injury".

If you'd like to help, email us at facets.tech.inc@gmail.com
