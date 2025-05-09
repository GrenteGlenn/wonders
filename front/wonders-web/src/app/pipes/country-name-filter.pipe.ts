import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../model/Country';

@Pipe({
  name: 'countryNameFilter',
  standalone: true
})
export class CountryNameFilterPipe implements PipeTransform {

  // ici le pipe permet de tranformer les données pour les traiter correctement en HTML
  // permet de manipuler une données sans passer par le ts du composant
  transform(countries: Country[], searchTerm: string): Country[] {
    if (!searchTerm) return countries;
    const lower = searchTerm.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(lower));
  }
}
