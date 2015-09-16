export default function() {
  this.namespace = '/api';

  this.get('/locations', function(db, request) {
    var locations = db.locations;
    var query = {};
    var records;
    var rows;

    var country = request.queryParams.country;
    var locality = request.queryParams.locality;
    var region = request.queryParams.region;
    var facets = {
      country: country || '',
      region: region || '',
      locality: locality || ''
    };

    var limit = parseInt(request.queryParams.limit, 10);
    var page = parseInt(request.queryParams.page, 10);
    var start = request.queryParams.startPage ? 0 : (page - 1) * limit;
    var end = request.queryParams.startPage ? parseInt(request.queryParams.startPage, 10) * limit : start + limit;

    // Build the query
    for (let facet in facets) {
      if (facets.hasOwnProperty(facet) && facets[facet] !== '') {
        query[facet] = request.queryParams[facet];
      }
    }

    records = locations.where(query);
    rows = records.slice(start, end);

    return {
      locations: rows,
      meta: {
        facets: facets,
        pagesTotal: Math.ceil(records.length / limit),
        recordsTotal: records.length
      }
    };
  });

  this.get('/locations/:id', ['location']);
}
