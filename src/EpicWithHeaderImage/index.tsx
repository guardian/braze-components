import React from 'react';

import { Epic } from '../Epic';
import type { EpicProps } from '../Epic';

export { COMPONENT_NAME } from './canRender';

const HEADER_IMAGE_URL =
    'https://i.guim.co.uk/img/media/6c8bb5d11501239615157e16e98b56018978578b/0_0_2953_2282/master/2953.jpg?width=1010&quality=45&auto=format&fit=max&dpr=2&s=8a01d64171d5bb3083b5b59a4081cde3';

export const EpicWithHeaderImage: React.FC<EpicProps> = (props: EpicProps) => (
    <Epic {...props} headerImageUrl={HEADER_IMAGE_URL} />
);
