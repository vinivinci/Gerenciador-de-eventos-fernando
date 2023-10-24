
import React, { FC, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.css';

interface DateInputProps {
    selectedDate: Date;

    onChange: (date: Date) => void;
    label: string;
}

const DateInput: FC<DateInputProps> = ({ selectedDate, onChange, label }) => {
    return (
        <div className="date-input">
            <label>{label}</label>
            <ReactDatePicker
                className='date-picker'
                selected={selectedDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default DateInput;
