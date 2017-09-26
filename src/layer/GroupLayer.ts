// This file is part of charto-model, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Layer, LayerFeatures, LayerFeaturesPromise } from './Layer';
import { Feature } from '../Feature';
import { BBox } from '../BBox';

export class GroupLayer extends Layer {

	addLayer(layer: Layer) {
		this.layerList.push(layer);
	}

	getLayerFeatures(bbox: BBox) {
		const ready: Promise<LayerFeatures> = Promise.all(
			this.layerList.map(
				(layer: Layer) => new Promise((resolve: (layerFeatures: LayerFeaturesPromise) => void) =>
					resolve(layer.getLayerFeatures(bbox))
				)
			)
		).then((lists: LayerFeatures[]) => Array.prototype.concat.apply([], lists));

		return(ready);
	}

	layerList: Layer[];

}
