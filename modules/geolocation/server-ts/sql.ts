import { camelizeKeys } from 'humps';
import { Model } from 'objection';
import { knex } from '@gqlapp/database-server-ts';
Model.knex(knex);

export interface LatLong {
  latitude: number;
  longitude: number;
}

export interface FilterDist {
  distance: number;
}

export default class Geolocation extends Model {
  // private id: any;

  static get tableName() {
    return 'geolocation';
  }

  static get idColumn() {
    return 'id';
  }

  public async locations({ latitude, longitude }: LatLong, filter: FilterDist) {
    // SECTION FOR DISTANCE BASED QUERY
    // let lat = latitude
    // let long = longitude
    // let pi = 22 / 7;

    // const query = `(((acos(sin((${lat} * ${pi} / 180))*sin((gl.latitude*${pi}/180))+cos((${lat} * ${pi} / 180))*cos((gl.latitude*${pi} / 180))*cos(((${long}-gl.longitude)*${pi} / 180))))*180/${pi})*60*1.1515*1609.344) as distance, *`

    // let res = await knex('geolocation')
    //   .select(knex.raw(query))
    //   .where("distance", '<=', filter.distance)

    // return camelizeKeys(await res);

    const queryBuilder = Geolocation.query();
    // if (has(filter, 'distance') && filter.distance !== '') {

    //   queryBuilder.where(function () {
    //     this.where('longitude', '<=', filter.distance);
    //   });
    // }

    const res = camelizeKeys(await queryBuilder);
    return res;
  }

  public async allLocations() {
    const res = await camelizeKeys(await knex.select('*').from('geolocation'));
    return res;
  }
}
