import React from "react";

const Digit = ({ signal }) => {

    const getClass = letter => {
        return signal.indexOf(letter) > -1 ? 'alert-danger' : ''; 
    };

    return (
        <table className="digit">
            <tbody>
                <tr><td></td><td colSpan="4" className={getClass('a')}>a</td><td></td></tr>
                <tr><td className={getClass('b')}></td><td></td><td></td><td></td><td></td><td className={getClass('c')}></td></tr>
                <tr><td className={getClass('b')}></td><td></td><td></td><td></td><td></td><td className={getClass('c')}></td></tr>
                <tr><td className={getClass('b')}>b</td><td></td><td colSpan="2">{signal}</td><td></td><td className={getClass('c')}>c</td></tr>
                <tr><td className={getClass('b')}></td><td></td><td></td><td></td><td></td><td className={getClass('c')}></td></tr>
                <tr><td className={getClass('b')}></td><td></td><td></td><td></td><td></td><td className={getClass('c')}></td></tr>
                <tr><td></td><td colSpan="4" className={getClass('d')}>d</td><td></td></tr>
                <tr><td className={getClass('e')}></td><td></td><td></td><td></td><td></td><td className={getClass('f')}></td></tr>
                <tr><td className={getClass('e')}></td><td></td><td></td><td></td><td></td><td className={getClass('f')}></td></tr>
                <tr><td className={getClass('e')}>e</td><td></td><td></td><td></td><td></td><td className={getClass('f')}>f</td></tr>
                <tr><td className={getClass('e')}></td><td></td><td></td><td></td><td></td><td className={getClass('f')}></td></tr>
                <tr><td className={getClass('e')}></td><td></td><td></td><td></td><td></td><td className={getClass('f')}></td></tr>
                <tr><td></td><td colSpan="4" className={getClass('g')}>g</td><td></td></tr>
            </tbody>
        </table>
    );
};

export default Digit;