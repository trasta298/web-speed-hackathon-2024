import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 1024px;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image 
        alt="Cyber TOON"
        src="/assets/top.avif"
      />
    </_Wrapper>
  );
}
