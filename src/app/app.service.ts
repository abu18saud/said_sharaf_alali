import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(public http: HttpClient,


  ) { }




  public sortData(sort: string, data: any[]) {
    if (sort) {
      switch (sort) {
        case 'Newest':
          data = data.sort((a, b) => { return <any>new Date(b.published) - <any>new Date(a.published) });
          break;
        case 'Oldest':
          data = data.sort((a, b) => { return <any>new Date(a.published) - <any>new Date(b.published) });
          break;
        case 'Popular':
          data = data.sort((a, b) => {
            if (a.ratingsValue / a.ratingsCount < b.ratingsValue / b.ratingsCount) {
              return 1;
            }
            if (a.ratingsValue / a.ratingsCount > b.ratingsValue / b.ratingsCount) {
              return -1;
            }
            return 0;
          });
          break;
        case 'Price (Low to High)':

          data = data.sort((a, b) => {
            if ((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)) {
              return 1;
            }
            if ((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)) {
              return -1;
            }
            return 0;
          })

          break;
        case 'Price (High to Low)':
          data = data.sort((a, b) => {
            if ((a.priceDollar.sale || a.priceDollar.rent) < (b.priceDollar.sale || b.priceDollar.rent)) {
              return 1;
            }
            if ((a.priceDollar.sale || a.priceDollar.rent) > (b.priceDollar.sale || b.priceDollar.rent)) {
              return -1;
            }
            return 0;
          })

          data = data.sort((a, b) => {
            if ((a.priceEuro.sale || a.priceEuro.rent) < (b.priceEuro.sale || b.v.rent)) {
              return 1;
            }
            if ((a.priceEuro.sale || a.priceEuro.rent) > (b.priceEuro.sale || b.priceEuro.rent)) {
              return -1;
            }
            return 0;
          })
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items: any[], page?: number, perPage?: number) {
    var page = page || 1,
      perPage = perPage || 4,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPage),
      totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination: {
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      }
    };
  }
}
