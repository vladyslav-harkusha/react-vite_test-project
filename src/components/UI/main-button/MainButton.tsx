import {FC} from "react";
import './MainButton.scss';

type Props = {
    buttonText: string;
    buttonOnclick?: () => void;
    isDisabled?: boolean;
}

export const MainButton: FC<Props> = ({ buttonText, buttonOnclick, isDisabled }) => {
    return (
        <div>
            <button className='main-button' disabled={isDisabled} onClick={buttonOnclick}>
                {buttonText}
            </button>
        </div>
    );
};