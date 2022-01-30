import {Component, EventEmitter, Output} from '@angular/core';
import {NominatimService} from '../../nominatim.service';
import {NominatimResponse} from '../nominatim-response/nominatim-response.module';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent {

  @Output() onSearch = new EventEmitter();
  searchResults: NominatimResponse[];

  constructor (private nominatimService: NominatimService) {
  }

  addressLookup (address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

}
