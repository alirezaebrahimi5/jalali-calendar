import React from 'react';
import moment from 'moment-jalaali';

moment.loadPersian({usePersianDigits: true, dialect: 'persian-modern'})

const JalaliCalendarHeader = () => {
  const today = moment();
  
  return (
    <div>
      <h2>{today.format('jYYYY/jMM/jDD')}</h2>
    </div>
  );
};

export default JalaliCalendarHeader;
