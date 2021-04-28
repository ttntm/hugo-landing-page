/*! Copyright InfoStyle */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	var _atail = __webpack_require__(3);

	var _atail2 = _interopRequireDefault(_atail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener('DOMContentLoaded', function () {
	  (function () {
	    [].slice.call(document.querySelectorAll('select')).forEach(function (el) {
	      el.classList.add('cs-select');
	      new SelectFx(el);
	    });
	  })();

	  var shareArray = JSON.parse(document.body.getAttribute('data-share'));

	  var shares = jQuery('.atail-sharing');

	  jQuery(shares).jsSocials({
	    url: shares.attr('data-url'),
	    text: shares.attr('data-text'),
	    showLabel: false,
	    showCount: true,
	    shares: shareArray
	  });
	});

	// Run Atali js

	var atail = new _atail2.default();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	/**
	 * selectFx.js v1.0.0
	 * http://www.codrops.com
	 *
	 * Licensed under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * Copyright 2014, Codrops
	 * http://www.codrops.com
	 */

	;(function (window) {

		'use strict';

		/*!
	  * classie - class helper functions
	  * from bonzo https://github.com/ded/bonzo
	  *
	  * classie.has( elem, 'my-class' ) -> true/false
	  * classie.add( elem, 'my-new-class' )
	  * classie.remove( elem, 'my-unwanted-class' )
	  * classie.toggle( elem, 'my-class' )
	  */

		/*jshint browser: true, strict: true, undef: true */
		/*global define: false */

		function classReg(className) {
			return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ('classList' in document.documentElement) {
			hasClass = function hasClass(elem, c) {
				return elem.classList.contains(c);
			};
			addClass = function addClass(elem, c) {
				elem.classList.add(c);
			};
			removeClass = function removeClass(elem, c) {
				elem.classList.remove(c);
			};
		} else {
			hasClass = function hasClass(elem, c) {
				return classReg(c).test(elem.className);
			};
			addClass = function addClass(elem, c) {
				if (!hasClass(elem, c)) {
					elem.className = elem.className + ' ' + c;
				}
			};
			removeClass = function removeClass(elem, c) {
				elem.className = elem.className.replace(classReg(c), ' ');
			};
		}

		function toggleClass(elem, c) {
			var fn = hasClass(elem, c) ? removeClass : addClass;
			fn(elem, c);
		}

		var classie = {
			// full names
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			// short names
			has: hasClass,
			add: addClass,
			remove: removeClass,
			toggle: toggleClass
		};

		// transport
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (classie), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			// browser global
			window.classie = classie;
		}

		/**
	  * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	  */
		function hasParent(e, p) {
			if (!e) return false;
			var el = e.target || e.srcElement || e || false;
			while (el && el != p) {
				el = el.parentNode || false;
			}
			return el !== false;
		};

		/**
	  * extend obj function
	  */
		function extend(a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		}

		/**
	  * SelectFx function
	  */
		function SelectFx(el, options) {
			this.el = el;
			this.options = extend({}, this.options);
			extend(this.options, options);
			this._init();
		}

		/**
	  * SelectFx options
	  */
		SelectFx.prototype.options = {
			// if true all the links will open in a new tab.
			// if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
			newTab: true,
			// when opening the select element, the default placeholder (if any) is shown
			stickyPlaceholder: true,
			// callback when changing the value
			onChange: function onChange(val) {
				return false;
			}
		};

		/**
	  * init function
	  * initialize and cache some vars
	  */
		SelectFx.prototype._init = function () {
			// check if we are using a placeholder for the native select box
			// we assume the placeholder is disabled and selected by default
			var selectedOpt = this.el.querySelector('option[selected]');
			this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

			// get selected option (either the first option with attr selected or just the first option)
			this.selectedOpt = selectedOpt || this.el.querySelector('option');

			// create structure
			this._createSelectEl();

			// all options
			this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

			// total options
			this.selOptsCount = this.selOpts.length;

			// current index
			this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

			// placeholder elem
			this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

			// init events
			this._initEvents();
		};

		/**
	  * creates the structure for the select element
	  */
		SelectFx.prototype._createSelectEl = function () {
			var self = this,
			    options = '',
			    createOptionHTML = function createOptionHTML(el) {
				var optclass = '',
				    classes = '',
				    link = '';

				if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
					classes += 'cs-selected ';
					this.foundSelected = true;
				}
				// extra classes
				if (el.getAttribute('data-class')) {
					classes += el.getAttribute('data-class');
				}
				// link options
				if (el.getAttribute('data-link')) {
					link = 'data-link=' + el.getAttribute('data-link');
				}

				if (classes !== '') {
					optclass = 'class="' + classes + '" ';
				}

				return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
			};

			[].slice.call(this.el.children).forEach(function (el) {
				if (el.disabled) {
					return;
				}

				var tag = el.tagName.toLowerCase();

				if (tag === 'option') {
					options += createOptionHTML(el);
				} else if (tag === 'optgroup') {
					options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
					[].slice.call(el.children).forEach(function (opt) {
						options += createOptionHTML(opt);
					});
					options += '</ul></li>';
				}
			});

			var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
			this.selEl = document.createElement('div');
			this.selEl.className = this.el.className;
			this.selEl.tabIndex = this.el.tabIndex;
			this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
			this.el.parentNode.appendChild(this.selEl);
			this.selEl.appendChild(this.el);
		};

		/**
	  * initialize the events
	  */
		SelectFx.prototype._initEvents = function () {
			var self = this;

			// open/close select
			this.selPlaceholder.addEventListener('click', function () {
				self._toggleSelect();
			});

			// clicking the options
			this.selOpts.forEach(function (opt, idx) {
				opt.addEventListener('click', function () {
					self.current = idx;
					self._changeOption();
					// close select elem
					self._toggleSelect();
				});
			});

			// close the select element if the target it´s not the select element or one of its descendants..
			document.addEventListener('click', function (ev) {
				var target = ev.target;
				if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
					self._toggleSelect();
				}
			});

			// keyboard navigation events
			this.selEl.addEventListener('keydown', function (ev) {
				var keyCode = ev.keyCode || ev.which;

				switch (keyCode) {
					// up key
					case 38:
						ev.preventDefault();
						self._navigateOpts('prev');
						break;
					// down key
					case 40:
						ev.preventDefault();
						self._navigateOpts('next');
						break;
					// space key
					case 32:
						ev.preventDefault();
						if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
							self._changeOption();
						}
						self._toggleSelect();
						break;
					// enter key
					case 13:
						ev.preventDefault();
						if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
							self._changeOption();
							self._toggleSelect();
						}
						break;
					// esc key
					case 27:
						ev.preventDefault();
						if (self._isOpen()) {
							self._toggleSelect();
						}
						break;
				}
			});
		};

		/**
	  * navigate with up/dpwn keys
	  */
		SelectFx.prototype._navigateOpts = function (dir) {
			if (!this._isOpen()) {
				this._toggleSelect();
			}

			var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

			if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
				// save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
				this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
				// remove focus class if any..
				this._removeFocus();
				// add class focus - track which option we are navigating
				classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
			}
		};

		/**
	  * open/close select
	  * when opened show the default placeholder if any
	  */
		SelectFx.prototype._toggleSelect = function () {
			// remove focus class if any..
			this._removeFocus();

			if (this._isOpen()) {
				if (this.current !== -1) {
					// update placeholder text
					this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
				}
				classie.remove(this.selEl, 'cs-active');
			} else {
				if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
					// everytime we open we wanna see the default placeholder text
					this.selPlaceholder.textContent = this.selectedOpt.textContent;
				}
				classie.add(this.selEl, 'cs-active');
			}
		};

		/**
	  * change option - the new value is set
	  */
		SelectFx.prototype._changeOption = function () {
			// if pre selected current (if we navigate with the keyboard)...
			if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
				this.current = this.preSelCurrent;
				this.preSelCurrent = -1;
			}

			// current option
			var opt = this.selOpts[this.current];

			// update current selected value
			this.selPlaceholder.textContent = opt.textContent;

			// change native select element´s value
			this.el.value = opt.getAttribute('data-value');

			// remove class cs-selected from old selected option and add it to current selected option
			var oldOpt = this.selEl.querySelector('li.cs-selected');
			if (oldOpt) {
				classie.remove(oldOpt, 'cs-selected');
			}
			classie.add(opt, 'cs-selected');

			// if there´s a link defined
			if (opt.getAttribute('data-link')) {
				// open in new tab?
				if (this.options.newTab) {
					window.open(opt.getAttribute('data-link'), '_blank');
				} else {
					window.location = opt.getAttribute('data-link');
				}
			}

			// callback
			this.options.onChange(this.el.value);
		};

		/**
	  * returns true if select element is opened
	  */
		SelectFx.prototype._isOpen = function (opt) {
			return classie.has(this.selEl, 'cs-active');
		};

		/**
	  * removes the focus class from the option
	  */
		SelectFx.prototype._removeFocus = function (opt) {
			var focusEl = this.selEl.querySelector('li.cs-focus');
			if (focusEl) {
				classie.remove(focusEl, 'cs-focus');
			}
		};

		/**
	  * add to global namespace
	  */
		window.SelectFx = SelectFx;
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 2014-07-23
	 *
	 * By Eli Grey, http://eligrey.com
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */

	/*global self, document, DOMException */

	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

	/* Copied from MDN:
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
	 */

	if ("document" in window.self) {

	  // Full polyfill for browsers with no classList support
	  // Including IE < Edge missing SVGElement.classList
	  if (!("classList" in document.createElement("_"))
	    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

	  (function (view) {

	    "use strict";

	    if (!('Element' in view)) return;

	    var
	        classListProp = "classList"
	      , protoProp = "prototype"
	      , elemCtrProto = view.Element[protoProp]
	      , objCtr = Object
	      , strTrim = String[protoProp].trim || function () {
	        return this.replace(/^\s+|\s+$/g, "");
	      }
	      , arrIndexOf = Array[protoProp].indexOf || function (item) {
	        var
	            i = 0
	          , len = this.length
	        ;
	        for (; i < len; i++) {
	          if (i in this && this[i] === item) {
	            return i;
	          }
	        }
	        return -1;
	      }
	      // Vendors: please allow content code to instantiate DOMExceptions
	      , DOMEx = function (type, message) {
	        this.name = type;
	        this.code = DOMException[type];
	        this.message = message;
	      }
	      , checkTokenAndGetIndex = function (classList, token) {
	        if (token === "") {
	          throw new DOMEx(
	              "SYNTAX_ERR"
	            , "An invalid or illegal string was specified"
	          );
	        }
	        if (/\s/.test(token)) {
	          throw new DOMEx(
	              "INVALID_CHARACTER_ERR"
	            , "String contains an invalid character"
	          );
	        }
	        return arrIndexOf.call(classList, token);
	      }
	      , ClassList = function (elem) {
	        var
	            trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
	          , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
	          , i = 0
	          , len = classes.length
	        ;
	        for (; i < len; i++) {
	          this.push(classes[i]);
	        }
	        this._updateClassName = function () {
	          elem.setAttribute("class", this.toString());
	        };
	      }
	      , classListProto = ClassList[protoProp] = []
	      , classListGetter = function () {
	        return new ClassList(this);
	      }
	    ;
	    // Most DOMException implementations don't allow calling DOMException's toString()
	    // on non-DOMExceptions. Error's toString() is sufficient here.
	    DOMEx[protoProp] = Error[protoProp];
	    classListProto.item = function (i) {
	      return this[i] || null;
	    };
	    classListProto.contains = function (token) {
	      token += "";
	      return checkTokenAndGetIndex(this, token) !== -1;
	    };
	    classListProto.add = function () {
	      var
	          tokens = arguments
	        , i = 0
	        , l = tokens.length
	        , token
	        , updated = false
	      ;
	      do {
	        token = tokens[i] + "";
	        if (checkTokenAndGetIndex(this, token) === -1) {
	          this.push(token);
	          updated = true;
	        }
	      }
	      while (++i < l);

	      if (updated) {
	        this._updateClassName();
	      }
	    };
	    classListProto.remove = function () {
	      var
	          tokens = arguments
	        , i = 0
	        , l = tokens.length
	        , token
	        , updated = false
	        , index
	      ;
	      do {
	        token = tokens[i] + "";
	        index = checkTokenAndGetIndex(this, token);
	        while (index !== -1) {
	          this.splice(index, 1);
	          updated = true;
	          index = checkTokenAndGetIndex(this, token);
	        }
	      }
	      while (++i < l);

	      if (updated) {
	        this._updateClassName();
	      }
	    };
	    classListProto.toggle = function (token, force) {
	      token += "";

	      var
	          result = this.contains(token)
	        , method = result ?
	          force !== true && "remove"
	        :
	          force !== false && "add"
	      ;

	      if (method) {
	        this[method](token);
	      }

	      if (force === true || force === false) {
	        return force;
	      } else {
	        return !result;
	      }
	    };
	    classListProto.toString = function () {
	      return this.join(" ");
	    };

	    if (objCtr.defineProperty) {
	      var classListPropDesc = {
	          get: classListGetter
	        , enumerable: true
	        , configurable: true
	      };
	      try {
	        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	      } catch (ex) { // IE 8 doesn't support enumerable:true
	        if (ex.number === -0x7FF5EC54) {
	          classListPropDesc.enumerable = false;
	          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	        }
	      }
	    } else if (objCtr[protoProp].__defineGetter__) {
	      elemCtrProto.__defineGetter__(classListProp, classListGetter);
	    }

	    }(window.self));

	    } else {
	    // There is full or partial native classList support, so just check if we need
	    // to normalize the add/remove and toggle APIs.

	    (function () {
	      "use strict";

	      var testElement = document.createElement("_");

	      testElement.classList.add("c1", "c2");

	      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	      // classList.remove exist but support only one argument at a time.
	      if (!testElement.classList.contains("c2")) {
	        var createMethod = function(method) {
	          var original = DOMTokenList.prototype[method];

	          DOMTokenList.prototype[method] = function(token) {
	            var i, len = arguments.length;

	            for (i = 0; i < len; i++) {
	              token = arguments[i];
	              original.call(this, token);
	            }
	          };
	        };
	        createMethod('add');
	        createMethod('remove');
	      }

	      testElement.classList.toggle("c3", false);

	      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	      // support the second argument.
	      if (testElement.classList.contains("c3")) {
	        var _toggle = DOMTokenList.prototype.toggle;

	        DOMTokenList.prototype.toggle = function(token, force) {
	          if (1 in arguments && !this.contains(token) === !force) {
	            return force;
	          } else {
	            return _toggle.call(this, token);
	          }
	        };

	      }

	      testElement = null;
	    }());
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // ==========================================================================
	// Atail
	// ==========================================================================

	// journalctl

	// Navigation
	// ==========================================================================


	var _navigation = __webpack_require__(4);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _optimizedResize = __webpack_require__(6);

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	var _projectPreview = __webpack_require__(7);

	var _projectPreview2 = _interopRequireDefault(_projectPreview);

	var _preloader = __webpack_require__(21);

	var _preloader2 = _interopRequireDefault(_preloader);

	var _allProjects = __webpack_require__(22);

	var _allProjects2 = _interopRequireDefault(_allProjects);

	var _scroll = __webpack_require__(19);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _es6Promise = __webpack_require__(13);

	var _objectFitImages = __webpack_require__(18);

	var _objectFitImages2 = _interopRequireDefault(_objectFitImages);

	var _ContactForm = __webpack_require__(23);

	var _ContactForm2 = _interopRequireDefault(_ContactForm);

	__webpack_require__(26);

	__webpack_require__(27);

	var _blogPostLike = __webpack_require__(28);

	var _blogPostDislike = __webpack_require__(30);

	var _slider = __webpack_require__(31);

	var _slider2 = _interopRequireDefault(_slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Functions
	// ==========================================================================

	// Globals Variables
	// ==========================================================================

	// Project Preview
	// ==========================================================================

	// Preloader
	// ==========================================================================

	// Project Preview
	// ==========================================================================

	// // Scroll
	// // ==========================================================================

	// // Lang menu
	// // ==========================================================================
	// import Lang from './lang/Lang';

	/**
	 *
	 *
	 * @class Atail
	 */
	var Atail = function () {
		function Atail() {
			_classCallCheck(this, Atail);

			this.init();
		}

		_createClass(Atail, [{
			key: "init",
			value: function init() {

				// navigation
				// projectPreiew

				// init preloader
				this.Preloader = new _preloader2.default();

				// init navigation
				this.Nav = new _navigation2.default();

				// init projectPreview
				this.projectPreview = new _projectPreview2.default();

				// init AllProjects
				this.allProjects = new _allProjects2.default();

				// init contact forms
				new _ContactForm2.default('.contact-form', 'php/index.php', 'contact');
				// init subscribe forms
				new _ContactForm2.default('.subscribe-form', 'php/index.php', 'subscribe');

				// init Sldier
				// this.slider = new Slider();

				// init Sldier
				// this.lang = new Lang();

				// init Scroll
				this.scroll = new _scroll2.default(_global2.default.main);

				this.initEvents();
			}
		}, {
			key: "initEvents",
			value: function initEvents() {
				var _this = this;

				// window load
				// document.ready
				// resize
				// click
				// scroll

				var promise = function promise() {
					return new _es6Promise.Promise(function (resolve, reject) {
						var result = true;
						if (result) {
							resolve(result);
						} else {
							reject(result);
						}
					});
				};

				window.addEventListener('load', function () {

					_this.slider = new _slider2.default();

					_this.allProjects.init();
					_this.scroll.init();
					_global2.default.windowIsLoad = true;
					_this.Preloader.showAtail();

					setTimeout(function () {

						(0, _objectFitImages2.default)('.intro-demo-image img');

						(0, _objectFitImages2.default)('.atail-text-logo img');

						(0, _objectFitImages2.default)('.atail-slider-item img');

						(0, _objectFitImages2.default)('.preview-images-item img');
						(0, _objectFitImages2.default)('.atail-post-title  img');
						(0, _objectFitImages2.default)('.atail-brands-item a img');
						(0, _objectFitImages2.default)('.atail-post-title img');
						(0, _objectFitImages2.default)('.figure-extended img');
						(0, _objectFitImages2.default)('.atail-post-most-likes img');
						(0, _objectFitImages2.default)('.widget_recent_entries img');
						(0, _objectFitImages2.default)('.widget_atail_recent_posts_widget img');
					}, 0);
				});

				// resize
				_optimizedResize.optimizedResize.add(function () {
					promise().then(function (result) {
						_global2.default.resize();
						_this.Preloader.resize();
						result = true;
						return result;
					}).then(function (result) {
						_this.Nav.resize();
						return result;
					}).then(function (result) {
						_this.projectPreview.resize();
						return result;
					}).then(function (result) {
						_this.allProjects.resize();
						return result;
					}).then(function (result) {
						_this.scroll.resize();
						return result;
					}).then(function (result) {
						return result;
						// console.log('All elements was resized successfully!');
					}).catch(function (reason) {
						console.error('Error when window was resizing!', reason);
					});
				});

				// click
				document.addEventListener('click', function (event) {
					var target = event.target,
					    action = target.getAttribute('data-action'),
					    isLink = target.tagName === 'A',
					    isBody = target.tagName === 'BODY';

					if (!isLink) {

						if (!action) {

							while (!isLink || !action) {

								target = target.parentNode;

								if (target.nodeType === 9) {
									break;
								}

								if (target.tagName === 'BODY') {
									isBody = true;
									break;
								}

								action = target.getAttribute('data-action');
								isLink = target.tagName === 'A';

								if (action !== null || isLink) {
									break;
								}
							}
						}
					}

					if (isBody) {
						return false;
					}

					if (isLink) {
						var _ret = function () {
							var href = target.getAttribute('href');
							var hasHash = href && href.indexOf('#') !== -1;

							var onClick = target.getAttribute('onClick');

							if (!hasHash && !action) {

								if (!onClick) {

									var isTarget = target.getAttribute('target');

									if (isTarget && isTarget.indexOf('_blank') !== -1) {
										return {
											v: false
										};
									}

									if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
										_this.Nav.closeNav();
										return {
											v: false
										};
									}

									event.preventDefault();
									// document.body.style.opacity = 0;

									document.body.classList.add('atail-hide-body');

									setTimeout(function () {
										location.href = href;
									}, 300);
								}

								return {
									v: false
								};
							}
							event.preventDefault();
						}();

						if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
					}

					if (action) {
						switch (action) {
							case 'show-nav':
								_this.Nav.showNav();
								break;
							case 'close-nav':
								_this.Nav.closeNav();
								break;

							case 'open-full-post':
								_this.projectPreview.openFullPost(target);
								break;
							case 'full-post-close':
								_this.projectPreview.closeFullPost(target);
								break;

							case 'full-post-next-slide':
								_this.projectPreview.nextSlide();
								break;
							case 'full-post-prev-slide':
								_this.projectPreview.prevSlide();
								break;

							case 'full-post-show-info':
								event.stopPropagation();
								_this.projectPreview.fullPostShowInfo();
								break;

							case 'show-category':
								_this.allProjects.showCategory(target);
								break;

							case 'like':
								(0, _blogPostLike.blogPostLike)(target);
								break;
							case 'dislike':
								(0, _blogPostDislike.blogPostDislike)(target);
								break;

							// slider event
							case 'slider-prev-slide':
								_this.slider.goPrev(true);
								break;
							case 'slider-next-slide':
								_this.slider.goNext(true);
								break;

							// all projects
							case 'all-projects':
								_this.allProjects.showProjects(target);
								break;
							case 'all-projects-close':
								_this.allProjects.closeProjects();
								break;

							case 'show-lang':
								// this.lang.show();
								break;
						}
					}
				});

				var html = document.documentElement;
				var body = document.body;

				document.addEventListener('scroll', function () {

					var scrollTop = html.scrollTop || body && body.scrollTop || 0;

					if (_global2.default.ww < 992) {
						_this.allProjects.onScroll(scrollTop);
					}
				});
			}
		}]);

		return Atail;
	}();

	exports.default = Atail;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Navigation = function () {
	  function Navigation() {
	    _classCallCheck(this, Navigation);

	    var self = this;

	    self.maxLinksCount = 5;
	    self.excessives = false;

	    /**
	     * Variables
	     * this.maxLinksCount
	     * this.excessives - true - якщо забагато лішок і вони поміщені в MORE
	     *
	     * this.atailHeader - .atail-header
	     *
	     * this.navList - .nav-list
	     * this.navListli - list of li
	     * this.navListLiLength - count of li
	     *
	     * this.remnant - лішки які не влазять на десктопах
	     */

	    this.isInit = false;

	    self.init();
	  }

	  /**
	   * [init navigation]
	   * @return {[boolean]}
	   */


	  _createClass(Navigation, [{
	    key: 'init',
	    value: function init() {

	      var self = this;

	      var navList = self.navList = document.querySelector('.nav-list');
	      if (!navList) {
	        return false;
	      }

	      this.atailHeader = document.querySelector('.atail');
	      if (!this.atailHeader) {
	        console.error('Dont find node with class ".atail"');
	        return false;
	      }

	      this.showNavBtn = document.querySelector('[data-action="show-nav"]');

	      var navListLi = self.navListli = navList.children;
	      if (!navListLi) {
	        return false;
	      }

	      [].forEach.call(navListLi, function (li, index) {
	        var counter = document.createElement('span');
	        counter.className = 'nav-list-counter';
	        var a = li.children[0];
	        // let span = a.children[0];
	        counter.innerHTML = '0' + (index + 1);
	        a.insertBefore(counter, a.firstChild);
	      });

	      var navListLiLength = self.navListLiLength = navListLi.length;
	      if (navListLiLength <= self.maxLinksCount) {
	        return false;
	      }

	      // створити темплейт лінка
	      self._createLink();
	      // сховати лінки які не влазять
	      self._hideExcessives();

	      this.isInit = true;
	      return true;
	    }
	  }, {
	    key: 'showNav',
	    value: function showNav() {
	      this.atailHeader.classList.add('atail-header-opened');
	      this.showNavBtn.setAttribute('data-action', 'close-nav');

	      document.body.style.overflow = 'hidden';
	    }
	  }, {
	    key: 'closeNav',
	    value: function closeNav() {
	      this.atailHeader.classList.remove('atail-header-opened');
	      this.showNavBtn.setAttribute('data-action', 'show-nav');

	      document.body.style.overflow = '';
	    }
	  }, {
	    key: '_hideExcessives',
	    value: function _hideExcessives() {

	      if (_global2.default.ww < 992) {
	        return false;
	      }

	      var self = this;

	      if (self.excessives) {
	        return false;
	      }
	      self.excessives = true;

	      var maxLength = self.maxLinksCount,
	          length = self.navListLiLength;

	      if (length < self.maxLinksCount) {
	        return false;
	      }

	      var remnant = self.remnant = [].slice.call(self.navListli, maxLength - 1);

	      remnant.forEach(function (li) {
	        self.moreUl.appendChild(li);
	      });

	      self.navList.appendChild(this.more);

	      this.closeNav();

	      return true;
	    }
	  }, {
	    key: '_showExcessives',
	    value: function _showExcessives() {
	      var _this = this;

	      var self = this;

	      if (!self.excessives) {
	        return false;
	      }
	      self.excessives = false;

	      if (self.navListLiLength < self.maxLinksCount) {
	        return false;
	      }

	      this.navList.removeChild(self.more);

	      var remnant = self.remnant;

	      remnant.forEach(function (li) {
	        _this.navList.appendChild(li);
	      });

	      return true;
	    }
	  }, {
	    key: '_createLink',
	    value: function _createLink() {
	      var more = this.more = document.createElement('li');
	      more.className = 'col-xs-2 more-links menu-item-has-children';
	      more.innerHTML = '<a href="#"><span>More</span></a><ul></ul>';
	      this.moreUl = more.querySelector('ul');
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {

	      if (!this.isInit) {
	        return false;
	      }

	      if (_global2.default.ww >= 992) {
	        this._hideExcessives();
	      } else {
	        this._showExcessives();
	      }
	      return true;
	    }
	  }]);

	  return Navigation;
	}();

	exports.default = Navigation;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Atail global variables
	 * ww - window.innerWidth
	 * wh - window.innerHeight
	 */
	// export let ww = window.innerWidth,
	//     wh = window.innerHeight;

	var GlobalVariables = function () {
	  function GlobalVariables() {
	    _classCallCheck(this, GlobalVariables);

	    this.ww = window.innerWidth;
	    this.wh = window.innerHeight;

	    this.atailMain = document.querySelector('.atail');
	    this.atailMainClientWidth = this.atailMain.clientWidth;

	    this.main = document.querySelector('.main-scroll');
	    this.mainClientWidth = this.main.clientWidth;

	    this.sides = document.querySelector('.sides');
	    this.header = document.querySelector('.atail-header');

	    this.lang = document.querySelector('.widget-lang');

	    this.windowIsLoad = false;

	    this.setScrollWidth();

	    this.main.ontouchstart = function (event) {
	      event.stopPropagation();
	    };
	  }

	  _createClass(GlobalVariables, [{
	    key: 'setScrollWidth',
	    value: function setScrollWidth() {
	      var outer = document.createElement('div');
	      outer.style.visibility = 'hidden';
	      outer.style.width = '100px';
	      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

	      document.body.appendChild(outer);

	      var widthNoScroll = outer.offsetWidth;
	      // force scrollbars
	      outer.style.overflow = 'scroll';

	      // add innerdiv
	      var inner = document.createElement('div');
	      inner.style.width = '100%';
	      outer.appendChild(inner);

	      var widthWithScroll = inner.offsetWidth;

	      // remove divs
	      outer.parentNode.removeChild(outer);

	      this.scrollWidth = widthNoScroll - widthWithScroll;
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      this.ww = window.innerWidth;
	      this.wh = window.innerHeight;
	      this.mainClientWidth = this.main.clientWidth;
	      this.setScrollWidth();
	    }
	  }]);

	  return GlobalVariables;
	}();

	exports.default = new GlobalVariables();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var optimizedResize = exports.optimizedResize = function () {

	    var callbacks = [],
	        running = false;

	    // fired on resize event
	    function resize() {

	        if (!running) {
	            running = true;

	            if (window.requestAnimationFrame) {
	                window.requestAnimationFrame(runCallbacks);
	            } else {
	                setTimeout(runCallbacks, 66);
	            }
	        }
	    }

	    // run the actual callbacks
	    function runCallbacks() {

	        callbacks.forEach(function (callback) {
	            callback();
	        });

	        running = false;
	    }

	    // adds callback to loop
	    function addCallback(callback) {

	        if (callback) {
	            callbacks.push(callback);
	        }
	    }

	    return {
	        // public method to add additional callback
	        add: function add(callback) {
	            if (!callbacks.length) {
	                window.addEventListener('resize', resize);
	            }
	            addCallback(callback);
	        }
	    };
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _transitionEvent = __webpack_require__(8);

	var _animationEvent = __webpack_require__(9);

	var _animationSupport = __webpack_require__(10);

	var _jsAnimation = __webpack_require__(11);

	var _promiseAjax = __webpack_require__(12);

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	var _objectFitImages = __webpack_require__(18);

	var _objectFitImages2 = _interopRequireDefault(_objectFitImages);

	var _scroll = __webpack_require__(19);

	var _scroll2 = _interopRequireDefault(_scroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProjectPreview = function () {
	    function ProjectPreview() {
	        _classCallCheck(this, ProjectPreview);

	        // this.projectPreview - main block
	        //
	        // this.projectPreviewParent - parent block
	        //
	        // this.projects - all projects in this block
	        // this.projectsLength - all projects length
	        // this.currentProject - current projects
	        // this.prevProject - previous project
	        // this.hasScroll - if main block has scroll
	        //
	        // this.projectsImages - project image
	        //
	        // this.animationBox
	        // this.animateFromTop
	        // this.animateFromBot
	        //
	        // this.fullPostSliderImages
	        //

	        this.isInit = false;

	        this.init();
	    }

	    _createClass(ProjectPreview, [{
	        key: "init",
	        value: function init() {
	            var _this = this;

	            var projectPreview = this.projectPreview = document.querySelector('.project-preview');
	            if (!projectPreview) {
	                return false;
	            }

	            // init Sldier
	            this.scroll = new _scroll2.default(projectPreview);
	            this.scroll.init();

	            this.projectPreviewParent = projectPreview.parentNode;

	            document.body.classList.add('window-height');

	            projectPreview.focus();

	            var projects = this.projects = projectPreview.children;
	            if (!projects.length) {
	                return false;
	            }

	            this.projectsLength = projects.length;

	            var projectsImagesBox = this.projectsImagesBox = document.querySelector('.preview-images-item');
	            this.projectsImages = [];
	            this.fullPostSliderImages = [];

	            projects[0].classList.add('projects-item-active');
	            projects[0].classList.add('projects-item-animate');

	            [].forEach.call(projects, function (items) {
	                items.classList.add('projects-item');

	                var idPost = items.querySelector('[id^="project-"]');
	                if (idPost) {
	                    idPost = idPost.getAttribute('id');
	                }

	                if (projectsImagesBox) {
	                    var image = projectsImagesBox.querySelector('.' + idPost);
	                    if (image) {
	                        _this.projectsImages.push(image);
	                    } else {
	                        _this.projectsImages.push(false);
	                    }
	                }
	            });

	            if (this.projectsImages) {
	                this.projectsImages[0] && this.projectsImages[0].classList.add('images-item-active');
	            }

	            this.currentProject = projects[0];
	            this.currentProjectIndex = 0;
	            this.prevProjectIndex = 0;

	            // animate box
	            this.animateBoxBot();

	            this.checkScroll();

	            // events
	            this.initMouseWheel();
	            this.onKeyPress();
	            this.onTouch();

	            // this.onScroll();

	            // create full post template
	            this.createFullPost();

	            // create shares
	            // this.createShares();

	            // scroll
	            this.scroll.createScroll();

	            this.isInit = true;
	        }
	    }, {
	        key: "initMouseWheel",
	        value: function initMouseWheel() {
	            var _this2 = this;

	            var goNext = false,
	                goPrev = false;

	            var onWheel = function onWheel(e) {

	                e = e || window.event;

	                e.preventDefault ? e.preventDefault() : e.returnValue = false;

	                if (_this2.isAnimating) {
	                    e.preventDefault();
	                    return false;
	                }

	                var target = e.currentTarget;

	                var delta = e.deltaY || e.detail || e.wheelDelta;

	                if (/rv:11.0/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent)) {
	                    delta = -delta;
	                }

	                if (delta < 100 && delta > 0) {
	                    delta = 100;
	                } else if (delta > -100 && delta < 0) {
	                    delta = -100;
	                }

	                if (_this2.hasScroll) {
	                    (function () {

	                        var projectView = target;

	                        if (projectView.scrollTop === 0 && delta < 0) {
	                            goPrev = true;
	                        } else if (projectView.scrollTop >= _this2.maxScrollHeight && delta > 0) {
	                            goNext = true;
	                        } else {
	                            _this2.isAnimating = true;

	                            // let self = this;

	                            _this2.startPosition = projectView.scrollTop;
	                            _this2.endPosition = _this2.startPosition + delta * 2;
	                            _this2.path = _this2.endPosition - _this2.startPosition;

	                            // if(self.currentPosition > self.endPosition) {
	                            //   self.animateTop = false;
	                            // } else {
	                            //   self.animateTop = true;
	                            // }

	                            // projectView.scrollTop += delta;


	                            (0, _jsAnimation.jsAnimation)({
	                                duration: 300,
	                                timing: function timing(timeFraction) {
	                                    return timeFraction;
	                                },
	                                draw: function draw(progress) {
	                                    projectView.scrollTop = _this2.startPosition + _this2.path * progress;

	                                    if (_global2.default.ww >= 992) {
	                                        var top = (_this2.startPosition + _this2.path * progress) * _this2.scroll.precent;

	                                        if (top < 0) {
	                                            top = 0;
	                                        } else if (top > projectView.clientHeight - _this2.scroll.lineHeight) {
	                                            top = projectView.clientHeight - _this2.scroll.lineHeight;
	                                        }

	                                        _this2.scroll.scrollLine.style.top = top + 'px';
	                                    }

	                                    if (progress >= 1) {
	                                        _this2.isAnimating = false;
	                                    }
	                                }
	                            });
	                        }
	                    })();
	                } else {
	                    if (delta > 0) {
	                        goNext = true;
	                    } else if (delta < 0) {
	                        goPrev = true;
	                    }
	                }

	                if (goNext) {
	                    // alert('go next');
	                    _this2.showNextProject();
	                    goNext = false;
	                }
	                if (goPrev) {
	                    // alert('go next');
	                    _this2.showPrevProject();
	                    goPrev = false;
	                }
	            };

	            var elem = this.projectPreview;

	            if (elem.addEventListener) {
	                if ('onwheel' in document) {
	                    // IE9+, FF17+, Ch31+
	                    elem.addEventListener('wheel', onWheel);
	                } else if ('onmousewheel' in document) {
	                    // устаревший вариант события
	                    elem.addEventListener('mousewheel', onWheel);
	                } else {
	                    // Firefox < 17
	                    elem.addEventListener('MozMousePixelScroll', onWheel);
	                }
	            } else {
	                // IE8-
	                elem.attachEvent('onmousewheel', onWheel);
	            }
	        }
	    }, {
	        key: "onKeyPress",
	        value: function onKeyPress() {
	            var _this3 = this;

	            var showPrev = false,
	                showNext = false,

	            // startY, endY,
	            keyDown = false;

	            this.projectPreview.addEventListener('keydown', function () {

	                if (keyDown) {
	                    return false;
	                }
	                keyDown = true;

	                if (!_this3.maxScrollHeight) {
	                    _this3.checkScroll();
	                }

	                if (_this3.hasScroll) {
	                    showPrev = _this3.projectPreview.scrollTop === 0;
	                    showNext = _this3.projectPreview.scrollTop >= _this3.maxScrollHeight;
	                }
	            });

	            this.projectPreview.addEventListener('keyup', function (event) {

	                if (_this3.fullPostIsOpen || _this3.isAnimating) {
	                    return false;
	                }

	                if (!_this3.hasScroll) {
	                    event.keyCode === 38 && _this3.showPrevProject();
	                    event.keyCode === 40 && _this3.showNextProject();
	                } else {

	                    if (showPrev && _this3.projectPreview.scrollTop === 0) {
	                        event.keyCode === 38 && _this3.showPrevProject();
	                    } else if (showNext && _this3.projectPreview.scrollTop >= _this3.maxScrollHeight) {
	                        event.keyCode === 40 && _this3.showNextProject();
	                    }
	                }

	                showPrev = false;
	                showNext = false;
	                keyDown = false;
	            });
	        }
	    }, {
	        key: "onTouch",
	        value: function onTouch() {
	            var _this4 = this;

	            var showPrev = false,
	                showNext = false,
	                startY = null,
	                endY = null,
	                translateY = 0;

	            // touch start
	            this.projectPreview.addEventListener('touchstart', function (event) {

	                if (_this4.isAnimating) {
	                    return false;
	                }

	                if (!_this4.maxScrollHeight) {
	                    _this4.checkScroll();
	                }

	                if (_this4.hasScroll) {
	                    showPrev = _this4.projectPreview.scrollTop === 0;
	                    showNext = _this4.projectPreview.scrollTop === _this4.maxScrollHeight;
	                }

	                var touch = event.touches[0];
	                startY = touch.clientY;
	            });

	            // touch move
	            this.projectPreview.addEventListener('touchmove', function (event) {

	                if (_this4.isAnimating) {
	                    return false;
	                }

	                var touch = event.touches[0];
	                endY = touch.clientY;
	                translateY = startY - endY;
	            });

	            // touch end
	            this.projectPreview.addEventListener('touchend', function () {

	                if (_this4.isAnimating) {
	                    return false;
	                }

	                if (!_this4.hasScroll) {
	                    if (translateY < -20) {
	                        showPrev = true;
	                    } else if (translateY > 20) {
	                        showNext = true;
	                    }
	                }

	                if (_this4.projectPreview.scrollTop === 0 && showPrev) {
	                    if (translateY < -20) {
	                        _this4.showPrevProject();
	                    }
	                }
	                if (_this4.projectPreview.scrollTop === _this4.maxScrollHeight && showNext) {
	                    if (translateY > 20) {
	                        _this4.showNextProject();
	                    }
	                }

	                showPrev = false;
	                showNext = false;
	                translateY = 0;
	            });
	        }

	        /**
	         * Show next project
	         * @return {[type]} [description]
	         */

	    }, {
	        key: "showNextProject",
	        value: function showNextProject() {

	            if (this.isAnimating) {
	                return false;
	            }

	            this.prevProjectIndex = this.currentProjectIndex;

	            var nextIndex = this.currentProjectIndex + 1;

	            if (nextIndex >= this.projectsLength) {
	                nextIndex = 0;
	            }

	            this.currentProjectIndex = nextIndex;

	            if (this.prevProjectIndex === this.currentProjectIndex) {
	                return false;
	            }

	            this.fromBottom = true;

	            this.showProject();
	        }

	        /**
	         * Show prev project
	         * @return {[type]} [description]
	         */

	    }, {
	        key: "showPrevProject",
	        value: function showPrevProject() {

	            if (this.isAnimating) {
	                return false;
	            }

	            this.prevProjectIndex = this.currentProjectIndex;

	            var nextIndex = this.currentProjectIndex - 1;

	            if (nextIndex < 0) {
	                nextIndex = this.projectsLength - 1;
	            }

	            this.currentProjectIndex = nextIndex;

	            if (this.prevProjectIndex === this.currentProjectIndex) {
	                return false;
	            }

	            this.fromTop = true;

	            this.showProject();
	        }

	        /**
	         * Show project
	         * @return {[type]} [description]
	         */

	    }, {
	        key: "showProject",
	        value: function showProject() {

	            this.isAnimating = true;

	            if (!_animationSupport.animationSupport) {
	                var projects = this.projects,
	                    images = this.projectsImages,
	                    current = this.currentProjectIndex,
	                    prev = this.prevProjectIndex;

	                projects[current].classList.add('projects-item-active');
	                projects[prev].classList.remove('projects-item-active');

	                projects[current].classList.add('projects-item-animate');
	                projects[prev].classList.remove('projects-item-animate');

	                this.projectPreview.scrollTop = 0;

	                images[prev] && images[prev].classList.remove('images-item-active');
	                images[current] && images[current].classList.add('images-item-active');

	                this.checkScroll();

	                this.isAnimating = false;

	                return false;
	            }

	            // this.animateWrap.style.zIndex = 3;
	            this.animateWrap.classList.add('z-index-3');

	            this.projects[this.prevProjectIndex].classList.add('projects-count-hide');

	            this.projects[this.prevProjectIndex].classList.remove('projects-item-animate');

	            if (this.fromBottom) {
	                this.animateBoxBot.classList.add('from-bottom');
	            }

	            if (this.fromTop) {
	                this.animateBoxTop.classList.add('from-top');
	            }
	        }

	        /**
	         * Check if scroll is exist
	         * @return {[type]} [description]
	         */

	    }, {
	        key: "checkScroll",
	        value: function checkScroll() {

	            var visibleHeight = this.offsetHeight = this.projectPreview.offsetHeight,
	                fullHeight = this.fullHeight = this.projectPreview.scrollHeight;

	            this.maxScrollHeight = fullHeight - visibleHeight;

	            if (visibleHeight + 1 < fullHeight) {
	                this.hasScroll = true;
	            } else {
	                this.hasScroll = false;
	            }
	        }
	    }, {
	        key: "animateBoxBot",
	        value: function animateBoxBot() {
	            var _this5 = this;

	            var animateBoxBot = this.animateBoxBot = document.createElement('DIV');
	            var animateBoxTop = this.animateBoxTop = document.createElement('DIV');
	            var animateWrap = this.animateWrap = document.createElement('DIV');
	            animateBoxBot.className = 'animate-box-bot';
	            animateBoxTop.className = 'animate-box-top';
	            animateWrap.className = 'animate-wrap';

	            animateBoxBot.innerHTML = '<div></div><div></div><div></div>';
	            animateBoxTop.innerHTML = '<div></div><div></div><div></div>';

	            animateWrap.appendChild(animateBoxBot);
	            animateWrap.appendChild(animateBoxTop);

	            // let main = document.querySelector('main');
	            // main.appendChild(animateWrap);

	            this.projectsImagesBox.appendChild(animateWrap);

	            var iteration = 0;

	            var animate = function animate() {
	                var projects = _this5.projects,
	                    images = _this5.projectsImages,
	                    current = _this5.currentProjectIndex,
	                    prev = _this5.prevProjectIndex;

	                iteration++;

	                if (iteration === 1) {

	                    projects[current].classList.add('projects-item-active');
	                    projects[prev].classList.remove('projects-item-active');

	                    projects[prev].classList.remove('projects-count-hide');

	                    setTimeout(function () {
	                        projects[current].classList.add('projects-item-animate');
	                    }, 0);

	                    _this5.projectPreview.scrollTop = 0;

	                    images[prev] && images[prev].classList.remove('images-item-active');
	                    images[current] && images[current].classList.add('images-item-active');

	                    _this5.checkScroll();

	                    if (_this5.fromBottom) {
	                        // setTimeout(()=>{
	                        animateBoxBot.classList.add('from-bottom-end');

	                        // }, 200);
	                    } else if (_this5.fromTop) {
	                        animateBoxTop.classList.add('from-top-end');
	                    }

	                    _this5.scroll.setScrollSize();
	                } else if (iteration === 2) {

	                    // animateWrap.style.zIndex = '';
	                    animateWrap.classList.remove('z-index-3');

	                    iteration = 0;

	                    // setTimeout(()=>{
	                    if (_this5.fromBottom) {
	                        animateBoxBot.classList.remove('from-bottom');
	                        animateBoxBot.classList.remove('from-bottom-end');
	                        _this5.fromBottom = false;
	                    } else if (_this5.fromTop) {
	                        animateBoxTop.classList.remove('from-top');
	                        animateBoxTop.classList.remove('from-top-end');
	                        _this5.fromTop = false;
	                    }
	                    // }, 100);

	                    _this5.isAnimating = false;
	                }
	            };

	            animateBoxBot.addEventListener(_transitionEvent.transitionEvent, animate);
	            animateBoxTop.addEventListener(_transitionEvent.transitionEvent, animate);
	        }
	    }, {
	        key: "openFullPost",
	        value: function openFullPost(target) {
	            var _this6 = this;

	            if (this.isAnimating) {
	                return false;
	            }
	            this.isAnimating = true;

	            target.classList.add('is-loading');

	            // 'atail_get_popup_project'
	            (0, _promiseAjax.httpGet)('jsons/atail_get_popup_project/', target).then(function (result) {
	                target.classList.remove('is-loading');
	                _global2.default.atailMain.appendChild(_this6.fullPost);

	                _this6.fullPostIsOpen = true;

	                result = JSON.parse(result);

	                return result;
	            }, function () {
	                return false;
	            }).then(function (result) {

	                if (!result) {
	                    return false;
	                }

	                var cloneImage = _this6.projectsImages[_this6.currentProjectIndex] && _this6.projectsImages[_this6.currentProjectIndex].cloneNode(true);

	                var cloneImageSrc = null;

	                if (cloneImage) {
	                    cloneImage.classList.add('active');

	                    var div = document.createElement('DIV');
	                    div.className = 'post-slider-image-item';
	                    div.appendChild(cloneImage);

	                    _this6.postSliderImages.appendChild(div);

	                    _this6.fullPostSliderImages.push(div);
	                    cloneImageSrc = cloneImage.getAttribute('src');
	                }

	                result.slides && result.slides.forEach(function (item) {

	                    var type = item.type;

	                    if (type === 'image') {
	                        (function () {

	                            var img = new Image();

	                            var imgSrc = item.src.img,
	                                imgAlt = item.src.title;

	                            img.onload = function () {
	                                (0, _objectFitImages2.default)(img);
	                            };

	                            var div = document.createElement('DIV');
	                            div.className = 'post-slider-image-item';

	                            /* Fit type */
	                            var fit = item.fit,
	                                letCloned = false;

	                            // if ( cloneImage ) {
	                            //   if ( hasObjectFit ) {
	                            //     if ( cloneImageSrc === item.src.img ) {
	                            //       imgSrc = result.thumbnail_url;
	                            //       letCloned = true;
	                            //     }
	                            //   } else {
	                            //     if ( cloneImage.style.backgroundImage.indexOf( item.src.img ) !== -1 ) {
	                            //       imgSrc = result.thumbnail_url;
	                            //       letCloned = true;
	                            //     }
	                            //   }
	                            // }

	                            switch (fit) {
	                                case 'contain':
	                                    letCloned ? null : div.classList.add('contain-fit');
	                                    break;

	                                case 'full':
	                                    letCloned ? null : div.classList.add('full-fit');
	                                    break;
	                            }

	                            // let crateScroll = () => {
	                            //   setTimeout( () => {
	                            //     new AtailScroll( div ).init();
	                            //   }, 600 );
	                            // };

	                            // img.onload = () => {
	                            //   // init Sldier

	                            // };

	                            img.src = imgSrc;
	                            img.alt = imgAlt;

	                            var scrollDiv = null;

	                            if (fit === 'full') {
	                                scrollDiv = document.createElement('DIV');
	                                scrollDiv.className = 'post-slider-item-scroll';

	                                scrollDiv.appendChild(img);
	                                div.appendChild(scrollDiv);
	                            } else {
	                                div.appendChild(img);
	                            }

	                            _this6.postSliderImages.appendChild(div);
	                            _this6.fullPostSliderImages.push(div);

	                            if (fit === 'full') {
	                                _this6.scrollItem.push(new _scroll2.default(scrollDiv));
	                            }
	                        })();
	                    } else if (type === 'video') {
	                        (function () {

	                            // let video = `<iframe data-src=${item.src} frameborder="0" allowfullscreen></iframe>`;

	                            var iframe = document.createElement('IFRAME');
	                            // iframe.setAttribute( 'allowfullscreen', 'allowfullscreen' );
	                            iframe.setAttribute('frameborder', 0);

	                            setTimeout(function () {
	                                iframe.setAttribute('src', item.src);
	                            }, 2000);

	                            var div = document.createElement('DIV');
	                            div.className = 'post-slider-video-item';
	                            // div.innerHTML = video;
	                            div.appendChild(iframe);
	                            _this6.postSliderImages.appendChild(div);
	                            _this6.fullPostSliderImages.push(div);
	                        })();
	                    }
	                });

	                if (_this6.fullPostSliderImages && _this6.fullPostSliderImages.length > 0) {
	                    _this6.fullPostCurrentIndex = 0;
	                    _this6.fullPostPrevIndex = 0;

	                    _this6.fullPostSliderImages[0].classList.add('active');

	                    if (_this6.fullPostSliderImages.length > 1) {
	                        _this6.fullPostNextSlide.innerHTML = _this6.arrowTemplate;
	                        _this6.fullPostPrevSlide.innerHTML = _this6.arrowTemplate;
	                        _this6.postSliderImages.appendChild(_this6.fullPostNextSlide);
	                        _this6.postSliderImages.appendChild(_this6.fullPostPrevSlide);
	                    }
	                }

	                var startDate = result.date_start ? result.date_start : '';
	                var finishDate = result.date_finish ? result.date_finish : '';

	                _this6.contentHeader.innerHTML = "<h4>" + result.title + "</h4>" + startDate + finishDate + "<p>" + result.content + "</p>";

	                var footerString = result.positions ? result.participants : '';

	                var positions = result.positions;

	                for (var item in result.positions) {
	                    if (positions.hasOwnProperty(item)) {
	                        footerString += "<span class=\"small-title\">" + positions[item].title + "<span>" + positions[item].url + "</span></span>";
	                    }
	                }

	                _this6.contentFooter.innerHTML = footerString;

	                _this6.createShares(result.link, result.title);

	                if (_global2.default.lang) {
	                    _global2.default.lang.classList.add('hide-lang');
	                }

	                return true;
	            }).then(function (result) {
	                setTimeout(function () {

	                    // show project
	                    _this6.fullPost.classList.add('show-post-content');
	                    if (!_animationSupport.animationSupport) {
	                        _this6.fullPost.classList.add('no-animating');
	                    }
	                }, 1000 / 60);
	                return result;
	            }).then(function (result) {
	                _this6.isAnimating = false;
	                return result;
	            }).catch(function () {
	                _this6.isAnimating = false;
	            });
	        }
	    }, {
	        key: "closeFullPost",
	        value: function closeFullPost() {

	            this.fullPost.classList.add('close-post-content');
	            this.fullPost.classList.remove('show-post-content');
	            this.fullPost.classList.remove('show-in-mobile');

	            _global2.default.main.parentNode.style.opacity = '';

	            var images = this.projectsImages,
	                sliderImages = this.fullPostSliderImages,
	                projectIndex = this.currentProjectIndex,
	                sliderIndex = this.fullPostCurrentIndex;

	            if (!images[projectIndex] || !sliderImages[sliderIndex]) {
	                return false;
	            }

	            this.scrollItem.forEach(function (item) {
	                item.remove();
	            });

	            this.scrollItem = [];
	            this.scrollItemIsInited = false;

	            // let slideCloned = sliderImages[ sliderIndex ].querySelector( 'img' );

	            // if ( slideCloned ) {

	            //   slideCloned = slideCloned.cloneNode( true );

	            //   slideCloned.className += ' images-item-active';

	            //   images[ projectIndex ].parentNode.replaceChild( slideCloned, images[ projectIndex ] );

	            //   images[ projectIndex ] = slideCloned;
	            // }

	            if (!_animationSupport.animationSupport) {

	                this.fullPost.classList.remove('no-animating');
	                this.fullPost.classList.remove('close-post-content');
	                this.fullPost.classList.remove('show-post-content');
	                this.fullPost.parentNode.removeChild(this.fullPost);

	                while (this.postSliderImages.firstChild) {
	                    this.postSliderImages.removeChild(this.postSliderImages.firstChild);
	                }

	                this.fullPostSliderImages = [];

	                this.fullPostIsOpen = false;
	                this.projectPreview.focus();

	                if (_global2.default.lang) {
	                    _global2.default.lang.classList.remove('hide-lang');
	                }
	            }
	        }
	    }, {
	        key: "createFullPost",
	        value: function createFullPost() {
	            var _this7 = this;

	            // створити головний блок
	            var fullPost = this.fullPost = document.createElement('DIV');
	            fullPost.className = 'full-post row';

	            fullPost.style.width = _global2.default.main.offsetWidth + 'px';

	            // блок для слайдера
	            var slider = this.fullPostSlider = document.createElement('DIV');
	            slider.className = 'full-post-slider col-xs-10';
	            // блок для елементів
	            var images = this.postSliderImages = document.createElement('DIV');
	            images.className = 'post-slider-images';

	            var startX = void 0,
	                endX = void 0,
	                path = void 0;

	            // івенти на тач
	            images.addEventListener('touchstart', function (event) {
	                var touch = event.touches[0];
	                startX = touch.clientX;
	            });
	            images.addEventListener('touchmove', function (event) {
	                var touch = event.touches[0];
	                endX = touch.clientX;
	            });
	            images.addEventListener('touchend', function () {
	                path = startX - endX;

	                if (_this7.fullPostSliderImages.length <= 1) {
	                    return false;
	                }

	                if (path >= 50) {
	                    _this7.nextSlide();
	                } else if (path <= -50) {
	                    _this7.prevSlide();
	                }
	            });

	            slider.appendChild(images);

	            // стрілки вліво/вправо
	            var arrowTemplate = this.arrowTemplate = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = "57.143px" height = "34.454px" viewBox = "0 0 57.143 34.454" enable - background = "new 0 0 57.143 34.454" xml: space = "preserve"><g><g><polygon points ="51.908,17.599 46.891,13.1 46.891,17.094 6.904,17.094 6.904,18.094 46.891,18.094 46.891,22.099"/></g></g></svg>';

	            this.fullPostNextSlide = document.createElement('SPAN');
	            this.fullPostNextSlide.className = 'full-post-next-slide';
	            this.fullPostNextSlide.setAttribute('data-action', 'full-post-next-slide');
	            this.fullPostNextSlide.innerHTML = arrowTemplate;

	            this.fullPostPrevSlide = document.createElement('SPAN');
	            this.fullPostPrevSlide.className = 'full-post-prev-slide';
	            this.fullPostPrevSlide.setAttribute('data-action', 'full-post-prev-slide');
	            this.fullPostPrevSlide.innerHTML = arrowTemplate;

	            var content = this.fullPostContent = document.createElement('DIV');
	            content.className = 'full-post-content col-xs-2';
	            var contentTableWrapper = this.contentTableWrapper = document.createElement('DIV');
	            contentTableWrapper.className = 'post-content-table-wrapper';
	            var contentTable = this.contentTable = document.createElement('DIV');
	            contentTable.className = 'post-content-table';
	            var contentHeader = this.contentHeader = document.createElement('DIV');
	            contentHeader.className = 'post-content-header';
	            var contentFooter = this.contentFooter = document.createElement('DIV');
	            contentFooter.className = 'post-content-footer';

	            contentTableWrapper.appendChild(contentTable);
	            contentTable.appendChild(contentHeader);
	            contentTable.appendChild(contentFooter);
	            content.appendChild(contentTableWrapper);

	            fullPost.appendChild(slider);
	            fullPost.appendChild(content);

	            var contentAnimate = function contentAnimate() {

	                if (_this7.fullPost.classList.contains('show-post-content')) {
	                    _global2.default.main.parentNode.style.opacity = '0';
	                }
	            };

	            content.addEventListener(_transitionEvent.transitionEvent, contentAnimate);

	            //***************************************************************************
	            // Mobile menu

	            var mobileMenu = document.createElement('DIV'),
	                openInfo = document.createElement('BUTTON'),
	                socials = document.createElement('DIV');
	            mobileMenu.className = 'full-post-mobile-menu';

	            var mobileMenuCloseBtn = this.mobileMenuCloseBtn = document.createElement('SPAN');
	            mobileMenuCloseBtn.className = 'mobile-menu-close-btn';
	            mobileMenuCloseBtn.setAttribute('data-action', 'full-post-show-info');

	            openInfo.className = 'full-post-mobile-info';
	            openInfo.setAttribute('data-action', 'full-post-show-info');
	            openInfo.innerHTML = 'info';

	            mobileMenu.appendChild(openInfo);
	            mobileMenu.appendChild(socials);

	            fullPost.appendChild(mobileMenu);
	            fullPost.appendChild(mobileMenuCloseBtn);

	            var closeBtn = this.closeBtn = document.createElement('SPAN');
	            closeBtn.className = 'full-post-close';
	            closeBtn.setAttribute('data-action', 'full-post-close');

	            fullPost.appendChild(closeBtn);

	            // check for scroll
	            this.scrollItem = [];
	            this.scrollItemIsInited = false;

	            // init scroll for items
	            var initScrollItem = function initScrollItem() {
	                _this7.scrollItem.forEach(function (item) {
	                    item.init();
	                });
	            };

	            // Анімація відкривання/закривання проекту
	            // це головний блок по якому відслідковуються зміни анімація
	            var animatePost = function animatePost() {

	                _this7.isAnimating = false;

	                // закрити проект
	                if (_this7.fullPost.classList.contains('close-post-content')) {

	                    _this7.fullPost.classList.remove('close-post-content');
	                    _this7.fullPost.classList.remove('show-post-content');
	                    _this7.fullPost.parentNode.removeChild(_this7.fullPost);
	                    _this7.postSliderImages.innerHTML = '';

	                    _this7.fullPostSliderImages = [];
	                    _this7.scrollItem = [];

	                    _this7.fullPostIsOpen = false;
	                    _this7.projectPreview.focus();

	                    if (_global2.default.lang) {
	                        _global2.default.lang.classList.remove('hide-lang');
	                    }
	                }
	                // проект відкритий
	                else if (_this7.fullPost.classList.contains('show-post-content')) {
	                        // create scroll for full post content
	                        if (!_this7.scrollItemIsInited) {
	                            _this7.scrollItemIsInited = true;
	                            _this7.scrollItem.push(new _scroll2.default(_this7.contentTableWrapper));
	                            initScrollItem();
	                        } else if (_this7.scrollItemIsInited) {
	                            _this7.scrollItem.forEach(function (item) {
	                                item.resize();
	                            });
	                        }
	                    }
	            };

	            images.addEventListener(_animationEvent.animationEvent, animatePost);
	            // images.addEventListener( transitionEvent, animatePost );


	            //**************************************************************************
	            // Animating box

	            var fullPostAnimateBox = this.fullPostAnimateBox = document.createElement('DIV');
	            var animateBoxRight = this.animateBoxRight = document.createElement('DIV');
	            var animateBoxLeft = this.animateBoxLeft = document.createElement('DIV');

	            fullPostAnimateBox.className = 'full-post-animate-box';
	            animateBoxRight.className = 'animate-box-right';
	            animateBoxLeft.className = 'animate-box-left';

	            fullPostAnimateBox.appendChild(animateBoxLeft);
	            fullPostAnimateBox.appendChild(animateBoxRight);

	            // Анімаці для блоку
	            var animateBox = function animateBox() {

	                if (_this7.fullPostAnimateBox.classList.contains('from-right')) {

	                    if (_this7.fullPostAnimateBox.classList.contains('from-right-end')) {
	                        _this7.fullPostAnimateBox.classList.remove('from-right-end');
	                        _this7.fullPostAnimateBox.classList.remove('from-right');
	                    } else {
	                        _this7.fullPostSliderImages[_this7.fullPostCurrentIndex].classList.add('active');
	                        _this7.fullPostSliderImages[_this7.fullPostPrevIndex].classList.remove('active');

	                        _this7.fullPostAnimateBox.classList.add('from-right-end');
	                    }
	                } else if (_this7.fullPostAnimateBox.classList.contains('from-left')) {

	                    if (_this7.fullPostAnimateBox.classList.contains('from-left-end')) {
	                        _this7.fullPostAnimateBox.classList.remove('from-left-end');
	                        _this7.fullPostAnimateBox.classList.remove('from-left');
	                    } else {
	                        _this7.fullPostSliderImages[_this7.fullPostCurrentIndex].classList.add('active');
	                        _this7.fullPostSliderImages[_this7.fullPostPrevIndex].classList.remove('active');

	                        _this7.fullPostAnimateBox.classList.add('from-left-end');
	                    }
	                }
	            };

	            animateBoxRight.addEventListener(_transitionEvent.transitionEvent, animateBox);
	            animateBoxLeft.addEventListener(_transitionEvent.transitionEvent, animateBox);

	            slider.appendChild(fullPostAnimateBox);
	        }
	    }, {
	        key: "nextSlide",
	        value: function nextSlide() {

	            var current = this.fullPostCurrentIndex;
	            this.fullPostPrevIndex = current;

	            current++;

	            if (current >= this.fullPostSliderImages.length) {
	                current = 0;
	            }

	            this.fullPostCurrentIndex = current;

	            if (!_animationSupport.animationSupport) {
	                this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
	                this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');
	            } else {
	                this.fullPostAnimateBox.classList.add('from-right');
	            }

	            // this.showSlide();
	        }
	    }, {
	        key: "prevSlide",
	        value: function prevSlide() {

	            var current = this.fullPostCurrentIndex;
	            this.fullPostPrevIndex = current;

	            current--;

	            if (current < 0) {
	                current = this.fullPostSliderImages.length - 1;
	            }

	            this.fullPostCurrentIndex = current;

	            // this.showSlide();

	            if (!_animationSupport.animationSupport) {
	                this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
	                this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');
	            } else {
	                this.fullPostAnimateBox.classList.add('from-left');
	            }
	        }
	    }, {
	        key: "showSlide",
	        value: function showSlide() {
	            if (!_animationSupport.animationSupport) {
	                this.fullPostSliderImages[this.fullPostCurrentIndex].classList.add('active');
	                this.fullPostSliderImages[this.fullPostPrevIndex].classList.remove('active');

	                this.scroll.setScrollSize();
	            }
	        }
	    }, {
	        key: "fullPostShowInfo",
	        value: function fullPostShowInfo() {
	            if (this.fullPost.classList.contains('show-in-mobile')) {
	                this.fullPost.classList.remove('show-in-mobile');
	            } else {
	                this.fullPost.classList.add('show-in-mobile');
	            }
	        }
	    }, {
	        key: "resize",
	        value: function resize() {
	            if (!this.isInit) {
	                return false;
	            }

	            this.checkScroll();

	            this.fullPost.style.width = _global2.default.main.offsetWidth + 'px';

	            this.scroll.resize();

	            this.scrollItem.forEach(function (item) {
	                item.resize();
	            });
	        }
	    }, {
	        key: "createShares",
	        value: function createShares(url, text) {

	            var sharesBlock = document.createElement('DIV');
	            sharesBlock.classList.add('atail-project-shares');

	            this.contentHeader.appendChild(sharesBlock);

	            var shareArray = JSON.parse(document.body.getAttribute('data-share'));

	            jQuery(sharesBlock).jsSocials({
	                url: url,
	                text: text,
	                showLabel: false,
	                showCount: true,
	                shares: shareArray
	            });
	        }
	    }]);

	    return ProjectPreview;
	}();

	exports.default = ProjectPreview;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Function from David Walsh: http://davidwalsh.name/css-animation-callback
	function whichTransitionEvent() {
	  var t,
	      el = document.createElement('fakeelement');

	  var transitions = {
	    'transition': 'transitionend',
	    'OTransition': 'oTransitionEnd',
	    'MozTransition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd'
	  };

	  for (t in transitions) {
	    if (el.style[t] !== undefined) {
	      return transitions[t];
	    }
	  }
	}

	var transitionEvent = exports.transitionEvent = whichTransitionEvent();

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function whichAnimationEvent() {
	  var t,
	      el = document.createElement("fakeelement");

	  var animations = {
	    "animation": "animationend",
	    "OAnimation": "oAnimationEnd",
	    "MozAnimation": "animationend",
	    "WebkitAnimation": "webkitAnimationEnd"
	  };

	  for (t in animations) {
	    if (el.style[t] !== undefined) {
	      return animations[t];
	    }
	  }
	}

	var animationEvent = exports.animationEvent = whichAnimationEvent();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Detecting CSS animation support
	 * @type {Boolean}
	 */
	var animation = false,
	    animationstring = 'animation',
	    keyframeprefix = '',
	    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
	    pfx = '',
	    elm = document.createElement('div');

	if (elm.style.animationName !== undefined) {
		animation = true;
	}

	if (animation === false) {
		for (var i = 0; i < domPrefixes.length; i++) {
			if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
				pfx = domPrefixes[i];
				animationstring = pfx + 'Animation';
				keyframeprefix = '-' + pfx.toLowerCase() + '-';
				animation = true;
				break;
			}
		}
	}

	var animationSupport = exports.animationSupport = animation;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jsAnimation = jsAnimation;
	/**
	 * 
	 * 
	 * @export
	 * @param {duration, timing, draw} options
	 */
	function jsAnimation(options) {

	  var start = performance.now();

	  requestAnimationFrame(function animate(time) {
	    // timeFraction от 0 до 1
	    var timeFraction = (time - start) / options.duration;
	    if (timeFraction > 1) timeFraction = 1;

	    // текущее состояние анимации
	    var progress = options.timing(timeFraction);

	    options.draw(progress);

	    if (timeFraction < 1) {
	      requestAnimationFrame(animate);
	    }
	  });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.httpGet = httpGet;
	exports.httpPost = httpPost;

	var _es6Promise = __webpack_require__(13);

	function httpGet(url, target) {

	    var file = target.getAttribute('data-post');

	    file = file ? file + '.json' : '';

	    return new _es6Promise.Promise(function (resolve, reject) {

	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url + file + '?nochashe=' + new Date().getTime(), true);

	        xhr.onload = function () {
	            if (this.status == 200) {
	                resolve(this.response);
	            } else {
	                var error = new Error(this.statusText);
	                error.code = this.status;
	                reject(error);
	            }
	        };

	        xhr.onerror = function () {
	            reject(new Error("Network Error"));
	        };

	        xhr.send();
	    });
	}

	function httpPost(url, data, action) {

	    return new _es6Promise.Promise(function (resolve, reject) {

	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', url, true);
	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	        xhr.onload = function () {
	            if (this.status == 200) {
	                resolve(this.response);
	            } else {
	                var error = new Error(this.statusText);
	                error.code = this.status;
	                reject(error);
	            }
	        };

	        xhr.onerror = function () {
	            reject(new Error("Network Error"));
	        };

	        var request_data = 'action=' + action;

	        for (var key in data) {
	            if (data.hasOwnProperty(key)) {
	                request_data += request_data ? '&' + key + '=' + data[key] : key + '=' + data[key];
	            }
	        }

	        xhr.send(request_data);
	    });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(16);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(17)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), (function() { return this; }()), __webpack_require__(15)(module)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var ಠ = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // transparent image, used as accessor and replacing image
	var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
	var testImg = new Image();
	var supportsObjectFit = 'object-fit' in testImg.style;
	var supportsObjectPosition = 'object-position' in testImg.style;
	var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
	var nativeGetAttribute = testImg.getAttribute;
	var nativeSetAttribute = testImg.setAttribute;
	var autoModeEnabled = false;

	function getStyle(el) {
		var style = getComputedStyle(el).fontFamily;
		var parsed;
		var props = {};
		while ((parsed = propRegex.exec(style)) !== null) {
			props[parsed[1]] = parsed[2];
		}
		return props;
	}

	function fixOne(el, requestedSrc) {
		if (el[ಠ].parsingSrcset) {
			return;
		}
		var style = getStyle(el);
		style['object-fit'] = style['object-fit'] || 'fill'; // default value

		// If the fix was already applied, don't try to skip fixing,
		// - because once you go ofi you never go back.
		// - Wait, that doesn't rhyme.
		// - This ain't rap, bro.
		if (!el[ಠ].s) {
			// fill is the default behavior so no action is necessary
			if (style['object-fit'] === 'fill') {
				return;
			}

			// Where object-fit is supported and object-position isn't (Safari < 10)
			if (!el[ಠ].skipTest && // unless user wants to apply regardless of browser support
			supportsObjectFit && // if browser already supports object-fit
			!style['object-position'] // unless object-position is used
			) {
					return;
				}
		}

		var src = el.currentSrc || el.src;

		if (requestedSrc) {
			// explicitly requested src takes precedence
			// TODO: this still should overwrite srcset
			src = requestedSrc;
		} else if (el.srcset && !supportsCurrentSrc && window.picturefill) {
			var pf = window.picturefill._.ns;
			// prevent infinite loop
			// fillImg sets the src which in turn calls fixOne
			el[ಠ].parsingSrcset = true;

			// parse srcset with picturefill where currentSrc isn't available
			if (!el[pf] || !el[pf].evaled) {
				// force synchronous srcset parsing
				window.picturefill._.fillImg(el, { reselect: true });
			}

			if (!el[pf].curSrc) {
				// force picturefill to parse srcset
				el[pf].supported = false;
				window.picturefill._.fillImg(el, { reselect: true });
			}
			delete el[ಠ].parsingSrcset;

			// retrieve parsed currentSrc, if any
			src = el[pf].curSrc || src;
		}

		// store info on object for later use
		if (el[ಠ].s) {
			el[ಠ].s = src;
			if (requestedSrc) {
				// the attribute reflects the user input
				// the property is the resolved URL
				el[ಠ].srcAttr = requestedSrc;
			}
		} else {
			el[ಠ] = {
				s: src,
				srcAttr: requestedSrc || nativeGetAttribute.call(el, 'src'),
				srcsetAttr: el.srcset
			};
			el.src = ಠ;

			// remove srcset because it overrides src
			if (el.srcset) {
				el.srcset = '';

				// restore non-browser-readable srcset property
				Object.defineProperty(el, 'srcset', {
					value: el[ಠ].srcsetAttr
				});
			}

			keepSrcUsable(el);
		}

		el.style.backgroundImage = 'url("' + src + '")';
		el.style.backgroundPosition = style['object-position'] || 'center';
		el.style.backgroundRepeat = 'no-repeat';

		if (/scale-down/.test(style['object-fit'])) {
			// `object-fit: scale-down` is either `contain` or `auto`
			if (!el[ಠ].i) {
				el[ಠ].i = new Image();
				el[ಠ].i.src = src;
			}

			// naturalWidth is only available when the image headers are loaded,
			// this loop will poll it every 100ms.
			// There's currently no check to prevent this loop from starting twice
			// as a consequence of calling ofi() twice on the same image, but it's light
			// and causes no issues, so it's not worth ensuring that it doesn't.
			(function loop() {
				// https://bugs.chromium.org/p/chromium/issues/detail?id=495908
				if (el[ಠ].i.naturalWidth) {
					if (el[ಠ].i.naturalWidth > el.width || el[ಠ].i.naturalHeight > el.height) {
						el.style.backgroundSize = 'contain';
					} else {
						el.style.backgroundSize = 'auto';
					}
					return;
				}
				setTimeout(loop, 100);
			})();
		} else {
			el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
		}
	}

	function keepSrcUsable(el) {
		var descriptors = {
			get: function () {
				return el[ಠ].s;
			},
			set: function (src) {
				delete el[ಠ].i; // scale-down's img sizes need to be updated too
				fixOne(el, src);
				return src;
			}
		};
		Object.defineProperty(el, 'src', descriptors);
		Object.defineProperty(el, 'currentSrc', { get: descriptors.get }); // it should be read-only
	}

	function hijackAttributes() {
		if (!supportsObjectPosition) {
			HTMLImageElement.prototype.getAttribute = function (name) {
				if (this[ಠ] && (name === 'src' || name === 'srcset')) {
					return this[ಠ][name + 'Attr'];
				}
				return nativeGetAttribute.call(this, name);
			};

			HTMLImageElement.prototype.setAttribute = function (name, value) {
				if (this[ಠ] && (name === 'src' || name === 'srcset')) {
					this[name === 'src' ? 'src' : name + 'Attr'] = String(value);
				} else {
					nativeSetAttribute.call(this, name, value);
				}
			};
		}
	}

	function fix(imgs, opts) {
		var startAutoMode = !autoModeEnabled && !imgs;
		opts = opts || {};
		imgs = imgs || 'img';
		if (supportsObjectPosition && !opts.skipTest) {
			return false;
		}

		// use imgs as a selector or just select all images
		if (typeof imgs === 'string') {
			imgs = document.querySelectorAll('img');
		} else if (!imgs.length) {
			imgs = [imgs];
		}

		// apply fix to all
		for (var i = 0; i < imgs.length; i++) {
			imgs[i][ಠ] = imgs[i][ಠ] || opts;
			fixOne(imgs[i]);
		}

		if (startAutoMode) {
			document.body.addEventListener('load', function (e) {
				if (e.target.tagName === 'IMG') {
					fix(e.target, {
						skipTest: opts.skipTest
					});
				}
			}, true);
			autoModeEnabled = true;
			imgs = 'img'; // reset to a generic selector for watchMQ
		}

		// if requested, watch media queries for object-fit change
		if (opts.watchMQ) {
			window.addEventListener('resize', fix.bind(null, imgs, {
				skipTest: opts.skipTest
			}));
		}
	}

	fix.supportsObjectFit = supportsObjectFit;
	fix.supportsObjectPosition = supportsObjectPosition;

	hijackAttributes();

	module.exports = fix;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	var _lodash = __webpack_require__(20);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import '../functions/optimizedScroll';

	var AtailScroll = function () {
	  function AtailScroll(boxWithScroll) {
	    _classCallCheck(this, AtailScroll);

	    if (!boxWithScroll || !boxWithScroll.nodeType) {
	      return false;
	    }

	    this.box = boxWithScroll;
	    this.parent = boxWithScroll.parentNode;

	    this.boxWithScroll = boxWithScroll;
	    this.hasScroll = false;

	    this.isProjectPreview = false;
	    this.isAjaxProject = false;
	    this.isAjaxProjectTableWrapper = false;

	    // main-scroll
	    this.isMainScroll = false;
	    // all-atail-projects
	    this.isAllProjects = false;
	    if (this.box.classList.contains('all-atail-projects')) {
	      this.isAllProjects = true;

	      var scrollTmp = this.parent.querySelector('.atail-scroll');

	      if (scrollTmp) {
	        return false;
	      }
	    } else if (this.box.classList.contains('main-scroll')) {
	      this.isMainScroll = true;

	      var _scrollTmp = this.parent.querySelector('.atail-scroll');

	      if (_scrollTmp) {
	        return false;
	      }
	    } else if (this.box.classList.contains('project-preview')) {
	      this.isProjectPreview = true;

	      var _scrollTmp2 = this.parent.querySelector('.atail-scroll');

	      if (_scrollTmp2) {
	        return false;
	      }
	    } else if (this.box.classList.contains('post-slider-item-scroll')) {
	      this.isAjaxProject = true;

	      var _scrollTmp3 = this.parent.querySelector('.atail-scroll');

	      if (_scrollTmp3) {
	        return false;
	      }
	    } else if (this.box.classList.contains('post-content-table-wrapper')) {
	      this.isAjaxProjectTableWrapper = true;

	      var _scrollTmp4 = this.parent.querySelector('.atail-scroll');

	      if (_scrollTmp4) {
	        return false;
	      }
	    } else {
	      var _scrollTmp5 = document.body.querySelector('.atail-scroll');

	      if (_scrollTmp5) {
	        return false;
	      }
	    }

	    // this.isIos = false;

	    // if ( ( navigator.userAgent.match( /iPhone/i ) ) || ( navigator.userAgent.match( /iPod/i ) ) ) {
	    //   this.isIos = true;
	    //   alert( 'wtf' );
	    // }

	    this.isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	    this.scrollIsInit = false;
	  }

	  _createClass(AtailScroll, [{
	    key: 'init',
	    value: function init() {

	      this.scrollIsInit = true;

	      this.createScroll();

	      this.onScroll();
	    }
	  }, {
	    key: 'createScroll',
	    value: function createScroll() {
	      var _this = this;

	      if (!this.scrollIsInit) {
	        return false;
	      }

	      //=================================================

	      this.currentTop = 0;

	      var scroll = this.scroll = document.createElement('DIV');
	      scroll.className = 'atail-scroll';

	      var scrollLine = this.scrollLine = document.createElement('SPAN');
	      scrollLine.className = 'atail-scroll-line';

	      scroll.appendChild(scrollLine);

	      if (this.isMainScroll || this.isAllProjects) {
	        document.body.appendChild(scroll);
	      } else {
	        if (this.parent) {
	          this.parent.appendChild(scroll);
	        }
	      }

	      var isMouseDown = false,
	          startY,
	          endY,
	          result,
	          mouseMove = false;

	      var onMouseEnter = function onMouseEnter() {
	        scroll.classList.add('hovered');
	      };

	      var onMouseDown = function onMouseDown(event) {
	        isMouseDown = true;
	        event.preventDefault();
	        startY = event.clientY;

	        _this.currentScrollTop = _this.box.scrollTop;

	        _this.scrollLine.style.transition = 'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
	        _this.scrollLine.style.WebkitTransition = 'top 0s ease, height .3s ease, border-right-width .2s ease, opacity .3s ease';
	      };

	      var onMouseMove = function onMouseMove(event) {

	        if (!isMouseDown) {
	          return false;
	        }

	        mouseMove = true;

	        endY = event.clientY;
	        result = endY - startY;

	        _this.box.scrollTop = _this.currentScrollTop + result / _this.precent;

	        document.addEventListener('mouseup', onMouseUp);
	      };

	      var onMouseUp = function onMouseUp() {
	        isMouseDown = false;

	        mouseMove = false;

	        _this.scrollLine.style.transition = '';
	        _this.scrollLine.style.WebkitTransition = '';

	        document.removeEventListener('mouseup', onMouseUp);
	      };

	      var onScrollClick = function onScrollClick(event) {
	        event.preventDefault();
	        event.stopPropagation();

	        if (!mouseMove) {
	          _this.box.scrollTop = event.clientY / _this.precent;
	          mouseMove = false;
	        }
	      };

	      var onLineClick = function onLineClick(event) {
	        event.preventDefault();
	        event.stopPropagation();

	        isMouseDown = false;

	        _this.scrollLine.style.transition = '';
	        _this.scrollLine.style.WebkitTransition = '';

	        document.removeEventListener('mouseup', onMouseUp);
	      };

	      var onMouseLeave = function onMouseLeave() {
	        scroll.classList.remove('hovered');
	      };

	      scroll.addEventListener('mouseenter', onMouseEnter);
	      scroll.addEventListener('mouseleave', onMouseLeave);
	      scroll.addEventListener('click', onScrollClick);
	      scrollLine.addEventListener('click', onLineClick);
	      scrollLine.addEventListener('mousedown', onMouseDown);
	      document.addEventListener('mousemove', onMouseMove);

	      this.setBoxWidth();

	      this.setScrollSize();

	      this.animateScroll();
	    }
	  }, {
	    key: 'setBoxWidth',
	    value: function setBoxWidth() {}
	  }, {
	    key: 'setScrollSize',
	    value: function setScrollSize() {

	      // if ( !( navigator.userAgent.match( /iPhone/i ) ) || !( navigator.userAgent.match( /iPod/i ) ) ) {
	      //   return false;
	      // }

	      if (this.isIos) {
	        return false;
	      }

	      if (!this.scrollIsInit) {
	        return false;
	      }

	      var style = getComputedStyle(this.box);
	      // let minTop = this.minTop = parseInt( style.paddingTop.replace( 'px', '' ), 10 ) || 0;
	      var minTop = this.minTop = 0;

	      var visibleHeight = this.offsetHeight = this.box.offsetHeight,
	          fullHeight = this.fullHeight = this.box.scrollHeight;

	      var n = 0;
	      if (!this.isProjectPreview) {
	        var windowW = document.body.offsetHeight;
	        n = this.n = windowW - visibleHeight;
	      }

	      visibleHeight = this.offsetHeight = visibleHeight;
	      fullHeight = this.fullHeight = fullHeight;

	      var maxScrollHeight = this.maxScrollHeight = fullHeight - visibleHeight;

	      if (visibleHeight + 1 < fullHeight) {
	        this.hasScroll = true;
	      } else {
	        this.hasScroll = false;
	      }

	      // if( this.hasScroll && this.scrollWidth ) {
	      if (this.hasScroll) {

	        // this.scroll.style.display = '';
	        this.scroll.classList.remove('display-none');

	        if (_global2.default.ww < 992) {

	          this.scrollLine.style.height = 0;
	          this.box.style.width = '';
	          // this.box.style.paddingRight = '';
	        } else {
	          var height = this.box.clientHeight - minTop,
	              fullheight = this.box.scrollHeight - minTop;

	          this.precent = height / fullheight;

	          this.lineHeight = height * this.precent + n;

	          this.scrollLine.style.height = this.lineHeight + 'px';

	          this.scrollLine.style.top = this.minTop + 'px';

	          this.box.style.width = _global2.default.scrollWidth + this.parent.clientWidth + 'px';
	        }
	      } else {
	        this.scrollLine.style.height = 0;
	        this.box.style.width = '';
	        // this.scroll.style.display = 'none';
	        this.scroll.classList.add('display-none');
	      }
	    }
	  }, {
	    key: 'animateScroll',
	    value: function animateScroll() {

	      if (_global2.default.ww < 992) {
	        return false;
	      }

	      var top = this.box.scrollTop * this.precent + this.minTop;

	      var clientHeight = this.box.clientHeight;

	      if (top < 0) {
	        top = this.minTop;
	      } else if (top > clientHeight + this.n - this.lineHeight) {
	        top = clientHeight + this.n - this.lineHeight;
	      }

	      this.currentTop = top;
	      this.scrollLine.style.top = top + 'px';
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      var _this2 = this;

	      if (!this.scrollIsInit) {
	        return false;
	      }

	      // var ticking = false;

	      var scroll = (0, _lodash2.default)(function (event) {
	        if (_this2.isIos) {
	          return false;
	        }

	        // alert( 'work' );

	        event.stopPropagation();

	        var self = _this2;

	        // if ( !ticking ) {
	        // window.requestAnimationFrame( () => {
	        self.animateScroll();
	        // ticking = false;
	        // } );
	        // }

	        // ticking = true;

	        // this.animateScroll();
	      }, 100);

	      this.box.addEventListener('scroll', scroll);
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      if (this.scroll && this.scroll.parentNode) {
	        this.scroll.parentNode.removeChild(this.scroll);
	      }
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {

	      if (!this.scrollIsInit) {
	        return false;
	      }

	      this.setBoxWidth();
	      this.setScrollSize();
	    }
	  }]);

	  return AtailScroll;
	}();

	exports.default = AtailScroll;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	function now() {
	  return Date.now();
	}

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide an options object to indicate whether
	 * `func` should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = throttle;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Globals Variables
	// ==========================================================================


	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	var _transitionEvent = __webpack_require__(8);

	var _animationSupport = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Preloader = function () {
	  function Preloader() {
	    var _this = this;

	    _classCallCheck(this, Preloader);

	    var preloaderWrap = this.preloaderWrap = document.querySelector('.atail-preloader-wrapper');

	    // let preloaderWrap = this.preloaderWrap = document.createElement( 'DIV' );
	    // preloaderWrap.className = 'atail-preloader-wrapper';

	    var preloader = this.preloader = preloaderWrap.querySelector('.atail-preloader');

	    // let preloader = this.preloader = document.createElement( 'DIV' );
	    // preloader.className = 'atail-preloader';

	    this.span = preloaderWrap.querySelector('span');

	    // let span = this.span = document.createElement( 'span' );
	    // span.innerHTML = 'Loading';

	    this.cloneSpan = preloader.querySelector('span');

	    this.cloneSpan.style.width = window.innerWidth + 'px';

	    // let cloneSpan = this.cloneSpan = span.cloneNode( true );

	    // preloaderWrap.appendChild( span );
	    // preloader.appendChild( cloneSpan );

	    // preloaderWrap.appendChild( preloader );
	    // document.body.appendChild( preloaderWrap );

	    var animate = function animate() {

	      if (preloader.classList.contains('atail-preloader-loaded')) {
	        // this.preloaderWrap.style.display = 'none';
	        _this.preloaderWrap.classList.add('display-none');
	        return false;
	      }

	      if (preloader.classList.contains('full-preloader')) {
	        if (!_global2.default.windowIsLoad) {
	          setTimeout(animate, 100);
	          return false;
	        }

	        // GlobalVariables.atailMain.style.opacity = 1;
	        _global2.default.atailMain.classList.add('atail-opacity-1');
	        preloader.classList.add('atail-preloader-loaded');
	        // this.span.style.display = 'none';
	        _this.span.classList.add('display-none');
	      }
	    };

	    preloader.addEventListener(_transitionEvent.transitionEvent, animate);

	    setTimeout(function () {
	      _this.init();
	    }, 0);
	  }

	  _createClass(Preloader, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;

	      // animate dots
	      var dots = this.preloaderWrap.querySelectorAll('.atail-dot');

	      setTimeout(function () {
	        dots[0].classList.add('start-animation');
	        dots[3].classList.add('start-animation');

	        setTimeout(function () {
	          dots[1].classList.add('start-animation');
	          dots[4].classList.add('start-animation');

	          setTimeout(function () {
	            dots[2].classList.add('start-animation');
	            dots[5].classList.add('start-animation');
	          }, 200);
	        }, 200);
	      }, 0);

	      // animate preloader
	      this.preloader.classList.add('atail-loading');

	      var images = document.querySelectorAll('img'),
	          length = images.length;

	      var iteration = 0;

	      if (length) {
	        var _ret = function () {
	          var precent = 100 / length,
	              n = 0;

	          [].forEach.call(images, function (img) {
	            var image = new Image();
	            var src = img.src;
	            image.onload = function () {

	              iteration++;

	              if (iteration === length) {
	                _this2.preloader.classList.add('full-preloader');
	                _this2.preloader.style.width = '';

	                if (!_animationSupport.animationSupport) {
	                  _this2.preloader.classList.add('atail-preloader-loaded');
	                  // GlobalVariables.atailMain.style.opacity = 1;
	                  _global2.default.atailMain.classList.add('atail-opacity-1');
	                }
	              } else {
	                n += precent;
	                _this2.preloader.style.width = n + precent + '%';
	              }
	            };
	            image.onerror = function () {

	              iteration++;

	              if (iteration === length) {
	                _this2.preloader.classList.add('full-preloader');
	                _this2.preloader.style.width = '';

	                if (!_animationSupport.animationSupport) {
	                  _this2.preloader.classList.add('atail-preloader-loaded');
	                  // GlobalVariables.atailMain.style.opacity = 1;
	                  _global2.default.atailMain.classList.add('atail-opacity-1');
	                }
	              } else {
	                n += precent;
	                _this2.preloader.style.width = n + precent + '%';
	              }
	            };
	            image.src = src;
	          });

	          return {
	            v: true
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }

	      this.preloader.classList.add('full-preloader');
	      this.preloader.style.width = '';

	      if (!_animationSupport.animationSupport) {
	        this.preloader.classList.add('atail-preloader-loaded');
	        // GlobalVariables.atailMain.style.opacity = 1;
	        _global2.default.atailMain.classList.add('atail-opacity-1');
	      }
	    }
	  }, {
	    key: 'showAtail',
	    value: function showAtail() {
	      var _this3 = this;

	      setTimeout(function () {
	        if (!_this3.preloader.classList.contains('atail-preloader-loaded')) {
	          _this3.preloader.classList.add('atail-preloader-loaded');
	          // GlobalVariables.atailMain.style.opacity = 1;
	          _global2.default.atailMain.classList.add('atail-opacity-1');
	          // this.span.style.display = 'none';
	          _this3.span.classList.add('display-none');

	          setTimeout(function () {
	            if (_this3.vis()) {
	              // this.preloaderWrap.style.display = 'none';
	              _this3.preloaderWrap.classList.add('display-none');
	            }
	          }, 600);
	        }
	      }, 1800);
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      this.cloneSpan.style.width = window.innerWidth + 'px';
	    }
	  }, {
	    key: 'vis',
	    value: function vis() {
	      var stateKey,
	          eventKey,
	          keys = {
	        hidden: "visibilitychange",
	        webkitHidden: "webkitvisibilitychange",
	        mozHidden: "mozvisibilitychange",
	        msHidden: "msvisibilitychange"
	      };
	      for (stateKey in keys) {
	        if (stateKey in document) {
	          eventKey = keys[stateKey];
	          break;
	        }
	      }
	      return function (c) {
	        if (c) document.addEventListener(eventKey, c);
	        return !document[stateKey];
	      };
	    }
	  }]);

	  return Preloader;
	}();

	exports.default = Preloader;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _global = __webpack_require__(5);

	var _global2 = _interopRequireDefault(_global);

	var _transitionEvent = __webpack_require__(8);

	var _scroll = __webpack_require__(19);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _animationSupport = __webpack_require__(10);

	var _promiseAjax = __webpack_require__(12);

	var _lodash = __webpack_require__(20);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AllProjects = function () {
	  function AllProjects() {
	    _classCallCheck(this, AllProjects);

	    this.isInit = false;
	    this.timeOver = null;
	  }

	  _createClass(AllProjects, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      var allProjects = this.allProjects = document.querySelector('.all-atail-projects');

	      if (!allProjects) {
	        return false;
	      }

	      this.atailProjectsParent = document.querySelector('.all-atail-projects-wrapper');

	      var allProjectsArray = this.allProjectsArray = allProjects.querySelectorAll('.all-atail-projects-single');

	      if (!allProjectsArray) {
	        return false;
	      }

	      this.allProjectsArrayIE = [];

	      [].forEach.call(allProjectsArray, function (item) {
	        var clone = item.cloneNode(true);
	        _this.allProjectsArrayIE.push(clone);
	      });

	      this.currentCategoryArray = [].slice.call(this.allProjectsArray, 0);
	      this.projectsCategoryWrapper = this.currentCategoryArray[0].parentNode;

	      var allProjectsLength = this.allProjectsLength = allProjectsArray.length;

	      this.projectCategory = document.querySelector('.all-atail-projects-category');

	      // set project category width and positions
	      var sideWidth = 0;
	      var precent = 0.3333333;
	      if (_global2.default.ww > 991) {
	        precent = 0.1666667;
	        if (_global2.default.ww > 1400) {
	          sideWidth = 100;
	        } else {
	          sideWidth = 70;
	        }
	      }

	      // this.projectCategory.style.width = GlobalVariables.main.clientWidth * precent + 'px';
	      // this.projectCategory.style.right = ( GlobalVariables.ww - GlobalVariables.atailMain.clientWidth ) / 2 +
	      //   sideWidth +
	      //   'px';

	      this.projectCategory.style.cssText = 'width: ' + _global2.default.mainClientWidth * precent + 'px; right: ' + ((_global2.default.ww - _global2.default.atailMainClientWidth) / 2 + sideWidth) + 'px';

	      this.categoryWrapper = this.projectCategory.querySelector('.all-atail-projects-category-wrapper');
	      this.projectsCategoryWrapperScroll = new _scroll2.default(this.categoryWrapper);

	      this.projectsCategoryWrapperScroll.init();

	      //****************************************************************

	      var projectInfo = this.projectInfo = [];
	      projectInfo.top = [];
	      projectInfo.bot = [];
	      projectInfo.height = [];

	      [].forEach.call(allProjectsArray, function (item) {
	        projectInfo.top.push(item.offsetTop);
	        projectInfo.bot.push(item.offsetTop + item.clientHeight);
	        projectInfo.height.push(item.clientHeight);
	      });

	      this.scrollHeight = this.allProjects.scrollHeight;

	      var style = this.style = document.createElement('STYLE');
	      document.body.appendChild(style);

	      var animateBox = this.animateBox = document.createElement('DIV');
	      animateBox.className = 'all-projects-animate-box';
	      animateBox.innerHTML = '<div></div><div></div><div></div><div></div><div></div>';

	      _global2.default.sides.querySelector('div').appendChild(animateBox);
	      animateBox.addEventListener(_transitionEvent.transitionEvent, this.categoryAnimating.bind(this));

	      this.isInit = true;

	      this.currentTarget = this.projectCategory.querySelector('.active[data-action="show-category"]');

	      var scrollTop = this.allProjects.scrollTop;

	      this.onScroll(scrollTop);

	      // init Sldier
	      this.scroll = new _scroll2.default(allProjects);
	      this.scroll.init();

	      var scroll = (0, _lodash2.default)(function (event) {

	        event.stopPropagation();

	        var scrollTop = allProjects.scrollTop;

	        _this.onScroll(scrollTop);
	      }, 150);

	      // event scroll
	      allProjects.addEventListener('scroll', scroll);
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      if (this.isInit) {
	        this.scroll.resize();
	      }
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(scrollTop) {

	      if (!this.isInit) {
	        return false;
	      }

	      var height = scrollTop + _global2.default.wh * .85,
	          length = this.currentCategoryArray.length,
	          info = this.projectInfo,
	          projects = this.currentCategoryArray;

	      for (var i = 0; i < length; i++) {

	        if (!_animationSupport.animationSupport) {
	          projects[i].classList.add('is-visible');
	        } else if (info.top[i] < height) {
	          if (info.bot[i] < scrollTop) {
	            projects[i].classList.add('is-visible-bot');
	            projects[i].classList.add('is-visible');
	          } else {
	            projects[i].classList.remove('is-visible-bot');
	            projects[i].classList.add('is-visible');
	          }
	        } else {
	          projects[i].classList.remove('is-visible');
	        }
	      }
	    }
	  }, {
	    key: 'showCategory',
	    value: function showCategory(target) {

	      if (target.classList.contains('active')) {
	        return false;
	      }

	      if (!this.currentTarget) {
	        this.currentTarget = target;
	      }

	      this.currentTarget.classList.remove('active');
	      this.currentTarget = target;
	      target.classList.add('active');

	      this.categoryId = target.getAttribute('data-category');

	      if (_animationSupport.animationSupport) {
	        _global2.default.sides.classList.add('all-projects-box-animating');
	      } else {
	        _global2.default.sides.classList.add('all-projects-box-animating');
	        this.categoryAnimating();
	      }
	    }
	  }, {
	    key: 'categoryAnimating',
	    value: function categoryAnimating() {
	      var _this2 = this;

	      var sides = _global2.default.sides,
	          categoryId = this.categoryId;

	      if (sides.classList.contains('all-projects-box-animating')) {

	        if (sides.classList.contains('box-animating')) {
	          sides.classList.remove('all-projects-box-animating');
	          sides.classList.remove('box-animating');
	          this.categoryId = null;
	        } else {
	          (function () {

	            _this2.currentCategoryArray = [];

	            _this2.fragment = document.createDocumentFragment();

	            _this2.allProjectsArray = [];

	            [].forEach.call(_this2.allProjectsArrayIE, function (item) {
	              var clone = item.cloneNode(true);
	              _this2.allProjectsArray.push(clone);
	            });

	            [].forEach.call(_this2.allProjectsArray, function (itemP) {

	              var item = itemP.cloneNode(true);

	              item.classList.remove('is-visible');
	              item.classList.remove('is-visible-bot');

	              var category = item.getAttribute('data-categories');

	              if (categoryId.indexOf('cat-all') !== -1) {

	                _this2.currentCategoryArray.push(item);
	                _this2.fragment.appendChild(item);
	              } else if (category.indexOf(categoryId) !== -1) {

	                _this2.currentCategoryArray.push(item);
	                _this2.fragment.appendChild(item);
	              }
	            });

	            _this2.projectsCategoryWrapper.innerHTML = '';
	            _this2.projectsCategoryWrapper.appendChild(_this2.fragment);

	            var projectInfo = _this2.projectInfo = [];
	            projectInfo.top = [];
	            projectInfo.bot = [];
	            projectInfo.height = [];

	            [].forEach.call(_this2.currentCategoryArray, function (item) {
	              var offsetTop = item.offsetTop,
	                  clientHeight = item.clientHeight;
	              projectInfo.top.push(offsetTop);
	              projectInfo.bot.push(offsetTop + clientHeight);
	              projectInfo.height.push(clientHeight);
	            });

	            setTimeout(function () {
	              _this2.scrollHeight = _this2.allProjects.scrollHeight;
	              _this2.allProjects.scrollTop = 0;
	              document.body.scrollTop = 0;
	              _this2.onScroll(0);

	              _this2.scroll.resize();

	              if (_animationSupport.animationSupport) {
	                sides.classList.add('box-animating');
	              } else {
	                sides.classList.remove('all-projects-box-animating');
	                sides.classList.remove('box-animating');
	                _this2.categoryId = null;
	              }
	            }, 100);
	          })();
	        }
	      }
	    }
	  }, {
	    key: 'showProjects',
	    value: function showProjects(target) {
	      var _this3 = this;

	      if (this.isOpened) {
	        return false;
	      }

	      this.isOpened = true;

	      (0, _promiseAjax.httpGet)('jsons/atail_get_all_projects/all_projects.html', target).then(function (data) {

	        _global2.default.main.classList.add('all-projects-loading');

	        // for ajax
	        var closeProjectsBtn = _this3.closeProjectsBtn = document.createElement('DIV');
	        closeProjectsBtn.className = 'close-projects-btn';
	        closeProjectsBtn.setAttribute('data-action', 'all-projects-close');
	        closeProjectsBtn.innerHTML = '<span></span><span></span>';

	        _global2.default.header.appendChild(_this3.closeProjectsBtn);
	        // this.closeProjectsBtn

	        if (_global2.default.lang) {
	          _global2.default.lang.classList.add('hide-lang');
	        }

	        setTimeout(function () {

	          _global2.default.main.classList.add('all-projects-loaded');

	          document.body.classList.remove('window-height');

	          _global2.default.main.insertAdjacentHTML('beforeend', data);

	          _this3.closeProjectsBtn.classList.add('close-projects-btn-loaded');

	          var allProjects = _global2.default.main.querySelector('.all-atail-projects-wrapper');

	          if (!allProjects) {
	            return false;
	          }

	          allProjects.style.opacity = 0;

	          var images = allProjects.querySelectorAll('img');

	          if (images.length <= 0) {
	            allProjects.style.opacity = '';
	            _this3.init();
	          } else {
	            (function () {
	              var length = images.length,
	                  itteration = 0;

	              var initAll = function initAll() {
	                itteration++;

	                if (itteration === length) {
	                  allProjects.style.opacity = '';
	                  _this3.init();
	                }
	              };

	              [].forEach.call(images, function (img) {

	                var image = new Image();
	                image.onload = function () {
	                  initAll();
	                };
	                image.onerror = function () {
	                  initAll();
	                };
	                image.src = img.src;
	              });
	            })();
	          }

	          setTimeout(function () {
	            // set project category width and positions
	            var sideWidth = 0;
	            var precent = 0.3333333;
	            if (_global2.default.ww > 991) {
	              precent = 0.1666667;
	              if (_global2.default.ww > 1400) {
	                sideWidth = 100;
	              } else {
	                sideWidth = 70;
	              }
	            }
	            _this3.projectCategory.style.width = _global2.default.main.clientWidth * precent + 'px';
	            _this3.projectCategory.style.right = (_global2.default.ww - _global2.default.atailMain.clientWidth) / 2 + sideWidth + 'px';
	          }, 100);
	        }, 100);
	      }).catch(function () {
	        _this3.isAnimating = false;
	      });

	      // wp.ajax.send( 'atail_get_all_projects', {
	      //   data: {
	      //     token: getCookie( 'atail_xslt' ),
	      //     count: target.getAttribute( 'data-count' )
	      //   },
	      //   success: data => {
	      //     setCookie( 'atail_xslt', data.token );
	      //
	      //     GlobalVariables.main.classList.add( 'all-projects-loading' );
	      //
	      //     if ( data.disable_lines ) {
	      //       GlobalVariables.main.classList.add( 'atail-disable-decoration' );
	      //     }
	      //
	      //     // for ajax
	      //     let closeProjectsBtn = this.closeProjectsBtn = document.createElement( 'DIV' );
	      //     closeProjectsBtn.className = 'close-projects-btn';
	      //     closeProjectsBtn.setAttribute( 'data-action', 'all-projects-close' );
	      //     closeProjectsBtn.innerHTML = '<span></span><span></span>';
	      //
	      //     GlobalVariables.header.appendChild( this.closeProjectsBtn );
	      //     // this.closeProjectsBtn
	      //
	      //     if ( GlobalVariables.lang ) {
	      //       GlobalVariables.lang.classList.add( 'hide-lang' );
	      //     }
	      //
	      //     setTimeout( () => {
	      //
	      //       GlobalVariables.main.classList.add( 'all-projects-loaded' );
	      //
	      //       document.body.classList.remove( 'window-height' );
	      //
	      //       GlobalVariables.main.insertAdjacentHTML( 'beforeend', data.content );
	      //
	      //       this.closeProjectsBtn.classList.add( 'close-projects-btn-loaded' );
	      //
	      //       let allProjects = GlobalVariables.main.querySelector( '.all-atail-projects-wrapper' );
	      //
	      //       if ( !allProjects ) {
	      //         return false;
	      //       }
	      //
	      //       allProjects.style.opacity = 0;
	      //
	      //       let images = allProjects.querySelectorAll( 'img' );
	      //
	      //       if ( images.length <= 0 ) {
	      //         allProjects.style.opacity = '';
	      //         this.init();
	      //       } else {
	      //         let length = images.length,
	      //           itteration = 0;
	      //
	      //         let initAll = () => {
	      //           itteration++;
	      //
	      //           if ( itteration === length ) {
	      //             allProjects.style.opacity = '';
	      //             this.init();
	      //           }
	      //         };
	      //
	      //         [].forEach.call( images, img => {
	      //
	      //           let image = new Image();
	      //           image.onload = () => {
	      //             initAll();
	      //           };
	      //           image.onerror = () => {
	      //             initAll();
	      //           };
	      //           image.src = img.src;
	      //
	      //         } );
	      //       }
	      //
	      //
	      //     }, 100 );
	      //
	      //   },
	      //   error: data => {
	      //     console.error( data );
	      //   }
	      // } );
	    }
	  }, {
	    key: 'closeProjects',
	    value: function closeProjects() {
	      var _this4 = this;

	      this.closeProjectsBtn.classList.remove('close-projects-btn-loaded');

	      _global2.default.main.classList.add('all-projects-closing');

	      setTimeout(function () {
	        document.body.classList.add('window-height');

	        _global2.default.main.removeChild(_this4.atailProjectsParent);

	        _global2.default.header.removeChild(_this4.closeProjectsBtn);

	        _global2.default.main.classList.remove('all-projects-loaded');
	        setTimeout(function () {
	          _global2.default.main.classList.remove('all-projects-loading');
	        }, 0);

	        _global2.default.main.classList.remove('all-projects-closing');
	        _global2.default.main.classList.remove('atail-disable-decoration');

	        if (_global2.default.lang) {
	          _global2.default.lang.classList.remove('hide-lang');
	        }

	        _this4.scroll.remove();

	        _this4.isOpened = false;
	      }, 600);
	    }
	  }, {
	    key: 'resize',
	    value: function resize() {
	      var _this5 = this;

	      clearTimeout(this.timeOver);

	      this.timeOver = setTimeout(function () {

	        if (!_this5.isInit) {
	          return false;
	        }

	        var projectInfo = _this5.projectInfo = [];
	        projectInfo.top = [];
	        projectInfo.bot = [];
	        projectInfo.height = [];

	        [].forEach.call(_this5.currentCategoryArray, function (item) {
	          projectInfo.top.push(item.offsetTop);
	          projectInfo.bot.push(item.offsetTop + item.clientHeight);
	          projectInfo.height.push(item.clientHeight);
	        });

	        setTimeout(function () {

	          if (_global2.default.ww >= 992) {
	            _this5.scrollHeight = _this5.allProjects.scrollHeight;
	            _this5.onScroll(_this5.allProjects.scrollTop);
	          } else {
	            _this5.scrollHeight = document.body.scrollHeight;
	            _this5.onScroll(document.body.scrollTop);
	          }

	          _this5.scroll.resize();

	          // set project category width and positions
	          var sideWidth = 0;
	          var precent = 0.3333333;
	          if (_global2.default.ww > 991) {
	            precent = 0.1666667;
	            if (_global2.default.ww > 1400) {
	              sideWidth = 100;
	            } else {
	              sideWidth = 70;
	            }
	          }
	          _this5.projectCategory.style.width = _global2.default.main.clientWidth * precent + 'px';
	          _this5.projectCategory.style.right = (_global2.default.ww - _global2.default.atailMain.clientWidth) / 2 + sideWidth + 'px';

	          _this5.projectsCategoryWrapperScroll.resize();
	        }, 0);
	      }, 200);
	    }
	  }]);

	  return AllProjects;
	}();

	exports.default = AllProjects;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by mestafor on 25.07.16.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _promiseAjax = __webpack_require__(12);

	var _Serialize = __webpack_require__(24);

	var _cleanForm = __webpack_require__(25);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContactForm = function () {
	    function ContactForm(forms, fileUrl, action) {
	        _classCallCheck(this, ContactForm);

	        if (!forms || !fileUrl) {
	            return;
	        }

	        this.fileUrl = fileUrl ? fileUrl : null; //'php/contact.php';
	        this.forms = document.querySelectorAll(forms);
	        this.action = action ? action : 'contact';

	        this.init();
	    }

	    _createClass(ContactForm, [{
	        key: "init",
	        value: function init() {
	            var _this = this;

	            if (this.forms.length <= 0) {
	                return false;
	            }

	            var forms = this.forms;
	            [].forEach.call(forms, function (form) {

	                form.onsubmit = function (event) {

	                    event.preventDefault();

	                    var submit_btn = form.querySelector('[type="submit"]');
	                    var comment = form.querySelector('[name="comment"]');
	                    var email = form.querySelector('[name="email"]');
	                    var name = form.querySelector('[name="name"]');

	                    var sendRequest = true;

	                    if (comment) {
	                        if (!comment.value) {
	                            comment.classList.add('error');
	                            sendRequest = false;
	                        } else {
	                            comment.classList.remove('error');
	                        }
	                    }

	                    if (email) {

	                        if (!email.value || !_this.validateEmail(email.value)) {
	                            email.classList.add('error');
	                            sendRequest = false;
	                        } else {
	                            email.classList.remove('error');
	                        }
	                    }

	                    if (name) {
	                        if (!name.value) {
	                            name.classList.add('error');
	                            sendRequest = false;
	                        } else {
	                            name.classList.remove('error');
	                        }
	                    }

	                    if (!sendRequest) {
	                        return false;
	                    }

	                    (0, _promiseAjax.httpPost)(_this.fileUrl, (0, _Serialize.form_serialize)(form), _this.action).then(function (result) {

	                        result = JSON.parse(result);

	                        if (result.status === 'success') {

	                            form.classList.add('form-success');

	                            submit_btn ? submit_btn.setAttribute('disabled', 'disabled') : null;

	                            (0, _cleanForm.clean_form)(form);

	                            setTimeout(function () {
	                                form.classList.remove('form-success');
	                            }, 300);
	                        } else {
	                            if (result.commentMissed) {
	                                comment ? comment.classList.add('error') : null;
	                            }
	                            if (result.emailMissed) {
	                                email ? email.classList.add('error') : null;
	                            }
	                            if (result.nameMissed) {
	                                name ? name.classList.add('error') : null;
	                            }
	                        }
	                    });
	                };
	            });
	        }
	    }, {
	        key: "validateEmail",
	        value: function validateEmail(email) {
	            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	            return re.test(email);
	        }
	    }]);

	    return ContactForm;
	}();

	exports.default = ContactForm;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.form_serialize = form_serialize;
	/**
	 * Created by mestafor on 25.07.16.
	 */
	function form_serialize(form) {
	    if (!form || form.nodeName !== "FORM") {
	        return;
	    }
	    var i,
	        j,
	        obj = {};
	    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
	        if (form.elements[i].name === "") {
	            continue;
	        }
	        switch (form.elements[i].nodeName) {
	            case 'INPUT':
	                switch (form.elements[i].type) {
	                    case 'text':
	                    case 'hidden':
	                    case 'password':
	                    case 'button':
	                    case 'reset':
	                    case 'submit':
	                        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
	                        break;
	                    case 'email':
	                        obj[form.elements[i].name] = form.elements[i].value;
	                        break;
	                    case 'checkbox':
	                    case 'radio':
	                        if (form.elements[i].checked) {
	                            obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
	                        }
	                        break;
	                    case 'file':
	                        break;
	                }
	                break;
	            case 'TEXTAREA':
	                obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
	                break;
	            case 'SELECT':
	                switch (form.elements[i].type) {
	                    case 'select-one':
	                        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
	                        break;
	                    case 'select-multiple':
	                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
	                            if (form.elements[i].options[j].selected) {
	                                obj[form.elements[i].name] = encodeURIComponent(form.elements[i].options[j].value);
	                            }
	                        }
	                        break;
	                }
	                break;
	            case 'BUTTON':
	                switch (form.elements[i].type) {
	                    case 'reset':
	                    case 'submit':
	                    case 'button':
	                        obj[form.elements[i].name] = encodeURIComponent(form.elements[i].value);
	                        break;
	                }
	                break;
	        }
	    }
	    return obj;
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.clean_form = clean_form;
	/**
	 * Created by mestafor on 25.07.16.
	 */
	function clean_form(form) {
	    if (!form || form.nodeName !== "FORM") {
	        return;
	    }
	    var i,
	        j,
	        obj = {};
	    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
	        if (form.elements[i].name === "") {
	            continue;
	        }
	        switch (form.elements[i].nodeName) {
	            case 'INPUT':
	                switch (form.elements[i].type) {
	                    case 'text':
	                    case 'hidden':
	                    case 'password':
	                    case 'button':
	                    case 'reset':
	                    case 'submit':
	                        form.elements[i].value = '';
	                        break;
	                    case 'email':
	                        form.elements[i].value = '';
	                        break;
	                    case 'checkbox':
	                    case 'radio':
	                    case 'file':
	                        break;
	                }
	                break;
	            case 'TEXTAREA':
	                form.elements[i].value = '';
	                break;
	        }
	    }
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/* requestAnimationFrame
	----------------------------------------------------------------------*/
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	(function () {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	})();

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	// @license http://opensource.org/licenses/MIT
	// copyright Paul Irish 2015


	// Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
	//   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
	// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

	// if you want values similar to what you'd get with real perf.now, place this towards the head of the page
	// but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed


	(function () {

	  if ("performance" in window == false) {
	    window.performance = {};
	  }

	  Date.now = Date.now || function () {
	    // thanks IE8
	    return new Date().getTime();
	  };

	  if ("now" in window.performance == false) {

	    var nowOffset = Date.now();

	    if (performance.timing && performance.timing.navigationStart) {
	      nowOffset = performance.timing.navigationStart;
	    }

	    window.performance.now = function now() {
	      return Date.now() - nowOffset;
	    };
	  }
	})();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.blogPostLike = blogPostLike;

	var _setCookie = __webpack_require__(29);

	function blogPostLike(target) {
	  wp.ajax.send('atail_add_like', {
	    data: {
	      token: (0, _setCookie.getCookie)('atail_xslt'),
	      post_id: target.getAttribute('data-post')
	    },
	    success: function success(data) {
	      var template = '<i class="fa fa-heart-o" aria-hidden="true"></i>' + data.likes;
	      target.innerHTML = template;
	      (0, _setCookie.setCookie)('atail_xslt', data.token);
	    },
	    error: function error(data) {
	      console.error(data);
	    }
	  });
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setCookie = setCookie;
	exports.getCookie = getCookie;
	function setCookie(name, value, options) {
	  options = options || {};

	  var expires = options.expires;

	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + "=" + value;

	  for (var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}

	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.blogPostDislike = blogPostDislike;

	var _setCookie = __webpack_require__(29);

	function blogPostDislike(target) {
	  wp.ajax.send('atail_add_dislike', {
	    data: {
	      token: (0, _setCookie.getCookie)('atail_xslt'),
	      post_id: target.getAttribute('data-post')
	    },
	    success: function success(data) {
	      ;
	      var template = '<span class="comments-icon">&#207;</span>' + data.dislikes;
	      target.innerHTML = template;
	      (0, _setCookie.setCookie)('atail_xslt', data.token);
	    },
	    error: function error(data) {
	      console.error(data);
	    }
	  });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _animationSupport = __webpack_require__(10);

	var _transitionEvent = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Slider = function () {
	  function Slider() {
	    var className = arguments.length <= 0 || arguments[0] === undefined ? '.atail-slider' : arguments[0];
	    var autoplay = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    _classCallCheck(this, Slider);

	    this.isInited = false;
	    this.isMouseOver = false;
	    this.autoplay = autoplay;

	    this.init(className);
	  }

	  _createClass(Slider, [{
	    key: 'init',
	    value: function init(className) {
	      var _this = this;

	      var slider = this.slider = document.querySelector(className);

	      if (!slider) {
	        return false;
	      }

	      slider.classList.add('atail-slider');

	      var sliderItems = this.sliderItems = slider.children;
	      this.sliderItems = [];

	      if (sliderItems.length <= 0) {
	        return false;
	      }

	      sliderItems[0].classList.add('active');

	      [].forEach.call(sliderItems, function (item) {
	        _this.sliderItems.push(item);
	        item.classList.add('atail-slider-item');
	      });

	      this.currentItem = 0;
	      this.prevItem = 0;

	      this.createAnimateBox();
	      this.mouseEvent();
	      this.onTouch();

	      this.isInited = true;

	      if (this.autoplay) {

	        if (this.isMouseOver) {
	          return false;
	        }
	      }
	    }
	  }, {
	    key: 'createAnimateBox',
	    value: function createAnimateBox() {
	      var _this2 = this;

	      if (this.sliderItems.length <= 1) {
	        return false;
	      }

	      var sliderAnimateBox = this.sliderAnimateBox = document.createElement('DIV');
	      var animateBoxRight = this.animateBoxRight = document.createElement('DIV');
	      var animateBoxLeft = this.animateBoxLeft = document.createElement('DIV');

	      sliderAnimateBox.className = 'slider-animate-box';
	      animateBoxRight.className = 'animate-box-right';
	      animateBoxLeft.className = 'animate-box-left';

	      sliderAnimateBox.appendChild(animateBoxLeft);
	      sliderAnimateBox.appendChild(animateBoxRight);

	      this.setTimeout = setTimeout(function () {
	        _this2.goNext();
	      }, 2500);

	      var animateBox = function animateBox(event) {
	        clearTimeout(_this2.setTimeout);

	        var target = event.currentTarget;

	        if (_this2.sliderAnimateBox.classList.contains('from-right')) {

	          if (_this2.sliderAnimateBox.classList.contains('from-right-end')) {
	            _this2.sliderAnimateBox.classList.remove('from-right-end');
	            _this2.sliderAnimateBox.classList.remove('from-right');

	            _this2.isAnimating = false;

	            if (_this2.autoplay) {

	              if (_this2.isMouseOver) {
	                return false;
	              } else {
	                _this2.setTimeout = setTimeout(function () {
	                  _this2.goNext();
	                }, 2500);
	              }
	            }
	          } else {
	            _this2.sliderItems[_this2.prevItem].classList.remove('active');
	            _this2.sliderItems[_this2.currentItem].classList.add('active');

	            _this2.sliderAnimateBox.classList.add('from-right-end');
	          }
	        } else if (_this2.sliderAnimateBox.classList.contains('from-left')) {

	          if (_this2.sliderAnimateBox.classList.contains('from-left-end')) {
	            _this2.sliderAnimateBox.classList.remove('from-left-end');
	            _this2.sliderAnimateBox.classList.remove('from-left');

	            _this2.isAnimating = false;

	            if (_this2.autoplay) {

	              if (_this2.isMouseOver) {
	                return false;
	              } else {
	                _this2.setTimeout = setTimeout(function () {
	                  _this2.goNext();
	                }, 2500);
	              }
	            }
	          } else {
	            _this2.sliderItems[_this2.prevItem].classList.remove('active');
	            _this2.sliderItems[_this2.currentItem].classList.add('active');

	            _this2.sliderAnimateBox.classList.add('from-left-end');
	          }
	        }
	      };

	      animateBoxRight.addEventListener(_transitionEvent.transitionEvent, animateBox);
	      animateBoxLeft.addEventListener(_transitionEvent.transitionEvent, animateBox);

	      var arrowTemplate = this.arrowTemplate = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width = "57.143px" height = "34.454px" viewBox = "0 0 57.143 34.454" enable - background = "new 0 0 57.143 34.454" xml: space = "preserve"><g><g><polygon points ="51.908,17.599 46.891,13.1 46.891,17.094 6.904,17.094 6.904,18.094 46.891,18.094 46.891,22.099"/></g></g></svg>';

	      this.fullPostNextSlide = document.createElement('SPAN');
	      this.fullPostNextSlide.className = 'slider-next-slide';
	      this.fullPostNextSlide.setAttribute('data-action', 'slider-next-slide');
	      this.fullPostNextSlide.innerHTML = arrowTemplate;

	      this.fullPostPrevSlide = document.createElement('SPAN');
	      this.fullPostPrevSlide.className = 'slider-prev-slide';
	      this.fullPostPrevSlide.setAttribute('data-action', 'slider-prev-slide');
	      this.fullPostPrevSlide.innerHTML = arrowTemplate;

	      this.slider.appendChild(sliderAnimateBox);
	      this.slider.appendChild(this.fullPostNextSlide);
	      this.slider.appendChild(this.fullPostPrevSlide);
	    }
	  }, {
	    key: 'goNext',
	    value: function goNext() {
	      var isClick = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];


	      if (this.sliderItems.length <= 1) {
	        return false;
	      }

	      if (!isClick) {
	        if (this.isMouseOver) {
	          return false;
	        }
	      }

	      if (this.isAnimating) {
	        return false;
	      }

	      this.prevItem = this.currentItem;
	      this.currentItem++;

	      if (this.currentItem >= this.sliderItems.length) {
	        this.currentItem = 0;
	      }

	      if (!_animationSupport.animationSupport) {
	        this.changeSlide();
	      } else {
	        this.isAnimating = true;
	        this.sliderAnimateBox.classList.add('from-right');
	      }
	    }
	  }, {
	    key: 'goPrev',
	    value: function goPrev() {
	      var isClick = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];


	      if (this.sliderItems.length <= 1) {
	        return false;
	      }

	      if (!isClick) {
	        if (this.isMouseOver) {
	          return false;
	        }
	      }

	      if (this.isAnimating) {
	        return false;
	      }

	      this.prevItem = this.currentItem;
	      this.currentItem--;

	      if (this.currentItem < 0) {
	        this.currentItem = this.sliderItems.length - 1;
	      }

	      if (!_animationSupport.animationSupport) {
	        this.changeSlide();
	      } else {
	        this.isAnimating = true;
	        this.sliderAnimateBox.classList.add('from-left');
	      }
	    }
	  }, {
	    key: 'changeSlide',
	    value: function changeSlide() {
	      this.sliderItems[this.prevItem].classList.remove('active');
	      this.sliderItems[this.currentItem].classList.add('active');
	    }
	  }, {
	    key: 'mouseEvent',
	    value: function mouseEvent() {
	      var _this3 = this;

	      if (this.sliderItems.length <= 1) {
	        return false;
	      }

	      var slider = this.slider;

	      slider.onmouseenter = function (event) {
	        _this3.isMouseOver = true;
	        clearTimeout(_this3.setTimeout);
	      };

	      slider.onmouseleave = function (event) {
	        _this3.isMouseOver = false;

	        if (_this3.autoplay) {
	          setTimeout(function () {
	            _this3.goNext();
	          }, 2500);
	        }
	      };

	      slider.onmousedown = function (event) {
	        // console.log('mouse down');
	      };
	    }
	  }, {
	    key: 'onTouch',
	    value: function onTouch() {
	      var _this4 = this;

	      if (this.sliderItems.length <= 1) {
	        return false;
	      }

	      var showPrev = false,
	          showNext = false,
	          startX = null,
	          endX = null,
	          translateX = 0;

	      // touch start
	      this.slider.addEventListener('touchstart', function (event) {

	        var touch = event.touches[0];
	        startX = touch.clientX;
	      });

	      // touch move
	      this.slider.addEventListener('touchmove', function (event) {

	        var touch = event.touches[0];
	        endX = touch.clientX;
	        translateX = startX - endX;
	      });

	      // touch end
	      this.slider.addEventListener('touchend', function (event) {

	        if (translateX < -20) {
	          _this4.goPrev(true);
	        }

	        if (translateX > 20) {
	          _this4.goNext(true);
	        }

	        translateX = 0;
	      });
	    }
	  }]);

	  return Slider;
	}();

	exports.default = Slider;

/***/ }
/******/ ]);