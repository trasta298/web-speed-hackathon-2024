import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';

const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  const { data: book } = useBook({ params: { bookId } });

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episodeId={episodeId} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {book.episodes.map((episode) => (
            <EpisodeListItem key={episode.id} book={book} episode={episode} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={
      <>
        <Spacer height={500} />
        <Separator />
        <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
          <Flex align="center" as="ul" direction="column" justify="center">
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <Spacer height={Space * 1.5 * 2 + 96} />
                <Separator />
              </div>
            ))}
          </Flex>
        </Box>
      </>
    }>
      <EpisodeDetailPage />
    </Suspense>
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };
