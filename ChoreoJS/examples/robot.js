
define('robot', [
    "mo/lang", 
    "dollar", 
    "eventmaster", 
    "choreo", 
    "mo/easing"
], function(_, $, Event, choreo, easingLib){

    var RAD = Math.PI/180;

    choreo.config({
        easing: easingLib
    });

    function Robot(opt){
        this.joints = {};
        this.parts = {
            head: $('<div class="head"></div>')[0],
            neck: $('<div class="neck"></div>')[0],
            body: $('<div class="body"></div>')[0],
            jointArm: {
                left: $('<div class="joint-arm-left"></div>')[0],
                right: $('<div class="joint-arm-right"></div>')[0]
            },
            arm: {
                left: $('<div class="arm-left"></div>')[0],
                right: $('<div class="arm-right"></div>')[0]
            },
            jointForearm: {
                left: $('<div class="joint-forearm-left"></div>')[0],
                right: $('<div class="joint-forearm-right"></div>')[0]
            },
            forearm: {
                left: $('<div class="forearm-left"></div>')[0],
                right: $('<div class="forearm-right"></div>')[0]
            },
            jointHand: {
                left: $('<div class="joint-hand-left"></div>')[0],
                right: $('<div class="joint-hand-right"></div>')[0]
            },
            hand: {
                left: $('<div class="hand-left"></div>')[0],
                right: $('<div class="hand-right"></div>')[0]
            },
            jointWaist: $('<div class="joint-waist"></div>')[0],
            waist: $('<div class="waist"></div>')[0],
            jointHam: {
                left: $('<div class="joint-ham-left"></div>')[0],
                right: $('<div class="joint-ham-right"></div>')[0]
            },
            ham: {
                left: $('<div class="ham-left"></div>')[0],
                right: $('<div class="ham-right"></div>')[0]
            },
            jointShank: {
                left: $('<div class="joint-shank-left"></div>')[0],
                right: $('<div class="joint-shank-right"></div>')[0]
            },
            shank: {
                left: $('<div class="shank-left"></div>')[0],
                right: $('<div class="shank-right"></div>')[0]
            },
            jointFoot: {
                left: $('<div class="joint-foot-left"></div>')[0],
                right: $('<div class="joint-foot-right"></div>')[0]
            },
            foot: {
                left: $('<div class="foot-left"></div>')[0],
                right: $('<div class="foot-right"></div>')[0]
            }
        };
    }

    Robot.prototype = {

        born: function(box){
            var parts = this.parts,
                dom = $();
            Object.keys(parts).forEach(function(name){
                var part = parts[name];
                if (part.nodeType) {
                    this.push(part);
                } else {
                    for (var i in part) {
                        this.push(part[i]);
                    }
                }
            }, dom);
            $(box).addClass('robot').append(dom);

            this.hamLength = parts.jointShank.left.offsetTop 
                - parts.jointHam.left.offsetTop;
        },

        setJoint: function(part, side, deg){
            if (!deg) {
                deg = side;
                side = '';
            }
            var joints = this.joints;
            var _deg = joints[part + side] = (joints[part + side] || 0) + parseInt(deg, 10);
            if (_deg > 160) {
                _deg = joints[part + side] = 160;
            } else if (_deg < -160) {
                _deg = joints[part + side] = -160;
            }
            return _deg;
        },

        rotateHam: function(side, deg, duration, easing){

            var parts = this.parts,
                anim = choreo(),
                _deg = this.setJoint('ham', side, deg);

            anim.actor(parts.ham[side], {
                transform: 'rotate(' + _deg + 'deg)'
            }, duration, easing);

            var x = Math.sin(_deg * RAD) * this.hamLength * -1;
            var y = x / Math.tan(((180 - _deg) / 2) * RAD);
            var trans_value = 'translate(' + x + 'px, ' + y + 'px)';

            anim.actor(parts.jointShank[side], {
                transform: trans_value
            }, duration, easing);
            anim.actor(parts.shank[side], {
                transform: trans_value
            }, duration, easing);
            anim.actor(parts.jointFoot[side], {
                transform: trans_value
            }, duration, easing);
            anim.actor(parts.foot[side], {
                transform: trans_value
            }, duration, easing);

            return anim.play().follow();

        },

        rotateShank: function(side, deg, duration, easing){
        
            var parts = this.parts,
                anim = choreo(),
                _deg = this.setJoint('shank', side, deg);

            anim.actor(parts.shank[side], {
                transform: 'rotate(' + _deg + 'deg)'
            }, duration, easing);

            //var x = Math.sin(_deg * RAD) * this.hamLength * -1;
            //var y = x / Math.tan(((180 - _deg) / 2) * RAD);
            //var trans_value = 'translate(' + x + 'px, ' + y + 'px)';

            //this.x = x;
            //thix.y = y;

            //anim.actor(parts.jointFoot[side], {
                //transform: trans_value
            //}, duration, easing);
            //anim.actor(parts.foot[side], {
                //transform: trans_value
            //}, duration, easing);

            return anim.play().follow();

        }

    };

    function exports(opt){
        return new exports.Robot(opt);
    }

    exports.Robot = Robot;

    return exports;

});
