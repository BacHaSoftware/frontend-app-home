import React from 'react';
import { Button, Container } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

const AboutUS = (data) => (
  <div className="gray-continer">
    <Container className="wrapper-continer">
      <h2>About Us</h2>
      <p>
        We are BHSoft, a top software company in Vietnam, focused on fulfilling clients' business goals with the best software&nbsp;solutions. We are experienced, dedicated, professional and have become a trusted IT partner for world-wide companies.
      </p>
      <a className="view-more" href={`${getConfig().LMS_BASE_URL}/about`}>
        <Button.Deprecated className="btn-success explore-btn">Learn more</Button.Deprecated>
      </a>
    </Container>
  </div>
);

export default AboutUS;
