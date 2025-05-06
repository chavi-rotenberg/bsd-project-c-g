
const WeekView = ({ currentDate }) => {
    const getStartOfWeek = (date) => {
      const start = new Date(date);
      const day = start.getDay();
      const diff = start.getDate() - day;
      start.setDate(diff);
      return start;
    };
  
    const renderWeekDays = () => {
      const startOfWeek = getStartOfWeek(currentDate);
      const weekDays = [];
      const weekDayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
      const today = new Date();
  
   
      const headers = weekDayNames.map((day) => (
        <div key={`header-${day}`} style={{ 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: "10px", 
          textAlign: 'center', 
          fontWeight: 'bold', 
          borderRadius: '5px' 
        }}>
          {day}
        </div>
      ));
  
      // Generate the dates for the week
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(
          startOfWeek.getFullYear(), 
          startOfWeek.getMonth(), 
          startOfWeek.getDate() + i
        );
        
        const isToday = 
          date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear();
        
        dates.push(
          <div key={`date-${i}`} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            textAlign: 'center', 
            borderRadius: '5px', 
            backgroundColor: isToday ? '#ffeb3b' : 'white'
          }}>
            {date.getDate()}
          </div>
        );
      }
  
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
          {headers}
          {dates}
        </div>
      );
    };
  
    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date) => {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
  
    return (
      <div style={{ 
        padding: "20px", 
        border: "1px solid #ccc", 
        borderRadius: "10px", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
      }}>
        <h2 style={{ textAlign: 'center' }}>
          שבוע: {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
        </h2>
        {renderWeekDays()}
      </div>
    );
  };
  
  export default WeekView;
 