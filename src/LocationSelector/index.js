import React from "react";
import { geocodeByLatlng, getAddressComponent, isFunction } from "../utils";
import MapWithSearch from "../MapWithSearch";

class LocationSelector extends React.Component {
  render() {
    return (
      <MapWithSearch
        isMarkerShown
        activateInput={this.props.activateInput}
        onSearchSuccess={this.props.onSearchSuccess}
        value={this.props.searchValue}
        height={this.props.height}
        position={this.props.position}
        onMarkerDragged={async latLng => {
          const results = await geocodeByLatlng(latLng);
          if (results && results.length) {
            const result = results[0];
            if (isFunction(latLng.lat)) {
              latLng = { lat: latLng.lat(), lng: latLng.lng() };
            }
            this.props.onSearchSuccess({
              latLng,
              name: "",
              address: result.formatted_address,
              place_id: result.place_id,
              types: result.types,
              locality: getAddressComponent(
                result.address_components,
                "neighborhood"
              ),
              city: getAddressComponent(result.address_components, "locality"),
              country: getAddressComponent(result.address_components, "country")
            });
          }
        }}
      />
    );
  }
}

export default LocationSelector;
