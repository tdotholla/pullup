import React, { useEffect, useRef } from "react";
import { Layout, LocateMeButton, PullUpButton } from "../components";
import { Loader } from "@googlemaps/js-api-loader";
import { MAP_STYLES } from "../util/constants";
import { useState } from "react";
import { MarkersLayer } from "../components/MarkersLayer";

const mapCenter = { lat: -34.397, lng: 150.644 };

const IndexPage = () => {
  const googlemap = useRef(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_API_KEY!,
      version: "weekly",
    });
    loader.load().then(() => {
      const google = (window as any).google;
      const mapOptions = {
        center: new google.maps.LatLng(mapCenter),
        zoom: 11,
        minZoom: 4,
        maxZoom: 14,
        // mapTypeId:google.maps.MapTypeId.TERRAIN,
        backgroundColor: "#555",
        clickableIcons: false,
        disableDefaultUI: true,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.RIGHT_CENTER,
          // mapTypeIds: ['roadmap', 'terrain']
        },
        scaleControl: false,
        rotateControl: true,
        streetViewControl: false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
        //gestureHandling sets the mobile panning on a scrollable page: COOPERATIVE, GREEDY, AUTO, NONE
        gestureHandling: "greedy",
        styles: MAP_STYLES.whiteMono,
      };
      let map = new google.maps.Map(googlemap.current, mapOptions);
      setMapInstance(map);
    });
  }, []);

  return (
    <>
      <Layout title="Pull Up!">
        <div id="map" ref={googlemap} />
        <MarkersLayer mapInstance={mapInstance} clientLocation={clientLocation} />
        {/* <MarkerInfo /> */}
        <PullUpButton mapInstance={mapInstance} />
        <LocateMeButton mapInstance={mapInstance} clientLocation={clientLocation}  setClientLocation={setClientLocation}/>
      </Layout>
    </>
  );
};

export default IndexPage;
