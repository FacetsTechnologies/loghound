/**
 * Facets General Javascript Library
 * Version 1.0
 * Just a small collection of helper functions used by most of my javascript projects.
 *
 * Developer Notes:
 * http://stackoverflow.com/questions/210377/get-all-elements-in-an-html-document-with-a-specific-css-class
 * http://robertnyman.com/2008/05/27/the-ultimate-getelementsbyclassname-anno-2008/
 * http://ejohn.org/blog/getelementsbyclassname-speed-comparison/
 */

var FctsTools = {};
FctsTools.windowHeight = function() {
    return ((window.innerHeight) ? window.innerHeight : document.body.offsetHeight);
};
FctsTools.windowWidth = function() {
    return ((window.innerWidth) ? window.innerWidth : document.body.offsetWidth);
};
FctsTools.viewHeight = function() {
    return Math.max(document.documentElement.clientHeight,document.body.clientHeight);
};
FctsTools.viewWidth = function() {
    //return ((window.innerWidth) ? window.innerWidth : document.body.offsetWidth);
    //return document.body.offsetWidth;
    return Math.max(document.documentElement.clientWidth,document.body.clientWidth);
    //return document.body.scrollWidth;
    //return Math.min(document.body.clientWidth,document.body.offsetWidth);
};
FctsTools.scrollTop = function() {
     if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    } else {
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
};
FctsTools.scrollLeft = function() {
    return document.body.scrollLeft;
};
FctsTools.typeOf = function(value) {
    var s = typeof value;
    if(s==='object') {
        if(value) {
            if(typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
};
/**
 * Simple javascript object extender.
 */
FctsTools.extend = function(subClass, baseClass) {
    subClass.prototype = Object.create(baseClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.superClass = baseClass.prototype;
};
FctsTools.removeSelected = function(selectElmt) {
    var selectedArray = new Array();
    var newArray = new Array();
    for(var i=0;i<selectElmt.options.length;i++) {
        if(selectElmt.options[i].selected) {
            selectedArray[selectedArray.length] = selectElmt.options[i];
        } else {
            newArray[newArray.length] = selectElmt.options[i];
        }
    }
    FctsTools.setOptions(selectElmt,newArray);
    return selectedArray;
};
FctsTools.getSelected = function(selectElmt) {
    var selectedArray = new Array();
    for(var idx in selectElmt.options) {
        if(selectElmt.options[idx].selected) {
            selectedArray[selectedArray.length] = selectElmt.options[idx];
        }
    }
    return selectedArray;
};
/**
 * Replaces all the select element's options with the argumented options.
 * @param selectElmt
 * @param options
 */
FctsTools.setOptions = function(selectElmt, options) {
    selectElmt.options.length = 0;
    for(var idx in options) {
        selectElmt.options[selectElmt.options.length] = options[idx];
    }
};
/**
 * @param selectElmt The select element to which the argumented options will be added.
 * @param options An array object containing the options to add to the argumented select element.
 */
FctsTools.addOptions = function(selectElmt, options) {
    for(var idx in options) {
        selectElmt.options[selectElmt.options.length] = options[idx];
    }
};
/**
 * Moves all selected options from one select element to another
 * @param fromSelectElmt
 * @param toSelectElmt
 */
FctsTools.moveSelected = function(fromSelectElmt, toSelectElmt) {
    FctsTools.addOptions(toSelectElmt, FctsTools.removeSelected(fromSelectElmt));
};
/**
 *
 * @param fromSelectElmt
 * @param toSelectElmt
 */
FctsTools.moveAllOptions = function(fromSelectElmt, toSelectElmt) {
    var tempOptArr = new Array();
    for(var i=0; i<fromSelectElmt.options.length; i++) {
        tempOptArr[i] = fromSelectElmt.options[i];
    }
    for(var i=0; i<tempOptArr.length; i++) {
        toSelectElmt.options[toSelectElmt.options.length] = new Option(tempOptArr[i].text, tempOptArr[i].value);
    }
    fromSelectElmt.length = 0;
};
FctsTools.getOptionValues = function(selectElmt) {
    var valueArr = new Array();
    for(var i=0; i<selectElmt.options.length; i++) {
        valueArr[i] = selectElmt.options[i].value;
    }
    return valueArr;
};
FctsTools.sortOptions = function(selectElmt,sortFn) {
    var optionTemp = new Array();
    var optionValues = new Array();
    for(var i=0; i<selectElmt.options.length; i++) {
        optionTemp[i] = selectElmt.options[i];
        optionValues[i] = selectElmt.options[i].value;
    }
    selectElmt.options.length = 0;
    optionValues.sort(sortFn);
    for(var i=0; i<optionValues.length; i++) {
        for(var j=0; j<optionTemp.length; j++) {
            if(optionValues[i] == optionTemp[j].value) {
                selectElmt.options[selectElmt.options.length] = optionTemp[j];
                optionTemp.splice(j--,1);
                continue;
            }
        }
    }
};
FctsTools.sortOptionsByValue = function(selectElmt) {
    this.sortOptions(selectElmt,function(o1, o2) {
        if(FctsTools.isBlank(o1) && FctsTools.isBlank(o2)) {
            return 0;
        } else if(FctsTools.isBlank(o1) || FctsTools.isBlank(o2)) {
            return (FctsTools.isBlank(o1) ? -1 : 1);
        }
        if(document.all) { // IE sucks ass.
            o1 = new String(o1);
            o2 = new String(o2);
        }
        o1 = o1.toLowerCase();
        o2 = o2.toLowerCase();
        for(var i=0; i<o1.length; i++) {
            if(o1.charCodeAt(i) == o2.charCodeAt(i)) {
                continue;
            }
            return o1.charCodeAt(i) - o2.charCodeAt(i);
        }
        return 0;
    });
};
FctsTools.sortOptionsByText = function(selectElmt) {
    this.sortOptions(selectElmt,function(o1,o2) {
        if(FctsTools.isBlank(o1) && FctsTools.isBlank(o2)) {
            return 0;
        } else if(FctsTools.isBlank(o1) || FctsTools.isBlank(o2)) {
            return (FctsTools.isBlank(o1) ? -1 : 1);
        }
        if(document.all) { // IE sucks ass.
            o1 = new String(o1);
            o2 = new String(o2);
        }
        o1 = o1.toLowerCase();
        o2 = o2.toLowerCase();
        for(var i=0;i<o1.length;i++) {
            if(o1.charCodeAt(i)==o2.charCodeAt(i)) {
                continue;
            }
            return o1.charCodeAt(i)-o2.charCodeAt(i);
        }
        return 0;
    });
};
/**
 *
 * @param {String} str The string to test
 * @returns {boolean} Returns <code>true</code> if the string is undefined, null, or empty, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://stackoverflow.com/questions/154059/what-is-the-best-way-to-check-for-an-empty-string-in-javascript">What is the best way to check for an empty string in JavaScript?</a>.
 */
FctsTools.isEmpty = function(str) {
    return (!str || 0 === str.length);
};
/**
 *
 * @param {String} str The string to test
 * @returns {boolean} Returns <code>true</code> if the string is undefined, null, empty, or only whitespace, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://stackoverflow.com/questions/154059/what-is-the-best-way-to-check-for-an-empty-string-in-javascript">What is the best way to check for an empty string in JavaScript?</a>.
 */
FctsTools.isBlank = function(str) {
    return (!str || /^\s*$/.test(str));
};
/**
 *
 * @param {Object} obj The object to test.
 * @returns {boolean} Returns <code>true</code> if the argumented object really is a string, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://stackoverflow.com/questions/4891937/how-to-detect-if-variable-is-a-string">how to detect if variable is a string</a>.
 */
FctsTools.isString = function(obj) {
    return (typeof obj != 'undefined') && (Object.prototype.toString.call(obj) === '[object String]');
};
/**
 *
 * @param {Object} obj The object to test.
 * @param {Boolean} [strict=false] Set to <code>true</code> to reject if the argumented object is a string, even if it
 * could be parsed as a number.
 * @returns {boolean} Returns <code>true</code> if the arguemented number really is a number, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric">Validate numbers in JavaScript - IsNumeric()</a>.
 * @see <a target="_blank" href="http://dl.dropbox.com/u/35146/js/tests/isNumber.html">isNumber Test Cases</a>.
 */
FctsTools.isNumber = function(obj, strict) {
    if(!!strict && FctsTools.isString(obj)) {
        return false;
    }
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};
/**
 * @param {Object} obj The object to test.
 * @returns {boolean} Returns <code>true</code> if the argumented object really is a boolean, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://jsperf.com/alternative-isfunction-implementations/4">Alternative isFunction Implementations with verifications and several test types</a>.
 */
FctsTools.isBoolean = function(obj) {
    return (typeof obj != 'undefined') && (Object.prototype.toString.call(obj) === '[object Boolean]');
};
/**
 *
 * @param {Object} obj The object to test.
 * @returns {boolean} Returns <code>true</code> if the argumented object really is an array, otherwise
 * <code>false</code>.
 * @static
 */
FctsTools.isArray = function(obj) {
    return (typeof obj != 'undefined') && (Object.prototype.toString.call(obj) === '[object Array]');
};
/**
 * @param {Object} obj The object to test.
 * @returns {boolean} Returns <code>true</code> if the argumented object really is a function, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://jsperf.com/alternative-isfunction-implementations/4">Alternative isFunction Implementations with verifications and several test types</a>.
 */
FctsTools.isFunction = function(obj) {
    return (typeof obj != 'undefined') && (Object.prototype.toString.call(obj) === '[object Function]');
};
/**
 * @param {Object} obj The object to test.
 * @returns {boolean} Returns <code>true</code> if the argumented object really is an object, otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://jsperf.com/alternative-isfunction-implementations/4">Alternative isFunction Implementations with verifications and several test types</a>.
 */
FctsTools.isObject = function(obj) {
    return (typeof obj != 'undefined') && (Object.prototype.toString.call(obj) === '[object Object]');
};
/**
 *
 * @param {String} str The string to check.
 * @param {String} textToMatch The text to match.
 * @returns {boolean} Returns <code>true</code> if the argumented string starts with the "textToMatch", otherwise
 * <code>false</code>.
 * @static
 * @see <a target="_blank" href="http://stackoverflow.com/questions/646628/javascript-startswith">Javascript StartsWith</a>.
 */
FctsTools.startsWith = function(str,textToMatch) {
    return str.slice(0, textToMatch.length) == textToMatch;
};
FctsTools.escapeRegex = function(targetText) {
    if(!arguments.callee.sRE) {
        var specials = [
            '/', '.', '*', '+', '?', '|',
            '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp(
            '(\\' + specials.join('|\\') + ')', 'g'
        );
    }
    return targetText.replace(arguments.callee.sRE, '\\$1');
};
FctsTools.addStyleClass = function(elmt, classname) {
    if(elmt.className==null || elmt.className=='') {
        elmt.className = classname;
        return;
    }
    var classes = elmt.className.split(' ');
    for(idx in classes) {
        if(classes[idx]==classname) {
            return;
        }
    }
    classes.push(classname);
    elmt.className = classes.join(' ');
};
FctsTools.removeStyleClass = function(elmt, classname) {
    if(elmt.className==null || elmt.className=='') {
        return;
    }
    if(elmt.className==classname) {
        elmt.className = '';
    }
    var classes = elmt.className.split(' ');
    var newNames = new Array();
    for(idx in classes) {
        if(classes[idx]==classname) {
            continue;
        }
        newNames.push(classes[idx]);
    }
    elmt.className = newNames.join(' ');
};
FctsTools.replaceStyleClass = function(elmt, remClass, addClass) {
    this.removeStyleClass(elmt, remClass);
    this.addStyleClass(elmt, addClass);
};
/**
 * @param {DOMElement} elmt The target element.
 * @param {String} style The name of the target style.
 * @param {String} pseudoElmt A string specifying the pseudo-element to match. Must be null (or not specified) for
 * regular elements.
 */
FctsTools.getStyleValue = function(elmt, style, pseudoEmlt) {
    if(window.getComputedStyle) {
        return getComputedStyle(elmt, pseudoEmlt)[style];
    } else {
        return elmt.currentStyle[style];
    }
};
FctsTools.parseToBool = function(arg,altTrueArray) {
    if((typeof arg)=='undefined' || arg==null) { return null; }
    if((typeof arg)=='boolean') {
        return arg;
    }
    if(!(arg instanceof String) && !((typeof arg)=='string')) {
        return null;
    }
    if(altTrueArray!=null && (altTrueArray instanceof Array)) {
        for(var i=0; i<altTrueArray.length; i++) {
            if(arg==altTrueArray[i]) {
                return true;
            }
        }
    }
    return (arg=='true');
};
/**
 * @param {Object|String} element Either the DOM element reference or the string ID of the target.
 */
FctsTools.preventParentScroll = function(element) {
    if(FctsTools.isString(element)) {
        element = document.getElementById(element);
    }
    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
    if(element.attachEvent) { //if IE (and Opera depending on user setting)
        element.attachEvent('on'+mousewheelevt, function(event){
            //alert('Mouse wheel movement detected!');
        });
    } else if(element.addEventListener) { //WC3 browsers
        element.addEventListener(mousewheelevt, function(event, d){
            //event.preventDefault();
            //event.cancelBubble = true;
            event.stopPropagation();
            event.stopImmediatePropagation();
        }, true);
    }
};
/**
 *
 */
FctsTools.capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
};
/**
 * @return {Array} An array of the query parameters which will also act as an associative array (hashmap).
 * @see <a target="_blank" href="http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript">Get query string values in JavaScript</a>
 */
FctsTools.parseQueryString = function () {
    var urlParams = [];
    var e = null,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
        q = window.location.search.substring(1);

    while(e = r.exec(q)) {
        var name = d(e[1]);
        var value = d(e[2]);
        urlParams[name] = value;
        urlParams.push([name,value]);
    }
    return urlParams;
};
/**
 *
 */
FctsTools.preventEvent = function(evt) {
    evt = evt || window.event;
    if(evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = false;
};
