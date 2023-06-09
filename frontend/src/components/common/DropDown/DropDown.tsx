import { useState, useRef } from 'react';
import tw, { styled, css } from 'twin.macro';
import DropDownList from './DropDownList';

import arrowDropDown from '../../../assets/icons/arrow_drop_down.svg';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

type ItemObj = {
  id: number;
  content: string;
};

interface DropDownProps {
  itemList: ItemObj[];
  placeHolder: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isOnboarding: boolean;
}

const DropDownContainer = styled.div((props: { isOnboarding: boolean }) => [
  tw`h-[210px] w-full overflow-scroll overflow-x-hidden z-20 fixed`,
  props.isOnboarding === true
    ? css`
        width: calc(100% - 64px);
      `
    : css`
        width: calc(80% - 38.4px);
      `,
]);

const DropDownBtn = tw.button`w-full h-14 rounded-10 flex justify-between items-center bg-grey20 px-4`;

const ArrowDropDown = styled.div`
  ${css`
    width: 24px;
    height: 24px;
    background-size: cover;
    background-image: url('${arrowDropDown}');
  `}
`;

const DropDownHolder = styled.span((props: { selected: string }) => [
  props.selected !== ''
    ? tw`text-primary text-main-bold`
    : tw`text-subColor text-sub`,
]);

/** itemList는 드롭다운 아이템 리스트 {id: number, content:string},
 * placeHolder는 드롭다운 기본 홀더(string)
 */
const DropDown = ({
  itemList,
  placeHolder,
  selected,
  setSelected,
  isOnboarding,
}: DropDownProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  useOnClickOutside(ref, () => setIsClicked(false));

  return (
    <div ref={ref} className="relative">
      <DropDownBtn onClick={onClick}>
        <DropDownHolder selected={selected}>
          {selected !== '' ? selected : placeHolder}
        </DropDownHolder>
        <ArrowDropDown />
      </DropDownBtn>
      {isClicked ? (
        <DropDownContainer isOnboarding={isOnboarding}>
          <DropDownList
            itemList={itemList}
            setSelected={setSelected}
            setIsClicked={setIsClicked}
          />
        </DropDownContainer>
      ) : null}
    </div>
  );
};

export default DropDown;
