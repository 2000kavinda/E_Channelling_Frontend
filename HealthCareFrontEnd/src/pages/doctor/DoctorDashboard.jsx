function DoctorDashboard() {

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  return (
    <div className="flex flex-col px-10 pt-10">
      {/* Top bar */}
      <div className="flex flex-row">
        {/* Greeting message */}
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-[#00394C]">{getCurrentGreeting()}</div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard