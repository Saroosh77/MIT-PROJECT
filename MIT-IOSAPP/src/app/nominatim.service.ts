import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from '../app/navigation/nominatim-response/nominatim-response.module';
import {map} from 'rxjs/operators';
import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from '../app/navigation/constants/constants.module';

@Injectable()
export class NominatimService {

  constructor (private http: HttpClient) {
  }

  addressLookup (req?: any): Observable<NominatimResponse[]> {
    let url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&${DEFAULT_VIEW_BOX}&bounded=1`;
    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }

}
