import { Suspense } from 'react';
import styled from 'styled-components';

import { RankingCard } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Flex } from '../../../foundation/components/Flex';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Space } from '../../../foundation/styles/variables';

const Ranking: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {rankingList.map((ranking) => (
        <RankingCard key={ranking.id} book={ranking.book} />
      ))}
    </Flex>
  );
};

const RankingDummy = styled.div`
  height: 120px;
`;

const RankingWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={
      <Flex align="center" as="ul" direction="column" justify="center">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <Spacer height={Space * 1.5} />
            <RankingDummy key={index} />
            <Spacer height={Space * 1.5} />
            <Separator />
          </div>
        ))}
      </Flex>
    }>
      <Ranking />
    </Suspense>
  );
};

export { RankingWithSuspense as Ranking };
