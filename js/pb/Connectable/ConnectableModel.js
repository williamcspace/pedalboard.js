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
 * @fileoverview Base connectable component model. Hosts input and output buffer, chain and effects base.
 */

goog.provide('pb.ConnectableModel');
goog.require('pb.IConnectableModel');



/**
 * Component model for base connectables.
 *
 * @constructor
 * @implements {pb.IConnectableModel}
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.ConnectableModel = function(context) {
    this.context = context;

    /**
     *
     * @type {AudioGainNode}
     * @protected
     */
    this.inputBuffer = this.context.createGainNode();

    /**
     *
     * @type {AudioGainNode}
     * @protected
     */
    this.outputBuffer = this.context.createGainNode();

    /**
 *
 * @type {Array.<AudioNode>}
 */
    this.chain = [];

    /**
 *
 * @type {Array.<AudioNode>}
 */
    this.effects = [];
};


/**
 * Connects the output of the audio node of this model to another audio node.
 *
 * @param {AudioNode} destination Next audio node where the output of this model's node will connect to.
 */
pb.ConnectableModel.prototype.connect = function(destination) {
    this.next = destination;
    this.chain = [].concat(this.inputBuffer, this.effects, this.outputBuffer, this.next);

    this.routeInternal();
};


/**
 * Gets the input buffer of a pedal.
 *
 * @return {AudioNode} The input buffer of this component.
 */
pb.ConnectableModel.prototype.getInput = function() {
    return this.inputBuffer;
};


/**
 * Gets the output buffer of a pedal.
 *
 * @return {AudioNode} The output buffer of this component.
 */
pb.ConnectableModel.prototype.getOutput = function() {
    return this.outputBuffer;
};


/**
 * Lets the model know who is connected to its effects node.
 *
 * @param {AudioNode} prev Previous node who is connected to this model's effects node.
 */
pb.ConnectableModel.prototype.setPrev = function(prev) {
    this.prev = prev;
};


/**
 * Routes the internal effects chain.
 *
 * @protected
 */
pb.ConnectableModel.prototype.routeInternal = function() {
    var chain = this.chain;

    for (var i = 0, len = chain.length - 1; i < len; i++) {
        chain[i].connect(chain[i + 1]);
    }
};


/**
 * Disconnects the output buffer of this pedal.
 */
pb.ConnectableModel.prototype.disconnect = function() {
    this.outputBuffer.disconnect();
};
