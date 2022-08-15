var lazy, recaptcha, map;

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
});

function preloadAjax(data, callback, type) {
    if (!type) type = 'json';
    $.ajax({
        url: myajax,
        type: 'post',
        data: data,
        dataType: type,
        success: function(json) {
            if (callback) {
                callback(json);
            }
        },
    });
}

function blincElement(elem) {
    if (!elem || !elem.length) return false;
    if (elem.data('blink')) return false;
    var red = false;
    var color = '#9e9e9e';
    if (elem.css('border-color') && elem.css('border-color') != color) {
        color = elem.css('border-color');
    }

    elem.data('blink', true);

    var timerId = setInterval(function() {
        if (!red) {
            red = true;
            elem.css('border-color', 'red');
        } else {
            red = false;
            elem.css('border-color', color);
        }
    }, 500);

    setTimeout(function() {
        clearInterval(timerId);
        elem.data('blink', false);
        elem.css('border-color', color);
    }, 3000);
}

function lookInfo(text, head, reload, redirect) {
    var key = '[data-remodal-id="info"]';
    var modal = $(key);

    if (!text) text = '';
    modal.find('.remodal-text').html(text);

    if (!head) head = '';
    modal.find('.titleH2').html(head);

    if (reload) {
        $(document).on('closed', key, function(e) {
            location.reload();
        });
    }
    if (redirect) {
        $(document).on('closed', key, function(e) {
            location.href = redirect;
        });
    }
    modal.remodal().open();
}

var lazyObj = function() {
    var obj = this;
    var array = [];
    var empty = true;
    var wt, wh, dh, eh, et, i, on_action;

    this.add = function(block, func) {
        array.push({
            block: block,
            func: func
        });
    }

    this.check = function() {
        if (!array.length) return false;

        on_action = false;

        wt = $(window).scrollTop();
        wh = $(window).height();
        dh = $(document).height();

        for (i = 0; i < array.length; i++) {
            if (array[i]['block']) {
                et = array[i]['block'].offset().top;
                eh = array[i]['block'].outerHeight();

                if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
                    array[i]['func']();
                    on_action = true;
                    array[i] = {};
                }
            }
        }

        if (on_action) {
            empty = true;
            for (i = 0; i < array.length; i++) {
                if (array[i]['block']) {
                    empty = false;
                    break;
                }
            }

            if (empty) array = [];
        }
    }

    $(window).resize(obj.check);
    $(window).scroll(obj.check);
}

var recaptchaObj = function() {
    var obj = this;
    var key = recaptcha_key;
    var load = false;
    var on_load = false;
    var array = [];
    var i, j;

    this.add = function(id, func, callback) {
        array.push({
            id: id,
            func: func,
            callback: callback,
            key: undefined
        });
        if (key) {
            obj.check();
        } else {
            func(array.length - 1);
        }

    }

    if (!key) {
        this.execute = function(i) {
            array[i]['callback'](i);
        }

        return true;
    }

    this.execute = function(i) {
        grecaptcha.reset(i);
        grecaptcha.execute(i);
    }

    this.check = function(id) {
        if (load) {
            for (i = 0; i < array.length; i++) {
                if (array[i]['key'] === undefined) {
                    j = grecaptcha.render(array[i]['id'], {
                        sitekey: key,
                        'expired-callback': array[i]['callback'],
                        'error-callback': array[i]['callback'],
                        callback: array[i]['callback'],
                        size: 'invisible'
                    });
                    array[i]['key'] = j;
                    array[i]['func'](j);
                }

                if (id == array[i]['id']) return array[i]['key'];
            }
        } else {
            if (!on_load) {
                on_load = true;
                var script = document.createElement('script');
                script.src = 'https://www.google.com/recaptcha/api.js';
                script.async = true;

                script.onload = function() {
                    grecaptcha.ready(function() {

                        load = true;
                        obj.check(id);
                    });
                }
                document.body.appendChild(script);
            }
        }

        return undefined;
    }
}

var mapObj = function() {
    var obj = this;
    var load = false;
    var on_load = false;
    var array = [],
        i;
    var popup;

    this.init = function() {
        if (load) {
            obj.build();
        } else {
            if (!on_load) {
                on_load = true;
                var script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + map_key;
                script.async = true;

                script.onload = function() {
                    class Popup extends google.maps.OverlayView {
                        position;
                        containerDiv;
                        constructor(position, content, marker) {
                            super();
                            this.position = position;
                            const bubbleAnchor = document.createElement("div");
                            bubbleAnchor.classList.add("popup-bubble-anchor");
                            bubbleAnchor.appendChild(content);
                            this.containerDiv = document.createElement("div");
                            this.containerDiv.classList.add("popup-container");
                            this.containerDiv.appendChild(bubbleAnchor);
                            this.marker = marker;
                            this.containerDiv.onclick = function() {
                                new google.maps.event.trigger(marker, 'click');
                            }

                            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
                        }
                        onAdd() {
                            this.getPanes().floatPane.appendChild(this.containerDiv);
                        }
                        onRemove() {
                            if (this.containerDiv.parentElement) {
                                this.containerDiv.parentElement.removeChild(this.containerDiv);
                            }
                        }
                        draw() {
                            const divPosition = this.getProjection().fromLatLngToDivPixel(
                                this.position
                            );
                            const display =
                                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                                "block" :
                                "none";

                            if (display === "block") {
                                this.containerDiv.style.left = divPosition.x + "px";
                                this.containerDiv.style.top = divPosition.y + "px";
                            }

                            if (this.containerDiv.style.display !== display) {
                                this.containerDiv.style.display = display;
                            }
                        }
                    }

                    popup = Popup;

                    load = true;
                    obj.init();
                }

                document.body.appendChild(script);
            }
        }
    }

    this.add = function(id, options) {
        var block = $('#' + id);
        lazy.add(block, obj.init);
        array.push({
            block: block,
            options: options,
            init: false,
            map: false
        });
    }

    this.build = function() {
        for (i = 0; i < array.length; i++) {
            if (!array[i]['init']) obj.buildMap(i);
        }
    }

    this.buildMap = function(i) {
        var item = array[i];

        var block = item['block'][0];
        var option, options = item['options'];
        if (item['init']) return true;
        item['init'] = true;

        if (!options['center']['lat'] || !options['center']['lng']) return false;

        var center = options['center'];
        var zoom = options['zoom'] ? options['zoom'] : 15;

        item['map'] = new google.maps.Map(block, {
            zoom: zoom,
            center: {
                lat: center['lat'],
                lng: center['lng']
            },
        });

        if (options['style']) {
            var style = new google.maps.StyledMapType(options['style'], {
                name: 'Styled Map'
            });
            item['map'].mapTypes.set('styled_map', style);
            item['map'].setMapTypeId('styled_map');
        }

        if (options['marker'] && options['marker']['lat'] && options['marker']['lng']) {
            var marker = options['marker'];

            option = {
                position: {
                    lat: marker['lat'],
                    lng: marker['lng']
                },
                map: item['map'],
                animation: google.maps.Animation.DROP,
            };

            if (marker['image']) {
                var icon = {
                    url: marker['image']
                };

                if (marker['sizel'] || marker['sizer']) {
                    var sizel = marker['sizel'] ? marker['sizel'] : 0;
                    var sizer = marker['sizer'] ? marker['sizer'] : 0;

                    icon['scaledSize'] = new google.maps.Size(sizel, sizer);
                }

                option['icon'] = icon;
            }

            marker = new google.maps.Marker(option);
        }

        if (options['markers']) {
            var infowindow = new google.maps.InfoWindow();
            infowindow.setZIndex(900);

            for (i = 0; i < options['markers'].length; i++) {
                var marker_ = options['markers'][i];

                option = {
                    position: {
                        lat: marker_['lat'],
                        lng: marker_['lng']
                    },
                    map: item['map'],
                    animation: google.maps.Animation.DROP,
                };

                if (marker_['marker']) {
                    var icon = {
                        url: marker_['marker']
                    };

                    if (marker_['sizel'] || marker_['sizer']) {
                        var sizel = marker_['sizel'] ? marker_['sizel'] : 0;
                        var sizer = marker_['sizer'] ? marker_['sizer'] : 0;

                        icon['scaledSize'] = new google.maps.Size(sizel, sizer);
                    }

                    option['icon'] = icon;
                }

                marker = new google.maps.Marker(option);

                if (marker_['signature']) {
                    var div = document.createElement('div');
                    div.classList.add("popup-bubble");
                    div.classList.add("boxInfrastructure_text");
                    if (marker_['bottom']) {
                        div.classList.add("bottom_marker");
                    }
                    div.innerHTML = marker_['signature'];

                    var pop = new popup(
                        new google.maps.LatLng(marker_['lat'], marker_['lng']),
                        div,
                        marker
                    );

                    pop.setMap(item['map']);

                    marker['marker_data'] = marker_;
                    marker['infowindow'] = infowindow;
                }

                google.maps.event.addListener(marker, 'click', function() {
                    var infowindow = this['infowindow'];
                    var data = this['marker_data'];
                    var html = '<div>';
                    html += '<div id="content_2">';
                    html += '   <div id="bodyContent">';
                    if (data['image']) {
                        html += '   <img src="' + data['image'] + '" alt="' + data['title'] + '" title="' + data['title'] + '" width="100%" height="100%" class="bodyContent_fond">';
                    }
                    html += '       <div class="bodyContent_item flex f-d_column a-i_center j-c_center">';
                    html += '           <h3>' + data['title'] + '</h3>';
                    if (data['icon_text']) {
                        html += '       <p class="flex a-i_center j-c_center">';
                        if (data['icon']) {
                            html += '       <i><img src="' + data['icon'] + '" alt="icon" title="icon" width="100%" height="100%"></i>';
                        }
                        html += '           ' + data['icon_text'];
                        html += '       </p>';
                    }
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';

                    infowindow.setContent(html);
                    infowindow.open(this['map'], this);
                });
            }
        }
    }
}

var callback = function(block) {
    if (!block.length) return false;
    var recaptcha_id = block.find('.recaptcha');
    if (!recaptcha_id.length) return false;
    recaptcha_id = recaptcha_id.attr('id');

    var key;

    var init = function() {
        recaptcha.add(recaptcha_id, load, send);
    }

    var load = function(i) {
        key = i;
        recaptcha.execute(key);
    }

    var clear = function() {
        block.find('.error').remove();
    };

    var send = function(token) {
        clear();

        var data = getData(block);
        data['g-recaptcha-response'] = token;
        data['action'] = 'callback';
        data['href'] = document.location.href;

        var func = function(json) {
            if (json['errors']) {
                errors = json['errors'];
                for (i in errors) {
                    var el = block.find('[name="' + i + '"]');
                    if (!el.length) continue;
                    blincElement(el);
                    el.after('<div class="error">' + errors[i] + '</div>');
                }
            } else if (json['success']) {
                dataLayer.push({
                    "event": "form_complete"
                });
                lookInfo(json['success'], json['success_title'], true);
            }
        };

        preloadAjax(data, func);
    }

    block.delegate('.button_do', 'click', function() {
        if (key === undefined) {
            init();
        } else {
            recaptcha.execute(key);
        }
    });
}

function setErrors(block, errors) {
    var scroll = false;

    for (key in errors) {
        var el = block.find('[name="' + key + '"]');
        if (!el.length) continue;

        if (!scroll) {
            var etop = el.offset().top;
            var ebottom = etop + el.outerHeight();
            var wtop = $(window).scrollTop();
            var wbottom = wtop + $(window).innerHeight();

            if (wbottom < etop || wtop > ebottom) $('html, body').animate({
                scrollTop: el.offset().top - menu.top
            }, 500);

            scroll = true;
        }

        if (key == 'agree') {
            el = el.parent().find('label');
            if (!el.length) continue;
            el.after('<div class="error">' + errors[key] + '</div>');
            blincElement(el.find('span').first());
        } else {
            el.after('<div class="error">' + errors[key] + '</div>');
            blincElement(el);
        }
    }
}

function getData(block) {
    var data = {};

    if (!block || !block.length) return data;

    block.find('input, select, textarea').each(function() {
        if (($(this).attr('type') != 'checkbox' && $(this).attr('type') != 'radio') || $(this).is(':checked')) {
            data[$(this).attr('name')] = $(this).val();
        }
    });

    return data;
}

function setLocation(curLoc) {
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {}
}

$(document).ready(function() {
    lazy = new lazyObj();

    $('[data-remodal-id="info"]').keydown(function(e) {
        if (e.keyCode == 13) {
            $(this).remodal().close();
        }
    });

    $('.form').delegate('input', 'keydown', function(e) {
        if (e.keyCode == 13) {
            $(this).closest('.form').find('.button_do').trigger('click');
        }
    });

    recaptcha = new recaptchaObj();
    //map = new mapObj();

    $('.callback_form').each(function() {
        callback($(this));
    });

    if (finalFunc.length) {
        for (i = 0; i < finalFunc.length; i++) {
            finalFunc[i]();
        }
    }

    lazy.check();
});