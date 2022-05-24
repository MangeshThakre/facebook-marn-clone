import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import { useSelect, useSelector } from "react-redux";
import "./About.css";
function About() {
  const aboutLeftOptionsRef = useRef(null);

  const togglePlaceslived = useSelector(
    (state) => state.About.togglePlaceslived
  );
  const toggleWorkAndEducation = useSelector(
    (state) => state.About.toggleWorkAndEducation
  );
  const toggleFamilyAndRelation = useSelector(
    (state) => state.About.toggleFamilyAndRelation
  );
  const toggleContactBasicInformation = useSelector(
    (state) => state.About.toggleContactBasicInformation
  );

  function activeOption(current_li) {
    const aboutLeftOptions = aboutLeftOptionsRef.current.children;
    for (const li of aboutLeftOptions) {
      if (li.className == "activeOption") li.className = "inActive";
    }
    current_li.currentTarget.className = "activeOption";
  }

  const Overview = {};
  const WorkAndEducation =

  return (
    <div className="About">
      <Grid container>
        <Grid xs={12} md={4.5}>
          <Card>
            <CardContent>
              <div className="about_left">
                <div>
                  <h3>About</h3>
                </div>
                <ul className="aboutLeftOptions" ref={aboutLeftOptionsRef}>
                  <li className="activeOption" onClick={(e) => activeOption(e)}>
                    <div>
                      <p>Overview</p>
                    </div>
                  </li>
                  <li className="inActive" onClick={(e) => activeOption(e)}>
                    <div>
                      <p>Work And Education</p>
                    </div>
                  </li>
                  <li className="inActive" onClick={(e) => activeOption(e)}>
                    <div>
                      <p>Places lived</p>
                    </div>
                  </li>
                  <li className="inActive" onClick={(e) => activeOption(e)}>
                    <div>
                      <p>Contact basic information </p>
                    </div>
                  </li>
                  <li className="inActive" onClick={(e) => activeOption(e)}>
                    <div>
                      <p>Family and Relation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <div className="about_right">
            <Card>About</Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
