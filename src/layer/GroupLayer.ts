// This file is part of charto-model, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as Promise from 'bluebird';

import { Layer, LayerFeatures } from './Layer';
import { Feature } from '../Feature';
import { BBox } from '../BBox';

export class GroupLayer extends Layer {

	addLayer(layer: Layer) {
		this.layerList.push(layer);
	}

	getLayerFeatures(bbox: BBox) {
		const ready: Promise<LayerFeatures> = Promise.map(
			this.layerList,
			(layer: Layer) => layer.getLayerFeatures(bbox)
		).then((lists: LayerFeatures[]) => Array.prototype.concat.apply([], lists));

		return(ready);
	}

	layerList: Layer[];

}
