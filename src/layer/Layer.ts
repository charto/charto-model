// This file is part of charto-model, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Feature } from '../Feature';
import { BBox } from '../BBox';

export type LayerFeatures = { layer: Layer, features: Feature[] }[];
export type LayerFeaturesPromise = LayerFeatures | Promise<LayerFeatures>;

export abstract class Layer {

	abstract getLayerFeatures(bbox: BBox, pixelWidth?: number, pixelHeight?: number): LayerFeaturesPromise;

	name: string;

}
