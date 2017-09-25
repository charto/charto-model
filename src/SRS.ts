// This file is part of charto-model, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { RExp } from './RExp';

export class SRS {

	/** @param epsg European Petroleum Survey Group code.
	  * @param oldXY Flip X and Y coordinates when an old style EPSG code is used. */

	constructor(public epsg: number, public oldXY = false) {}

	static parse(urn?: string) {
		/*
			Examples:
			EPSG:4326
			http://www.opengis.net/gml/srs/epsg.xml#4326
			urn:ogc:def:crs:epsg::4326
			urn:x-ogc:def:crs:epsg:6.11.2:4326
			urn:ogc:def:crs:EPSG:7.4:4326
		*/

		if(!urn) return(null);

		const match = RExp.crs.epsg.exec(urn.toLowerCase());
		if(!match) return(null);

		const kind = match[1];
		const code = +match[2];

		const srs = new SRS(code);

		srs.oldXY = (kind == 'epsg:' || kind == 'http://www.opengis.net/gml/srs/epsg.xml#');

		return(srs);
	}

}
