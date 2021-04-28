/* Retina
 ----------------------------------------------------------------------*/
(function() {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var root = typeof exports === 'undefined' ? window : exports;
var config = {
    // An option to choose a suffix for 2x images
    retina2ImageSuffix: '@2x',
    retina3ImageSuffix: '@3x',

    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true,

    // Resize high-resolution images to original image's pixel dimensions
    // https://github.com/imulus/retinajs/issues/8
    force_original_dimensions: true
};

function Retina() {}

root.Retina = Retina;

Retina.configure = function (options) {
    if (options === null) {
        options = {};
    }

    for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
            config[prop] = options[prop];
        }
    }
};

Retina.init = function (context, pixelRatio) {
    var readyState = document.readyState;
    if (context === null) {
        context = root;
    }

    var onLoadWindow = function onLoadWindow() {
        var images = document.getElementsByTagName('img'),
            imagesLength = images.length,
            retinaImages = [],
            i,
            image;
        for (i = 0; i < imagesLength; i += 1) {
            image = images[i];
            if (/(\.svg)$/i.test(image.src)) {
                continue;
            }
            if (!image.getAttributeNode('data-no-retina')) {
                if (image.src) {
                    retinaImages.push(new RetinaImage(image, pixelRatio));
                }
            }
        }
    };

    if (readyState === "complete") {
        onLoadWindow();
    } else {
        context.addEventListener('load', onLoadWindow);
    }
};

Retina.reloadImage = function (block, pixelRatio) {
    if (!block) {
        return false;
    }
    var images = block.getElementsByTagName('img'),
        imagesLength = images.length,
        retinaImages = [],
        i,
        image;
    for (i = 0; i < imagesLength; i += 1) {
        image = images[i];
        if (/(\.svg)$/i.test(image.src)) {
            continue;
        }
        if (!image.getAttributeNode('data-no-retina')) {
            if (image.src) {
                retinaImages.push(new RetinaImage(image, pixelRatio));
            }
        }
    }
};

Retina.isRetina = function () {
    var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

    if (root.devicePixelRatio >= 3) {
        return 3;
    }

    if (root.devicePixelRatio > 1) {
        return 2;
    }

    if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
        return 2;
    }

    return false;
};

var regexMatch = /\.[\w\?=]+$/;
function suffixReplace(match) {
    return config["retina" + this.pixelRatio + "ImageSuffix"] + match;
}

function RetinaImagePath(path, pixelRatio, at_2x_path) {
    this.path = path || '';
    this.pixelRatio = pixelRatio;

    if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
        this.at_2x_path = at_2x_path;
        this.perform_check = false;
    } else {
        if (undefined !== document.createElement) {
            var locationObject = document.createElement('a');
            locationObject.href = this.path;
            locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace.bind(this));
            this.at_2x_path = locationObject.href;
        } else {
            var parts = this.path.split('?');
            parts[0] = parts[0].replace(regexMatch, suffixReplace.bind(this));
            this.at_2x_path = parts.join('?');
        }
        this.perform_check = true;
    }
}

root.RetinaImagePath = RetinaImagePath;

RetinaImagePath.confirmed_paths = [];

RetinaImagePath.prototype.is_external = function () {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain));
};

RetinaImagePath.prototype.check_2x_variant = function (callback) {
    var httpRequest,
        that = this,
        http;
    if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
        return callback(true);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
        return callback(true);
    } else if (this.is_external()) {
        return callback(false);
    } else {
        httpRequest = function () {
            var lastIndex, path;
            http = new XMLHttpRequest();
            http.open('HEAD', that.at_2x_path);
            http.onreadystatechange = function () {
                if (http.status === 0 || http.status >= 200 && http.status <= 399) {
                    if (config.check_mime_type) {
                        var type = http.getResponseHeader('Content-Type');
                        if (type === null || !type.match(/^image/i)) {
                            return callback(false);
                        }
                    }
                    RetinaImagePath.confirmed_paths.push(that.at_2x_path);
                    return callback(true);
                } else {
                    if (that.pixelRatio === 3) {
                        that.pixelRatio--;
                        lastIndex = that.at_2x_path.lastIndexOf("@3x.");
                        path = that.at_2x_path.split("");
                        path.splice(lastIndex, 4, "@2x.");
                        that.at_2x_path = path.join("");
                        return callback(true);
                    } else {
                        return callback(false);
                    }
                }
            };
            http.send();
        };
        httpRequest();
    }
};

function RetinaImage(el, pixelRatio) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'), pixelRatio); //this.el.getAttribute('data-at2x')
    var that = this;
    this.path.check_2x_variant(function (hasVariant) {
        if (hasVariant) {
            that.swap();
        }
    });
}

root.RetinaImage = RetinaImage;

RetinaImage.prototype.swap = function (path) {
    if (typeof path === 'undefined') {
        path = this.path.at_2x_path;
    }
    var that = this;
    function load() {
        if (!that.el.complete) {
            setTimeout(load, 5);
        } else {

            if (config.force_original_dimensions) {
                if (that.el.offsetWidth == 0 && that.el.offsetHeight == 0) {
                    that.el.setAttribute('width', that.el.naturalWidth);
                    that.el.setAttribute('height', that.el.naturalHeight);
                } else {
                    that.el.setAttribute('width', that.el.offsetWidth);
                    that.el.setAttribute('height', that.el.offsetHeight);
                }
            }

            that.el.setAttribute('src', path);
        }
    }
    load();
};

    var isRetina = Retina.isRetina();

    if (isRetina) {
        Retina.init(root, isRetina);
    }
})();