(function() {
  const coords = (listing && listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2)
    ? listing.geometry.coordinates
    : [-118.7798, 34.0259]; // [lng, lat]

  const lng = coords[0];
  const lat = coords[1];
  const title = (listing && listing.title) ? listing.title : "Listing Location";
  const locStr = (listing && listing.location) ? `${listing.location}, ${listing.country || ''}` : "Exact location provided after booking";

  // Check if Mapbox GL is loaded and mapToken is valid
  if (typeof mapboxgl !== 'undefined' && typeof mapToken !== 'undefined' && mapToken && mapToken !== 'undefined' && !mapToken.includes('undefined')) {
    try {
      mapboxgl.accessToken = mapToken;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 11
      });
      new mapboxgl.Marker({ color: "#ff385c" })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${title}</h4><p>${locStr}</p>`))
        .addTo(map);
      return;
    } catch(e) {
      console.warn("Mapbox initialization failed, falling back to OpenStreetMap Leaflet:", e);
    }
  }

  // Fallback to Leaflet OpenStreetMap (Zero Token Required)
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // Load Leaflet CSS & JS dynamically if not present
  if (typeof L === 'undefined') {
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement("script");
    leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletJS.onload = function() {
      initLeafletMap(lat, lng, title, locStr);
    };
    document.head.appendChild(leafletJS);
  } else {
    initLeafletMap(lat, lng, title, locStr);
  }

  function initLeafletMap(lat, lng, titleText, locText) {
    const map = L.map('map').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const redIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div style="background-color: #ff385c; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #ffffff;"><i class="fa-solid fa-house" style="font-size: 14px;"></i></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([lat, lng], { icon: redIcon })
      .addTo(map)
      .bindPopup(`<strong style="font-size: 14px;">${titleText}</strong><br><span style="font-size: 12px; color: #666;">${locText}</span>`)
      .openPopup();
  }
})();