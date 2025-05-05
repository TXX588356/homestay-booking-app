import { View, Text } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';




const Calendar = ({onDateChange}: {onDateChange: (startDate: DateType, endDate: DateType) => void}) => {
    let today = new Date();
    const [startDate, setStartDate] = useState<DateType>();
    const [endDate, setEndDate] = useState<DateType>();    return (
        <DateTimePicker
        mode="range"
        style={{backgroundColor: 'white'}}
        startDate={startDate}
        endDate={endDate}
        onChange={({ startDate, endDate }) => {
            const start = startDate;
            const end = endDate || startDate;
            setStartDate(startDate);
            setEndDate(endDate);
            //onDateChange(startDate, endDate);
            onDateChange(start, end);

        }}        
        min={1}
        minDate={today}
        styles={{
            ...useDefaultStyles,
            today: { borderColor: 'blue', borderWidth: 1, borderRadius: 30},
            selected: {backgroundColor: 'blue', borderRadius: 30},
            selected_label: {color: 'white'},
            
            
        }}
        />
    )
}

export default Calendar