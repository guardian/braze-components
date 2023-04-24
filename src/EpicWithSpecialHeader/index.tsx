import React from 'react';
import { Epic } from '../Epic';
import type { EpicProps } from '../Epic';

export { COMPONENT_NAME } from './canRender';

export const EpicWithSpecialHeader: React.FC<EpicProps> = (props: EpicProps) => <Epic {...props} />;
