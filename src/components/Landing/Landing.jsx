import React, { useState, useEffect } from 'react';
import { Button, Container, Col } from '@edx/paragon';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { slice, concat } from 'lodash';

import { getConfig } from '@edx/frontend-platform';

import { AnimationOnScroll } from 'react-animation-on-scroll';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import CourseCard from '../Card';
import AboutUS from '../About';
import Navigation from '../Navigation';
import './Landing.scss';

import 'animate.css/animate.min.css';

const COURSES_API_URL = `${getConfig().LMS_BASE_URL}/api/courses/v1/courses/`;

const LIMIT = 4;

const LandingPage = () => {
  const [showMore, setShowMore] = useState(true);
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(LIMIT);

  const updateData = async () => {
    // console.log(URL_Courses);
    try {
      const result = await axios(COURSES_API_URL, {
        params: { page_size: 100 },
      });
      setData(result.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < data.length;
    const newList = concat(data, slice(index, newIndex));
    setIndex(newIndex);
    setData(newList);
    setShowMore(newShowMore);
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <main>
      <div className="gray-continer-claim section-1">
        <div className="home-header">
          <a href="/dashboard" className="home-logo">
            <img className="d-block" src="https://bachasoftware.com/web/image/website/2/logo/Bac%20Ha%20Software%20Co.%2C%20Ltd.?unique=7bf7a33" alt="BHSoft" />
          </a>
          <Navigation />
        </div>
        <AnimationOnScroll animateIn="animate__animated animate__fadeInDown">
          <div className="wrapper-continer">
            <h1 className="section-1-text">Build your skills with our online courses</h1>
            <h5 className="section-1-description">
              Transform your business with Vietnam's leading software development company.
              Over a decade of excellence to boost your IT ROI. Partnership with us to build last.
            </h5>
            <br />
            <div className="btn-container">
              <a className="explore" href={`${getConfig().LMS_BASE_URL}/dashboard`}><Button.Deprecated className="btn-success">Explore Courses</Button.Deprecated></a>

            </div>
          </div>
        </AnimationOnScroll>
      </div>
      <Container className="cards-continer section-2">
        <AnimationOnScroll duration={1.5} animateIn="animate__animated animate__fadeInLeft">
          <h2 className="course-title">Our courses</h2>
        </AnimationOnScroll>
        <AnimationOnScroll duration={2} animateIn="animate__animated animate__fadeInLeft">
          <Row>
            {data?.slice(0, index).map((item) => (
              <Col className="course-card" key={item.id} sm={6} xs={12}>
                <CourseCard key={item.id} {...item} />
              </Col>
            ))}
          </Row>
        </AnimationOnScroll>
        <AnimationOnScroll duration={2.5} animateIn="animate__animated animate__fadeInLeft">
          {data?.length > LIMIT ? (
            showMore && (
            <div className="center">
              <Button.Deprecated className="btn-success load-more" onClick={loadMore}>View more</Button.Deprecated>
            </div>
            )
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </AnimationOnScroll>
      </Container>
      <AnimationOnScroll animateIn="animate__animated animate__fadeIn">
        <AboutUS />
      </AnimationOnScroll>
      <Footer logo="https://bachasoftware.com/web/image/website/2/logo/Bac%20Ha%20Software%20Co.%2C%20Ltd.?unique=7bf7a33" />
    </main>
  );
};

export default LandingPage;
