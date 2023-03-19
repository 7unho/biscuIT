import { useState } from "react";
import tw, { styled } from 'twin.macro';

interface FilterBtnProps {
  filterBtnState: boolean[];
  setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const FilterBtnContainer = tw.div`
  w-full h-14 flex justify-between items-center px-4 bg-black
`;

const FilterBtn = styled.button((props: { state: boolean }) => [
  tw`w-[84px] h-9 flex rounded-[10px] justify-center items-center`,
  props.state === true
    ? tw`bg-dark-primary`
    : tw`bg-black border-[1px] border-dark-primary`
])

const Span = styled.span((props: { state: boolean }) => [
  tw`text-center text-h5`,
  props.state === true
    ? tw`text-black`
    : tw`text-dark-primary`
])

const onclick = (idx: number, filterBtnState: boolean[], setFilterBtnState: React.Dispatch<React.SetStateAction<boolean[]>>) => {
  if(filterBtnState[idx] === true) {
    return setFilterBtnState([false, false])
  }
  const newBtnState = [false, false];
  newBtnState[idx] = true;
  setFilterBtnState(newBtnState);
}

const FilterBtnList = ({filterBtnState, setFilterBtnState}: FilterBtnProps) => {
  return (
    <FilterBtnContainer>
      <FilterBtn state={filterBtnState[0]} onClick={() => onclick(0, filterBtnState, setFilterBtnState)}>
        <Span state={filterBtnState[0]}>영상만 보기</Span>
      </FilterBtn>
      <FilterBtn state={filterBtnState[1]} onClick={() => onclick(1, filterBtnState, setFilterBtnState)}>
        <Span state={filterBtnState[1]}>글만 보기</Span>
      </FilterBtn>
    </FilterBtnContainer>
  )
}

export default FilterBtnList;