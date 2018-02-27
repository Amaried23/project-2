
use helpinghand_db;


SELECT
  id,
  first_name,
  last_name,
  guest_count,
  X(location) AS 'latitude',
  Y(location) AS 'longitude',
  (
    GLength(
      LineStringFromWKB(
        LineString(
          location, 
          GeomFromText('POINT(51.5177 -0.0968)')
        )
      )
    )
  )
  AS distance
FROM hosts
  ORDER BY distance ASC LIMIT 4;