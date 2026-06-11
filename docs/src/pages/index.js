import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const features = [
  {
    title: 'Vanilla JavaScript',
    description: 'Use the Selectpicker class directly, with no jQuery dependency or legacy Bootstrap compatibility paths.'
  },
  {
    title: 'Bootstrap 5+',
    description: 'Built for modern Bootstrap projects and loaded alongside Bootstrap bundle assets in the docs examples.'
  },
  {
    title: 'Hosted examples',
    description: 'Exercise live selectpicker examples in the docs site or open standalone HTML examples served from the same Docusaurus app.'
  }
];

export default function Home () {
  return (
    <Layout
      title="CrestApps bootstrap-select"
      description="A dependency-free, vanilla JavaScript select plugin for Bootstrap 5+."
    >
      <header className="hero hero--primary heroBanner">
        <div className="container heroContent">
          <div className="heroText">
            <h1 className="hero__title">bootstrap-select for modern Bootstrap</h1>
            <p className="hero__subtitle">
              A dependency-free, vanilla JavaScript fork of bootstrap-select for Bootstrap 5+.
            </p>
            <p className="heroLead">
              Enhance native select elements with searchable menus, multiselects, custom text, sizing,
              and events while keeping jQuery out of your application.
            </p>
            <div className="buttons">
              <Link className="button button--lg heroPrimaryButton" to="/docs/">
                Get Started
              </Link>
              <Link className="button button--lg heroSecondaryButton" to="/docs/examples">
                View Examples
              </Link>
            </div>
          </div>
          <div className="heroVisual" aria-hidden="true">
            <div className="selectPreview">
              <span className="selectPreviewLabel">Selectpicker preview</span>
              <button className="selectPreviewButton" type="button">Choose a condiment</button>
              <div className="selectPreviewMenu">
                <div>Mustard</div>
                <div>Ketchup</div>
                <div>Relish</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="features">
          <div className="container">
            <div className="row">
              {features.map(function (feature) {
                return (
                  <div className="col col--4 featureColumn" key={feature.title}>
                    <div className="featureCard">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
