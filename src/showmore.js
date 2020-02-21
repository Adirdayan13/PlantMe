import React from "react";
import Tooltip from "react-tooltip-lite";

export default class Showmore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showSunInfo() {
    console.log("hover");
    this.setState({ showSunInfo: true });
  }
  render() {
    console.log("this.props from showmore: ", this.props);
    let trefleResults = this.props.state.trefle[0];
    console.log("trefleResults: ", trefleResults);
    return (
      <div className="showmore">
        {trefleResults && (
          <>
            <div className="love">
              {trefleResults.main_species.specifications.growth_period && (
                <Tooltip
                  content={`I grow in ${trefleResults.main_species.specifications.growth_period}`}
                >
                  <img style={{ width: "40px" }} src="/growth.svg" />
                </Tooltip>
              )}
              {trefleResults.main_species.seed.bloom_period && (
                <Tooltip
                  content={`I bloom in ${trefleResults.main_species.seed.bloom_period}`}
                >
                  <img style={{ width: "40px" }} src="/bloom.svg" />
                </Tooltip>
              )}
              {trefleResults.main_species.growth.shade_tolerance && (
                <>
                  {trefleResults.main_species.growth.shade_tolerance ==
                    "Intolerant" && (
                    <Tooltip content={`I love the sun`}>
                      <img style={{ width: "40px" }} src="/sun.svg" />
                    </Tooltip>
                  )}
                  {trefleResults.main_species.growth.shade_tolerance ==
                    "Intermediate" && (
                    <Tooltip content={`I love not too hot sun`}>
                      <img style={{ width: "40px" }} src="/sun.svg" />
                    </Tooltip>
                  )}
                </>
              )}
              {trefleResults.main_species.growth.moisture_use && (
                <>
                  {trefleResults.main_species.growth.moisture_use ==
                    "Medium" && (
                    <Tooltip content={`I love a bit humid`}>
                      <img style={{ width: "40px" }} src="/humidity.svg" />
                    </Tooltip>
                  )}
                  {trefleResults.main_species.growth.moisture_use == "High" && (
                    <Tooltip content={`I love a lot of humid`}>
                      <img style={{ width: "40px" }} src="/humidity.svg" />
                    </Tooltip>
                  )}
                  {trefleResults.main_species.growth.moisture_use == "Low" && (
                    <Tooltip content={`I dont like humid`}>
                      <img style={{ width: "40px" }} src="/humidity.svg" />
                    </Tooltip>
                  )}
                </>
              )}
              {trefleResults.main_species.growth.drought_tolerance && (
                <>
                  {trefleResults.main_species.growth.drought_tolerance ==
                    "Low" && (
                    <Tooltip content={`I need a lot of water`}>
                      <img style={{ width: "40px" }} src="/water.svg" />
                    </Tooltip>
                  )}
                  {trefleResults.main_species.growth.drought_tolerance ==
                    "Medium" && (
                    <Tooltip content={`I need normal amount of water`}>
                      <img style={{ width: "40px" }} src="/drought.svg" />
                    </Tooltip>
                  )}
                  {trefleResults.main_species.growth.drought_tolerance ==
                    "High" && (
                    <Tooltip content={`I dont need a lot of water`}>
                      <img style={{ width: "40px" }} src="/drought.svg" />
                    </Tooltip>
                  )}
                </>
              )}
            </div>

            <div className="names">
              <p style={{ textDecoration: "underline" }}>Names:</p>
              <br />
              {trefleResults.scientific_name && (
                <p>Scientific name: {trefleResults.scientific_name}</p>
              )}
              {trefleResults.family_common_name && (
                <p>Family name: {trefleResults.family_common_name}</p>
              )}
              {trefleResults.common_name && (
                <p>Common name: {trefleResults.common_name}</p>
              )}
            </div>
            <div className="specifications">
              <p style={{ textDecoration: "underline" }}>Specifications:</p>
              <br />
              {trefleResults.main_species.specifications && (
                <>
                  {trefleResults.main_species.specifications.toxicity && (
                    <p>
                      Toxicity:{" "}
                      {trefleResults.main_species.specifications.toxicity}
                    </p>
                  )}
                  {trefleResults.main_species.specifications
                    .shape_and_orientation && (
                    <p>
                      Shape and orientation:{" "}
                      {
                        trefleResults.main_species.specifications
                          .shape_and_orientation
                      }
                    </p>
                  )}
                </>
              )}
              {trefleResults.main_species.products.protein_potential && (
                <p>
                  Protein potential:{" "}
                  {trefleResults.main_species.products.protein_potential}
                </p>
              )}
            </div>
            {trefleResults.main_species.seed && (
              <>
                <div className="seed">
                  <p style={{ textDecoration: "underline" }}>Seed:</p>
                  <br />
                  {trefleResults.main_species.fruit_or_seed
                    .seed_period_begin && (
                    <p>
                      Seed period begin:{" "}
                      {
                        trefleResults.main_species.fruit_or_seed
                          .seed_period_begin
                      }
                    </p>
                  )}
                  {trefleResults.main_species.seed.seedling_vigor && (
                    <p>
                      Seedling vigor:{" "}
                      {trefleResults.main_species.seed.seedling_vigor}
                    </p>
                  )}
                  {trefleResults.main_species.seed.seed_spread_rate && (
                    <p>
                      Seed spread rate:{" "}
                      {trefleResults.main_species.seed.seed_spread_rate}
                    </p>
                  )}
                  {trefleResults.main_species.fruit_or_seed.seed_period_end && (
                    <p>
                      Seed period end:{" "}
                      {trefleResults.main_species.fruit_or_seed.seed_period_end}
                    </p>
                  )}
                  {trefleResults.main_species.fruit_or_seed.seed_abundance && (
                    <p>
                      Seed abundance:{" "}
                      {trefleResults.main_species.fruit_or_seed.seed_abundance}
                    </p>
                  )}
                  {trefleResults.main_species.seed.seedling_vigor && (
                    <p>
                      Seedling vigor:{" "}
                      {trefleResults.main_species.seed.seedling_vigor}
                    </p>
                  )}
                  {trefleResults.main_species.seed.seed_spread_rate && (
                    <p>
                      Seed spread rate:{" "}
                      {trefleResults.main_species.seed.seed_spread_rate}
                    </p>
                  )}
                  {trefleResults.main_species.seed.seeds_per_pound && (
                    <p>
                      Seeds per pound:{" "}
                      {trefleResults.main_species.seed.seeds_per_pound}
                    </p>
                  )}
                  {trefleResults.main_species.fruit_or_seed.color && (
                    <p>
                      Seeds or fruit color:{" "}
                      {trefleResults.main_species.fruit_or_seed.color}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="growth">
              <p style={{ textDecoration: "underline" }}>Growth condition:</p>
              <br />
              {trefleResults.main_species.duration && (
                <p>Duration: {trefleResults.main_species.duration}</p>
              )}
              {trefleResults.main_species.seed.bloom_period && (
                <p>
                  Bloom period: {trefleResults.main_species.seed.bloom_period}
                </p>
              )}
              {trefleResults.main_species.specifications.growth_period && (
                <p>
                  Growth period:{" "}
                  {trefleResults.main_species.specifications.growth_period}
                </p>
              )}
              {trefleResults.main_species.soils_adaptation && (
                <p>
                  Can grow in{" "}
                  {Object.keys(
                    trefleResults.main_species.soils_adaptation
                  ).join(" / ")}{" "}
                  soil
                </p>
              )}
              {trefleResults.main_species.specifications.growth_rate && (
                <p>
                  Growth rate:{" "}
                  {trefleResults.main_species.specifications.growth_rate}
                </p>
              )}
              {trefleResults.main_species.specifications.growth_form && (
                <p>
                  Growth form:{" "}
                  {trefleResults.main_species.specifications.growth_form}
                </p>
              )}
            </div>
            <div className="enviornment">
              <p style={{ textDecoration: "underline" }}>Environment</p>
              <br />
              {trefleResults.main_species.growth.shade_tolerance && (
                <p>
                  Shade tolerance:{" "}
                  {trefleResults.main_species.growth.shade_tolerance}
                </p>
              )}

              {trefleResults.main_species.growth.salinity_tolerance && (
                <p>
                  Salinity tolerance:{" "}
                  {trefleResults.main_species.growth.salinity_tolerance}
                </p>
              )}
              {trefleResults.main_species.growth.ph_minimum && (
                <p>
                  PH minimum: {trefleResults.main_species.growth.ph_minimum}
                </p>
              )}
              {trefleResults.main_species.growth.ph_maximum && (
                <p>
                  PH maximum: {trefleResults.main_species.growth.ph_maximum}
                </p>
              )}
              {trefleResults.main_species.growth.moisture_use && (
                <p>
                  Moisture use: {trefleResults.main_species.growth.moisture_use}
                </p>
              )}
              {trefleResults.main_species.growth.hedge_tolerance && (
                <p>
                  Hedge tolerance:{" "}
                  {trefleResults.main_species.growth.hedge_tolerance}
                </p>
              )}
              {trefleResults.main_species.growth.frost_free_days_minimum && (
                <p>
                  Minimum frost free days:{" "}
                  {trefleResults.main_species.growth.frost_free_days_minimum}
                </p>
              )}
              {trefleResults.main_species.growth.fire_tolerance && (
                <p>
                  Fire tolerance:{" "}
                  {trefleResults.main_species.growth.fire_tolerance}
                </p>
              )}
              {trefleResults.main_species.growth.fertility_requirement && (
                <p>
                  Fertility requirement:{" "}
                  {trefleResults.main_species.growth.fertility_requirement}
                </p>
              )}
              {trefleResults.main_species.growth.drought_tolerance && (
                <p>
                  Drought tolerance:{" "}
                  {trefleResults.main_species.growth.drought_tolerance}
                </p>
              )}
              {trefleResults.main_species.growth.temperature_minimum && (
                <>
                  <p>
                    Minimum temperature: <br />
                    {trefleResults.main_species.growth.temperature_minimum.deg_c.toFixed(
                      2
                    )}{" "}
                    celsius <br />
                    {
                      trefleResults.main_species.growth.temperature_minimum
                        .deg_f
                    }{" "}
                    fahrenheit.
                  </p>
                </>
              )}
              {trefleResults.main_species.specifications.max_height_at_base_age
                .cm && (
                <p>
                  Max height at base age:{" "}
                  {trefleResults.main_species.specifications.max_height_at_base_age.cm.toFixed(
                    2
                  )}{" "}
                  cm
                </p>
              )}
              {trefleResults.main_species.specifications.mature_height.cm && (
                <p>
                  Max height at mature age:{" "}
                  {trefleResults.main_species.specifications.mature_height.cm.toFixed(
                    2
                  )}{" "}
                  cm
                </p>
              )}
              {trefleResults.main_species.growth.root_depth_minimum && (
                <>
                  <p>
                    Root depth minimum:{" "}
                    {trefleResults.main_species.growth.root_depth_minimum.cm.toFixed(
                      2
                    )}{" "}
                    cm /{" "}
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
                    {trefleResults.main_species.growth.precipitation_minimum.cm.toFixed(
                      2
                    )}{" "}
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
                    {trefleResults.main_species.growth.precipitation_maximum.cm.toFixed(
                      2
                    )}{" "}
                    cm /{" "}
                    {
                      trefleResults.main_species.growth.precipitation_maximum
                        .inches
                    }{" "}
                    inches.
                  </p>
                </>
              )}
              {trefleResults.main_species.growth.planting_density_minimum
                .sqm && (
                <p>
                  Planting density minimum:
                  <br />
                  {trefleResults.main_species.growth.planting_density_minimum.sqm.toFixed(
                    2
                  )}{" "}
                  sqm /{" "}
                  {trefleResults.main_species.growth.planting_density_minimum.sqm.toFixed(
                    2
                  )}{" "}
                  acre
                </p>
              )}
            </div>
            <div className="foliage-and-flower">
              <p style={{ textDecoration: "underline" }}>Foliage</p>
              <br />
              {trefleResults.main_species.foliage.texture && (
                <p>Texture: {trefleResults.main_species.foliage.texture}</p>
              )}
              {trefleResults.main_species.foliage.porosity_winter && (
                <p>
                  Porosity winter:{" "}
                  {trefleResults.main_species.foliage.porosity_winter}
                </p>
              )}
              {trefleResults.main_species.foliage.porosity_summer && (
                <p>
                  Porosity summer:{" "}
                  {trefleResults.main_species.foliage.porosity_summer}
                </p>
              )}
              {trefleResults.main_species.foliage.color && (
                <p>Color: {trefleResults.main_species.foliage.color}</p>
              )}
              <br />
              {trefleResults.main_species.flower && (
                <>
                  <p style={{ textDecoration: "underline" }}>Flower</p>
                  <br />
                  {trefleResults.main_species.flower.conspicuous && (
                    <p>
                      Conspicuous:{" "}
                      {trefleResults.main_species.flower.conspicuous}
                    </p>
                  )}
                  {trefleResults.main_species.flower.color && (
                    <p>Color: {trefleResults.main_species.flower.color}</p>
                  )}
                </>
              )}
            </div>
            {trefleResults.main_species.images.length > 0 && (
              <div className="additional-pictures">
                <>
                  {trefleResults.main_species.images.map((image, key) => {
                    return (
                      <a key={key} href={image.url} target="_blank">
                        <img
                          key={key}
                          style={{ width: "100px" }}
                          src={image.url}
                        />
                      </a>
                    );
                  })}
                </>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
