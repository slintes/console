import React from 'react';
import Helmet from 'react-helmet';

import { k8sKinds } from '../module/k8s';
import * as pages from './resource-pages';

// Parameters can be in pros.params (in URL) or in props.route (attribute of Route tag)
const allParams = props => Object.assign({}, props.params, props.route);

export const ResourceListPage = (props) => {
  const {kind, ns} = allParams(props);
  const kindObj = _.find(k8sKinds, {path: kind});

  if (!kindObj) {
    window.location = '404';
    return null;
  }

  // eslint-disable-next-line import/namespace
  const PageComponent = pages[`${kindObj.labelPlural.replace(/ /g, '')}Page`];
  return <div>
    <Helmet title={kindObj.labelPlural} />
    {PageComponent && <PageComponent namespace={ns} kind={kindObj.id} />}
  </div>;
};

export const ResourceDetailsPage = (props) => {
  const {kind, name, ns} = allParams(props);
  const kindObj = _.find(k8sKinds, {path: kind});

  if (!name || !kindObj) {
    window.location = '404';
    return null;
  }

  // eslint-disable-next-line import/namespace
  const PageComponent = pages[`${kindObj.labelPlural.replace(/ /g, '')}DetailsPage`];
  return <div>
    <Helmet title={`${name} · Details`} />
    {PageComponent && <PageComponent namespace={ns} kind={kindObj.id} name={name} />}
  </div>;
};
