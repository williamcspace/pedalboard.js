// Copyright 2012 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview Volume pedal.
 */

goog.provide('pb.box.volume.Component');
goog.require('pb.box.volume.ComponentModel');



/**
 * Volume pedal.
 *
 * @constructor
 * @param {webkitAudioContext} context Audio context the pedal will work on.
 */
pb.box.volume.Component = function(context) {
    this.model = new pb.box.volume.ComponentModel(context);
};

pb.box.volume.Component.prototype.connectOutputTo = function(destination) {
    this.model.connectOutputTo(destination);
};

pb.box.volume.Component.prototype.setVolume = function(newVolume) {
    this.model.setVolume(newVolume);
};
