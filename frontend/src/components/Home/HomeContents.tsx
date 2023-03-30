import tw, { styled, css } from 'twin.macro';
import HomeContentList from './HomeContentList';

const HomeContentsContainer = tw.div`
  flex-col w-full h-fit
`;

const HomeContents = ({}: Object) => {
  const unAuthContents = ['popular', 'recent', 'category'];
  const authContent = ['fit', 'favor_category', 'bookmarked', 'similar_member'];
  const isAuth = false;

  return (
    <HomeContentsContainer>
      {isAuth
        ? authContent?.map((category) => {
            return <HomeContentList key={category} category={category} />;
          })
        : unAuthContents?.map((category) => {
            return <HomeContentList key={category} category={category} />;
          })}
    </HomeContentsContainer>
  );
};

export default HomeContents;
