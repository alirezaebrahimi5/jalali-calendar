import logo from './logo.svg';
import './App.css';

import { Helmet } from 'react-helmet';
import JalaliCalendarHeader from './components/Header';
import JalaliCalendar from './components/JalaliCalendar';

function App() {
  return (
    <div className="App">
      <Helmet>
        <html lang="fa" dir="rtl" />
      </Helmet>
      <JalaliCalendar />
    </div>
  );
}

export default App;
