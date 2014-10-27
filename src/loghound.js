/**
 * @fileoverview
 *
 * Software License Agreement (Apache License 2.0)
 *
 * <p>Copyright (c) 2014,  Facets Technologies, Inc.<br/>
 * All rights reserved.</p>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * <hr />
 *
 * <p>LogHound is a Javascript logger you can use to gain insight into what is
 * going on in your Javascript code.</p>
 *
 */

/**
 * Log Hound version object.
 * @namespace Provides access to current exact Log Hound version information.
 */
var LogHoundVer = [];
LogHoundVer['major'] = '2';
LogHoundVer['minor'] = '5';
LogHoundVer['fix'] = '0';
LogHoundVer['build'] = '';
if(LogHoundVer['build'].length>5) {
    LogHoundVer['build'] = LogHoundVer['build'].substring(5).split(' ')[1];
} else {
    LogHoundVer['build'] = 'beta 2';
}
LogHoundVer['release'] = '';
/**
 * returns {String} The pretty-printed version, including the build number.
 */
LogHoundVer.getLongText = function() {
    var ver = this.major+'.'+this.minor+'.'+this.fix;
    if(this.build!='') {
        ver = ver+'.'+this.build;
    }
    if(this.release!='') {
        ver = ver+'.'+this.release;
    }
    return ver;
};
/**
 * returns {String} The pretty-printed version.
 */
LogHoundVer.getShortText = function() {
    return 'v'+this.major+'.'+this.minor+'.'+this.fix+' '+this.release;
};

/**
 * @class Provides the primary text searching functionality used by Log Hound.
 * @param {integer} id An integer that specifies the ordinal level of the of the log level.
 * @param {String} text The name of the log level.  e.g. error, info, warn, etc...
 * @param {boolean} enabled <code>true</code> if the level should initially be enabled,
 * otherwise <code>false</code>.
 */
function LogHoundLevel(id, text, enabled) {
    this.id = id;
    this.text = text.toLowerCase();
    this.label = this.text.charAt(0).toUpperCase() + this.text.slice(1);
    this.enabled = enabled;
}
/**
 * @returns {integer} The ID number of the log level.
 */
LogHoundLevel.prototype.getId = function() {
    return this.id;
};
/**
 * @returns {String} The log level name or label.
 */
LogHoundLevel.prototype.getName = function() {
    return this.text;
};
/**
 * @returns {String} The label for the log level, which is the name of the log level with the first character
 * capitalised.
 */
LogHoundLevel.prototype.getLabel = function() {
    return this.label;
};
/**
 * @returns {boolean} <code>true</code> if the log level is enabled, otherwise
 * <code>false</code>.
 */
LogHoundLevel.prototype.isEnabled = function() {
    return this.enabled;
};
/**
 * @param {boolean} <code>true</code> if the log level should be enabled,
 * otherwise <code>false</code>.
 */
LogHoundLevel.prototype.setEnabled = function(enable) {
    this.enabled = enable;
};

/**
 * Object array defining all the log level objects and their specific attributes.
 * @namespace Manager for LogHoundLevel objects.
 */
var LogHoundLevels = [];
/**
 * @param {String} name The name of the log level to retrieve.
 * @returns {LogHoundLevel} The retrieved log level, or <code>null</code> if
 * no match for the argumented name was found.
 */
LogHoundLevels.getByName = function(name) {
    name = name.toLowerCase();
    for(var idx=0; idx<this.length; idx++) {
        if(this[idx].getName() == name) {
            return this[idx];
        }
    }
    return null;
};
/**
 * @param {integer} id The ID of the log level to retrieve.
 * @returns {LogHoundLevel} The retrieved log level, or <code>null</code> if
 * no match for the argumented ID was found.
 */
LogHoundLevels.getById = function(id) {
    for(var idx=0; idx<this.length; idx++) {
        if(this[idx].getId() == id) {
            return this[idx];
        }
    }
    return null;
};
/**
 * @param {Number|String|LogHoundLevel} level The ID or name of the log level to retrieve.
 * @returns {LogHoundLevel} The retrieved log level, or <code>null</code> if
 * no match for the argumented level indicator was found.
 */
LogHoundLevels.getLevel = function(level) {
    if(level==null) { return null; }
    if(FctsTools.isNumber(level)) {
        return this.getById(level);
    } else if(FctsTools.isString(level)) {
        return this.getByName(level);
    } else if(level instanceof LogHoundLevel) {
        return level;
    }
    return null;
};
/**
 * Takes a new log level definition and extends LogHoundLevel with it, then
 * adds it to the LogHoundLevels array.
 * @private
 */
LogHoundLevels.addLevel = function(newLevelFn) {
    FctsTools.extend(newLevelFn, LogHoundLevel);
    var newLevel = new newLevelFn();
    LogHoundLevels[newLevel.getName().toUpperCase()] = newLevel;
    LogHoundLevels.push(newLevel);
};

/**
 * @class Fatal log level.
 * @augments LogHoundLevel
 */
function FatalLogHoundLevel() {
    FatalLogHoundLevel.baseConstructor.call(this, 100, 'fatal', true);
}
LogHoundLevels.addLevel(FatalLogHoundLevel);
/**
 * @class Error log level.
 * @augments LogHoundLevel
 */
function ErrorLogHoundLevel() {
    ErrorLogHoundLevel.baseConstructor.call(this, 90, 'error', true);
}
LogHoundLevels.addLevel(ErrorLogHoundLevel);
/**
 * @class Warn log level.
 * @augments LogHoundLevel
 */
function WarnLogHoundLevel() {
    WarnLogHoundLevel.baseConstructor.call(this, 80, 'warn', true);
}
LogHoundLevels.addLevel(WarnLogHoundLevel);
/**
 * @class Info log level.
 * @augments LogHoundLevel
 */
function InfoLogHoundLevel() {
    InfoLogHoundLevel.baseConstructor.call(this, 70, 'info', true);
}
LogHoundLevels.addLevel(InfoLogHoundLevel);
/**
 * @class Debug log level.
 * @augments LogHoundLevel
 */
function DebugLogHoundLevel() {
    DebugLogHoundLevel.baseConstructor.call(this, 60, 'debug', true);
}
LogHoundLevels.addLevel(DebugLogHoundLevel);
/**
 * @class Trace log level.
 * @augments LogHoundLevel
 */
function TraceLogHoundLevel() {
    TraceLogHoundLevel.baseConstructor.call(this, 50, 'trace', true);
}
LogHoundLevels.addLevel(TraceLogHoundLevel);

// Load predefined extra log levels
if((typeof(LogHoundLevelPreload)!='undefined') && (LogHoundLevelPreload instanceof Array)) {
    for(var i=0; i<LogHoundLevelPreload.length; i++) {
        LogHoundLevels.addLevel(LogHoundLevelPreload[i]);
    }
}

/**
 * Main Log Hound object-function definition.
 * @class
 */
function LogHound() {
    this.me = this;
    this.msgCount = 0;
    this.logLevel = LogHoundLevels['DEBUG'];
    this.msgDispMode = 'brief'; // detail, brief
    this.killSwitch = false;
    this.enabled = true;
    this.initialised = false;
    this.helpEnabled = false;
    this.tagNameRegex = new RegExp('^[a-z][-a-z0-9_]+$','i');
    this._viewPlates = [];
    this._msgCountLimit = 10000;
    this._msgCountMin = 100;
    this._shadeState = false;
    var queryParams = FctsTools.parseQueryString();
    if(!!queryParams && !!queryParams['lhRun']) {
        this.doSetup();
    }
}
/**
 *
 */
LogHound.prototype.doSetup = function() {
    if(!!document && !!document.body) {
        this._doSetup();
    } else {
        window.loghoundProc = {};
        window.loghoundProc.loadAttempts = 5;
        var context = this;
        window.loghoundProc.procId = setInterval(function() {
            if((window.loghoundProc.loadAttempts--)<1) {
                clearInterval(window.loghoundProc.procId);
            }
            if(!!document && !!document.body) {
                clearInterval(window.loghoundProc.procId);
                context._doSetup();
            }
        }, 500);
    }
};
/**
 * Performs the main setup for the Log Hound application.  This should only be
 * called once per page, though it protects itself against multiple calls. Log
 * Hound will not be functional until this method is called.
 */
LogHound.prototype._doSetup = function() {
    if(this.killSwitch) {
        return;
    }
    this.tagMode = 'any';
    this.killSwitch = true;
    this.initialised = true;
    this.helpEntries = [];
    this.msgRecords = [];
    this.msgTags = [];
    this.msgFilters = [];
    this.msgFilters.push(new LogHoundMessageLevelFilter());
    var logPlate = document.createElement('DIV');
    logPlate.setAttribute('id', 'lhPlate');
    logPlate.setAttribute('class', 'lhRndCorners');
    this.logPlate = document.body.appendChild(logPlate);
    this.logPlate['lhIsShowing'] = true;

    this._createTitlePanel();
    this._createHelpPanel();
    this._createControlPanel();
    this._createTagPanel();
    this._createLogsPanel();

    var btns = document.getElementsByClassName('lhBtn');
    for(var i=0; i<btns.length; i++) {
        FctsTools.addStyleClass(btns[i],'lhBtnOut');
        btns[i].onmouseover = this.buttonMouseOver;
        btns[i].onmouseout = this.buttonMouseOut;
        btns[i].lhBtnState = 'off';
    }

    //this.interfaceMonitor(true);
    this.setLogLevel(this.logLevel);
    for(var i=0;i<this._viewPlates.length;i++) {
        this.setPanelDisplay(this._viewPlates[i],this._viewPlates[i].lhDisplayStart);
    }
    this.setShadeState(true);
    setTimeout('window.loghound.show(true)',800);
    this.logInfo('Log Hound is online...');
};

LogHound.prototype._createTitlePanel = function() {
    this.domTitlePanelPlate = document.createElement('DIV');
    this.domTitlePanelPlate.setAttribute('id', 'lhTitlePanelPlate');
    var titlebar = '<div id="lhTitlePanel" class="lhPlateColor lhRndCorners">';
    titlebar +=    '<div id="lhBtnShade" class="lhTitlePanelElmt lhFont lhCtrl lhBtn" title="Toggle Message Panel">v</div>';
    titlebar +=    '<div id="lhTitle" class="lhTitlePanelElmt lhFont">Log Hound v'+LogHoundVer.getLongText()+'</div>';
    titlebar +=    '<div id="lhTitlePanelSpcr" class="lhTitlePanelElmt lhFont"></div>';
    titlebar +=    '<div id="lhBtnHelp" class="lhTitlePanelElmt lhFont lhCtrl lhBtn" title="Toggle Help Panel">?</div>';
    titlebar +=    '<div id="lhBtnTags" class="lhTitlePanelElmt lhFont lhCtrl lhBtn" title="Toggle Tags Panel">T</div>';
    titlebar +=    '</div>';
    this.domTitlePanelPlate.innerHTML = titlebar;
    this.logPlate.appendChild(this.domTitlePanelPlate);
    var lhRef = this;
    document.getElementById('lhBtnShade').onclick = function(event) {
        lhRef.setShadeState();
    };
    this.addHelpEntry(['lhBtnShade','Shade Mode Toggle: Toggles the Log Hound interface between shade display mode and normal display mode.']);

    // Help panel toggle
    document.getElementById('lhBtnHelp').onclick = function(event) {
        lhRef.toggleHelp(lhRef.setPanelDisplay(lhRef.domHelpPanelPlate));
    };
    this.addHelpEntry(['lhBtnHelp','Help Panel Toggle: Opens and closes the help panel.']);

    // Tag control panel toggle
    document.getElementById('lhBtnTags').onclick = function(event) {
        lhRef.setPanelDisplay(lhRef.domTagCtrlPanelPlate);
    };
    this.addHelpEntry(['lhBtnTags','Tag Panel Toggle: Opens and closes the tag control panel.']);
};

LogHound.prototype._createHelpPanel = function() {
    // Help panel creation code.
    this.domHelpPanelPlate = document.createElement('DIV');
    this.domHelpPanelPlate.setAttribute('id', 'lhHelpPanelPlate');
    var helpPanelInfo = 'Mouse over any interface element to see help for that element here.';
    var helpPanel = '<div id="lhHelpPanel" class="lhPlateColor lhRndCorners lhSmFont">';
    helpPanel +=    helpPanelInfo;
    helpPanel +=    '</div>';
    this.domHelpPanelPlate.innerHTML = helpPanel;
    this.domHelpPanelPlate.lhDfltTxt = helpPanelInfo;
    this.addPanel(this.domHelpPanelPlate);
};

LogHound.prototype._createControlPanel = function() {
    // Control panel creation code.
    this.domCtrlPanelPlate = document.createElement('DIV');
    this.domCtrlPanelPlate.setAttribute('id', 'lhCtrlPanelPlate');
    var ctrlbar = '<div id="lhCtrlPanel" class="lhPlateColor lhRndCorners">';
    ctrlbar +=    '<div id="lhCtrlRow1">';
    ctrlbar +=    '<div id="lhCtrlMore" class="lhCtrl lhBtn lhFont" title="Show more logs">v</div>';
    ctrlbar +=    '<div id="lhCtrlLess" class="lhCtrl lhBtn lhFont" title="Show less logs">^</div>';
    ctrlbar +=    '<div id="lhCtrlLvlSelectPlate"><select id="lhLvlSelect" name="lhLvlSelect" class="lhSmFont" title="Select level of logging"></select></div>';
    ctrlbar +=    '<div id="lhCtrlMsgDispModeBtn" class="lhDispModeLable lhCtrl lhBtn lhSmFont" title="Toggle message display mode">D</div>';
    ctrlbar +=    '<div id="lhBtnClear" class="lhCtrl lhBtn lhSmFont" title="Clear All Logs">Clr</div>';
    ctrlbar +=    '<div id="lhLogCountLimitPlate"><div id="lhLogCountLimitBtn" class="lhCtrl lhBtnType1 lhSmFont" title="Log message count limit">2000</div></div>';
    ctrlbar +=    '<div id="lhCtrlSearchPlate">';
    ctrlbar +=    '<input type="text" id="lhSearchField" name="lhSearchField" class="lhSearchField lhSmFont" onkeyup="window.loghound.search()" title="Type to search..." placeholder="Type to search..."/>';
    ctrlbar +=    '</div></div>';
    ctrlbar +=    '<div id="lhCtrlRow2">';
    ctrlbar +=    '<div class="lhSpacer"></div><div id="lhCtrlLvlPlate">';
    ctrlbar +=    '<div id="lhCtrlLvlFatal" class="lhFatalMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Fatal">0</div>';
    ctrlbar +=    '<div id="lhCtrlLvlError" class="lhErrorMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Error">0</div>';
    ctrlbar +=    '<div id="lhCtrlLvlWarn" class="lhWarnMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Warn">0</div>';
    ctrlbar +=    '<div id="lhCtrlLvlInfo" class="lhInfoMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Info">0</div>';
    ctrlbar +=    '<div id="lhCtrlLvlDebug" class="lhDebugMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Debug">0</div>';
    ctrlbar +=    '<div id="lhCtrlLvlTrace" class="lhTraceMsg lhCtrlLvl lhCtrl lhBtn lhFont" title="Trace">0</div>';
    ctrlbar +=    '</div><div class="lhSpacer"></div>';
    ctrlbar +=    '</div></div>';
    this.domCtrlPanelPlate.innerHTML = ctrlbar;
    this.addPanel(this.domCtrlPanelPlate,true);
    this.addHelpEntry(['lhSearchField','Search text entry: Message text is matched as you type, with non-matching log messages being automatically hidden.']);
    this.addHelpEntry(['lhCtrlLvlPlate','Log level visibility controls: Controls which log level messages will be visible in the message pane.']);

    var lhRef = this;
    // Add levels to level select control.
    var lvlSelect = document.getElementById('lhLvlSelect');
    var level=null;
    for(var idx = 0; idx<LogHoundLevels.length; idx++) {
        level = LogHoundLevels[idx];
        lvlSelect.options[lvlSelect.length] = new Option(level.getName(),level.getId());
    }
    FctsTools.sortOptionsByValue(lvlSelect,function(o1,o2) {
        return parseInt(o2,10)-parseInt(o1,10);
    });
    lvlSelect.onchange = function(event) {
        lhRef.setLogLevel(parseInt(this.value,10));
    };
    this.addHelpEntry(['lhLvlSelect','Level Select: Levels are in descending order. Only messages corresponding to the level shown and those above will be logged after change.']);
    this.searchField = document.getElementById('lhSearchField');

    document.getElementById('lhCtrlMore').onclick = function(event) {
        lhRef.adjustMessagePaneSize(true);
    };
    this.addHelpEntry(['lhCtrlMore','Show more messages: Lengthens the log message pane to show more messages.']);
    document.getElementById('lhCtrlLess').onclick = function(event) {
        lhRef.adjustMessagePaneSize(false);
    };
    this.addHelpEntry(['lhCtrlLess','Show less messages: Shortens the log message pane to show fewer messages.']);
    var levelControls = document.getElementsByClassName('lhCtrlLvl');
    var showMsgLvlFn = function(event) {
        lhRef.showMessageLevel(this.id.slice(9));
    };
    for(var idx=0; idx<levelControls.length; idx++) {
        levelControls[idx].onclick = showMsgLvlFn;
    }

    document.getElementById('lhCtrlMsgDispModeBtn').onclick = function(event) {
        lhRef.setMessageLayout();
    };
    this.addHelpEntry(['lhCtrlMsgDispModeBtn','Message detail toggle: Toggles the message pane between normal message display and detailed message display.']);

    // Clear logs
    var clearLogs = document.getElementById('lhBtnClear');
    clearLogs.onclick = function(event) {
        lhRef.clearLogs(false);
    };
    this.addHelpEntry(['lhBtnClear','Clears all existing log messages after confirmation by user.']);

    // Set log message count limit
    var logLimitBtn = document.getElementById('lhLogCountLimitBtn');
    logLimitBtn.onclick = function(event) {
        lhRef.setMessageCountLimit();
    };
    this.addHelpEntry(['lhLogCountLimitBtn','Sets the log message count limit (cannot be greater than '+this._msgCountLimit+' or less than '+this._msgCountMin+'). The oldest messages will be deleted from memory.']);
};

LogHound.prototype._createTagPanel = function() {
    // Tag panel creation code
    this.domTagCtrlPanelPlate = document.createElement('DIV');
    this.domTagCtrlPanelPlate.setAttribute('id', 'lhTagCtrlPanelPlate');
    var tagbar = '<div id="lhTagCtrlPanel" class="lhPlateColor lhRndCorners">';
    tagbar +=    '<div class="lhSpacer"></div>';
    tagbar +=    '<div id="lhAvailTagsPlate">';
    tagbar +=    '<span class="lhTagsHdr lhSmFont">Tags:</span>';
    tagbar +=    '<div><select id="lhAvailTagsSelect" class="lhSmFont" multiple="multiple" size="4"></select></div>';
    tagbar +=    '</div>';

    tagbar +=    '<div id="lhCtrlTagsPlate">';
    tagbar +=    '<span id="lhTagCtrlAddBtn" class="lhTagCtrl lhBtn lhFont" title="Add Selected">&gt;</span>';
    tagbar +=    '<span id="lhTagCtrlAddAllBtn" class="lhTagCtrl lhBtn lhFont" title="Add All">&gt;&gt;</span>';
    tagbar +=    '<span id="lhTagCtrlRemBtn" class="lhTagCtrl lhBtn lhFont" title="Remove Selected">&lt;</span>';
    tagbar +=    '<span id="lhTagCtrlRemAllBtn" class="lhTagCtrl lhBtn lhFont" title="Remove All">&lt;&lt;</span>';
    tagbar +=    '</div>';

    // http://www.dhtmlgoodies.com/scripts/multiple_select/multiple_select.html
    tagbar +=    '<div id="lhViewTagsPlate">';
    tagbar +=    '<span class="lhTagsHdr lhSmFont">Viewing:</span>';
    tagbar +=    '<div><select id="lhViewTagsSelect" class="lhSmFont" multiple="multiple" size="4"></select></div>';
    tagbar +=    '</div>';

    tagbar +=    '<div id="lhModTagsPlate">';
    tagbar +=    '<span id="lhTagCtrlAnyBtn" class="lhTagCtrl lhSmFont lhBtn" title="Any">A</span>';
    tagbar +=    '<span id="lhTagCtrlIntBtn" class="lhTagCtrl lhSmFont lhBtn" title="Intersection">I</span>';
    tagbar +=    '<span id="lhTagCtrlOnyBtn" class="lhTagCtrl lhSmFont lhBtn" title="Only">O</span>';
    tagbar +=    '<span id="lhTagCtrlExcBtn" class="lhTagCtrl lhSmFont lhBtn" title="Exclusion">E</span>';
    tagbar +=    '</div><div class="lhSpacer"></div></div>';
    this.domTagCtrlPanelPlate.innerHTML = tagbar;
    this.addPanel(this.domTagCtrlPanelPlate);
    this.addHelpEntry(['lhAvailTagsSelect','Available Tags Select: Lists all unique available tags assigned to any messages.']);
    this.addHelpEntry(['lhViewTagsSelect','View Tags Select: Tags listed here will affect what messages are visible, depending on the active tag modifier.']);
    this.addHelpEntry(['lhTagCtrlAddBtn','Add Selected Tags: Moves tags selected in the available tags box to the viewing box.']);
    this.addHelpEntry(['lhTagCtrlAddAllBtn','Add All Tags: Moves all tags in the available tags box to the viewing box.']);
    this.addHelpEntry(['lhTagCtrlRemBtn','Remove Selected Tags: Moves tags selected in the viewing tags box to the available tags box.']);
    this.addHelpEntry(['lhTagCtrlRemAllBtn','Remove All Tags: Moves all tags in the viewing tags box back to the available tags box.']);

    this.tagsSelectElmt = document.getElementById('lhAvailTagsSelect');
    this.tagsViewElmt = document.getElementById('lhViewTagsSelect');


    var lhRef = this;
    document.getElementById('lhTagCtrlAddBtn').onclick = function(event) {
        lhRef.moveTagAssignments('add');
    };
    document.getElementById('lhTagCtrlRemBtn').onclick = function(event) {
        lhRef.moveTagAssignments('rem');
    };
    document.getElementById('lhTagCtrlRemAllBtn').onclick = function(event) {
        lhRef.moveTagAssignments('remAll');
    };
    document.getElementById('lhTagCtrlAddAllBtn').onclick = function(event) {
        lhRef.moveTagAssignments('addAll');
    };

    this.tagModBtns = [];
    // Tag modifier: Any button.
    this.tagModBtnAny = document.getElementById('lhTagCtrlAnyBtn');
    this.tagModBtns[this.tagModBtns.length] = this.tagModBtnAny;
    this.tagModBtnAny.lhTagMode = 'any';
    this.tagModBtnAny.onclick = function(event) {
        lhRef.activateTagMode('any');
    };
    this.addHelpEntry(['lhTagCtrlAnyBtn','"Any" Tags Modifier: Messages with any of the viewing tags will be visible.']);
    // Tag modifier: Intersection button.
    this.tagModBtnInt = document.getElementById('lhTagCtrlIntBtn');
    this.tagModBtns[this.tagModBtns.length] = this.tagModBtnInt;
    this.tagModBtnInt.lhTagMode = 'int';
    this.tagModBtnInt.onclick = function(event) {
        lhRef.activateTagMode('int');
    };
    this.addHelpEntry(['lhTagCtrlIntBtn','"Intersection" Tags Modifier: Only messages that have all of the viewing tags will be visible.']);
    // Tag modifier: Only button.
    this.tagModBtnOny = document.getElementById('lhTagCtrlOnyBtn');
    this.tagModBtns[this.tagModBtns.length] = this.tagModBtnOny;
    this.tagModBtnOny.lhTagMode = 'ony';
    this.tagModBtnOny.onclick = function(event) {
        lhRef.activateTagMode('ony');
    };
    this.addHelpEntry(['lhTagCtrlOnyBtn','"Only" Tags Modifier: Only messages that have all of the viewing tags and no other tags will be visible.']);
    // Tag modifier: Exclusion button.
    this.tagModBtnExc = document.getElementById('lhTagCtrlExcBtn');
    this.tagModBtns[this.tagModBtns.length] = this.tagModBtnExc;
    this.tagModBtnExc.lhTagMode = 'exc';
    this.tagModBtnExc.onclick = function(event) {
        lhRef.activateTagMode('exc');
    };
    this.addHelpEntry(['lhTagCtrlExcBtn','"Exclusion" Tags Modifier: Only messages that have none of the viewing tags will be visible.']);
    this.activateTagMode('any');
};
/**
 * @private
 */
LogHound.prototype._createLogsPanel = function() {
    this.domLogsPanelPlate = document.createElement('DIV');
    this.domLogsPanelPlate.setAttribute('id', 'lhLogsPanelPlate');
    var logsPanel = '<div id="lhLogsPanel" class="lhPlateColor lhRndCorners">';
    logsPanel +=    '<div id="lhLogsPanelBody"></div>';
    logsPanel +=    '</div>';
    this.domLogsPanelPlate.innerHTML = logsPanel;
    this.addPanel(this.domLogsPanelPlate,true);
    var logsBody = document.getElementById('lhLogsPanelBody');
    logsBody.addEventListener('mousewheel',function(evt) {
        evt.cancelBubble = true;
    }, false);
    FctsTools.preventParentScroll(logsBody);
};
/**
 *
 * @param panelRef
 * @param startOpen
 */
LogHound.prototype.addPanel = function(panelRef,startOpen) {
    if(typeof panelRef == 'string') {
        panelRef = document.getElementById(panelRef);
    }
    panelRef.lhShadeState = false;
    panelRef.lhDisplayStart = !!startOpen;
    panelRef.lhDisplayStyle = 'none';
    this.logPlate.appendChild(panelRef);
    this._viewPlates.push(panelRef);
};
/**
 * Standard mouse-over event for UI buttons.
 */
LogHound.prototype.buttonMouseOver = function(event) {
    FctsTools.removeStyleClass(this, 'lhBtnOut');
    FctsTools.removeStyleClass(this, 'lhBtnOn');
    FctsTools.addStyleClass(this, 'lhBtnOver');
};
/**
 * Standard mouse-out event for UI buttons.
 */
LogHound.prototype.buttonMouseOut = function(event) {
    FctsTools.removeStyleClass(this, 'lhBtnOver');
    if(this.lhBtnState=='on') {
        FctsTools.addStyleClass(this, 'lhBtnOn');
    } else {
        FctsTools.replaceStyleClass(this, 'lhBtnOn', 'lhBtnOut');
    }
};
/**
 * @param {String} mode The tag filter mode.  Must be one of four values:
 * <ol>
 * <li>any</li>
 * <li>exc</li>
 * <li>int</li>
 * <li>ony</li>
 * </ol>
 */
LogHound.prototype.activateTagMode = function(mode) {
    for(var i=0; i<this.tagModBtns.length; i++) {
        if(this.tagModBtns[i].lhTagMode == mode) {
            this.tagModBtns[i].lhBtnState = 'on';
            FctsTools.addStyleClass(this.tagModBtns[i], 'lhBtnOn');
            this.setTagFilterMode(mode);
        } else {
            this.tagModBtns[i].lhBtnState = 'off';
            FctsTools.removeStyleClass(this.tagModBtns[i], 'lhBtnOn');
            FctsTools.replaceStyleClass(this.tagModBtns[i], 'lhBtnOn', 'lhBtnOut');
        }
    }
};
/**
 * @private
 */
LogHound.prototype.addHelpEntry = function(entry) {
    this.helpEntries[this.helpEntries.length] = entry;
};
/**
 * @private
 */
LogHound.prototype.toggleHelp = function(enable) {
    if(this.helpEnabled==(!!enable)) { return; }
    this.helpEnabled = !!enable;
    if(!!enable) {
        var lhRef = this;
        var helpPanel = document.getElementById('lhHelpPanel');
        for(var len=this.helpEntries.length, i=0; i<len; i++) {
            var target = document.getElementById(this.helpEntries[i][0]);
            target.lhHelpTxt = this.helpEntries[i][1];
            target.lhOrigMouseOver = target.onmouseover;
            target.lhOrigMouseOut = target.onmouseout;
            target.onmouseover = function() {
                if((typeof(this.lhOrigMouseOver)!='undefined') && this.lhOrigMouseOver!=null) { this.lhOrigMouseOver(); }
                helpPanel.innerHTML = this.lhHelpTxt;
            };
            target.onmouseout = function() {
                if((typeof(this.lhOrigMouseOut)!='undefined') && this.lhOrigMouseOut!=null) { this.lhOrigMouseOut(); }
                helpPanel.innerHTML = lhRef.domHelpPanelPlate.lhDfltTxt;
            };
        }
    } else {
        var target = null;
        for(var len=this.helpEntries.length, i=0; i<len; i++) {
            target = document.getElementById(this.helpEntries[i][0]);
            target.lhHelpTxt = this.helpEntries[i][1];
            target.onmouseover = target.lhOrigMouseOver;
            target.onmouseout = target.lhOrigMouseOut;
        }
    }
};
LogHound.prototype.setMessageCountLimit = function(count) {
    // ctrlbar +=    '<div id="lhLogCountLimitPlate"><div id="lhLogCountLimitBtn" class="lhCtrl lhSmFont" title="Log message count limit">2000</div></div>';
    var limitBtn = document.getElementById('lhLogCountLimitBtn');
    var currVal = limitBtn.innerHTML;
    var errmsg = '';
    if(!count) {
        while(true) {
            count = prompt(errmsg+'Enter new message limit count',currVal);
            if(FctsTools.isBlank(count)) {
                count = currVal;
                break;
            }
            if(!FctsTools.isNumber(count)) {
                errmsg = 'The count value must be a number.\n';
                continue;
            }
            if(count > this._msgCountLimit) {
                errmsg = 'The count value cannot be greater than '+this._msgCountLimit+'.\n';
                continue;
            }
            if(count < this._msgCountMin) {
                errmsg = 'The count value cannot be less than '+this._msgCountMin+'.\n';
                continue;
            }
            break;
        }
    }
    limitBtn.innerHTML = count;
};
/**
 * Sets the message layout display to either 'brief' or 'detail'.  If Log Hound
 * is active, the message layout in the UI will then be changed to the
 * indicated layout.  If no argument or <code>null</code> is passed to this
 * function, the message layout will be toggled between the 'brief' and
 * 'detail' layouts.
 * <p>The layout can be set before Log Hound is set up.</p>
 * @param {String|null} layout Can be the values 'brief', 'display', or you can
 * pass no value at all.
 * @return <code>true</code> if the function call resulted in the message
 * layout being changed, otherwise <code>false</code>.
 * @devnote This is set up so that at some point more layout options can be
 * handled.
 */
LogHound.prototype.setMessageLayout = function(layout) {
    if(layout==null) {
        this.msgDispMode = (this.msgDispMode=='brief' ? 'detail' : 'brief');
    } else if((layout instanceof String) || ((typeof layout)=='string')) {
        if(this.msgDispMode==layout) { return false; }
        if('brief'==layout || 'detail'==layout) {
            this.msgDispMode = layout;
        }
    } else {
        return false;
    }
    if(!this.initialised || !this.enabled) { return false; }
    var briefMsgRecs = document.getElementsByClassName('lhMsgRecBrief');
    for(var len=briefMsgRecs.length,idx=0; idx<len; idx++) {
        briefMsgRecs[idx].style.display = (this.msgDispMode=='brief' ? '' : 'none');
    }
    var detailMsgRecs = document.getElementsByClassName('lhMsgRecDetail');
    for(var len=detailMsgRecs.length,idx=0; idx<len; idx++) {
        detailMsgRecs[idx].style.display = (this.msgDispMode=='brief' ? 'none' : '');
    }
    return true;
};
/**
 * @returns {String} The current message layout.
 */
LogHound.prototype.getMessageLayout = function() {
    return this.msgDispMode;
};
/**
 * @param {String} mode The tag filter mode.  Must be one of four values:
 * <ol>
 * <li>any</li>
 * <li>exc</li>
 * <li>int</li>
 * <li>ony</li>
 * </ol>
 * @private
 */
LogHound.prototype.setTagFilterMode = function(mode) {
    this.tagMode = ((mode!='any' && mode!='int' && mode!='exc' && mode!='ony') ? 'any' : mode);
    this.addMsgFilter(new LogHoundMessageTagFilter(FctsTools.getOptionValues(this.tagsViewElmt),this.tagMode));
    this.applyMsgFilters();
};
/**
 * When set to <code>true</code> Log Hound will be completely blocked from
 * being initialised via the doSetup() function.  This function is usually
 * used to prevent Log Hound from initilising on a global basis in instances
 * where your code is in an environment that you do not want the Log Hound UI
 * to be seen: the public version of your site as opposed to the development
 * version of your site, for instance.
 * @param {boolean} killSwitch Set to true to block Log Hound from being
 * initialised.
 */
LogHound.prototype.setKillSwitch = function(killSwitch) {
    if(killSwitch!=null && killSwitch==false) {
        this.killSwitch = false;
    } else {
        this.killSwitch = true;
    }
};
/**
 * Enable or disable logging. When set to false, logging is completely disabled,
 * which means no messages are processed or stored and Log Hound is basically
 * turned "off".
 * @param {boolean} enable Set to <code>true</code to enable logging, otherwise
 * <code>false</code>.
 */
LogHound.prototype.enableLogging = function(enable) {
    if(!this.initialised) { return false; }
    if(enable!=null && enable==false) {
        this.enabled = false;
    } else {
        this.enabled = true;
    }
};
/**
 * @returns {boolean} <code>true</code> if logging is enabled.  This includes
 * if the kill switch is disabled as well.  If logging is disabled or the kill
 * switch is enabled, returns <code>false</code>.
 */
LogHound.prototype.isLoggingEnabled = function() {
    return this.enabled;
};
/**
 * If set to a value that equates to 'true', the Log Hound UI will be shown on
 * the page.  If set to a 'false' value, Log Hound will be hidden. If no value
 * is argumented, this function acts as a toggle. Please note that while
 * hidden, Log Hound is still active and will continue to log messages.
 * @param {boolean|String} show A value that equates to 'true'
 * <p>Values that equate to true:
 * <ul>
 * <li>true</li>
 * <li>'true'</li>
 * <li>'show'</li>
 * </ul>
 * All other values except <code>null</code> equate to false.
 */
LogHound.prototype.show = function(show) {
    if(!this.initialised || !this.enabled) { return; }
    show = FctsTools.parseToBool(show,['show']);
    if(show==null) {
        show = !this.logPlate['lhIsShowing'];
    }
    if(show) {
        this.logPlate['lhIsShowing'] = true;
        this.logPlate.style.display = 'table';
        this.interfaceMonitor('start');
    } else {
        this.logPlate['lhIsShowing'] = false;
        this.interfaceMonitor('stop');
        this.logPlate.style.display = 'none';
    }
};
/**
 * @return {boolean} <code>true</code> if the UI is currently visible,
 * otherwise <code>false</code>.
 */
LogHound.prototype.isShowing = function() {
    return this.logPlate['lhIsShowing'];
};
/**
 * @return {LogHoundLevel} The current logging level in the form of a
 * LogHoundLevel object.
 */
LogHound.prototype.getLogLevel = function() {
    return this.logLevel;
};
/**
 * @param {LogHoundLevel} level The level object representing the level at
 * which and above the logger will record incoming messages.
 */
LogHound.prototype.setLogLevel = function(level) {
    level = LogHoundLevels.getLevel(level);
    if(level==null) { return; }
    this.logLevel = level;
    // If the kill switch is enabled, can't access non-existant UI.
    if(!this.initialised || !this.enabled) {
        return false;
    }
    var lvlSelect = document.getElementById('lhLvlSelect');
    if(level.getId()!=lvlSelect.options[lvlSelect.selectedIndex].value) {
        for(var i=0; i<lvlSelect.options.length; i++) {
            if(level.getId()==lvlSelect.options[i].value) {
                lvlSelect.selectedIndex = i;
            }
        }
    }
};
/**
 * If set to a value that equates to 'true', the interface monitor will be
 * started.  If set to a 'false' value, the interface monitor will be stopped.
 * If no value is argumented, this function acts as a toggle.
 * @param {boolean|String} start A value that equates to 'true'
 * <p>Values that equate to true:
 * <ul>
 * <li>true</li>
 * <li>'true'</li>
 * <li>'start'</li>
 * </ul>
 * All other values except <code>null</code> equate to false.
 * @private
 */
LogHound.prototype.interfaceMonitor = function(start) {
    if(!this.initialised || !this.enabled) { return; }
    start = FctsTools.parseToBool(start,['start']);
    if(start==null) {
        start = (!this.debugWindowMonitorRef);
    }
    if(start) {
        this.debugWindowMonitorRef = setInterval('window.loghound.stickLogPlateTopRight()', 200);
    } else {
        clearInterval(this.debugWindowMonitorRef);
        this.debugWindowMonitorRef = null;
    }
};
/**
 * Shows or hides all messages for the specified level. If the 'show' argument
 * is null or not passed in, this function will toggle the visibility of the
 * specified level messages.
 * @param {String|Number|LogHoundLevel} level The log level to show, hide, or
 * toggle.
 * @param {String|boolean} show <code>true</code> if you want the messages of
 * the argumented level to be visible, <code>false</code> if you want to hide
 * the level messages, or <code>null</code> or do not pass a value to toggle
 * the target level's messages.
 * <p>Values that equate to true:
 * <ul>
 * <li>true</li>
 * <li>'true'</li>
 * <li>'show'</li>
 * </ul>
 * All other values except <code>null</code> equate to false.
 */
LogHound.prototype.showMessageLevel = function(level,show) {
    var levelObj = null;
    if((typeof level)=='number' || (level instanceof String) || ((typeof level)=='string')) {
        levelObj = LogHoundLevels.getLevel(level);
    } else if(level instanceof LogHoundLevel) {
        levelObj = level;
    } else {
        return false;
    }
    show = FctsTools.parseToBool(show,['show']);
    var levelBtn = document.getElementById('lhCtrlLvl'+FctsTools.capitaliseFirstLetter(levelObj.getName()));
    show = (show==null ? !(levelObj.isEnabled()) : show);
    if(show == levelBtn.isShowing) {
        return;
    }
    if(!show) {
        FctsTools.addStyleClass(levelBtn,'lhCtrlLvlOff');
        levelObj.setEnabled(false);
    } else {
        FctsTools.removeStyleClass(levelBtn,'lhCtrlLvlOff');
        levelObj.setEnabled(true);
    }
    this.applyMsgFilters();
};
/**
 * Adds a filter which extends LogHoundMessageFilter to the message filter
 * array.  You can add your own filters to the standard set by creating your
 * own LogHoundMessageFilter implementation and submitting it to this function.
 * <p>Each filter MUST have a unique ID.  Submitting a filter with an existing
 * ID will replace the existing filter with the submitted filter.
 * @param {LogHoundMessageFilter} newFilter The message filter to add to the
 * internal array.
 */
LogHound.prototype.addMsgFilter = function(newFilter) {
    if(!newFilter.getId || !(newFilter instanceof LogHoundMessageFilter)) {
        alert('Argumented object is not a LogHoundMessageFilter.');
        return;
    }
    var newFilterArray = [];
    var msgFilter = null;
    for(var i=0; i<this.msgFilters.length; i++) {
        msgFilter = this.msgFilters[i];
        if(msgFilter.getId()!=newFilter.getId()) {
            newFilterArray.push(msgFilter);
        }
    }
    this.msgFilters = newFilterArray;
    this.msgFilters.push(newFilter);
};
/**
 * Applies all the currently active message filters to the displayed message
 * rows.
 * @private
 */
LogHound.prototype.applyMsgFilters = function() {
    for(var len=this.msgRecords.length, i=0; i<len; i++) {
        this.filterMessage(this.msgRecords[i]);
    }
    //var ts = (new Date()).getTime();
    //this.logTrace('Message filters applied in '+((new Date()).getTime()-ts)+'ms',['LogHound','applyMsgFilters()']);
};
LogHound.prototype.filterMessage = function(msgRec) {
    msgRec['element'].style.display = (this.isMessageFiltered(msgRec) ? 'block' : 'none');
};
/**
 * Filters a message record based on the currently active message filters.
 * @param {String[]} msgRec The target string array message record.
 * @return {boolean} <code>true</code> if the message record should be visible
 * based on the currently active filters, <code>false</code> if the record
 * should not be visible.
 */
LogHound.prototype.isMessageFiltered = function(msgRec) {
    for(var len=this.msgFilters.length, i=0; i<len; i++) {
        if(!this.msgFilters[i].showMessage(msgRec)) {
            return false;
        }
    }
    return true;
};
/**
 * Controls whether or not the Log Hound user interface is in "shade mode",
 * where only the header strip is visible in order to stay out of the user's
 * way.  If no argument or <code>null</code> is passed, this method acts as a
 * toggle.
 * @param {boolean|null} shade <code>true</code> if the user interface should
 * roll up into shade mode, <code>false</code> for the user interface to roll
 * out. <code>null</code> to toggle the mode.
 */
LogHound.prototype.setShadeState = function(shade) {
    if(!this.initialised || !this.enabled) { return; }
    // Make sure shade state is set.
    this._shadeState = this.domLogsPanelPlate.style.display=='none';
    shade = FctsTools.parseToBool(shade);
    shade = (shade==null ? !this._shadeState : shade);
    if(this._shadeState==shade) { return; }
    var toggleBtn = document.getElementById('lhBtnShade');
    for(var i=0;i<this._viewPlates.length;i++) {
        var target = this._viewPlates[i];
        if(shade) {
            target.lhShadeSave = (FctsTools.getStyleValue(target,'display')!='none');
            this.setPanelDisplay(target,false);
            target.lhShadeState = true;
        } else {
            target.lhShadeState = false;
            this.setPanelDisplay(target,target.lhShadeSave);
        }
    }
    toggleBtn.innerHTML = (shade ? 'v' : '^');
    this._shadeState = shade;
};
/**
 * @returns {boolean} <code>true</code> if the interface is in shade mode,
 * otherwise <code>false</code>.
 */
LogHound.prototype.isShaded = function() {
    this._shadeState;
};
/**
 * @param {Object} panel The DOM reference to the target panel which will have its visibility modified.
 * @param {boolean|null} cmd <code>true</code> if the panel should be displayed, <code>false</code> if the panel should
 * be hidden, and <code>null</code> to toggle the display from the current state.
 * @returns {boolean} True if the panel was displayed, false if it was hidden.
 */
LogHound.prototype.setPanelDisplay = function(panel,cmd) {
    if(panel.lhShadeState || !this.initialised || !this.enabled) { return; }
    var displayStyle = FctsTools.getStyleValue(panel,'display');
    if(panel.lhDisplayStyle=='none') {
        panel.lhDisplayStyle = displayStyle;
    }
    var displayState = (displayStyle!='none');
    cmd = FctsTools.parseToBool(cmd);
    cmd = (cmd==null ? !displayState : cmd);
    if(displayState==cmd) { return; }
    panel.style.display = (cmd ? panel.lhDisplayStyle : 'none');
    return cmd;
};
/**
 * Adjusts the size of the message pane to show more or less log messages. The
 * message pane will not be adjusted over its maximum hight or under its
 * minimum height.
 * @param {boolean|String|number} adjustment
 * @returns {boolean} <code>true</code> if the message pane was adjusted,
 * otherwise <code>false</code>.
 */
LogHound.prototype.adjustMessagePaneSize = function(adjustment) {
    if(this._shadeState || !this.initialised || !this.enabled) { return; }
    if((typeof adjustment)==='boolean') {
        adjustment = (adjustment ? 75 : -75);
    } else if((adjustment instanceof String) || ((typeof adjustment)=='string')) {
        adjustment = FctsTools.parseToBool(adjustment,['more']);
        adjustment = (adjustment ? 75 : -75);
    } else if((typeof adjustment)==='number') {
        // If it's a number, we're good.
    } else {
        return false;
    }
    return this.setMessagePaneSize(this.domLogsPanelPlate.offsetHeight+adjustment);
};
/**
 * Sets the message pane size to a specific height.  The upper and lower bounds
 * for the height are 600 and 75 respectively.  Calls argumenting sizes outside
 * those bounds will be ignored.
 * @param {number} size The new height to set the message pane to.
 * @returns {boolean} <code>true</code> if the message pane was adjusted,
 * otherwise <code>false</code>.
 */
LogHound.prototype.setMessagePaneSize = function(size) {
    if(this._shadeState || !this.initialised || !this.enabled) { return; }
    if((typeof size)!=='number') {
        return false;
    }
    var logsPanelBody = document.getElementById('lhLogsPanelBody');
    var currHeight = parseInt(FctsTools.getStyleValue(logsPanelBody,'height'),10);
    if(currHeight==size || size>600 || size<75) {
        return false;
    }
    logsPanelBody.style.height = size+'px';
};
LogHound.prototype.stickLogPlateTopRight = function() {
    var plateWidth = this.logPlate.offsetWidth;
    var scrollTop = FctsTools.scrollTop();
    var scrollLeft = FctsTools.scrollLeft();
    /*
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();
    */
    this.logPlate.style.left=((FctsTools.viewWidth()-plateWidth+scrollLeft)+'px');
    this.logPlate.style.top=(scrollTop+'px');
    this.logPlate.style.zIndex=''+5000;
};
LogHound.prototype.stickLogPlateBottomLeft = function() {
    var plateHeight = this.logPlate.offsetHeight;
    var winHeight = FctsTools.windowHeight();
    var scrollTop = FctsTools.scrollTop();
    this.logPlate.style.left=0;
    this.logPlate.style.top=(winHeight-plateHeight+scrollTop);
    this.logPlate.style.zIndex=5000;
};
/**
 * Iterates through all visible messages and hides any that do not match the
 * argumented string.  Calling this function will overwrite any existing value
 * in the search text box.
 * @param {String} textToMatch The text to search for in any visible messages.
 */
LogHound.prototype.search = function(textToMatch) {
    if(FctsTools.isBlank(textToMatch)) {
        textToMatch = this.searchField.value;
    } else {
        this.searchField.value = textToMatch;
    }
    if(FctsTools.isBlank(textToMatch)) {
        textToMatch = '';
    }
    textToMatch = FctsTools.escapeRegex(textToMatch);
    var searchFilter = new LogHoundTextSearchFilter(textToMatch);
    this.addMsgFilter(searchFilter);
    this.applyMsgFilters();
};
/**
 * @returns {boolean} <code>true</code> if all the argumented tags were
 * accepted, otherwise <code>false</code>.
 * @private
 */
LogHound.prototype.addTags = function(tagz) {
    if(tagz==null || !tagz.length || tagz.length<1) {
        return true;
    }
    for(var i=0;i<tagz.length; i++) {
        if(!(this.tagNameRegex.test(tagz[i]))) {
            return false;
        }
    }
    this.tagsSelectElmt = document.getElementById('lhAvailTagsSelect');
    foundMatch:
    for(var i=0;i<tagz.length; i++) {
        for(var j=0; j<this.msgTags.length; j++) {
            if(tagz[i].toLowerCase()==this.msgTags[j].toLowerCase()) {
               continue foundMatch;
            }
        }
        if(FctsTools.isBlank(tagz[i])) { continue; }
        this.msgTags.push(tagz[i]);
        this.tagsSelectElmt.options[this.tagsSelectElmt.length] = new Option(tagz[i], tagz[i]);
    }
    FctsTools.sortOptionsByText(this.tagsSelectElmt);
    return true;
};
/**
 * Logs a message at the "trace" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logTrace = function() { this.log(LogHoundLevels['TRACE'],arguments); };
/**
 * Logs a message at the "debug" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logDebug = function() { this.log(LogHoundLevels['DEBUG'],arguments); };
/**
 * Logs a message at the "info" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logInfo = function() { this.log(LogHoundLevels['INFO'],arguments); };
/**
 * Logs a message at the "warn" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logWarn = function() { this.log(LogHoundLevels['WARN'],arguments); };
/**
 * Logs a message at the "error" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logError = function() { this.log(LogHoundLevels['ERROR'],arguments); };
/**
 * Logs a message at the "fatal" level.  The arguments for this method are
 * handled by a special argument parser, so the order of the arguments does
 * not matter.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 * <code>false</code> if the message was rejected for some reason.
 */
LogHound.prototype.logFatal = function() { this.log(LogHoundLevels['FATAL'],arguments); };
/**
 * Parses the Javascript "arguments" object and separates the atomic Log Hound
 * argument types.
 * @private
 */
LogHound.prototype.parseLoggingArgs = function() {
    var argArray = [];
    for(var i=0; i<arguments.length; i++) {
        argArray[i] = arguments[i];
    }
    var msgRec = [];
    for(var i=0; i<argArray.length; i++) {
        if(argArray[i]==null) { continue; }
        if((typeof argArray[i])=='object' && !(argArray[i] instanceof Array) && argArray[i].length) {
            for(var j=0; j<argArray[i].length; j++) {
                argArray[argArray.length] = argArray[i][j];
            }
        } else if(argArray[i] instanceof Array) {
            msgRec['tags'] = argArray[i];
            var tmpArray = [];
            for(var x=0; x<msgRec['tags'].length; x++) {
                if(!FctsTools.isBlank(msgRec['tags'][x])) {
                    tmpArray[tmpArray.length] = msgRec['tags'][x];
                }
            }
            msgRec['tags'] = tmpArray;
        } else if(argArray[i] instanceof LogHoundLevel) {
            msgRec['level'] = argArray[i];
        } else if(argArray[i] instanceof String || (typeof argArray[i])==='string') {
            msgRec['text'] = argArray[i];
        } else if(argArray[i] instanceof Error) {
            msgRec['error'] = argArray[i];
        }
    }
    return msgRec;
};
/**
 * @private
 */
LogHound.prototype._updateLogTotals = function(level) {
    if(!level) {
        for(var len=LogHoundLevels.length,i=0; i<len; i++) {
            level = LogHoundLevels[i];
            if(!this.msgRecords[level.getName()+'Count']) {
                this.msgRecords[level.getName()+'Count'] = 0;
                this.msgRecords[level.getName()+'CtrlBtn'] = document.getElementById('lhCtrlLvl'+level.getLabel());
            }
            this.msgRecords[level.getName()+'Count'] = 0;
            this.msgRecords[level.getName()+'CtrlBtn'].innerHTML = 0;
        }
    } else {
        if(!this.msgRecords[level.getName()+'Count']) {
            this.msgRecords[level.getName()+'Count'] = 0;
            this.msgRecords[level.getName()+'CtrlBtn'] = document.getElementById('lhCtrlLvl'+level.getLabel());
        }
        this.msgRecords[level.getName()+'Count']++;
        this.msgRecords[level.getName()+'CtrlBtn'].innerHTML = this.msgRecords[level.getName()+'Count'];
    }
};
/**
 * Main logging function - this is where all log messages go to die... or be
 * displayed. The arguments for this method are handled by a special argument
 * parser, so the order of the arguments does not matter.
 * @param {LogHoundLevel} --- The log level of the message.
 * @param {String} --- The message to be logged.
 * @param {String[]} --- An array of string tags to assign to the message.
 * @param {Error} --- A javascript error to parse and display.
 * @returns {boolean} <code>true</code> if the message was logged, or
 */
LogHound.prototype.log = function() {
    // If the kill switch is enabled, throw away messages and do absolutely nothing.
    if(!this.initialised || !this.enabled) {
        return false;
    }
    var msgRec = this.parseLoggingArgs(arguments);
    msgRec['tags'] = (msgRec['tags']==null ? {} : msgRec['tags']);
    msgRec['timestamp'] = new Date();

    // Since the ESP module is not finished, we cannot do anything without a log level.
    if(msgRec['level']==null || this.logLevel.getId()>msgRec['level'].getId()) {
        return false;
    }
    if(FctsTools.isBlank(msgRec['text'])) {
        return false;
    }
    // add all unique tags to master active tag list
    if(!this.addTags(msgRec['tags'])) {
        return false;
    }
    msgRec['number'] = this.msgCount++;
    this.msgRecords.push(msgRec);
    this._updateLogTotals(msgRec['level']);

    // Add message to display
    var rowColor = (msgRec['number']%2 == 0 ? 'lhLogMsgRow1' : 'lhLogMsgRow2');
    var msgElmt = document.createElement('DIV');
    var levelText = FctsTools.capitaliseFirstLetter(msgRec['level'].getName());
    var msgId = 'logmsg'+msgRec['number'];
    msgElmt.setAttribute('id', msgId);
    msgElmt.setAttribute('class','lh'+levelText+'Msg logMsg '+rowColor);
    msgElmt.setAttribute('className','lh'+levelText+'Msg logMsg '+rowColor);
    msgElmt.setAttribute('lhLogLevel', msgRec['level'].getName());
    msgElmt.style.display = (msgRec['level'].isEnabled()==true ? 'block' : 'none');

    var msgText = msgRec['text'];
    if(msgRec['error']!=null) {
        msgText += '<br/><hr/>';
        msgText += 'Error: '+msgRec['error'].name+' at line '+msgRec['error'].lineNumber+'<br/>';
        msgText += 'Message: '+msgRec['error'].message+'<br/>';
        if(msgRec['error'].stack!=null) {
            msgText += 'Stack:<br/>'+msgRec['error'].stack.replace('\n','<br/>');
        }
    }

    var msgFullEntryDisp = ((this.msgDispMode=='detail') ? '' : 'none');
    var msgFullEntry = '<table id="lhMsgDetail_'+msgRec['number']+'" class="lhMsgRecDetail" style="display:'+msgFullEntryDisp+';"><tr>';
    msgFullEntry +=    '<td class="lhMsgNum2 lhLogMsgElmt lhSmFont"><div class="lh'+levelText+'Msg">'+msgRec['number']+'</div></td>';
    msgFullEntry +=    '<td class="lhMsgLvl lhLogMsgElmt lhSmFont"><div class="lh'+levelText+'Msg">'+msgRec['level'].getName()+'<div></td>';
    msgFullEntry +=    '<td class="lhMsgTime lhLogMsgElmt lhSmFont lh'+levelText+'Msg">'+this.getTimestampText(msgRec['timestamp'])+'</td>';
    msgFullEntry +=    '<td class="lhMsgTags lhLogMsgElmt lhSmFont"><table><tr><td class="lhSmFont lh'+levelText+'Msg">'+((msgRec['tags'] instanceof Array) ? msgRec['tags'] : '')+'</td></tr></table></td>';
    msgFullEntry +=    '</tr><tr>';
    msgFullEntry +=    '<td colspan="4" class="lhMsgTxtDetail lhLogMsgElmt lhFont"><table><tr><td class="lhSmFont lh'+levelText+'Msg">'+msgText+'</td></tr></table></td>';
    msgFullEntry +=    '</tr></table>';

    var msgEntryDisp = ((this.msgDispMode=='brief') ? '' : 'none');
    var msgEntry = '<table id="lhMsgBrief_'+msgRec['number']+'" class="lhMsgRecBrief" style="display:'+msgEntryDisp+'"><tr>';
    msgEntry +=    '<td class="lhMsgNum lhLogMsgElmt lhSmFont"><div class="lh'+levelText+'Msg">'+msgRec['number']+'</div></td>';
    msgEntry +=    '<td class="lhMsgTime lhLogMsgElmt lhSmFont lh'+levelText+'Msg">'+this.getTimestampText(msgRec['timestamp'])+'</td>';
    msgEntry +=    '<td class="lhMsgTxt lhLogMsgElmt lhSmFont"><table><tr><td class="lhSmFont lh'+levelText+'Msg">'+msgText+'</td></tr></table></td>';
    msgEntry +=    '</tr></table>';

    msgElmt.innerHTML=msgFullEntry+msgEntry;
    var logsBody = document.getElementById('lhLogsPanelBody');
    var children = logsBody.childNodes;
    if(children==null || children.length<1) {
        logsBody.appendChild(msgElmt);
    } else {
        logsBody.insertBefore(msgElmt,children[0]);
    }
    var targetTableId = 'lhMsg'+((this.msgDispMode=='detail') ? 'Detail' : 'Brief')+'_'+msgRec['number'];
    var targetTable = document.getElementById(targetTableId);
    targetTable.style.display = 'none';
    targetTable.style.display = '';
    // Add message DOM element to record.
    msgRec['element'] = document.getElementById(msgId);
    // Filter message
    this.filterMessage(msgRec);
    return true;
};
/**
 * @param {boolean} [force] <code>true</code> to bypass the confirmation dialog and clear the logs, <code>false</code>
 * or <code>undefined</code> to have a dialog box ask the user first before clearing the logs.
 */
LogHound.prototype.clearLogs = function(force) {
    if(force || confirm('Clear all logs?')) {
        var logsBody = document.getElementById('lhLogsPanelBody');
        while(logsBody.hasChildNodes()) {
            logsBody.removeChild(logsBody.lastChild);
        }
        // set level message totals to 0
        for(var len=LogHoundLevels.length, i=0; i<len; i++) {
            this.msgRecords[LogHoundLevels[i].getName()] = 0;
        }
        var clearedRecs = this.msgRecords;
        this.msgRecords = [];
        this._updateLogTotals();
        this.msgTags = [];
        this.tagsSelectElmt.selectedIndex = -1;
        this.tagsSelectElmt.options.length = 0;
        this.tagsViewElmt.selectedIndex = -1;
        this.tagsViewElmt.options.length = 0;
        this.logInfo('All messages have been cleared.');
        return clearedRecs;
    }
};
/**
 * @returns {
 */
LogHound.prototype.getMessageRecords = function() {
    return this.msgRecords;
};
/**
 * @param {Date} ts The date to format.
 * @returns {String} The formatted timestamp string.
 * @private
 */
LogHound.prototype.getTimestampText = function(ts) {
    var hour = ts.getHours();
    var minute = ts.getMinutes();
    var second = ts.getSeconds();
    var millis = ts.getMilliseconds();
    var tsTxt = ((hour<10) ? '0'+hour : hour)+':';
    tsTxt += ((minute<10) ? '0'+minute : minute)+':';
    tsTxt += ((second<10) ? '0'+second : second)+'.';
    tsTxt += ((millis<10) ? '00'+millis : ((millis<100) ? '0'+millis : millis));
    return tsTxt;
};
/**
 * Moves selected tag entries in the available and viewing tag select boxes
 * from one box to the other based on the argumented action.
 * @param {String} action Can be one of four values:
 * <ul>
 * <li>'add' adds any selected tags from the available list to the "view" list.</li>
 * <li>'addAll' adds all tags from the available list to the "view" list.</li>
 * <li>'rem' removes any selected tags from the view list.</li>
 * <li>'remAll' removes all tags from the view list.</li>
 * </ul>
 * @private
 */
LogHound.prototype.moveTagAssignments = function(action) {
    if(action == 'add') {
        if(this.tagsSelectElmt.options.length<1 || this.tagsSelectElmt.selectedIndex<0) { return; }
        FctsTools.moveSelected(this.tagsSelectElmt, this.tagsViewElmt);
    } else if(action == 'addAll') {
        if(this.tagsSelectElmt.options.length<1) { return; }
        FctsTools.moveAllOptions(this.tagsSelectElmt, this.tagsViewElmt);
    } else if(action == 'rem') {
        if(this.tagsViewElmt.options.length<1 || this.tagsViewElmt.selectedIndex<0) { return; }
        FctsTools.moveSelected(this.tagsViewElmt, this.tagsSelectElmt);
    } else if(action == 'remAll') {
        if(this.tagsViewElmt.options.length<1) { return; }
        FctsTools.moveAllOptions(this.tagsViewElmt, this.tagsSelectElmt);
    }
    FctsTools.sortOptionsByText(this.tagsSelectElmt);
    FctsTools.sortOptionsByText(this.tagsViewElmt);
    this.addMsgFilter(new LogHoundMessageTagFilter(FctsTools.getOptionValues(this.tagsViewElmt),this.tagMode));
    this.applyMsgFilters();
};
/**
 * @private
 */
LogHound.prototype.getViewTags = function() {
    return FctsTools.getOptionValues(this.tagsViewElmt);
};
/**
 * @private
 */
LogHound.prototype.getAvailTags = function() {
    return FctsTools.getOptionValues(this.tagsSelectElmt);
};
/**
 * Base message filter class.  Extend this class and override methods to
 * create message filters.
 * @param {String} id A unique ID for the message filter.
 * @constructor
 */
function LogHoundMessageFilter(id) {
    if(FctsTools.isBlank(id)) {
        throw new Error('Message filter ID cannot be blank.');
    }
    this.id = id;
}
/**
 * @returns {String} The filter ID.
 */
LogHoundMessageFilter.prototype.getId = function() {
    return this.id;
};
/**
 * @param {Object} msgRec
 * @returns {boolean} <code>true</code> if the argumented message should be
 * shown, otherwise <code>false</code>.
 */
LogHoundMessageFilter.prototype.showMessage = function(msgRec) {
    return true;
};
/**
 * @augments LogHoundMessageFilter
 * @constructor
 */
function LogHoundMessageTagFilter(tagArray, tagMode) {
    LogHoundMessageTagFilter.baseConstructor.call(this, 'lhMsgTagFilter');
    this.tagz = tagArray;
    this.tagMode = ((tagMode==null || tagMode=='') ? 'any' : tagMode);
}
FctsTools.extend(LogHoundMessageTagFilter, LogHoundMessageFilter);
LogHoundMessageTagFilter.prototype.showMessage = function(msgRec) {
    if(this.tagz==null || this.tagz.length<1) {
        return true;
    }
    if(this.tagMode=='int') {
        if(!(msgRec['tags'] instanceof Array)) { return false; }
        if(msgRec['tags'].length<this.tagz.length) { return false; }
    }
    if(this.tagMode=='ony') {
        if(msgRec['tags'].length!=this.tagz.length) { return false; }
    }
    var matched = false;
    var intMatched = false;
    for(var targetIdx=0; targetIdx<this.tagz.length; targetIdx++) {
        intMatched = false;
        for(var tagIdx=0; tagIdx<msgRec['tags'].length; tagIdx++) {
            matched = (msgRec['tags'][tagIdx].toLowerCase() == this.tagz[targetIdx].toLowerCase());
            if(this.tagMode=='int' || this.tagMode=='ony') {
                intMatched = (intMatched || matched);
            } else if(matched && this.tagMode=='any') {
                return true;
            } else if(matched && this.tagMode=='exc') {
                return false;
            }
        }
        if((this.tagMode=='int' || this.tagMode=='ony') && !intMatched) { return false; }
    }
    return (this.tagMode=='exc' || this.tagMode=='int' || this.tagMode=='ony');
};
LogHoundMessageTagFilter.prototype.hasTag = function(tag,msgTags) {
    for(var i=0; i<msgTags.length; i++) {
        if(msgTags[tagIdx] == tag) {
            return true;
        }
    }
    return false;
};
/**
 * Message text search filter.
 * @class Provides the primary text searching functionality used by Log Hound.
 * @augments LogHoundMessageFilter
 */
function LogHoundTextSearchFilter(searchText) {
    LogHoundTextSearchFilter.baseConstructor.call(this, 'lhTxtSearchFilter');
    this.searchText = searchText;
    this.regex = new RegExp(searchText, 'i');
}
FctsTools.extend(LogHoundTextSearchFilter, LogHoundMessageFilter);
LogHoundTextSearchFilter.prototype.showMessage = function(msgRec) {
    if(this.searchText=='') {
        return true;
    }
    return msgRec['text'].search(this.regex)>=0;
};
/**
 * Message level filter.
 * @class Message filter used to filter messages by logging level.
 * @augments LogHoundMessageFilter
 */
function LogHoundMessageLevelFilter() {
    LogHoundTextSearchFilter.baseConstructor.call(this, 'lhMsgLvlFilter');
}
FctsTools.extend(LogHoundMessageLevelFilter, LogHoundMessageFilter);
LogHoundMessageLevelFilter.prototype.showMessage = function(msgRec) {
    return msgRec['level'].isEnabled();
};
if(window['loghound']==null) {
    window['loghound'] = new LogHound();
}


