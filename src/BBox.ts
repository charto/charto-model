// This file is part of charto-model, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { SRS } from './SRS';

export class BBox {

	constructor(
		public s: number,
		public w: number,
		public n: number,
		public e: number,
		public srs?: number
	) {}

	static fromArray(spec: [ number, number, number, number ], srs: SRS) {
		if(srs.oldXY) {
			// Helsinki: 24,60,24,60,epsg:4326
			return(new BBox(spec[1], spec[0], spec[3], spec[2], srs.epsg));
		} else {
			// Helsinki: 60,24,60,24,urn:ogc:def:crs:epsg::4326
			return(new BBox(spec[0], spec[1], spec[2], spec[3], srs.epsg));
		}
	}

	toArray(oldXY = false) {
		if(oldXY) return([this.w, this.s, this.e, this.n, this.srs]);
		else return([this.s, this.w, this.n, this.e, this.srs]);
	}

	clone() {
		return(new BBox(this.s, this.w, this.n, this.e, this.srs));
	}

	sqDistTo(lat: number, lon: number) {
		let dlat = 0, dlon = 0;

		if(lat < this.s) dlat = lat - this.s;
		else if(lat > this.n) dlat = lat - this.n;

		if(lon < this.w) dlon = lon - this.w;
		else if(lon >= this.e) dlon = lon - this.e;

		return(dlat * dlat + dlon * dlon);
	}

	area() {
		return((this.n - this.s) * (this.e - this.w));
	}

	extendTo(lat: number, lon: number) {
		if(lat < this.s) this.s = lat;
		if(lon < this.w) this.w = lon;
		if(lat > this.n) this.n = lat;
		if(lon > this.e) this.e = lon;

		return(this);
	}

	extended(lat: number, lon: number) {
		return(this.clone().extendTo(lat, lon));
	}

}
