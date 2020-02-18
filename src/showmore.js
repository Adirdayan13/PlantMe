import React from "react";

export default class Showmore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("this.props from showmore: ", this.props);
    let trefleResults = this.props.state.trefle[0];
    console.log("trefleResults: ", trefleResults);
    return (
      <div className="showmore">
        {trefleResults && (
          <>
            <div className="names">
              <p style={{ textDecoration: "underline" }}>Names:</p>
              <br />
              {trefleResults.varieties.family_common_name && (
                <p>
                  Family name: {trefleResults.varieties[0].family_common_name}
                </p>
              )}
              {this.props.state.trefle[0].scientific_name && (
                <p>
                  Scientific name: {this.props.state.trefle[0].scientific_name}
                </p>
              )}
            </div>
            <div className="specifications">
              <p style={{ textDecoration: "underline" }}>specifications:</p>
              <br />
              {trefleResults.main_species.specifications && (
                <>
                  <p>
                    Toxicity:{" "}
                    {trefleResults.main_species.specifications.toxicity}
                  </p>
                  <p>
                    Shape and orientation:{" "}
                    {
                      trefleResults.main_species.specifications
                        .shape_and_orientation
                    }
                  </p>
                  <p>
                    Max height at base age:{" "}
                    {
                      trefleResults.main_species.specifications
                        .max_height_at_base_age.cm
                    }{" "}
                    cm
                  </p>
                  <p>
                    Max height at mature age:{" "}
                    {trefleResults.main_species.specifications.mature_height.cm}{" "}
                    cm
                  </p>
                  <p>
                    Growth period:{" "}
                    {trefleResults.main_species.specifications.growth_period}
                  </p>
                  <p>
                    Growth form:{" "}
                    {trefleResults.main_species.specifications.growth_form}
                  </p>
                </>
              )}
              {trefleResults.main_species.soils_adaptation && (
                <p>
                  Can grow in{" "}
                  {Object.keys(trefleResults.main_species.soils_adaptation)}{" "}
                  soil
                </p>
              )}
              {trefleResults.main_species.seed.bloom_period && (
                <p>
                  Bloom period: {trefleResults.main_species.seed.bloom_period}
                </p>
              )}
              {trefleResults.main_species.products.protein_potential && (
                <p>
                  Protein potential:{" "}
                  {trefleResults.main_species.products.protein_potential}
                </p>
              )}
            </div>
            <div className="growth">
              {trefleResults.main_species.growth.temperature_minimum && (
                <>
                  <p>Growth:</p>
                  <br />
                  <p>
                    Minimum temperature: <br />
                    {
                      trefleResults.main_species.growth.temperature_minimum
                        .deg_c
                    }{" "}
                    celsius <br />
                    {
                      trefleResults.main_species.growth.temperature_minimum
                        .deg_f
                    }{" "}
                    fahrenheit.
                  </p>
                </>
              )}
              {trefleResults.main_species.growth.root_depth_minimum && (
                <>
                  <p>
                    Root depth minimum:{" "}
                    {trefleResults.main_species.growth.root_depth_minimum.cm} cm
                    /{" "}
                    {
                      trefleResults.main_species.growth.root_depth_minimum
                        .inches
                    }{" "}
                    inches.
                  </p>
                </>
              )}
              {trefleResults.main_species.growth.precipitation_minimum && (
                <>
                  <p>
                    Precipitation minimum:{" "}
                    {trefleResults.main_species.growth.precipitation_minimum.cm}{" "}
                    cm /{" "}
                    {
                      trefleResults.main_species.growth.precipitation_minimum
                        .inches
                    }{" "}
                    inches.
                  </p>
                </>
              )}
              {trefleResults.main_species.growth.precipitation_maximum && (
                <>
                  <p>
                    Precipitation maximum:{" "}
                    {trefleResults.main_species.growth.precipitation_maximum.cm}{" "}
                    cm /{" "}
                    {
                      trefleResults.main_species.growth.precipitation_maximum
                        .inches
                    }{" "}
                    inches.
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
