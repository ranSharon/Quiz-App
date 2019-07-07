import React from 'react';
import {connect} from 'react-redux';

interface IProps {
    quizType: string;
}

const Header: React.FC<IProps> = (props: IProps) => {
    const showHeader = () => {
        if (props.quizType === '') {
            return null;
        } else {
            return (
                <h1 >
                    {'WHICH ' + props.quizType.toUpperCase() + ' CHARACTER ARE YOU?'}
                </h1>
            );
        }
    };

    return (
        <div>
            {showHeader()}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const quizType = state.quiz.quizType;
    return {
        quizType: quizType
    }
};

export default connect(mapStateToProps, null)(Header);