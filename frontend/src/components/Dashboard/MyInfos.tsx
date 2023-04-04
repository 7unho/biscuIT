import tw from "twin.macro";

const InfoContainer = tw.div`w-full h-fit justify-between flex flex-row my-4`;
const TitleContainer = tw.div`flex w-[20%] h-14 items-center`;
const Span = tw.p`text-white text-main`;
const TextBox = tw.div`w-[80%] h-14 p-4 bg-dark-grey20 rounded-10 text-main text-primary`;

interface InfoProps {
  title: string;
  content: string;
}

const Info = ({title, content}: InfoProps) => {
  return (
    <InfoContainer>
      <TitleContainer>
        <Span>{title}</Span>
      </TitleContainer>
      <TextBox>{content}</TextBox>
    </InfoContainer>
  )
}

type MyInfo = {
  nickname: string,
  job: string,
	period: number,
  interest: string[],
}

interface MyInfoContent {
  myInfo: MyInfo;
}

export default function MyInfos({myInfo}: MyInfoContent) {
  const yearsList = ["1년 미만", "1년차", "2년차", "3년차", "4년차", 
    "5년차", "6년차", "7년차", "8년차", "9년차", 
    "10년 이상"]
 
  return (
    <>
      <Info title="직무" content={myInfo.job} />
      <Info title="경력" content={yearsList[myInfo.period]} />
      <Info title="관심사" content={`${myInfo.interest[0]}
        ${myInfo.interest.length > 1
          ? `등 ${myInfo.interest.length}개}` : ""}`}
      />
    </>
  )
}
