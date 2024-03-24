import { Suspense } from 'react';
import styled from 'styled-components';

import { FeatureCard } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Flex } from '../../../foundation/components/Flex';
import { Color, Radius, Space } from '../../../foundation/styles/variables';

const Features: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
      {featureList.map((feature) => (
        <FeatureCard key={feature.id} book={feature.book} />
      ))}
    </Flex>
  );
};

const FeaturesDummy = styled.div`
  gap: ${Space * 1}px;
  background-color: ${Color.MONO_A};
  border-radius: ${Radius.SMALL};
  grid-template-columns: auto 1fr;
  flex-shrink: 0;
  border: 1px solid ${Color.MONO_30};
  width: 328px;
  height: 204px;
`;

const FeaturesWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        {[...Array(5)].map((_, index) => (
          <FeaturesDummy key={index} />
        ))}
      </Flex>
    }>
      <Features />
    </Suspense>
  );
};

export { FeaturesWithSuspense as Features };
