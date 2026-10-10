import type { EngineeringProject } from '../components/EngineeringCaseStudy';

export const femaGo: EngineeringProject = {
  name: 'FEMA GO',
  role: 'OneGlobe LLC · Workstream Technical Lead · 2018–2021',
  headline: 'UI ownership and delivery on a federal grants platform.',
  summary:
    'FEMA GO is FEMA’s grants management platform, built to FedRAMP High. My role combined oversight of UI work across the platform with direct agile-team leadership and supervisory responsibility for the fire-grants workstream.',
  facts: [
    { label: 'UI responsibility', value: 'Final reviewer of all UI code' },
    { label: 'Direct team leadership', value: '6-person cross-functional agile team' },
    { label: 'Supervisory scope', value: '20-person fire-grants workstream' },
  ],
  sections: [
    {
      title: 'A clear owner for UI delivery',
      paragraphs: [
        'I oversaw all UI work and served as the final reviewer of all UI code. That responsibility connected interface decisions with the implementation being delivered across the platform.',
        'The work included React and Redux on the frontend, with Java Spring and Vert.x services, PostgreSQL, and AWS behind it. Section 508 accessibility was part of the project’s technical context.',
      ],
    },
    {
      title: 'Leadership at two levels',
      paragraphs: [
        'I directly led a cross-functional agile team of six. Separately, I served as supervisory workstream lead for twenty people working on fire grants.',
        'I worked directly with federal product owners and mentored engineers through one-to-one conversations and code review. The role required turning stakeholder needs into implementation work while keeping UI delivery coherent across teams.',
      ],
    },
    {
      title: 'CARES Act funding under a deadline',
      paragraphs: [
        'I delivered the COVID-19 CARES Act funding opportunity in under a week, helping FEMA meet its congressional deadline.',
        'Reusable templates and CI/CD pipelines supported that delivery. This was a concrete example of applying the platform’s existing capabilities to a new funding requirement under a fixed deadline.',
      ],
    },
  ],
  stack: ['React', 'Redux', 'Java Spring', 'Vert.x', 'PostgreSQL', 'AWS', 'Section 508'],
};

export const oneGlobe: EngineeringProject = {
  name: 'OneGlobe',
  role: 'OneGlobe LLC · Business Development Solution Architect · 2022–2026',
  headline: 'From federal requirements to working software.',
  summary:
    'I worked with federal stakeholders to shape technical proposals and built working applications for live evaluations. The work combined solution architecture, communication, and hands-on application development.',
  facts: [
    { label: 'My contribution', value: 'SBA evaluation demo application' },
    { label: 'Award context', value: 'OneGlobe awarded a BPA seat' },
    { label: 'BPA total ceiling', value: '$200M' },
  ],
  sections: [
    {
      title: 'The SBA evaluation application',
      paragraphs: [
        'I built the demo application that helped OneGlobe win a seat on the SBA Enterprise Agile Delivery Services BPA. The first call order followed a week later.',
        'The evaluation build used TypeScript, React, Gatsby, and the U.S. Web Design System. It gave the proposed approach a working interface that evaluators could assess.',
        'The $200M figure describes the BPA’s overall ceiling. My contribution was the demo application that helped OneGlobe earn its seat.',
      ],
    },
    {
      title: 'A reusable starting point for technical challenges',
      paragraphs: [
        'I was the top contributor to OneGlobe’s Tech Challenge Platform, a reference architecture for government technical challenges. It combined a React client with Java Spring services and supported deployment through Terraform, Pulumi, or AWS CDK.',
        'The purpose was to give teams a copy-ready foundation for no-notice evaluations, so each application could focus on the requirement being demonstrated. The contribution was architectural reuse and working software across those deployment options.',
      ],
    },
    {
      title: 'Connecting the proposal to the implementation',
      paragraphs: [
        'The role spanned technical proposals and the applications built to demonstrate them. That meant making the approach understandable to stakeholders and concrete enough to implement.',
        'Alongside the SBA build and reference architecture, I worked as an architect and writer on federal proposals. The combination of communication and engineering is central to how I approach product work today.',
      ],
    },
  ],
  stack: [
    'TypeScript',
    'React',
    'Gatsby',
    'USWDS',
    'Java Spring',
    'Terraform',
    'Pulumi',
    'AWS CDK',
  ],
};
